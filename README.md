# J Events — Portfolio Site

A clean, animated React portfolio site for an event curator.

## Stack
- React 18
- Vite
- Vanilla CSS (no CSS-in-JS, no Tailwind required)
- IntersectionObserver for scroll animations (no animation library needed)

## Setup

```bash
# 1. Drop these files into your existing React/Vite project, or scaffold a new one:
npm create vite@latest amara-events -- --template react
cd amara-events

# 2. Replace src/ with the provided files

# 3. Install & run
npm install
npm run dev
```

## File structure

```
src/
├── index.css               # All styles + CSS variables + animation classes
├── main.jsx                # Entry point
├── App.jsx                 # Root layout
├── hooks/
│   └── useScrollReveal.js  # IntersectionObserver hook + useCountUp
└── components/
    ├── Reveal.jsx           # Reusable scroll-reveal wrapper
    ├── Nav.jsx
    ├── Hero.jsx             # Hero with animated stat counters
    ├── Services.jsx
    ├── Portfolio.jsx        # Filterable gallery
    ├── Testimonials.jsx
    ├── Booking.jsx          # Contact form
    └── Footer.jsx
```

## Customisation

### Fonts
Loaded via Google Fonts in `index.css` — DM Serif Display (headings) + DM Sans (body).
Swap by changing the `@import` URL and `--font-display` / `--font-body` variables.

### Colours
All colours are CSS variables at the top of `index.css`.
Key ones to update for brand alignment:
- `--color-accent` / `--color-accent-dark` — the warm gold used on stars and section labels
- `--color-bg` — page background (currently warm off-white)
- `--color-text` — primary text (near-black)

### Content
- **Services**: edit the `services` array in `Services.jsx`
- **Events**: edit the `events` array in `Portfolio.jsx`
- **Testimonials**: edit the `testimonials` array in `Testimonials.jsx`
- **Contact details**: update directly in `Booking.jsx`
- **Availability pills**: update the months array in `Booking.jsx`

### Real photos
Replace `.gallery-img` placeholder divs in `Portfolio.jsx` with `<img>` tags.
For the hero, replace the `.hero-visual` div with your image:
```jsx
<img src="/your-hero-photo.jpg" alt="Event highlight" className="hero-visual" style={{ objectFit: 'cover' }} />
```

### Animations
Animation behaviour is controlled by CSS classes in `index.css`:
- `.reveal` — fade up
- `.reveal-left` / `.reveal-right` — slide in from side
- `.reveal-scale` — scale up from 94%
- `.d1`–`.d6` — stagger delay classes

The `Reveal` component accepts `type="up|left|right|scale"` and `delay={1–6}`.

## No external animation libraries required
All animations use CSS transitions triggered by IntersectionObserver.
Zero dependency overhead.
