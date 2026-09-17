import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_og_image():
    base_path = 'public/assets/lotus/social-card.webp'
    base = Image.open(base_path).convert('RGBA')
    width, height = base.size  # 1200 x 630

    # Create overlay layer for ambient glow and typography
    overlay = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    # 1. Subtle soft vignette / dark wash over the top-center sky for perfect legibility
    vignette = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    v_draw = ImageDraw.Draw(vignette)
    
    # Soft radial gradient in upper center
    cx, cy = 560, 190
    for r in range(320, 0, -8):
        alpha = int(95 * (1.0 - (r / 320.0)))
        v_draw.ellipse([cx - r * 1.5, cy - r * 0.7, cx + r * 1.5, cy + r * 0.7], fill=(5, 12, 26, alpha))
    
    vignette = vignette.filter(ImageFilter.GaussianBlur(radius=30))
    overlay = Image.alpha_composite(overlay, vignette)
    draw = ImageDraw.Draw(overlay)

    # 2. Ornate thin gold border
    gold_border = (230, 198, 138, 140)
    gold_border_outer = (230, 198, 138, 60)
    gold_bright = (248, 230, 195, 255)
    gold_subtle = (235, 205, 150, 235)
    pearl_white = (252, 249, 244, 255)
    pearl_dim = (244, 239, 232, 205)

    pad = 22
    # Outer thin border
    draw.rectangle([pad, pad, width - pad, height - pad], outline=gold_border_outer, width=1)
    # Inner border
    pad_in = 28
    draw.rectangle([pad_in, pad_in, width - pad_in, height - pad_in], outline=gold_border, width=1)
    
    # Corner diamond accents
    def draw_corner_diamond(dcx, dcy, size=5):
        draw.polygon([
            (dcx, dcy - size),
            (dcx + size, dcy),
            (dcx, dcy + size),
            (dcx - size, dcy)
        ], fill=(230, 198, 138, 220))

    draw_corner_diamond(pad_in, pad_in)
    draw_corner_diamond(width - pad_in, pad_in)
    draw_corner_diamond(pad_in, height - pad_in)
    draw_corner_diamond(width - pad_in, height - pad_in)

    # 3. Fonts using Windows system fonts
    font_names = ImageFont.truetype('C:/Windows/Fonts/palab.ttf', 68)
    font_amp = ImageFont.truetype('C:/Windows/Fonts/palai.ttf', 56)
    font_date = ImageFont.truetype('C:/Windows/Fonts/georgia.ttf', 23)
    font_eyebrow = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 13)
    font_venue = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 13)
    font_rsvp = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 11)

    # 4. Content layout
    center_x = 550  # Center-aligned in sky between boat on left and mandap on right
    
    # Eyebrow: TOGETHER WITH THEIR FAMILIES
    eyebrow_text = "T O G E T H E R   W I T H   T H E I R   F A M I L I E S"
    bbox = draw.textbbox((0, 0), eyebrow_text, font=font_eyebrow)
    tw = bbox[2] - bbox[0]
    y_pos = 58
    
    # Text shadow + text
    draw.text((center_x - tw / 2, y_pos + 1), eyebrow_text, font=font_eyebrow, fill=(3, 8, 18, 220))
    draw.text((center_x - tw / 2, y_pos), eyebrow_text, font=font_eyebrow, fill=gold_subtle)

    # Decorative hairline under eyebrow
    line_w = 75
    y_line = y_pos + 26
    draw.line([(center_x - line_w, y_line), (center_x + line_w, y_line)], fill=(230, 198, 138, 110), width=1)
    draw.polygon([(center_x, y_line - 3), (center_x + 3, y_line), (center_x, y_line + 3), (center_x - 3, y_line)], fill=gold_bright)

    # Main Names: Sonali & Nayan
    name_sonali = "Sonali"
    amp = " & "
    name_nayan = "Nayan"

    bbox_s = draw.textbbox((0, 0), name_sonali, font=font_names)
    w_s = bbox_s[2] - bbox_s[0]
    bbox_a = draw.textbbox((0, 0), amp, font=font_amp)
    w_a = bbox_a[2] - bbox_a[0]
    bbox_n = draw.textbbox((0, 0), name_nayan, font=font_names)
    w_n = bbox_n[2] - bbox_n[0]

    total_names_w = w_s + w_a + w_n
    start_x = center_x - total_names_w / 2
    y_names = 100

    # Soft golden radial glow behind names
    glow = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(glow)
    g_draw.ellipse([
        center_x - 260, y_names - 15,
        center_x + 260, y_names + 105
    ], fill=(230, 198, 138, 35))
    glow = glow.filter(ImageFilter.GaussianBlur(radius=32))
    overlay = Image.alpha_composite(overlay, glow)
    draw = ImageDraw.Draw(overlay)

    # Draw names with drop shadow
    shadow_offset = 2
    draw.text((start_x + shadow_offset, y_names + shadow_offset), name_sonali, font=font_names, fill=(3, 8, 18, 240))
    draw.text((start_x, y_names), name_sonali, font=font_names, fill=pearl_white)

    draw.text((start_x + w_s + shadow_offset, y_names + shadow_offset + 3), amp, font=font_amp, fill=(3, 8, 18, 240))
    draw.text((start_x + w_s, y_names + 3), amp, font=font_amp, fill=gold_bright)

    draw.text((start_x + w_s + w_a + shadow_offset, y_names + shadow_offset), name_nayan, font=font_names, fill=(3, 8, 18, 240))
    draw.text((start_x + w_s + w_a, y_names), name_nayan, font=font_names, fill=pearl_white)

    # Date
    date_text = "Saturday, October 24, 2026"
    bbox_d = draw.textbbox((0, 0), date_text, font=font_date)
    w_d = bbox_d[2] - bbox_d[0]
    y_date = y_names + 86

    draw.text((center_x - w_d / 2, y_date + 1), date_text, font=font_date, fill=(3, 8, 18, 230))
    draw.text((center_x - w_d / 2, y_date), date_text, font=font_date, fill=gold_bright)

    # Venue
    venue_text = "VERSAILLES CONVENTION CENTRE   ·   MISSISSAUGA, ON"
    bbox_v = draw.textbbox((0, 0), venue_text, font=font_venue)
    w_v = bbox_v[2] - bbox_v[0]
    y_venue = y_date + 38

    draw.text((center_x - w_v / 2, y_venue + 1), venue_text, font=font_venue, fill=(3, 8, 18, 230))
    draw.text((center_x - w_v / 2, y_venue), venue_text, font=font_venue, fill=pearl_dim)

    # RSVP Badge Capsule
    rsvp_text = "KINDLY RSVP BY OCTOBER 3RD, 2026"
    bbox_r = draw.textbbox((0, 0), rsvp_text, font=font_rsvp)
    w_r = bbox_r[2] - bbox_r[0]
    h_r = bbox_r[3] - bbox_r[1]

    capsule_pad_x = 18
    capsule_pad_y = 6
    cap_x0 = center_x - w_r / 2 - capsule_pad_x
    cap_y0 = y_venue + 36
    cap_x1 = center_x + w_r / 2 + capsule_pad_x
    cap_y1 = cap_y0 + h_r + capsule_pad_y * 2

    # Capsule background & border
    draw.rounded_rectangle([cap_x0, cap_y0, cap_x1, cap_y1], radius=14, fill=(6, 15, 30, 190), outline=(230, 198, 138, 150), width=1)
    draw.text((center_x - w_r / 2, cap_y0 + capsule_pad_y), rsvp_text, font=font_rsvp, fill=gold_subtle)

    # Combine with base
    final = Image.alpha_composite(base, overlay).convert('RGB')
    
    # Save both WebP and high-quality JPG
    final.save('public/assets/lotus/og-image.jpg', quality=95)
    final.save('public/og-image.jpg', quality=95)
    final.save('public/assets/lotus/og-image.webp', quality=95)
    print("Successfully generated og-image.jpg and og-image.webp (1200x630)")

if __name__ == '__main__':
    create_og_image()
