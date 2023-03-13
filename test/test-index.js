const makeJson = require('../lib/makeJson.js');
const dotenv = require('dotenv');
dotenv.config();

makeJson(process.env.uid, "雷電将軍", "ATTACK")
    .then(data => {
        console.dir(data, { depth: null });
    });