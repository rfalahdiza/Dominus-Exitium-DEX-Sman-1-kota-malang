document.addEventListener('DOMContentLoaded', function() {
    const mainNav = document.getElementById('mainNav');
    const header = document.querySelector('header'); // Dapatkan elemen header
    let headerHeight = header ? header.offsetHeight : 0; // Tinggi awal header

    // Update headerHeight on resize to ensure correct calculation
    window.addEventListener('resize', () => {
        headerHeight = header ? header.offsetHeight : 0;
        // Re-run scroll check in case resize changes scroll position relative to header
        handleScroll();
    });

    function handleScroll() {
        if (mainNav) {
            // Jika scrollY lebih besar dari tinggi header, nav akan menempel di atas
            // dan berubah warna/shadow
            if (window.scrollY > headerHeight - mainNav.offsetHeight) { // Kurangi tinggi nav agar transisi pas
                mainNav.classList.add('bg-blue-600', 'text-white', 'shadow-lg', 'fixed-top-nav'); // Tambahkan class baru
                mainNav.classList.remove('bg-white/80', 'text-gray-900', 'shadow-md', 'absolute'); // Hapus absolute
                // Pastikan logo dan teks sekolah juga berubah warna jika perlu
                const logoText = mainNav.querySelector('.bg-clip-text');
                if (logoText) {
                    logoText.classList.remove('from-blue-900', 'to-blue-600');
                    logoText.classList.add('from-white', 'to-gray-200'); // Contoh perubahan warna teks logo
                }
                mainNav.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('text-gray-900', 'hover:text-red-600', 'hover:bg-gray-100');
                    link.classList.add('text-white', 'hover:text-yellow-300', 'hover:bg-blue-700'); // Contoh perubahan warna link
                });
            } else {
                // Jika scrollY masih di dalam header, nav kembali ke posisi awal (absolute di dalam header)
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
        }
    }

    window.addEventListener('scroll', handleScroll);
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
});
