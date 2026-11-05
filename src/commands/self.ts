import { Context } from 'koishi';
import { Config } from '../config';
import { reply, getVerboseInfo } from '../utils';

export function registerSelfCommand(ctx: Context, config: Config) {
  // ============ 🙋 指令2: 自助头衔（给自己设置头衔） ============
  ctx.command(`${config.selfCommandName} <title:text>`, "给自己设置专属头衔")
    .alias("ats")
    .alias("awa_title_self")
    .action(async ({ session }, title) => {
      if (!session.onebot) {
        await reply(session, "❌ 请在onebot平台使用本指令。", config);
        return;
      }
      if (!session.channelId) {
        await reply(session, "❌ 当前不在群聊中。", config);
        return;
      }

      if (!title) {
        await reply(session, `❌ 请输入你想要的头衔喵~ 用法：${config.selfCommandName} <头衔内容>`, config);
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
          await reply(session, lines.join('\n'), config);
        } else {
          await reply(session, `✅ 已为你设置专属头衔为「${title}」`, config);
        }
      } catch (err: any) {
        ctx.logger('onebot-touxian').error(`设置头衔失败:`, err);
        await reply(session, `❌ 设置专属头衔失败: ${err?.message || err}`, config);
      }
    });
}
