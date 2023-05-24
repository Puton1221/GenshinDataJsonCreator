const test = require('ava');
const { cacheCreate, makeJson } = require('../index.js');
const dotenv = require('dotenv');
dotenv.config();

test("makeJson complete", async t => {
    cacheCreate("./cache")
        .then(async () => {
            const result = await makeJson(process.env.uid, "雷電将軍", "ATTACK")
            console.dir(result, { depth: null });
        });
    t.pass();
});