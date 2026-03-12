let myDecorator = function(fn) {
    const cache = new Set();

    return function(...args) {
        const key = JSON.stringify(args); // create a string representation of arguments
        if (cache.has(key)) {
            console.log(`arguments already used: ${args}`);
        } else {
            cache.add(key);
        }
        return fn(...args); // call the original function
    }
}

let sum = function(...args) {
    let retVal = 0;
    for(let arg of args) {
        retVal += arg;
    }
    return retVal;
}
let dfn = myDecorator(sum);
dfn(2, 3, 4);
dfn(4, 5);
dfn(2, 3, 4); // -> arguments already used: 2,3,4
dfn(4, 5); // -> arguments already used: 4,5