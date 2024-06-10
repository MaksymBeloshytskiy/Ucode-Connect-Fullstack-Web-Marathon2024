String.prototype.removeDuplicates = function removeDuplicates() {
    let str = this.replace(/ +(?= )/g,'').trim();
    let arr = str.split(' ');

    let uniqueArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (uniqueArr.indexOf(arr[i]) === -1) {
            uniqueArr.push(arr[i]);
        }
    }

    str = uniqueArr.join(' ');

    return str;
};
