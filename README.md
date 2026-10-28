# Efosa's Portfolio

A modern, interactive portfolio website built with Next.js 14, Three.js, and Tailwind CSS, showcasing AI and software engineering projects.

## Features

- 🎨 Modern UI/UX with dark/light mode
- 🎭 Interactive 3D animations using Three.js
- 📱 Fully responsive design
- ⚡ Server-side rendering with Next.js 14
- 🔥 Fast page transitions and animations
- 📝 Blog system backed by Cloud Firestore
- 📊 Project showcase with pagination
- 📫 Contact form with automated email delivery via Cloud Functions
- 📈 Admin analytics dashboard powered by the GA4 Data API
- 🎯 SEO optimized with metadata
- 🔒 Admin dashboard for content management

## Tech Stack

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **3D Graphics:** Three.js, React Three Fiber
- **Animations:** Framer Motion, GSAP
- **Backend:** Firebase (Firestore, Realtime Database, Storage, Auth, Cloud Functions)
- **Email:** Nodemailer over SMTP, delivered by a self-managed Cloud Function (`functions/`)
- **Icons:** Lucide React
- **Form Handling:** React Hook Form, Zod
- **State Management:** React Hooks

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project (Blaze plan for Cloud Functions)
- Google Analytics 4 property linked to the Firebase project

### Installation

1. Clone the repository:
```bash
git clone https://github.com/whizkidefos/iefosa-pwa.git
cd iefosa-pwa
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory (see `.env.example` for all variables):
```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
FIREBASE_SERVICE_ACCOUNT_KEY_BASE64=
GA4_PROPERTY_ID=
```

4. Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:3000`

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── about/           # About page
│   ├── admin/           # Admin dashboard
│   ├── blog/            # Blog pages
│   ├── contact/         # Contact page
│   ├── projects/        # Projects page
│   └── page.tsx         # Home page
├── components/          # React components
│   ├── sections/        # Page sections
│   ├── three/           # Three.js components
│   └── ui/              # UI components
├── lib/                 # Utility functions
├── public/             # Static assets
└── supabase/           # Supabase configurations
```

## Key Features

### Interactive 3D Elements
- Morphing blob on homepage
- Floating particles in blog
- Floating cubes in projects
- Molecule visualization in about

### Blog System
- Markdown support
- Tags and categories
- Social sharing
- Reactions (likes, bookmarks)
- Comment system

### Project Showcase
- Filterable grid
- Pagination
- Project details
- Technology tags

### Contact Form
- Email integration
- Form validation
- Success/error handling
- Spam protection

## Deployment

The project is configured for deployment on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Configure environment variables
4. Deploy

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Efosa**
- Website: [iefosa.me](https://iefosa.me)
- GitHub: [@yourusername](https://github.com/whizkidefos)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/efosaigbinehi)

## Acknowledgments

- [Next.js](https://nextjs.org)
- [Three.js](https://threejs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Supabase](https://supabase.com)
- [Resend](https://resend.com)