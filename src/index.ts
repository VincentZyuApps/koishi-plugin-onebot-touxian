import { Context } from 'koishi';
import {} from 'koishi-plugin-adapter-onebot';
import { Config } from './config';
import { usage } from './usage';
import { registerAdminCommand } from './commands/admin';
import { registerSelfCommand } from './commands/self';
import { registerGuideCommand } from './commands/guide';

export { Config, usage };

export const name = 'onebot-touxian';

export function apply(ctx: Context, config: Config) {
  // 注册管理员设置头衔指令 (adminCommandName / ast / awa_set_title)
  registerAdminCommand(ctx, config);

  // 注册自助设置头衔指令 (selfCommandName / ats / awa_title_self)
  registerSelfCommand(ctx, config);

  // 注册开头衔指引指令 (guideCommandName / atg / awa_title_guide)
  registerGuideCommand(ctx, config);
}
