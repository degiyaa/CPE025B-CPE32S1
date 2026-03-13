function composePipeline(fns) {
    return function(initialValue) {
        let result = initialValue;
        for (let func of fns) {
            result = func(result);
        }
        return result;
    };
}

// Test Code
const add2 = x => x + 2;
const sqr = x => x * x;
const half = x => x / 2; 
const pipeline = composePipeline([add2, sqr, half]); 
console.log(pipeline(4));