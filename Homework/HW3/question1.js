function fibonacci() {
    let prev = 0;
    let curr = 1;
    let index = 0;

    return function () {
        // base cases
        if (index === 0) {
            index++;
            return 0;
        }
        if (index === 1) {
            index++;
            return 1;
        }

        // fibonacci = F(n+1) = F(n-1) + F(n)
        let next = prev + curr;
        prev = curr;
        curr = next;
        index++;
        return next;
    };
}

let fibGenerator1 = fibonacci(); // fibonacci() returns a closure
let fibGenerator2 = fibonacci(); // fibonacci() returns a closure

console.log(fibGenerator1()); // prints 0, i.e., F(0)
console.log(fibGenerator1()); // prints 1, i.e., F(1)
console.log(fibGenerator1()); // prints 1, i.e., F(2)
console.log(fibGenerator1()); // prints 2, i.e., F(3)
console.log(fibGenerator1()); // prints 3, i.e., F(4)

console.log(fibGenerator2()); // prints 0, i.e., F(0)
console.log(fibGenerator2()); // prints 1, i.e., F(1)
console.log(fibGenerator2()); // prints 1, i.e., F(2)
console.log(fibGenerator2()); // prints 2, i.e., F(3)
console.log(fibGenerator2()); // prints 3, i.e., F(4)
