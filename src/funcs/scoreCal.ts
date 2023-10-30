import { ScoreCode } from "../helper";
export function scoreCal(relu: any, scoreType: ScoreCode) {
  if (relu === undefined) return 0;
  const getStatValue = (prop: any) =>
    relu.total.find((r: any) => r._propData.textMapId === prop)?.value;

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
  const result = toNumber(mainPer) + toNumber(criPer) * 2 + toNumber(criDama);
  return Math.round(result * 10) / 10;
}
