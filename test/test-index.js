const test = require('ava');
const makeJson = require('../lib/makeJson.js');
const dotenv = require('dotenv');
dotenv.config();

// 神里綾華

test("makeJson complete", async t => {
    const result = await makeJson(process.env.uid, "胡桃", "ATTACK");
    console.log(result)
    t.pass();
});