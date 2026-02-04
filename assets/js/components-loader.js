/**
 * Component Loader
 * Dynamically loads header and footer components into pages
 * This script must be placed AFTER jQuery and all jQuery plugins
 */

// Determine base path
var basePath = window.location.pathname.split('/').slice(0, -1).join('/');

// Global flag to indicate components are loaded
window.componentsLoaded = false;

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

    // Track loaded components
    var componentsLoaded = 0;
    var totalComponents = 5;

    function checkAllLoaded() {
        componentsLoaded++;
        if (componentsLoaded === totalComponents) {
            console.log('All components loaded successfully');
            window.componentsLoaded = true;

            // AGGRESSIVE cleanup with verification
            setTimeout(function () {
                var $overlay = jQuery('#body-overlay');
                var $search = jQuery('#search-popup');
                var $signup = jQuery('#signUp-popup');
                var $preloader = jQuery('#preloader');
                var $preloaderInner = jQuery('.preloader-inner');

                // Force remove ALL styles and classes
                $overlay.removeClass('active').removeAttr('style');
                $overlay[0].style.setProperty('display', 'none', 'important');
                $overlay[0].style.setProperty('visibility', 'hidden', 'important');
                $overlay[0].style.setProperty('opacity', '0', 'important');

                $search.removeClass('active');
                $signup.removeClass('active');

                // CRITICAL: Force hide preloader AND preloader-inner immediately
                if ($preloader.length > 0) {
                    $preloader.stop(true, true);
                    $preloader[0].style.setProperty('display', 'none', 'important');
                }
                if ($preloaderInner.length > 0) {
                    $preloaderInner[0].style.setProperty('display', 'none', 'important');
                    $preloaderInner[0].style.setProperty('opacity', '0', 'important');
                }

                console.log('Initial cleanup completed at 150ms');
            }, 150);

            // One final check after a delay to catch any stragglers
            setTimeout(function () {
                var $overlay = jQuery('#body-overlay');
                var $preloader = jQuery('#preloader');
                var $preloaderInner = jQuery('.preloader-inner');

                // Only hide if they don't have active class (not intentionally opened)
                if ($overlay.length && !$overlay.hasClass('active') && $overlay.css('display') !== 'none') {
                    console.log('Final cleanup: hiding overlay');
                    $overlay.hide();
                }

                if ($preloader.length > 0 && $preloader.css('display') !== 'none') {
                    console.log('Final cleanup: hiding preloader');
                    $preloader.stop(true, true).hide();
                }

                if ($preloaderInner.length > 0 && $preloaderInner.css('display') !== 'none') {
                    console.log('Final cleanup: hiding preloader-inner');
                    $preloaderInner.hide();
                }
            }, 1000);

            // Trigger custom event
            if (typeof jQuery !== 'undefined') {
                jQuery(document).trigger('componentsLoaded');
            }

            reinitializePlugins();
        }
    }

    // Load header component first (goes at the top)
    if ($('nav.navbar-area').length === 0) {
        console.log('Loading header component from: assets/components/header.html');
        $.get('assets/components/header.html', function (data) {
            console.log('Header component loaded successfully, injecting...');
            $('body').prepend(data);
            checkAllLoaded();
        }).fail(function (error) {
            console.error('Failed to load header component. Status:', error.status, error.statusText);
            checkAllLoaded();
        });
    } else {
        console.log('Header already exists in page');
        checkAllLoaded();
    }

    // Load signup popup (before header)
    if ($('.signUp-popup').length === 0) {
        console.log('Loading signup popup component from: assets/components/signup-popup.html');
        $.get('assets/components/signup-popup.html', function (data) {
            console.log('Signup popup component loaded successfully, prepending...');
            $('body').prepend(data);
            checkAllLoaded();
        }).fail(function (error) {
            console.error('Failed to load signup popup component. Status:', error.status, error.statusText);
            checkAllLoaded();
        });
    } else {
        console.log('Signup popup already exists in page');
        checkAllLoaded();
    }

    // Load search popup (before signup popup)
    if ($('.search-popup').length === 0 && $('#body-overlay').length === 0) {
        console.log('Loading search popup component from: assets/components/search-popup.html');
        $.get('assets/components/search-popup.html', function (data) {
            console.log('Search popup component loaded successfully, prepending...');
            $('body').prepend(data);
            checkAllLoaded();
        }).fail(function (error) {
            console.error('Failed to load search popup component. Status:', error.status, error.statusText);
            checkAllLoaded();
        });
    } else {
        console.log('Search popup already exists in page');
        checkAllLoaded();
    }

    // Load preloader (must be first in body)
    if ($('.preloader').length === 0) {
        console.log('Loading preloader component from: assets/components/preloader.html');
        $.get('assets/components/preloader.html', function (data) {
            console.log('Preloader component loaded successfully, prepending...');
            $('body').prepend(data);
            checkAllLoaded();
        }).fail(function (error) {
            console.error('Failed to load preloader component. Status:', error.status, error.statusText);
            checkAllLoaded();
        });
    } else {
        console.log('Preloader already exists in page');
        checkAllLoaded();
    }

    // Load footer component
    if ($('footer.footer-area').length === 0) {
        console.log('Loading footer component from: assets/components/footer.html');
        $.get('assets/components/footer.html', function (data) {
            console.log('Footer component loaded successfully, appending...');
            $('body').append(data);
            checkAllLoaded();
        }).fail(function (error) {
            console.error('Failed to load footer component. Status:', error.status, error.statusText);
            checkAllLoaded();
        });
    } else {
        console.log('Footer already exists in page');
        checkAllLoaded();
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
