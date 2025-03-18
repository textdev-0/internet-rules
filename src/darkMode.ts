function toggleDarkMode(): void {
    document.body.classList.toggle('dark-mode');
    const isDarkMode: boolean = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode.toString());
}

// Apply dark mode on page load if it was previously enabled
document.addEventListener('DOMContentLoaded', (): void => {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
});

// Make toggleDarkMode available globally
(window as any).toggleDarkMode = toggleDarkMode; 