<div align="center">

# 🌍 TOGO — Tour Management System

**A modern, full-stack tour & travel management platform built for seamless trip discovery, booking, and management.**

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen?style=for-the-badge)](https://tour-management-jet.vercel.app)
[![Backend API](https://img.shields.io/badge/backend-api-blue?style=for-the-badge)](https://dreams-tour-management-system-backe.vercel.app)

[Live Website](https://tour-management-jet.vercel.app) · [Backend API](https://dreams-tour-management-system-backe.vercel.app) · [Report Bug](../../issues) · [Request Feature](../../issues)

</div>

---

## 📖 About The Project

**TOGO** is a modern tour management platform that helps travelers explore curated destinations, browse detailed itineraries, and manage bookings — all through a fast, responsive, and elegant interface. Built with an industry-standard, production-grade tech stack, TOGO focuses on performance, accessibility, and a delightful user experience.

---

## ✨ Features

- 🏝️ **Destination & Package Browsing** — Explore curated tours with rich details and imagery
- 🔍 **Search & Filter** — Quickly find tours by category, location, or price
- 📝 **Blog / Travel Stories** — Featured and listed travel articles
- 📱 **Fully Responsive** — Optimized for mobile, tablet, and desktop
- ⚡ **Fast & SEO Friendly** — Powered by Next.js App Router with server-side rendering
- 🎨 **Modern UI/UX** — Clean design system built with shadcn/ui and Tailwind CSS
- 🔐 **Type-Safe Codebase** — End-to-end TypeScript for reliability and maintainability
- 🔗 **REST API Integration** — Connected to a dedicated backend service

---

## 🛠️ Tech Stack

### Frontend

| Technology                                    | Purpose                               |
| --------------------------------------------- | ------------------------------------- |
| [Next.js](https://nextjs.org/)                | React framework for SSR/SSG & routing |
| [TypeScript](https://www.typescriptlang.org/) | Static typing & developer safety      |
| [Tailwind CSS](https://tailwindcss.com/)      | Utility-first styling                 |
| [shadcn/ui](https://ui.shadcn.com/)           | Accessible, reusable UI components    |
| [Lucide Icons](https://lucide.dev/)           | Icon library                          |
| [Vercel](https://vercel.com/)                 | Hosting & deployment                  |

### Backend

- REST API service deployed separately — see [Backend Repository](#) _(add link if public)_

---

## 🔗 Live Links

| Service        | URL                                                                                                      |
| -------------- | -------------------------------------------------------------------------------------------------------- |
| 🌐 Frontend    | [tour-management-jet.vercel.app](https://tour-management-jet.vercel.app)                                 |
| ⚙️ Backend API | [dreams-tour-management-system-backe.vercel.app](https://dreams-tour-management-system-backe.vercel.app) |

---

## 📂 Project Structure

```
togo/
├── app/                    # Next.js App Router pages & layouts
│   ├── (routes)/           # Route groups
│   ├── layout.tsx
│   └── page.tsx
├── components/             # Reusable UI components
│   ├── ui/                 # shadcn/ui components
│   └── shared/              # Shared/custom components
├── lib/                    # Utility functions & API helpers
├── types/                  # TypeScript type definitions
├── public/                 # Static assets (images, icons)
├── styles/                 # Global styles
├── .env.local              # Environment variables (not committed)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

- Node.js `v18.17` or later
- npm / yarn / pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/<your-username>/togo.git
   cd togo
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_API_BASE_URL=https://dreams-tour-management-system-backe.vercel.app
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser 🎉

---

## 📜 Available Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Build the app for production |
| `npm run start` | Start the production server  |
| `npm run lint`  | Run ESLint checks            |

---

## 🌱 Environment Variables

| Variable                   | Description                  |
| -------------------------- | ---------------------------- |
| `NEXT_PUBLIC_API_BASE_URL` | Base URL for the backend API |

---

## 🗺️ Roadmap

- [ ] Add authentication (login/signup)
- [ ] Booking & payment integration
- [ ] User dashboard for saved trips
- [ ] Admin panel for managing tours
- [ ] Multi-language support

---

## 🤝 Contributing

Contributions are what make the open-source community amazing. Any contributions you make are **greatly appreciated**.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📬 Contact

**Project Maintainer** — Asraful

Project Link: [https://tour-management-jet.vercel.app](https://tour-management-jet.vercel.app)

---

<div align="center">

Made with ❤️ using Next.js, TypeScript & Tailwind CSS

</div>
