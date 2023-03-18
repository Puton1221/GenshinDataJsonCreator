const { EnkaNetwork } = require("enkanetwork");
const enka = new EnkaNetwork({ language: "JP", caching: true });
const elementList = require("./data/elementList.json");
const statNameList = require("./data/statNameList.json");
const scoreTypeList = require('./data/scoreType.json');
const { TypeError, CharaError } = require('./error.js');
const { effEle, scoreCal, totalCal, addArt } = require('./funcs.js');

module.exports = async function makeJson(uid, charaName, scoreType) {
    try {
        const scoreTypes = Object.keys(scoreTypeList);
        if (!scoreTypes.includes(scoreType)) throw new TypeError(`An invalid score type was provided.`);

        const user = await enka.fetchUser(uid, "JP");
        const info = user.characters.filter(r => r.name === charaName);
        const chara = info[0];
        if (!chara) throw new CharaError(`Cannot find charater`)


        let data = {
            "uid": uid,
            "Character": {
                "Name": chara.name,
                "Const": chara.constellation.filter(r => r.unlocked === true).map(r => r.unlocked).length,
                "Level": chara.level,
                "Love": chara.friendshipLevel,
                "Status": {
                    "HP": Math.round(chara.stats.FIGHT_PROP_MAX_HP),
                    "攻撃力": Math.round(chara.stats.FIGHT_PROP_CUR_ATTACK),
                    "防御力": Math.round(chara.stats.FIGHT_PROP_DEFENSE),
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
                "totu": chara.weapon.improvement,
                "rarelity": chara.weapon.rarity,
                "BaseATK": chara.weapon.mainStat.statValue,
                "Sub": {
                    "name": statNameList[chara.weapon.subStat.appendPropId],
                    "value": chara.weapon.subStat.statValue
                }
            },
            "Score": {
                "State": scoreTypeList[scoreType],
                "total": await totalCal(chara, scoreType),
                "flower": await scoreCal(chara.reluquary[0]?.subStats, scoreType),
                "wing": await scoreCal(chara.reluquary[1]?.subStats, scoreType),
                "clock": await scoreCal(chara.reluquary[2]?.subStats, scoreType),
                "cup": await scoreCal(chara.reluquary[3]?.subStats, scoreType),
                "crown": await scoreCal(chara.reluquary[4]?.subStats, scoreType)
            },
        };

        const effData = await effEle(chara);
        const effKeys = Object.keys(effData);
        effKeys.forEach(f => {
            data["Character"]["Status"][f] = effData[f];
        });

        const artData = await addArt(chara);
        data["Artifacts"] = artData;

        const element = await elementList[chara.element];
        data["元素"] = element;

        return data;
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.stack + "\n" + err.name + ": " + err.message);
        } else {
            console.error(err)
        }
    };
};