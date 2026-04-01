const fs = require('fs');

let indexContent = fs.readFileSync('index.html', 'utf8');

const regex = /<!-- ===================== ABOUT PREVIEW ===================== -->[\s\S]*?<\/section>/;

const newContent = `<!-- ===================== ABOUT PREVIEW ===================== -->
  <section class="section-pad relative overflow-hidden bg-white">
    <!-- Subtle background gradient for modern corporate style -->
    <div class="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-gray-50 to-transparent z-0"></div>
    <div class="container relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <!-- Text Content (Left) -->
        <div class="lg:col-span-6 order-2 lg:order-1 reveal text-left">
          <div class="flex items-center gap-3 mb-4">
            <div class="h-[3px] w-8 bg-[#C85A2A] opacity-80 rounded-full"></div>
            <span class="text-sm font-bold tracking-widest text-[#1C2331] opacity-60 uppercase">About VNEX</span>
          </div>
          <h2 class="text-4xl md:text-5xl font-black text-[#1C2331] leading-tight mb-6" style="font-family: 'Playfair Display', serif;">
            Crafting Quality. <br/> Building Trust.
          </h2>
          <p class="text-lg text-gray-500 font-medium leading-relaxed mb-6">
            Founded with a clear purpose — to revolutionise India's construction and interior industry by replacing traditional wood with superior Wood Polymer Composite solutions. VNEX WPC has spent over a decade engineering products that outlast, outperform, and out-beautify conventional alternatives.
          </p>
          <p class="text-[0.95rem] text-gray-600 leading-relaxed mb-8 border-l-[3px] border-[#C85A2A] pl-5 italic opacity-90">
            "Our doors, frames, and sheets are crafted using cutting-edge German extrusion technology, ensuring they withstand the test of time while blending seamlessly into modern spaces."
          </p>
          
          <div class="flex flex-col sm:flex-row gap-6 mb-10">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-[14px] bg-gray-50 border border-gray-100 flex items-center justify-center text-xl shadow-sm shrink-0">🎯</div>
              <div>
                <h4 class="font-bold text-[#1C2331] mb-1 text-lg" style="font-family: 'Playfair Display', serif;">Our Mission</h4>
                <p class="text-sm text-gray-500">Durable, eco-friendly building solutions.</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-[14px] bg-gray-50 border border-gray-100 flex items-center justify-center text-xl shadow-sm shrink-0">🔭</div>
              <div>
                <h4 class="font-bold text-[#1C2331] mb-1 text-lg" style="font-family: 'Playfair Display', serif;">Our Vision</h4>
                <p class="text-sm text-gray-500">India's most trusted WPC brand.</p>
              </div>
            </div>
          </div>
          <a href="about.html" class="inline-flex items-center justify-center px-8 py-[14px] bg-[#1C2331] text-white font-semibold rounded-xl shadow-2xl shadow-[#1C2331]/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            Learn More About Us
            <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </a>
        </div>

        <!-- Image Content (Right fixed) -->
        <div class="lg:col-span-6 order-1 lg:order-2 reveal relative">
          <div class="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-gray-200/60 h-[380px] lg:h-[550px] border-[6px] border-white">
            <img src="images/about-factory.webp" alt="VNEX WPC Manufacturing Facility" class="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" />
            <div class="placeholder-img absolute inset-0 flex items-center justify-center text-5xl" style="display:none;background:var(--accent);">🏭</div>
            <!-- Sleek Established Badge -->
            <div class="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-5 py-[14px] rounded-2xl shadow-xl flex flex-col border border-white/60">
              <span class="text-[0.65rem] font-bold text-gray-500 tracking-widest uppercase mb-0.5">Established</span>
              <span class="text-[1.7rem] font-black text-[#1C2331] leading-none" style="font-family: 'Playfair Display', serif;">2013</span>
            </div>
          </div>
          
          <!-- Decorative abstract elements -->
          <div class="absolute -top-6 -right-6 w-32 h-32 bg-[#C85A2A]/10 rounded-full blur-[40px] -z-10"></div>
          <div class="absolute -bottom-10 -left-10 w-48 h-48 bg-[#1C2331]/5 rounded-full blur-[50px] -z-10"></div>
        </div>
      </div>
    </div>
  </section>`;

