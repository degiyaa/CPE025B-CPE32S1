let getPromiseArray = function(args) {
    let promises = args.map(arg => new Promise(function(resolve, reject){
        if(Number.isInteger(arg) && arg > 0) {
            let rnd = Math.random();
            setTimeout(resolve(arg), arg);
        } else {
            reject(new Error(`${arg} is not a positive integer`))
        }
    }));
    return promises;
}

let promises1 = getPromiseArray([10, 30, 5, 20, 'a']);
Promise.all(promises1).then(a => console.log(`all: ${a}`))
.catch(e => console.log(`all: ${e.message}`)); // -> any: 10 
Promise.any(promises1).then(a => console.log(`any: ${a}`)).
catch(e => console.log(`any: ${e.message}`)); // -> all: a is not a positive integer