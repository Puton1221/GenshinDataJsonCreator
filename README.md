# GenshinDataJsonCreator

| JP | [EN](README.md) |

<p align="center">
<a href="LICENSE"><img alt="GitHub" src="https://img.shields.io/github/license/Puton1221/GenshinDataJsonCreator?color=success&logo=Gitbook&logoColor=white&style=for-the-badge"></a><a href="https://discord.com/invite/kuronekoserver-support-867038364552396860"><img alt="Discord" src="https://img.shields.io/discord/867038364552396860?color=success&label=SUPPORT%20SERVER&logo=Discord&logoColor=white&style=for-the-badge"></a><br><a href="https://nodejs.org/"><img alt="node.js - 20.9.0" src="https://img.shields.io/badge/node.js-20.9.0-success?color=success&style=for-the-badge&logo=Node.js&logoColor=white"></a><a href="https://www.npmjs.com/package/genshindatajsoncreator?activeTab=readme"><img alt="npm" src="https://img.shields.io/npm/dt/genshindatajsoncreator?label=npm%20installs&logo=npm&style=for-the-badge&logoColor=white"></a><a href="https://developer.mozilla.org/docs/Web/JavaScript"><img alt="GitHub top language" src="https://img.shields.io/github/languages/top/Puton1221/GenshinDataJsonCreator?color=success&logo=javascript&logoColor=white&style=for-the-badge"></a>
</p>

# 📚 インストール

- **`npm`での方法**
  ```shell
  npm i enka-network-api genshindatajsoncreator
  ```

# 🤖 使い方

```js
const { GDJC } = require("genshindatajsoncreator");
const gdjc = new GDJC("jp");

async function create() {
  const a = await gdjc.makeJson("あなたのUID", "キャラクター名", "ATTACK");
  console.dir(a, { depth: null }); // makeJson関数はobjcectを返します。
}

create();

// Score Calculation Method は次のうちから選んでください。"ATTACK", "HP", "CHARGE" and "ELEMENT".
```

---

# 🎮 製作者・サポート

#### [ぷとん(Puton)](https://github.com/Puton1221)

# 🐈 協力

![KuronekoServer](https://raw.githubusercontent.com/kuroneko6423/kuroneko6423/main/kuronekoServer.jpg)

### ArtifacterImageGen REMakeProject By [KuronekoServer](https://kuroneko6423.com/)
