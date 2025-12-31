# Vehicle Maintenance Tracker

A modern, mobile-first web application for tracking vehicle maintenance across multiple vehicles. Built with Next.js, TypeScript, and Tailwind CSS, optimized for Cloudflare Pages deployment with LocalStorage persistence.

## 🚨 IMPORTANT: Cloudflare Pages Configuration

### For Git-Based Deployments (Recommended)

If you connected your GitHub repository to Cloudflare Pages, configure it as follows:

**Cloudflare Pages Settings:**
- **Framework preset**: Next.js (Static HTML Export)
- **Build command**: `npm run build`
- **Build output directory**: `out`
- **Root directory**: `/` (default)
- **Deploy command**: **(LEAVE EMPTY - delete this field)**

**Why?** Cloudflare Pages automatically deploys the `out/` directory after the build completes. A deploy command is only needed for manual Wrangler CLI deployments, not for Git integrations.

### For Manual Wrangler CLI Deployments

If deploying manually from your local machine:

```bash
npm run build
npx wrangler pages deploy out --project-name=vehicle-maintenance-tracker
```

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
├── wrangler.toml            # Cloudflare Pages configuration (optional)
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

## Deployment

### ✅ Option 1: Cloudflare Pages (Git Integration) - Recommended

This is the easiest way to deploy. Cloudflare automatically builds and deploys on every push.

**Setup:**

1. Push your code to GitHub ✓ (already done)
2. Go to [Cloudflare Pages Dashboard](https://pages.cloudflare.com/)
3. Click **Create a project** → **Connect to Git**
4. Select your repository
5. Configure build settings:
   - **Framework preset**: Next.js (Static HTML Export)
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Deploy command**: **(DELETE/LEAVE EMPTY)**
6. Click **Save and Deploy**

**Important**: Do NOT set a deploy command. Cloudflare Pages automatically deploys the `out/` directory.

### Option 2: Manual Deployment with Wrangler CLI

For local deployments:

```bash
# Build the project
npm run build

# Deploy with Wrangler
npm run deploy

# Or use npx directly
npx wrangler pages deploy out --project-name=vehicle-maintenance-tracker
```

**Note**: This requires Wrangler authentication (`wrangler login`).

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

### Wrangler Configuration (`wrangler.toml`)

```toml
name = "vehicle-maintenance-tracker"
compatibility_date = "2025-12-31"
pages_build_output_dir = "./out"
```

This file is **optional** for Git-based Cloudflare Pages deployments. It's only used for manual Wrangler CLI deployments.

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

The `useVehicleStore` hook provides complete CRUD operations:

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
- **Build Time**: ~6 seconds
- **Zero Vulnerabilities**

## Browser Compatibility

Works in all modern browsers supporting:
- ES2017+
- LocalStorage API
- CSS Grid & Flexbox
- crypto.randomUUID()

## Troubleshooting

### Authentication error during deployment

**Symptom**: `Authentication error [code: 10000]` when using Git integration.

**Solution**: This happens when you have a deploy command configured. For Git-based Cloudflare Pages:

1. Go to Cloudflare Pages → Your Project → **Settings**
2. **Builds & deployments** → **Edit configuration**
3. **Delete the deploy command** (leave field empty)
4. Keep only:
   - Build command: `npm run build`
   - Build output directory: `out`
5. Save and redeploy

Cloudflare Pages will automatically deploy after the build completes.

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
npm run deploy   # Deploy to Cloudflare Pages with Wrangler CLI
```

## License

This project is open source and available for personal and commercial use.
