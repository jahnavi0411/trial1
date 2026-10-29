---
name: Academic Document Precision
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf3'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e8eeff'
  surface-container-high: '#dfe8ff'
  surface-container-highest: '#d8e3fc'
  on-surface: '#101c2e'
  on-surface-variant: '#424751'
  inverse-surface: '#263144'
  inverse-on-surface: '#ecf0ff'
  outline: '#727782'
  outline-variant: '#c2c6d2'
  surface-tint: '#245fa6'
  primary: '#215ca3'
  on-primary: '#ffffff'
  primary-container: '#4075be'
  on-primary-container: '#fefcff'
  inverse-primary: '#a7c8ff'
  secondary: '#406653'
  on-secondary: '#ffffff'
  secondary-container: '#bfe9d1'
  on-secondary-container: '#446a57'
  tertiary: '#006a40'
  on-tertiary: '#ffffff'
  tertiary-container: '#148553'
  on-tertiary-container: '#f6fff5'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#a7c8ff'
  on-primary-fixed: '#001b3c'
  on-primary-fixed-variant: '#004689'
  secondary-fixed: '#c2ecd4'
  secondary-fixed-dim: '#a6d0b9'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#284e3c'
  tertiary-fixed: '#92f7bb'
  tertiary-fixed-dim: '#76daa0'
  on-tertiary-fixed: '#002111'
  on-tertiary-fixed-variant: '#005230'
  background: '#f9f9ff'
  on-background: '#101c2e'
  surface-variant: '#d8e3fc'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
  mono-data:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  mono-data-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 1.5rem
  space-2xs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
  space-2xl: 2rem
  space-3xl: 3rem
---

## Brand & Style

This design system is engineered for faculty members, academic auditors, and department heads who evaluate and certify syllabus documents under stringent compliance frameworks. The visual ethos combines the editorial precision of high-density documentation platforms with the calm, methodical rigor of academic publishing.

The design movement is **Structured Utilitarian Editorial**:
- **Clarity over Ornamentation:** No gratuitous illustrations, glassmorphism, or expressive decorative gradients. Visual weight is carried entirely by typography, information density, and precise surface separations.
- **Document-First Ergonomics:** Canvas areas treat syllabus sheets, outcome mapping matrices, and accreditation audits as tactile, elevated sheets of paper embedded within an architectural workspace.
- **Deliberate Frictionlessness:** Academic compliance requires intense cognitive focus. The UI minimizes distraction using muted cool neutrals, predictable grid alignments, and restrained semantic alerts that direct attention strictly to validation errors and approval state transitions.

## Colors

The palette establishes an authoritative, collegiate environment using cool mineral tones and disciplined functional accents.

### Surface and Structure
- **Canvas Base:** `#F8FAFC` (Slate 50) delivers an eye-resting, cool background for extensive reading.
- **Card & Sheet Elevation:** `#FFFFFF` (Pure White) defines content blocks, data panels, and matrix surfaces.
- **Subtle Surface Secondary:** `#F1F5F9` (Slate 100) provides structure for table headers, inactive step items, and input container rests.
- **Structural Dividers:** `#E2E8F0` (Slate 200) for standard 1px container frames and table gridlines; `#CBD5E1` (Slate 300) for active borders, focus rings, and high-emphasis boundaries.

### Typography & Content
- **Text Primary:** `#0F172A` (Slate 900) for all document titles, section headers, and primary data values.
- **Text Secondary:** `#334155` (Slate 700) for field labels, prose body text, and matrix descriptors.
- **Text Muted / Metadata:** `#6C778D` for captions, tabular indices, timestamps, and hint text.

### Brand Accents
- **Primary Scholarly Blue:** `#4378c1` conveys institutional rigor; applied to primary commit actions, active navigation anchors, and formal signatures.
- **Primary Hover / Active:** `#36619e` provides instantaneous feedback on interactive primary targets.
- **Secondary Accent:** `#587f6b` signals interactive state changes, selected table cells, and active tabs.

