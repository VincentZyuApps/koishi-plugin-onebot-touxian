import { Context } from 'koishi';
import { Config } from '../config';
import { reply, getVerboseInfo } from '../utils';

export function registerAdminCommand(ctx: Context, config: Config) {
  // ============ 👑 指令1: 管理员给他人设置头衔 ============
  // 用法：设置头衔 头衔内容 @用户 / 设置头衔 头衔内容 用户ID
  ctx.command(`${config.adminCommandName} [title:text]`, "给指定用户设置头衔（需要权限）")
    .alias("ast")
    .alias("awa_set_title")
    .action(async ({ session }, title) => {
      if (!session.onebot) {
        await reply(session, "❌ 请在onebot平台使用本指令。", config);
        return;
      }
      if (!session.channelId) {
        await reply(session, "❌ 当前不在群聊中。", config);
        return;
      }

      // 权限检查：只有 adminUsers 列表中的用户才能使用
      if (!config.adminUsers.includes(session.userId)) {
        await reply(session, "❌ 你没有权限使用此指令喵~", config);
        return;
      }

      // 尝试从 session.elements 中解析 @ 提及的用户 ID
      let resolvedUserId: string | null = null;
      if (session.elements) {
        for (const el of session.elements) {
          if (el.type === 'at' && el.attrs?.id) {
            resolvedUserId = el.attrs.id;
            break;
          }
        }
      }

      // 如果没有 @ 提及，尝试从原始输入中解析：ast [title] [userId]
      if (!resolvedUserId && title) {
        const parts = title.trim().split(/\s+/);
        if (parts.length >= 2 && /^\d+$/.test(parts[parts.length - 1])) {
          resolvedUserId = parts.pop()!;
          title = parts.join(' ');
        }
      }

      // 如果依然没有解析到，检查原始消息文本是否有 @ 或纯数字
      if (!resolvedUserId && session.content) {
        const match = session.content.match(/<at id="(\d+)"/);
        if (match) {
          resolvedUserId = match[1];
        } else {
          const parts = session.content.trim().split(/\s+/);
          if (parts.length >= 3 && /^\d+$/.test(parts[parts.length - 1])) {
            resolvedUserId = parts[parts.length - 1];
          }
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
          await reply(session, lines.join('\n'), config);
        } else {
          await reply(session, `✅ 已为 ${resolvedUserId} 设置头衔为「${title || '(空)'}」`, config);
        }
      } catch (err: any) {
        ctx.logger('onebot-touxian').error(`设置头衔失败:`, err);
        await reply(session, `❌ 设置头衔失败: ${err?.message || err}`, config);
      }
    });
}
