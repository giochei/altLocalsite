# Storage Catalog Site - Design Style Guide

## Design Philosophy

### Color Palette
- **Background**: `#0a0a0a` (pure dark)
- **Text**: `#ffffff` (pure white)
- **Interactive Elements**: `#ffffff` with opacity changes
- **No accent colors** - strictly monochromatic
- **No gradients** - solid colors only

### Typography
- **Font Family**: System sans-serif stack (Inter preferred, falls back to system defaults)
- **Font Sizes**:
  - Supplier Name: 24px, bold
  - Company Name: 20px, medium
  - Product Name: 18px, bold
  - Product Description: 14px, regular
  - Metric/Price: 16px, medium
  - Form Labels: 16px, regular
  - Buttons: 16px, medium

### Visual Language
- **Ultra-minimalist approach** - remove all unnecessary elements
- **Content-first hierarchy** - clear information architecture
- **Collapsible disclosure** - progressive information revelation
- **No visual noise** - no shadows, borders, or decorative elements
- **Geometric precision** - exact pixel measurements and alignment

## Visual Effects

### Used Libraries
- **No external libraries** - pure HTML, CSS, JavaScript only
- **No CDN dependencies** - all resources self-contained
- **Vanilla animations** - CSS transitions and transforms

### Animations
- **Collapse/Expand**: 200ms ease-in-out height transition
- **Hover States**: 150ms ease-in-out opacity changes
- **Form Transitions**: 250ms ease-in-out fade in/out
- **No complex animations** - simple, purposeful motion only

### Styling Approach
- **Mobile-first CSS** - progressive enhancement
- **Flexbox layout** - modern, responsive structure
- **CSS Custom Properties** - consistent spacing and sizing
- **Semantic HTML** - accessible markup structure

### Header Effect
- **No traditional header** - content starts at top of viewport
- **Full-width layout** - edge-to-edge content display
- **Clean top edge** - no navigation bars or branding

### Interactive Feedback
- **Hover Effects**: Opacity reduction to 70% on clickable elements
- **Focus States**: Outline for keyboard navigation
- **Active States**: Slight scale transform (0.98) on press
- **Visual Hierarchy**: Indentation shows parent-child relationships

### Image Treatment
- **Supplier Images**: 120x120px, centered, circular crop
- **Company Images**: 100x100px, centered, circular crop  
- **Product Images**: 80x80px, left-aligned, square
- **Base64 Storage**: Images embedded in localStorage
- **No Image Effects**: Clean display only

### Layout Principles
- **Full Width**: 100% viewport width utilization
- **Responsive Grid**: Adapts from 320px to 1920px
- **Vertical Rhythm**: Consistent 16px baseline grid
- **Content Indentation**: 24px indent per hierarchy level
- **Touch Targets**: Minimum 44px for mobile interaction

### Form Design
- **Clean Inputs**: Borderless with bottom border only
- **File Uploads**: Custom styled buttons with file name display
- **Dropdowns**: Native select elements with custom styling
- **Button Hierarchy**: Primary (white) and secondary (transparent)

### Mobile Optimization
- **Responsive Breakpoints**: 
  - Mobile: 320px - 767px
  - Tablet: 768px - 1023px  
  - Desktop: 1024px+
- **Touch-Friendly**: 44px minimum touch targets
- **Readable Text**: No text smaller than 14px
- **Optimized Spacing**: Increased padding on mobile

### Accessibility
- **High Contrast**: 21:1 contrast ratio (white on black)
- **Keyboard Navigation**: Full tab order support
- **Screen Reader**: Semantic HTML and ARIA labels
- **Focus Indicators**: Visible focus outlines

### Performance
- **No External Requests**: All resources embedded
- **Optimized Images**: Efficient base64 encoding
- **Minimal CSS**: Only essential styles
- **Fast Transitions**: 200ms maximum animation duration