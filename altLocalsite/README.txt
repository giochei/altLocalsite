STORAGE CATALOG SITE
===================

A minimalist 3-tier storage catalog for browsing suppliers, companies, and products. No e-commerce functionality - just viewing and administration.

SETUP INSTRUCTIONS
------------------

1. Extract all files to a folder
2. Open index.html in your web browser
3. That's it! No server setup required.

FILE STRUCTURE
--------------

index.html          - Customer view (main catalog page)
admin.html          - Admin interface with password protection
styles.css          - Shared CSS styles (dark theme)
app.js              - Customer page JavaScript logic
admin.js            - Admin page JavaScript logic
resources/          - Sample images directory
README.txt          - This file

ADMIN ACCESS
------------

To access the admin interface:
1. Open admin.html
2. Enter password: storage2024
3. Manage suppliers, companies, and products

FEATURES
--------

Customer View:
- 3-tier collapsible hierarchy (Supplier > Company > Product)
- Smooth animations and hover effects
- Responsive design for mobile/tablet/desktop
- Images display for all items

Admin Interface:
- Password protection (storage2024)
- Add/edit/delete suppliers
- Add/edit/delete companies under suppliers
- Add/edit/delete products under companies
- Image upload with base64 storage
- Real-time data synchronization

Technical:
- Pure HTML/CSS/JavaScript - no frameworks
- localStorage data persistence
- Base64 image storage (no server required)
- Mobile-first responsive design
- 320px to 1920px screen support

DATA STORAGE
------------

All data is stored in browser localStorage under the key 'storageCatalogData'.
Images are converted to base64 strings and stored with the data.

Sample data is pre-loaded if no data exists in localStorage.

BROWSER COMPATIBILITY
---------------------

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

Requires JavaScript enabled and localStorage support.

LIMITATIONS
-----------

- 5MB localStorage limit (images consume space quickly)
- No server-side backup (data stays in browser)
- Single user admin access
- No data import/export functionality

TROUBLESHOOTING
---------------

If images don't load:
- Check that image files exist in resources/ folder
- Try refreshing the page
- Check browser console for errors

If data doesn't save:
- Check browser localStorage isn't full
- Try clearing browser data and reloading
- Ensure JavaScript is enabled

For issues, check browser console (F12) for error messages.