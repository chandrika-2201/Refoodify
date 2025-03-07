document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.classList.add(`${currentTheme}-mode`);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('theme', 'dark');
            updateThemeIcon('dark');
        } else {
            body.classList.replace('dark-mode', 'light-mode');
            localStorage.setItem('theme', 'light');
            updateThemeIcon('light');
        
        }
    });

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Counter animation for impact stats
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const animateCounter = (counter) => {
        const target = +counter.dataset.target;
        let count = 0;
        const inc = target / speed;
        const updateCount = () => {
            if (count < target) {
                count += inc;
                counter.innerText = Math.floor(count);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    };

    // Trigger counter animation when the impact section is in view
    gsap.registerPlugin(ScrollTrigger);
    
    ScrollTrigger.create({
        trigger: "#impact",
        start: "top 80%",
        onEnter: () => counters.forEach(animateCounter)
    });

    // Animate sections on scroll
    gsap.utils.toArray('section').forEach(section => {
        // Skip the animation for removed sections
        if (section.id !== 'featured-partners' && section.id !== 'final-cta') {
            gsap.from(section, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                }
            });
        }
    });

    // Form submission handling
    const joinForm = document.getElementById('join-form');
    joinForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(joinForm);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch('/api/join', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                alert('Thank you for joining! Please log in to access your dashboard.');
                window.location.href = '/login.html';
            } else {
                throw new Error('Failed to submit form');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    });

    const newsletterForm = document.getElementById('newsletter-form');
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(newsletterForm);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('Thank you for subscribing to our newsletter!');
                newsletterForm.reset();
            } else {
                throw new Error('Failed to subscribe to newsletter');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    });

    // Add this function
    function initChatbot() {
        const toggle = document.getElementById('chatbot-toggle');
        const container = document.getElementById('chatbot-container');
        const form = document.getElementById('chatbot-form');
        const input = document.getElementById('chatbot-input');
        const messages = document.getElementById('chatbot-messages');

        toggle.addEventListener('click', () => {
            container.classList.toggle('hidden');
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const userMessage = input.value.trim();
            if (userMessage) {
                addMessage('user', userMessage);
                input.value = '';
                // Simulate bot response (replace with actual chatbot API in production)
                setTimeout(() => {
                    addMessage('bot', 'Thank you for your message. How can I assist you today?');
                }, 1000);
            }
        });

        function addMessage(sender, text) {
            const message = document.createElement('div');
            message.className = `message ${sender}`;
            message.textContent = text;
            messages.appendChild(message);
            messages.scrollTop = messages.scrollHeight;
        }
    }

    // Call this function in the DOMContentLoaded event listener
    initChatbot();
});
