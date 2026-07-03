import os
import re

dir_path = r"d:\nclient\vnex-wpc"

for root, _, files in os.walk(dir_path):
    for file in files:
        if file.endswith(".html"):
            file_path = os.path.join(root, file)
            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()
                
                # Replace variations in the footer and contact page
                new_content = re.sub(r'9:00 AM [-–] 6:00 PM', '8:30 AM - 8:00 PM', content, flags=re.IGNORECASE)
                new_content = re.sub(r'8:00 AM [-–] 9:00 PM', '8:30 AM - 8:00 PM', new_content, flags=re.IGNORECASE)
                # The contact page banner text:
                new_content = re.sub(r'8AM to 9PM', '8:30AM to 8:00PM', new_content, flags=re.IGNORECASE)
                
                if new_content != content:
                    with open(file_path, "w", encoding="utf-8") as f:
                        f.write(new_content)
                    print(f"Updated {file_path}")
            except Exception as e:
                print(f"Error on {file_path}: {e}")
