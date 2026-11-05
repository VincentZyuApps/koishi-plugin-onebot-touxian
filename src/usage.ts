import { readFileSync } from 'fs';
import { resolve } from 'path';

const pkg = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf-8'));

const KOISHI_LOGO_BASE64 = 'data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAABU0lEQVR42p2UQSsFYRSGnxnqLuytKWKpKFkQNsS%2FsOHPWPADLCmxU5S7UzYWNrJR7lYiRF2FeWzOMKZ7mXHqNNP5vvP2nu%2B850CY2lP4X1K31ZbaDm%2BpO%2Bpyp5wfAXVEPfRvO1JHf4AVQGbUh7j4EZ4VkrNCXPVRnf3CUBN1SH2KC28VGOV3ntRhNclZHdcAKYM11QR1oVBOXctzFlNgBTC8qmXxPQEegbVeYApIgJT6tg%2F0AdMp0B%2FBpCabK2AAmAAa%2F2GRBft1oBFPkqTAba7LCiAfQC9wClwAY1HJHepuiO29Yrsf1Dn1uiDU3RTYCtTkl1Leg8k9MB4NGgReI28rV3azgyCz0og01Xl1Uz1QX8uCTELm3UbkTF1VJ9Wr0tn3iBSGdjYG0XivE3VN3VD31PM4a3cc2tIGGI0VkTO7rLxGuiy25ejmjfqsvkSXui62TxaK03td4FXTAAAAAElFTkSuQmCC';

// 内联样式兜底变量（兼容未加载 CSS 的极简环境）
const baseDetailsStyle = 'margin:12px 0;border-radius:10px;overflow:hidden;box-shadow:var(--k-card-shadow, 0 1px 4px rgb(0 0 0 / 10%));border:1px solid var(--card-border, rgba(127, 127, 127, 0.3));background:var(--k-card-bg, transparent);transition:border-color .2s ease, background-color .2s ease;';
const baseSummaryStyle = 'padding:10px 14px;cursor:pointer;user-select:none;font-weight:700;display:flex;align-items:center;justify-content:space-between;outline:none;background:var(--card-summary-bg, rgba(127, 127, 127, 0.12));color:var(--card-title-color, var(--k-text-dark, inherit));';
const baseBodyStyle = 'padding:10px 16px 14px;color:var(--k-text-dark, inherit);line-height:1.75;font-size:14px;border-top:1px solid var(--card-border, rgba(127, 127, 127, 0.2));background:var(--k-card-bg, transparent);';
const codeBlockStyle = 'margin:6px 0 10px;padding:8px 12px;background:var(--k-hover-bg, rgba(127, 127, 127, .12));border:1px solid var(--k-color-divider, rgba(127, 127, 127, .2));border-radius:6px;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:13px;line-height:1.6;overflow-x:auto;color:var(--k-text-dark, inherit);';

