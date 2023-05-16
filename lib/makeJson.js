const [scoreTypeList, artList] = ["./data/scoreType.json", "./data/artList.json"].map(module => require(module));
// 各種Jsonファイルの読み込み
const { APIError } = require("./error.js");
const { effEle, scoreCal, totalCal, addArt } = require("./funcs.js");
const { EnkaClient } = require("enka-network-api");
const enka = new EnkaClient({ defaultLanguage: "jp", showFetchCacheLog: true });
const fs = require("fs-extra");
const path = require("node:path");
const cacheDirs = new Set()
// 各種関数やモジュールのインポート

async function makeJson(uid, charaName, scoreType, option = {}) {
    try {
        let filePath;
        const cachePath = path.join(__dirname, "..", "./node_modules/enka-network-api/cache");

        if (option.length > 0 && Object.keys(option)[0] !== "cacheDirectory") throw new APIError(`${Object.keys(option)[0]} is not available option.`);
        if (option.cacheDirectory && typeof option.cacheDirectory !== "string") throw new APIError(`${option.cacheDirectory} is not a folder path`);

        const cacheDir = option.cacheDirectry ?? "./api-cache";
        if (!cacheDirs.has(cacheDir)) {
            cacheDirs.add(cacheDir);

            filePath = path.join(path.dirname(process.argv[1]), cacheDir);

            const dir = fs.existsSync(filePath);
            if (!dir) {
                fs.copySync(cachePath, filePath);
            } else {
                fs.stat(filePath, (err, stats) => {
                    if (!stats.isDirectory()) throw new APIError(`${option.cacheDirectory} is not a directory`);
                });
            };

            enka.cachedAssetsManager.cacheDirectoryPath = filePath;
            enka.cachedAssetsManager.cacheDirectorySetup();
            enka.cachedAssetsManager.fetchAllContents();
        }

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
        // キャラクターの元素ダメージを追加

        const artData = addArt(chara);
        data["Artifacts"] = artData;
        // 聖遺物追加

        artifacts.forEach(r => {
            data["Score"][artList[r.artifactData.equipType]] = scoreCal(r.substats, scoreType);
        });
        // 聖遺物スコア追加

        const element = chara.characterData.element.name.get()[0];
        data["元素"] = element;
        // 元素の種類

        if (!chara.costume.isDefault) {
            data["Character"]["Costume"] = chara.costume.id;
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

module.exports = makeJson;