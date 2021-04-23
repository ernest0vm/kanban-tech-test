const VALID_KEYS_PATH = __dirname + '/valid-keys.txt';
const fs = require('fs');
const SEPARATOR = require('os').EOL;

module.exports = function (req, res, next) {
    try {
        // get api key from headers
        let apiKey = req.get('x-api-key')

        // api key was not found in headers
        if (!apiKey) {
            res.status(401).send()
        }

        // read key store file
        const data = fs.readFileSync(VALID_KEYS_PATH, 'utf8')
        const validKeys = data.split(SEPARATOR)

        if (validKeys.includes(apiKey)) {
            next()
        } else {
            res.status(401).send()
        }

    } catch (e) {
        console.error(e)
        next(e)
    }
};
