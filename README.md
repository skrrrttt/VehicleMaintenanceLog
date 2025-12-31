# Vehicle Maintenance Tracker

A modern, mobile-first web application for tracking vehicle maintenance across multiple vehicles. Built with Next.js, TypeScript, and Tailwind CSS, optimized for Cloudflare Pages deployment with LocalStorage persistence.

## Features

- **Multi-Vehicle Management**: Add, edit, and switch between multiple vehicles
- **At-a-Glance Dashboard**: Quick overview with last service dates and mileage tracking
- **Service History Log**: Chronological maintenance records with full details
- **Digital Glovebox**: Store part numbers and specifications
- **LocalStorage Persistence**: All data stored locally in your browser
- **Dark Mode UI**: Clean, modern interface optimized for readability
- **Mobile-First Design**: Fully responsive layout for all devices

## Tech Stack

- **Framework**: Next.js 15 (App Router with Static Export)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide-React
- **State Management**: React Hooks with LocalStorage
- **Deployment**: Cloudflare Pages

## Project Structure

```
VehicleMaintenanceLog/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main application page
├── components/
│   ├── AddServiceModal.tsx  # Service entry modal
│   ├── Dashboard.tsx        # At-a-glance overview
│   ├── DigitalGlovebox.tsx  # Parts tracking
│   ├── ServiceList.tsx      # Service history display
│   └── VehicleManager.tsx   # Vehicle CRUD & switcher
├── hooks/
│   └── useVehicleStore.ts   # State management with LocalStorage
├── types.ts                 # TypeScript interfaces
├── next.config.mjs          # Next.js configuration (static export)
├── wrangler.toml            # Cloudflare Pages configuration
└── package.json             # Dependencies
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Build for Production

```bash
# Create static export
npm run build
```

This generates a static site in the `out/` directory.

## Cloudflare Pages Deployment

### Method 1: Automatic Git Deployment (Recommended)

1. Push your code to GitHub
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
3. Connect your repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Framework preset**: Next.js (Static HTML Export)

Cloudflare Pages will automatically build and deploy on every push.

### Method 2: Manual Deployment with Wrangler

```bash
# Install Wrangler CLI globally
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy to Cloudflare Pages
wrangler pages deploy out --project-name=vehicle-maintenance-tracker

# Or use the build script and deploy in one step
npm run build && wrangler pages deploy out
```

### Wrangler Configuration

The `wrangler.toml` file configures Cloudflare Pages deployment:

```toml
name = "vehicle-maintenance-tracker"
compatibility_date = "2025-12-31"

[assets]
directory = "./out"
```

## Critical Configuration Details

### Static Export (`next.config.mjs`)

```javascript
const nextConfig = {
  output: 'export',          // Enable static HTML export
  images: {
    unoptimized: true,       // Required for static export
  },
  trailingSlash: true,       // Better routing compatibility
};
```

**Important**:
- DO NOT use Next.js `<Image>` component (requires server)
- Use standard HTML `<img>` tags instead
- All logic runs client-side (no server actions)

### TypeScript Types

The application uses three main interfaces:

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

## State Management

The `useVehicleStore` hook provides:

**Vehicle Operations:**
- `addVehicle(vehicle)` - Add new vehicle
- `updateVehicle(id, updates)` - Update vehicle details
- `deleteVehicle(id)` - Remove vehicle
- `setActiveVehicle(id)` - Switch active vehicle

**Service Record Operations:**
- `addServiceRecord(vehicleId, record)` - Log new service
- `updateServiceRecord(vehicleId, recordId, updates)` - Edit service
- `deleteServiceRecord(vehicleId, recordId)` - Remove service

**Part Operations:**
- `addPart(vehicleId, part)` - Add part to glovebox
- `updatePart(vehicleId, partId, updates)` - Edit part
- `deletePart(vehicleId, partId)` - Remove part

All data automatically persists to `localStorage` with key: `vehicle-maintenance-tracker`

## Data Persistence

- ✅ All data stored in browser's LocalStorage
- ✅ Persists between sessions
- ✅ No backend required
- ⚠️ Data is device-specific (not synced across devices)
- ⚠️ Clearing browser data will delete records

## Performance

- **First Load JS**: ~109 KB (optimized)
- **Total Routes**: 2 (index + 404)
- **Build Output**: Static HTML/CSS/JS
- **Caching**: Aggressive CDN caching on Cloudflare

## Browser Compatibility

Works in all modern browsers supporting:
- ES2017+
- LocalStorage API
- CSS Grid & Flexbox

## License

This project is open source and available for personal and commercial use.
