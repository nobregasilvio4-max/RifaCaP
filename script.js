document.addEventListener('DOMContentLoaded', function() {
    console.log('Script.js iniciado!');
    console.log('RifaCapConfig disponível?', !!window.RifaCapConfig);
    console.log('PRICE_PER_TITLE:', window.PRICE_PER_TITLE);
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeLogin = document.getElementById('closeLogin');
    const menuToggle = document.getElementById('menuToggle');
    const navMobile = document.getElementById('navMobile');
    const overlay = document.getElementById('overlay');
    
    const selectedTitulosElement = document.getElementById('selectedTitulos');
    const totalPriceElement = document.getElementById('totalPrice');
    const chancesElement = document.getElementById('chances');
    const buyPriceElement = document.getElementById('buyPrice');
    const buyBtn = document.getElementById('buyBtn');
    const incrementBtn = document.getElementById('incrementBtn');
    const decrementBtn = document.getElementById('decrementBtn');
    
    let selectedTitulos = 10;
    const pricePerTitulo = window.RifaCapConfig ? window.RifaCapConfig.getPriceDecimal() : 7.90;
    
    console.log('Preço per título carregado:', pricePerTitulo);
    
    function updateDisplay() {
        const totalPrice = selectedTitulos * pricePerTitulo;
        
        if (selectedTitulosElement) {
            selectedTitulosElement.textContent = selectedTitulos;
        }
        
        if (totalPriceElement) {
            totalPriceElement.textContent = `R$ ${totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
        }
        
        if (chancesElement) {
            chancesElement.textContent = `${selectedTitulos} em 100.000`;
        }
        
        if (buyPriceElement) {
            buyPriceElement.textContent = totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
        }
        
        // Atualizar preços fixos na página
        const heroPrice = document.getElementById('heroPrice');
        const sectionPrice = document.getElementById('sectionPrice');
        const unitPrice = document.getElementById('unitPrice');
        
        console.log('Atualizando elementos:', { heroPrice: !!heroPrice, sectionPrice: !!sectionPrice, unitPrice: !!unitPrice });
        
        if (heroPrice) {
            heroPrice.textContent = `R$ ${pricePerTitulo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
            console.log('Hero price atualizado para:', heroPrice.textContent);
        }
        if (sectionPrice) {
            sectionPrice.textContent = `R$ ${pricePerTitulo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
            console.log('Section price atualizado para:', sectionPrice.textContent);
        }
        if (unitPrice) {
            unitPrice.textContent = `R$ ${pricePerTitulo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
            console.log('Unit price atualizado para:', unitPrice.textContent);
        }
        
        if (buyBtn) {
            buyBtn.innerHTML = `<i class="ri-shopping-cart-line"></i> COMPRAR TÍTULOS - R$ ${totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
            
            // Atualizar o link do botão para incluir a quantidade
            buyBtn.onclick = function(e) {
                e.preventDefault();
                window.location.href = `pagamento.html?qtd=${selectedTitulos}`;
            };
        }
        
        updateQuickButtons();
    }
    
    function updateQuickButtons() {
        const quickButtons = document.querySelectorAll('.quick-btn');
        quickButtons.forEach(btn => {
            const value = parseInt(btn.dataset.value);
            btn.classList.toggle('active', value === selectedTitulos);
        });
    }
    
    function toggleLogin() {
        if (loginModal) {
            const isActive = loginModal.classList.contains('active');
            loginModal.classList.toggle('active', !isActive);
            overlay.classList.toggle('active', !isActive);
        }
    }
    
    function toggleMenu() {
        if (navMobile) {
            const isActive = navMobile.classList.contains('active');
            navMobile.classList.toggle('active', !isActive);
            overlay.classList.toggle('active', !isActive);
        }
    }
    
    function closeModals() {
        if (loginModal) loginModal.classList.remove('active');
        if (navMobile) navMobile.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
    }
    
    if (loginBtn) {
        loginBtn.addEventListener('click', toggleLogin);
    }
    
    if (closeLogin) {
        closeLogin.addEventListener('click', toggleLogin);
    }
    
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }
    
    if (overlay) {
        overlay.addEventListener('click', closeModals);
    }
    
    if (incrementBtn) {
        incrementBtn.addEventListener('click', function() {
            selectedTitulos++;
            updateDisplay();
        });
    }
    
    if (decrementBtn) {
        decrementBtn.addEventListener('click', function() {
            if (selectedTitulos > 1) {
                selectedTitulos--;
                updateDisplay();
            }
        });
    }
    
    const addButtons = document.querySelectorAll('.add-btn');
    addButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const value = parseInt(this.dataset.value);
            selectedTitulos += value;
            updateDisplay();
        });
    });
    
    const quickButtons = document.querySelectorAll('.quick-btn');
    quickButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const value = parseInt(this.dataset.value);
            selectedTitulos = value;
            updateDisplay();
        });
    });
    
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialAmounts = ['R$ 1.725,00', 'R$ 2.450,00', 'R$ 3.180,00'];
    const testimonialAmountElement = document.getElementById('testimonialAmount');
    
    testimonials.forEach((testimonial, index) => {
        testimonial.addEventListener('click', function() {
            testimonials.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            if (testimonialAmountElement) {
                testimonialAmountElement.textContent = testimonialAmounts[index];
            }
        });
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModals();
        }
    });
    
    updateDisplay();
    
    const navLinks = document.querySelectorAll('.nav-link, .nav-mobile-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && !href.startsWith('http') && href.includes('.html')) {
                e.preventDefault();
                
                if (href === 'index.html' || href === '/') {
                    window.location.href = 'index.html';
                } else {
                    alert(`Página ${href} será criada em breve!`);
                }
            }
        });
    });
    
    const ctaButtons = document.querySelectorAll('.btn-cta, .btn-buy');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.includes('.html')) {
                e.preventDefault();
                alert('Página de cadastro será criada em breve!');
            }
        });
    });
    
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Funcionalidade de login será implementada em breve!');
        });
    }
    
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Intersection Observer para animações de entrada
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remover estilos de animação inicial
                entry.target.style.opacity = '';
                entry.target.style.transform = '';
            }
        });
    }, observerOptions);
    
    // Aplicar animação inicial e observar elementos
    const animatedElements = document.querySelectorAll('.feature-card, .step, .prize-card, .testimonial, .partners-logos .partner-logo');
    animatedElements.forEach(el => {
        // Aplicar estilos de animação inicial
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Observar elemento
        observer.observe(el);
    });
    
    const counterElements = document.querySelectorAll('.counter-number, .summary-price, .prize-amount');
    
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (element.id === 'selectedTitulos') {
                element.textContent = Math.floor(current);
            } else if (element.classList.contains('summary-price') || element.classList.contains('prize-amount')) {
                if (target >= 1000000) {
                    element.textContent = `R$ ${(current / 1000000).toFixed(1)}M`;
                } else {
                    element.textContent = `R$ ${current.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
                }
            }
        }, 16);
    }
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                let target = 0;
                
                if (element.id === 'selectedTitulos') {
                    target = selectedTitulos;
                } else if (element.classList.contains('summary-price')) {
                    target = selectedTitulos * (window.RifaCapConfig ? window.RifaCapConfig.getPriceDecimal() : 7.90);
                } else if (element.classList.contains('prize-amount')) {
                    const text = element.textContent;
                    if (text.includes('10.000.000')) target = 10000000;
                    else if (text.includes('5.000.000')) target = 5000000;
                    else if (text.includes('1.000.000')) target = 1000000;
                    else if (text.includes('500.000')) target = 500000;
                }
                
                if (target > 0) {
                    animateCounter(element, target);
                    counterObserver.unobserve(element);
                }
            }
        });
    }, { threshold: 0.5 });
    
    counterElements.forEach(el => {
        counterObserver.observe(el);
    });
    
    const lazyImages = document.querySelectorAll('img[src*="readdy.ai"]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                img.onload = function() {
                    img.style.opacity = '1';
                };
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
    
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            closeModals();
        }
    });
    
    const tooltips = {
        'susep': 'Superintendência de Seguros Privados - Órgão regulador que garante a segurança dos títulos de capitalização',
        'caixa': 'Caixa Econômica Federal - Responsável pelos sorteios oficiais com total transparência',
        'titulo': 'Título de Capitalização - Produto financeiro regulamentado que combina poupança e sorteio'
    };
    
    document.querySelectorAll('[data-tooltip]').forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltipText = tooltips[this.dataset.tooltip];
            if (tooltipText) {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = tooltipText;
                tooltip.style.cssText = `
                    position: absolute;
                    background: #1f2937;
                    color: white;
                    padding: 0.5rem;
                    border-radius: 0.25rem;
                    font-size: 0.875rem;
                    max-width: 200px;
                    z-index: 1000;
                    pointer-events: none;
                    opacity: 0;
                    transition: opacity 0.2s;
                `;
                
                document.body.appendChild(tooltip);
                
                const rect = this.getBoundingClientRect();
                tooltip.style.left = rect.left + 'px';
                tooltip.style.top = (rect.bottom + 5) + 'px';
                
                setTimeout(() => tooltip.style.opacity = '1', 10);
                
                this._tooltip = tooltip;
            }
        });
        
        element.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                this._tooltip.remove();
                this._tooltip = null;
            }
        });
    });
    
    console.log('RifaCap - Site carregado com sucesso!');
    console.log('Funcionalidades ativas:', {
        'Login Modal': !!loginModal,
        'Menu Mobile': !!navMobile,
        'Seletor de Títulos': !!selectedTitulosElement,
        'Depoimentos': testimonials.length > 0,
        'Animações': 'IntersectionObserver' in window
    });
});

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function formatNumber(value) {
    return new Intl.NumberFormat('pt-BR').format(value);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

window.RifaCap = {
    formatCurrency,
    formatNumber,
    debounce,
    throttle
};