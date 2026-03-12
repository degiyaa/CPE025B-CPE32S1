function deepComp(obj1, obj2) {
    if (obj1 === obj2) return true;
    if (typeof obj1 !== "object" || obj1 === null ||
        typeof obj2 !== "object" || obj2 === null) return false;

    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (let key of keys1) {
        if (!keys2.includes(key)) return false;
        let val1 = obj1[key];
        let val2 = obj2[key];

        if (typeof val1 === "function" || typeof val2 === "function") continue;

        if (!deepComp(val1, val2)) return false;
    }

    return true;
}

let a = {x:[1,2,3,4,5], y:0, z:{m:'test', n:false}};
let b = {x:[1,2,3,4,5], y:0, z:{m:'test', n:false}};
let c = {x:[1,2,3,4,5,6], y:0, z:{m:'test', n:false}};
let d = {x:[1,2,3,4], y:0, z:{m:'test', n:false}};
let e = {x:[1,2,3,4,5], y:0, z:{m:'test', n:true}};
let f = {x:[1,2,3,4,5], y:-1, z:{m:'test', n:false}};

console.log(deepComp(a,b)); // -> true
console.log(deepComp(a,c)); // -> false
console.log(deepComp(a,d)); // -> false
console.log(deepComp(a,e)); // -> false
console.log(deepComp(a,f)); // -> false