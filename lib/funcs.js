const elementList = require("./data/elementList.json");
const statNameList = require("./data/statNameList.json");
const artList = require("./data/artList.json");

async function attackCal(chara) {
    const stats = chara.stats;
    const baseATK = stats.FIGHT_PROP_BASE_ATTACK;
    const weaponATK = chara.weapon.mainStat.statValue;
    let perATK = 0;
    let valATK = 0;
    await chara.reluquary.forEach(async r => {
        const relus = await Object.values(r.subStats);
        const getStatValue = prop => relus.find(r => r.appendPropId === prop)?.statValue;
        const attackPer = getStatValue('FIGHT_PROP_ATTACK_PERCENT');
        const attackVal = getStatValue('FIGHT_PROP_ATTACK');
        const toNumber = x => x ? x : 0;
        perATK += toNumber(attackPer);
        valATK += toNumber(attackVal);
    });
    const result = ((Math.round(baseATK) + weaponATK) * (1 + perATK / 100)) + valATK;
    return result;
};

async function effEle(chara) {
    let effData = {};
    const regex = /FIGHT_PROP_[A-Z]+_ADD_HURT/;
    const values = Object.values(chara.stats);
    const keys = Object.keys(chara.stats).filter((key, index) => values[index] > 0).filter(obj => regex.test(obj));
    keys.forEach(r => {
        effData[statNameList[r]] = Math.round(chara.stats[r] * 100)
    });
    return effData;
};

async function scoreCal(relu, scoreType) {
    if (relu === undefined) return 0;
    const relus = await Object.values(relu);
    const getStatValue = prop => relus.find(r => r.appendPropId === prop)?.statValue;
    let mainPer = 0;
    switch (scoreType) {
        case 'ATTACK':
            mainPer = getStatValue('FIGHT_PROP_ATTACK_PERCENT');
            break;
        case 'HP':
            mainPer = getStatValue("FIGHT_PROP_HP_PERCENT");
            break;
        case 'CHARGE':
            mainPer = getStatValue("FIGHT_PROP_CHARGE_EFFICIENCY");
            break;
        case 'ELEMENT':
            mainPer = getStatValue("FIGHT_PROP_ELEMENT_MASTERY") / 4;
            break;
    };
    const criPer = getStatValue('FIGHT_PROP_CRITICAL');
    const criDama = getStatValue('FIGHT_PROP_CRITICAL_HURT');
    const toNumber = x => x ? x : 0;
    const result = toNumber(mainPer) + (toNumber(criPer) * 2) + toNumber(criDama);
    return Math.round(result * 10) / 10;
};

async function totalCal(chara, scoreType) {
    let result = 0;
    await chara.reluquary.forEach(async r => {
        const relus = await Object.values(r.subStats);
        const getStatValue = prop => relus.find(r => r.appendPropId === prop)?.statValue;
        let mainPer = 0;
        switch (scoreType) {
            case 'ATTACK':
                mainPer = getStatValue('FIGHT_PROP_ATTACK_PERCENT');
                break;
            case 'HP':
                mainPer = getStatValue("FIGHT_PROP_HP_PERCENT");
                break;
            case 'CHARGE':
                mainPer = getStatValue("FIGHT_PROP_CHARGE_EFFICIENCY");
                break;
            case 'ELEMENT':
                mainPer = getStatValue("FIGHT_PROP_ELEMENT_MASTERY") / 4;
                break;
        };
        const criPer = getStatValue('FIGHT_PROP_CRITICAL');
        const criDama = getStatValue('FIGHT_PROP_CRITICAL_HURT');
        const toNumber = x => x ? x : 0;
        const res = toNumber(mainPer) + toNumber(criPer) * 2 + toNumber(criDama);
        result += (Math.round(res * 10) / 10);
    });
    return Math.round(result * 10) / 10;
};

async function addArt(chara) {
    let artData = {};
    await chara.reluquary.forEach(r => {
        artData[artList[r.type]] = {
            "type": r.setName,
            "Level": r.level,
            "rarelity": r.rarity,
            "main": {
                "option": statNameList[r.mainStats.mainPropId],
                "value": r.mainStats.statValue
            }
        }
        let sub = [];
        r.subStats.forEach(s => {
            sub.push({
                "option": statNameList[s.appendPropId],
                "value": s.statValue
            });
        });
        artData[artList[r.type]]["sub"] = sub;
    });
    return artData
};

module.exports = { attackCal, effEle, scoreCal, totalCal, addArt }