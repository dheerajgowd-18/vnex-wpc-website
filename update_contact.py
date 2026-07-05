import re

file_path = r"d:\nclient\vnex-wpc\contact.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Meta Title
content = re.sub(
    r'<title>Contact Us - VNEX WPC \| Get a Free Quote</title>',
    r'<title>Contact Us - VNEX WPC | WPC Door Manufacturers in Hyderabad</title>',
    content, count=1
)
content = re.sub(
    r'<meta property="og:title" content="Contact Us - VNEX WPC \| Get a Free Quote">',
    r'<meta property="og:title" content="Contact Us - VNEX WPC | WPC Door Manufacturers in Hyderabad">',
    content, count=1
)

# 2. Banner Heading
content = re.sub(
    r'<h2>Prefer to Talk to Us Directly\?</h2>',
    r'<h2>Looking for WPC Door Manufacturers in Hyderabad?</h2>',
    content, count=1
)

# 3. Banner Subtext
content = re.sub(
    r'<p style="max-width:600px;margin:0 auto;color:rgba\(255,255,255,0\.9\);">\s*Our team is available Monday – Saturday, 8:30 AM to 8:00 PM\. We love talking about WPC!\s*</p>',
    r'<p style="max-width:600px;margin:0 auto;color:rgba(255,255,255,0.9);">Visit our manufacturing facility in Jeedimetla, Hyderabad for direct factory pricing on WPC doors and frames near you. We are available Mon–Sat, 8:30 AM to 8:00 PM.</p>',
    content, count=1
)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("contact.html updated successfully.")
