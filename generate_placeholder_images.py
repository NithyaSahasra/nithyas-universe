import os
import subprocess
import sys
# Ensure Pillow is installed
try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    print("Pillow not found. Installing...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image, ImageDraw, ImageFont
def create_gradient_img(width, height, color1, color2):
    # Create gradient
    base = Image.new("RGB", (width, height), color1)
    top = Image.new("RGB", (width, height), color2)
    mask = Image.new("L", (width, height))
    for y in range(height):
        # linear interpolation factor
        factor = int((y / height) * 255)
        for x in range(width):
            mask.putpixel((x, y), factor)
    base.paste(top, (0, 0), mask)
    return base
def add_sparkles_and_hearts(draw, width, height, count=10):
    # Draw simple hearts and stars (sparkles)
    import random
    random.seed(42)  # consistent generation
    colors = [(255, 115, 175), (255, 194, 220), (255, 255, 255), (255, 156, 197)]
    for _ in range(count):
        x = random.randint(10, width - 10)
        y = random.randint(10, height - 10)
        size = random.randint(8, 20)
        color = random.choice(colors)
        shape_type = random.choice(['heart', 'sparkle', 'circle'])
        
        if shape_type == 'heart':
            # Draw a simple heart: two circles and a triangle
            r = size // 2
            draw.ellipse([x - r, y - r, x, y], fill=color)
            draw.ellipse([x, y - r, x + r, y], fill=color)
            draw.polygon([x - r, y - r//2, x + r, y - r//2, x, y + r], fill=color)
        elif shape_type == 'sparkle':
            # Draw cross star
            draw.line([x - size, y, x + size, y], fill=color, width=2)
            draw.line([x, y - size, x, y + size], fill=color, width=2)
        else:
            # Circle/dot
            draw.ellipse([x - size//3, y - size//3, x + size//3, y + size//3], fill=color)
def generate_image(name, width, height, text, bg_color1=(255, 245, 248), bg_color2=(255, 228, 238), icon_type=None):
    img = create_gradient_img(width, height, bg_color1, bg_color2)
    draw = ImageDraw.Draw(img)
    
    # Decorate with random hearts and stars
    add_sparkles_and_hearts(draw, width, height, count=15)
    
    # Draw icon-specific elements
    color_accent = (255, 115, 175) # #FF73AF
    color_dark = (255, 90, 150)
    
    if icon_type == "girl":
        # Draw a cute avatar outline or cartoon girl shape
        cx, cy = width // 2, height // 2 - 20
        draw.ellipse([cx - 40, cy - 40, cx + 40, cy + 40], fill=(255, 194, 220), outline=color_accent, width=3) # head
        # hair
        draw.chord([cx - 43, cy - 43, cx + 43, cy + 10], 180, 360, fill=(255, 115, 175))
        # bow in hair
        draw.polygon([cx - 15, cy - 35, cx - 5, cy - 30, cx - 15, cy - 25], fill=(255, 255, 255))
        draw.polygon([cx + 15, cy - 35, cx + 5, cy - 30, cx + 15, cy - 25], fill=(255, 255, 255))
        draw.ellipse([cx - 5, cy - 33, cx + 5, cy - 27], fill=color_accent)
        # eyes and smile
        draw.ellipse([cx - 15, cy - 5, cx - 11, cy - 1], fill=(80, 80, 80))
        draw.ellipse([cx + 11, cy - 5, cx + 15, cy - 1], fill=(80, 80, 80))
        draw.arc([cx - 8, cy + 5, cx + 8, cy + 15], 0, 180, fill=(255, 50, 120), width=3)
        # body/collar
        draw.polygon([cx - 50, cy + 70, cx + 50, cy + 70, cx, cy + 30], fill=(255, 156, 197))
    elif icon_type == "butterfly":
        # Draw butterfly shape
        cx, cy = width // 2, height // 2
        # wings
        draw.ellipse([cx - 30, cy - 25, cx, cy], fill=(255, 194, 220), outline=color_accent, width=2)
        draw.ellipse([cx, cy - 25, cx + 30, cy], fill=(255, 194, 220), outline=color_accent, width=2)
        draw.ellipse([cx - 25, cy, cx, cy + 20], fill=(255, 156, 197), outline=color_accent, width=2)
        draw.ellipse([cx, cy, cx + 25, cy + 20], fill=(255, 156, 197), outline=color_accent, width=2)
        # body
        draw.ellipse([cx - 4, cy - 20, cx + 4, cy + 20], fill=color_accent)
        draw.line([cx - 4, cy - 20, cx - 12, cy - 32], fill=color_accent, width=2)
        draw.line([cx + 4, cy - 20, cx + 12, cy - 32], fill=color_accent, width=2)
    elif icon_type == "flower":
        # Draw a cute daisy
        cx, cy = width // 2, height // 2
        r = 25
        for i in range(8):
            import math
            angle = i * (2 * math.pi / 8)
            px = cx + int(r * math.cos(angle))
            py = cy + int(r * math.sin(angle))
            draw.ellipse([px - 15, py - 15, px + 15, py + 15], fill=(255, 255, 255), outline=color_accent, width=2)
        draw.ellipse([cx - 18, cy - 18, cx + 18, cy + 18], fill=(255, 194, 220)) # center
    elif icon_type == "cloud":
        # Draw fluffy cloud
        cx, cy = width // 2, height // 2
        draw.ellipse([cx - 40, cy - 10, cx + 40, cy + 30], fill=(255, 255, 255))
        draw.ellipse([cx - 25, cy - 25, cx + 5, cy + 15], fill=(255, 255, 255))
        draw.ellipse([cx - 5, cy - 30, cx + 30, cy + 10], fill=(255, 255, 255))
    elif icon_type == "sparkle":
        # Draw custom sparkles
        cx, cy = width // 2, height // 2
        draw.polygon([cx, cy - 40, cx + 10, cy - 10, cx + 40, cy, cx + 10, cy + 10, cx, cy + 40, cx - 10, cy + 10, cx - 40, cy, cx - 10, cy - 10], fill=(255, 255, 255), outline=color_accent, width=2)
    elif icon_type == "trophy":
        # Draw cute golden-pink trophy
        cx, cy = width // 2, height // 2
        draw.rectangle([cx - 30, cy + 30, cx + 30, cy + 40], fill=color_accent) # base
        draw.rectangle([cx - 8, cy - 10, cx + 8, cy + 30], fill=(255, 194, 220)) # stem
        draw.polygon([cx - 40, cy - 30, cx + 40, cy - 30, cx + 25, cy - 10, cx - 25, cy - 10], fill=(255, 156, 197), outline=color_accent, width=2) # cup body
        # handles
        draw.arc([cx - 45, cy - 30, cx - 20, cy - 10], 90, 270, fill=color_accent, width=3)
        draw.arc([cx + 20, cy - 30, cx + 45, cy - 10], 270, 90, fill=color_accent, width=3)
    elif icon_type == "vinyl":
        # Draw a vinyl record
        cx, cy = width // 2, height // 2
        draw.ellipse([cx - 60, cy - 60, cx + 60, cy + 60], fill=(50, 45, 48), outline=color_accent, width=3)
        # grooves
        draw.ellipse([cx - 45, cy - 45, cx + 45, cy + 45], outline=(100, 90, 95), width=1)
        draw.ellipse([cx - 30, cy - 30, cx + 30, cy + 30], outline=(100, 90, 95), width=1)
        # label
        draw.ellipse([cx - 20, cy - 20, cx + 20, cy + 20], fill=(255, 115, 175))
        draw.ellipse([cx - 5, cy - 5, cx + 5, cy + 5], fill=(255, 245, 248))
    elif icon_type == "cassette":
        # Draw a retro cassette tape
        cx, cy = width // 2, height // 2
        # body
        draw.rectangle([cx - 70, cy - 40, cx + 70, cy + 40], fill=(255, 194, 220), outline=color_accent, width=4)
        # label
        draw.rectangle([cx - 50, cy - 25, cx + 50, cy + 15], fill=(255, 255, 255), outline=(255, 156, 197), width=2)
        # spool holes
        draw.ellipse([cx - 25, cy - 5, cx - 15, cy + 5], fill=(50, 50, 50))
        draw.ellipse([cx + 15, cy - 5, cx + 25, cy + 5], fill=(50, 50, 50))
        # details at bottom
        draw.polygon([cx - 30, cy + 40, cx + 30, cy + 40, cx + 20, cy + 28, cx - 20, cy + 28], fill=(255, 156, 197))
    elif icon_type == "crystal":
        # Draw glowing crystal ball
        cx, cy = width // 2, height // 2
        # stand
        draw.polygon([cx - 25, cy + 45, cx + 25, cy + 45, cx + 15, cy + 25, cx - 15, cy + 25], fill=(255, 115, 175))
        # crystal
        draw.ellipse([cx - 35, cy - 25, cx + 35, cy + 45], fill=(255, 228, 238), outline=color_accent, width=3)
        # glow highlight
        draw.ellipse([cx - 20, cy - 15, cx - 5, cy], fill=(255, 255, 255))
    elif icon_type == "envelope":
        # Draw cute pink envelope
        cx, cy = width // 2, height // 2
        draw.rectangle([cx - 60, cy - 35, cx + 60, cy + 35], fill=(255, 228, 238), outline=color_accent, width=3)
        # flap lines
        draw.line([cx - 60, cy - 35, cx, cy + 5], fill=color_accent, width=2)
        draw.line([cx + 60, cy - 35, cx, cy + 5], fill=color_accent, width=2)
        # little heart seal
        draw.ellipse([cx - 8, cy + 1, cx, cy + 9], fill=color_accent)
        draw.ellipse([cx, cy + 1, cx + 8, cy + 9], fill=color_accent)
        draw.polygon([cx - 8, cy + 5, cx + 8, cy + 5, cx, cy + 15], fill=color_accent)
    elif icon_type == "sticker-heart":
        cx, cy = width // 2, height // 2
        r = 25
        # heart
        draw.ellipse([cx - r, cy - r, cx, cy], fill=(255, 115, 175))
        draw.ellipse([cx, cy - r, cx + r, cy], fill=(255, 115, 175))
        draw.polygon([cx - r, cy - r//2, cx + r, cy - r//2, cx, cy + r], fill=(255, 115, 175))
        # white sticker border outline
        draw.arc([cx - r - 2, cy - r - 2, cx + 2, cy + 2], 0, 360, fill=(255, 255, 255), width=3)
    elif icon_type == "sticker-star":
        cx, cy = width // 2, height // 2
        # star sticker
        draw.polygon([cx, cy - 35, cx + 8, cy - 10, cx + 35, cy, cx + 8, cy + 10, cx, cy + 35, cx - 8, cy + 10, cx - 35, cy, cx - 8, cy - 10], fill=(255, 194, 220), outline=(255, 255, 255), width=4)
    elif icon_type == "sticker-bow":
        # Draw a bow sticker
        cx, cy = width // 2, height // 2
        draw.polygon([cx - 35, cy - 20, cx - 5, cy - 5, cx - 35, cy + 10], fill=(255, 156, 197), outline=(255, 255, 255), width=4)
        draw.polygon([cx + 35, cy - 20, cx + 5, cy - 5, cx + 35, cy + 10], fill=(255, 156, 197), outline=(255, 255, 255), width=4)
        draw.ellipse([cx - 10, cy - 10, cx + 10, cy + 10], fill=color_accent, outline=(255, 255, 255), width=2)
        # ribbons
        draw.line([cx - 5, cy + 5, cx - 20, cy + 35], fill=color_accent, width=4)
        draw.line([cx + 5, cy + 5, cx + 20, cy + 35], fill=color_accent, width=4)
        
    # Draw Text centered at bottom
    try:
        font = ImageFont.load_default()
    except IOError:
        font = None
        
    text_w = len(text) * 6
    draw.text((width // 2 - text_w // 2, height - 30), text, fill=color_dark, font=font)
    
    # Save image
    os.makedirs(os.path.dirname(name), exist_ok=True)
    img.save(name)
    print(f"Generated {name}")
# Create images list
images_to_create = [
    # Hero avatar
    ("images/hero-girl.png", 350, 350, "Nithya's Avatar", (255, 245, 248), (255, 194, 220), "girl"),
    
    # Polaroids
    ("images/polaroid1.jpg", 300, 350, "Cherry Blossom Walk", (255, 245, 248), (255, 228, 238), "flower"),
    ("images/polaroid2.jpg", 300, 350, "Cozy Pink Cafe", (255, 245, 248), (255, 228, 238), "envelope"),
    ("images/polaroid3.jpg", 300, 350, "Dream Starry Night", (255, 245, 248), (255, 228, 238), "sparkle"),
    ("images/polaroid4.jpg", 300, 350, "Cute Kitty Garden", (255, 245, 248), (255, 228, 238), "flower"),
    ("images/polaroid5.jpg", 300, 350, "Magical Sunset", (255, 245, 248), (255, 228, 238), "cloud"),
    ("images/polaroid6.jpg", 300, 350, "Glitter Party", (255, 245, 248), (255, 228, 238), "sparkle"),
    
    # Memories
    ("images/memory1.jpg", 400, 300, "Graduation Day!", (255, 245, 248), (255, 228, 238), "trophy"),
    ("images/memory2.jpg", 400, 300, "First Code Line", (255, 245, 248), (255, 228, 238), "sparkle"),
    ("images/memory3.jpg", 400, 300, "With Besties", (255, 245, 248), (255, 228, 238), "sticker-heart"),
    
    # Butterflies, flowers, clouds, sparkles
    ("images/butterfly.png", 100, 100, "", (255, 245, 248), (255, 228, 238), "butterfly"),
    ("images/flower1.png", 120, 120, "", (255, 245, 248), (255, 228, 238), "flower"),
    ("images/flower2.png", 120, 120, "", (255, 245, 248), (255, 228, 238), "flower"),
    ("images/flower3.png", 120, 120, "", (255, 245, 248), (255, 228, 238), "flower"),
    ("images/cloud1.png", 200, 100, "", (255, 245, 248), (255, 228, 238), "cloud"),
    ("images/cloud2.png", 250, 120, "", (255, 245, 248), (255, 228, 238), "cloud"),
    ("images/sparkle.png", 80, 80, "", (255, 245, 248), (255, 228, 238), "sparkle"),
    
    # Trophies
    ("images/trophy1.png", 200, 250, "Princess Award", (255, 245, 248), (255, 228, 238), "trophy"),
    ("images/trophy2.png", 200, 250, "Genius Award", (255, 245, 248), (255, 228, 238), "trophy"),
    
    # Audio items
    ("images/vinyl.png", 250, 250, "", (255, 245, 248), (255, 228, 238), "vinyl"),
    ("images/cassette.png", 250, 150, "", (255, 245, 248), (255, 228, 238), "cassette"),
    
    # Crystal Ball
    ("images/future-crystal.png", 300, 300, "Future Orb", (255, 245, 248), (255, 228, 238), "crystal"),
    
    # Letter envelope
    ("images/envelope.png", 250, 150, "", (255, 245, 248), (255, 228, 238), "envelope"),
    
    # Stickers
    ("images/sticker-heart.png", 100, 100, "", (255, 245, 248), (255, 228, 238), "sticker-heart"),
    ("images/sticker-star.png", 100, 100, "", (255, 245, 248), (255, 228, 238), "sticker-star"),
    ("images/sticker-bow.png", 100, 100, "", (255, 245, 248), (255, 228, 238), "sticker-bow")
]
if __name__ == "__main__":
    for img_path, w, h, txt, c1, c2, icon in images_to_create:
        generate_image(img_path, w, h, txt, c1, c2, icon)
    print("All image assets generated successfully!")
