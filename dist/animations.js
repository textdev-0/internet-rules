"use strict";
function animateFavicon() {
    const favicon = document.querySelector('.favicon');
    if (!favicon || favicon.classList.contains('animating'))
        return;
    favicon.classList.add('animating');
    // First fade out
    favicon.classList.add('fade-out');
    setTimeout(() => {
        // Switch to cool.png and fade in
        favicon.src = '/assets/icons/cool.png';
        favicon.classList.remove('fade-out');
        favicon.classList.add('fade-in', 'bounce');
        // After bounce animation, fade out cool.png
        setTimeout(() => {
            favicon.classList.remove('fade-in');
            favicon.classList.add('fade-out');
            // Switch back to favicon.png and fade in
            setTimeout(() => {
                favicon.src = '/assets/icons/favicon.png';
                favicon.classList.remove('fade-out', 'bounce');
                favicon.classList.add('fade-in');
                // Clean up classes after animation
                setTimeout(() => {
                    favicon.classList.remove('fade-in', 'animating');
                }, 500);
            }, 500);
        }, 2000); // Let it bounce for 2 seconds
    }, 500);
}
// Make animateFavicon available globally
window.animateFavicon = animateFavicon;
