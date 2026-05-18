import fitz  # PyMuPDF
import os
import json

pdf_path = "vnex-digital-catalogue.pdf"
output_dir = "catalog_extracted"
images_dir = os.path.join(output_dir, "images")

os.makedirs(output_dir, exist_ok=True)
os.makedirs(images_dir, exist_ok=True)

doc = fitz.open(pdf_path)

print(f"Total pages: {len(doc)}")
print(f"Title: {doc.metadata.get('title', 'N/A')}")
print(f"Author: {doc.metadata.get('author', 'N/A')}")
print("="*60)

all_text = []
page_data = []

for page_num in range(len(doc)):
    page = doc[page_num]
    text = page.get_text()
    
    all_text.append(f"\n\n=== PAGE {page_num + 1} ===\n{text}")
    
    # Extract images
    image_list = page.get_images(full=True)
    saved_images = []
    for img_index, img in enumerate(image_list):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        image_filename = f"page{page_num+1}_img{img_index+1}.{image_ext}"
        image_path = os.path.join(images_dir, image_filename)
        with open(image_path, "wb") as f:
            f.write(image_bytes)
        saved_images.append(image_filename)
    
    page_data.append({
        "page": page_num + 1,
        "text_preview": text[:500],
        "images": saved_images
    })
    
    if page_num < 5 or len(text.strip()) > 50:
        print(f"\n--- PAGE {page_num+1} ---")
        print(text[:800])

# Save full text
with open(os.path.join(output_dir, "full_text.txt"), "w", encoding="utf-8") as f:
    f.write("\n".join(all_text))

# Save page summary
with open(os.path.join(output_dir, "page_summary.json"), "w", encoding="utf-8") as f:
    json.dump(page_data, f, indent=2)

print(f"\n\nExtraction complete!")
print(f"Full text saved to {output_dir}/full_text.txt")
print(f"Images saved to {images_dir}/")
print(f"Total images extracted: {sum(len(p['images']) for p in page_data)}")
