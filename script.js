// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    });

    // Initialize comparison chart
    initializeComparisonChart();

    // Initialize scroll animations
    initializeScrollAnimations();

    // Initialize modal functionality
    initializeModals();
});

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize comparison chart
function initializeComparisonChart() {
    const ctx = document.getElementById('comparisonChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Response Time', 'Targeting Precision', 'Public Trust', 'Adaptation Speed', 'Resource Efficiency'],
            datasets: [{
                label: 'Singapore (Data-Driven)',
                data: [95, 95, 85, 90, 88],
                backgroundColor: '#3A86FF',
                borderColor: '#3A86FF',
                borderWidth: 1
            }, {
                label: 'Traditional Approach',
                data: [30, 40, 30, 25, 35],
                backgroundColor: '#666666',
                borderColor: '#666666',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Effectiveness Comparison (%)'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

// Initialize scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements that should animate
    const animatedElements = document.querySelectorAll('.point-card, .system-card, .benefit-card, .insight-item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// System modal functionality
function initializeModals() {
    const modal = document.getElementById('systemModal');
    const closeBtn = document.querySelector('.close');

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Open system modal with detailed information
function openSystemModal(systemType) {
    const modal = document.getElementById('systemModal');
    const modalContent = document.getElementById('modalContent');
    
    const systemData = {
        data: {
            title: 'Central Data Ecosystems',
            icon: 'fas fa-database',
            description: 'Singapore\'s Smart Nation initiative created centralized data repositories and APIs that enabled seamless data sharing across governmental bodies and private services.',
            features: [
                'Cloud architectures and APIs for data collation from various operators/vendors',
                'Automated data extraction, fusion, and transformation processes',
                'Specified periods to ensure reliable data flows',
                'Strict data governance protocols and privacy policies'
            ],
            impact: 'This connected digital infrastructure facilitated data flows including health records, transport usage, public space occupancy, and demographic information, creating a "single source of truth" for robust analytics and coherent policymaking.',
            technicalDetails: [
                'Real-time data processing capabilities',
                'Cross-agency data sharing protocols',
                'Standardized data formats and APIs',
                'Comprehensive data governance framework'
            ]
        },
        gowhere: {
            title: 'GoWhere Suite',
            icon: 'fas fa-map-marked-alt',
            description: 'Starting as FluGoWhere in February 2020, it evolved into a comprehensive portal hosting content from over 73 government websites across 14+ public agencies.',
            features: [
                'Multilingual accessibility (English, Chinese, Malay, Tamil)',
                'Real-time outbreak statistics and vaccination center locations',
                'Health protocols and PPE distribution details',
                'Job portals and training information'
            ],
            impact: 'Over 25.4 million visits by October 2021, demonstrating exceptional public adoption. The first-person categorization system ("I am well, but tested positive") transformed government service delivery from agency-centric to citizen-centric.',
            technicalDetails: [
                'User-centric navigation design',
                'Integration of multiple government databases',
                'Real-time data updates',
                'Mobile-responsive interface'
            ]
        },
        tracing: {
            title: 'Contact Tracing Systems',
            icon: 'fas fa-bluetooth-b',
            description: 'TraceTogether uses Bluetooth exchanges between tokens and smartphones to record close contacts, while SafeEntry logs digital check-ins/check-outs at public venues.',
            features: [
                'Bluetooth Low Energy (BLE) technology for proximity detection',
                'Physical tokens distributed for seniors and children without smartphones',
                'Integration with national identification systems',
                'Real-time data processing for immediate contact identification'
            ],
            impact: 'Enabled automated data correlation for instant identification of exposed individuals and places, replacing slower, resource-intensive manual contact tracing with population-wide coverage.',
            technicalDetails: [
                'Privacy-preserving design with local data storage',
                'Automated exposure notification system',
                'Integration with epidemiological modeling',
                'Scalable infrastructure for population coverage'
            ]
        },
        geospatial: {
            title: 'Geospatial Analytics & Crowd Density Mapping',
            icon: 'fas fa-map',
            description: 'Integration of live sensor data enabled creation of real-time heat maps showing crowd levels in malls, parks, hawker centers, and transport hubs.',
            features: [
                'Space Out: Real-time crowd density for shopping malls, wet markets, supermarkets',
                'Safe Distance @ Parks: Crowd levels in 300+ parks and nature reserves',
                'MOH Outbreak Maps: Movement patterns of infected cases over 3-day periods',
                'Multi-modal data fusion from mobile signals, cameras, Wi-Fi trackers'
            ],
            impact: 'Enabled better distribution of population flows, informed citizen decision-making, and reduced transmission hotspots through dynamic crowd monitoring and dispersal.',
            technicalDetails: [
                'Real-time sensor data integration',
                'Advanced geospatial analytics algorithms',
                'Public-facing visualization platforms',
                'Behavioral influence through data transparency'
            ]
        },
        gantry: {
            title: 'VigilantGantry System',
            icon: 'fas fa-eye',
            description: 'Smart gantries using AI, facial recognition, thermal imaging, and mobile app verification to monitor compliance at key entry points.',
            features: [
                'Temperature measurement and facial indexing',
                'TraceTogether and SafeEntry integration',
                'Vaccination status verification',
                'Mobile application scanning and real-time health risk assessment'
            ],
            impact: 'Provided granular data on compliance rates, facilitating evidence-based enforcement and policy flexibility. The modular design allowed existing infrastructures to be retrofitted cost-effectively.',
            technicalDetails: [
                'AI-powered automated decision making',
                'Multi-modal biometric verification',
                'Modular deployment architecture',
                'Dynamic scaling based on risk levels'
            ]
        },
        robotics: {
            title: 'AI & Robotics for Healthcare and Policing',
            icon: 'fas fa-robot',
            description: 'Autonomous systems including SPOT, Matar, and Xavier robots for public space patrol, combined with predictive AI algorithms for healthcare resource planning.',
            features: [
                'SPOT: Four-legged robot for park patrol and safe distancing enforcement',
                'Matar: Multi-purpose robots for foreign worker dormitory monitoring',
                'Xavier: Autonomous patrol robot for detecting undesirable social behaviors',
                'Predictive AI algorithms for infection forecasting and resource planning'
            ],
            impact: 'Enabled contactless monitoring and enforcement while augmenting human capabilities. Video analytics powered real-time detection of specific behaviors without constant human oversight.',
            technicalDetails: [
                'Autonomous navigation and patrol capabilities',
                'Real-time behavior recognition algorithms',
                'Predictive modeling for resource allocation',
                'Human-machine collaboration frameworks'
            ]
        }
    };

    const system = systemData[systemType];
    if (!system) return;

    modalContent.innerHTML = `
        <div class="modal-header">
            <div class="modal-icon">
                <i class="${system.icon}"></i>
            </div>
            <h2>${system.title}</h2>
        </div>
        
        <div class="modal-body">
            <div class="modal-section">
                <h3>Overview</h3>
                <p>${system.description}</p>
            </div>
            
            <div class="modal-section">
                <h3>Key Features</h3>
                <ul>
                    ${system.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            
            <div class="modal-section">
                <h3>Impact & Results</h3>
                <p>${system.impact}</p>
            </div>
            
            <div class="modal-section">
                <h3>Technical Implementation</h3>
                <ul>
                    ${system.technicalDetails.map(detail => `<li>${detail}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;

    // Add modal-specific styles
    const modalStyles = `
        <style>
            .modal-header {
                display: flex;
                align-items: center;
                margin-bottom: 2rem;
                padding-bottom: 1rem;
                border-bottom: 2px solid #eee;
            }
            
            .modal-icon {
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #0A2463, #3A86FF);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 1rem;
                color: white;
                font-size: 1.5rem;
            }
            
            .modal-header h2 {
                color: #E2E8F0;
                margin: 0;
            }
            
            .modal-section {
                margin-bottom: 2rem;
            }
            
            .modal-section h3 {
                color: #3A86FF;
                margin-bottom: 1rem;
                font-size: 1.2rem;
            }
            
            .modal-section p {
                color: #CBD5E0;
                line-height: 1.6;
                margin-bottom: 1rem;
            }
            
            .modal-section ul {
                list-style: none;
                padding: 0;
            }
            
            .modal-section li {
                color: #CBD5E0;
                padding: 0.5rem 0;
                position: relative;
                padding-left: 1.5rem;
                line-height: 1.5;
            }
            
            .modal-section li::before {
                content: '→';
                color: #00C2D4;
                position: absolute;
                left: 0;
                font-weight: bold;
            }
        </style>
    `;

    modalContent.innerHTML = modalStyles + modalContent.innerHTML;
    modal.style.display = 'block';
}

// Utility functions
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

// Performance optimization for scroll events
const debouncedScrollHandler = debounce(function() {
    // Handle scroll-based animations or updates here
}, 100);

window.addEventListener('scroll', debouncedScrollHandler);

// Add loading states for interactive elements
function addLoadingState(element) {
    element.classList.add('loading');
}

function removeLoadingState(element) {
    element.classList.remove('loading');
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        const modal = document.getElementById('systemModal');
        if (modal && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    }
});

// Add focus management for accessibility
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Initialize focus trapping for modals
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('systemModal');
    if (modal) {
        trapFocus(modal);
    }
});

// Add print styles support
function optimizeForPrint() {
    const printStyles = `
        @media print {
            .navbar, .hero-buttons, .btn { display: none !important; }
            .section { page-break-inside: avoid; }
            .hero { height: auto; padding: 2rem 0; }
            body { font-size: 12pt; line-height: 1.4; }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = printStyles;
    document.head.appendChild(styleSheet);
}

// Initialize print optimization
optimizeForPrint();

// Create fallback chart visualization
function createFallbackChart() {
    const chartContainer = document.querySelector('.chart-container');
    if (!chartContainer) return;

    const fallbackChart = `
        <div class="fallback-chart">
            <div class="chart-title">Singapore vs Traditional Approaches - Effectiveness Comparison</div>
            <div class="chart-bars">
                <div class="chart-category">
                    <div class="category-label">Response Time</div>
                    <div class="bar-container">
                        <div class="bar singapore-bar" style="width: 95%">
                            <span class="bar-label">Singapore: 95%</span>
                        </div>
                        <div class="bar traditional-bar" style="width: 30%">
                            <span class="bar-label">Traditional: 30%</span>
                        </div>
                    </div>
                </div>
                
                <div class="chart-category">
                    <div class="category-label">Targeting Precision</div>
                    <div class="bar-container">
                        <div class="bar singapore-bar" style="width: 95%">
                            <span class="bar-label">Singapore: 95%</span>
                        </div>
                        <div class="bar traditional-bar" style="width: 40%">
                            <span class="bar-label">Traditional: 40%</span>
                        </div>
                    </div>
                </div>
                
                <div class="chart-category">
                    <div class="category-label">Public Trust</div>
                    <div class="bar-container">
                        <div class="bar singapore-bar" style="width: 85%">
                            <span class="bar-label">Singapore: 85%</span>
                        </div>
                        <div class="bar traditional-bar" style="width: 30%">
                            <span class="bar-label">Traditional: 30%</span>
                        </div>
                    </div>
                </div>
                
                <div class="chart-category">
                    <div class="category-label">Adaptation Speed</div>
                    <div class="bar-container">
                        <div class="bar singapore-bar" style="width: 90%">
                            <span class="bar-label">Singapore: 90%</span>
                        </div>
                        <div class="bar traditional-bar" style="width: 25%">
                            <span class="bar-label">Traditional: 25%</span>
                        </div>
                    </div>
                </div>
                
                <div class="chart-category">
                    <div class="category-label">Resource Efficiency</div>
                    <div class="bar-container">
                        <div class="bar singapore-bar" style="width: 88%">
                            <span class="bar-label">Singapore: 88%</span>
                        </div>
                        <div class="bar traditional-bar" style="width: 35%">
                            <span class="bar-label">Traditional: 35%</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="chart-legend">
                <div class="legend-item">
                    <div class="legend-color singapore-color"></div>
                    <span>Singapore (Data-Driven)</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color traditional-color"></div>
                    <span>Traditional Approach</span>
                </div>
            </div>
        </div>
    `;

    chartContainer.innerHTML = fallbackChart;
}

// Add error handling for chart initialization
function safeChartInit() {
    try {
        // Try to initialize Chart.js first
        if (typeof Chart !== 'undefined') {
            initializeComparisonChart();
        } else {
            throw new Error('Chart.js not loaded');
        }
    } catch (error) {
        console.warn('Chart.js initialization failed, using fallback chart:', error);
        createFallbackChart();
    }
}

// Replace the original chart init call
document.addEventListener('DOMContentLoaded', safeChartInit);