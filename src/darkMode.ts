/**
 * Theme functionality for the website
 */

// Define types
type ThemeMode = 'light' | 'dark';

// Constants
const STORAGE_KEY = 'darkMode';
const DARK_CLASS = 'dark-mode';

/**
 * Toggle light/dark mode
 */
function toggleDarkMode(): void {
    document.body.classList.toggle('dark-mode');
    const isDarkMode: boolean = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode.toString());
    
    // Update accessibility state
    const toggle = document.getElementById('darkModeToggle');
    if (toggle) {
        toggle.setAttribute('aria-pressed', isDarkMode.toString());
    }
}

/**
 * Save user theme preference to localStorage
 */
function saveThemePreference(isLight: boolean): void {
    localStorage.setItem(STORAGE_KEY, isLight.toString());
}

/**
 * Load and apply saved theme preference
 */
function loadThemePreference(): void {
    const savedPreference = localStorage.getItem(STORAGE_KEY);
    
    if (savedPreference === 'true') {
        document.documentElement.classList.add(DARK_CLASS);
    } else if (savedPreference === null && !window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // If no preference is saved and system prefers light, switch to light mode
        document.documentElement.classList.add(DARK_CLASS);
        saveThemePreference(true);
    }
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', (): void => {
    // Apply dark mode if saved
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        const toggle = document.getElementById('darkModeToggle');
        if (toggle) {
            toggle.setAttribute('aria-pressed', 'true');
        }
    }
    
    // Add event listeners to the toggle button
    const toggleButton = document.getElementById('darkModeToggle');
    if (toggleButton) {
        // Click event
        toggleButton.addEventListener('click', toggleDarkMode);
        
        // Keyboard event for Space and Enter keys
        toggleButton.addEventListener('keydown', (e) => {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                toggleDarkMode();
            }
        });
    }
});

// Make toggleDarkMode available globally
(window as any).toggleDarkMode = toggleDarkMode; 