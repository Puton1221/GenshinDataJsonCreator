const { EnkaNetwork } = require("enkanetwork");
const enka = new EnkaNetwork({ language: "JP", caching: true });
const elementList = require("./data/elementList.json");
const statNameList = require("./data/statNameList.json");
const artList = require("./data/artList.json");
const { TypeError, CharaError } = require('./error.js');
const { attackCal, effEle, scoreCal, totalCal, addArt } = require('./funcs.js');

module.exports = async function makeJson(uid, charaName, scoreType) {
    if (scoreType !== "ATTACK" && scoreType !== "HP" && scoreType !== "CHARGE" && scoreType !== "ELEMENT") {
        try {
            throw new TypeError(`an invalid score type was provided.`);
        } catch (err) {
            console.error(err.name + ": " + err.message);
        };
        return;
    };

    const user = await enka.fetchUser(uid, "JP");
    const info = user.characters.filter(r => r.name === charaName);
    const chara = info[0];
    if (!chara) {
        try {
            throw new CharaError(`cannot find charater`)
        } catch (err) {
            console.error(err.name + ": " + err.message);
        };
        return;
    };

    let data = {
        "uid": uid,
        "input": "",
        "character": {
            "Name": chara.name,
            "Const": chara.constellation.filter(r => r.unlocked === true).map(r => r.unlocked).length,
            "Level": chara.level,
            "Love": chara.friendshipLevel,
            "Status": {
                "HP": Math.round(chara.stats.FIGHT_PROP_MAX_HP),
                "攻撃力": Math.round(await attackCal(chara)),
                "防御力": Math.round(chara.stats.FIGHT_PROP_BASE_DEFENSE + chara.stats.FIGHT_PROP_DEFENSE),
                "元素熟知": Math.round(chara.stats.FIGHT_PROP_ELEMENT_MASTERY),
                "会心率": Math.round(chara.stats.FIGHT_PROP_CRITICAL * 1000) / 10,
                "会心ダメージ": Math.round(chara.stats.FIGHT_PROP_CRITICAL_HURT * 1000) / 10,
                "元素チャージ効率": Math.round(chara.stats.FIGHT_PROP_CHARGE_EFFICIENCY * 1000) / 10,
            },
            "Talent": {
                "通常": chara.skills[0].level,
                "スキル": chara.skills[1].level,
                "爆発": chara.skills[2].level
            },
            "Base": {
                "HP": Math.round(chara.stats.BASE_HP),
                "攻撃力": Math.round(chara.stats.FIGHT_PROP_BASE_ATTACK),
                "防御力": Math.round(chara.stats.FIGHT_PROP_BASE_DEFENSE)
                }
            },
            "Weapon": {
                "name": chara.weapon.name,
                "Level": chara.weapon.level,
                "totu": chara.weapon.improvement - 1,
                "rarelity": chara.weapon.rarity,
                "BaseATK": chara.weapon.mainStat.statValue,
                "Sub": {
                    "name": statNameList[chara.weapon.subStat.appendPropId],
                    "value": chara.weapon.subStat.statValue
                }
            },
            "Score": {
                "State": scoreType,
                "total": await totalCal(chara, scoreType),
                "flower": await scoreCal(chara.reluquary[0]?.subStats, scoreType),
                "wing": await scoreCal(chara.reluquary[1]?.subStats, scoreType),
                "clock": await scoreCal(chara.reluquary[2]?.subStats, scoreType),
                "cup": await scoreCal(chara.reluquary[3]?.subStats, scoreType),
                "crown": await scoreCal(chara.reluquary[4]?.subStats, scoreType)
            },

        
        "元素": elementList[chara.element]
    
    };

    const effData = await effEle(chara);
    const effKeys = Object.keys(effData);
    effKeys.forEach(f => {
        data["character"]["Status"][f] = effData[f];
    });

    const artData = await addArt(chara);
    data["character"]["Artifacts"] = artData;

    return data;
};