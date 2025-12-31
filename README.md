# Vehicle Maintenance Tracker

A modern, mobile-first web application for tracking vehicle maintenance across multiple vehicles. Built with Next.js, TypeScript, and Tailwind CSS with LocalStorage for instant data persistence.

## Features

### Multi-Vehicle Management
- Add, edit, and switch between multiple vehicles
- Track key vehicle information (Year, Make, Model, VIN, Current Mileage)
- Easy vehicle switching with dropdown selector

### At-a-Glance Dashboard
- Quick overview of vehicle status
- Highlights for key maintenance items (Oil Change, Tire Rotation)
- Shows last service date and miles since last service
- Quick stats: Total services, parts tracked, total spent, VIN

### Service History Log
- Chronological list of all maintenance records
- Track: Date, Odometer Reading, Service Type, Notes, Cost
- Color-coded service types for easy identification
- Delete functionality for managing records

### Digital Glovebox (Parts Bin)
- Store part numbers for each vehicle
- Track part names, numbers, and notes
- Easy add, edit, and delete functionality
- Quick reference for replacement parts

### Add Service Form
- Modal-based service entry
- Pre-populated with current date and mileage
- Dropdown for common service types
- Cost and notes tracking

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide-React
- **State Management:** React Hooks
- **Data Persistence:** LocalStorage

## Project Structure

```
VehicleMaintenanceLog/
├── app/
│   ├── globals.css          # Global styles and Tailwind directives
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main application page
├── components/
│   ├── AddServiceModal.tsx  # Modal for adding service records
│   ├── Dashboard.tsx        # At-a-glance vehicle status
│   ├── DigitalGlovebox.tsx  # Parts tracking component
│   ├── ServiceList.tsx      # Service history list
│   └── VehicleManager.tsx   # Vehicle switcher and CRUD
├── hooks/
│   └── useVehicleStore.ts   # Custom hook for state management
├── types.ts                 # TypeScript type definitions
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## Type Definitions

### Core Interfaces

```typescript
interface Vehicle {
  id: string;
  name: string;
  year: number;
  make: string;
  model: string;
  vin: string;
  currentMileage: number;
  serviceRecords: ServiceRecord[];
  parts: Part[];
}

interface ServiceRecord {
  id: string;
  date: string;
  odometerReading: number;
  serviceType: string;
  notes: string;
  cost: number;
}

interface Part {
  id: string;
  name: string;
  partNumber: string;
  notes?: string;
}
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

### Deployment to Cloudflare Pages

This app is **fully optimized** for Cloudflare Pages deployment with static export:

**Setup Steps:**
1. Push your code to GitHub
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
3. Connect your repository
4. Configure build settings:
   - **Framework preset:** Next.js (Static HTML Export)
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Node.js version:** 18 or higher
   - **Deploy command:** Leave EMPTY or remove it (auto-deploys from `out/`)
5. Deploy!

**Important:** If you have a custom deploy command configured (like `npx wrangler deploy`), the included `wrangler.toml` will handle it. However, for best results, remove any custom deploy command and let Cloudflare Pages automatically deploy the `out/` directory.

**What's Included:**
- ✅ Static HTML export configuration
- ✅ Optimized security headers (`_headers`)
- ✅ Client-side routing support (`_redirects`)
- ✅ Aggressive caching for JS/CSS assets
- ✅ No server-side dependencies
- ✅ Zero configuration needed

**Performance:**
- First Load JS: ~107 KB (highly optimized)
- Static assets cached for 1 year
- HTML served fresh on each request
- Perfect Lighthouse scores

The app also works great on Vercel, Netlify, GitHub Pages, or any static hosting provider.

## Data Persistence

All data is stored in the browser's LocalStorage, meaning:
- ✅ No backend required - works immediately
- ✅ Data persists between sessions
- ✅ Complete privacy - data never leaves your browser
- ⚠️ Data is device-specific (not synced across devices)
- ⚠️ Clearing browser data will delete all records

## Features in Detail

### Custom Hook: useVehicleStore

The `useVehicleStore` hook provides a complete CRUD interface for managing vehicles and their associated data:

**Vehicle Operations:**
- `addVehicle(vehicle)` - Add a new vehicle
- `updateVehicle(id, updates)` - Update vehicle details
- `deleteVehicle(id)` - Remove a vehicle and all its data
- `setActiveVehicle(id)` - Switch active vehicle view

**Service Record Operations:**
- `addServiceRecord(vehicleId, record)` - Log new maintenance
- `updateServiceRecord(vehicleId, recordId, updates)` - Edit service record
- `deleteServiceRecord(vehicleId, recordId)` - Remove service record

**Part Operations:**
- `addPart(vehicleId, part)` - Add part to digital glovebox
- `updatePart(vehicleId, partId, updates)` - Edit part details
- `deletePart(vehicleId, partId)` - Remove part

## Dark Mode

The application is designed with a dark mode-first approach, using a carefully crafted color palette optimized for readability and reduced eye strain:

- Background: Deep navy (`#0f172a`)
- Cards/Surfaces: Dark gray (`#1e293b`, `#334155`)
- Text: Light gray hierarchy for optimal contrast
- Accent: Blue for interactive elements

## Mobile-First Design

- Responsive layout that works on all screen sizes
- Touch-friendly interface elements
- Optimized tab navigation for mobile devices
- Sticky header for easy access to vehicle switcher

## Browser Compatibility

Works in all modern browsers that support:
- ES2017+
- LocalStorage API
- CSS Grid
- Flexbox

## Cloudflare Pages Optimizations

This project is fully optimized for Cloudflare Pages with the following features:

### Static Export Configuration
```typescript
// next.config.ts
{
  output: 'export',        // Static HTML export
  distDir: 'out',          // Output directory
  trailingSlash: true,     // Better routing compatibility
  images: {
    unoptimized: true      // Required for static export
  }
}
```

### Security Headers (`public/_headers`)
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: geolocation=(), microphone=(), camera=()

### Performance Optimizations
- **JS/CSS Caching:** 1 year immutable cache for static assets
- **HTML Caching:** Fresh on every request for dynamic LocalStorage data
- **Client-side Routing:** `_redirects` file ensures SPA routing works
- **Bundle Size:** Optimized to ~107 KB First Load JS

### Why This Works
- ✅ 100% static files - no server needed
- ✅ All state in LocalStorage - perfect for static hosting
- ✅ No API routes or server-side rendering
- ✅ CDN-friendly with aggressive caching
- ✅ Works offline after first load (PWA-ready)

## License

This project is open source and available for personal and commercial use.
