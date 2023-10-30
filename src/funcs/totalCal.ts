import { ScoreCode } from "../helper";

export function totalCal(chara: any, scoreType: ScoreCode) {
  let result = 0;
  chara.artifacts.forEach((r: any) => {
    if (r.substats === undefined) return;
    const getStatValue = (prop: any) =>
      r.substats.total.find((s: any) => s.fightProp === prop)?.value;
    let mainPer = 0;
    switch (scoreType) {
      case "ATTACK":
        mainPer = getStatValue("FIGHT_PROP_ATTACK_PERCENT") * 100;
        break;
      case "HP":
        mainPer = getStatValue("FIGHT_PROP_HP_PERCENT") * 100;
        break;
      case "CHARGE":
        mainPer = getStatValue("FIGHT_PROP_CHARGE_EFFICIENCY") * 100;
        break;
      case "ELEMENT":
        mainPer = getStatValue("FIGHT_PROP_ELEMENT_MASTERY") / 4;
        break;
      case "DEFENCE":
        mainPer = getStatValue("FIGHT_PROP_DEFENSE_PERCENT") * 100 * 2;
        break;
    }
    const criPer = getStatValue("FIGHT_PROP_CRITICAL") * 100;
    const criDama = getStatValue("FIGHT_PROP_CRITICAL_HURT") * 100;
    const toNumber = (x: any) => (x ? x : 0);
    const res = toNumber(mainPer) + toNumber(criPer) * 2 + toNumber(criDama);
    result += Math.round(res * 10) / 10;
  });
  return Math.round(result * 10) / 10;
}
