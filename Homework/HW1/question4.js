function reversedSum(num1, num2) {
    /* your solution goes here */
    // helper function to reverse a number
    const reverseNumber = (value) => {
        // convert to string, split into array, reverse, join back, convert to number
        const reversed = String(value).split('').reverse().join('');
        return Number(reversed);
    };

    const sum = reverseNumber(num1) + reverseNumber(num2);
    return reverseNumber(sum);
}

function main() {
    const tests = [
        { num1: "24", num2: 1 },
        { num1: 4358, num2: "754" },
        { num1: 305, num2: 794 },
        { num1: "30", num2: 0 },
    ];

    for (const { num1, num2 } of tests) {
        const result = reversedSum(num1, num2);
        console.log(`num1=${num1}, num2=${num2} ->`, result);
    }
}

main();
