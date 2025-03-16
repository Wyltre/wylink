#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const figlet = require('figlet');
const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');

// Welcome message
console.log(
  chalk.cyan(
    figlet.textSync('Wylink', { horizontalLayout: 'full' })
  )
);

// Get package.json version
const packageJson = require('../package.json');

program
  .version(packageJson.version)
  .description('A CLI to create your own wylink portal (linktree style website)');

program
  .command('create')
  .description('Create a new wylink portal')
  .action(async () => {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter your name:',
        default: 'İsim Soyisim'
      },
      {
        type: 'input',
        name: 'title',
        message: 'Enter your title/profession:',
        default: 'Frontend Geliştirici & UI/UX Tasarımcı'
      },
      {
        type: 'input',
        name: 'outputDir',
        message: 'Where should we create your wylink portal?',
        default: './my-wylink'
      },
      {
        type: 'input',
        name: 'profileImage',
        message: 'Enter your profile image URL (or leave default for placeholder):',
        default: 'https://i.pravatar.cc/150?img=3'
      }
    ]);

    try {
      await createLinkPortal(answers);
      console.log(chalk.green(`✅ Wylink portal created successfully at ${answers.outputDir}`));
      console.log(chalk.yellow('To add links, run:'));
      console.log(chalk.cyan(`  npx wylink add-link --dir ${answers.outputDir}`));
    } catch (error) {
      console.error(chalk.red('Error creating wylink portal:'), error);
    }
  });

program
  .command('add-link')
  .description('Add a new link to your wylink portal')
  .option('-d, --dir <directory>', 'Directory of your wylink portal', './my-wylink')
  .action(async (options) => {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter link title:',
        validate: input => input.trim() !== '' ? true : 'Title is required'
      },
      {
        type: 'input',
        name: 'url',
        message: 'Enter link URL:',
        validate: input => {
          const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
          return urlPattern.test(input) || input.startsWith('mailto:') 
            ? true 
            : 'Please enter a valid URL';
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Enter link description:',
        default: ''
      },
      {
        type: 'list',
        name: 'icon',
        message: 'Choose an icon:',
        choices: [
          { name: 'Briefcase (Portfolio)', value: 'fas fa-briefcase' },
          { name: 'LinkedIn', value: 'fab fa-linkedin' },
          { name: 'GitHub', value: 'fab fa-github' },
          { name: 'YouTube', value: 'fab fa-youtube' },
          { name: 'Blog/RSS', value: 'fas fa-rss' },
          { name: 'Email', value: 'fas fa-envelope' },
          { name: 'Twitter', value: 'fab fa-twitter' },
          { name: 'Instagram', value: 'fab fa-instagram' },
          { name: 'Facebook', value: 'fab fa-facebook' },
          { name: 'Website', value: 'fas fa-globe' }
        ]
      }
    ]);

    try {
      await addLink(options.dir, answers);
      console.log(chalk.green('✅ Link added successfully!'));
    } catch (error) {
      console.error(chalk.red('Error adding link:'), error);
    }
  });

program.parse(process.argv);

// If no arguments, show help
if (!process.argv.slice(2).length) {
  program.outputHelp();
}

// Function to create the basic link portal
async function createLinkPortal(answers) {
  const { name, title, outputDir, profileImage } = answers;
  
  // Create directory if it doesn't exist
  await fs.ensureDir(outputDir);
  
  // Copy template files
  const templatesDir = path.join(__dirname, '../templates');
  
  // Create data.js with empty links array
  const dataJs = `// Link data
const linkData = [];`;
  
  await fs.writeFile(path.join(outputDir, 'data.js'), dataJs);
  
  // Create index.html
  const indexHtml = getIndexHtmlTemplate(name, title, profileImage);
  await fs.writeFile(path.join(outputDir, 'index.html'), indexHtml);
  
  // Create script.js
  const scriptJs = getScriptJsTemplate();
  await fs.writeFile(path.join(outputDir, 'script.js'), scriptJs);
}

// Function to add a new link
async function addLink(dir, link) {
  const dataJsPath = path.join(dir, 'data.js');
  
  // Check if data.js exists
  if (!await fs.pathExists(dataJsPath)) {
    throw new Error(`Could not find data.js in ${dir}. Make sure the directory is correct.`);
  }
  
  // Read existing data.js
  const dataJsContent = await fs.readFile(dataJsPath, 'utf-8');
  
  // Parse existing links
  let links = [];
  try {
    // Extract the array from the file content
    const arrayMatch = dataJsContent.match(/const linkData = (\[[\s\S]*\]);/);
    if (arrayMatch && arrayMatch[1]) {
      // Evaluate the array string (safer than using eval)
      links = JSON.parse(arrayMatch[1].replace(/'/g, '"')
        .replace(/(\w+):/g, '"$1":')
        .replace(/,(\s*[\]}])/g, '$1'));
    }
  } catch (error) {
    console.warn(chalk.yellow('Could not parse existing links, creating new array'));
  }
  
  // Add new link
  const newLink = {
    id: links.length > 0 ? Math.max(...links.map(l => l.id)) + 1 : 1,
    title: link.title,
    description: link.description,
    url: link.url,
    icon: link.icon
  };
  
  links.push(newLink);
  
  // Format links for output
  const linksFormatted = links.map(l => {
    return `    {
        id: ${l.id},
        title: "${l.title}",
        description: "${l.description}",
        url: "${l.url}",
        icon: "${l.icon}"
    }`;
  }).join(",\n");
  
  // Create new data.js content
  const newDataJsContent = `// Link data
const linkData = [
${linksFormatted}
];`;
  
  // Write updated data.js
  await fs.writeFile(dataJsPath, newDataJsContent);
}

