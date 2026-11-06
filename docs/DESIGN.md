# Design Document: Travel Planner

## 1. Design Philosophy

The Travel Planner application follows a **modern, immersive, and user-centric** design philosophy. The primary goal is to create a visually stunning experience that evokes the feeling of travel and exploration while maintaining clarity, usability, and accessibility. The design leverages the power of **DaisyUI** for consistent theming and **Tailwind CSS** for rapid, utility-first styling, allowing for a clean, maintainable, and highly customizable codebase.

### 1.1 Core Principles

- **Immersive Visuals:** High-quality imagery and subtle animations create a sense of wanderlust and adventure.
- **Clarity and Readability:** Information is presented with clear hierarchies, ensuring users can quickly find what they need.
- **Responsive & Fluid:** The design adapts seamlessly to all screen sizes, from mobile to desktop.
- **Brand Consistency:** A cohesive color palette and typography system ensure a unified brand identity.
- **Accessibility:** The design adheres to accessibility best practices, ensuring a usable experience for everyone.

---

## 2. Color Palette & Theming

The application uses a dynamic theming system powered by **DaisyUI**. This allows users to switch between multiple pre-built themes, each with its own color scheme, offering a personalized experience.

### 2.1 Default Theme (Dark)

The default theme is a **dark theme**, chosen to create a modern, elegant, and cinematic feel. It reduces eye strain and makes the vibrant hero imagery and golden accent colors "pop."

- **Base Colors (Dark Theme):**
  - **Background:** `#0d1f1a`, `#152b24`, `#142922` (Deep, dark greens with a subtle warm undertone).
  - **Text (Base Content):** `oklch(var(--bc))` (Typically a light gray/white for high contrast).
  - **Primary Accent:** `oklch(var(--p))` (Customizable via DaisyUI).
  - **Secondary Accent:** `oklch(var(--s))` (Customizable via DaisyUI).

### 2.2 Custom Accent Colors (Hero & Branding)

A custom **Golden/Amber** gradient is used as a primary visual hook across the hero section and key interactive elements, creating a warm, inviting, and "premium" feel.

| Usage                     | CSS Variable / Value                                                          |
| :------------------------ | :---------------------------------------------------------------------------- |
| **Hero Heading Accent**   | `#f97c16` (Orange)                                                            |
| **Hero Tagline Gradient** | `linear-gradient(135deg, #F9E79F 0%, #F7DC6F 25%, #EA8E01 70%, #D35400 100%)` |
| **Primary CTA Button**    | `bg-white/10` with `hover:bg-white/20` and a golden border glow.              |
| **Navbar Gradient**       | `linear-gradient(to right, #FB923C, #FACC15, #60A5FA)` (Orange-Yellow-Blue)   |
| **Scrollbar**             | `linear-gradient(to bottom, #FB923C, #FACC15, #60A5FA)`                       |

### 2.3 Theme-Specific Variables

The design uses CSS variables to allow theme-specific customizations, ensuring a consistent look across different DaisyUI themes.

```css
/* Example: Hero accent colors vary per theme */
[data-theme="dark"] {
  --hero-accent-color: #fb923c;
  --hero-button-bg: #fb923c;
  --hero-button-hover: #f97316;
}

[data-theme="cupcake"] {
  --hero-accent-color: #f59e0b;
  --hero-button-bg: #f59e0b;
  --hero-button-hover: #d97706;
}
```

---

## 3. Typography

The application uses a carefully selected, hierarchical typography system to enhance readability and visual appeal.

### 3.1 Font Family

- **Primary Font (`--font-primary`):** **'Bebas Neue', sans-serif**. Used for bold, impactful headlines (e.g., the main hero title). It provides a strong, modern, and commanding presence.
- **Secondary Font (`--font-secondary`):** **'Rancho', cursive**. A more playful, handwritten-style font used for the main tagline, adding a personal and adventurous touch.
- **Body Font (`--font-body`):** **'Joan', serif**. A clean, readable serif font used for body text and descriptions, providing contrast and sophistication to the sans-serif headlines.

### 3.2 Font Utilities

CSS utility classes are defined to apply these fonts consistently:

```css
.font-primary {
  font-family: var(--font-primary);
}
.font-secondary {
  font-family: var(--font-secondary);
}
.font-body {
  font-family: var(--font-body);
}
```

### 3.3 Hero Typography Scale

The hero section features a clear typographic hierarchy to guide the user's eye.

| Element          | Font Size (Desktop) | Font Size (Mobile) | Font Family | Weight   | Color               |
| :--------------- | :------------------ | :----------------- | :---------- | :------- | :------------------ |
| **"Explore"**    | `42px`              | `24px`             | Bebas Neue  | Normal   | White               |
| **"Bangladesh"** | `120px`             | `56px`             | Bebas Neue  | Normal   | White               |
| **Tagline**      | `34px`              | `22px`             | Rancho      | Medium   | Golden Gradient     |
| **Description**  | `19px`              | `14px`             | Joan        | Regular  | White / 90% opacity |
| **CTA Button**   | `17px`              | `14px`             | System      | Semibold | White               |

---

## 4. Layout & Components

### 4.1 Hero Section

The hero section is designed to be an immersive, full-viewport introduction to the application.