export const usage = `
<style>
/* ================= Koishi WebUI 白天 & 黑夜双模式高对比度卡片样式 ================= */
.k-usage-card {
  margin: 12px 0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: var(--k-card-shadow, 0 1px 4px rgba(0, 0, 0, 0.1));
  border: 1px solid var(--card-border);
  background: var(--k-card-bg, transparent);
  transition: border-color .2s ease, background-color .2s ease;
}
.k-usage-card summary {
  padding: 10px 14px;
  cursor: pointer;
  user-select: none;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--card-summary-bg);
  color: var(--card-title-color);
  list-style: none;
  outline: none;
}
.k-usage-card summary::-webkit-details-marker {
  display: none;
}
.k-usage-card summary:hover {
  filter: brightness(1.05);
}
.k-usage-card .k-card-body {
  padding: 10px 16px 14px;
  color: var(--k-text-dark, inherit);
  line-height: 1.75;
  font-size: 14px;
  border-top: 1px solid var(--card-border);
  background: var(--k-card-bg, transparent);
}
.k-usage-card .k-fold-hint {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 500;
  opacity: 0.85;
  color: var(--card-hint-color, var(--card-title-color));
}
.k-usage-card .k-fold-state::before {
  content: "展开";
}
.k-usage-card[open] summary .k-fold-state::before {
  content: "收起";
}
.k-usage-card .k-arrow-icon {
  display: inline-block;
  transition: transform .25s ease;
  font-size: 11px;
}
.k-usage-card[open] summary .k-arrow-icon {
  transform: rotate(180deg);
}

/* 浅色 / 白天模式色彩 (Light Theme) */
.card-green {
  --card-border: rgba(47, 133, 90, 0.35);
  --card-summary-bg: rgba(47, 133, 90, 0.1);
  --card-title-color: #22543d;
  --card-hint-color: #276749;
}
.card-orange {
  --card-border: rgba(221, 107, 32, 0.35);
  --card-summary-bg: rgba(221, 107, 32, 0.1);
  --card-title-color: #9c4221;
  --card-hint-color: #c05621;
}
.card-blue {
  --card-border: rgba(49, 130, 206, 0.35);
  --card-summary-bg: rgba(49, 130, 206, 0.1);
  --card-title-color: #2b6cb0;
  --card-hint-color: #2b6cb0;
}
.card-purple {
  --card-border: rgba(128, 90, 213, 0.35);
  --card-summary-bg: rgba(128, 90, 213, 0.1);
  --card-title-color: #553c9a;
  --card-hint-color: #6b46c1;
}
.card-slate {
  --card-border: rgba(74, 85, 104, 0.35);
  --card-summary-bg: rgba(74, 85, 104, 0.1);
  --card-title-color: #2d3748;
  --card-hint-color: #4a5568;
}
.card-pink {
  --card-border: rgba(229, 62, 62, 0.35);
  --card-summary-bg: rgba(229, 62, 62, 0.1);
  --card-title-color: #9b2c2c;
  --card-hint-color: #c53030;
}

/* 深色 / 黑夜模式色彩 (Dark Theme) */
html.dark .card-green, .theme-root.dark .card-green {
  --card-border: rgba(72, 187, 120, 0.45);
  --card-summary-bg: rgba(72, 187, 120, 0.16);
  --card-title-color: #9ae6b4;
  --card-hint-color: #68d391;
}
html.dark .card-orange, .theme-root.dark .card-orange {
  --card-border: rgba(237, 137, 54, 0.45);
  --card-summary-bg: rgba(237, 137, 54, 0.16);
  --card-title-color: #fbd38d;
  --card-hint-color: #f6ad55;
}
html.dark .card-blue, .theme-root.dark .card-blue {
  --card-border: rgba(66, 153, 225, 0.45);
  --card-summary-bg: rgba(66, 153, 225, 0.16);
  --card-title-color: #90cdf4;
  --card-hint-color: #63b3ed;
}
html.dark .card-purple, .theme-root.dark .card-purple {
  --card-border: rgba(159, 122, 234, 0.45);
  --card-summary-bg: rgba(159, 122, 234, 0.16);
  --card-title-color: #d6bcfa;
  --card-hint-color: #b794f4;
}
html.dark .card-slate, .theme-root.dark .card-slate {
  --card-border: rgba(160, 174, 192, 0.45);
  --card-summary-bg: rgba(160, 174, 192, 0.16);
  --card-title-color: #e2e8f0;
  --card-hint-color: #cbd5e0;
}
html.dark .card-pink, .theme-root.dark .card-pink {
  --card-border: rgba(245, 101, 101, 0.45);
  --card-summary-bg: rgba(245, 101, 101, 0.16);
  --card-title-color: #feb2b2;
  --card-hint-color: #fc8181;
}
</style>

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
<details class="k-usage-card card-green" style="${baseDetailsStyle}">
<summary style="${baseSummaryStyle}">
  <span>👑 指令用法与别名速查表</span>
  <span class="k-fold-hint">
    <span class="k-fold-state"></span>
    <span class="k-arrow-icon">▼</span>
  </span>
</summary>
<div class="k-card-body" style="${baseBodyStyle}">
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
<details class="k-usage-card card-orange" style="${baseDetailsStyle}">
<summary style="${baseSummaryStyle}">
  <span>💡 常用使用示例与 @/QQ号 指定</span>
  <span class="k-fold-hint">
    <span class="k-fold-state"></span>
    <span class="k-arrow-icon">▼</span>
  </span>
</summary>
<div class="k-card-body" style="${baseBodyStyle}">
  <p style="margin: 6px 0 2px;"><b>1. 管理员通过 @ 为他人指定头衔：</b></p>
  <pre style="${codeBlockStyle}"><code>/ast 可爱捏 @someone</code></pre>

  <p style="margin: 6px 0 2px;"><b>2. 管理员直接输入 QQ 号为他人设置头衔：</b></p>
  <pre style="${codeBlockStyle}"><code>/ast 可爱捏 1830540513</code></pre>

  <p style="margin: 6px 0 2px;"><b>3. 管理员清空指定成员的头衔：</b></p>
  <pre style="${codeBlockStyle}"><code>/ast @someone</code></pre>

  <p style="margin: 6px 0 2px;"><b>4. 群成员自助为自己设置头衔：</b></p>
  <pre style="${codeBlockStyle}"><code>/ats 这是我的专属头衔</code></pre>

  <p style="margin: 6px 0 2px;"><b>5. 群内快速唤出群主指引教程图：</b></p>
  <pre style="${codeBlockStyle}"><code>/atg</code></pre>
</div>
</details>

<!-- ================= 折叠区域 3: 蓝色卡片 - 指引大图样式切换 ================= -->
<details class="k-usage-card card-blue" style="${baseDetailsStyle}">
<summary style="${baseSummaryStyle}">
  <span>📱 前置条件与三种指引大图样式切换</span>
  <span class="k-fold-hint">
    <span class="k-fold-state"></span>
    <span class="k-arrow-icon">▼</span>
  </span>
</summary>
<div class="k-card-body" style="${baseBodyStyle}">
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
<details class="k-usage-card card-purple" style="${baseDetailsStyle}">
<summary style="${baseSummaryStyle}">
  <span>🔊 详细会话明细与变更追踪 (verboseSessionLog)</span>
  <span class="k-fold-hint">
    <span class="k-fold-state"></span>
    <span class="k-arrow-icon">▼</span>
  </span>
</summary>
<div class="k-card-body" style="${baseBodyStyle}">
  <p>本插件支持通过开关 <code>verboseSessionLog</code> 自由切换简洁模式与排查明细模式：</p>
  <ul style="margin: 6px 0; padding-left: 20px; line-height: 1.8;">
    <li>
      <b>关闭时（默认，清爽简洁）：</b>
      <div style="${codeBlockStyle}">✅ 已为 1830540513 设置头衔为「可爱捏」</div>
    </li>
    <li>
      <b>开启后（适合调试与管理追溯）：</b>
      <div style="${codeBlockStyle}">
✅ 已为 someone 设置头衔为「可爱捏」<br>
🏷️ 头衔变更: 「旧头衔」➔「可爱捏」<br>
📋 会话明细: 原始输入="/ast 可爱捏 @someone" | 目标=1830540513 | 响应Bot=123456789
      </div>
    </li>
  </ul>
</div>
</details>

<!-- ================= 折叠区域 5: 蓝灰卡片 - 全配置项解析 ================= -->
<details class="k-usage-card card-slate" style="${baseDetailsStyle}">
<summary style="${baseSummaryStyle}">
  <span>⚙️ 全配置项详细解析表</span>
  <span class="k-fold-hint">
    <span class="k-fold-state"></span>
    <span class="k-arrow-icon">▼</span>
  </span>
</summary>
<div class="k-card-body" style="${baseBodyStyle}">
  <table style="width:100%; border-collapse:collapse; margin-top:4px;">
    <tr style="border-bottom:1px solid rgba(127, 127, 127, 0.3);">
      <th style="text-align:left; padding:6px 8px;">配置项</th>
      <th style="text-align:left; padding:6px 8px;">类型</th>
      <th style="text-align:left; padding:6px 8px;">默认值</th>
      <th style="text-align:left; padding:6px 8px;">详细说明</th>
    </tr>
    <tr style="border-bottom:1px solid rgba(127, 127, 127, 0.15);">
      <td style="padding:6px 8px;"><code>adminCommandName</code></td>
      <td style="padding:6px 8px;"><code>string</code></td>
      <td style="padding:6px 8px;"><code>设置头衔</code></td>
      <td style="padding:6px 8px;">管理员设置指令名（别名 <code>ast</code> / <code>awa_set_title</code> 固定生效）</td>
    </tr>
    <tr style="border-bottom:1px solid rgba(127, 127, 127, 0.15);">
      <td style="padding:6px 8px;"><code>selfCommandName</code></td>
      <td style="padding:6px 8px;"><code>string</code></td>
      <td style="padding:6px 8px;"><code>自助头衔</code></td>
      <td style="padding:6px 8px;">自助设置指令名（别名 <code>ats</code> / <code>awa_title_self</code> 固定生效）</td>
    </tr>
    <tr style="border-bottom:1px solid rgba(127, 127, 127, 0.15);">
      <td style="padding:6px 8px;"><code>guideCommandName</code></td>
      <td style="padding:6px 8px;"><code>string</code></td>
      <td style="padding:6px 8px;"><code>开头衔指引</code></td>
      <td style="padding:6px 8px;">指引展示指令名（别名 <code>atg</code> / <code>awa_title_guide</code> 固定生效）</td>
    </tr>
    <tr style="border-bottom:1px solid rgba(127, 127, 127, 0.15);">
      <td style="padding:6px 8px;"><code>guideImageUrls</code></td>
      <td style="padding:6px 8px;"><code>string[]</code></td>
      <td style="padding:6px 8px;">预置 Gitee / jsDelivr / GitHub</td>
      <td style="padding:6px 8px;">指引大图的候选 URL 列表（支持配置备用源，优先采用首选有效地址）</td>
    </tr>
    <tr style="border-bottom:1px solid rgba(127, 127, 127, 0.15);">
      <td style="padding:6px 8px;"><code>enableQuote</code></td>
      <td style="padding:6px 8px;"><code>boolean</code></td>
      <td style="padding:6px 8px;"><code>true</code></td>
      <td style="padding:6px 8px;">发送执行结果消息时是否自动引用回复触发指令的原消息</td>
    </tr>
    <tr style="border-bottom:1px solid rgba(127, 127, 127, 0.15);">
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
<details class="k-usage-card card-pink" style="${baseDetailsStyle}">
<summary style="${baseSummaryStyle}">
  <span>❓ 常见问题排查与 FAQ</span>
  <span class="k-fold-hint">
    <span class="k-fold-state"></span>
    <span class="k-arrow-icon">▼</span>
  </span>
</summary>
<div class="k-card-body" style="${baseBodyStyle}">
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
