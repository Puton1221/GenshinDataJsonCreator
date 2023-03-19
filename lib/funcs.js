const statNameList = require("./data/statNameList.json");
const artList = require("./data/artList.json");
const effEleList = require("./data/effEleList.json");

async function effEle(chara) {
    let effData = {};
    const regex = /(pyro|electro|hydro|dendro|anemo|geo|cryo)Damage/;
    const key = Object.keys(chara.status);
    const keys = key.filter(obj => regex.test(obj));
    keys.forEach(r => {
        if (chara.status[r].value > 0) {
            effData[effEleList[r]] = Math.round(chara.status[r].value * 100);
        }
    });
    return effData;
};

async function scoreCal(relu, scoreType) {
    if (relu === undefined) return 0;
    const getStatValue = prop => relu.total.find(r => r._propData.textMapId === prop)?.value
    let mainPer = 0;
    switch (scoreType) {
        case 'ATTACK':
            mainPer = getStatValue('FIGHT_PROP_ATTACK_PERCENT') * 100;
            break;
        case 'HP':
            mainPer = getStatValue("FIGHT_PROP_HP_PERCENT") * 100;
            break;
        case 'CHARGE':
            mainPer = getStatValue("FIGHT_PROP_CHARGE_EFFICIENCY") * 100;
            break;
        case 'ELEMENT':
            mainPer = getStatValue("FIGHT_PROP_ELEMENT_MASTERY") / 4;
            break;
        case 'DEFENCE':
            mainPer = getStatValue("FIGHT_PROP_DEFENSE_PERCENT") * 100 * 2;
            break;
    };
    const criPer = getStatValue('FIGHT_PROP_CRITICAL') * 100;
    const criDama = getStatValue('FIGHT_PROP_CRITICAL_HURT') * 100;
    const toNumber = x => x ? x : 0;
    const result = toNumber(mainPer) + (toNumber(criPer) * 2) + toNumber(criDama);
    return Math.round(result * 10) / 10;
};

async function totalCal(chara, scoreType) {
    let result = 0;
    await chara.artifacts.forEach(async r => {
        if (r.subStats === undefined) return;
        const getStatValue = prop => r.total.find(r => r._propData.textMapId === prop)?.value
        let mainPer = 0;
        switch (scoreType) {
            case 'ATTACK':
                mainPer = getStatValue('FIGHT_PROP_ATTACK_PERCENT') * 100;
                break;
            case 'HP':
                mainPer = getStatValue("FIGHT_PROP_HP_PERCENT") * 100;
                break;
            case 'CHARGE':
                mainPer = getStatValue("FIGHT_PROP_CHARGE_EFFICIENCY") * 100;
                break;
            case 'ELEMENT':
                mainPer = getStatValue("FIGHT_PROP_ELEMENT_MASTERY") / 4;
                break;
            case 'DEFENCE':
                mainPer = getStatValue("FIGHT_PROP_DEFENSE_PERCENT") * 100 * 2;
                break;
        };
        const criPer = getStatValue('FIGHT_PROP_CRITICAL') * 100;
        const criDama = getStatValue('FIGHT_PROP_CRITICAL_HURT') * 100;
        const toNumber = x => x ? x : 0;
        const res = toNumber(mainPer) + (toNumber(criPer) * 2) + toNumber(criDama);
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
        if (r.subStats) {
            r.subStats.forEach(s => {
                sub.push({
                    "option": statNameList[s.appendPropId],
                    "value": s.statValue
                });
            });
        };
        artData[artList[r.type]]["sub"] = sub;
    });
    return artData
};

module.exports = { effEle, scoreCal, totalCal, addArt }