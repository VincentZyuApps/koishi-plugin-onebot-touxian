# koishi-plugin-onebot-touxian

🏷️ Koishi 插件：onebot-touxian - QQ 群头衔修改插件，支持管理员给成员设置头衔和群成员自助设置头衔。

[![npm](https://img.shields.io/npm/v/koishi-plugin-onebot-touxian?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-onebot-touxian)
[![npm-download](https://img.shields.io/npm/dm/koishi-plugin-onebot-touxian?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-onebot-touxian)

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/settings)
[![Gitee](https://img.shields.io/badge/Gitee-C71D23?style=for-the-badge&logo=gitee&logoColor=white)](https://gitee.com/settings)

[![Koishi Forum](https://img.shields.io/badge/forum.koishi.xyz_topic_114514-5546A3?style=for-the-badge&logo=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Ff%2Ff3%2FKoishi.js_Logo.png&logoColor=white)](https://forum.koishi.xyz/t/topic/114514)
[![QQ群](https://img.shields.io/badge/QQ群-1085190201-12B7F5?style=flat-square&logo=qq&logoColor=white)](https://qm.qq.com/q/1085190201)

<p><del>💬 插件使用问题 / 🐛 Bug反馈 / 👨‍💻 插件开发交流，欢迎加入QQ群：<b>259248174</b>   🎉（这个群G了）</del></p> 
<p>💬 插件使用问题 / 🐛 Bug反馈 / 👨‍💻 插件开发交流，欢迎加入新QQ群：<b>1085190201</b> 🎉</p>
<p>💡 在群里直接艾特我，回复的更快哦~ ✨</p>


---

## 📷 预览

![preview](doc/images/preview.png)

---

## 📦 安装

```bash
yarn add koishi-plugin-onebot-touxian
# or
npm install koishi-plugin-onebot-touxian
```
或在 Koishi 控制台的插件市场中搜索 `onebot-touxian` 安装。

---

## ✨ 功能特性

- 👑 **管理员设置头衔** — 通过 `设置头衔` 指令为指定成员设置群头衔（需在配置中添加 QQ 号）
- 🆓 **自助设置头衔** — 群成员通过 `自助头衔` 指令为自己设置专属头衔
- 🏷️ **支持 @ 提及** — 通过 `@用户` 或直接输入 QQ 号指定目标用户
- 🔄 **指令别名** — `设置头衔` 同时支持 `ast` 和 `awa_set_title` 两种别名

---

## 📱 前置条件

使用本插件前，请确保目标群已开启 **展示成员群头衔** 功能：

手机QQ → 右上角 `☰` → `管理群` → `个性管理` → `群头衔和标识管理` → 开启 **「展示成员群头衔」**

> 否则即使通过 API 设置了头衔，群成员也不会看到。

---

## 📝 使用示例

### 1️⃣ 管理员给他人设置头衔

需要先将自己的 QQ 号添加到配置的 `adminUsers` 列表中。

```bash
设置头衔 ThisIsALongTouxian @VincentZyu
```
> 可以通过 @ 方式指定用户并设置头衔

```bash
设置头衔 ThisIsAnotherLongTouxian 1830540513
```
> 也可以传入qq号

---

### 2️⃣ 自助设置头衔

任何人都可以使用，为自己设置专属群头衔。

```bash
自助头衔 ThisIsMyTitle
```

---

## 🔧 配置项

| 配置项 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `adminCommandName` | `string` | `设置头衔` | 管理员给他人设置头衔的指令名|
| `selfCommandName` | `string` | `自助头衔` | 给自己设置头衔的指令名 |
| `adminUsers` | `string[]` | `[]` | 允许使用`设置头衔`指令的 QQ 号列表 |