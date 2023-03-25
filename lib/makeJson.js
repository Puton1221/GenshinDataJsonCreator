const [elementList, scoreTypeList, removeStatList] = ["./data/elementList.json", "./data/scoreType.json", "./data/removeStatList.json"].map(module => require(module));
// 各種Jsonファイルの読み込み
const { TypeError, APIError } = require("./error.js");
const { effEle, scoreCal, totalCal, addArt, getCostume } = require("./funcs.js");
const { EnkaClient } = require("enka-network-api");
// 各種関数のインポート

const enka = new EnkaClient({ defaultLanguage: "jp" });

module.exports = async function makeJson(uid, charaName, scoreType) {
    try {
        const scoreTypes = Object.keys(scoreTypeList);
        if (!scoreTypes.includes(scoreType)) throw new TypeError(`An invalid score type was provided.`);
        // スコア計算方式が当てはまらない場合にエラーを送信する

        const user = await enka.fetchUser(uid);
        const info = user.characters.filter(r => charaName === r.characterData.name.get());
        const chara = info[0];
        if (!chara) throw new APIError(`Cannot find charater`);
        // キャラクターが見つからなかったときにエラーを送信する

        const { unlockedConstellations, level, friendship, status, skillLevels, weapon, artifacts } = chara;
        const { name } = chara.characterData;
        const { value, type } = weapon.weaponStats[1];
        // 各種データの読み込み

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
                "totu": weapon.ascension,
                "rarelity": weapon.weaponData.stars,
                "BaseATK": weapon.weaponStats[0].value,
                "Sub": {
                    "name": type.get(),
                    "value": removeStatList.includes(weapon.weaponStats[1].id) ? Math.round(value * 1000) / 10 : value
                }
            },
            "Score": {
                "State": scoreTypeList[scoreType],
                "total": await totalCal(chara, scoreType),
                "flower": await scoreCal(artifacts[0]?.substats, scoreType),
                "wing": await scoreCal(artifacts[1]?.substats, scoreType),
                "clock": await scoreCal(artifacts[2]?.substats, scoreType),
                "cup": await scoreCal(artifacts[3]?.substats, scoreType),
                "crown": await scoreCal(artifacts[4]?.substats, scoreType)
            },
        };

        const effData = await effEle(chara);
        const effKeys = Object.keys(effData);
        effKeys.forEach(f => {
            data["Character"]["Status"][f] = effData[f];
        });
        // キャラクターの元素ダメージを追加

        const artData = await addArt(chara);
        data["Artifacts"] = artData;
        // 聖遺物追加

        const element = await elementList[chara.characterData.element.id];
        data["元素"] = element;
        // 元素の種類

        const cos = await getCostume(chara);
        if (cos) {
            data["Character"]["Costume"] = cos;
        };

        return data;

    } catch (err) {
        if (err instanceof Error) {
            console.error(err.stack + "\n" + err.name + ": " + err.message);
            // エラーが定義したものであった場合に送信
        } else {
            console.error(err);
            // 例外の際に送信
        };
    };
};