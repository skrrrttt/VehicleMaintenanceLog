# Vehicle Maintenance Tracker

A modern, mobile-first web application for tracking vehicle maintenance across multiple vehicles. Built with Next.js, TypeScript, and Tailwind CSS, optimized for Cloudflare Pages deployment with LocalStorage persistence.

## 🚨 CRITICAL: Fix Authentication Error

**If you're seeing "Authentication error [code: 10000]"**, you have a deploy command configured in Cloudflare Pages that should NOT be there for Git-based deployments.

### ✅ CORRECT Configuration for Git-Based Cloudflare Pages:

Go to **Cloudflare Dashboard** → **Pages** → **Your Project** → **Settings** → **Builds & deployments**

Click **"Edit configuration"** and set:

| Field | Value | Notes |
|-------|-------|-------|
| **Framework preset** | Next.js (Static HTML Export) | Select from dropdown |
| **Build command** | `npm run build` | ✅ Required |
| **Build output directory** | `out` | ✅ Required |
| **Root directory** | `/` | Default (leave as-is) |
| **Deploy command** | **(EMPTY - DELETE THIS)** | ❌ Must be empty! |

### ⚠️ Common Mistake:

The "Deploy command" field exists in the UI, but for Git-based deployments it **MUST BE EMPTY**.

- ❌ **WRONG**: `npm run deploy` or `wrangler pages deploy out`
- ✅ **CORRECT**: (empty field - no value)

**Why?** Cloudflare Pages automatically deploys your `out/` directory after building. The `npm run deploy` script is ONLY for manual local deployments using Wrangler CLI, NOT for Git-based CI/CD deployments.

---

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

### ❌ Authentication error [code: 10000]

**Full Error Message:**
```
✘ [ERROR] A request to the Cloudflare API failed.
Authentication error [code: 10000]
📎 It looks like you are authenticating Wrangler via a custom API token
   set in an environment variable.
```

**Root Cause**: You have a deploy command configured in Cloudflare Pages settings (like `npm run deploy` or `wrangler pages deploy out`). This is INCORRECT for Git-based deployments.

**Solution - Step by Step:**

1. **Go to Cloudflare Dashboard**
   - Navigate to https://dash.cloudflare.com/
   - Click **Workers & Pages** in the left sidebar
   - Find your project: `vehicle-maintenance-tracker`

2. **Open Settings**
   - Click on your project name
   - Click **Settings** tab
   - Click **Builds & deployments** section

3. **Edit Configuration**
   - Click **"Edit configuration"** button (top right)
   - You'll see these fields:
     - Framework preset
     - Build command
     - Build output directory
     - Root directory (optional)
     - Deploy command ← **THIS IS THE PROBLEM**

4. **Remove the Deploy Command**
   - Find the **"Deploy command"** field
   - **DELETE** any value in this field (should say `npm run deploy` or similar)
   - Leave it **completely empty**
   - DO NOT put any value here

5. **Verify These Settings**
   - ✅ Build command: `npm run build`
   - ✅ Build output directory: `out`
   - ❌ Deploy command: (empty)

6. **Save and Retry**
   - Click **"Save"**
   - Go to **Deployments** tab
   - Click **"Retry deployment"** on the failed deployment
   - OR push a new commit to trigger a fresh deployment

**Expected Result**: Build succeeds and Cloudflare automatically deploys the `out/` directory without any authentication errors.

**Note**: The `npm run deploy` script in `package.json` is ONLY for manual local deployments using Wrangler CLI. It should NEVER be used in Cloudflare Pages Git-based CI/CD.

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
