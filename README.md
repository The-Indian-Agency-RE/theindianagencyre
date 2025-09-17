# Real Estate Next.js Frontend

This is the Next.js version of the Real Estate frontend application, converted from React with Vite.

## Features

- **Next.js 15** with App Router
- **TypeScript** support
- **Tailwind CSS** for styling
- **React Icons** for icons
- **Google Maps** integration
- **Leaflet** maps
- **React Slick** carousel
- **AOS** animations
- **Axios** for API calls

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard
│   ├── buy/               # Buy properties page
│   ├── rent/              # Rent properties page
│   ├── sell/              # Sell properties page
│   ├── commercial/        # Commercial properties page
│   ├── services/          # Services pages
│   ├── contact/           # Contact page
│   ├── login/             # Login page
│   └── property/[id]/     # Dynamic property details
├── components/            # React components
├── lib/                   # Utility functions and API
└── public/                # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linter
- `npm run format` - Format code

## API Integration

The frontend connects to the backend API at `http://localhost:5000/api`. Make sure the backend server is running for full functionality.

## Environment Variables

Create a `.env.local` file in the root directory:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Deployment

The app can be deployed to Vercel, Netlify, or any other platform that supports Next.js.

```bash
npm run build
npm run start
```