indexContent = indexContent.replace(regex, newContent);
fs.writeFileSync('index.html', indexContent, 'utf8');

let aboutContent = fs.readFileSync('about.html', 'utf8');
const regexAbout = /<!-- ===================== OUR STORY ===================== -->[\s\S]*?<\/section>/;

const newAbout = `<!-- ===================== OUR STORY ===================== -->
  <section class="section-pad relative overflow-hidden bg-white">
    <!-- Subtle background gradient for modern corporate style -->
    <div class="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-gray-50 to-transparent z-0"></div>
    <div class="container relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <!-- Text Content (Left) -->
        <div class="lg:col-span-6 order-2 lg:order-1 reveal text-left">
          <div class="flex items-center gap-3 mb-4">
            <div class="h-[3px] w-8 bg-[#C85A2A] opacity-80 rounded-full"></div>
            <span class="text-sm font-bold tracking-widest text-[#1C2331] opacity-60 uppercase">Our Story</span>
          </div>
          <h2 class="text-4xl md:text-5xl font-black text-[#1C2331] leading-tight mb-6" style="font-family: 'Playfair Display', serif;">
            Built from a Vision to <br/>Transform India's Interiors
          </h2>
          <p class="text-lg text-gray-500 font-medium leading-relaxed mb-6">
            At VNEX WPC, we believe that quality should never be compromised for style. Founded by a team of passionate innovators, VNEX WPC specialises in creating cutting-edge WPC digital doors, frames, and sheets that blend modern aesthetics with unmatched durability.
          </p>
          <p class="text-[0.95rem] text-gray-600 leading-relaxed mb-8">
            Driven by a commitment to sustainability and innovation, we harness advanced technology to produce our WPC products. Each door and frame is crafted with precision using rotogravure printing and UV coating, ensuring they withstand the test of time while exuding contemporary charm that complements any interior.
          </p>
          
          <div class="flex flex-wrap gap-8 mb-10">
            <div class="text-left">
              <div class="text-3xl font-black text-[#C85A2A] mb-1" style="font-family: 'Playfair Display', serif;">500+</div>
              <p class="text-xs font-semibold text-gray-500 uppercase tracking-widest">Happy Clients</p>
            </div>
            <div class="text-left">
              <div class="text-3xl font-black text-[#C85A2A] mb-1" style="font-family: 'Playfair Display', serif;">1000+</div>
              <p class="text-xs font-semibold text-gray-500 uppercase tracking-widest">Projects Done</p>
            </div>
            <div class="text-left">
              <div class="text-3xl font-black text-[#C85A2A] mb-1" style="font-family: 'Playfair Display', serif;">10+</div>
              <p class="text-xs font-semibold text-gray-500 uppercase tracking-widest">Years Innovating</p>
            </div>
          </div>
        </div>

        <!-- Image Content (Right fixed) -->
        <div class="lg:col-span-6 order-1 lg:order-2 reveal relative">
          <div class="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-gray-200/60 h-[380px] lg:h-[550px] border-[6px] border-white">
            <img src="images/about-factory.webp" alt="VNEX WPC Manufacturing Facility" class="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" />
            <div class="placeholder-img absolute inset-0 flex items-center justify-center text-5xl" style="display:none;background:var(--accent);">🏭</div>
            <!-- Sleek Established Badge -->
            <div class="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-5 py-[14px] rounded-2xl shadow-xl flex flex-col border border-white/60">
              <span class="text-[0.65rem] font-bold text-gray-500 tracking-widest uppercase mb-0.5">Established</span>
              <span class="text-[1.7rem] font-black text-[#1C2331] leading-none" style="font-family: 'Playfair Display', serif;">2013</span>
            </div>
          </div>
          
          <!-- Decorative abstract elements -->
          <div class="absolute -top-6 -right-6 w-32 h-32 bg-[#C85A2A]/10 rounded-full blur-[40px] -z-10"></div>
          <div class="absolute -bottom-10 -left-10 w-48 h-48 bg-[#1C2331]/5 rounded-full blur-[50px] -z-10"></div>
        </div>
      </div>
    </div>
  </section>`;

aboutContent = aboutContent.replace(regexAbout, newAbout);
fs.writeFileSync('about.html', aboutContent, 'utf8');

console.log("Successfully overhauled About sections.");
