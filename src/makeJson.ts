import { EnkaClient } from "enka-network-api";
import { LanguageCode, ScoreCode } from "./helper";
import { makeJson } from "./funcs";

export class GDJC {
  enka: EnkaClient;

  constructor(lang: LanguageCode) {
    this.enka = new EnkaClient({ defaultLanguage: lang });
  }

  async makeJson(uid: number, charaName: string, scoreType: ScoreCode) {
    return await makeJson(this.enka, uid, charaName, scoreType);
  }
}
