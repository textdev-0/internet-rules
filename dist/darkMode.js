"use strict";
/**
 * Dark mode functionality for the website
 */
// Constants
const STORAGE_KEY = 'darkMode';
const DARK_CLASS = 'dark-mode';
/**
 * Toggle dark mode state and save preference
 */
function toggleDarkMode() {
    document.body.classList.toggle(DARK_CLASS);
    const isDarkMode = document.body.classList.contains(DARK_CLASS);
    saveThemePreference(isDarkMode);
}
/**
 * Save user theme preference to localStorage
 */
function saveThemePreference(isDark) {
    localStorage.setItem(STORAGE_KEY, isDark.toString());
}
/**
 * Load and apply saved theme preference
 */
function loadThemePreference() {
    // Check for saved preference
    const savedPreference = localStorage.getItem(STORAGE_KEY);
    if (savedPreference === 'true') {
        document.body.classList.add(DARK_CLASS);
    }
    else if (savedPreference === null) {
        // If no preference is saved, check system preference
        checkSystemPreference();
    }
}
/**
 * Check system color scheme preference
 */
function checkSystemPreference() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add(DARK_CLASS);
        saveThemePreference(true);
    }
}
// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
    loadThemePreference();
    // Add event listener to the toggle button
    const toggleButton = document.getElementById('darkModeToggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleDarkMode);
    }
});
// Make toggleDarkMode available globally for legacy inline onclick handlers
window.toggleDarkMode = toggleDarkMode;
