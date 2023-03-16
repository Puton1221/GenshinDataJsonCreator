# GenshinDataJsonCreator
| [JP](README-JP.md) | EN |

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/Puton1221/GenshinDataJsonCreator/npm-publish-github-packages.yml?label=BUILD%20RESULT&logo=When%20I%20Work&logoColor=white&style=for-the-badge)](https://github.com/Puton1221/GenshinDataJsonCreator/actions)[![GitHub](https://img.shields.io/github/license/Puton1221/GenshinDataJsonCreator?color=success&logo=GitBook&logoColor=white&style=for-the-badge)](LICENSE)![Discord](https://img.shields.io/discord/867038364552396860?color=success&label=SUPPORT%20SERVER&logo=Discord&logoColor=white&style=for-the-badge)[![node.js - 18.15.0](https://img.shields.io/badge/node.js-18.15.0-success?color=success&style=for-the-badge&logo=Node.js&logoColor=white)](https://nodejs.org/ja/download/)[![npm](https://img.shields.io/npm/dt/genshindatajsoncreator?label=npm%20installs&logo=npm&style=for-the-badge&logoColor=white)](https://www.npmjs.com/package/genshindatajsoncreator?activeTab=readme)

# 📚Install
- **Usage for `npm`**
  ```shell
  npm i enkanetwork genshindatajsoncreator
  ```
  (Since our knowledge of packaging is limited, it may be difficult to support other languages.)

# 🤖Usage
❌ESM is not supported.
```js
const makeJson = require('GenshinDataJsonCreator');
makeJson(uid, "Character Name", "Score Calculation Method")
    .then(data => {
        console.dir(data, { depth: null }); // Pass data object instead of data.json.
    });

// Character Name is Japanese name.
// Score Calculation Method is one of "ATTACK", "HP", "CHARGE" and "ELEMENT".
```

---

# 🎮Creator and Support
#### [ぷとん(Puton)](https://github.com/Puton1221)
# 🐈Powered by 
![KuronekoServer](https://raw.githubusercontent.com/kuroneko6423/kuroneko6423/main/kuronekoServer.jpg)
### ArtifacterImageGen REMakeProject By [KuronekoServer](https://kuroneko6423.com/)
