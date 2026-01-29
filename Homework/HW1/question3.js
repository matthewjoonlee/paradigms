function enumerate(i,j) {
    const output = [];

    // positions less than 1 are null
    for (let x = i; x <= Math.min(j, 0); x++) output.push(null);

    // if j < 1, can return early
    if (j < 1) return output;

    // sums of diagonals start at 4 and increase by 2 (a/b where a+b is constant)
    // a increases on even diagonals, decreases on odd diagonals but sum is always constant
    let pos = 0;
    for (let diagonalSum = 4; pos < j; diagonalSum += 2) {
        const diagonalIndex = diagonalSum / 2;
        if (diagonalIndex % 2 === 0) {
            // even diagonal: a increases
            for (let a = 2; a <= diagonalSum - 2; a += 2) {
                const b = diagonalSum - a;
                pos += 1;
                if (pos >= i && pos <= j) output.push(`${a}/${b}`);
            }
        } else {
            // odd diagonal: a decreases
            for (let a = diagonalSum - 2; a >= 2; a -= 2) {
                const b = diagonalSum - a;
                pos += 1;
                if (pos >= i && pos <= j) output.push(`${a}/${b}`);
            }
        }
    }

    return output;
}

function main() {
    const tests = [
        { i: 1, j: 2 },
        { i: 3, j: 6 },
        { i: -1, j: 4 },
        { i: -4, j: 0 },
        { i: 1, j: 1 },
    ];

    for (const { i, j } of tests) {
        const result = enumerate(i, j);
        console.log(`i=${i}, j=${j} ->`, result);
    }
}

main();
