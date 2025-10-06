document.addEventListener('DOMContentLoaded', () => {
    initParallax();
    initSakuraPetals();
    initFloatingLanterns();
    initScrollAnimations();
    initHaikuSection();
    initGalleryPetals();
    initRainDrops();
    initMistParticles();
    initSnowFlakes();
    initFireflies();
    initNewSectionAnimations();
});

function initParallax() {
    const hero = document.getElementById('hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const layers = hero.querySelectorAll('.parallax-layer');
        
        layers.forEach((layer, index) => {
            const speed = (index + 1) * 0.3;
            layer.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

function initSakuraPetals() {
    const container = document.getElementById('sakura-container');
    if (!container) return;
    
    const petalCount = 30;
    
    for (let i = 0; i < petalCount; i++) {
        createPetal(container);
    }
}

function createPetal(container) {
    const petal = document.createElement('div');
    petal.className = 'sakura-petal';
    
    const startX = Math.random() * window.innerWidth;
    const startY = -50;
    const duration = 8 + Math.random() * 10;
    const delay = Math.random() * 5;
    const drift = (Math.random() - 0.5) * 200;
    const rotation = Math.random() * 360;
    const scale = 0.5 + Math.random() * 0.8;
    
    petal.style.left = startX + 'px';
    petal.style.top = startY + 'px';
    petal.style.transform = `rotate(${rotation}deg) scale(${scale})`;
    petal.style.animationDuration = duration + 's';
    petal.style.animationDelay = delay + 's';
    
    container.appendChild(petal);
    
    animatePetal(petal, startX, drift, duration * 1000, delay * 1000);
}

function animatePetal(petal, startX, drift, duration, delay) {
    setTimeout(() => {
        const start = performance.now();
        
        function animate(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            const y = progress * (window.innerHeight + 100);
            const x = startX + Math.sin(progress * Math.PI * 4) * drift;
            const rotation = progress * 720;
            
            petal.style.transform = `translate(${x - startX}px, ${y}px) rotate(${rotation}deg)`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                petal.remove();
                createPetal(document.getElementById('sakura-container'));
            }
        }
        
        requestAnimationFrame(animate);
    }, delay);
}

function initFloatingLanterns() {
    const container = document.getElementById('lantern-container');
    if (!container) return;
    
    const lanternCount = 10;
    
    for (let i = 0; i < lanternCount; i++) {
        createLantern(container);
    }
}

function createLantern(container) {
    const lantern = document.createElement('div');
    lantern.className = 'floating-lantern';
    
    const startX = Math.random() * window.innerWidth;
    const startY = window.innerHeight + 50;
    const duration = 15 + Math.random() * 10;
    const delay = Math.random() * 8;
    const drift = (Math.random() - 0.5) * 100;
    
    lantern.style.left = startX + 'px';
    lantern.style.top = startY + 'px';
    
    container.appendChild(lantern);
    
    animateLantern(lantern, startX, drift, duration * 1000, delay * 1000);
}

function animateLantern(lantern, startX, drift, duration, delay) {
    setTimeout(() => {
        const start = performance.now();
        
        function animate(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            const y = window.innerHeight - progress * (window.innerHeight + 100);
            const x = startX + Math.sin(progress * Math.PI * 2) * drift;
            const glow = 0.3 + Math.sin(progress * Math.PI * 8) * 0.3;
            
            lantern.style.transform = `translate(${x - startX}px, ${y - window.innerHeight}px)`;
            lantern.style.opacity = glow;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                lantern.remove();
                createLantern(document.getElementById('lantern-container'));
            }
        }
        
        requestAnimationFrame(animate);
    }, delay);
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || index * 100;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    const vibeCards = document.querySelectorAll('.vibe-card');
    vibeCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        observer.observe(item);
    });
    
    const cultureCards = document.querySelectorAll('.culture-card');
    cultureCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(card);
    });
}

