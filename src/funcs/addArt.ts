import { artList } from "../data";
import { removeStatList } from "../data";

export function addArt(chara: any) {
  let artData: any = {};
  chara.artifacts.forEach((r: any) => {
    artData[artList[r.artifactData.equipType]] = {
      type: r.artifactData.set.name.get(),
      Level: r.level - 1,
      rarelity: r.artifactData.stars,
      main: {
        option:
          !removeStatList.includes(r.mainstat.id) && r.mainstat.isPercent
            ? r.mainstat.fightPropName.get().replace(/力$/, "") +
              "パーセンテージ"
            : r.mainstat.fightPropName.get(),
        value: r.mainstat.isPercent
          ? Math.round(r.mainstat.value * 100)
          : Math.round(r.mainstat.value),
      },
    };

    let sub: any = [];
    if (r.substats) {
      r.substats.total.forEach((s: any) => {
        sub.push({
          option:
            !removeStatList.includes(s.id) && s.isPercent
              ? s.fightPropName.get().replace(/力$/, "") + "パーセンテージ"
              : s.fightPropName.get(),
          value: s.isPercent
            ? Math.round(s.value * 1000) / 10
            : Math.round(s.value),
        });
      });
      artData[artList[r.artifactData.equipType]]["sub"] = sub;
    }
  });
  return artData;
}
