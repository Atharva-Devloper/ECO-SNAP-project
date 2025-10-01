# EcoSnap Design System

## 🎨 Brand Identity

### Brand Values
- **Clean & Green**: Environmental consciousness
- **Community-Driven**: Collaborative problem-solving
- **Accessible**: Easy for everyone to use
- **Trustworthy**: Reliable waste management solution

### Logo Concept
- Primary: 🌍 Globe with camera icon overlay
- Alternative: Leaf + Camera lens combination
- Typography: Modern sans-serif, bold and friendly

---

## 🎨 Color Palette

### Primary Colors
```
Green (Primary)
- #10B981 (emerald-500) - Main brand color
- #059669 (emerald-600) - Hover states
- #047857 (emerald-700) - Active states
- #D1FAE5 (emerald-100) - Light backgrounds
```

### Secondary Colors
```
Blue (Trust & Water)
- #3B82F6 (blue-500) - Information
- #2563EB (blue-600) - Links
- #1E40AF (blue-700) - Dark blue

Orange (Action & Alert)
- #F59E0B (amber-500) - Warnings
- #D97706 (amber-600) - Hover
- #B45309 (amber-700) - Active
```

### Semantic Colors
```
Success: #10B981 (green-500)
Warning: #F59E0B (amber-500)
Error: #EF4444 (red-500)
Info: #3B82F6 (blue-500)
```

### Neutral Colors
```
Gray Scale
- #111827 (gray-900) - Primary text
- #374151 (gray-700) - Secondary text
- #6B7280 (gray-500) - Tertiary text
- #D1D5DB (gray-300) - Borders
- #F3F4F6 (gray-100) - Backgrounds
- #FFFFFF (white) - Cards, surfaces
```

---

## 📝 Typography

### Font Families
```
Primary: 'Inter', 'Segoe UI', system-ui, sans-serif
Monospace: 'Fira Code', 'Courier New', monospace
```

### Font Scale
```
Display: 48px / 3rem (font-bold)
H1: 36px / 2.25rem (font-bold)
H2: 30px / 1.875rem (font-semibold)
H3: 24px / 1.5rem (font-semibold)
H4: 20px / 1.25rem (font-medium)
Body Large: 18px / 1.125rem (font-normal)
Body: 16px / 1rem (font-normal)
Body Small: 14px / 0.875rem (font-normal)
Caption: 12px / 0.75rem (font-normal)
```

### Line Heights
```
Tight: 1.25
Normal: 1.5
Relaxed: 1.75
Loose: 2
```

---

## 📐 Spacing System

### Base Unit: 4px

```
xs: 4px (0.25rem)
sm: 8px (0.5rem)
md: 16px (1rem)
lg: 24px (1.5rem)
xl: 32px (2rem)
2xl: 48px (3rem)
3xl: 64px (4rem)
4xl: 96px (6rem)
```

---

## 🔲 Component Specifications

### Buttons

#### Primary Button
```
Background: #10B981
Text: White
Padding: 12px 24px
Border Radius: 8px
Font: 16px, font-medium
Hover: #059669
Active: #047857
Shadow: 0 1px 3px rgba(0,0,0,0.1)
```

#### Secondary Button
```
Background: White
Text: #10B981
Border: 2px solid #10B981
Padding: 12px 24px
Border Radius: 8px
Hover: Background #D1FAE5
```

#### Icon Button
```
Size: 40px × 40px
Border Radius: 50%
Background: Transparent
Hover: Background #F3F4F6
```

### Input Fields
```
Height: 44px
Padding: 12px 16px
Border: 1px solid #D1D5DB
Border Radius: 8px
Font: 16px
Focus: Border #10B981, Shadow 0 0 0 3px rgba(16,185,129,0.1)
Error: Border #EF4444
```

### Cards
```
Background: White
Border Radius: 12px
Padding: 24px
Shadow: 0 1px 3px rgba(0,0,0,0.1)
Hover: Shadow 0 4px 6px rgba(0,0,0,0.1)
```

### Navigation Bar
```
Height: 64px
Background: White
Border Bottom: 1px solid #E5E7EB
Shadow: 0 1px 2px rgba(0,0,0,0.05)
Padding: 0 24px
```

---

## 📱 Responsive Breakpoints

```
Mobile: 320px - 767px
Tablet: 768px - 1023px
Desktop: 1024px - 1439px
Large Desktop: 1440px+
```

---

## 🎯 Icon System

