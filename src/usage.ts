import { readFileSync } from 'fs';
import { resolve } from 'path';

const pkg = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf-8'));

const KOISHI_LOGO_BASE64 = 'data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAABU0lEQVR42p2UQSsFYRSGnxnqLuytKWKpKFkQNsS%2FsOHPWPADLCmxU5S7UzYWNrJR7lYiRF2FeWzOMKZ7mXHqNNP5vvP2nu%2B850CY2lP4X1K31ZbaDm%2BpO%2Bpyp5wfAXVEPfRvO1JHf4AVQGbUh7j4EZ4VkrNCXPVRnf3CUBN1SH2KC28VGOV3ntRhNclZHdcAKYM11QR1oVBOXctzFlNgBTC8qmXxPQEegbVeYApIgJT6tg%2F0AdMp0B%2FBpCabK2AAmAAa%2F2GRBft1oBFPkqTAba7LCiAfQC9wClwAY1HJHepuiO29Yrsf1Dn1uiDU3RTYCtTkl1Leg8k9MB4NGgReI28rV3azgyCz0og01Xl1Uz1QX8uCTELm3UbkTF1VJ9Wr0tn3iBSGdjYG0XivE3VN3VD31PM4a3cc2tIGGI0VkTO7rLxGuiy25ejmjfqsvkSXui62TxaK03td4FXTAAAAAElFTkSuQmCC';

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

<hr>

<h2>✨ 功能概述</h2>
<p>在 QQ 群中通过指令便捷修改群成员的群头衔（群特殊头衔）：</p>
<ul>
  <li>👑 <b>管理员设置</b> — 管理员使用 <code>设置头衔</code> 指令为指定成员设置头衔</li>
  <li>🆓 <b>自助设置</b> — 普通群成员使用 <code>自助头衔</code> 指令为自己设置专属头衔</li>
  <li>📖 <b>指引教程</b> — 使用 <code>开头衔指引</code> 发送群主开启头衔展示的高清图文教程</li>
</ul>

<hr>

<h2>📝 指令用法</h2>

<h3>1️⃣ 设置头衔 — 给他人设置头衔（需要权限）</h3>
<p>仅配置中的 <code>adminUsers</code> 列表内的用户可以使用。</p>
<ul>
  <li>
    <code>设置头衔 头衔内容 @用户</code><br>
    → 通过 @ 方式指定用户并设置头衔
  </li>
  <br>
  <li>
    <code>设置头衔 头衔内容 123456</code><br>
    → 直接输入 QQ 号设置头衔
  </li>
  <br>
  <li>
    <b>别名：</b><code>ast</code> / <code>awa_set_title</code>
  </li>
</ul>

<h3>2️⃣ 自助头衔 — 给自己设置头衔</h3>
<p>任何人都可使用，为自己设置专属群头衔。</p>
<ul>
  <li>
    <code>自助头衔 我的专属头衔</code><br>
    → 将自己的群头衔设置为"我的专属头衔"
  </li>
  <br>
  <li>
    <b>别名：</b><code>ats</code> / <code>awa_title_self</code>
  </li>
</ul>

<h3>3️⃣ 开头衔指引 — 查看开启群头衔展示指引</h3>
<p>在群内发送开启群头衔展示的详细图文配置指引。</p>
<ul>
  <li>
    <code>开头衔指引</code>
  </li>
  <br>
  <li>
    <b>别名：</b><code>atg</code> / <code>awa_title_guide</code>
  </li>
</ul>

<hr>

<h2>⚙️ 配置项说明</h2>
<table>
  <tr>
    <th>配置项</th>
    <th>类型</th>
    <th>默认值</th>
    <th>说明</th>
  </tr>
  <tr>
    <td><code>adminCommandName</code></td>
    <td><code>string</code></td>
    <td><code>设置头衔</code></td>
    <td>管理员给他人设置头衔的指令名（别名 <code>ast</code> / <code>awa_set_title</code> 固定可用）</td>
  </tr>
  <tr>
    <td><code>selfCommandName</code></td>
    <td><code>string</code></td>
    <td><code>自助头衔</code></td>
    <td>给自己设置头衔的指令名（别名 <code>ats</code> / <code>awa_title_self</code> 固定可用）</td>
  </tr>
  <tr>
    <td><code>guideCommandName</code></td>
    <td><code>string</code></td>
    <td><code>开头衔指引</code></td>
    <td>查看开启群头衔展示教程的指令名（别名 <code>atg</code> / <code>awa_title_guide</code> 固定可用）</td>
  </tr>
  <tr>
    <td><code>guideImageUrls</code></td>
    <td><code>string[]</code></td>
    <td>预置 Gitee / jsDelivr / GitHub</td>
    <td>开头衔指引图片的候选 URL 列表（支持配置备用源）。</td>
  </tr>
  <tr>
    <td><code>enableQuote</code></td>
    <td><code>boolean</code></td>
    <td><code>true</code></td>
    <td>是否自动引用回复触发指令的消息</td>
  </tr>
  <tr>
    <td><code>verboseSessionLog</code></td>
    <td><code>boolean</code></td>
    <td><code>false</code></td>
    <td>详细会话明细：在成功提示中额外附带原头衔变更对比与会话指令明细</td>
  </tr>
  <tr>
    <td><code>adminUsers</code></td>
    <td><code>string[]</code></td>
    <td><code>['1830540513']</code></td>
    <td>允许使用管理指令的 QQ 号列表</td>
  </tr>
</table>

<blockquote>
  <b>💡 提示：如果想更换指引图样式</b><br>
  在配置项 <code>guideImageUrls</code> 中，只需将 URL 末尾的文件名替换为对应样式即可：
  <ul>
    <li><code>guide_overview_2x2grid.png</code> — <b>2x2 网格版</b>（默认，方正大气，适合 PC/横版文档）</li>
    <li><code>guide_overview_vertical.png</code> — <b>4x1 单列竖排长图版</b>（纵向长图流，适合手机滑动阅读）</li>
    <li><code>guide_overview_horizontal.png</code> — <b>1x4 横向排版</b>（宽屏横向 Banner 流）</li>
  </ul>
</blockquote>

<hr>

<h2>💬 交流反馈</h2>
<p>🐛 Bug 反馈 / 💡 建议 / 👨‍💻 插件开发交流，欢迎加群：</p>
<p>💬 QQ 群：<b>1085190201</b> 🎉</p>
<p>💡 在群里直接艾特我，回复的更快哦 ~ ✨</p>

<hr>
`;
