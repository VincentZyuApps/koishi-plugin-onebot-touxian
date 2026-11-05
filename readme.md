# koishi-plugin-onebot-touxian

🏷️ Koishi 插件：onebot-touxian - QQ 群头衔修改插件，支持管理员给成员设置头衔和群成员自助设置头衔。

[![npm](https://img.shields.io/npm/v/koishi-plugin-onebot-touxian?style=flat-square&logo=npm)](https://www.npmjs.com/package/koishi-plugin-onebot-touxian)
[![npm-download](https://img.shields.io/npm/dm/koishi-plugin-onebot-touxian?style=flat-square&logo=npm)](https://npm-stat.com/charts.html?package=koishi-plugin-onebot-touxian)

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/settings)
[![Gitee](https://img.shields.io/badge/Gitee-C71D23?style=for-the-badge&logo=gitee&logoColor=white)](https://gitee.com/settings)

[![Koishi Forum](https://img.shields.io/badge/Koishi%20Forum-12605-5546A3?style=for-the-badge&labelColor=3A3A3A&logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAABU0lEQVR42p2UQSsFYRSGnxnqLuytKWKpKFkQNsS%2FsOHPWPADLCmxU5S7UzYWNrJR7lYiRF2FeWzOMKZ7mXHqNNP5vvP2nu%2B850CY2lP4X1K31ZbaDm%2BpO%2Bpyp5wfAXVEPfRvO1JHf4AVQGbUh7j4EZ4VkrNCXPVRnf3CUBN1SH2KC28VGOV3ntRhNclZHdcAKYM11QR1oVBOXctzFlNgBTC8qmXxPQEegbVeYApIgJT6tg%2F0AdMp0B%2FBpCabK2AAmAAa%2F2GRBft1oBFPkqTAba7LCiAfQC9wClwAY1HJHepuiO29Yrsf1Dn1uiDU3RTYCtTkl1Leg8k9MB4NGgReI28rV3azgyCz0og01Xl1Uz1QX8uCTELm3UbkTF1VJ9Wr0tn3iBSGdjYG0XivE3VN3VD31PM4a3cc2tIGGI0VkTO7rLxGuiy25ejmjfqsvkSXui62TxaK03td4FXTAAAAAElFTkSuQmCC&logoColor=white)](https://forum.koishi.xyz/t/topic/12605)
[![QQ群](https://img.shields.io/badge/QQ群-1085190201-12B7F5?style=flat-square&logo=qq&logoColor=white)](https://qm.qq.com/q/9EPM99GBTq)

<p><del>💬 插件使用问题 / 🐛 Bug反馈 / 👨‍💻 插件开发交流，欢迎加入QQ群：<b>259248174</b>   🎉（这个群G了）</del></p> 
<p>💬 插件使用问题 / 🐛 Bug反馈 / 👨‍💻 插件开发交流，欢迎加入新QQ群：<b>1085190201</b> 🎉</p>
<p>💡 在群里直接艾特我，回复的更快哦~ ✨</p>


---

## 📷 预览

![preview](https://cdn.jsdelivr.net/gh/VincentZyuApps/koishi-plugin-onebot-touxian@main/doc/images/preview/preview.png)

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

- 👑 **管理员设置头衔** — 通过 `设置头衔` 为指定成员设置群头衔（别名 `ast`, `awa_set_title`）
- 🆓 **自助设置头衔** — 群成员通过 `自助头衔` 为自己设置专属头衔（别名 `ats`, `awa_title_self`）
- 📖 **配置指引教程** — 通过 `开头衔指引` 查看群主开启头衔展示的图文指引（别名 `atg`, `awa_title_guide`）
- 🏷️ **支持 @ 提及** — 通过 `@用户` 或直接输入 QQ 号指定目标用户
- 🔊 **可选会话明细** — 支持显示原头衔变更对比与会话指令明细，排查更方便

---

## 📱 前置条件

使用本插件前，请确保目标群已开启 **展示成员群头衔** 功能：

手机QQ → 右上角 `☰` → `管理群` → `个性管理` → `群头衔和标识管理` → 开启 **「展示成员群头衔」**

> ⚠️ 否则即使通过 API / 机器人修改了头衔，群聊中也不会显示头衔气泡挂件。

![QQ群专属头衔显示配置指引](https://cdn.jsdelivr.net/gh/VincentZyuApps/koishi-plugin-onebot-touxian@main/doc/images/guide/guide_overview_2x2grid.png)

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
| `adminCommandName` | `string` | `设置头衔` | 管理员给他人设置头衔的指令名（别名 `ast`, `awa_set_title`） |
| `selfCommandName` | `string` | `自助头衔` | 给自己设置头衔的指令名（别名 `ats`, `awa_title_self`） |
| `guideCommandName` | `string` | `开头衔指引` | 查看开启群头衔展示指引教程的指令名（别名 `atg`, `awa_title_guide`） |
| `guideImageUrls` | `string[]` | `['...']` | 开头衔指引图片的候选 URL 列表（支持配置 Gitee / jsDelivr / GitHub 候选源） |
| `enableQuote` | `boolean` | `true` | 是否自动引用回复触发指令的消息 |
| `verboseSessionLog` | `boolean` | `false` | 详细会话明细：成功提示中额外附带原头衔变更对比与会话指令明细 |
| `adminUsers` | `string[]` | `['1830540513']` | 允许使用管理员设置头衔指令的 QQ 号列表 |
