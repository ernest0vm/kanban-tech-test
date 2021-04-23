const VALID_KEYS_PATH = __dirname + '/valid-keys.txt';
const fs = require('fs');
const shortid = require('shortid');
// To generate a unique API KEY, use shortid.generate()
const LINE_ENDING = require('os').EOL;


module.exports = function (req, res, next) {
    try {
        // generate shortid string
        let validApiKey = shortid.generate()
        // let buffer = Buffer(validApiKey);
        // let base64data = buffer.toString('base64');

        // write to key storenfile
        fs.appendFile(VALID_KEYS_PATH, `${validApiKey}${LINE_ENDING}`, 'utf8', function (err) {
            if (err) return console.log(err);
            console.log(`${validApiKey} > valid-keys.txt`);
        });

        // build response body
        let response = {
            apiKey: validApiKey
        }

        // response created
        res.status(201).send(response);
    } catch (e) {
        console.log(e)
        next(e)
    }
};

