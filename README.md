# GenshinDataJsonCreator
| [JP](README-JP.md) | EN |

[![GenshinDataJsonCreator](https://github.com/Puton1221/GenshinDataJsonCreator/actions/workflows/npm-publish-github-packages.yml/badge.svg?branch=main)](https://github.com/Puton1221/GenshinDataJsonCreator/actions/workflows/npm-publish-github-packages.yml)

![GitHub all releases](https://img.shields.io/github/downloads/Puton1221/GenshinDataJsonCreator/total?logo=GitHub&style=for-the-badge)![GitHub](https://img.shields.io/github/license/Puton1221/GenshinDataJsonCreator?logo=GitBook&style=for-the-badge)![Discord](https://img.shields.io/discord/867038364552396860?logo=Discord&style=for-the-badge)![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Puton1221/GenshinDataJsonCreator?logo=Files&style=for-the-badge)

# 📚Install
- **Usage for`npm`**
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
