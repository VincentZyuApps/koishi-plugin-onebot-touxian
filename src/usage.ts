import { readFileSync } from 'fs';
import { resolve } from 'path';

const pkg = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf-8'));

const KOISHI_LOGO_BASE64 = 'data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAABU0lEQVR42p2UQSsFYRSGnxnqLuytKWKpKFkQNsS%2FsOHPWPADLCmxU5S7UzYWNrJR7lYiRF2FeWzOMKZ7mXHqNNP5vvP2nu%2B850CY2lP4X1K31ZbaDm%2BpO%2Bpyp5wfAXVEPfRvO1JHf4AVQGbUh7j4EZ4VkrNCXPVRnf3CUBN1SH2KC28VGOV3ntRhNclZHdcAKYM11QR1oVBOXctzFlNgBTC8qmXxPQEegbVeYApIgJT6tg%2F0AdMp0B%2FBpCabK2AAmAAa%2F2GRBft1oBFPkqTAba7LCiAfQC9wClwAY1HJHepuiO29Yrsf1Dn1uiDU3RTYCtTkl1Leg8k9MB4NGgReI28rV3azgyCz0og01Xl1Uz1QX8uCTELm3UbkTF1VJ9Wr0tn3iBSGdjYG0XivE3VN3VD31PM4a3cc2tIGGI0VkTO7rLxGuiy25ejmjfqsvkSXui62TxaK03td4FXTAAAAAElFTkSuQmCC';

// 通用卡片与代码块基础样式
const baseDetailsStyle = 'margin:12px 0;border-radius:10px;overflow:hidden;box-shadow:var(--k-card-shadow, 0 1px 4px rgb(0 0 0 / 10%));transition:border-color .2s ease, background-color .2s ease;';
const baseSummaryStyle = 'padding:10px 14px;cursor:pointer;user-select:none;font-weight:700;display:flex;align-items:center;';
const baseBodyStyle = 'padding:10px 16px 14px;color:var(--k-text-dark, inherit);line-height:1.75;font-size:14px;';
const codeBlockStyle = 'margin:6px 0 10px;padding:8px 12px;background:var(--k-hover-bg, rgba(127, 127, 127, .12));border:1px solid var(--k-color-divider, rgba(127, 127, 127, .2));border-radius:6px;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:13px;line-height:1.6;overflow-x:auto;color:var(--k-text-dark, inherit);';

// 6 大主题色彩独立卡片配置（全部默认折叠，带有独立背景色与圆角框）
// 1. 绿卡（指令用法与别名）
const greenDetails = `${baseDetailsStyle}border:1px solid rgba(47, 133, 90, 0.4);background:rgba(47, 133, 90, 0.05);`;
const greenSummary = `${baseSummaryStyle}background:rgba(47, 133, 90, 0.12);color:#22543d;`;
const greenBody = `${baseBodyStyle}border-top:1px solid rgba(47, 133, 90, 0.2);`;

// 2. 橙金卡（常用使用示例）
const orangeDetails = `${baseDetailsStyle}border:1px solid rgba(221, 107, 32, 0.4);background:rgba(221, 107, 32, 0.05);`;
const orangeSummary = `${baseSummaryStyle}background:rgba(221, 107, 32, 0.12);color:#9c4221;`;
const orangeBody = `${baseBodyStyle}border-top:1px solid rgba(221, 107, 32, 0.2);`;

// 3. 蓝卡（指引图样式切换）
const blueDetails = `${baseDetailsStyle}border:1px solid rgba(49, 130, 206, 0.4);background:rgba(49, 130, 206, 0.05);`;
const blueSummary = `${baseSummaryStyle}background:rgba(49, 130, 206, 0.12);color:#2b6cb0;`;
const blueBody = `${baseBodyStyle}border-top:1px solid rgba(49, 130, 206, 0.2);`;

