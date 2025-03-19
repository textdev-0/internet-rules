/**
 * Theme functionality for the website
 */

// Define types
type ThemeMode = 'light' | 'dark';

// Constants
const STORAGE_KEY = 'lightMode';
const LIGHT_CLASS = 'light-mode';

/**
 * Toggle light/dark mode
 */
function toggleDarkMode(): void {
    document.body.classList.toggle('dark-mode');
    const isDarkMode: boolean = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode.toString());
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
        document.documentElement.classList.add(LIGHT_CLASS);
    } else if (savedPreference === null && !window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // If no preference is saved and system prefers light, switch to light mode
        document.documentElement.classList.add(LIGHT_CLASS);
        saveThemePreference(true);
    }
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', (): void => {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
    
    // Add event listener to the toggle button
    const toggleButton = document.getElementById('darkModeToggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleDarkMode);
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e: MediaQueryListEvent) => {
            if (!localStorage.getItem(STORAGE_KEY)) {
                document.documentElement.classList.toggle(LIGHT_CLASS, !e.matches);
            }
        });
});

// Make toggleDarkMode available globally
(window as any).toggleDarkMode = toggleDarkMode; 