const fs = require('fs');
const path = require('path');

module.exports = {
    
    readJSON : (json) => {
        return JSON.parse(fs.readFileSync(path.resolve(__dirname, json)))
    },
    
    writeJSON : (json, array) => {
        fs.writeFileSync(path.resolve(__dirname,json), JSON.stringify(array, null,3), 'utf-8')
    },
}