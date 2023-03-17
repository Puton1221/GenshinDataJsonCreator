const test = require('ava');
const makeJson = require('../lib/makeJson.js');
const dotenv = require('dotenv');
dotenv.config();
test("makeJson complete", async t => {
    const result = await makeJson(process.env.uid, "雷電将軍", "ATTACK");
    console.dir(result, { depth: null })
    t.pass();
});