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

This app is configured for easy deployment to Cloudflare Pages using static export:

**Option 1: Automatic Deployment via Git**
1. Connect your repository to Cloudflare Pages
2. Set build command: `npm run build`
3. Set output directory: `out`
4. Deploy!

**Option 2: Manual Deployment with Wrangler**
```bash
# Install Wrangler globally (if not already installed)
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
npm run deploy
```

The app exports as a static site, making it perfect for Cloudflare Pages, Vercel, Netlify, or any static hosting provider.

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

## License

This project is open source and available for personal and commercial use.
