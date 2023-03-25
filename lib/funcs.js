const [artList, effEleList, removeStatList] = ["./data/artList.json", "./data/effEleList.json", "./data/removeStatList.json"].map(module => require(module));
// 各種jsonの読み込み

async function effEle(chara) {
    // 有効な元素ダメージステータスの取得
    let effData = {};
    const regex = /(pyro|electro|hydro|dendro|anemo|geo|cryo)Damage/;
    const key = Object.keys(chara.status);
    const keys = key.filter(obj => regex.test(obj));
    // regexで指定したキーがあるやつを取得
    keys.forEach(r => {
        if (chara.status[r].value > 0) {
            effData[effEleList[r]] = Math.round(chara.status[r].value * 100);
        };
    });
    return effData;
};

async function scoreCal(relu, scoreType) {
    // スコア計算をする
    if (relu === undefined) return 0;
    const getStatValue = prop => relu.total.find(r => r._propData.textMapId === prop)?.value
    // 簡易的な関数を用意
    let mainPer = 0;
    // 初期値を0に
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
    // 各種ステータスの取得
    const toNumber = x => x ? x : 0;
    //  ステータスがundefinedだったら0を返す
    const result = toNumber(mainPer) + (toNumber(criPer) * 2) + toNumber(criDama);
    return Math.round(result * 10) / 10;
};

async function totalCal(chara, scoreType) {
    // スコアの合計結果を計算
    let result = 0;
    await chara.artifacts.forEach(async r => {
        if (r.substats === undefined) return;
        const getStatValue = prop => r.substats.total.find(r => r._propData.textMapId === prop)?.value
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
    // 聖遺物を取得
    let artData = {};
    await chara.artifacts.forEach(r => {
        artData[artList[r.artifactData.equipType]] = {
            "type": r.artifactData.set.name.get(),
            "Level": r.level - 1,
            "rarelity": r.artifactData.stars,
            "main": {
                "option": !removeStatList.includes(r.mainstat.id) && r.mainstat.isPercent && r.mainstat.type.get() != "元素チャージ効率" && r.mainstat.type.get() != "会心ダメージ" && r.mainstat.type.get() != "会心率" ? r.mainstat.type.get() + "パーセンテージ" : r.mainstat.type.get(),
                "value": r.mainstat.isPercent ? Math.round(r.mainstat.value * 100) : Math.round(r.mainstat.value)
            }
        };

        let sub = [];
        if (r.substats) {
            r.substats.total.forEach(s => {
                sub.push({
                    "option": s.isPercent && s.type.get() != "元素チャージ効率" && s.type.get() != "会心ダメージ" && s.type.get() != "会心率" ? s.type.get() + "パーセンテージ" : s.type.get(),
                    "value": s.isPercent ? Math.round(s.value * 1000) / 10 : Math.round(s.value)
                });
            });
            artData[artList[r.artifactData.equipType]]["sub"] = sub;
        };
    });
    return artData;
};

async function getCostume(chara) {
    const costume = chara.costume;

    if (costume.isDefault) return;
    // コスチュームがデフォルトだったら処理をやめる

    return costume.id;

};

module.exports = { effEle, scoreCal, totalCal, addArt, getCostume }