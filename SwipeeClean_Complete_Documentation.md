# SwipeeClean - Complete Application Documentation

## Overview
SwipeeClean is a mobile-first SaaS application for digital storage cleaning and management. The platform features a dual access model: free access for the owner (swipeeclean@gmail.com) and $4.99/month subscription access for public users.

## Business Model
- **Owner Access**: Free access for swipeeclean@gmail.com
- **Public Access**: $4.99/month subscription via PayPal or Cash App ($hsw365)
- **Revenue Goal**: $1,000,000 by September 1, 2025
- **Domain**: swipeeclean.com
- **Support Email**: swipeeclean@gmail.com

## Technical Architecture

### Frontend Stack
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: React Query (TanStack Query) for server state
- **Animations**: Framer Motion for smooth interactions
- **Build Tool**: Vite for fast development and optimized builds

### Backend Stack
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Replit Auth with OpenID Connect (currently bypassed for public access)
- **Payment Processing**: PayPal and Cash App integration
- **Session Management**: PostgreSQL-backed sessions

## Key Features

### 1. Access Control System
- Owner verification via email prompt (swipeeclean@gmail.com)
- Public subscription system with payment processing
- Clear access denial for unauthorized users

### 2. Storage Cleaning Functionality
- Real file scanning and cleaning
- Duplicate file detection and removal
- Storage optimization recommendations
- Photo and video organization
- Media file management

### 3. Payment Integration
- PayPal subscription processing
- Cash App payment option ($hsw365)
- Secure payment handling
- Customer email collection

### 4. Mobile-First Design
- Responsive layout for all screen sizes
- Touch-friendly interface
- Progressive Web App capabilities
- Cross-platform compatibility

## File Structure

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   └── ui/ (shadcn/ui components)
│   │   ├── pages/
│   │   │   ├── SimpleLanding.tsx (Main landing page)
│   │   │   ├── Subscribe.tsx (Subscription page)
│   │   │   ├── RealFileCleaner.tsx (Main cleaning tool)
│   │   │   └── Settings.tsx (App settings)
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── App.tsx (Main app component)
│   │   └── main.tsx (Entry point)
│   └── index.html
├── server/
│   ├── index.ts (Server entry point)
│   ├── routes.ts (API routes)
│   ├── storage.ts (Database operations)
│   ├── db.ts (Database connection)
│   └── replitAuth.ts (Authentication)
├── shared/
│   └── schema.ts (Shared type definitions)
└── package.json (Dependencies)
```

## Core Components

### 1. Landing Page (SimpleLanding.tsx)
```typescript
// Main landing page with dual access options
- Owner Access (Free) button - for swipeeclean@gmail.com
- Subscribe - $4.99/month button - for public users
- Professional branding with SwipeeClean logo
- Clear pricing and feature information
```

### 2. Subscription Page (Subscribe.tsx)
```typescript
// Complete subscription flow
- $4.99/month pricing display
- PayPal subscription integration
- Cash App payment option
- Email collection for customer management
- Feature list and benefits
- Professional payment processing
```

### 3. File Cleaner (RealFileCleaner.tsx)
```typescript
// Main storage cleaning functionality
- File scanning and analysis
- Duplicate detection
- Storage optimization
- Media organization
- Swipe-based cleaning interface
```

## Payment Integration

### PayPal Integration
- Subscription-based billing at $4.99/month
- Secure payment processing
- Automatic recurring billing
- Customer management

### Cash App Integration
- Direct payment to $hsw365
- Manual verification process
- Email confirmation required
- Alternative payment method

## Access Control Logic

### Owner Access
```typescript
const email = prompt("Enter your email for owner access:");
if (email === "swipeeclean@gmail.com") {
  window.location.href = "/real-cleaner";
} else {
  alert("Access denied. Owner access only.");
}
```

### Subscription Access
```typescript
// Redirect to subscription page
window.location.href = "/subscribe";
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR UNIQUE,
  first_name VARCHAR,
  last_name VARCHAR,
  profile_image_url VARCHAR,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Sessions Table
```sql
CREATE TABLE sessions (
  sid VARCHAR PRIMARY KEY,
  sess JSONB NOT NULL,
  expire TIMESTAMP NOT NULL
);
```

## Environment Variables