### Semantic Triage Tokens
- **Success / Validated:** `#198856` text/icon on `#F0FDF4` background with `#BBF7D0` stroke. Indicates compliant learning outcomes and completed audit checks.
- **Warning / Review Required:** `#D97706` text/icon on `#FFFBEB` background with `#FDE68A` stroke. Highlights mapping imbalances or non-blocking deviations.
- **Error / Blocker:** `#DC2626` text/icon on `#FEF2F2` background with `#FECACA` stroke. Applied to unmapped competencies, credit allocation errors, and rejected steps.
- **Pending / Inactive:** `#6C778D` text on `#F8FAFC` background with `#E2E8F0` stroke.

## Typography

The typographic hierarchy prioritizes systematic readability across dense course catalogs, credit metrics, and mapping tables.

- **System Stack:** Driven by `Inter` across all functional UI, running with standard font-feature settings: `"cv02", "cv03", "cv04", "cv11"` enabled for maximum legibility of glyphs such as `1`, `l`, and `I`.
- **Numeric Integrity:** Data tables, outcome matrices, credit breakdowns, and index counters must enforce `font-variant-numeric: tabular-nums` to prevent column alignment jitter during inline edits.
- **Technical Tokens:** Course codes (e.g., `CS304`, `EN-2024-B`), accreditation criteria identifiers (e.g., `PO1.3`, `CO4`), and system timestamps utilize `JetBrains Mono` for rapid scanning and disambiguation.
- **Micro Labels:** Badges, compliance statuses, and table headers employ `label-sm` with explicit uppercase tracking (`0.04em`) to ensure legibility when rendered at small scale.

## Layout & Spacing

The workspace operates on an exacting 8-point base grid (with 4-point micro-increments for compact form elements and status chips). The interface is tailored for standard desktop and laptop displays (1366px to 1920px), where compliance verification typically occurs.

### Shell Architecture
- **Persistent Header:** 56px fixed height (`h-14`), spanning full viewport width with a solid `#FFFFFF` background and a 1px border (`#E2E8F0`) at the bottom.
- **Workflow Stepper Sidebar:** 240px fixed width (`w-60`), anchored on the left. Steps (Upload, Spec, CO-PO-PSO Map, Checks, Workflow, Export) stack vertically with 4px gap and 8px internal item padding.
- **Contextual Inspector / Audit Panel:** Optional 320px collapsible right drawer for validation warnings and comment threads.
- **Main Workspace Canvas:** Fluid container constrained to an optimal reading and editing maximum width of 1120px when viewing narrative specs, expanding to 100% width with sticky column layouts during matrix alignment sessions.

### Layout Adaptations
- **Desktop (1366px+):** Sidebar remains locked. Audit checklists display side-by-side with document segments.
- **Compact Desktop / Tablet (1024px – 1365px):** Left navigation steps condense to an icon-and-rail indicator (64px width). Audit inspector collapses into a sticky overlay tray.
- **Sub-1024px:** Displays a restricted notification view prioritizing basic review actions over complex multi-column outcome matrix editing.

## Elevation & Depth

Visual hierarchy uses **Tactile Paper Surfaces with Crisp Structural Borders**. The system rejects heavy drop shadows, relying instead on 1px precision boundary lines supplemented by micro-shadows.

### Layer Stack
- **Floor (Canvas):** `#F8FAFC`. Zero elevation, zero shadow.
- **Level 1 (Paper Cards, Grid Sections, Sidebar):** Pure `#FFFFFF` resting against the floor. Defined by a continuous 1px outline in `#E2E8F0` and an imperceptible micro-shadow: `0 1px 2px 0 rgba(15, 23, 42, 0.04)`.
- **Level 2 (Dropdowns, Role Pickers, Matrix Tooltips, Sticky Headers):** `#FFFFFF` framed by a 1px border in `#CBD5E1`, with a focused ambient drop: `0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05)`.
- **Level 3 (Modal Dialogs, Certification Sign-Off Sheets):** Centered `#FFFFFF` containers framed with `#4378c1` at 12% alpha border, elevated by `0 12px 24px -4px rgba(15, 23, 42, 0.12)`, masked over a `#0F172A` backdrop at 40% opacity.

