class Graph {
    constructor() {
        this.adjacencyList = new Map();
    }

    addNode(n) {
        if (!this.adjacencyList.has(n)) {
            this.adjacencyList.set(n, []);
        }
    }

    addEdge(n1, n2) {
        if (!this.adjacencyList.has(n1)) {
            this.addNode(n1);
        }
        if (!this.adjacencyList.has(n2)) {
            this.addNode(n2);
        }

        this.adjacencyList.get(n1).push(n2);
    }

    bfs(startNode) {
        if (!this.adjacencyList.has(startNode)) return [];
        const visited = new Set();
        const queue = [startNode];
        const result = [];

        while (queue.length > 0) {
            const current = queue.shift();
            if (!visited.has(current)) {
                visited.add(current);
                result.push(current);
                const children = this.adjacencyList.get(current);
                for (let i = 0; i < children.length; i++) {
                    queue.push(children[i]);
                }
            }
        }
        return result;
    }

    dfs(startNode) {
        if (!this.adjacencyList.has(startNode)) return [];
        const visited = new Set();
        const stack = [startNode];
        const result = [];

        while (stack.length > 0) {
            const current = stack.pop();
            if (!visited.has(current)) {
                visited.add(current);
                result.push(current);
                const children = this.adjacencyList.get(current);
                for (let i = children.length - 1; i >= 0; i--) {
                    stack.push(children[i]);
                }
            }
        }
        return result;
    }

    toString() {
        const result = ["digraph G{ "];
        this.adjacencyList.forEach((v, k) => {
            for (let i = 0; i < v.length; i++) {
                result.push(`\t"${k}" -> "${v[i]}";`);
            }
        });
        result.push("}");

        return result.join("\n");
    }
}
