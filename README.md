# SwipeeClean - Professional Storage Optimizer

SwipeeClean is a premium storage cleaning and optimization app for iOS devices, offering advanced file management, duplicate detection, and device performance enhancement.

## 🚀 Features

- **Smart Storage Analysis** - AI-powered storage scanning and optimization
- **Duplicate File Detection** - Advanced algorithms to find and remove duplicates
- **Premium Subscription** - $4.99/month for unlimited cleaning features
- **Spam Blocking** - Call and text spam protection
- **Photo Organization** - Intelligent media file management
- **Performance Optimization** - Device speed and memory enhancement

## 📱 iOS App Store

This app is built using Capacitor and optimized for iOS App Store submission.

### App Information
- **Bundle ID**: `com.swipeeclean.app`
- **Category**: Utilities
- **Price**: Free with Premium Subscription ($4.99/month)
- **Target iOS**: 13.0+

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+
- iOS development environment (Xcode, CocoaPods)
- Apple Developer Account

### Installation
```bash
# Install dependencies
npm install

# Build web assets
npm run build

# Sync with iOS project
npx cap sync ios

# Open in Xcode
npx cap open ios
```

### Build Commands
```bash
# Development server
npm run dev

# Production build
npm run build

# iOS sync
npx cap sync ios

# Database operations
npm run db:push
npm run db:studio
```

## 🔧 CodeMagic CI/CD

This project is configured for automated iOS builds using CodeMagic:

1. **Connect GitHub**: Link this repository to CodeMagic
2. **Configure Signing**: Add Apple Developer certificates
3. **Auto Build**: Pushes to main branch trigger iOS builds
4. **App Store**: Automatic submission to TestFlight/App Store

See `codemagic.yaml` for build configuration.

## 📊 Architecture

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + PostgreSQL
- **Mobile**: Capacitor for native iOS integration
- **Payments**: PayPal + In-App Purchases
- **Database**: PostgreSQL with Drizzle ORM

## 🎯 Business Model

- **Free Tier**: Basic storage analysis
- **Premium ($4.99/month)**: Unlimited cleaning, advanced features
- **Revenue Goal**: $1,000,000 by September 2025
- **Target**: 28,600+ active subscribers

## 📞 Support

- **Email**: swipeeclean@gmail.com
- **Website**: https://swipeeclean.com
- **Documentation**: Available in `/docs` folder

## 📄 Legal

- Privacy Policy: `/privacy-policy.md`
- Terms of Service: `/terms-of-service.md`
- App Store Guidelines: Fully compliant

## 🚀 Deployment

### iOS App Store Submission
1. Build using CodeMagic or Xcode
2. Upload to App Store Connect
3. Configure app listing and screenshots
4. Submit for Apple review

### Web Deployment
- Live at: https://swipeeclean.com
- Hosted on Replit with custom domain

---

**SwipeeClean** - Transform your device storage management experience.