### Required Secrets
```
DATABASE_URL=postgresql://...
STRIPE_SECRET_KEY=sk_...
VITE_STRIPE_PUBLIC_KEY=pk_...
SESSION_SECRET=...
REPL_ID=...
REPLIT_DOMAINS=...
```

## Deployment Configuration

### Replit Deployment
- Configured for Replit Autoscale
- Custom domain: swipeeclean.com
- DNS records configured in GoDaddy
- Automatic scaling and hosting

### Build Process
```json
{
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "build": "tsc && vite build",
    "start": "node dist/server/index.js"
  }
}
```

## API Endpoints

### Authentication Routes
- `GET /api/login` - Initiate login flow
- `GET /api/logout` - Logout user
- `GET /api/auth/user` - Get current user

### Payment Routes
- `POST /api/create-payment-intent` - Create payment
- `POST /api/create-subscription` - Create subscription

### Storage Routes
- `GET /api/scan-storage` - Analyze storage
- `POST /api/clean-files` - Clean selected files
- `GET /api/duplicates` - Find duplicates

## Marketing Strategy

### Target Market
- Mobile users with storage issues
- Photo/video content creators
- Business users with data management needs
- Cost-conscious consumers seeking affordable solutions

### Pricing Strategy
- Competitive $4.99/month subscription
- Free access for owner testing and development
- Clear value proposition
- Multiple payment options

### Growth Plan
- Bootstrap marketing with $20 initial budget
- Focus on organic growth and user retention
- Target significant subscriber acquisition
- Revenue goal: $1,000,000 by September 1, 2025

## Customer Support

### Contact Information
- **Primary Email**: swipeeclean@gmail.com
- **Payment Support**: hoodstarent365@gmail.com
- **Cash App**: $hsw365

### Support Features
- Email-based customer service
- Payment verification assistance
- Technical support for subscribers
- Account management help

## Security Features

### Access Control
- Email-based owner verification
- Secure payment processing
- Session management
- Data protection

### Payment Security
- PayPal's secure payment processing
- No sensitive payment data storage
- PCI compliance through payment providers
- Secure customer data handling

## Performance Optimization

### Frontend Optimization
- Vite build optimization
- Code splitting and lazy loading
- Image optimization
- Mobile-first responsive design

### Backend Optimization
- PostgreSQL database optimization
- Efficient API design
- Caching strategies
- Session management

## Monitoring and Analytics

### Key Metrics
- Subscription conversion rates
- User engagement metrics
- Storage cleaning effectiveness
- Customer retention rates
- Revenue tracking

### Tools
- Built-in analytics dashboard
- Payment processing metrics
- User activity monitoring
- Performance tracking

## Troubleshooting Guide

### Common Issues
1. **Owner access not working**: Ensure exact email match "swipeeclean@gmail.com"
2. **Payment processing errors**: Check PayPal/Cash App integration
3. **File cleaning issues**: Verify storage permissions
4. **Mobile responsiveness**: Test across device types

### Debug Steps
1. Check browser console for errors
2. Verify environment variables
3. Test payment integration
4. Validate database connections

## Future Enhancements

### Planned Features
- Advanced file organization
- Cloud storage integration
- Batch processing improvements
- Enhanced mobile features
- Additional payment methods

### Scalability Considerations
- Database optimization for large user base
- CDN integration for global performance
- Microservices architecture migration
- Advanced caching strategies

## Legal and Compliance

### Privacy Policy
- User data protection
- Payment information security
- Storage access permissions
- Cookie and tracking policies

### Terms of Service
- Subscription terms and conditions
- Usage limitations and guidelines
- Cancellation and refund policies
- Service availability terms

---

## Installation and Setup

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Replit environment
- PayPal developer account

### Setup Steps
1. Clone repository
2. Install dependencies: `npm install`
3. Configure environment variables
4. Set up database: `npm run db:push`
5. Start development: `npm run dev`
6. Deploy to Replit Autoscale

### Configuration
1. Set up custom domain (swipeeclean.com)
2. Configure DNS records
3. Set up SSL certificates
4. Configure payment processing
5. Test all functionality

---

**Document Generated**: January 3, 2025
**Version**: 1.0
**Status**: Production Ready
**Contact**: swipeeclean@gmail.com

This documentation provides complete information about the SwipeeClean application, including technical implementation, business model, and operational details.