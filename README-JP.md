# GenshinDataJsonCreator
| JP | [EN](README.md) |

![GitHub all releases](https://img.shields.io/github/downloads/Puton1221/GenshinDataJsonCreator/total?logo=GitHub&style=for-the-badge)![GitHub](https://img.shields.io/github/license/Puton1221/GenshinDataJsonCreator?logo=GitBook&style=for-the-badge)![Discord](https://img.shields.io/discord/867038364552396860?logo=Discord&style=for-the-badge)![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Puton1221/GenshinDataJsonCreator?logo=Files&style=for-the-badge)

# 📚インストール
- **`npm`での方法**
  ```shell
  npm i enkanetwork genshindatajsoncreator
  ```
  (パッケージに関する知識が浅いため、他の言語への対応は難しいです。)

# 🤖使い方
❌ESMは対応しておりません。
```js
const makeJson = require('GenshinDataJsonCreator');
makeJson(uid, "Character Name", "Score Calculation Method")
    .then(data => {
        console.dir(data, { depth: null }); // data.jsonの代わりにdataオブジェクトを渡します。
    });

// Character Name は日本語のキャラ名です。
// Score Calculation Method は次のうちから選んでください。"ATTACK", "HP", "CHARGE" and "ELEMENT".
```

---

# 🎮製作者・サポート
#### [ぷとん(Puton)](https://github.com/Puton1221)
# 🐈協力
![KuronekoServer](https://raw.githubusercontent.com/kuroneko6423/kuroneko6423/main/kuronekoServer.jpg)
### ArtifacterImageGen REMakeProject By [KuronekoServer](https://kuroneko6423.com/)
