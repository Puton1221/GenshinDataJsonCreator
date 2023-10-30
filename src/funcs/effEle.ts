export function effEle(chara: any) {
  let effData: any = {};
  const regex = /(pyro|electro|hydro|dendro|anemo|geo|cryo)Damage/;
  const key = Object.keys(chara.stats);
  const keys = key.filter((obj) => regex.test(obj));
  keys.forEach((r) => {
    const damageBonus = chara.stats[r];

    if (damageBonus.value > 0) {
      effData[damageBonus.fightPropName.get()] = Math.round(
        damageBonus.value * 100
      );
    }
  });
  return effData;
}
