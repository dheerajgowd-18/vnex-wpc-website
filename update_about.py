import re

file_path = r"d:\nclient\vnex-wpc\about.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Opening paragraph
content = re.sub(
    r'VNEX WPC was established with a clear mission',
    r'Based in Hyderabad, VNEX WPC was established with a clear mission',
    content, count=1
)

# 2. WPC vs Wood section injection
comparison_html = """
  <!-- ===================== WPC VS WOOD ===================== -->
  <section class="section-pad" style="background: white;">
    <div class="container">
      <div class="text-center reveal" style="margin-bottom: 56px;">
        <span class="section-label">THE VNEX ADVANTAGE</span>
        <h2 class="section-title">WPC vs. Traditional Wood</h2>
        <div class="section-divider centered"></div>
      </div>
      <div class="flex flex-col md:flex-row gap-8">
        <!-- WPC -->
        <div class="reveal" style="flex:1; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: var(--radius); padding: 40px;">
          <h3 style="color: var(--primary); font-size: 1.5rem; margin-bottom: 20px; display:flex; align-items:center; gap:10px;">
            <span style="color: var(--accent);">✔</span> VNEX WPC Doors
          </h3>
          <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:15px; color:#4B5563;">
            <li><strong>100% Waterproof:</strong> Ideal for all moisture-heavy environments.</li>
            <li><strong>Termite-Proof:</strong> Synthetic core prevents borer and termite attacks completely.</li>
            <li><strong>Zero Maintenance:</strong> Requires no painting, varnishing, or regular polishing.</li>
            <li><strong>No Warping:</strong> Retains its shape perfectly through all seasons and monsoons.</li>
          </ul>
        </div>
        <!-- Wood -->
        <div class="reveal reveal-delay-1" style="flex:1; background: #FEF2F2; border: 1px solid #FCA5A5; border-radius: var(--radius); padding: 40px;">
          <h3 style="color: #991B1B; font-size: 1.5rem; margin-bottom: 20px; display:flex; align-items:center; gap:10px;">
            <span style="color: #EF4444;">✖</span> Traditional Wood
          </h3>
          <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:15px; color:#7F1D1D;">
            <li><strong>Water Sensitive:</strong> Absorbs water and rots over time.</li>
            <li><strong>Vulnerable to Termites:</strong> Requires expensive chemical treatments.</li>
            <li><strong>High Maintenance:</strong> Needs costly painting and varnishing every few years.</li>
            <li><strong>Prone to Warping:</strong> Swells in monsoon, causing doors to stick.</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
"""

# Inject after the Mission & Vision section (before the team section or footer)
# Let's find "<!-- ===================== FOOTER" and inject just before it.
content = re.sub(
    r'(<!-- ===================== FOOTER)',
    f'{comparison_html}\n  \\1',
    content, count=1
)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("about.html updated successfully.")