### Matrix Data Focus
Inside the Outcome Alignment matrix, active and editable cells receive an inset ring (`box-shadow: inset 0 0 0 1.5px #587f6b`) rather than outward elevation, preserving column geometry and table alignment.

## Shapes

The design system employs a **Soft Structural Geometry (`roundedness: 1`)** that reflects classic editorial layouts and engineering software.

- **Base Radius (4px / 0.25rem):** Standard interactive surfaces including text input fields, table cell selectors, status chips, standard buttons, and tab segment items.
- **Card & Panel Radius (8px / 0.5rem - `rounded-lg`):** Content containers, elevated sheets, modal dialogs, and verification summary cards.
- **Pill Exceptions (9999px):** Strictly reserved for dynamic role switcher chips (`Author`, `Reviewer`, `HOD`) and primary lifecycle badges (`In Review`, `Draft`, `Approved`) to clearly delineate system-level state flags from interactive data inputs.

## Components

### Buttons
- **Primary:** `#4378c1` background, white label, 4px corner radius. In hover state: `#36619e`. Focus state: 2px offset ring in `#587f6b`. Padding: 8px vertical, 14px horizontal for standard; 6px vertical, 10px horizontal for compact.
- **Secondary / Outline:** `#FFFFFF` background with 1px `#CBD5E1` border, `#334155` text. On hover: `#F8FAFC` background with `#0F172A` text.
- **Destructive / Reject:** `#FEF2F2` background, 1px `#FECACA` border, `#DC2626` text. On hover: `#FEE2E2`.

### Status Badges & Chips
- Status tokens use a pill shape (9999px radius), `label-sm` font, with a 6px status dot on the left.
- **Approved / Verified:** Background `#F0FDF4`, border `#BBF7D0`, text `#198856`.
- **In Review / Attention:** Background `#FFFBEB`, border `#FDE68A`, text `#D97706`.
- **Critical / Flagged:** Background `#FEF2F2`, border `#FECACA`, text `#DC2626`.
- **Draft / Inactive:** Background `#F1F5F9`, border `#E2E8F0`, text `#6C778D`.

### Step Navigation (Left Rail)
- Vertical list item format with 8px padding and 4px radius.
- **Active Step:** `#F1F5F9` background, 2px solid `#4378c1` left indicator border, `#4378c1` semi-bold text, and deep navy icon.
- **Completed Step:** `#F8FAFC` background, muted `#6C778D` text with an emerald check indicator icon.
- **Blocked / Attention Step:** Subtle red/amber dot anchored on the right edge of the step label.

### Form Inputs & Textareas
- Inset canvas background `#FFFFFF`, 1px border `#CBD5E1`, 4px radius, 8px vertical by 12px horizontal padding.
- Focused state transitions border to `#4378c1` with an auxiliary `0 0 0 1px #4378c1` outline. Error state uses `#DC2626` border and focus ring.
- Labels sit above inputs in `label-md` Slate 700 with a 4px gap.

### CO-PO-PSO Alignment Matrix
- **Headers:** Sticky top and left headers in `#F8FAFC` with bold uppercase codes (`mono-data-sm`) and 1px `#E2E8F0` borders.
- **Cells:** Fixed-width 48x48px squares, center-aligned, supporting integer correlation weights (0, 1, 2, 3) or qualitative tags.
- **Hover & Selection:** Cell hover triggers subtle `#F1F5F9` shading. Active edit state renders a 1.5px inset border in `#587f6b`. Column and row headers highlight synchronously to maintain row/column alignment.

### Data Tables
- Header row uses `#F1F5F9` with 10px vertical padding, 12px horizontal padding, and uppercase `label-sm` slate text.
- Rows use `#FFFFFF` backgrounds separated by 1px `#E2E8F0` horizontal lines. Alternating hover state: `#F8FAFC`.
- Numeric columns enforce right alignment with `mono-data` typography.

### Document Cards
- Structured 8px-radius panels with a `#FFFFFF` core, a 1px border in `#E2E8F0`, and an internal 16px padding.
- Header bars are split horizontally: document meta title on the left, action menus and certification stamps on the right.