function solve(amount, bottles) {
    // setup initial state: all bottles start empty
    const k = bottles.length;
    const start = new Array(k).fill(0);
    const startKey = keyOf(start);

    // quick check with max capacity
    let maxCapacity = 0;
    for (let i = 0; i < k; i++) {
        if (bottles[i] > maxCapacity) {
            maxCapacity = bottles[i];
        }
    }
    if (amount > maxCapacity) {
        return null;
    }

    // bfs queue
    const queue = [start];
    let head = 0;
    const visited = new Set([startKey]);
    // parent stores how we reached each bottle key
    const parent = new Map([[startKey, null]]);
    // states maps bottle key -> bottle array for backtracking path later
    const states = new Map([[startKey, start]]);

    while (head < queue.length) {
        const cur = queue[head++];
        const curKey = keyOf(cur);

        // matches the goal if exactly one bottle has the target amount and all others are empty
        if (isGoal(cur, amount)) {
            return buildPath(curKey, parent, states);
        }
        // 3 different actions
        // action 1: fill bottle i completely
        for (let i = 0; i < k; i++) {
            if (cur[i] !== bottles[i]) {
                const next = cur.slice();
                next[i] = bottles[i];
                pushNext(next, curKey, queue, visited, parent, states);
            }
        }

        // action 2: empty bottle i completely
        for (let i = 0; i < k; i++) {
            if (cur[i] !== 0) {
                const next = cur.slice();
                next[i] = 0;
                pushNext(next, curKey, queue, visited, parent, states);
            }
        }

        // action 3: pour from bottle i into bottle j
        for (let i = 0; i < k; i++) {
            if (cur[i] === 0) {
                continue;
            }
            for (let j = 0; j < k; j++) {
                if (i === j || cur[j] === bottles[j]) {
                    continue;
                }
                // move until source is empty or destination is full
                const move = Math.min(cur[i], bottles[j] - cur[j]);
                const next = cur.slice();
                next[i] -= move;
                next[j] += move;
                pushNext(next, curKey, queue, visited, parent, states);
            }
        }
    }

    return null;
}

function isGoal(bottle, amount) {
    // allow one bottle with target amount, all others must be zero
    let seenTarget = false;
    for (let i = 0; i < bottle.length; i++) {
        if (bottle[i] === amount && !seenTarget) {
            seenTarget = true;
        } else if (bottle[i] !== 0) {
            return false;
        }
    }
    return seenTarget;
}

function pushNext(next, curKey, queue, visited, parent, states) {
    // enqueue only if this bottle state has not been seen before
    const nextKey = keyOf(next);
    if (!visited.has(nextKey)) {
        visited.add(nextKey);
        // record predecessor so we can rebuild full step list later
        parent.set(nextKey, curKey);
        states.set(nextKey, next);
        queue.push(next);
    }
}

function buildPath(goalKey, parent, states) {
    // walk backward from goal to start using parent links
    const path = [];
    let key = goalKey;
    while (key !== null) {
        path.push(states.get(key));
        key = parent.get(key);
    }
    // reverse so output is from start to goal
    path.reverse();
    return path;
}

// convert bottle arrays into string keys so visited/parent maps can match states by value (not by array reference)
function keyOf(bottle) {
    return bottle.join(",");
}

// unit tests
const tests = [
    { bottles: [5, 3], amount: 2 },
    { bottles: [2, 4], amount: 1 },
    { bottles: [10, 2, 1], amount: 8 },
    { bottles: [3, 4, 2, 1], amount: 8 }
];

for (let i = 0; i < tests.length; i++) {
    const test = tests[i];
    const result = solve(test.amount, test.bottles);
    console.log(`test ${i + 1}: bottles=${JSON.stringify(test.bottles)} amount=${test.amount}`);
    console.log(result);
}
