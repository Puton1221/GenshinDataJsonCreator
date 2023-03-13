# **THIS IS TEST VERSION!!**


# GenshinDataJsonCreator

# 📚Install
- **Usage for`npm`**
  ```shell
  npm i enkanetwork git+https://github.com/Puton1221/GenshinDataJsonCreator.git
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
```

---

# 🎮Creator and Support
#### [ぷとん(Puton)](https://github.com/Puton1221)
# 🐈Powered by 
![KuronekoServer](https://raw.githubusercontent.com/kuroneko6423/kuroneko6423/main/kuronekoServer.jpg)
### ArtifacterImageGen REMakeProject By [KuronekoServer](https://kuroneko6423.com/)
