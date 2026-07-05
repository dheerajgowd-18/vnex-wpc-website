import os
import re

dir_path = r"d:\nclient\vnex-wpc"

alt_replacements = {
    r'alt="VNEX Digital WPC Doors"': r'alt="Digital printed WPC doors manufactured in Hyderabad"',
    r'alt="VNEX Texture WPC Doors"': r'alt="Texture WPC doors manufactured in Hyderabad"',
    r'alt="VNEX WPC Door Frames"': r'alt="Termite-proof WPC door frames manufactured in Hyderabad"',
    r'alt="VNEX WPC Products"': r'alt="Premium WPC doors and frames based in Hyderabad"',
    r'alt="VNEX WPC Doors"': r'alt="Premium WPC doors in Hyderabad"'
}

for root, _, files in os.walk(dir_path):
    for file in files:
        if file.endswith(".html"):
            file_path = os.path.join(root, file)
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
            
            new_content = content
            for old_alt, new_alt in alt_replacements.items():
                new_content = re.sub(old_alt, new_alt, new_content, flags=re.IGNORECASE)
            
            # Catch any remaining generic "VNEX WPC" alts
            new_content = re.sub(r'alt="VNEX WPC"', r'alt="VNEX WPC - Doors and Frames based in Hyderabad"', new_content, flags=re.IGNORECASE)
            
            if new_content != content:
                with open(file_path, "w", encoding="utf-8") as f:
                    f.write(new_content)
                print(f"Updated alt tags in {file_path}")

print("Alt tags optimization complete.")
