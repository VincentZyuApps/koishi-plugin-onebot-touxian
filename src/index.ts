import { Context, Schema } from 'koishi'
import {} from 'koishi-plugin-adapter-onebot';


export const name = 'onebot-touxian'

export interface Config {}

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  ctx.command("ast <arg0_title:string>", "awa_set_title")
    .alias("awa_set_title")
    .action(async ({session, options}, arg0_title, arg1_user) => {
      // await session.send(`[debug] arg0_title:string = ${arg0_title}`);
      if ( !arg0_title ){
        // await session.send("[error]没有输入头衔喵awa");
        // return;
        arg0_title = "没有输入头衔喵awa";
      }

      if ( !session.onebot ){
        await session.send("[error]当前会话不支持onebot协议。");
        return;
      }

      if (!session.channelId) {
        await session.send('[error]当前不在群聊中。');
        return;
      }

      let at_user = null;
      for ( const e of session.event.message.elements ){
        if ( e.type === 'at'){
          at_user = e;
          break;
        }
      }

      // await session.send(`[debug] at_user=${JSON.stringify(at_user)}`);

      // await session.onebot._request(
      //   "set_group_reaction",
      //   {
      //     "group_id": session.guildId,
      //     "message_id": session.event.message.id,
      //     "code": "10068",
      //     "is_add": true
      //   }
      // )


      await session.onebot.setGroupSpecialTitle(
        session.channelId, 
        // 1830540513, 
        at_user ? at_user.attrs.id : session.userId,
        // "VincentZyu",
        arg0_title,
        -1
      )
    })
}