// Template for index.html
function getIndexHtmlTemplate(name, title, profileImage) {
  return `<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} - Wylink</title>
    <!-- Tailwind CSS from CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Particles.js -->
    <script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>
    
    <!-- Configure Tailwind -->
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'primary-bg': '#0D1321',
                        'secondary-bg': '#1D2D44',
                        'card-bg': '#3E5C76',
                        'highlight': '#748CAB',
                        'text-color': '#F0EBD8',
                    }
                }
            }
        }
    </script>
    
    <!-- Google Font -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Custom Styles -->
    <style>
        body {
            font-family: 'Poppins', sans-serif;
        }
        
        #particles-js {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: -1;
        }
        
        .glass-effect {
            background-color: rgba(62, 92, 118, 0.2);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .gradient-hover::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, transparent, #748CAB, transparent);
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: -1;
        }
        
        .gradient-hover:hover::before {
            opacity: 0.2;
        }
        
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }
        
        .revealed {
            opacity: 1;
            transform: translateY(0);
        }
        
        @keyframes rotate {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
        
        .rotate-on-hover {
            transition: all 0.3s ease;
        }
        
        .link-hover:hover .rotate-on-hover {
            animation: rotate 0.3s forwards;
        }
        
        /* Custom Scrollbar Styles */
        /* For Webkit browsers (Chrome, Safari, newer versions of Opera) */
        ::-webkit-scrollbar {
            width: 10px;
        }
        
        ::-webkit-scrollbar-track {
            background: #1D2D44;
            border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
            background: #748CAB;
            border-radius: 10px;
            border: 2px solid #1D2D44;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: #8da6c2;
        }
        
        /* For Firefox */
        * {
            scrollbar-width: thin;
            scrollbar-color: #748CAB #1D2D44;
        }
        
        /* For Edge and IE */
        body {
            -ms-overflow-style: none;
        }
    </style>
</head>
<body class="bg-primary-bg text-text-color min-h-screen overflow-x-hidden relative">
    <div id="particles-js"></div>
    
    <div class="max-w-3xl mx-auto p-4 md:p-8 relative z-10">
        <header class="flex flex-col items-center mb-8 text-center">
            <div class="w-24 h-24 md:w-30 md:h-30 rounded-full overflow-hidden mb-4 border-3 border-highlight shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl reveal">
                <img src="${profileImage}" alt="${name}" class="w-full h-full object-cover">
            </div>
            <h1 class="text-3xl md:text-4xl font-bold mb-2 text-text-color reveal">${name}</h1>
            <p class="text-base md:text-lg font-light mb-6 text-highlight reveal">${title}</p>
            <div class="flex gap-4 mb-8 reveal">
                <a href="#" class="w-10 h-10 rounded-full bg-secondary-bg flex items-center justify-center text-xl shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-highlight hover:text-primary-bg">
                    <i class="fab fa-twitter"></i>
                </a>
                <a href="#" class="w-10 h-10 rounded-full bg-secondary-bg flex items-center justify-center text-xl shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-highlight hover:text-primary-bg">
                    <i class="fab fa-instagram"></i>
                </a>
                <a href="#" class="w-10 h-10 rounded-full bg-secondary-bg flex items-center justify-center text-xl shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-highlight hover:text-primary-bg">
                    <i class="fab fa-github"></i>
                </a>
                <a href="#" class="w-10 h-10 rounded-full bg-secondary-bg flex items-center justify-center text-xl shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-highlight hover:text-primary-bg">
                    <i class="fab fa-linkedin"></i>
                </a>
            </div>
        </header>
        
        <main>
            <section class="flex flex-col gap-4 mb-8" id="links-container">
                <!-- Links will be dynamically loaded here from data.js -->
            </section>
        </main>
        
        <footer class="text-center py-4 text-sm text-text-color/70 border-t border-white/10 mt-8 reveal">
            <p>© 2025 ${name} | Created with <a href="https://github.com/wyltre/wylink" class="hover:text-highlight transition-colors duration-300">Wylink</a></p>
        </footer>
    </div>
    
    <script src="data.js"></script>
    <script src="script.js"></script>
</body>
</html>`;
}

// Template for script.js
function getScriptJsTemplate() {
  return `document.addEventListener('DOMContentLoaded', () => {
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
    
    // Clear container first
    linksContainer.innerHTML = '';
    
    // Check if linkData exists and has items
    if (!linkData || linkData.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'glass-effect rounded-lg p-6 text-center';
        emptyMessage.innerHTML = '<p>Henüz bağlantı eklenmemiş. Terminal üzerinden bağlantı ekleyebilirsiniz.</p>';
        linksContainer.appendChild(emptyMessage);
        return;
    }
    
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
}`;
} 