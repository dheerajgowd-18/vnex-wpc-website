import os
import re

dir_path = r"d:\nclient\vnex-wpc"

for root, _, files in os.walk(dir_path):
    for file in files:
        if file.endswith(".html"):
            file_path = os.path.join(root, file)
            
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
                
            # Skip if already injected
            if '<!-- SEO & Icons -->' in content:
                continue
                
            # Determine relative path for images (e.g., if in products/ folder)
            rel_path = ""
            if "products\\" in file_path or "products/" in file_path:
                rel_path = "../"
                
            # Determine canonical path
            rel_file_path = os.path.relpath(file_path, dir_path).replace("\\", "/")
            if rel_file_path == "index.html":
                page_path = ""
            elif rel_file_path.endswith("index.html"):
                page_path = rel_file_path.replace("index.html", "")
            else:
                page_path = rel_file_path
                
            # Extract title and description
            title_match = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE | re.DOTALL)
            title = title_match.group(1).strip() if title_match else "VNEX WPC"
            
            desc_match = re.search(r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']', content, re.IGNORECASE | re.DOTALL)
            description = desc_match.group(1).strip() if desc_match else ""
            
            seo_block = f"""
  <!-- SEO & Icons -->
  <link rel="icon" type="image/webp" href="{rel_path}images/logo.webp">
  <link rel="apple-touch-icon" href="{rel_path}images/logo.webp">
  <link rel="canonical" href="https://vnexwpc.com/{page_path}">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{description}">
  <meta property="og:image" content="https://vnexwpc.com/images/logo.webp">
  <meta property="og:url" content="https://vnexwpc.com/{page_path}">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
</head>"""
            
            # Inject just before </head>
            new_content = re.sub(r'</head>', seo_block, content, flags=re.IGNORECASE)
            
            if new_content != content:
                with open(file_path, "w", encoding="utf-8") as f:
                    f.write(new_content)
                print(f"Injected SEO into {file_path}")
