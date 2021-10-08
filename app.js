const express = require("express");
const XMLHttpRequest = require('xhr2');

const app = express();
let result = "ahoj";

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.get("/home/:name", (req, res, next) => {
    // getRecordsByName(req.params.name);
    res.json([{
        "name" : result
    }]);
});

function getRecordsByName(name) {
    const xhr = new XMLHttpRequest();
    const url = "https://api.nutritionix.com/v1_1/search";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            result = JSON.parse(xhr.responseText).hits[0].fields.item_name;
        }
    };
    let data = JSON.stringify({
        "appId": "aa50ba62",
        "appKey": "4e9b9d54c9a9c3f11ee37209396bbee4",
        "query" : name
    });
    xhr.send(data);
}