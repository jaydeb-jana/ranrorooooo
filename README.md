# Rankaro — Authentic Google Review Collection SaaS

**Rankaro** is a production-ready SaaS web application built with **Next.js**, **JavaScript**, and **MongoDB**. It empowers local businesses to collect detailed, authentic, and high-impact Google reviews by eliminating customer writer's block through guided experience selection and friction-free QR code interaction.

---

## 🌟 Key Features

1. **Google-Inspired Design Language**
   - Clean, minimalist aesthetic with crisp typography, generous whitespace, subtle Google brand accents, and responsive mobile-first layouts.
   - 100% independent platform notice protecting against trademark misrepresentation.

2. **Secure Authentication & OTP Verification**
   - Registration collecting **Business Name**, **Owner Name**, **Mobile Number**, **Email Address**, and **Password**.
   - Mandatory 6-digit One-Time Password (OTP) email verification before account activation.
   - Working **Forgot Password** flow with secure OTP verification.
   - Production Gmail SMTP integration via nodemailer with automatic local development preview fallback.
   - Secure session handling using encrypted JWT tokens stored in `httpOnly` secure cookies.

3. **Persistent MongoDB Integration**
   - Production MongoDB / MongoDB Atlas connectivity via Mongoose models (`User`, `Otp`, `ReviewActivity`).
   - Resilient database layer that automatically handles offline/local development states without crashing.

4. **Business Owner Management Dashboard**
   - **Overview**: Real-time funnel metrics, quick links, and 1-click review link copying.
   - **Services & Experiences**: Full CRUD management (add, edit, delete with confirmation modals) plus 1-click industry presets (Dental, Contracting, Restaurant, Auto Repair, Salon, General).
   - **QR Code & Display Cards**: Real-time high-resolution PNG & vector SVG downloads, plus a printable counter display / table tent ready for office printers.
   - **Review Page Customizer**: Live side-by-side interactive smartphone mockup previewing changes to headlines and instructions.
   - **Business Profile**: Edit contact details, location, custom `/r/[slug]` URL, and official Google Review link with helpful instructions.
   - **Funnel Analytics**: Real-time tracking of visits, drafts generated, text copied, and Google clicks with conversion rates and audit logs.

5. **Customer-Facing Personalized Review Assistant (`/r/[slug]`)**
   - Lightning-fast mobile experience.
   - Verified business profile banner with Google stars visual.
   - Selectable service chips configured by the business.
   - Sentiment selection (5-star scale).
   - Optional customer details (attending staff member, standout highlight).
   - **Intelligent Draft Engine**: Produces 3 natural draft variations (*Detailed & Specific*, *Short & Direct*, *Warm & Personal*) strictly derived from verified customer selections (never invents unconfirmed claims).
   - Full in-browser editor allowing customers to freely personalize the text.
   - **1-Click Copy & Google Redirect**: Copies review text with instant visual confirmation and opens the business's official Google review page.
   - **Ethical Review Safeguards**: Zero review gating, no simulated bot activity, and an optional private feedback conduit for constructive complaints.

6. **Free & Open SaaS**
   - No paid subscription walls, credit cards, or artificial tier limitations.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** v18+ (tested on Node v20 & v24)
- **npm** v9+
- Optional: Local MongoDB or free MongoDB Atlas account

### 2. Installation
```bash
git clone <repository-url>
cd gmbv2
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Open `.env.local` and set your credentials:
```env
# MongoDB Connection String (Atlas or Local)
MONGODB_URI=mongodb://127.0.0.1:27017/rankaro

# JWT Secret Key (Use a random string in production)
JWT_SECRET=your-secure-random-jwt-secret-string-32-chars

# Gmail SMTP for Live OTP Delivery
GMAIL_USER=your-business-email@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **Note on Gmail SMTP**: To generate an App Password:
> 1. Go to your [Google Account](https://myaccount.google.com/) -> **Security**.
> 2. Ensure **2-Step Verification** is turned on.
> 3. Search for **App Passwords** -> create an app named "Rankaro".
> 4. Copy the generated 16-character code into `GMAIL_APP_PASSWORD`.
> 
> *If `GMAIL_USER` is empty, Rankaro runs in local development mode where OTPs are logged clearly to the server console and displayed in a test notification box for immediate frictionless testing.*

---

## 💻 Running the Application

### Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Launch
```bash
npm run build
npm start
```

---

## 🧪 Running the End-to-End Test Suite
Rankaro includes an automated end-to-end integration test (`test-e2e.mjs`) covering all 12 key user flows:
```bash
node test-e2e.mjs
```
The test verifies:
- Registration & validation
- Email OTP verification & cookie issuance
- Profile updates & Google review URL linking
- Service management (create, read, update, delete)
- QR code generation (PNG & SVG)
- Public review page loading
- Review draft generation strictly from confirmed selections
- Funnel metric tracking (copy & Google clicks)
- Password reset flow via OTP
- Login with updated password & logout

---

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   ├── auth/          # Register, Login, OTP, Resend, Forgot/Reset Password, Me, Logout
│   │   ├── business/      # Profile, Services CRUD, QR Code Generator, Analytics
│   │   └── public/        # Review Page endpoint, Draft Engine API, Track Action
│   ├── dashboard/         # Owner Dashboard (Overview, Services, QR, Customizer, Profile, Analytics)
│   ├── forgot-password/   # Forgot Password OTP flow
│   ├── login/             # Sign In page with OTP fallback
│   ├── r/[slug]/          # Customer-Facing Review Collection Assistant
│   ├── register/          # Business Registration with Email OTP
│   ├── globals.css        # Clean Google Material palette and typography
│   ├── layout.js          # Root layout and global Toast provider
│   └── page.js            # Authoritative Marketing Landing Page & Live Demo
├── components/
│   ├── dashboard/         # Sidebar, Header, Modals
│   ├── ConfirmModal.js    # Destructive action confirmation dialog
│   ├── Footer.js          # Clean footer with Google independent disclaimer
│   ├── GoogleReviewUrlHelpModal.js # Step-by-step guide to finding Google review links
│   ├── Navbar.js          # Google-inspired navigation
│   └── Toast.js           # Reusable feedback toasts
├── lib/
│   ├── auth.js            # Password hashing, JWT signing, cookies
│   ├── db.js              # MongoDB / Mongoose connection with resilient fallback
│   ├── mail.js            # Gmail SMTP transport & OTP email template
│   ├── presets.js         # Industry starter packs for services
│   ├── repositories.js    # Abstraction repository layer
│   └── reviewEngine.js    # Multi-style review drafting engine
├── models/
│   ├── Otp.js             # TTL-indexed OTP verification collection
│   ├── ReviewActivity.js  # Funnel analytics log collection
│   └── User.js            # Business owner profile, settings, and services schema
├── .env.example           # Example environment template
└── package.json           # Dependencies (Next.js 16, Mongoose, Nodemailer, QRCode, Lucide)
```

---

## ⚖️ Legal & Compliance Disclaimer

Rankaro is an independent productivity software tool designed to assist businesses in gathering authentic customer feedback. Google, Google Maps, and Google Business Profile are registered trademarks of Google LLC. Rankaro is not affiliated with, certified by, endorsed by, or sponsored by Google LLC or Alphabet Inc.
