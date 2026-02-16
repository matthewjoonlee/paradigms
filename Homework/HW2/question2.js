class Defect {
    constructor({
        bug_id = 0,
        component = "",
        status = "",
        resolution = "",
        summary = "",
        blocks = [],
        depends = [],
        fixed_by_username = "",
        fixed_by_real_name = ""
    } = {}) {
        this.bug_id = Number(bug_id);
        this.component = component;
        this.status = status;
        this.resolution = resolution;
        this.summary = summary;
        this.blocks = Array.isArray(blocks) ? blocks.map(Number) : [];
        this.depends = Array.isArray(depends) ? depends.map(Number) : [];
        this.fixed_by_username = fixed_by_username;
        this.fixed_by_real_name = fixed_by_real_name;
    }
}

function loadObjects(){
    const fs = require("fs");

    // CSV parser for comma delimination, trimming whitespace, and handling missing values
    const parseCSV = (text) => {
        const [headerLine, ...dataLines] = text.split(/\r?\n/).filter(Boolean);
        const headers = headerLine.split(",").map((h) => h.trim());
        return dataLines.map((line) => {
            const values = line.split(",").map((v) => v.trim());
            const row = {};
            for (let i = 0; i < headers.length; i++) {
                row[headers[i]] = values[i] ?? "";
            }
            return row;
        });
    };

    // Read a CSV file from the current directory and parse it.
    const readCSV = (filename) =>
        parseCSV(fs.readFileSync(filename, "utf8"));

    const developers = readCSV("developers.csv");
    const defectsRaw = readCSV("defects.csv");
    const blocksRaw = readCSV("defect_blocks.csv");
    const dependsRaw = readCSV("defect_depends.csv");

    // Map username to real name for lookup when building defects.
    const developerMap = new Map();
    developers.forEach((dev) => {
        developerMap.set(dev.username, dev.real_name);
    });

    // Build Defect objects with bug_id, component, status, resolution, summary, blocks, depends, fixed_by_username, and fixed_by_real_name.
    const defectMap = new Map();
    const defects = defectsRaw.map((row) => {
        const fixedBy = row.fixed_by ?? "";
        const defect = new Defect({
            bug_id: row.bug_id,
            component: row.component,
            status: row.status,
            resolution: row.resolution,
            summary: row.summary,
            blocks: [],
            depends: [],
            fixed_by_username: fixedBy,
            fixed_by_real_name: developerMap.has(fixedBy) ? developerMap.get(fixedBy) : null
        });
        defectMap.set(defect.bug_id, defect);
        return defect;
    });

    // Create block connections
    blocksRaw.forEach((entry) => {
        const fromId = Number(entry.from_defect_id);
        const toId = Number(entry.to_defect_id);
        if (defectMap.has(fromId)) defectMap.get(fromId).blocks.push(toId);
    });

    // Create depends connections
    dependsRaw.forEach((entry) => {
        const fromId = Number(entry.from_defect_id);
        const toId = Number(entry.to_defect_id);
        if (defectMap.has(fromId)) defectMap.get(fromId).depends.push(toId);
    });

    return defects;
}


function query1(defects){
    // Count defects that are resolved and fixed
    return defects.filter(
        (d) => d.status === "RESOLVED" && d.resolution === "FIXED"
    ).length;
}

function query2(defects){
    // Count defects whose summary includes "buildbot" 
    return defects.filter((d) =>
        // lowercase to make caseinsensitive, and default to empty string if summary is missing
        (d.summary || "").toLowerCase().includes("buildbot")
    ).length;
}

function query3(defects){
    // Percentage of defects status still in backlog
    if (defects.length === 0) return 0;
    const backlog = defects.filter((d) => d.status !== "RESOLVED").length;
    const percent = (backlog / defects.length) * 100;
    return Math.round(percent * 100) / 100;
}

function query4(defects){
    // Count how many defects each component has
    const counts = defects.reduce((totals, d) => {
        // Initialize the count for this component if it doesn't exist yet
        totals[d.component] = (totals[d.component] || 0) + 1;
        return totals;
    }, {});

    // Walk through all components to find the highest count
    return Object.keys(counts).reduce((best, curr) => {
        // first current
        if (best === null) return curr;
        const bestCount = counts[best];
        const currCount = counts[curr];
        // Replace best when the current component has more defects
        if (currCount > bestCount) return curr;
        // If counts are equal, pick the name that sorts earlier
        if (currCount === bestCount && curr < best) return curr;
        // Else, keep the current best
        return best;
    }, null);
}

function query5(defects){
    // Developer who fixed the most Documentation defects.
    const counts = defects
        .filter(
            (d) =>
                d.status === "RESOLVED" &&
                d.resolution === "FIXED" &&
                d.component === "Documentation"
        )
        .reduce((totals, d) => {
            // Count how many documentation defects each developer fixed
            totals[d.fixed_by_username] = (totals[d.fixed_by_username] || 0) + 1;
            return totals;
        }, {});

    const names = Object.keys(counts);
    // Nobody fixed documentation defects, return null
    if (names.length === 0) return null;

    // Find the developer with the largest count, break ties alphabetically.
    return names.reduce((best, curr) => {
        // first is best
        if (best === null) return curr;
        // Replace best when the current developer fixed more documentation defects
        if (counts[curr] > counts[best]) return curr;
        // If tied, prefer alphabetically smaller name.
        if (counts[curr] === counts[best] && curr < best) return curr;
        // Else, keep the current best
        return best;
    }, null);
}

function query6(defects){
    // Detect cycles using DFS
    const graph = new Map(
        defects.map((d) => [d.bug_id, d.blocks.slice()])
    );

    const visiting = new Set();
    const visited = new Set();

    const hasCycleFrom = (node) => {
        // If we see a node already in the current path, we found a cycle
        if (visiting.has(node)) return true;
        // If we've fully explored this node, no need to re-check
        if (visited.has(node)) return false;
        visiting.add(node);
        const neighbors = graph.get(node) || [];
        for (let i = 0; i < neighbors.length; i++) {
            // Recurse through neighbors downstream
            if (hasCycleFrom(neighbors[i])) return true;
        }
        // backtrack: remove from visiting and add to visited
        visiting.delete(node);
        visited.add(node);
        return false;
    };

    // If at least one returns true, then there is a cycle in the graph
    return defects.some((d) => hasCycleFrom(d.bug_id));
}


let defects = loadObjects();
console.log(query1(defects));
console.log(query2(defects));
console.log(query3(defects));
console.log(query4(defects));
console.log(query5(defects));
console.log(query6(defects));