### Icon Library
- Use: Lucide Icons or Heroicons
- Size: 16px, 20px, 24px, 32px
- Stroke Width: 2px
- Style: Outline (primary), Solid (secondary)

### Common Icons
```
- Camera: Report creation
- Map Pin: Location
- Trophy: Leaderboard
- User: Profile
- Bell: Notifications
- Check Circle: Success
- Alert Circle: Warning
- Trash: Waste/Delete
- Star: Rating
- Plus: Add new
```

---

## 🌊 Animation Guidelines

### Timing Functions
```
Ease Out: cubic-bezier(0, 0, 0.2, 1) - Entrances
Ease In: cubic-bezier(0.4, 0, 1, 1) - Exits
Ease In Out: cubic-bezier(0.4, 0, 0.2, 1) - Transitions
```

### Duration
```
Fast: 150ms - Hover states
Normal: 300ms - Standard transitions
Slow: 500ms - Complex animations
```

### Common Animations
```
Fade In: opacity 0 → 1
Slide Up: translateY(20px) → 0
Scale: scale(0.95) → 1
Bounce: For success feedback
```

---

## 📊 Data Visualization

### Chart Colors
```
Primary: #10B981
Secondary: #3B82F6
Tertiary: #F59E0B
Quaternary: #8B5CF6
Quinary: #EC4899
```

### Chart Types
- **Line Charts**: Trends over time
- **Bar Charts**: Comparisons
- **Pie Charts**: Distribution
- **Heat Maps**: Geographic data

---

## ♿ Accessibility

### Color Contrast
- Text on background: Minimum 4.5:1 ratio
- Large text: Minimum 3:1 ratio
- Interactive elements: Minimum 3:1 ratio

### Focus States
- Visible focus ring: 3px solid #10B981
- Offset: 2px

### Touch Targets
- Minimum size: 44px × 44px
- Spacing: 8px minimum

---

## 📸 Image Guidelines

### Photo Requirements
```
Waste Reports:
- Format: JPEG, PNG
- Max Size: 5MB
- Recommended: 1200px × 900px
- Aspect Ratio: 4:3 or 16:9

Profile Pictures:
- Format: JPEG, PNG
- Max Size: 2MB
- Size: 400px × 400px
- Aspect Ratio: 1:1 (square)
```

### Image Treatment
- Border Radius: 8px (standard), 12px (large)
- Overlay: rgba(0,0,0,0.3) for text on images
- Loading: Skeleton screens with shimmer effect

---

## 🎭 UI Patterns

### Loading States
- Skeleton screens for content
- Spinner for actions
- Progress bars for uploads

### Empty States
- Illustration + message
- Call-to-action button
- Helpful guidance text

### Error States
- Clear error message
- Suggested action
- Retry button

### Success States
- Checkmark animation
- Success message
- Next action suggestion

---

## 📋 Form Design

### Form Layout
- Single column on mobile
- Two columns on desktop (where appropriate)
- Labels above inputs
- Helper text below inputs
- Inline validation

### Validation
- Real-time for format errors
- On blur for required fields
- Clear error messages
- Success indicators

---

## 🗺️ Map Styling

### Map Theme
- Style: Light, clean OpenStreetMap
- Markers: Custom green pins
- Clusters: Circular with count
- Popups: White card with shadow

### Map Controls
- Zoom: Bottom right
- Geolocation: Top right
- Filters: Top left panel
- Legend: Bottom left

---

## 📱 Mobile-First Approach

### Mobile Optimizations
- Bottom navigation for key actions
- Swipe gestures for navigation
- Large touch targets (minimum 44px)
- Simplified layouts
- Progressive disclosure

### Desktop Enhancements
- Sidebar navigation
- Multi-column layouts
- Hover states
- Keyboard shortcuts
- Advanced filters

---

## 🎨 Component Library Structure

### Atomic Design Hierarchy
```
Atoms: Buttons, inputs, icons, labels
Molecules: Form fields, cards, list items
Organisms: Forms, navigation, modals
Templates: Page layouts
Pages: Complete screens
```

---

## 📐 Grid System

### Layout Grid
```
Columns: 12
Gutter: 24px (desktop), 16px (mobile)
Margin: 24px (desktop), 16px (mobile)
Max Width: 1280px
```

### Content Width
```
Narrow: 640px (forms, articles)
Medium: 768px (dashboards)
Wide: 1024px (tables, maps)
Full: 1280px (landing pages)
```