function initHaikuSection() {
    const haikuContainer = document.querySelector('.haiku-container');
    const haikuLines = document.querySelectorAll('.haiku-line');
    
    if (!haikuContainer || haikuLines.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    haikuContainer.classList.add('dusk');
                }, 2000);
                
                haikuLines.forEach((line, index) => {
                    const delay = parseInt(line.dataset.delay) || index * 800;
                    setTimeout(() => {
                        line.classList.add('visible');
                    }, delay);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    observer.observe(haikuContainer);
}

function initGalleryPetals() {
    const gallerySection = document.getElementById('gallery');
    const petalsContainer = document.getElementById('gallery-petals');
    
    if (!gallerySection || !petalsContainer) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                for (let i = 0; i < 15; i++) {
                    createGalleryPetal(petalsContainer);
                }
            }
        });
    }, {
        threshold: 0.2
    });
    
    observer.observe(gallerySection);
}

function createGalleryPetal(container) {
    const petal = document.createElement('div');
    petal.className = 'sakura-petal';
    
    const startX = Math.random() * window.innerWidth;
    const startY = window.innerHeight * 0.3;
    const duration = 6 + Math.random() * 8;
    const delay = Math.random() * 3;
    const drift = (Math.random() - 0.5) * 150;
    const rotation = Math.random() * 360;
    const scale = 0.6 + Math.random() * 0.6;
    
    petal.style.left = startX + 'px';
    petal.style.top = startY + 'px';
    petal.style.transform = `rotate(${rotation}deg) scale(${scale})`;
    
    container.appendChild(petal);
    
    setTimeout(() => {
        const start = performance.now();
        
        function animate(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / (duration * 1000), 1);
            
            const y = startY + progress * (window.innerHeight - startY + 100);
            const x = startX + Math.sin(progress * Math.PI * 3) * drift;
            const rotation = progress * 360;
            
            petal.style.transform = `translate(${x - startX}px, ${y - startY}px) rotate(${rotation}deg) scale(${scale})`;
            petal.style.opacity = 1 - progress * 0.5;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                petal.remove();
            }
        }
        
        requestAnimationFrame(animate);
    }, delay * 1000);
}

function initRainDrops() {
    const container = document.getElementById('rain-container');
    if (!container) return;
    
    const rainCount = 50;
    
    for (let i = 0; i < rainCount; i++) {
        createRainDrop(container);
    }
}

function createRainDrop(container) {
    const drop = document.createElement('div');
    drop.className = 'rain-drop';
    
    const startX = Math.random() * window.innerWidth;
    const startY = -30;
    const duration = 0.5 + Math.random() * 0.5;
    const delay = Math.random() * 2;
    
    drop.style.left = startX + 'px';
    drop.style.top = startY + 'px';
    
    container.appendChild(drop);
    
    animateRain(drop, startX, duration * 1000, delay * 1000);
}

function animateRain(drop, startX, duration, delay) {
    setTimeout(() => {
        const start = performance.now();
        
        function animate(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            const y = progress * window.innerHeight;
            
            drop.style.transform = `translate(0, ${y}px)`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                drop.remove();
                createRainDrop(document.getElementById('rain-container'));
            }
        }
        
        requestAnimationFrame(animate);
    }, delay);
}

function initMistParticles() {
    const container = document.getElementById('mist-container');
    if (!container) return;
    
    const mistCount = 8;
    
    for (let i = 0; i < mistCount; i++) {
        createMistParticle(container);
    }
}

function createMistParticle(container) {
    const mist = document.createElement('div');
    mist.className = 'mist-particle';
    
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    const duration = 20 + Math.random() * 15;
    const delay = Math.random() * 5;
    const drift = (Math.random() - 0.5) * 200;
    
    mist.style.left = startX + 'px';
    mist.style.top = startY + 'px';
    
    container.appendChild(mist);
    
    animateMist(mist, startX, startY, drift, duration * 1000, delay * 1000);
}

function animateMist(mist, startX, startY, drift, duration, delay) {
    setTimeout(() => {
        const start = performance.now();
        
        function animate(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            const x = startX + Math.sin(progress * Math.PI * 2) * drift;
            const y = startY + Math.cos(progress * Math.PI * 2) * 100;
            const opacity = 0.3 * Math.sin(progress * Math.PI * 4);
            
            mist.style.transform = `translate(${x - startX}px, ${y - startY}px)`;
            mist.style.opacity = Math.abs(opacity);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                mist.remove();
                createMistParticle(document.getElementById('mist-container'));
            }
        }
        
        requestAnimationFrame(animate);
    }, delay);
}

