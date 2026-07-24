# Accelera

## Project Description

**Accelera** is a startup accelerator management platform for tracking startups, events, investors, resources, and user activity.

## Getting Started

This guide walks through the steps required to set up and run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or newer
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/amyxiong04/Accelera.git
   cd Accelera
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   If `npm install` has dependency conflicts, run:

   ```bash
   npm install --legacy-peer-deps
   ```

3. **Environment setup**

   Create a `.env.local` file in the root directory and add your Postgres connection string:

   ```env
   DATABASE_URL=your_database_url
   ```

   For Supabase, use the Postgres connection string from your Supabase project settings.

4. **Create and seed the database**

   ```bash
   npm run db:setup
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000).

6. **Build for production**

   ```bash
   npm run build
   npm start
   ```

## Project Structure

- `/src/app` - Next.js app router pages and layouts
- `/src/components` - Reusable React components
- `/src/actions` - Server actions for data mutation
- `/src/lib` - Utility functions and configuration
- `/src/hooks` - Custom React hooks
- `/src/db` - Database schema and seed setup
- `/sql` - Generated SQL schema files

## Features

- Event participation tracking
- Startup management
- User authentication
- Investor and resource management

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Postgres](https://www.postgresql.org/) - Relational database

## Generating The Schema SQL File

Run:

```bash
npx tsx scripts/merge-sql.ts
```

The merged schema is written to `sql/schema.sql`.
