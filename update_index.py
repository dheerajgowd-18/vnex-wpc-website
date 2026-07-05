import re

file_path = r"d:\nclient\vnex-wpc\index.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Meta Title
content = re.sub(
    r'<title>VNEX WPC — Premium Wood Polymer Composite Doors, Frames & Sheets</title>',
    r'<title>VNEX WPC — Premium WPC Doors in Hyderabad | Frames & Sheets</title>',
    content, count=1
)
content = re.sub(
    r'<meta property="og:title" content="VNEX WPC — Premium Wood Polymer Composite Doors, Frames & Sheets">',
    r'<meta property="og:title" content="VNEX WPC — Premium WPC Doors in Hyderabad | Frames & Sheets">',
    content, count=1
)

# 2. Hero H1
content = re.sub(
    r'<span class="ht-main">Premium WPC Doors</span>',
    r'<span class="ht-main">Premium WPC Doors in Hyderabad</span>',
    content, count=1
)

# 3. Hero Subtitle
content = re.sub(
    r'In-house roller printing, digital printing, and precision texture finishing that deliver exceptional aesthetics, durability, and performance in premium WPC doors and frames.',
    r'Based in Hyderabad, we deliver exceptional aesthetics, durability, and waterproof performance in premium WPC doors and frames through in-house digital printing and precision texture finishing.',
    content, count=1
)

# 4. Products H2
content = re.sub(
    r'<h2 class="section-title">Our Products</h2>',
    r'<h2 class="section-title">Our Premium WPC Doors & Frames</h2>',
    content, count=1
)

# 5. Why Choose Us H2
content = re.sub(
    r'<h2 class="section-title">Why VNEX WPC\?</h2>',
    r'<h2 class="section-title">Why Choose Our Termite-Proof WPC Doors?</h2>',
    content, count=1
)

# 6. CTA H2
content = re.sub(
    r'<h2>Ready to Transform Your Space\?</h2>',
    r'<h2>Get a Free Quote for WPC Doors in Hyderabad</h2>',
    content, count=1
)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("index.html updated successfully.")
