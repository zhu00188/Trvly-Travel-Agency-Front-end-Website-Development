/**
 * Component Loader
 * Dynamically loads header and footer components into pages
 * This script must be placed AFTER jQuery and all jQuery plugins
 */

// Determine base path
var basePath = window.location.pathname.split('/').slice(0, -1).join('/');

// Function to reinitialize jQuery plugins
function reinitializePlugins() {
    var $ = jQuery;
    console.log('Reinitializing jQuery plugins after component load...');

    // Reinitialize nice-select for newly loaded select elements only (not already initialized)
    if (typeof $.fn.niceSelect !== 'undefined') {
        // Destroy and reinitialize all selects to ensure proper state
        $('.select').each(function () {
            var $select = $(this);
            // Check if this select has already been initialized
            if ($select.next('.nice-select').length === 0) {
                $select.niceSelect();
                console.log('nice-select initialized for new element');
            } else {
                // Update existing nice-select
                $select.niceSelect('update');
                console.log('nice-select updated for existing element');
            }
        });
    }
}

// Function to load components
function loadComponents() {
    // Only proceed if jQuery is available
    if (typeof jQuery === 'undefined') {
        console.error('jQuery not loaded. Please ensure jQuery is included before components-loader.js');
        return;
    }

    var $ = jQuery;
    console.log('Component Loader: jQuery detected, loading components...');

    // Load header component
    if ($('nav.navbar-area').length === 0) {
        console.log('Loading header component from: assets/components/header.html');
        $.get('assets/components/header.html', function (data) {
            console.log('Header component loaded successfully, injecting...');
            $('body').prepend(data);
            // Reinitialize plugins after header is loaded
            reinitializePlugins();
        }).fail(function (error) {
            console.error('Failed to load header component. Status:', error.status, error.statusText);
        });
    } else {
        console.log('Header already exists in page');
    }

    // Load footer component
    if ($('footer.footer-area').length === 0) {
        console.log('Loading footer component from: assets/components/footer.html');
        $.get('assets/components/footer.html', function (data) {
            console.log('Footer component loaded successfully, appending...');
            $('body').append(data);
        }).fail(function (error) {
            console.error('Failed to load footer component. Status:', error.status, error.statusText);
        });
    } else {
        console.log('Footer already exists in page');
    }
}

// Execute when jQuery is available
if (typeof jQuery !== 'undefined') {
    console.log('Component Loader: jQuery is available, scheduling load...');
    jQuery(document).ready(function () {
        console.log('Document ready, calling loadComponents()');
        loadComponents();
    });
} else {
    console.error('Component Loader: jQuery is NOT available at script load time!');
}
