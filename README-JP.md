# GenshinDataJsonCreator
| JP | [EN](README.md) |

<p align="center">
  <a href="https://github.com/Puton1221/GenshinDataJsonCreator/actions"><img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/Puton1221/GenshinDataJsonCreator/.github/workflows/npm-publish-github-packages.yml?label=BUILD%20RESULT&logo=When%20I%20Work&logoColor=white&style=for-the-badge"></a><a href="LICENSE"><img alt="GitHub" src="https://img.shields.io/github/license/Puton1221/GenshinDataJsonCreator?color=success&logo=Gitbook&logoColor=white&style=for-the-badge"></a><img alt="Discord" src="https://img.shields.io/discord/867038364552396860?color=success&label=SUPPORT%20SERVER&logo=Discord&logoColor=white&style=for-the-badge"><br><a href="https://nodejs.org/"><img alt="node.js - 18.15.0" src="https://img.shields.io/badge/node.js-18.15.0-success?color=success&style=for-the-badge&logo=Node.js&logoColor=white"></a><a href="https://www.npmjs.com/package/genshindatajsoncreator?activeTab=readme"><img alt="npm" src="https://img.shields.io/npm/dt/genshindatajsoncreator?label=npm%20installs&logo=npm&style=for-the-badge&logoColor=white"></a>
</p>

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
