
# User Dashboard Project

This project is a **user dashboard application** built with **Next.js 13**, **TypeScript**, **React Query**, and **Tailwind CSS**. The project showcases a fully functional dashboard for users where they can view and edit their profiles. Admin users have additional permissions to view and edit other users' data.

## Inspiration

* **Dashboard design** inspired by: [Users Dashboards – Constructor X for Figma](https://dribbble.com/shots/25990589-Users-Dashboards-Constructor-X-for-figma-6-0)
* **Login page design** inspired by: [Login Page](https://dribbble.com/shots/23424744-Login-Page)

## Features

* **User login** with localStorage for session management
* **User dashboard** showing profile information, job, location, email, age, and role
* **Edit profile** functionality with immediate updates
* **Admin capabilities**: Admin users can view and edit other users' information
* **Responsive layout** for mobile, tablet, and desktop screens
* **Error handling** for network or server issues
* **React Query** integration for efficient data fetching and state management

## Technologies Used

* **Next.js 13** (App Router)
* **React** with TypeScript
* **Tailwind CSS** for styling
* **React Query** for client-side data fetching and caching
* **Axios** for API requests
* **Next.js API Routes** for backend simulation

## Backend / API

The project uses **Next.js API routes** to handle backend functionality:

* `POST /api/auth` → Login endpoint, returns `userId`
* `GET /api/users` → Fetch all users
* `PUT /api/users/[id]` → Update a specific user

> The backend is mocked using Next.js API routes; no external database is required for running the project.

## Getting Started

Follow these steps to run the project locally:

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd <repo-folder>
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Start the development server**

```bash
npm run dev
# or
yarn dev
```

4. **Open in browser**

Go to [http://localhost:3000](http://localhost:3000) to view the project.

5. **Environment variables** (optional)

If you have any API keys or environment variables, create a `.env.local` file at the project root and add them.

## Folder Structure

```
src/
├─ app/
│  ├─ _Components/      # Reusable UI components like UserCard, UserProfile, EditUser
│  ├─ _Hooks/           # Custom hooks, e.g., useUsers, useLogin
│  ├─ api/              # Next.js API routes
│  ├─ page.tsx          # Login page
│  └─ dashboard/        # Dashboard page
├─ interfaces/          # TypeScript interfaces
```

## Screenshots / Demo

You can include screenshots of the dashboard and login page here.

## License

This project is for demonstration purposes and does not include a license.

