# StayFinder Pro

**Live Demo: [https://stay-finder-75qt.vercel.app/](https://stay-finder-75qt.vercel.app/)**

StayFinder Pro is a modern, full-featured web application designed to streamline the process of finding and booking hotel accommodations. It provides a seamless user experience with a rich interface, robust user authentication, and dedicated dashboards for users, property owners, and administrators.

![StayFinder Pro Screenshot](https://raw.githubusercontent.com/Rishabh028/StayFinder/main/public/assets/images/Screenshot%202024-07-20%20142820.png)

---

## Table of Contents

- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Contact](#contact)

---

## Key Features

-   **User Authentication**: Secure sign-up and sign-in functionality using Supabase for authentication.
-   **Dynamic Hotel Search**: A powerful search interface to find hotels based on various criteria.
-   **Detailed Hotel Pages**: Comprehensive details for each hotel, including amenities, photo galleries, and reviews.
-   **User Dashboard**: A personalized dashboard for users to view their total bookings, nights stayed, cities visited, and loyalty points.
-   **Booking Management**: A streamlined booking flow for users to reserve rooms.
-   **Wishlist**: Allows users to save their favorite hotels for future reference.
-   **Admin Dashboard**: A control panel for administrators to manage bookings, users, and site content.
-   **Owner Portal**: A dedicated portal for hotel owners to manage their property listings.
-   **Responsive Design**: Fully responsive UI built with Tailwind CSS, ensuring a great experience on all devices.

---

## Tech Stack

-   **Frontend**: [React](https://reactjs.org/) (with Vite)
-   **Backend & Auth**: [Supabase](https://supabase.io/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Routing**: [React Router](https://reactrouter.com/)
-   **Linting**: [ESLint](https://eslint.org/)
-   **Deployment**: [Vercel](https://vercel.com/)

---

## Getting Started

Follow these instructions to set up and run the project on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18.x or later)
-   [npm](https://www.npmjs.com/) (or yarn/pnpm)
-   A Supabase account to get your API keys.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/Rishabh028/StayFinder.git
    cd StayFinder
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Supabase credentials. You can get these from your Supabase project dashboard under `Settings > API`.

    ```env
    # .env
    VITE_SUPABASE_URL="YOUR_SUPABASE_URL"
    VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

---

## Project Structure

The project follows a feature-based folder structure, making it scalable and easy to navigate.

```
/src
├── assets/         # Static assets like images
├── components/     # Global, reusable React components (Appicon, Button, etc.)
├── context/        # React Context providers (e.g., AuthContext)
├── lib/            # External library configurations (e.g., supabaseClient.js)
├── pages/          # Top-level page components, each with its own sub-components
│   ├── sign-in/
│   ├── user-dashboard/
│   └── ...
├── styles/         # Global CSS and Tailwind styles
├── utils/          # Utility functions (e.g., cn for classnames)
├── App.jsx         # Main App component
├── index.jsx       # Application entry point
└── Routes.jsx      # Application routing configuration
```

---

## Deployment

This project is deployed on **Vercel**. The deployment process is automated via Git integration.

-   **Continuous Deployment**: Every push to the `main` branch triggers a new deployment.
-   **Environment Variables**: The Supabase URL and Key are configured in the Vercel project settings.
-   **Build Configuration**: Vercel automatically uses the `npm run build` command and serves the static files from the `build/` directory.

---

## Contact

Rishabh - [@Rishabh](https://www.linkedin.com/in/rishabh-sharma-028rs/)

Project Link: [https://github.com/Rishabh028/StayFinder](https://github.com/Rishabh028/StayFinder)
