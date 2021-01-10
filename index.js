const express = require("express");
const app = express();
const nameData = require("./names.json")
const path = require("path")
app.locals.sorter = function sortByUnicode(unicode) {
    return function (a, b) {
        if (a[unicode] > b[unicode])
            return 1;
        else if (a[unicode] < b[unicode])
            return -1;

        return 0;
    }
}
app.locals.amountBN = function amountByName(nam) {

    let name = ""
    if (nam != "") {
        name = nam[0].toUpperCase() + nam.slice(1).toLowerCase()
    }
    if (nameData.names.map(a => a.name).includes(name)) {

        return nameData.names.find(a => a.name === name).amount;
    }
    else if (name == "") { return "" }
    else return 0

}
app.locals.sum = function sumOfArray(array) {
    return array.map(a => a.amount).reduce((a, b) => {
        return a + b;
    }, 0)
}


app.use(express.static(path.join(__dirname, "/public")))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"))
app.get("/", (req, res) => {
    const search = (new URL(req.url, `http://${req.headers.host}`).search.toString().slice(6))
    res.render("index.ejs", { names: nameData.names, search })
})
app.listen(3000, () => {
    console.log("Listening on port 3000")
})
