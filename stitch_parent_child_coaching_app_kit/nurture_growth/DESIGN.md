---
name: Nurture & Growth
colors:
  surface: '#fff8f6'
  surface-dim: '#ead6cd'
  surface-bright: '#fff8f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff1eb'
  surface-container: '#feeae0'
  surface-container-high: '#f9e4db'
  surface-container-highest: '#f3ded5'
  on-surface: '#241914'
  on-surface-variant: '#564338'
  inverse-surface: '#3a2e28'
  inverse-on-surface: '#ffede5'
  outline: '#8a7266'
  outline-variant: '#ddc1b3'
  surface-tint: '#9a4600'
  primary: '#9a4600'
  on-primary: '#ffffff'
  primary-container: '#ff8a3d'
  on-primary-container: '#682d00'
  inverse-primary: '#ffb68d'
  secondary: '#005ac4'
  on-secondary: '#ffffff'
  secondary-container: '#4e8eff'
  on-secondary-container: '#00275d'
  tertiary: '#b32053'
  on-tertiary: '#ffffff'
  tertiary-container: '#ff82a0'
  on-tertiary-container: '#800035'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbc9'
  primary-fixed-dim: '#ffb68d'
  on-primary-fixed: '#321200'
  on-primary-fixed-variant: '#763300'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#aec6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004396'
  tertiary-fixed: '#ffd9df'
  tertiary-fixed-dim: '#ffb1c0'
  on-tertiary-fixed: '#3f0017'
  on-tertiary-fixed-variant: '#90003d'
  background: '#fff8f6'
  on-background: '#241914'
  surface-variant: '#f3ded5'
typography:
  question-lg:
    fontFamily: Quicksand
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  question-md:
    fontFamily: Quicksand
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Be Vietnam Pro
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  button-text:
    fontFamily: Quicksand
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  card-padding: 20px
  container-margin: 16px
---

## Brand & Style
The design system is built on the foundation of **connection, growth, and safety**. It bridges the generational gap between parents and adolescents (ages 10-16) by balancing professional coaching reliability with a playful, encouraging energy.

The aesthetic follows a **Modern Tactile** approach:
- **Warmth:** Utilizing a soft, cream-based palette to reduce eye strain and create a "home-like" digital environment.
- **Approachability:** Softened corners and friendly typography invite interaction without being "childish."
- **Clarity:** A structured grid ensures that serious coaching content remains legible and organized.
- **Emotional Resonance:** High-contrast accent colors define the four core pillars of the curriculum, providing instant mental categorization for the user.

## Colors
The palette is divided into functional neutrals and expressive category colors.

**Functional Neutrals**
- **Background:** Always use `#FFFBF5` to maintain a soft, non-clinical feel.
- **Text:** Main body text uses `#2B2B3A` for high legibility, while secondary metadata uses `#6E6E83`.

**Visual Identity System (The 4 Pillars)**
These colors are used to theme specific modules and lesson categories:
- **Group A (Free Time):** Orange `#FF8A3D` — Used for hobbies and leisure content.
- **Group B (Learning):** Blue `#4D8DFF` — Used for academic and cognitive growth.
- **Group C (Family):** Pink `#FF5C8A` — Used for emotional intelligence and family bonding.
- **Group D (Future):** Purple `#9B6DFF` — Used for self-identity and future planning.

**Mode-Specific Application**
- **Child Mode:** High saturation, larger color blocks, and white cards to emphasize a vibrant, safe space.
- **Parent Mode:** More conservative use of category colors; primarily used in charts, progress indicators, and small accents to maintain professional analytical clarity.

## Typography
The typography strategy ensures perfect Vietnamese diacritic rendering while maintaining a friendly persona.

- **Headlines & Questions:** Use **Quicksand**. Its rounded terminals feel organic and non-threatening. For coaching questions, use `question-lg` (28px) to make the inquiry the focal point of the screen.
- **Body & Analytics:** Use **Be Vietnam Pro**. This font is highly legible for long-form advice and analytical data in Parent Mode. 
- **Hierarchy:** Use bold weights for questions and calls-to-action. Use regular weights for descriptive body text and suggestions (14-16px).

## Layout & Spacing
This design system utilizes an **8px linear grid** to maintain mathematical harmony.

- **Mobile First:** Content should live within a `16px` side margin. 
- **Child Mode Layout:** Features larger "tap targets" and increased vertical rhythm (`24px` to `32px` between blocks) to avoid visual clutter and accommodate younger motor skills.
- **Parent Mode Layout:** Uses a more condensed rhythm (`16px` spacing) to allow for data-dense views, such as progress charts and activity logs.
- **Gaps:** Use `16px` (md) for standard element spacing and `8px` (sm) for related items within a component.

## Elevation & Depth
To maintain a "warm" and "safe" feel, this design system avoids harsh, dark shadows.

- **Soft Depth:** Use a very diffused, low-opacity shadow for cards: `0 4px 16px rgba(0,0,0,0.06)`. This makes the white cards feel like they are floating gently above the cream background.
- **Interactive Depth:** Buttons should use a slightly more pronounced shadow upon hover or focus to signify interactability.
- **Parent Mode:** Can utilize "flat" borders (`1px solid #E6E6ED`) for secondary cards to denote a more serious, organized environment for data analysis.

## Shapes
The shape language is dominated by generous curves to communicate friendliness and safety.

- **Main Cards:** Use a `20px` corner radius. This large radius creates a "bubble" effect that feels soft and inviting.
- **Buttons:** Use a `16px` corner radius. This is slightly less than cards to provide a distinct structural difference while remaining cohesive.
- **Chips & Tags:** Always use a **Pill shape** (999px) for category tags (e.g., "Sở thích", "Học tập") to differentiate them from actionable buttons.
- **Selection States:** Radio buttons and checkboxes should follow a softened `4px` or fully circular profile.

## Components

### Buttons (Nút)
- **Primary:** Minimum height `48px`. Background uses the primary category color. Text is Quicksand SemiBold.
- **Secondary:** Transparent background with a `2px` stroke of the primary color.
- **Affordance:** Rounded corners at `16px`.

### Cards (Thẻ)
- **Coach Card:** White background, `20px` radius, soft shadow.
- **Mascot Card (Child Mode):** Feature a larger header area for mascot illustrations to guide the child through tasks.

### Inputs (Ô nhập liệu)
- **Style:** `16px` padding, `12px` radius, background `#FFFFFF`, border `1px solid #E6E6ED`.
- **Focus:** Border changes to the active category color (e.g., Pink for Family topics).

### Chips (Thẻ nhãn)
- **Navigation:** Pill-shaped (999px). 
- **Inactive:** Light grey background with secondary text.
- **Active:** Saturated background (Category color) with white text.

### Charts & Progress (Biểu đồ - Parent Mode)
- **Progress Bars:** Use thick, rounded tracks (`12px` height) with the category color as the fill.
- **Radar Charts:** Used in Parent Mode to show balance across the 4 Topic Groups.

### Vietnamese Language Note
- Ensure all CTA text is concise. 
- Example: Use **"Bắt đầu ngay"** instead of long phrases.
- Use **"Ba mẹ"** for Parent mode and **"Con"** or **"Mình"** for Child mode to keep the tone personal.