- **Full-Screen Background:** A high-quality, full-bleed background image (`hero2.jpg`) creates immediate visual impact.
- **Gradient Overlays:** Multiple layered gradients (`oklch(0% / 0.80)`) ensure that the text remains readable against the background image.
- **Floating Elements:** Subtle, blurred circular elements add depth and a sense of motion.
- **Call-to-Action:** A primary "PLAN YOUR TRIP" button with a "glassmorphism" style, an animated shine effect, and a hover state that scales and glows to draw user interaction.
- **Scroll Indicator:** A subtle, animated down arrow indicates to the user that more content is below.

### 4.2 Destinations Section

This section showcases the core content of the application: the destinations.

- **Two-Column Layout (Desktop):** A left sidebar lists destination names, and the right panel displays a large, detailed view of the selected destination.
- **Interactive List:** The list items are buttons. On hover, they have a subtle background change. On selection, they highlight with a golden gradient text and a glowing arrow indicator.
- **Detailed View Panel:**
  - Features a large, brightness-enhanced image of the destination.
  - Includes a location overlay and a title.
  - Displays a description and a grid of "places to visit" with emojis.
  - Includes action buttons ("Plan Your Trip" and "Learn More").
- **Glassmorphism Effects:** The content cards use `backdrop-filter: blur(20px)` to create a modern, "frosted glass" aesthetic.

### 4.3 Theme Switcher

A dropdown component allows users to switch between over 20 pre-built DaisyUI themes. It is located in the application's navigation bar for easy access.

---

## 5. Visual Effects & Interactions

A variety of CSS animations and transitions are used to create a polished, dynamic user experience.

- **Animations:**
  - `gradient-shift`: Creates a smooth, moving gradient effect on text and elements.
  - `gradient-pulse`: Adds a pulsing effect to gradient elements.
  - `bounce`: Used for the hero's scroll indicator.
  - `float` & `float-delayed`: Creates a floating effect for decorative background elements.
- **Hover Effects:**
  - Subtle scaling (`hover:scale-[1.03]`) on buttons and interactive cards.
  - Animated "shine" effects (sliding gradient) over buttons.
  - Color transitions (`hover:border-amber-400/50`).
- **Glassmorphism:** `backdrop-filter: blur(20px)` is applied to various cards and overlays to create a modern, layered look.
- **Custom Scrollbar:** The scrollbar is styled with the brand's Orange-Yellow-Blue gradient for a consistent experience.

---

## 6. Responsiveness

The design is fully responsive and follows a **mobile-first** approach. Breakpoints are defined using Tailwind CSS's responsive utilities.

| Breakpoint                     | Approach                                                                                |
| :----------------------------- | :-------------------------------------------------------------------------------------- |
| **Mobile (default)**           | Single-column layout. Hero text is scaled down. Padding is reduced.                     |
| **Tablet (sm: 640px)**         | Increased padding and font sizes. Two-column layout begins for the Destination section. |
| **Desktop (lg: 1024px)**       | Full two-column layout. Optimal padding and spacing. Max container width (`1280px`).    |
| **Large Desktop (xl: 1280px)** | Maximum padding and font sizes. The hero text reaches its largest scale.                |

---

## 7. Utility & Style Classes

Several custom CSS classes are defined to maintain consistency and ease of use across the project.

| Class Name                          | Purpose                                                                         |
| :---------------------------------- | :------------------------------------------------------------------------------ |
| `.gradient-orange-yellow-blue`      | Applies a linear gradient (Orange-Yellow-Blue) to backgrounds.                  |
| `.gradient-orange-yellow-blue-text` | Applies a linear gradient (Orange-Yellow-Blue) to text using `background-clip`. |
| `.glass-premium`                    | Applies a white, semi-transparent glassmorphism effect.                         |
| `.glass-premium-dark`               | Applies a dark, semi-transparent glassmorphism effect.                          |
| `.transition-smooth`                | Applies a smooth cubic-bezier transition (0.3s).                                |
| `.transition-slow`                  | Applies a slower cubic-bezier transition (0.5s).                                |
| `.hero-heading`                     | Sets the text color to the hero heading color (`--hero-heading-color`).         |
| `.hero-accent`                      | Sets the text color to the hero accent color (`--hero-accent-color`).           |

---

## 8. Accessibility (A11Y)

Accessibility is a key consideration in the design:

- **Color Contrast:** The color palette is chosen to meet WCAG contrast guidelines, ensuring text is readable against backgrounds.
- **Semantic HTML:** Components are built using semantic HTML elements (`<section>`, `<h1>`, `<button>`, etc.).
- **Focus States:** Interactive elements have visible focus styles for keyboard navigation.
- **ARIA Labels:** Where necessary, ARIA labels are used to provide context for screen readers.
- **Reduced Motion:** The `@media (prefers-reduced-motion)` query is not explicitly defined in the provided code, but is a recommended best practice for future development to respect user preferences.

---

## 9. Future Design Enhancements

As the project grows, the following design improvements are planned:

- **Loading Skeletons:** Implement skeleton loaders for the destination section to improve the perceived performance.
- **Dark/Light Mode Toggle:** Dedicate a more prominent UI element for theme switching.
- **Interactive Maps:** Integrate custom-styled Google Maps with location pins.
- **Micro-interactions:** Add more granular animations (e.g., on page load, item reveal animations) using a library like Framer Motion or pure CSS.
- **Typography Refinement:** Fine-tune the font hierarchy for even better readability and visual balance.
