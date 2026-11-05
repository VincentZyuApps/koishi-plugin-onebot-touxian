import { Context, h } from 'koishi';
import { Config } from '../config';

const DEFAULT_GUIDE_URL = 'https://gitee.com/vincent-zyu/koishi-plugin-onebot-touxian/raw/main/doc/images/guide/guide_overview_2x2grid.png';

export function registerGuideCommand(ctx: Context, config: Config) {
  // ============ 📖 指令3: 开头衔指引 ============
  ctx.command(`${config.guideCommandName || '开头衔指引'}`, "查看开启群头衔展示指引教程")
    .alias("atg")
    .alias("awa_title_guide")
    .action(async ({ session }) => {
      // 提取首选有效图片 URL
      let imageUrl = DEFAULT_GUIDE_URL;
      if (Array.isArray(config.guideImageUrls) && config.guideImageUrls.length > 0) {
        const found = config.guideImageUrls.find(url => typeof url === 'string' && url.trim().length > 0);
        if (found) {
          imageUrl = found.trim();
        }
      }

      // 文本说明内容
      const guideText = [
        '📱 QQ 群专属头衔显示开启指引：',
        '若 Bot 修改头衔成功后群聊未显示头衔气泡，请群主按以下四步在手机 QQ 中操作：',
        '① 手机 QQ 点进群 ➔ 右上角「···」➔「管理群」',
        '② 点击「个性管理」',
        '③ 点击「群头衔和标识管理」',
        '④ 开启「展示成员群头衔」开关',
      ].join('\n');

      // 严格按照用户指定的显示顺序: quote ➔ 图片 ➔ 文字
      const messageElements: any[] = [];
      if (config.enableQuote && session.messageId) {
        messageElements.push(h.quote(session.messageId));
      }
      messageElements.push(h.image(imageUrl));
      messageElements.push(guideText);

      await session.send(messageElements);
    });
}
