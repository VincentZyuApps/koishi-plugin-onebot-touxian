import { Context, Schema } from 'koishi'
import {} from 'koishi-plugin-adapter-onebot';


export const name = 'onebot-touxian'

export interface Config {
  /** 允许使用 ast 指令（给他人设置头衔）的用户 ID 列表 */
  adminUsers: string[]
}

export const Config: Schema<Config> = Schema.object({
  adminUsers: Schema.array(Schema.string())
    .default([])
    .role('table')
    .description('允许使用 ast 指令（给他人设置头衔）的qq号列表'),
})

export function apply(ctx: Context, config: Config) {

  // ============ 指令1: ast（管理员给他人设置头衔） ============
  // 用法：ast 头衔内容 @用户 / ast 头衔内容 用户ID
  ctx.command("ast [title:text]", "给指定用户设置头衔（需要权限）")
    .alias("awa_set_title")
    .alias('设置头衔')
    .action(async ({ session }, title) => {
      if (!session.onebot) {
        await session.send("[error] 当前会话不支持 onebot 协议。");
        return;
      }
      if (!session.channelId) {
        await session.send("[error] 当前不在群聊中。");
        return;
      }

      // 权限检查：只有 adminUsers 列表中的用户才能使用
      if (!config.adminUsers.includes(session.userId)) {
        await session.send("[error] 你没有权限使用此指令喵~");
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

      if (!resolvedUserId) {
        await session.send("[error] 请 @ 一个要设置头衔的用户喵~");
        return;
      }

      if (!title) {
        title = "";
      }

      await session.onebot.setGroupSpecialTitle(
        session.channelId,
        resolvedUserId,
        title,
        -1,
      )
    })

  // ============ 指令2: 自助头衔（给自己设置头衔） ============
  ctx.command("自助头衔 <title:text>", "给自己设置专属头衔")
    .action(async ({ session }, title) => {
      if (!session.onebot) {
        await session.send("[error] 当前会话不支持 onebot 协议。");
        return;
      }
      if (!session.channelId) {
        await session.send("[error] 当前不在群聊中。");
        return;
      }

      if (!title) {
        await session.send("[error] 请输入你想要的头衔喵~ 用法：自助头衔 <头衔内容>");
        return;
      }

      await session.onebot.setGroupSpecialTitle(
        session.channelId,
        session.userId,
        title,
        -1,
      )
    })
}
