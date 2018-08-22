console.log("Starting cleaner...");

//Create app using express.js
const port = process.env.PORT || 3000;
const express = require("express");
const body_parser = require("body-parser");
const path = require("path");
const http = require("http");
const app = express();
const server = http.createServer(app);
const dir = path.join(__dirname, "../");

app.use(express.static(dir));
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.listen(port, () => console.log(`API Test Tool started on port ${port}.`));

//Post to the appropriate file depending on the req.body.id value
app.post("/server", function(req, res) {
    const feature = req.body.id;
    console.log(req.body);
    if (feature == "blasts") {
        const api_call = require("./cleaner_files/blasts.js");
        api_call.clean_blasts();
    }
    else if (feature == "lists") {
        const api_call = require("./cleaner_files/lists.js");
        api_call.clean_lists();
    }
    else if (feature == "templates") {
        const api_call = require("./cleaner_files/templates.js");
        api_call.clean_templates();
    }
    else if (feature == "content") {
        const api_call = require("./cleaner_files/content.js");
        api_call.clean_content();
    }
    else {
        console.log("Something went wrong.");
        res.send("Error");
    }
});