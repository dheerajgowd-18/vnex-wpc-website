# VNEX WPC Premium Website

A modern, high-performance static business website built for VNEX WPC, a leading provider of Wood Polymer Composite solutions in India. 

## 🚀 Live Preview
*(Replace this section with your live deployment URL once hosted on Netlify, Vercel, or GitHub Pages)*

## 💡 Tech Stack
- **Structure:** Pure HTML5
- **Styling:** Tailwind CSS (via CDN) & Custom Vanilla CSS (`style.css`)
- **Interactivity:** Vanilla JavaScript (`main.js`)
- **Typography:** Google Fonts (Playfair Display & DM Sans)
- **Zero Build Tools:** Completely ready-to-deploy static files with zero build processes required.

## 📁 Project Structure

```text
vnex-wpc/
├── index.html                 # Homepage showcasing products and stats
├── about.html                 # Company mission, vision, and history
├── gallery.html               # Masonry image gallery with filtering
├── contact.html               # Formspree contact form & map
├── faq.html                   # Frequently Asked Questions accordion
├── products/                  # Sub-directory for specific category pages
│   ├── index.html             # All products overview
│   ├── digital-doors.html     # Deep dive into digital WPC doors
│   ├── texture-doors.html     # Deep dive into textured WPC doors
│   ├── frames.html            # Deep dive into WPC frames
│   └── sheets.html            # Deep dive into WPC sheets
├── css/
│   └── style.css              # Custom styling & dynamic interaction CSS 
└── js/
    └── main.js                # Core interactivity (mobile menu, scrolling, gallery filters)
```

## 🛠 Features Included
- **Responsive Navbar with Smart Scrolling:** Features dynamic sticky behavior and an accessible mobile hamburger menu.
- **Dynamic Content Features:** Auto-playing client testimonial carousel, count-up stat animations, scroll-reveal fade-ins, and interactive FAQ accordions.
- **Masonry Gallery:** Filterable grid layout for project showroom imagery.
- **Clean Forms:** Fully functional contact form validation ready for a Formspree endpoint placeholder replacement.
- **Design System:** Engineered around a custom `--bg`, `--text-dark`, and `--accent` CSS variable foundation designed to elegantly match the brand's exact burnt orange and navy-blue identities.

## 🔧 Installation & Running Locally
Since this project does not use a bundler, simply open `index.html` in your browser to view the site. Alternatively, if you want a local development server with live-reloading, run:

```bash
npx serve . -p 3000
```
Then visit `http://localhost:3000`.

## 📦 Deployment
This website is 100% plug-and-play for immediate deployment. 
1. Drag and drop the `vnex-wpc/` folder into Netlify Drop, or 
2. Push to a GitHub repository and deploy via Vercel/GitHub Pages.

---
*Developed as a premium digital storefront for VNEX WPC.*
