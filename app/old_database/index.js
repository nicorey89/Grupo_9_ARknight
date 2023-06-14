const path = require("path");
const fs = require("fs");

module.exports = {
    carousel: JSON.parse(fs.readFileSync(path.join(__dirname, "/carousel.json"), "utf-8")),
}