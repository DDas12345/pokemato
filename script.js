// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Simple animation trigger for cards
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.category-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Modal Logic
const authModal = document.getElementById('authModal');
const closeModal = document.getElementById('closeModal');
const signinBtns = document.querySelectorAll('.btn-signin');
const signupBtns = document.querySelectorAll('.btn-signup');
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');
const toSignup = document.getElementById('toSignup');
const toSignin = document.getElementById('toSignin');

const openModal = (tab = 'signin') => {
    authModal.classList.add('active');
    switchTab(tab);
};

const switchTab = (tab) => {
    authTabs.forEach(t => {
        t.classList.toggle('active', t.dataset.tab === tab);
    });
    authForms.forEach(f => {
        f.classList.toggle('active', f.id === `${tab}Form`);
    });
};

signinBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        openModal('signin');
        navLinks.classList.remove('active'); // Close mobile menu if open
    });
});

signupBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        openModal('signup');
        navLinks.classList.remove('active'); // Close mobile menu if open
    });
});

closeModal.addEventListener('click', () => {
    authModal.classList.remove('active');
});

authModal.addEventListener('click', (e) => {
    if (e.target === authModal) {
        authModal.classList.remove('active');
    }
});

authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        switchTab(tab.dataset.tab);
    });
});

toSignup.addEventListener('click', () => switchTab('signup'));
toSignin.addEventListener('click', () => switchTab('signin'));

// Handle form submissions
document.querySelectorAll('.auth-form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const type = form.id === 'signinForm' ? 'Welcome back!' : 'Welcome to the Poké-World!';
        alert(`${type} This is a demo. No data was saved.`);
        authModal.classList.remove('active');
    });
});
