import os
import re

files_to_update = [
    'index.html', 'about.html', 'contact.html', 'gallery.html', 'faq.html',
    'products/index.html', 'products/digital-doors.html',
    'products/texture-doors.html', 'products/frames.html', 'products/sheets.html'
]

html_block = '''
<div id="sticky-quote-bar">
  <a href="/contact.html" id="sticky-quote-btn">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
         viewBox="0 0 24 24" fill="none" stroke="#ffffff"
         stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07
      A19.5 19.5 0 014.69 12 19.79 19.79 0 011.61 3.41 2 2 0 013.6 
      1.24h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 
      2.11L7.91 8.83a16 16 0 006.29 6.29l.95-.95a2 2 0 012.11-.45 
      12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
    </svg>
    Get a Free Quote
  </a>
</div>

<style>
  #sticky-quote-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    background: #C85A2A;
    padding: 12px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 -2px 16px rgba(0, 0, 0, 0.15);
  }

  #sticky-quote-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #ffffff;
    font-size: 15px;
    font-weight: 500;
    text-decoration: none;
    letter-spacing: 0.01em;
  }

  /* push page content up so footer isn't hidden behind the bar */
  body {
    padding-bottom: 58px;
  }

  /* On contact.html only — hide the bar since user is already there */
  body.on-contact-page #sticky-quote-bar {
    display: none;
  }
  body.on-contact-page {
    padding-bottom: 0;
  }

  /* Desktop — make the bar slimmer and less intrusive */
  @media (min-width: 769px) {
    #sticky-quote-bar {
      padding: 10px 20px;
    }
    #sticky-quote-btn {
      font-size: 14px;
    }
  }

  @media (max-width: 768px) {
    #wa-float { bottom: 72px; }
  }
  @media (min-width: 769px) {
    #wa-float { bottom: 72px; }
  }
</style>
'''

for file in files_to_update:
    if os.path.exists(file):
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()

        if 'id="sticky-quote-bar"' not in content:
            # Replace </body> with block + </body>
            content = re.sub(r'</body>', html_block + '\\n</body>', content, flags=re.IGNORECASE)

            if file == 'contact.html':
                content = re.sub(r'<body([^>]*)>', r'<body\\1 class="on-contact-page">', content, count=1, flags=re.IGNORECASE)
                # Cleanup if there were already classes (though here there isn't, but robust)
                content = re.sub(r'class="([^"]*)\s*class="([^"]*)"', r'class="\1 \2"', content)

            with open(file, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f'Updated {file}')
        else:
            print(f'{file} already has sticky bar')
    else:
        print(f'{file} not found')

