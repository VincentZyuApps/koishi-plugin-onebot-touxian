import { h, Fragment } from 'koishi';
import { Config } from './config';

/**
 * 封装统一回复逻辑，支持自动 quote 引用
 */
export async function reply(session: any, content: Fragment, config: Config) {
  if (config.enableQuote && session.messageId) {
    await session.send([h.quote(session.messageId), content]);
  } else {
    await session.send(content);
  }
}

/**
 * 获取用于详细会话明细的群成员旧头衔与称呼信息
 */
export async function getVerboseInfo(session: any, targetUserId: string) {
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
}
