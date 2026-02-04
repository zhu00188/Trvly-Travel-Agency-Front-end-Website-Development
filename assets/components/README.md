# Component Management

This directory contains reusable UI components for the Trvly Travel Agency website.

## Components

### header.html
- **Location**: `assets/components/header.html`
- **Purpose**: Shared navigation bar used across all pages
- **Contents**: 
  - Mobile responsive menu
  - Desktop navigation menu
  - Language selector
  - Search functionality
  - User profile link
  - Book Now button

### footer.html
- **Location**: `assets/components/footer.html`
- **Purpose**: Shared footer used across all pages
- **Contents**:
  - About section with social links
  - Contact information
  - Quick navigation links
  - Instagram gallery
  - Copyright notice

## Implementation Method

### Option 1: jQuery Load (Recommended)
Add the component loader script to your HTML file before the closing `</body>` tag:

```html
<script src="assets/js/components-loader.js"></script>
```

This will automatically load both header and footer components if they don't already exist on the page.

### Option 2: Manual Include
To manually include components in your HTML:

```html
<!-- Header -->
<div id="header-placeholder"></div>
<script>
    $('#header-placeholder').load('assets/components/header.html');
</script>

<!-- Footer -->
<div id="footer-placeholder"></div>
<script>
    $('#footer-placeholder').load('assets/components/footer.html');
</script>
```

### Option 3: Server-Side Include (PHP/Node.js)
If using a server-side language, you can use include directives:

**PHP Example:**
```php
<?php include 'assets/components/header.html'; ?>
```

## Maintenance Guidelines

### When Updating Header/Footer
1. Edit the component file directly
2. Changes will automatically reflect on all pages that use the component loader
3. No need to update individual HTML files

### Adding New Components
1. Create a new `.html` file in `assets/components/`
2. Place only the relevant HTML code (no `<html>`, `<head>`, or `<body>` tags)
3. Reference the new component using the loader script

### File Structure
```
assets/
├── components/
│   ├── header.html       (Navigation component)
│   └── footer.html       (Footer component)
└── js/
    └── components-loader.js  (Loader script)
```

## Notes

- Components are loaded asynchronously using jQuery's `.load()` method
- Ensure jQuery is loaded before the components-loader.js script
- For pages using CORS (Cross-Origin Resource Sharing), ensure proper headers are set
- The loader checks if components already exist on the page before loading to avoid duplication