// 4. 紫卡（会话追踪明细）
const purpleDetails = `${baseDetailsStyle}border:1px solid rgba(128, 90, 213, 0.4);background:rgba(128, 90, 213, 0.05);`;
const purpleSummary = `${baseSummaryStyle}background:rgba(128, 90, 213, 0.12);color:#553c9a;`;
const purpleBody = `${baseBodyStyle}border-top:1px solid rgba(128, 90, 213, 0.2);`;

// 5. 蓝灰卡（全配置项解析）
const slateDetails = `${baseDetailsStyle}border:1px solid rgba(74, 85, 104, 0.4);background:rgba(74, 85, 104, 0.05);`;
const slateSummary = `${baseSummaryStyle}background:rgba(74, 85, 104, 0.12);color:#2d3748;`;
const slateBody = `${baseBodyStyle}border-top:1px solid rgba(74, 85, 104, 0.2);`;

// 6. 粉赤卡（常见问题 FAQ）
const pinkDetails = `${baseDetailsStyle}border:1px solid rgba(229, 62, 62, 0.4);background:rgba(229, 62, 62, 0.05);`;
const pinkSummary = `${baseSummaryStyle}background:rgba(229, 62, 62, 0.12);color:#9b2c2c;`;
const pinkBody = `${baseBodyStyle}border-top:1px solid rgba(229, 62, 62, 0.2);`;

