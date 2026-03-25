# Apex Customs

## Current State
New project. Empty backend and frontend scaffolding.

## Requested Changes (Diff)

### Add
- Multi-page React frontend with 5 pages: Homepage, The Garage (Services), Project Archive, Parts Shop, Contact/Booking
- Backend data models: services, project cars with specs, parts/products, contact/booking form submissions
- Homepage with hero section (video background placeholder), Build of the Month spotlight, Performance Stats ticker
- The Garage page: grid of 4 services (ECU Remapping, Suspension Geometry, Forced Induction, Aesthetic Widebody Kits) with pricing tiers
- Project Archive: gallery grid with spec sheet overlays (BHP, Nm torque, 0-60 time, stage level)
- Parts Shop: product catalog with categories (Turbos, Exhausts, Alloy Wheels), add to cart UI
- Contact/Booking page: form with booking type (Dyno Session / Tuner Consult), car details, datetime preference
- Glassmorphism navbar with page links
- Performance Stats ticker with live-style metrics
- Responsive mobile-first layout

### Modify
- N/A (new project)

### Remove
- N/A

## Implementation Plan
1. Generate Motoko backend with: services catalog, project archive (cars + specs), parts shop inventory, booking/contact form submission storage
2. Build React frontend with React Router for multi-page navigation
3. Implement cyber-mechanical dark theme: charcoal/matte black backgrounds, neon electric blue (#00B4FF) accents
4. Racing Sans One / monospace typography
5. Glassmorphism nav and cards (backdrop-filter blur, semi-transparent backgrounds)
6. Homepage: video hero placeholder, Build of Month, scrolling stats ticker
7. Garage page: service cards grid with hover effects
8. Project Archive: car gallery with hover spec sheet overlays
9. Parts Shop: product grid with category filter
10. Contact/Booking: validated form with submission to backend
11. Ensure full mobile responsiveness
