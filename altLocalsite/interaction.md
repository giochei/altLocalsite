# Storage Catalog Site - Interaction Design

## Core Interaction Flow

### Customer Page (index.html)
**Primary Interaction**: 3-tier collapsible hierarchy with smooth animations

1. **Supplier Level** (Tier 1):
   - Centered 120x120px logo + supplier name
   - Click anywhere on supplier block to expand/collapse
   - Smooth 200ms ease-in-out animation for expand/collapse
   - Arrow indicator shows collapsed/expanded state

2. **Company Level** (Tier 2):
   - Appears under expanded supplier with slight indent
   - Centered 100x100px logo + company name
   - Click to expand/collapse company block
   - Shows list of products when expanded

3. **Product Level** (Tier 3):
   - Left-aligned 80x80px product image
   - Product name in bold
   - Description in smaller font below name
   - Metric + price right-aligned on same line
   - Metric displays as "kg", "liter", or "unit"

**Navigation**:
- Full page width responsive design (320px to 1920px)
- Mobile-first with touch-friendly targets
- No scrolling required for main content
- Smooth hover effects on interactive elements only

### Admin Page (admin.html)
**Access Control**:
1. **Password Entry**:
   - Landing page shows only password input field
   - Hardcoded password: `storage2024`
   - Error message "Access Denied" for wrong password
   - Successful entry reveals full admin interface

2. **Admin Interface Layout**:
   - Left Sidebar (1/3 width): Navigation tree
   - Right Panel (2/3 width): Dynamic forms

**Left Sidebar Interactions**:
1. **Add Supplier Button** (top of sidebar):
   - Click to load supplier form in right panel

2. **Hierarchy Tree**:
   - Suppliers listed vertically
   - Click supplier name to edit (loads supplier form)
   - Delete (×) button next to each supplier
   - Expand supplier to show companies
   - Click company name to edit (loads company form)
   - Delete (×) button next to each company
   - Expand company to show products
   - Click product name to edit (loads product form)
   - Delete (×) button next to each product

**Right Panel Forms**:

1. **Supplier Form**:
   - Name: Text input field
   - Logo: File picker for image upload
   - Save button: Stores data to localStorage
   - Cancel button: Returns to list view

2. **Company Form**:
   - Name: Text input field
   - Logo: File picker for image upload
   - Save button: Stores data to localStorage
   - Cancel button: Returns to list view

3. **Product Form**:
   - Name: Text input field
   - Description: Textarea field
   - Metric: Dropdown (kg/liter/unit)
   - Price: Number input field
   - Product Image: File picker for image upload
   - Save button: Stores data to localStorage
   - Cancel button: Returns to list view

**Data Persistence**:
- All data stored in browser localStorage
- Single key: `storageCatalogData`
- Images stored as base64 strings
- Changes reflect instantly on customer page
- Success message after save operations

**Error Handling**:
- localStorage size monitoring (5MB limit awareness)
- Image size validation before base64 conversion
- Form validation for required fields
- Graceful handling of corrupted data

**Mobile Responsiveness**:
- Admin sidebar stacks below 768px width
- Touch-friendly button sizes (44px minimum)
- Optimized form layouts for mobile input
- Collapsible navigation for small screens