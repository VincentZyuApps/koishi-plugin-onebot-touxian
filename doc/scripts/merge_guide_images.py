# /// script
# requires-python = ">=3.10"
# dependencies = [
#     "pillow>=10.0.0",
# ]
# ///
"""
QQ 群专属头衔开启指南 - 步骤截图合并脚本

使用方式：
------------------------------------------------------------
1. 使用 uv 一键运行（推荐，自动根据 PEP 723 下载运行环境与依赖）：
   cd G:\\GGames\\Minecraft\\shuyeyun\\qq-bot\\koishi-dev\\koishi-dev-8\\external\\onebot-touxian
   uv run doc/scripts/merge_guide_images.py

2. 使用当前插件目录下已有虚拟环境运行：
   .venv\\Scripts\\python.exe doc/scripts/merge_guide_images.py
------------------------------------------------------------

生成的三种排版样式大图：
1. guide_overview_2x2grid.png    - 2x2 网格版（默认，方正大气，适合 PC/横版文档）
2. guide_overview_vertical.png   - 4x1 单列竖排版（纵向长图流，适合手机端滑动阅读）
3. guide_overview_horizontal.png - 1x4 横向排版（宽屏 Banner 流）
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

# 路径计算（全部基于相对路径）
SCRIPT_DIR = Path(__file__).resolve().parent
DOC_DIR = SCRIPT_DIR.parent
GUIDE_DIR = DOC_DIR / "images" / "guide"
PLUGIN_ROOT = DOC_DIR.parent
KOISHI_ROOT = PLUGIN_ROOT.parent.parent

# 字体相对路径
FONT_DIR = KOISHI_ROOT / "data" / "fonts"
FONT_BOLD = FONT_DIR / "LXGWWenKaiMono-Medium.ttf"
FONT_REGULAR = FONT_DIR / "LXGWWenKaiMono-Regular.ttf"

# 4 个步骤的元数据定义（小字精确设计为双行展示）
STEPS = [
    {
        "filename": "step1.群主手机qq点进群然后右上角三个横线点击管理群.png",
        "tag": "Step 1",
        "title": "点击「管理群」",
        "lines": [
            "群主在手机 QQ 进入目标群聊",
            "点击右上角「···」菜单并选择「管理群」",
        ],
    },
    {
        "filename": "step2.点击个性管理.png",
        "tag": "Step 2",
        "title": "点击「个性管理」",
        "lines": [
            "在群管理界面中向下滑动",
            "找到并点击进入「个性管理」选项",
        ],
    },
    {
        "filename": "step3.点击群头衔和标识管理.png",
        "tag": "Step 3",
        "title": "群头衔和标识管理",
        "lines": [
            "在个性管理功能列表中",
            "点击进入「群头衔和标识管理」子菜单",
        ],
    },
    {
        "filename": "step4.打开展示成员群头衔.png",
        "tag": "Step 4",
        "title": "开启「展示成员群头衔」",
        "lines": [
            "确认并开启「展示成员群头衔」开关",
            "开启后头衔即可在群聊界面正常展示",
        ],
    },
]


def load_font(font_path: Path, size: int):
    """安全加载字体，如果失败则回退默认字体"""
    if font_path.exists():
        try:
            return ImageFont.truetype(str(font_path), size)
        except Exception:
            pass
    return ImageFont.load_default()


def create_rounded_image(im: Image.Image, radius: int) -> Image.Image:
    """给图片添加平滑圆角"""
    mask = Image.new("L", im.size, 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle((0, 0, im.size[0], im.size[1]), radius=radius, fill=255)
    rounded = Image.new("RGBA", im.size, (0, 0, 0, 0))
    rounded.paste(im, (0, 0), mask=mask)
    return rounded


def generate_guide_grid(scale: float = 0.5) -> Path:
    """生成 2x2 网格排版的精美大图 (guide_overview_2x2grid.png)"""
    title_font = load_font(FONT_BOLD, int(72 * scale * 2))
    sub_font = load_font(FONT_REGULAR, int(38 * scale * 2))
    card_title_font = load_font(FONT_BOLD, int(46 * scale * 2))
    card_desc_font = load_font(FONT_REGULAR, int(32 * scale * 2))
    tag_font = load_font(FONT_BOLD, int(30 * scale * 2))
    footer_font = load_font(FONT_REGULAR, int(30 * scale * 2))

    card_img_w = int(1260 * scale)
    card_img_h = int(2800 * scale)

    card_padding = int(30 * scale * 2)
    card_text_h = int(190 * scale * 2)
    card_w = card_img_w + card_padding * 2
    card_h = card_img_h + card_text_h + card_padding * 2

    margin_x = int(50 * scale * 2)
    header_h = int(230 * scale * 2)
    gap = int(40 * scale * 2)
    footer_h = int(100 * scale * 2)

    total_w = margin_x * 2 + card_w * 2 + gap
    total_h = header_h + card_h * 2 + gap + footer_h

    canvas = Image.new("RGB", (total_w, total_h), (248, 250, 252))
    draw = ImageDraw.Draw(canvas)

    # 1. Header
    header_title = "QQ 群专属头衔显示配置指引"
    header_sub = "若 Bot 修改头衔成功后群聊未显示头衔气泡，请群主按以下四步在手机 QQ 中开启展示"
    draw.text((margin_x, int(50 * scale * 2)), header_title, font=title_font, fill=(15, 23, 42))
    draw.text((margin_x, int(140 * scale * 2)), header_sub, font=sub_font, fill=(100, 116, 139))

    # 2. Cards
    tag_colors = [(59, 130, 246), (99, 102, 241), (139, 92, 246), (16, 185, 129)]

    for idx, step_meta in enumerate(STEPS):
        col = idx % 2
        row = idx // 2
        cx = margin_x + col * (card_w + gap)
        cy = header_h + row * (card_h + gap)

        card_radius = int(24 * scale * 2)
        draw.rounded_rectangle(
            (cx, cy, cx + card_w, cy + card_h),
            radius=card_radius,
            fill=(255, 255, 255),
            outline=(226, 232, 240),
            width=max(1, int(2 * scale * 2)),
        )

        tag_bg = tag_colors[idx]
        tag_text = step_meta["tag"]
        tag_box_w = int(120 * scale * 2)
        tag_box_h = int(48 * scale * 2)
        tag_x = cx + card_padding
        tag_y = cy + card_padding
        draw.rounded_rectangle(
            (tag_x, tag_y, tag_x + tag_box_w, tag_y + tag_box_h),
            radius=int(10 * scale * 2),
            fill=tag_bg,
        )

        tb = draw.textbbox((0, 0), tag_text, font=tag_font)
        tw = tb[2] - tb[0]
        th = tb[3] - tb[1]
        draw.text(
            (tag_x + (tag_box_w - tw) // 2, tag_y + (tag_box_h - th) // 2 - int(2 * scale * 2)),
            tag_text,
            font=tag_font,
            fill=(255, 255, 255),
        )

        text_x = tag_x + tag_box_w + int(18 * scale * 2)
        draw.text((text_x, tag_y + int(2 * scale * 2)), step_meta["title"], font=card_title_font, fill=(30, 41, 59))

        desc_start_y = tag_y + tag_box_h + int(16 * scale * 2)
        line_height = int(40 * scale * 2)
        for l_idx, line in enumerate(step_meta["lines"]):
            draw.text(
                (tag_x, desc_start_y + l_idx * line_height),
                line,
                font=card_desc_font,
                fill=(100, 116, 139),
            )

        img_file = GUIDE_DIR / step_meta["filename"]
        if img_file.exists():
            with Image.open(img_file) as raw_img:
                raw_img = raw_img.convert("RGBA")
                resized_img = raw_img.resize((card_img_w, card_img_h), Image.Resampling.LANCZOS)
                rounded_shot = create_rounded_image(resized_img, radius=int(14 * scale * 2))

                shot_x = cx + card_padding
                shot_y = cy + card_padding + card_text_h
                canvas.paste(rounded_shot, (shot_x, shot_y), mask=rounded_shot)

                draw.rounded_rectangle(
                    (shot_x, shot_y, shot_x + card_img_w, shot_y + card_img_h),
                    radius=int(14 * scale * 2),
                    outline=(203, 213, 225),
                    width=max(1, int(1.5 * scale * 2)),
                )

    # 3. Footer
    footer_text = "koishi-plugin-onebot-touxian · 群管指引手册 (2x2 网格版)"
    bbox = draw.textbbox((0, 0), footer_text, font=footer_font)
    fx = (total_w - (bbox[2] - bbox[0])) // 2
    fy = total_h - footer_h + int(35 * scale * 2)
    draw.text((fx, fy), footer_text, font=footer_font, fill=(148, 163, 184))

    out_file = GUIDE_DIR / "guide_overview_2x2grid.png"
    canvas.save(out_file, "PNG", optimize=True)
    print(f"成功生成 2x2 网格大图: {out_file} (尺寸: {total_w}x{total_h})")
    return out_file


def generate_guide_vertical(scale: float = 0.5) -> Path:
    """生成 4x1 单列纯纵向长图 (guide_overview_vertical.png)，非常适合手机垂直滑动浏览"""
    title_font = load_font(FONT_BOLD, int(68 * scale * 2))
    sub_font = load_font(FONT_REGULAR, int(36 * scale * 2))
    card_title_font = load_font(FONT_BOLD, int(46 * scale * 2))
    card_desc_font = load_font(FONT_REGULAR, int(32 * scale * 2))
    tag_font = load_font(FONT_BOLD, int(30 * scale * 2))
    footer_font = load_font(FONT_REGULAR, int(30 * scale * 2))

    card_img_w = int(1260 * scale)
    card_img_h = int(2800 * scale)

    card_padding = int(30 * scale * 2)
    card_text_h = int(190 * scale * 2)
    card_w = card_img_w + card_padding * 2
    card_h = card_img_h + card_text_h + card_padding * 2

    margin_x = int(45 * scale * 2)
    header_h = int(240 * scale * 2)
    gap = int(45 * scale * 2)
    footer_h = int(100 * scale * 2)

    total_w = margin_x * 2 + card_w
    total_h = header_h + card_h * 4 + gap * 3 + footer_h

    canvas = Image.new("RGB", (total_w, total_h), (248, 250, 252))
    draw = ImageDraw.Draw(canvas)

    # Header
    draw.text((margin_x, int(50 * scale * 2)), "QQ 群专属头衔显示配置指引", font=title_font, fill=(15, 23, 42))
    draw.text(
        (margin_x, int(140 * scale * 2)),
        "若 Bot 修改头衔成功后群聊未显示头衔气泡，请群主按以下四步操作：",
        font=sub_font,
        fill=(100, 116, 139),
    )

    tag_colors = [(59, 130, 246), (99, 102, 241), (139, 92, 246), (16, 185, 129)]

    for idx, step_meta in enumerate(STEPS):
        cx = margin_x
        cy = header_h + idx * (card_h + gap)

        card_radius = int(24 * scale * 2)
        draw.rounded_rectangle(
            (cx, cy, cx + card_w, cy + card_h),
            radius=card_radius,
            fill=(255, 255, 255),
            outline=(226, 232, 240),
            width=max(1, int(2 * scale * 2)),
        )

        tag_bg = tag_colors[idx]
        tag_text = step_meta["tag"]
        tag_box_w = int(120 * scale * 2)
        tag_box_h = int(48 * scale * 2)
        tag_x = cx + card_padding
        tag_y = cy + card_padding

        draw.rounded_rectangle(
            (tag_x, tag_y, tag_x + tag_box_w, tag_y + tag_box_h),
            radius=int(10 * scale * 2),
            fill=tag_bg,
        )

        tb = draw.textbbox((0, 0), tag_text, font=tag_font)
        tw = tb[2] - tb[0]
        th = tb[3] - tb[1]
        draw.text(
            (tag_x + (tag_box_w - tw) // 2, tag_y + (tag_box_h - th) // 2 - int(2 * scale * 2)),
            tag_text,
            font=tag_font,
            fill=(255, 255, 255),
        )

        text_x = tag_x + tag_box_w + int(18 * scale * 2)
        draw.text((text_x, tag_y + int(2 * scale * 2)), step_meta["title"], font=card_title_font, fill=(30, 41, 59))

        desc_start_y = tag_y + tag_box_h + int(16 * scale * 2)
        line_height = int(40 * scale * 2)
        for l_idx, line in enumerate(step_meta["lines"]):
            draw.text(
                (tag_x, desc_start_y + l_idx * line_height),
                line,
                font=card_desc_font,
                fill=(100, 116, 139),
            )

        img_file = GUIDE_DIR / step_meta["filename"]
        if img_file.exists():
            with Image.open(img_file) as raw_img:
                raw_img = raw_img.convert("RGBA")
                resized_img = raw_img.resize((card_img_w, card_img_h), Image.Resampling.LANCZOS)
                rounded_shot = create_rounded_image(resized_img, radius=int(14 * scale * 2))

                shot_x = cx + card_padding
                shot_y = cy + card_padding + card_text_h
                canvas.paste(rounded_shot, (shot_x, shot_y), mask=rounded_shot)

                draw.rounded_rectangle(
                    (shot_x, shot_y, shot_x + card_img_w, shot_y + card_img_h),
                    radius=int(14 * scale * 2),
                    outline=(203, 213, 225),
                    width=max(1, int(1.5 * scale * 2)),
                )

    footer_text = "koishi-plugin-onebot-touxian · 群管指引手册 (单列竖排长图版)"
    bbox = draw.textbbox((0, 0), footer_text, font=footer_font)
    fx = (total_w - (bbox[2] - bbox[0])) // 2
    fy = total_h - footer_h + int(35 * scale * 2)
    draw.text((fx, fy), footer_text, font=footer_font, fill=(148, 163, 184))

    out_file = GUIDE_DIR / "guide_overview_vertical.png"
    canvas.save(out_file, "PNG", optimize=True)
    print(f"成功生成 4x1 单列竖排长图: {out_file} (尺寸: {total_w}x{total_h})")
    return out_file


def generate_guide_horizontal(scale: float = 0.45) -> Path:
    """生成 1x4 横向排版的长条大图 (guide_overview_horizontal.png)"""
    title_font = load_font(FONT_BOLD, int(68 * scale * 2))
    sub_font = load_font(FONT_REGULAR, int(36 * scale * 2))
    card_title_font = load_font(FONT_BOLD, int(42 * scale * 2))
    card_desc_font = load_font(FONT_REGULAR, int(28 * scale * 2))
    tag_font = load_font(FONT_BOLD, int(28 * scale * 2))
    footer_font = load_font(FONT_REGULAR, int(28 * scale * 2))

    card_img_w = int(1260 * scale)
    card_img_h = int(2800 * scale)

    card_padding = int(26 * scale * 2)
    card_text_h = int(180 * scale * 2)
    card_w = card_img_w + card_padding * 2
    card_h = card_img_h + card_text_h + card_padding * 2

    margin_x = int(45 * scale * 2)
    header_h = int(220 * scale * 2)
    gap = int(25 * scale * 2)
    footer_h = int(90 * scale * 2)

    total_w = margin_x * 2 + card_w * 4 + gap * 3
    total_h = header_h + card_h + footer_h

    canvas = Image.new("RGB", (total_w, total_h), (248, 250, 252))
    draw = ImageDraw.Draw(canvas)

    # Header
    draw.text((margin_x, int(45 * scale * 2)), "QQ 群专属头衔显示配置指引", font=title_font, fill=(15, 23, 42))
    draw.text(
        (margin_x, int(135 * scale * 2)),
        "若 Bot 修改头衔成功后群聊未显示头衔气泡，请群主按以下四步在手机 QQ 中开启展示",
        font=sub_font,
        fill=(100, 116, 139),
    )

    tag_colors = [(59, 130, 246), (99, 102, 241), (139, 92, 246), (16, 185, 129)]

    for idx, step_meta in enumerate(STEPS):
        cx = margin_x + idx * (card_w + gap)
        cy = header_h

        card_radius = int(20 * scale * 2)
        draw.rounded_rectangle(
            (cx, cy, cx + card_w, cy + card_h),
            radius=card_radius,
            fill=(255, 255, 255),
            outline=(226, 232, 240),
            width=max(1, int(2 * scale * 2)),
        )

        tag_bg = tag_colors[idx]
        tag_box_w = int(112 * scale * 2)
        tag_box_h = int(44 * scale * 2)
        tag_x = cx + card_padding
        tag_y = cy + card_padding

        draw.rounded_rectangle(
            (tag_x, tag_y, tag_x + tag_box_w, tag_y + tag_box_h),
            radius=int(8 * scale * 2),
            fill=tag_bg,
        )
        tb = draw.textbbox((0, 0), step_meta["tag"], font=tag_font)
        tw = tb[2] - tb[0]
        th = tb[3] - tb[1]
        draw.text(
            (tag_x + (tag_box_w - tw) // 2, tag_y + (tag_box_h - th) // 2 - int(2 * scale * 2)),
            step_meta["tag"],
            font=tag_font,
            fill=(255, 255, 255),
        )

        draw.text((tag_x + tag_box_w + int(14 * scale * 2), tag_y + int(2 * scale * 2)), step_meta["title"], font=card_title_font, fill=(30, 41, 59))

        desc_start_y = tag_y + tag_box_h + int(14 * scale * 2)
        line_height = int(36 * scale * 2)
        for l_idx, line in enumerate(step_meta["lines"]):
            draw.text(
                (tag_x, desc_start_y + l_idx * line_height),
                line,
                font=card_desc_font,
                fill=(100, 116, 139),
            )

        img_file = GUIDE_DIR / step_meta["filename"]
        if img_file.exists():
            with Image.open(img_file) as raw_img:
                raw_img = raw_img.convert("RGBA")
                resized_img = raw_img.resize((card_img_w, card_img_h), Image.Resampling.LANCZOS)
                rounded_shot = create_rounded_image(resized_img, radius=int(14 * scale * 2))
                shot_x = cx + card_padding
                shot_y = cy + card_padding + card_text_h
                canvas.paste(rounded_shot, (shot_x, shot_y), mask=rounded_shot)
                draw.rounded_rectangle(
                    (shot_x, shot_y, shot_x + card_img_w, shot_y + card_img_h),
                    radius=int(14 * scale * 2),
                    outline=(203, 213, 225),
                    width=max(1, int(1.5 * scale * 2)),
                )

    footer_text = "koishi-plugin-onebot-touxian · 群管指引手册 (1x4 横向排版)"
    bbox = draw.textbbox((0, 0), footer_text, font=footer_font)
    fx = (total_w - (bbox[2] - bbox[0])) // 2
    fy = total_h - footer_h + int(30 * scale * 2)
    draw.text((fx, fy), footer_text, font=footer_font, fill=(148, 163, 184))

    out_file = GUIDE_DIR / "guide_overview_horizontal.png"
    canvas.save(out_file, "PNG", optimize=True)
    print(f"成功生成 1x4 横向排版大图: {out_file} (尺寸: {total_w}x{total_h})")
    return out_file


if __name__ == "__main__":
    print("=== 开始生成群头衔指引大图（三版合一） ===")
    generate_guide_grid(scale=0.5)
    generate_guide_vertical(scale=0.5)
    generate_guide_horizontal(scale=0.45)
    print("=== 全部生成完成 ===")
