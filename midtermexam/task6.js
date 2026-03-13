function firstUniqueChar(str) {
    const frequency = {};
    for (let char of str) {
        const lower = char.toLowerCase();
        frequency[lower] = (frequency[lower] || 0) + 1;
    }
    for (let char of str) {
        if (frequency[char.toLowerCase()] === 1) {
            return char;
        }
    }
    return null;
}

// Test Code
console.log(firstUniqueChar('sTreSS'));
console.log(firstUniqueChar('aabbc'));