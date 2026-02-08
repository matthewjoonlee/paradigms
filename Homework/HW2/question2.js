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

    const readCSV = (filename) =>
        parseCSV(fs.readFileSync(filename, "utf8"));

    const developers = readCSV("developers.csv");
    const defectsRaw = readCSV("defects.csv");
    const blocksRaw = readCSV("defect_blocks.csv");
    const dependsRaw = readCSV("defect_depends.csv");

    const developerMap = new Map();
    developers.forEach((dev) => {
        developerMap.set(dev.username, dev.real_name);
    });

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

    blocksRaw.forEach((row) => {
        const fromId = Number(row.from_defect_id);
        const toId = Number(row.to_defect_id);
        if (defectMap.has(fromId)) defectMap.get(fromId).blocks.push(toId);
    });

    dependsRaw.forEach((row) => {
        const fromId = Number(row.from_defect_id);
        const toId = Number(row.to_defect_id);
        if (defectMap.has(fromId)) defectMap.get(fromId).depends.push(toId);
    });

    return defects;
}


function query1(defects){
    return defects.filter(
        (d) => d.status === "RESOLVED" && d.resolution === "FIXED"
    ).length;
}

function query2(defects){
    return defects.filter((d) =>
        (d.summary || "").toLowerCase().includes("buildbot")
    ).length;
}

function query3(defects){
    if (defects.length === 0) return 0;
    const backlog = defects.filter((d) => d.status !== "RESOLVED").length;
    const percent = (backlog / defects.length) * 100;
    return Math.round(percent * 100) / 100;
}

function query4(defects){
    const counts = defects.reduce((acc, d) => {
        acc[d.component] = (acc[d.component] || 0) + 1;
        return acc;
    }, {});

    return Object.keys(counts).reduce((best, comp) => {
        if (best === null) return comp;
        const bestCount = counts[best];
        const compCount = counts[comp];
        if (compCount > bestCount) return comp;
        if (compCount === bestCount && comp < best) return comp;
        return best;
    }, null);
}

function query5(defects){
    const counts = defects
        .filter(
            (d) =>
                d.status === "RESOLVED" &&
                d.resolution === "FIXED" &&
                d.component === "Documentation"
        )
        .reduce((acc, d) => {
            acc[d.fixed_by_username] = (acc[d.fixed_by_username] || 0) + 1;
            return acc;
        }, {});

    const names = Object.keys(counts);
    if (names.length === 0) return null;

    return names.sort((a, b) => {
        const diff = counts[b] - counts[a];
        if (diff !== 0) return diff;
        return a.localeCompare(b);
    })[0];
}

function query6(defects){
    const graph = new Map(
        defects.map((d) => [d.bug_id, d.blocks.slice()])
    );

    const visiting = new Set();
    const visited = new Set();

    const hasCycleFrom = (node) => {
        if (visiting.has(node)) return true;
        if (visited.has(node)) return false;
        visiting.add(node);
        const neighbors = graph.get(node) || [];
        for (let i = 0; i < neighbors.length; i++) {
            if (hasCycleFrom(neighbors[i])) return true;
        }
        visiting.delete(node);
        visited.add(node);
        return false;
    };

    return defects.some((d) => hasCycleFrom(d.bug_id));
}


let defects = loadObjects();
console.log(query1(defects));
console.log(query2(defects));
console.log(query3(defects));
console.log(query4(defects));
console.log(query5(defects));
console.log(query6(defects));