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
  /** 📝 查看开启群头衔展示指引教程的指令名 */
  guideCommandName: string

  // ==== 🖼️ 指引图片设置 ====
  /** 🖼️ 开头衔指引图片的候选 URL 列表（支持配置多个备用源，优先采用首选地址） */
  guideImageUrls: string[]

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
      .description('🔊 详细会话明细：开启后，成功提示中会额外附带原头衔变更对比与会话指令明细；关闭时仅输出简洁提示'),
  }).description('==== 💬 消息设置 ===='),

  // ==== 📝 指令设置 ====
  Schema.object({
    adminCommandName: Schema.string()
      .default('设置头衔')
      .description('📝 管理员给他人设置头衔的指令名（别名 ast / awa_set_title 固定可用）'),
    selfCommandName: Schema.string()
      .default('自助头衔')
      .description('📝 给自己设置头衔的指令名（别名 ats / awa_title_self 固定可用）'),
    guideCommandName: Schema.string()
      .default('开头衔指引')
      .description('📝 查看开启群头衔展示指引教程的指令名（别名 atg / awa_title_guide 固定可用）'),
  }).description('==== 📝 指令设置 ===='),

  // ==== 🖼️ 指引图片设置 ====
  Schema.object({
    guideImageUrls: Schema.array(Schema.string())
      .role('table')
      .default([
        'https://gitee.com/vincent-zyu/koishi-plugin-onebot-touxian/raw/main/doc/images/guide/guide_overview_2x2grid.png',
        'https://cdn.jsdelivr.net/gh/VincentZyuApps/koishi-plugin-onebot-touxian@main/doc/images/guide/guide_overview_2x2grid.png',
        'https://raw.githubusercontent.com/VincentZyuApps/koishi-plugin-onebot-touxian/main/doc/images/guide/guide_overview_2x2grid.png',
      ])
      .description('🖼️ 开头衔指引图片的候选 URL 列表（支持配置多个候选源，优先采用首选地址；顺序建议 Gitee ➔ jsDelivr ➔ GitHub）。💡 提示：如果想更换指引图样式，只需将 URL 末尾的文件名替换即可：\n- guide_overview_2x2grid.png (2x2 网格版，默认推荐)\n- guide_overview_vertical.png (4x1 单列竖排长图版，适合手机阅读)\n- guide_overview_horizontal.png (1x4 横向长图版)'),
  }).description('==== 🖼️ 指引图片设置 ===='),

  // ==== 👑 管理员设置 ====
  Schema.object({
    adminUsers: Schema.array(Schema.string())
      .default(['1830540513'])
      .role('table')
      .description('👑 允许使用管理指令的qq号列表'),
  }).description('==== 👑 管理员设置 ===='),
]);
