

        // 1. Theme Toggler Logic
        const html = document.documentElement;
        const themeIcon = document.getElementById('themeIcon');
        const sunPath = "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z";
        const moonPath = "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z";

        function toggleTheme() {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateIcon(newTheme);
        }

        function updateIcon(theme) {
            // Simple path switching for the SVG
            if (theme === 'dark') {
                themeIcon.innerHTML = `<path d="${sunPath}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />`;
            } else {
                themeIcon.innerHTML = `<path d="${moonPath}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />`;
            }
        }

        // Initialize Theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        html.setAttribute('data-theme', savedTheme);
        updateIcon(savedTheme);


        // 2. Mobile Menu Logic
        const navMenu = document.getElementById('navMenu');
        
        function toggleMenu() {
            // Only toggle class if screen is small
            if (window.innerWidth <= 768) {
                navMenu.classList.toggle('active');
            }
        }


        // 3. Typewriter Effect
        const textElement = document.getElementById('typewriter');
        const phrases = ["Web Applications.", "Database Systems.", "Java Projects.", "Business Solutions."];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                textElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                textElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                setTimeout(type, 2000); // Pause at end of word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(type, 500); // Pause before new word
            } else {
                setTimeout(type, isDeleting ? 100 : 200); // Typing speed
            }
        }

        // Start typing when page loads
        document.addEventListener('DOMContentLoaded', type);


        // 4. Form Submit Logic (Sends to your Email)
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('button');
            const originalText = btn.textContent;
            
            btn.textContent = 'Sending...';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            // Collect form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            
            fetch("https://formsubmit.co/ajax/87080e5da41cb847c854acfc248b0536", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                alert('Thank you! Your message has been sent successfully.');
                this.reset();
            })
            .catch(error => {
                alert('Oops! Something went wrong. Please try again.');
                console.error('Error:', error);
            })
            .finally(() => {
                btn.textContent = originalText;
                btn.style.opacity = '1';
                btn.disabled = false;
            });
        });
