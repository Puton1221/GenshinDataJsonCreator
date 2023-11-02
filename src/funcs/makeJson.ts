import { ScoreCode } from "../helper";
import { scoreTypeList } from "../data";
import { artList } from "../data";
import { effEle } from "./effEle";
import { scoreCal } from "./scoreCal";
import { totalCal } from "./totalCal";
import { addArt } from "./addArt";
import { GDJCError } from "../erros";
import { ErrorCode } from "../erros/code";
import { checker } from "./checker";

export async function makeJson(
  enka: any,
  uid: number,
  charaName: string,
  scoreType: ScoreCode
) {
  if (String(uid).length !== 9) {
    throw new GDJCError(ErrorCode.UIDDigitsNotEnough);
  }
  if ((await checker(uid)) == "This player does not exist.") {
    throw new GDJCError(ErrorCode.UIDInvalid);
  }
  const user = await enka.fetchUser(uid);
  const info = user.characters.filter(
    (r: any) => charaName === r.characterData.name.get()
  );
  if (info.length === 0) {
    throw new GDJCError(ErrorCode.UnknownCharaName);
  }
  const chara = info[0];

  const {
    unlockedConstellations,
    level,
    friendship,
    stats,
    skillLevels,
    weapon,
    artifacts,
  } = chara;
  const { name } = chara.characterData;
  const { value, fightPropName } = weapon.weaponStats[1];

  let data: any = {
    uid: uid,
    Character: {
      Name: name.get(),
      Const: unlockedConstellations.length,
      Level: level,
      Love: friendship,
      Status: {
        HP: Math.round(stats.currentHealth.value),
        攻撃力: Math.round(stats.attack.value),
        防御力: Math.round(stats.defense.value),
        元素熟知: Math.round(stats.elementMastery.value),
        会心率: Math.round(stats.critRate.value * 1000) / 10,
        会心ダメージ: Math.round(stats.critDamage.value * 1000) / 10,
        元素チャージ効率: Math.round(stats.chargeEfficiency.value * 1000) / 10,
      },
      Talent: {
        通常: skillLevels[0].level.value,
        スキル: skillLevels[1].level.value,
        爆発: skillLevels[2].level.value,
      },
      Base: {
        HP: Math.round(stats.healthBase.value),
        攻撃力: Math.round(stats.attackBase.value),
        防御力: Math.round(stats.defenseBase.value),
      },
    },
    Weapon: {
      name: weapon.weaponData.name.get(),
      Level: weapon.level,
      totu: weapon.refinementRank,
      rarelity: weapon.weaponData.stars,
      BaseATK: Math.round(weapon.weaponStats[0].value),
      Sub: {
        name: fightPropName.get(),
        value: Math.round(value),
      },
    },
    Score: {
      State: scoreTypeList[scoreType],
      total: totalCal(chara, scoreType),
    },
  };

  const effData = effEle(chara);
  const effKeys = Object.keys(effData);
  effKeys.forEach((f: any) => {
    data["Character"]["Status"][f] = effData[f];
  });

  const artData = addArt(chara);
  data["Artifacts"] = artData;

  artifacts.forEach((r: any) => {
    data["Score"][artList[r.artifactData.equipType]] = scoreCal(
      r.substats,
      scoreType
    );
  });

  const element = chara.characterData.element.name.get()[0];
  data["元素"] = element;

  if (!chara.costume.isDefault) {
    data["Character"]["Costume"] = chara.costume.id;
  }

  return data;
}