export const usage = `
<h1>🏷️ Koishi 插件：onebot-touxian - QQ 群头衔修改</h1>
<h2>🎯 插件版本：v${pkg.version}</h2>

<p>
  <a href="https://www.npmjs.com/package/koishi-plugin-onebot-touxian" target="_blank">
    <img src="https://img.shields.io/npm/v/koishi-plugin-onebot-touxian?style=flat-square&logo=npm" alt="npm version">
  </a>
  <a href="https://npm-stat.com/charts.html?package=koishi-plugin-onebot-touxian" target="_blank">
    <img src="https://img.shields.io/npm/dm/koishi-plugin-onebot-touxian?style=flat-square&logo=npm" alt="npm download">
  </a>
  <br>
  <a href="https://github.com/settings" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
  <a href="https://gitee.com/settings" target="_blank">
    <img src="https://img.shields.io/badge/Gitee-C71D23?style=for-the-badge&logo=gitee&logoColor=white" alt="Gitee">
  </a>
  <br>
  <a href="https://forum.koishi.xyz/t/topic/12605" target="_blank">
    <img src="https://img.shields.io/badge/Koishi%20Forum-12605-5546A3?style=for-the-badge&labelColor=3A3A3A&logo=${KOISHI_LOGO_BASE64}&logoColor=white" alt="Koishi Forum">
  </a>
  <br>
  <a href="https://qm.qq.com/q/9EPM99GBTq" target="_blank">
    <img src="https://img.shields.io/badge/QQ群-1085190201-12B7F5?style=flat-square&logo=qq&logoColor=white" alt="QQ群">
  </a>
</p>

<h2>💬 交流反馈</h2>
<p>🐛 Bug 反馈 / 💡 建议 / 👨‍💻 插件开发交流，欢迎加群：</p>
<p>💬 交流 QQ 群：<b>1085190201</b> 🎉</p>
<p>💡 在群里直接艾特我，回复的更快哦 ~ ✨</p>

<hr>

<h2>✨ 核心功能概述</h2>
<p>在 QQ 群中通过 OneBot 协议调用底层 OIDB 接口为群成员设置或自助修改群头衔（需要机器人是群主）：</p>
<ul>
  <li>👑 <b>管理员设置</b> — 管理员使用 <code>设置头衔</code>（别名 <code>ast</code>）为任意群员设置专属头衔</li>
  <li>🆓 <b>自助设置</b> — 普通群成员使用 <code>自助头衔</code>（别名 <code>ats</code>）给自己修改个性头衔</li>
  <li>📖 <b>开头衔指引</b> — 使用 <code>开头衔指引</code>（别名 <code>atg</code>）以 <code>quote ➔ 图片 ➔ 文字</code> 顺序发送群主开通指南</li>
  <li>🔍 <b>多源图床与样式切换</b> — 内置预备 Gitee / jsDelivr / GitHub 优选图床，支持网格版 / 竖排版 / 横排版随心换</li>
</ul>

<!-- ================= 折叠区域 1: 绿色卡片 - 指令与别名速查 ================= -->
<details style="${greenDetails}">
<summary style="${greenSummary}">
  <span>👑 指令用法与别名速查表</span>
</summary>
<div style="${greenBody}">
  <p><b>1️⃣ 设置头衔（管理员权限）：</b></p>
  <div style="${codeBlockStyle}">
    <div><b>主指令：</b><code>设置头衔 [头衔内容] [@用户 / 用户ID]</code></div>
    <div style="margin-top: 4px;"><b>常用别名：</b><code>ast</code>、<code>awa_set_title</code></div>
    <div style="margin-top: 4px;"><b>权限说明：</b>仅配置项 <code>adminUsers</code> 列表内的 QQ 号可触发</div>
  </div>

  <p style="margin-top: 10px;"><b>2️⃣ 自助头衔（全员可用）：</b></p>
  <div style="${codeBlockStyle}">
    <div><b>主指令：</b><code>自助头衔 &lt;头衔内容&gt;</code></div>
    <div style="margin-top: 4px;"><b>常用别名：</b><code>ats</code>、<code>awa_title_self</code></div>
    <div style="margin-top: 4px;"><b>权限说明：</b>群内任何成员均可为自己设置专属头衔</div>
  </div>

  <p style="margin-top: 10px;"><b>3️⃣ 开头衔指引（教程展示）：</b></p>
  <div style="${codeBlockStyle}">
    <div><b>主指令：</b><code>开头衔指引</code></div>
    <div style="margin-top: 4px;"><b>常用别名：</b><code>atg</code>、<code>awa_title_guide</code></div>
    <div style="margin-top: 4px;"><b>发送机制：</b>严格按照 <code>[引用原消息] ➔ [高清教程大图] ➔ [四步步骤文字]</code> 顺序回复</div>
  </div>
</div>
</details>

<!-- ================= 折叠区域 2: 橙金卡片 - 实战示例 ================= -->
<details style="${orangeDetails}">
<summary style="${orangeSummary}">
  <span>💡 常用使用示例与 @/QQ号 指定</span>
</summary>
<div style="${orangeBody}">
  <p style="margin: 6px 0 2px;"><b>1. 管理员通过 @ 为他人指定头衔：</b></p>
  <pre style="${codeBlockStyle}"><code>/ast 绝地大仙 @张三</code></pre>

  <p style="margin: 6px 0 2px;"><b>2. 管理员直接输入 QQ 号为他人设置头衔：</b></p>
  <pre style="${codeBlockStyle}"><code>/ast 绝地大仙 1830540513</code></pre>

  <p style="margin: 6px 0 2px;"><b>3. 管理员清空指定成员的头衔：</b></p>
  <pre style="${codeBlockStyle}"><code>/ast @张三</code></pre>

  <p style="margin: 6px 0 2px;"><b>4. 群成员自助为自己设置头衔：</b></p>
  <pre style="${codeBlockStyle}"><code>/ats 这是我的专属头衔</code></pre>

  <p style="margin: 6px 0 2px;"><b>5. 群内快速唤出群主指引教程图：</b></p>
  <pre style="${codeBlockStyle}"><code>/atg</code></pre>
</div>
</details>

<!-- ================= 折叠区域 3: 蓝色卡片 - 指引大图样式切换 ================= -->
<details style="${blueDetails}">
<summary style="${blueSummary}">
  <span>📱 前置条件与三种指引大图样式切换</span>
</summary>
<div style="${blueBody}">
  <p><b>⚠️ 核心前置条件：</b>使用本插件前，请确保目标群已开启 <b>「展示成员群头衔」</b> 功能（否则机器人设置成功后手机 QQ 也不会展示气泡挂件）：</p>
  <p>👉 手机 QQ 点进群 ➔ 右上角「···」➔「管理群」➔「个性管理」➔「群头衔和标识管理」➔ 开启「展示成员群头衔」开关。</p>

  <div style="margin-top: 10px; padding: 10px 14px; background: rgba(49, 130, 206, 0.1); border-radius: 8px;">
    <b>🎨 支持三种排版样式的指引大图随时切换：</b>
    <p style="margin: 6px 0;">只需在配置项 <code>guideImageUrls</code> 中将末尾文件名替换为对应样式即可：</p>
    <ul style="margin: 4px 0; padding-left: 18px; line-height: 1.8;">
      <li><code>guide_overview_2x2grid.png</code> — <b>2x2 网格版</b>（默认，方正大气，适合 PC/横版文档）</li>
      <li><code>guide_overview_vertical.png</code> — <b>4x1 单列竖排长图版</b>（纵向长图流，适合手机滑动阅读）</li>
      <li><code>guide_overview_horizontal.png</code> — <b>1x4 横向排版</b>（宽屏横向 Banner 流）</li>
    </ul>
  </div>
</div>
</details>

<!-- ================= 折叠区域 4: 紫色卡片 - 会话明细与变更对比 ================= -->
<details style="${purpleDetails}">
<summary style="${purpleSummary}">
  <span>🔊 详细会话明细与变更追踪 (verboseSessionLog)</span>
</summary>
<div style="${purpleBody}">
  <p>本插件支持通过开关 <code>verboseSessionLog</code> 自由切换简洁模式与排查明细模式：</p>
  <ul style="margin: 6px 0; padding-left: 20px; line-height: 1.8;">
    <li>
      <b>关闭时（默认，清爽简洁）：</b>
      <div style="${codeBlockStyle}">✅ 已为 1830540513 设置头衔为「绝地大仙」</div>
    </li>
    <li>
      <b>开启后（适合调试与管理追溯）：</b>
      <div style="${codeBlockStyle}">
✅ 已为 VincentZyu 设置头衔为「绝地大仙」<br>
🏷️ 头衔变更: 「旧头衔」➔「绝地大仙」<br>
📋 会话明细: 原始输入="/ast 绝地大仙 @VincentZyu" | 目标=1830540513 | 响应Bot=123456789
      </div>
    </li>
  </ul>
</div>
</details>

<!-- ================= 折叠区域 5: 蓝灰卡片 - 全配置项解析 ================= -->
<details style="${slateDetails}">
<summary style="${slateSummary}">
  <span>⚙️ 全配置项详细解析表</span>
</summary>
<div style="${slateBody}">
  <table style="width:100%; border-collapse:collapse; margin-top:4px;">
    <tr style="border-bottom:1px solid rgba(74, 85, 104, 0.2);">
      <th style="text-align:left; padding:6px 8px;">配置项</th>
      <th style="text-align:left; padding:6px 8px;">类型</th>
      <th style="text-align:left; padding:6px 8px;">默认值</th>
      <th style="text-align:left; padding:6px 8px;">详细说明</th>
    </tr>
    <tr style="border-bottom:1px solid rgba(74, 85, 104, 0.1);">
      <td style="padding:6px 8px;"><code>adminCommandName</code></td>
      <td style="padding:6px 8px;"><code>string</code></td>
      <td style="padding:6px 8px;"><code>设置头衔</code></td>
      <td style="padding:6px 8px;">管理员设置指令名（别名 <code>ast</code> / <code>awa_set_title</code> 固定生效）</td>
    </tr>
    <tr style="border-bottom:1px solid rgba(74, 85, 104, 0.1);">
      <td style="padding:6px 8px;"><code>selfCommandName</code></td>
      <td style="padding:6px 8px;"><code>string</code></td>
      <td style="padding:6px 8px;"><code>自助头衔</code></td>
      <td style="padding:6px 8px;">自助设置指令名（别名 <code>ats</code> / <code>awa_title_self</code> 固定生效）</td>
    </tr>
    <tr style="border-bottom:1px solid rgba(74, 85, 104, 0.1);">
      <td style="padding:6px 8px;"><code>guideCommandName</code></td>
      <td style="padding:6px 8px;"><code>string</code></td>
      <td style="padding:6px 8px;"><code>开头衔指引</code></td>
      <td style="padding:6px 8px;">指引展示指令名（别名 <code>atg</code> / <code>awa_title_guide</code> 固定生效）</td>
    </tr>
    <tr style="border-bottom:1px solid rgba(74, 85, 104, 0.1);">
      <td style="padding:6px 8px;"><code>guideImageUrls</code></td>
      <td style="padding:6px 8px;"><code>string[]</code></td>
      <td style="padding:6px 8px;">预置 Gitee / jsDelivr / GitHub</td>
      <td style="padding:6px 8px;">指引大图的候选 URL 列表（支持配置备用源，优先采用首选有效地址）</td>
    </tr>
    <tr style="border-bottom:1px solid rgba(74, 85, 104, 0.1);">
      <td style="padding:6px 8px;"><code>enableQuote</code></td>
      <td style="padding:6px 8px;"><code>boolean</code></td>
      <td style="padding:6px 8px;"><code>true</code></td>
      <td style="padding:6px 8px;">发送执行结果消息时是否自动引用回复触发指令的原消息</td>
    </tr>
    <tr style="border-bottom:1px solid rgba(74, 85, 104, 0.1);">
      <td style="padding:6px 8px;"><code>verboseSessionLog</code></td>
      <td style="padding:6px 8px;"><code>boolean</code></td>
      <td style="padding:6px 8px;"><code>false</code></td>
      <td style="padding:6px 8px;">是否在成功回执中输出详细的会话指令与原头衔变更对比追踪</td>
    </tr>
    <tr>
      <td style="padding:6px 8px;"><code>adminUsers</code></td>
      <td style="padding:6px 8px;"><code>string[]</code></td>
      <td style="padding:6px 8px;"><code>['1830540513']</code></td>
      <td style="padding:6px 8px;">允许使用管理员设置指令的 QQ 号白名单列表</td>
    </tr>
  </table>
</div>
</details>

<!-- ================= 折叠区域 6: 粉赤卡片 - 常见问题 FAQ ================= -->
<details style="${pinkDetails}">
<summary style="${pinkSummary}">
  <span>❓ 常见问题排查与 FAQ</span>
</summary>
<div style="${pinkBody}">
  <ul style="margin: 6px 0; padding-left: 20px; line-height: 1.85;">
    <li>
      <b>Q1：为什么 Bot 是管理员，调用指令却报错或没有权限？</b><br>
      A：在 QQ 协议规范中，<b>修改专属头衔是群主的最高特权</b>，普通管理员没有权限设置头衔，请务必确保 Bot 账号是当前群的<b>群主</b>。
    </li>
    <li>
      <b>Q2：指令提示“已成功设置头衔”，但手机 QQ 群聊天里看不见头衔气泡？</b><br>
      A：这是因为群主没有在群设置中打开「展示成员群头衔」功能。在群内发送 <code>开头衔指引</code>（或 <code>atg</code>），让群主按照指引图开启开关即可立即显示！
    </li>
    <li>
      <b>Q3：为什么偶尔提示“用户信息获取失败”？</b><br>
      A：这通常发生在刚进群的新成员身上，本地缓存尚未同步到其 UID。群主或管理员只需让 Bot 发送任意消息或稍等几秒再次尝试即可自动刷新。
    </li>
  </ul>
</div>
</details>

<hr>
`;
