document.addEventListener('DOMContentLoaded', function() {
    // 1. Navbar Scroll Effect
    const mainNav = document.getElementById('mainNav');
    if (mainNav) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                mainNav.classList.add('bg-red-600', 'text-white', 'shadow-lg');
                mainNav.classList.remove('bg-white/80', 'text-gray-900', 'shadow-md');
            } else {
                mainNav.classList.remove('bg-red-600', 'text-white', 'shadow-lg');
                mainNav.classList.add('bg-white/80', 'text-gray-900', 'shadow-md');
            }
        });
    }

    // 2. Auto-sliding Banner (Hero Slider)
    const heroSlider = document.getElementById('heroSlider');
    if (heroSlider) {
        const slides = heroSlider.children;
        let currentSlide = 0;
        const slideIntervalTime = 3000; // 3 seconds

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            heroSlider.scrollTo({
                left: currentSlide * heroSlider.offsetWidth, // Use offsetWidth for accurate scroll
                behavior: 'smooth'
            });
        }

        // Auto-advance every 3 seconds
        setInterval(nextSlide, slideIntervalTime);

        // Optional: Pause on hover
        heroSlider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        heroSlider.addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, slideIntervalTime));
    }

    // 3. Smooth Scroll for Anchor Links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    for (const link of anchorLinks) {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor jump
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
                
            if (targetElement) {
                // Calculate offset for fixed header if needed
                const headerOffset = mainNav ? mainNav.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20; // Add extra padding

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // 4. Search Functionality
    const searchForm = document.querySelector('form[role="search"]'); // Target by role for better specificity
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('#search-input'); // Get input by ID
            const query = searchInput.value.trim();

            if (query) {
                alert("Fitur pencarian belum aktif. Anda mencari: " + query);
                // For actual search, uncomment the line below and implement backend:
                // window.location.href = "/search?q=" + encodeURIComponent(query);
            } else {
                alert("Silakan masukkan kata kunci pencarian.");
            }
            searchInput.value = ''; // Clear search input after submission
        });
    }

    // 5. Dynamic Year in Footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 6. Mobile Menu Toggle (Placeholder - requires HTML for mobile menu)
    const mobileMenuButton = document.querySelector('nav button.md\\:hidden');
    // You would need a mobile menu div with an ID like 'mobileMenu'
    // const mobileMenu = document.getElementById('mobileMenu'); 

    if (mobileMenuButton /* && mobileMenu */) {
        mobileMenuButton.addEventListener('click', function() {
            alert("Fitur menu mobile belum diimplementasikan sepenuhnya. Anda perlu menambahkan struktur HTML untuk menu mobile.");
            // Example:
            // mobileMenu.classList.toggle('hidden'); // Toggle visibility
            // this.setAttribute('aria-expanded', mobileMenu.classList.contains('hidden') ? 'false' : 'true');
        });
    }
    
    // 7. Megamenu Toggle (behaves like a notification dropdown)
    const megaTrigger = document.getElementById('megamenu-trigger');
    const megaPanel = document.getElementById('megamenu-panel');
    if (megaTrigger && megaPanel) {
        function setPosition() {
            const rect = megaTrigger.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const pageX = rect.left;
            const desiredLeft = Math.min(pageX, Math.max(8, viewportWidth - megaPanel.offsetWidth - 8));
            const top = rect.bottom + 8; // 8px gap like notification
            megaPanel.style.left = desiredLeft + 'px';
            megaPanel.style.top = top + 'px';
            // place arrow near trigger's left + 24px, but keep inside panel
            const arrow = megaPanel.querySelector('.megamenu-arrow');
            if (arrow) {
                const triggerCenter = rect.left + rect.width/2;
                const panelLeft = desiredLeft;
                let arrowLeft = triggerCenter - panelLeft - 6; // center arrow (minus half arrow size)
                arrowLeft = Math.max(12, Math.min(arrowLeft, megaPanel.offsetWidth - 24));
                arrow.style.left = arrowLeft + 'px';
                arrow.style.top = '-6px';
            }
        }
        function closeMega() {
            megaPanel.classList.add('hidden');
            megaPanel.classList.remove('open');
            megaTrigger.setAttribute('aria-expanded', 'false');
        }
        function openMega() {
            // ensure proper width before positioning
            if (!megaPanel.style.width) {
                megaPanel.style.width = 'min(64rem, 90vw)'; // max-w-4xl approx
            }
            megaPanel.classList.remove('hidden');
            megaPanel.classList.add('open');
            setPosition();
            megaTrigger.setAttribute('aria-expanded', 'true');
        }
        megaTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            if (megaPanel.classList.contains('hidden')) {
                openMega();
            } else {
                closeMega();
            }
        });
        // Reposition on resize/scroll
        window.addEventListener('resize', () => megaPanel.classList.contains('open') && setPosition());
        window.addEventListener('scroll', () => megaPanel.classList.contains('open') ? setPosition() : null, {"passive": true});
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!megaPanel.contains(e.target) && e.target !== megaTrigger) {
                closeMega();
            }
        });
        // Close on ESC
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMega(); });
    }


});
