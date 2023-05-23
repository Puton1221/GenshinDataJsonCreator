const test = require('ava');
const { cacheCreate, makeJson } = require('../index.js');
const { EnkaClient } = require("enka-network-api");
const enka = new EnkaClient({ defaultLanguage: "jp" });
const dotenv = require('dotenv');
dotenv.config();

cacheCreate("./cache")
    .then(async () => {
        const result = await makeJson(process.env.uid, "雷電将軍", "ATTACK")
        console.dir(result, { depth: null });
    });

/*
test("makeJson complete", async t => {
cacheCreate("./cache")
    .then(async () => {
        const result = await makeJson(process.env.uid, "雷電将軍", "ATTACK")
        console.dir(result, { depth: null });
    });
t.pass();
});
*/