# Vehicle Maintenance Tracker

A modern, mobile-first web application for tracking vehicle maintenance across multiple vehicles. Built with Next.js, TypeScript, and Tailwind CSS, optimized for Cloudflare Pages deployment with LocalStorage persistence.

## 🚨 Cloudflare Pages Deploy Command Configuration

**If your Cloudflare Pages project requires a deploy command**, use:

```
npm run deploy
```

This will execute the `wrangler pages deploy out` command using the locally installed wrangler.

**Alternative**: Change the deploy command in Cloudflare Pages to:

```
npx wrangler pages deploy out
```

This uses npx to run wrangler from node_modules without needing a global installation.

### Recommended Cloudflare Pages Settings:

- **Build command**: `npm run build`
- **Build output directory**: `out`
- **Deploy command**: `npm run deploy` OR `npx wrangler pages deploy out`

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
- **Deployment**: Cloudflare Pages with Wrangler

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

### ✅ Automatic Git Deployment (Recommended)

1. Push your code to GitHub ✓ (already done)
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
3. Connect your repository
4. Configure build settings:
   - **Framework preset**: Next.js (Static HTML Export)
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Deploy command**: `npm run deploy` (uses local wrangler)

### Alternative Deploy Commands

If `npm run deploy` doesn't work, try:

```bash
npx wrangler pages deploy out
```

Or if you prefer the wrangler.toml configuration:

```bash
npx wrangler pages deploy
```

### Manual Deployment with Wrangler CLI

```bash
# Install dependencies first
npm install

# Build the project
npm run build

# Deploy using npm script
npm run deploy

# Or deploy directly with npx
npx wrangler pages deploy out --project-name=vehicle-maintenance-tracker
```

### Wrangler Configuration

The `wrangler.toml` file configures Cloudflare Pages deployment:

```toml
name = "vehicle-maintenance-tracker"
compatibility_date = "2025-12-31"

[assets]
directory = "./out"
```

This tells Wrangler where to find the static files to deploy.

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

**Important Constraints**:
- ❌ NO Next.js `<Image>` component (requires server)
- ✅ Use standard HTML `<img>` tags
- ✅ All logic runs client-side
- ✅ No server actions or API routes

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
- ✅ Complete privacy - data never leaves your browser
- ⚠️ Data is device-specific (not synced across devices)
- ⚠️ Clearing browser data will delete records

## Performance

- **First Load JS**: ~109 KB (optimized)
- **Total Routes**: 2 (index + 404)
- **Build Output**: Static HTML/CSS/JS
- **Build Time**: ~5 seconds
- **Zero Vulnerabilities**

## Browser Compatibility

Works in all modern browsers supporting:
- ES2017+
- LocalStorage API
- CSS Grid & Flexbox
- crypto.randomUUID()

## Troubleshooting

### Deployment fails with "wrangler: not found"

**Solution**: Update your Cloudflare Pages deploy command to:

```
npm run deploy
```

Or:

```
npx wrangler pages deploy out
```

This ensures wrangler is executed from the local node_modules installation.

### Data not persisting

- Check browser's LocalStorage settings
- Ensure LocalStorage is not disabled
- Check if in private/incognito mode (may not persist)

### Build fails with Image optimization error

- Ensure you're not using Next.js `<Image>` component
- Use standard `<img>` tags only
- Verify `images.unoptimized: true` in `next.config.mjs`

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build static export to out/
npm run start    # Start production server (not for static export)
npm run lint     # Run ESLint
npm run deploy   # Deploy to Cloudflare Pages with Wrangler
```

## License

This project is open source and available for personal and commercial use.
