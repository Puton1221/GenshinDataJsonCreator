//const { EnkaNetwork } = require("enkanetwork");
//const enka = new EnkaNetwork({ language: "JP", caching: true })
const elementList = require("./data/elementList.json");
const scoreTypeList = require('./data/scoreType.json');
const { TypeError, APIError } = require('./error.js');
const { effEle, scoreCal, totalCal, addArt } = require('./funcs.js');
const { EnkaClient } = require("enka-network-api");
const enka = new EnkaClient();

module.exports = async function makeJson(uid, charaName, scoreType) {
    try {
        const scoreTypes = Object.keys(scoreTypeList);
        if (!scoreTypes.includes(scoreType)) throw new TypeError(`An invalid score type was provided.`);

        const user = await enka.fetchUser(uid);
        const info = user.characters.filter(r => charaName === r.characterData.name.get('jp'));
        const chara = info[0];
        if (!chara) throw new APIError(`Cannot find charater`);

        //console.log(chara.artifacts[0]?.substats)

        let data = {
            "uid": uid,
            "Character": {
                "Name": chara.characterData.name.get('jp'),
                "Const": chara.unlockedConstellations.length,
                "Level": chara.level,
                "Love": chara.friendshipLevel,
                "Status": {
                    "HP": Math.round(chara.status.maxHealth.value),
                    "攻撃力": Math.round(chara.status.attack.value),
                    "防御力": Math.round(chara.status.defense.value),
                    "元素熟知": Math.round(chara.status.elementMastery.value),
                    "会心率": Math.round(chara.status.critRate.value * 1000) / 10,
                    "会心ダメージ": Math.round(chara.status.critDamage.value * 1000) / 10,
                    "元素チャージ効率": Math.round(chara.status.chargeEfficiency.value * 1000) / 10,
                },
                "Talent": {
                    "通常": chara.skillLevels[0].level.value,
                    "スキル": chara.skillLevels[1].level.value,
                    "爆発": chara.skillLevels[2].level.value
                },
                "Base": {
                    "HP": Math.round(chara.status.healthBase.value),
                    "攻撃力": Math.round(chara.status.attackBase.value),
                    "防御力": Math.round(chara.status.defenseBase.value)
                }
            },
            "Weapon": {
                "name": chara.weapon.weaponData.name.get('jp'),
                "Level": chara.weapon.level,
                "totu": chara.weapon.ascension,
                "rarelity": chara.weapon.weaponData.stars,
                "BaseATK": chara.weapon.weaponStats[0].value,
                "Sub": {
                    "name": chara.weapon.weaponStats[1].type.get('jp'),
                    "value": chara.weapon.weaponStats[1].value
                }
            },
            "Score": {
                "State": scoreTypeList[scoreType],
                "total": await totalCal(chara, scoreType),
                "flower": await scoreCal(chara.artifacts[0]?.substats, scoreType),
                "wing": await scoreCal(chara.artifacts[1]?.subStats, scoreType),
                "clock": await scoreCal(chara.artifacts[2]?.subStats, scoreType),
                "cup": await scoreCal(chara.artifacts[3]?.subStats, scoreType),
                "crown": await scoreCal(chara.artifacts[4]?.subStats, scoreType)
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