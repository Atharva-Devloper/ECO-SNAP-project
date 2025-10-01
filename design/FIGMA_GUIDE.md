# Figma Design Guide for EcoSnap

## 🎯 Getting Started with Figma

### 1. Create Figma Account
- Go to [figma.com](https://figma.com)
- Sign up for free account
- Install Figma Desktop App (optional but recommended)

### 2. Project Structure

Create a new Figma file with the following pages:

```
📁 EcoSnap Design System
  ├── 🎨 Design Tokens (Colors, Typography, Spacing)
  ├── 🧩 Components (Buttons, Inputs, Cards, etc.)
  ├── 📱 Mobile Screens
  ├── 💻 Desktop Screens
  ├── 🔄 User Flows
  └── 📋 Prototypes
```

---

## 🎨 Setting Up Design Tokens

### Step 1: Create Color Styles

1. **Create a frame** (F) named "Color Palette"
2. **Add rectangles** (R) for each color
3. **Right-click** each color → Create Style
4. **Name them** using this convention:
   ```
   Primary/Green/500
   Primary/Green/600
   Primary/Green/700
   Neutral/Gray/100
   Neutral/Gray/900
   Semantic/Success
   Semantic/Error
   ```

### Color Palette to Add:
```
Primary Colors:
- #10B981 (emerald-500)
- #059669 (emerald-600)
- #047857 (emerald-700)
- #D1FAE5 (emerald-100)

Secondary Colors:
- #3B82F6 (blue-500)
- #2563EB (blue-600)
- #F59E0B (amber-500)

Semantic:
- Success: #10B981
- Warning: #F59E0B
- Error: #EF4444
- Info: #3B82F6

Neutrals:
- Gray 900: #111827
- Gray 700: #374151
- Gray 500: #6B7280
- Gray 300: #D1D5DB
- Gray 100: #F3F4F6
- White: #FFFFFF
```

### Step 2: Create Text Styles

1. **Create text layers** (T) for each style
2. **Set font**: Inter (or download from Google Fonts)
3. **Right-click** → Create Style
4. **Name them**:
   ```
   Heading/H1
   Heading/H2
   Heading/H3
   Body/Large
   Body/Regular
   Body/Small
   Caption
   ```

### Typography Settings:
```
Display: Inter Bold, 48px, Line height 1.2
H1: Inter Bold, 36px, Line height 1.25
H2: Inter Semibold, 30px, Line height 1.3
H3: Inter Semibold, 24px, Line height 1.4
H4: Inter Medium, 20px, Line height 1.5
Body Large: Inter Regular, 18px, Line height 1.5
Body: Inter Regular, 16px, Line height 1.5
Body Small: Inter Regular, 14px, Line height 1.5
Caption: Inter Regular, 12px, Line height 1.5
```

### Step 3: Create Effect Styles (Shadows)

1. **Create rectangles** with shadows
2. **Select** → Effects → Drop Shadow
3. **Right-click** → Create Style

### Shadow Styles:
```
Shadow/Small:
- Y: 1px, Blur: 3px, Color: #000000 10%

Shadow/Medium:
- Y: 4px, Blur: 6px, Color: #000000 10%

Shadow/Large:
- Y: 10px, Blur: 15px, Color: #000000 10%

Shadow/Focus:
- Spread: 3px, Color: #10B981 10%
```

---

## 🧩 Creating Components

### Button Component

1. **Create frame** (F): 160px × 44px
2. **Add text**: "Button"
3. **Set styles**:
   - Background: Primary/Green/500
   - Text: White, Body/Regular
   - Corner radius: 8px
   - Padding: 12px 24px
4. **Create component** (Ctrl/Cmd + Alt + K)
5. **Add variants**:
   - Primary, Secondary, Outline
   - Default, Hover, Active, Disabled
6. **Add auto-layout** (Shift + A)

### Input Field Component

1. **Create frame**: 320px × 44px
2. **Add layers**:
   - Label (text)
   - Input box (rectangle with border)
   - Placeholder text
   - Icon (optional)
3. **Set styles**:
   - Border: 1px, Gray/300
   - Corner radius: 8px
   - Padding: 12px 16px
4. **Create component** with variants:
   - Default, Focus, Error, Disabled

### Card Component

1. **Create frame**: 320px × auto
2. **Add auto-layout** (Shift + A)
3. **Set styles**:
   - Background: White
   - Corner radius: 12px
   - Shadow: Shadow/Small
   - Padding: 24px
4. **Add content**:
   - Image placeholder
   - Title text
   - Body text
   - Button
5. **Create component**

---

## 📱 Designing Mobile Screens

### Frame Setup

1. **Create frame** (F)
2. **Choose preset**: iPhone 14 Pro (393 × 852)
3. **Name it**: "Mobile - Landing Page"

### Layout Grid

1. **Select frame** → Layout Grid
2. **Add grid**:
   - Columns: 4
   - Margin: 16px
   - Gutter: 16px

### Design Tips

- Use **auto-layout** for responsive components
- Create **reusable components** for headers, footers
- Use **constraints** for responsive behavior
- Add **padding** using auto-layout spacing

### Screens to Create

1. **Landing Page**
   - Hero section
   - Features
   - CTA buttons
   - Stats

2. **Login/Register**
   - Logo
   - Form fields
   - Social login buttons
   - Links

3. **Dashboard**
   - Stats cards
   - Quick actions
   - Recent activity list

4. **Report Form**
   - Photo upload area
   - Location picker
   - Category dropdown
   - Description textarea

5. **Map View**
   - Full-screen map
   - Filters button
   - Bottom sheet with details

---

## 💻 Designing Desktop Screens

### Frame Setup

1. **Create frame** (F)
2. **Choose preset**: Desktop (1440 × 1024)
3. **Name it**: "Desktop - Landing Page"

### Layout Grid

1. **Select frame** → Layout Grid
2. **Add grid**:
   - Columns: 12
   - Margin: 80px
   - Gutter: 24px
   - Max width: 1280px (center)

### Navigation

1. **Create horizontal nav bar**:
   - Height: 64px
   - Logo left
   - Menu items center
   - CTA buttons right

2. **Create sidebar** (for dashboards):
   - Width: 240px
   - Fixed left
   - Navigation items

---

## 🎭 Adding Interactions

### Button Hover State

1. **Select button component**
2. **Switch to Prototype tab**
3. **Add interaction**:
   - Trigger: While hovering
   - Action: Change to → Hover variant
   - Animation: Instant

### Page Navigation

1. **Select button/link**
2. **Prototype tab** → Add interaction
3. **Settings**:
   - Trigger: On click
   - Action: Navigate to → [Target screen]
   - Animation: Smart animate
   - Duration: 300ms
   - Easing: Ease out

### Modal/Overlay

1. **Create modal component** on separate frame
2. **Add interaction**:
   - Trigger: On click
   - Action: Open overlay
   - Position: Center
   - Close when clicking outside: Yes

---

## 🔄 Creating User Flows

### Flow Diagram

1. **Create new page**: "User Flows"
2. **Use FigJam** (built into Figma) or regular frames
3. **Add shapes**:
   - Rectangles for screens
   - Diamonds for decisions
   - Arrows for flow
4. **Color code**:
   - Green: Success path
   - Red: Error path
   - Blue: Alternative path

### Example Flow: Report Creation

```
[Landing] → [Login] → [Dashboard] → [New Report] →
[Upload Photo] → [Add Location] → [Category] →
[Description] → [Review] → [Submit] → [Success]
                                    ↓
                                [Error] → [Retry]
```

---

## 📋 Creating Prototypes

### Interactive Prototype

1. **Link all screens** using interactions
2. **Set starting frame**:
   - Select first screen
   - Right-click → Set as starting frame

3. **Add transitions**:
   - Use "Smart Animate" for smooth transitions
   - Set duration: 300ms
   - Easing: Ease out

### Present Mode

1. **Click Play button** (top right)
2. **Choose device**: iPhone or Desktop
3. **Share link** for stakeholder review

---

## 🎨 Design Best Practices

### Consistency

- Use **components** for repeated elements
- Apply **styles** consistently
- Maintain **spacing** using 8px grid

### Organization

- **Name layers** clearly
- **Group related items** (Ctrl/Cmd + G)
- **Use frames** for sections
- **Lock background layers**

### Responsiveness

- Use **auto-layout** for flexible components
- Set **constraints** (left, right, center, scale)
- Test different **screen sizes**

### Accessibility

- **Color contrast**: Minimum 4.5:1 for text
- **Touch targets**: Minimum 44px × 44px
- **Focus states**: Visible on all interactive elements
- **Alt text**: Add descriptions to images

---

## 🔌 Useful Figma Plugins

### Essential Plugins

1. **Iconify** - Access thousands of icons
2. **Unsplash** - Free stock photos
3. **Content Reel** - Generate realistic content
4. **Stark** - Accessibility checker
5. **Autoflow** - Create user flow diagrams
6. **Figma to Code** - Export to HTML/CSS

### Installation

1. **Menu** → Plugins → Browse plugins
2. **Search** for plugin name
3. **Click Install**
4. **Access**: Right-click → Plugins

---

## 📤 Exporting Assets

### Export Settings

1. **Select layer/frame**
2. **Export panel** (bottom right)
3. **Add export setting**:
   - Format: PNG, SVG, or JPG
   - Scale: 1x, 2x, 3x (for retina)

### Batch Export

1. **Select multiple layers**
2. **Add suffix** to names: @2x, @3x
3. **Export all** at once

### For Developers

1. **Select frame** → Code tab
2. **Copy CSS** or **iOS/Android code**
3. **Export assets** with naming convention:
   ```
   icon-home.svg
   button-primary.png
   logo@2x.png
   ```

---

## 🤝 Collaboration

### Sharing with Team

1. **Share button** (top right)
2. **Set permissions**:
   - Can view
   - Can edit
3. **Copy link** and share

### Comments

1. **Comment tool** (C)
2. **Click anywhere** to add comment
3. **Tag team members**: @name
4. **Resolve** when addressed

### Version History

1. **Menu** → File → Show version history
2. **View previous versions**
3. **Restore** if needed
4. **Name important versions**

---

## 📚 Resources

### Learning Resources

- [Figma Official Tutorials](https://www.figma.com/resources/learn-design/)
- [Figma YouTube Channel](https://www.youtube.com/c/Figmadesign)
- [Figma Community](https://www.figma.com/community) - Free templates

### Design Inspiration

- [Dribbble](https://dribbble.com) - Design showcase
- [Behance](https://www.behance.net) - Project portfolios
- [Mobbin](https://mobbin.com) - Mobile app designs
- [Land-book](https://land-book.com) - Landing page gallery

### Icon Libraries

- [Heroicons](https://heroicons.com)
- [Lucide Icons](https://lucide.dev)
- [Feather Icons](https://feathericons.com)
- [Material Icons](https://fonts.google.com/icons)

---

## ✅ Design Checklist

### Before Handoff to Development

- [ ] All screens designed for mobile and desktop
- [ ] Components created and organized
- [ ] Color and text styles applied consistently
- [ ] Spacing follows 8px grid system
- [ ] Interactive prototype created
- [ ] Accessibility checked (contrast, touch targets)
- [ ] Assets exported with proper naming
- [ ] Design specs documented
- [ ] Stakeholder approval received
- [ ] Developer handoff meeting scheduled

---

## 🎯 Next Steps

1. **Create Figma account** if you don't have one
2. **Set up design tokens** (colors, typography)
3. **Build component library** (buttons, inputs, cards)
4. **Design key screens** (landing, login, dashboard)
5. **Create interactive prototype**
6. **Share with stakeholders** for feedback
7. **Iterate based on feedback**
8. **Prepare for developer handoff**

---

**Note**: This guide provides the framework. The actual design work should be done in Figma using the wireframes and design system specifications provided in the other documentation files.
