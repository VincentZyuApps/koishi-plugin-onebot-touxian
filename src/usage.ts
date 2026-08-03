import { readFileSync } from 'fs';
import { resolve } from 'path';

const pkg = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf-8'));

export const usage = `
<h1>🏷️ Koishi 插件：onebot-touxian - QQ 群头衔修改</h1>
<h2>🎯 插件版本：v${pkg.version}</h2>

<p>
  <a href="https://www.npmjs.com/package/koishi-plugin-onebot-touxian" target="_blank">
    <img src="https://img.shields.io/npm/v/koishi-plugin-onebot-touxian?style=flat-square" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/koishi-plugin-onebot-touxian" target="_blank">
    <img src="https://img.shields.io/npm/dm/koishi-plugin-onebot-touxian?style=flat-square" alt="npm download">
  </a>
  <br>
  <a href="https://github.com/settings" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
  <a href="https://gitee.com/settings" target="_blank">
    <img src="https://img.shields.io/badge/Gitee-C71D23?style=for-the-badge&logo=gitee&logoColor=white" alt="Gitee">
  </a>
  <br>
  <a href="https://forum.koishi.xyz/" target="_blank">
    <img src="https://img.shields.io/badge/Koishi Forum-5546A3?style=for-the-badge&logo=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Ff%2Ff3%2FKoishi.js_Logo.png&logoColor=white" alt="Forum">
  </a>
  <br>
  <a href="https://qm.qq.com/q/9EPM99GBTq" target="_blank">
    <img src="https://img.shields.io/badge/QQ群-1085190201-12B7F5?style=flat-square&logo=qq&logoColor=white" alt="QQ群">
  </a>
</p>

<hr>

<h2>✨ 功能概述</h2>
<p>在 QQ 群中通过指令修改群成员的群头衔（群特殊头衔），支持两种模式：</p>
<ul>
  <li><b>管理员设置</b> — 管理员使用 <code>设置头衔</code> 指令为指定成员设置头衔</li>
  <li><b>自助设置</b> — 群成员使用 <code>自助头衔</code> 指令为自己设置头衔</li>
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
    → 直接输入 QQ 号设置头衔（需根据 onebot 实现支持情况）
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
</ul>

<hr>

<h2>⚙️ 配置项</h2>
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
    <td>给自己设置头衔的指令名</td>
  </tr>
  <tr>
    <td><code>adminUsers</code></td>
    <td><code>string[]</code></td>
    <td><code>[]</code></td>
    <td>允许使用管理指令的 QQ 号列表</td>
  </tr>
</table>

<hr>

<h2>💬 交流反馈</h2>
<p>🐛 Bug 反馈 / 💡 建议 / 👨‍💻 插件开发交流，欢迎加群：</p>
<p>💬 QQ 群：<b>1085190201</b> 🎉</p>
<p>💡 在群里直接艾特我，回复的更快哦 ~ ✨</p>

<hr>
`;
