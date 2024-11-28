// Function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const threshold = 0.3; // Show element when 30% visible
    
    return (
        rect.top <= windowHeight * (1 - threshold) &&
        rect.bottom >= windowHeight * threshold
    );
}

// Function to handle scroll animations
function handleScrollAnimations() {
    // Animate sections except home (since it's fixed)
    document.querySelectorAll('section').forEach(section => {
        const sectionId = section.getAttribute('id');
        if (isInViewport(section)) {
            section.classList.add('visible');
            // Update nav link active state
            if (sectionId !== 'home') {  // Don't update nav for home section
                document.querySelectorAll('#home nav a').forEach(link => {
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        } else {
            if (sectionId !== 'home') {  // Keep home section visible
                section.classList.remove('visible');
            }
        }
    });

    // Animate projects
    document.querySelectorAll('.project').forEach(project => {
        if (isInViewport(project)) {
            project.classList.add('visible');
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', handleScrollAnimations);

// Make home section visible immediately and run initial check
document.querySelector('#home').classList.add('visible');
handleScrollAnimations();