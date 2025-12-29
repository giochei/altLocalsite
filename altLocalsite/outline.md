# Storage Catalog Site - Project Outline

## File Structure
```
/mnt/okcomputer/output/
├── index.html          # Customer view - main catalog page
├── admin.html          # Admin interface with password protection  
├── styles.css          # Shared CSS styles (dark theme)
├── app.js              # Customer page JavaScript logic
├── admin.js            # Admin page JavaScript logic
├── README.txt          # Simple setup instructions
└── resources/          # Sample images directory
    ├── supplier1.jpg   # Sample supplier logo
    ├── supplier2.jpg   # Sample supplier logo
    ├── company1.jpg    # Sample company logo
    ├── company2.jpg    # Sample company logo
    ├── product1.jpg    # Sample product image
    └── product2.jpg    # Sample product image
```

## Page Breakdown

### index.html - Customer View
**Purpose**: Display 3-tier hierarchy for browsing only
**Key Sections**:
- HTML head with meta tags and viewport settings
- Link to styles.css (embedded via style tag)
- Link to app.js (embedded via script tag)
- Main container with supplier hierarchy
- Collapsible supplier/company/product structure
- Responsive layout for mobile/desktop

**Data Flow**:
- Load data from localStorage (`storageCatalogData`)
- Render suppliers with companies and products
- Handle expand/collapse interactions
- Display images from base64 strings

### admin.html - Admin Interface  
**Purpose**: Full CRUD management with password protection
**Key Sections**:
- Password entry screen (initial state)
- Admin interface with sidebar and panel
- Dynamic forms for suppliers/companies/products
- File upload handling for images
- Delete confirmations and success messages

**Data Flow**:
- Password verification (`storage2024`)
- Load/save data to localStorage
- Form validation and submission
- Image to base64 conversion
- Real-time hierarchy updates

### styles.css - Shared Styles
**Purpose**: Consistent dark theme across both pages
**Key Sections**:
- CSS reset and base styles
- Dark theme variables (colors, spacing)
- Typography scales
- Layout utilities (flexbox, responsive)
- Component styles (cards, forms, buttons)
- Animation definitions (transitions)
- Mobile media queries

### app.js - Customer Logic
**Purpose**: Handle customer page interactions
**Key Functions**:
- `loadCatalogData()` - Read from localStorage
- `renderSuppliers()` - Build supplier hierarchy
- `toggleSupplier()` - Expand/collapse suppliers
- `toggleCompany()` - Expand/collapse companies
- `renderProduct()` - Display product details
- Image loading from base64

### admin.js - Admin Logic
**Purpose**: Handle all admin functionality
**Key Functions**:
- `verifyPassword()` - Check admin access
- `loadAdminInterface()` - Show admin UI
- `renderAdminTree()` - Build editable hierarchy
- `showForm()` - Display appropriate forms
- `handleImageUpload()` - Convert to base64
- `saveData()` - Persist to localStorage
- `deleteItem()` - Remove with confirmation
- Form validation and submission

## Data Structure Implementation

### localStorage Schema
```javascript
// Key: storageCatalogData
{
  "suppliers": [
    {
      "id": "uuid-v4-string",
      "name": "Supplier Name",
      "logo": "base64-image-string",
      "companies": [
        {
          "id": "uuid-v4-string", 
          "name": "Company Name",
          "logo": "base64-image-string",
          "products": [
            {
              "id": "uuid-v4-string",
              "name": "Product Name",
              "description": "Product description text",
              "metric": "kg|liter|unit",
              "price": 99.99,
              "image": "base64-image-string"
            }
          ]
        }
      ]
    }
  ]
}
```

### Default Sample Data
- 2 suppliers with logos
- 2 companies per supplier with logos  
- 3 products per company with images
- All images pre-converted to base64
- Realistic names and descriptions

## Technical Implementation

### Core Technologies
- **HTML5**: Semantic markup with accessibility
- **CSS3**: Flexbox, custom properties, transitions
- **Vanilla JavaScript**: ES6+ with no frameworks
- **localStorage API**: Data persistence in browser
- **FileReader API**: Image to base64 conversion

### Key Features
- Password protection (hardcoded: storage2024)
- Image upload and base64 storage
- Collapsible hierarchy with smooth animations
- Responsive design (320px to 1920px)
- Real-time data synchronization
- Form validation and error handling

### Browser Compatibility
- Modern browsers with ES6+ support
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers (iOS Safari, Chrome Mobile)
- localStorage and FileReader API support required

## Development Priorities

### Phase 1: Core Structure
1. Create HTML pages with basic structure
2. Implement CSS dark theme
3. Set up JavaScript modules
4. Create localStorage schema

### Phase 2: Customer View
1. Render supplier hierarchy
2. Implement expand/collapse
3. Style product displays
4. Add responsive layouts

### Phase 3: Admin Interface
1. Password protection
2. Form creation and validation
3. Image upload handling
4. CRUD operations

### Phase 4: Polish
1. Sample data generation
2. Animation refinements
3. Mobile optimization
4. Testing and validation

## Success Criteria
- ✅ All buttons and interactions functional
- ✅ Data persists across page reloads
- ✅ Images display correctly from base64
- ✅ Responsive on all screen sizes
- ✅ No console errors or broken elements
- ✅ Professional minimalist aesthetic achieved