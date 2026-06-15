import { Context, h } from 'koishi';
import {} from 'koishi-plugin-adapter-onebot';
import { Config } from './config';
import { usage } from './usage';

export { Config, usage };

export const name = 'onebot-touxian';

export function apply(ctx: Context, config: Config) {

  const send = (session: any, msg: string) => {
    if (!config.verboseSessionLog) return;
    const quote = config.enableQuote !== false ? h.quote(session.messageId) : '';
    return session.send(`${quote}${msg}`);
  };

  // ============ 👑 👑 指令1: ast（管理员给他人设置头衔） ============
  // 用法：ast 头衔内容 @用户 / ast 头衔内容 用户ID
  ctx.command(`${config.adminCommandName} [title:text]`, "给指定用户设置头衔（需要权限）")
    .alias("ast")
    .alias("awa_set_title")
    .action(async ({ session }, title) => {
      if (!session.onebot) {
        await send(session, "❌ 请在onebot平台使用本指令。");
        return;
      }
      if (!session.channelId) {
        await send(session, "❌ 当前不在群聊中。");
        return;
      }

      // 权限检查：只有 adminUsers 列表中的用户才能使用
      if (!config.adminUsers.includes(session.userId)) {
        await send(session, "❌ 你没有权限使用此指令喵~");
        return;
      }

      // 从 title (text参数) 中提取 @mention，剩余部分作为头衔
      let resolvedUserId: string = null;
      if (title) {
        const atRegex = /<at id="([^"]+)"(?: name="([^"]+)")?\/>/;
        const match = title.match(atRegex);
        if (match) {
          resolvedUserId = match[1];
          // 去掉 at 元素后，剩余文本作为头衔
          title = title.replace(atRegex, '').trim();
        }
      }

      // 如果没有通过 @mention 指定用户，尝试从消息元素中查找
      if (!resolvedUserId) {
        for (const e of session.event.message.elements) {
          if (e.type === 'at') {
            resolvedUserId = e.attrs.id;
            break;
          }
        }
      }

      // 尝试从 title 末尾提取 QQ 号
      if (!resolvedUserId && title) {
        const parts = title.match(/^(.*?)\s+(\d+)$/);
        if (parts) {
          title = parts[1].trim();
          resolvedUserId = parts[2];
        }
      }

      // 默认目标用户为自己
      if (!resolvedUserId) {
        resolvedUserId = session.userId;
      }

      if (!title) {
        title = "";
      }

      await session.onebot.setGroupSpecialTitle(
        session.channelId,
        resolvedUserId,
        title,
        -1,
      );

      await send(session, `✅ 已为 ${resolvedUserId} 设置头衔为「${title || '(空)'}」`);
    });

  // ============ 🙋 🙋 指令2: 自助头衔（给自己设置头衔） ============
  ctx.command(`${config.selfCommandName} <title:text>`, "给自己设置专属头衔")
    .action(async ({ session }, title) => {
      if (!session.onebot) {
        await send(session, "❌ 请在onebot平台使用本指令。");
        return;
      }
      if (!session.channelId) {
        await send(session, "❌ 当前不在群聊中。");
        return;
      }

      if (!title) {
        await send(session, `❌ 请输入你想要的头衔喵~ 用法：${config.selfCommandName} <头衔内容>`);
        return;
      }

      await session.onebot.setGroupSpecialTitle(
        session.channelId,
        session.userId,
        title,
        -1,
      );

      await send(session, `✅ 已为你设置头衔为「${title}」`);
    });
}
