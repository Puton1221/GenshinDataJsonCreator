const { scoreTypeList, artList } = require('./data');
const { APIError } = require("./error.js");
const { effEle, scoreCal, totalCal, addArt } = require("./funcs.js");
const { EnkaClient } = require("enka-network-api");
const enka = new EnkaClient({ defaultLanguage: "jp" });
const cacheStat = new Set();
const path = require('node:path')

async function makeJson(uid, charaName, scoreType) {
    try {
        const scoreTypes = Object.keys(scoreTypeList);
        if (!scoreTypes.includes(scoreType)) throw new TypeError(`An invalid score type was provided.`);

        const user = await enka.fetchUser(uid);
        const info = user.characters.filter(r => charaName === r.characterData.name.get());
        const chara = info[0];
        if (!chara) throw new APIError(`Cannot find charater`);

        const { unlockedConstellations, level, friendship, status, skillLevels, weapon, artifacts } = chara;
        const { name } = chara.characterData;
        const { value, type } = weapon.weaponStats[1];

        let data = {
            "uid": uid,
            "Character": {
                "Name": name.get(),
                "Const": unlockedConstellations.length,
                "Level": level,
                "Love": friendship,
                "Status": {
                    "HP": Math.round(status.maxHealth.value),
                    "攻撃力": Math.round(status.attack.value),
                    "防御力": Math.round(status.defense.value),
                    "元素熟知": Math.round(status.elementMastery.value),
                    "会心率": Math.round(status.critRate.value * 1000) / 10,
                    "会心ダメージ": Math.round(status.critDamage.value * 1000) / 10,
                    "元素チャージ効率": Math.round(status.chargeEfficiency.value * 1000) / 10,
                },
                "Talent": {
                    "通常": skillLevels[0].level.value,
                    "スキル": skillLevels[1].level.value,
                    "爆発": skillLevels[2].level.value
                },
                "Base": {
                    "HP": Math.round(status.healthBase.value),
                    "攻撃力": Math.round(status.attackBase.value),
                    "防御力": Math.round(status.defenseBase.value)
                }
            },
            "Weapon": {
                "name": weapon.weaponData.name.get(),
                "Level": weapon.level,
                "totu": weapon.refinementRank,
                "rarelity": weapon.weaponData.stars,
                "BaseATK": weapon.weaponStats[0].value,
                "Sub": {
                    "name": type.get(),
                    "value": weapon.weaponStats[1].isPercent ? Math.round(value * 1000) / 10 : value
                }
            },
            "Score": {
                "State": scoreTypeList[scoreType],
                "total": totalCal(chara, scoreType)
            },
        };

        const effData = effEle(chara);
        const effKeys = Object.keys(effData);
        effKeys.forEach(f => {
            data["Character"]["Status"][f] = effData[f];
        });

        const artData = addArt(chara);
        data["Artifacts"] = artData;

        artifacts.forEach(r => {
            data["Score"][artList[r.artifactData.equipType]] = scoreCal(r.substats, scoreType);
        });

        const element = chara.characterData.element.name.get()[0];
        data["元素"] = element;

        if (!chara.costume.isDefault) {
            data["Character"]["Costume"] = chara.costume.id;
        };

        return data;

    } catch (err) {
        if (err.message === "Request to enka.network failed because it is under maintenance.") {
            return "Enka.Network is now under maintenaunce";
        };
        if (err instanceof Error) {
            console.error(err.stack + "\n" + err.name + ": " + err.message);
        } else {
            console.error(err);
        };
    };
};

async function cacheUpdate(dir) {
    if (!cacheStat.has(dir)) {
        const cacheDir = path.join(process.cwd(), dir);
        enka.cachedAssetsManager.cacheDirectoryPath = cacheDir;
        enka.cachedAssetsManager.cacheDirectorySetup();
        enka.cachedAssetsManager.fetchAllContents();
        cacheStat.add(dir);
    }
}

module.exports = { cacheUpdate, makeJson };