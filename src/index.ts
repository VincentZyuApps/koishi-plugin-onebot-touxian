import { Context, h } from 'koishi';
import {} from 'koishi-plugin-adapter-onebot';
import { Config } from './config';
import { usage } from './usage';

export { Config, usage };

export const name = 'onebot-touxian';

export function apply(ctx: Context, config: Config) {

  const reply = (session: any, msg: string) => {
    const quote = config.enableQuote !== false ? h.quote(session.messageId) : '';
    return session.send(`${quote}${msg}`);
  };

  const getVerboseInfo = async (session: any, targetUserId: string) => {
    let oldTitle = '(无)';
    let targetName = targetUserId;
    try {
      const member = await session.onebot.getGroupMemberInfo(session.channelId, targetUserId, true).catch(() => null);
      if (member) {
        oldTitle = member.title || '(无)';
        targetName = member.card || member.nickname || targetUserId;
      }
    } catch {
      // 容错忽略
    }
    return { oldTitle, targetName };
  };

  // ============ 👑 👑 指令1: ast（管理员给他人设置头衔） ============
  // 用法：ast 头衔内容 @用户 / ast 头衔内容 用户ID
  ctx.command(`${config.adminCommandName} [title:text]`, "给指定用户设置头衔（需要权限）")
    .alias("ast")
    .alias("awa_set_title")
    .action(async ({ session }, title) => {
      if (!session.onebot) {
        await reply(session, "❌ 请在onebot平台使用本指令。");
        return;
      }
      if (!session.channelId) {
        await reply(session, "❌ 当前不在群聊中。");
        return;
      }

      // 权限检查：只有 adminUsers 列表中的用户才能使用
      if (!config.adminUsers.includes(session.userId)) {
        await reply(session, "❌ 你没有权限使用此指令喵~");
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

      try {
        let oldTitle = '(未知)';
        let targetName = resolvedUserId;
        if (config.verboseSessionLog) {
          const info = await getVerboseInfo(session, resolvedUserId);
          oldTitle = info.oldTitle;
          targetName = info.targetName;
        }

        await session.onebot.setGroupSpecialTitle(
          session.channelId,
          resolvedUserId,
          title,
          -1,
        );

        if (config.verboseSessionLog) {
          const lines = [
            `✅ 已为 ${targetName} 设置头衔为「${title || '(空)'}」`,
            `🏷️ 头衔变更: 「${oldTitle}」➔「${title || '(空)'}」`,
            `📋 会话明细: 原始输入="${session.content}" | 目标=${resolvedUserId} | 响应Bot=${session.bot?.selfId || 'onebot'}`
          ];
          await reply(session, lines.join('\n'));
        } else {
          await reply(session, `✅ 已为 ${resolvedUserId} 设置头衔为「${title || '(空)'}」`);
        }
      } catch (err: any) {
        ctx.logger('onebot-touxian').error(`设置头衔失败:`, err);
        await reply(session, `❌ 设置头衔失败: ${err?.message || err}`);
      }
    });

  // ============ 🙋 🙋 指令2: 自助头衔（给自己设置头衔） ============
  ctx.command(`${config.selfCommandName} <title:text>`, "给自己设置专属头衔")
    .action(async ({ session }, title) => {
      if (!session.onebot) {
        await reply(session, "❌ 请在onebot平台使用本指令。");
        return;
      }
      if (!session.channelId) {
        await reply(session, "❌ 当前不在群聊中。");
        return;
      }

      if (!title) {
        await reply(session, `❌ 请输入你想要的头衔喵~ 用法：${config.selfCommandName} <头衔内容>`);
        return;
      }

      try {
        let oldTitle = '(未知)';
        if (config.verboseSessionLog) {
          const info = await getVerboseInfo(session, session.userId);
          oldTitle = info.oldTitle;
        }

        await session.onebot.setGroupSpecialTitle(
          session.channelId,
          session.userId,
          title,
          -1,
        );

        if (config.verboseSessionLog) {
          const lines = [
            `✅ 已为你设置专属头衔为「${title}」`,
            `🏷️ 头衔变更: 「${oldTitle}」➔「${title}」`,
            `📋 会话明细: 原始输入="${session.content}" | 用户=${session.userId} | 响应Bot=${session.bot?.selfId || 'onebot'}`
          ];
          await reply(session, lines.join('\n'));
        } else {
          await reply(session, `✅ 已为你设置头衔为「${title}」`);
        }
      } catch (err: any) {
        ctx.logger('onebot-touxian').error(`自助设置头衔失败:`, err);
        await reply(session, `❌ 设置头衔失败: ${err?.message || err}`);
      }
    });
}
