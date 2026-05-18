import fitz
import shutil
import os

brain = r"C:\Users\dheer\.gemini\antigravity\brain\8c19c40b-ad40-4af7-85e9-555d3735d41c"
dest = r"d:\nclient\vnex-wpc\images"

files = {
    "gallery_door_diagonal_walnut_1779113804529.png":   "gal-diagonal-walnut.png",
    "gallery_door_marble_circle_1779113830135.png":      "gal-marble-circle.png",
    "gallery_door_chevron_marble_1779113872098.png":     "gal-chevron-marble.png",
    "gallery_door_white_marble_panel_1779113910331.png": "gal-white-marble.png",
    "gallery_door_black_marble_teak_1779113946118.png":  "gal-black-marble-teak.png",
    "gallery_door_ornate_mandala_1779113977586.png":     "gal-ornate-mandala.png",
    "gallery_door_floral_geometric_1779114009605.png":   "gal-floral-geometric.png",
    "gallery_door_mirror_triangle_1779114045264.png":    "gal-mirror-triangle.png",
    "gallery_door_hourglass_panel_1779114086339.png":    "gal-hourglass-panel.png",
}

for src_name, dest_name in files.items():
    src_path = os.path.join(brain, src_name)
    dest_path = os.path.join(dest, dest_name)
    if os.path.exists(src_path):
        shutil.copy2(src_path, dest_path)
        print(f"Copied {src_name} -> {dest_name}")
    else:
        print(f"NOT FOUND: {src_path}")

print("Done!")