function initSnowFlakes() {
    const container = document.getElementById('snow-container');
    if (!container) return;
    
    const snowCount = 40;
    
    for (let i = 0; i < snowCount; i++) {
        createSnowFlake(container);
    }
}

function createSnowFlake(container) {
    const snow = document.createElement('div');
    snow.className = 'snow-flake';
    
    const startX = Math.random() * window.innerWidth;
    const startY = -20;
    const duration = 10 + Math.random() * 8;
    const delay = Math.random() * 5;
    const drift = (Math.random() - 0.5) * 100;
    
    snow.style.left = startX + 'px';
    snow.style.top = startY + 'px';
    
    container.appendChild(snow);
    
    animateSnow(snow, startX, drift, duration * 1000, delay * 1000);
}

function animateSnow(snow, startX, drift, duration, delay) {
    setTimeout(() => {
        const start = performance.now();
        
        function animate(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            const y = progress * (window.innerHeight + 50);
            const x = startX + Math.sin(progress * Math.PI * 6) * drift;
            
            snow.style.transform = `translate(${x - startX}px, ${y}px)`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                snow.remove();
                createSnowFlake(document.getElementById('snow-container'));
            }
        }
        
        requestAnimationFrame(animate);
    }, delay);
}

function initFireflies() {
    const container = document.getElementById('firefly-container');
    if (!container) return;
    
    const fireflyCount = 20;
    
    for (let i = 0; i < fireflyCount; i++) {
        createFirefly(container);
    }
}

function createFirefly(container) {
    const firefly = document.createElement('div');
    firefly.className = 'firefly';
    
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    const duration = 5 + Math.random() * 5;
    const delay = Math.random() * 3;
    
    firefly.style.left = startX + 'px';
    firefly.style.top = startY + 'px';
    
    container.appendChild(firefly);
    
    animateFirefly(firefly, startX, startY, duration * 1000, delay * 1000);
}

function animateFirefly(firefly, startX, startY, duration, delay) {
    setTimeout(() => {
        const start = performance.now();
        
        function animate(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            const x = startX + Math.sin(progress * Math.PI * 8) * 150;
            const y = startY + Math.cos(progress * Math.PI * 6) * 100;
            const opacity = 0.8 * Math.sin(progress * Math.PI * 12);
            
            firefly.style.transform = `translate(${x - startX}px, ${y - startY}px)`;
            firefly.style.opacity = Math.abs(opacity);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                firefly.remove();
                createFirefly(document.getElementById('firefly-container'));
            }
        }
        
        requestAnimationFrame(animate);
    }, delay);
}

function initNewSectionAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || index * 150;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    });
    
    const natureCards = document.querySelectorAll('.nature-card');
    natureCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(card);
    });
    
    const sacredCards = document.querySelectorAll('.sacred-card');
    sacredCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.18}s`;
        observer.observe(card);
    });
    
    const waterCards = document.querySelectorAll('.water-card');
    waterCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(card);
    });
    
    const seasonCards = document.querySelectorAll('.season-card');
    seasonCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.22}s`;
        observer.observe(card);
    });
    
    const urbanCards = document.querySelectorAll('.urban-card');
    urbanCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(card);
    });
}

window.addEventListener('resize', () => {
    const allParticles = [
        ...document.querySelectorAll('.sakura-petal'),
        ...document.querySelectorAll('.floating-lantern'),
        ...document.querySelectorAll('.rain-drop'),
        ...document.querySelectorAll('.mist-particle'),
        ...document.querySelectorAll('.snow-flake'),
        ...document.querySelectorAll('.firefly')
    ];
    
    allParticles.forEach(particle => {
        const currentLeft = parseFloat(particle.style.left);
        if (currentLeft > window.innerWidth) {
            particle.style.left = window.innerWidth + 'px';
        }
    });
});
