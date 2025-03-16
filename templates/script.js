document.addEventListener('DOMContentLoaded', () => {
    // Initialize the particles.js
    initParticles();
    
    // Load the links dynamically
    loadLinks();
    
    // Initialize scroll reveal
    initScrollReveal();
});

// Initialize particles.js
function initParticles() {
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#748CAB"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#3E5C76",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
}

// Load the links dynamically
function loadLinks() {
    const linksContainer = document.getElementById('links-container');
    
    linkData.forEach(link => {
        // Create elements
        const linkCard = document.createElement('a');
        linkCard.href = link.url;
        linkCard.className = 'glass-effect link-hover gradient-hover rounded-lg p-4 flex items-center relative overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl reveal';
        linkCard.target = '_blank';
        linkCard.rel = 'noopener noreferrer';
        
        const linkIcon = document.createElement('div');
        linkIcon.className = 'w-10 h-10 rounded-full bg-secondary-bg flex items-center justify-center text-lg mr-4 flex-shrink-0 rotate-on-hover';
        
        const icon = document.createElement('i');
        icon.className = link.icon;
        
        const linkContent = document.createElement('div');
        linkContent.className = 'flex-grow';
        
        const linkTitle = document.createElement('h3');
        linkTitle.className = 'text-lg font-semibold mb-1';
        linkTitle.textContent = link.title;
        
        const linkDescription = document.createElement('p');
        linkDescription.className = 'text-sm text-text-color/80';
        linkDescription.textContent = link.description;
        
        // Assemble the link card
        linkIcon.appendChild(icon);
        linkContent.appendChild(linkTitle);
        linkContent.appendChild(linkDescription);
        
        linkCard.appendChild(linkIcon);
        linkCard.appendChild(linkContent);
        
        // Add to container
        linksContainer.appendChild(linkCard);
    });
}

// Initialize scroll reveal
function initScrollReveal() {
    // The function to reveal elements when they are in viewport
    function revealElements() {
        const elements = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150; // The element will be revealed when it's 150px from the viewport
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('revealed');
            } else {
                element.classList.remove('revealed');
            }
        });
    }
    
    // Initial check on page load
    revealElements();
    
    // Add scroll event listener
    window.addEventListener('scroll', revealElements);
} 