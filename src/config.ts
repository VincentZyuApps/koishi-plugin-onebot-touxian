import { Schema } from 'koishi';

export interface Config {
  // ==== 💬 消息设置 ====
  /** 💬 是否自动引用回复触发指令的消息 */
  enableQuote: boolean
  /** 🔊 是否发送执行结果消息 */
  verboseSessionLog: boolean

  // ==== 📝 指令设置 ====
  /** 📝 管理员设置头衔的指令名 */
  adminCommandName: string
  /** 📝 自助设置头衔的指令名 */
  selfCommandName: string

  // ==== 👑 管理员设置 ====
  /** 👑 允许使用管理指令的用户 ID 列表 */
  adminUsers: string[]
}

export const Config: Schema<Config> = Schema.intersect([
  // ==== 💬 消息设置 ====
  Schema.object({
    enableQuote: Schema.boolean().default(true)
      .description('💬 开启后，本插件发送的消息都会引用回复触发指令的消息'),
    verboseSessionLog: Schema.boolean().default(false)
      .description('🔊 开启后指令执行结果会发送消息提示；关闭后静默执行，不发送任何消息'),
  }).description('==== 💬 消息设置 ===='),

  // ==== 📝 指令设置 ====
  Schema.object({
    adminCommandName: Schema.string()
      .default('设置头衔')
      .description('📝 管理员给他人设置头衔的指令名（别名 ast / awa_set_title 固定可用）'),
    selfCommandName: Schema.string()
      .default('自助头衔')
      .description('📝 给自己设置头衔的指令名'),
  }).description('==== 📝 指令设置 ===='),

  // ==== 👑 管理员设置 ====
  Schema.object({
    adminUsers: Schema.array(Schema.string())
      .default(['1830540513'])
      .role('table')
      .description('👑 允许使用管理指令的qq号列表'),
  }).description('==== 👑 管理员设置 ===='),
]);
