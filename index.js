const express = require("express");
const app = express();
const nameData = require("./names.json")
const path = require("path")

function sortByUnicode(unicode) {
    return function (a, b) {
        if (a[unicode] > b[unicode])
            return 1;
        else if (a[unicode] < b[unicode])
            return -1;

        return 0;
    }
}
function amountByName(name) {
    if (nameData.names.map(a => a.name).includes(name)) {
        return nameData.names.find(a => a.name === name).amount;
    }
    else return 0

}
function sumOfArray(array) {
    return array.map(a => a.amount).reduce((a, b) => {
        return a + b;
    }, 0)
}
console.log(nameData.names.sort(sortByUnicode("amount")).reverse());
console.log(nameData.names.sort(sortByUnicode("name")));
console.log(sumOfArray(nameData.names))
console.log(amountByName("Mikko"))
console.log(amountByName("Jaakko"))