function sumDeepStrictNumbers(arr) {
    let sum = 0;

    for (let items of arr) {
        if (Array.isArray(items)) {
            sum += sumDeepStrictNumbers(items);
        }
        else if (typeof items === 'number' && !Number.isNaN(items)) {
            sum += items;
        }
    } 
    return sum;
}

// Test Code
const testArray1 = [10, ['5', [true, 5]], null, [undefined, [10, NaN]]];
console.log(sumDeepStrictNumbers(testArray1));