function find(nums) {
    /* your solution goes here */
    // maximum streak of 33s found
    let max_33 = 0;
    // current streak of 33s
    let curr_streak = 0;
        for (let i = 0; i < nums.length; i++) {
            let val = nums[i];
            // check if the current value is number 33
            if (typeof val === 'number' && val === 33) {
                curr_streak += 1;
                // update max streak if current streak exceeds it
                if (curr_streak > max_33) {
                  max_33 = curr_streak;
                }
            } else {
                // reset current streak
                curr_streak = 0;
            }
        }
    return max_33;
}

function main() {
    const tests = [
        [33, 33, 30, 33, 33, 33],
        [33, 0, 33, 33, 0, 33],
        [33, -10, 33, 33, 8, 3, 33, 33, 9, 33, 33, 33, 33, 33, 33],
        [33, 33, 5, 33, 33, 33],
        [null, "house", 9, undefined, "33"],
        [33, 33, 30, 33, 33, 33.0],
    ];

    for (let i = 0; i < tests.length; i++) {
        const nums = tests[i];
        const result = find(nums);
        console.log(`Test ${i + 1}:`, result);
    }
}

main();
