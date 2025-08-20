// MultipleFiles/script.js

document.addEventListener('DOMContentLoaded', function() {
    const mainNav = document.getElementById('mainNav');
    const header = document.querySelector('header');
    let headerHeight = header ? header.offsetHeight : 0;

    // Perbaikan: Set --nav-height CSS variable dynamically
    function setNavHeightProperty() {
        if (mainNav) {
            document.documentElement.style.setProperty('--nav-height', `${mainNav.offsetHeight}px`);
        }
    }

    window.addEventListener('resize', () => {
        headerHeight = header ? header.offsetHeight : 0;
        setNavHeightProperty(); // Update nav height on resize
        handleScroll();
    });

    function handleScroll() {
        if (mainNav) {
            // Perbaikan: searchInput dan searchButton tidak perlu di querySelector setiap scroll
            // const searchInput = mainNav.querySelector('#search-input');
            // const searchButton = mainNav.querySelector('.search-form-compact button');

            if (window.scrollY > headerHeight - mainNav.offsetHeight) {
                mainNav.classList.add('bg-blue-600', 'text-white', 'shadow-lg', 'fixed-top-nav');
                mainNav.classList.remove('bg-white/80', 'text-gray-900', 'shadow-md', 'absolute');

                const logoText = mainNav.querySelector('.bg-clip-text');
                if (logoText) {
                    logoText.classList.remove('from-blue-900', 'to-blue-600');
                    logoText.classList.add('from-white', 'to-gray-200');
                }
                mainNav.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('text-gray-900', 'hover:text-red-600', 'hover:bg-gray-100');
                    link.classList.add('text-white', 'hover:text-yellow-300', 'hover:bg-blue-700');
                });

            } else {
                mainNav.classList.remove('bg-blue-600', 'text-white', 'shadow-lg', 'fixed-top-nav');
                mainNav.classList.add('bg-white/80', 'text-gray-900', 'shadow-md', 'absolute');

                const logoText = mainNav.querySelector('.bg-clip-text');
                if (logoText) {
                    logoText.classList.remove('from-white', 'to-gray-200');
                    logoText.classList.add('from-blue-900', 'to-blue-600');
                }
                mainNav.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('text-white', 'hover:text-yellow-300', 'hover:bg-blue-700');
                    link.classList.add('text-gray-900', 'hover:text-red-600', 'hover:bg-gray-100');
                });
            }

            // Panggil updateSearchFormColors agar warna search input & button selalu konsisten
            if (typeof updateSearchFormColors === 'function') {
                updateSearchFormColors();
            }
            // Ubah warna icon search sesuai state navbar
            const searchIcon = document.getElementById('search-icon-trigger');
            if (searchIcon) {
                if (mainNav.classList.contains('fixed-top-nav')) {
                    searchIcon.classList.remove('text-gray-900', 'hover:text-blue-600');
                    searchIcon.classList.add('text-white', 'hover:text-yellow-300');
                } else {
                    searchIcon.classList.remove('text-white', 'hover:text-yellow-300');
                    searchIcon.classList.add('text-gray-900', 'hover:text-blue-600');
    }
}
        }
    }

    window.addEventListener('scroll', handleScroll);
    setNavHeightProperty(); // Panggil sekali saat DOMContentLoaded untuk mengatur --nav-height
    handleScroll(); // Panggil sekali saat DOMContentLoaded untuk mengatur posisi awal

    // 2. Auto-sliding Banner (Hero Slider)
    const heroSlider = document.getElementById('heroSlider');
    if (heroSlider) {
        const slides = heroSlider.children;
        let currentSlide = 0;
        const slideIntervalTime = 3000; // 3 seconds
        let slideInterval; // Declare slideInterval here

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            heroSlider.scrollTo({
                left: currentSlide * heroSlider.offsetWidth, // Use offsetWidth for accurate scroll
                behavior: 'smooth'
            });
        }

        // Auto-advance every 3 seconds
        slideInterval = setInterval(nextSlide, slideIntervalTime); // Assign to slideInterval

        // Optional: Pause on hover
        heroSlider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        heroSlider.addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, slideIntervalTime));
    }

    // 3. Smooth Scroll for Anchor Links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            // Pastikan bukan hanya '#' dan elemen target ada
            if (targetId && targetId !== '#' && document.querySelector(targetId)) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                const headerOffset = mainNav ? mainNav.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20; // Add extra padding

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Search Functionality
    const searchIconTrigger = document.getElementById('search-icon-trigger');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    if (searchIconTrigger && searchForm && searchInput) {
        // Function to close the search form
        function closeSearchForm() {
            searchForm.classList.add('hidden');
            searchIconTrigger.setAttribute('aria-expanded', 'false');
        }

        // Function to open the search form
        function openSearchForm() {
            searchForm.classList.remove('hidden');
            searchIconTrigger.setAttribute('aria-expanded', 'true');
            searchInput.focus(); // Focus on the input field when opened
        }

        searchIconTrigger.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent click from propagating to document
            if (searchForm.classList.contains('hidden')) {
                openSearchForm();
            } else {
                closeSearchForm();
            }
        });

        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = searchInput.value.trim();

            if (query) {
                alert("Fitur pencarian belum aktif. Anda mencari: " + query);
                // For actual search, uncomment the line below and implement backend:
                // window.location.href = "/search?q=" + encodeURIComponent(query);
            } else {
                alert("Silakan masukkan kata kunci pencarian.");
            }
            searchInput.value = ''; // Clear search input after submission
            closeSearchForm(); // Close the form after submission
        });

        // Close search form when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchForm.contains(e.target) && e.target !== searchIconTrigger) {
                closeSearchForm();
            }
        });

        // Close search form on ESC key press
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !searchForm.classList.contains('hidden')) {
                closeSearchForm();
            }
        });

        // Handle search input/button colors based on fixed nav state
        // This part needs to be integrated with the handleScroll function
        // or called whenever the fixed-top-nav class is toggled.
        // For simplicity, I'll add a function that can be called.
        function updateSearchFormColors() {
            const isFixed = mainNav.classList.contains('fixed-top-nav');
            const searchButton = searchForm.querySelector('button'); // Query button here

            if (isFixed) {
                searchInput.classList.remove('bg-white', 'text-gray-800', 'placeholder-gray-400', 'border-gray-300', 'focus:ring-red-500');
                searchInput.classList.add('bg-transparent', 'text-white', 'placeholder-gray-200', 'border-white', 'focus:ring-yellow-300');
                if (searchButton) { // Check if button exists
                    searchButton.classList.remove('bg-red-600', 'text-white', 'hover:text-red-500', 'focus:ring-red-500');
                    searchButton.classList.add('bg-yellow-400', 'text-gray-900', 'hover:bg-yellow-300', 'focus:ring-yellow-300');
                }
            } else {
                searchInput.classList.remove('bg-transparent', 'text-white', 'placeholder-gray-200', 'border-white', 'focus:ring-yellow-300');
                searchInput.classList.add('bg-white', 'text-gray-800', 'placeholder-gray-400', 'border-gray-300', 'focus:ring-red-500');
                if (searchButton) { // Check if button exists
                    searchButton.classList.remove('bg-yellow-400', 'text-gray-900', 'hover:bg-yellow-300', 'focus:ring-yellow-300');
                    searchButton.classList.add('bg-red-600', 'text-white', 'hover:text-red-500', 'focus:ring-red-500');
                }
            }
        }

        // Call this function initially and whenever fixed-top-nav changes
        // We need to modify handleScroll to call this.
        // For now, let's call it once on load.
        updateSearchFormColors();
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

    // Function to close all megamenus
    function closeAllMegamenus() {
        const openMegamenus = document.querySelectorAll('.megamenu-panel.open');
        openMegamenus.forEach(panel => {
            panel.classList.add('hidden');
            panel.classList.remove('open');
            const trigger = document.querySelector(`[aria-controls="${panel.id}"]`);
            if (trigger) {
                trigger.setAttribute('aria-expanded', 'false');
            }
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
            closeAllMegamenus(); // Close other megamenus before opening this one
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

    // 8. Megamenu Toggle for "Kegiatan"
    const megaKegiatanTrigger = document.getElementById('megamenu-kegiatan-trigger');
    const megaKegiatanPanel = document.getElementById('megamenu-kegiatan-panel');
    if (megaKegiatanTrigger && megaKegiatanPanel) {
        function setKegiatanPosition() {
            const rect = megaKegiatanTrigger.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const pageX = rect.left;
            // Hapus atau komentari baris ini agar lebar diatur oleh CSS (width: auto)
            // const desiredLeft = Math.min(pageX, Math.max(8, viewportWidth - megaKegiatanPanel.offsetWidth - 8));
            // const top = rect.bottom + 8; // 8px gap like notification
            // megaKegiatanPanel.style.left = desiredLeft + 'px';
            // megaKegiatanPanel.style.top = top + 'px';

            // Biarkan posisi kiri dan atas dihitung secara dinamis tanpa memaksakan lebar
            const panelWidth = megaKegiatanPanel.offsetWidth; // Dapatkan lebar panel setelah diatur oleh CSS
            const desiredLeft = Math.min(pageX, Math.max(8, viewportWidth - panelWidth - 8));
            const top = rect.bottom + 8; // 8px gap like notification
            megaKegiatanPanel.style.left = desiredLeft + 'px';
            megaKegiatanPanel.style.top = top + 'px';


            // place arrow near trigger's left + 24px, but keep inside panel
            const arrow = megaKegiatanPanel.querySelector('.megamenu-arrow');
            if (arrow) {
                const triggerCenter = rect.left + rect.width/2;
                const panelLeft = desiredLeft;
                let arrowLeft = triggerCenter - panelLeft - 6; // center arrow (minus half arrow size)
                arrowLeft = Math.max(12, Math.min(arrowLeft, megaKegiatanPanel.offsetWidth - 24));
                arrow.style.left = arrowLeft + 'px';
                arrow.style.top = '-6px';
            }
        }
        function closeMegaKegiatan() {
            megaKegiatanPanel.classList.add('hidden');
            megaKegiatanPanel.classList.remove('open');
            megaKegiatanTrigger.setAttribute('aria-expanded', 'false');
        }
        function openMegaKegiatan() {
            closeAllMegamenus(); // Close other megamenus before opening this one
            // Hapus atau komentari bagian ini agar lebar tidak dipaksa oleh JS
            // if (!megaKegiatanPanel.style.width) {
            //     megaKegiatanPanel.style.width = 'min(64rem, 90vw)'; // max-w-4xl approx
            // }
            megaKegiatanPanel.classList.remove('hidden');
            megaKegiatanPanel.classList.add('open');
            setKegiatanPosition();
            megaKegiatanTrigger.setAttribute('aria-expanded', 'true');
        }
        megaKegiatanTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            if (megaKegiatanPanel.classList.contains('hidden')) {
                openMegaKegiatan();
            } else {
                closeMegaKegiatan();
            }
        });
        // Reposition on resize/scroll
        window.addEventListener('resize', () => megaKegiatanPanel.classList.contains('open') && setKegiatanPosition());
        window.addEventListener('scroll', () => megaKegiatanPanel.classList.contains('open') ? setKegiatanPosition() : null, {"passive": true});
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!megaKegiatanPanel.contains(e.target) && e.target !== megaKegiatanTrigger) {
                closeMegaKegiatan();
            }
        });
        // Close on ESC
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMegaKegiatan(); });
    }

    // 9. Megamenu Toggle for "Budaya Positif" (NEW CODE)
    const megaBudayaPositifTrigger = document.getElementById('megamenu-budaya-positif-trigger');
    const megaBudayaPositifPanel = document.getElementById('megamenu-budaya-positif-panel');
    if (megaBudayaPositifTrigger && megaBudayaPositifPanel) {
        function setBudayaPositifPosition() {
            const rect = megaBudayaPositifTrigger.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const pageX = rect.left;
            const panelWidth = megaBudayaPositifPanel.offsetWidth;
            const desiredLeft = Math.min(pageX, Math.max(8, viewportWidth - panelWidth - 8));
            const top = rect.bottom + 8;
            megaBudayaPositifPanel.style.left = desiredLeft + 'px';
            megaBudayaPositifPanel.style.top = top + 'px';

            const arrow = megaBudayaPositifPanel.querySelector('.megamenu-arrow');
            if (arrow) {
                const triggerCenter = rect.left + rect.width/2;
                const panelLeft = desiredLeft;
                let arrowLeft = triggerCenter - panelLeft - 6;
                arrowLeft = Math.max(12, Math.min(arrowLeft, megaBudayaPositifPanel.offsetWidth - 24));
                arrow.style.left = arrowLeft + 'px';
                arrow.style.top = '-6px';
            }
        }
        function closeMegaBudayaPositif() {
            megaBudayaPositifPanel.classList.add('hidden');
            megaBudayaPositifPanel.classList.remove('open');
            megaBudayaPositifTrigger.setAttribute('aria-expanded', 'false');
        }
        function openMegaBudayaPositif() {
            closeAllMegamenus(); // Close other megamenus before opening this one
            megaBudayaPositifPanel.classList.remove('hidden');
            megaBudayaPositifPanel.classList.add('open');
            setBudayaPositifPosition();
            megaBudayaPositifTrigger.setAttribute('aria-expanded', 'true');
        }
        megaBudayaPositifTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            if (megaBudayaPositifPanel.classList.contains('hidden')) {
                openMegaBudayaPositif();
            } else {
                closeMegaBudayaPositif();
            }
        });
        window.addEventListener('resize', () => megaBudayaPositifPanel.classList.contains('open') && setBudayaPositifPosition());
        window.addEventListener('scroll', () => megaBudayaPositifPanel.classList.contains('open') ? setBudayaPositifPosition() : null, {"passive": true});
        document.addEventListener('click', (e) => {
            if (!megaBudayaPositifPanel.contains(e.target) && e.target !== megaBudayaPositifTrigger) {
                closeMegaBudayaPositif();
            }
        });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMegaBudayaPositif(); });
    }
});


