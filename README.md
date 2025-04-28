# Accelera

## Project Description

<b>Accelera</b> is a platform that connects companies with investors, mentors, accelerators, and other vital resources to promote relationships within the startup ecosystem. The program simplifies essential processes such as resource sharing, networking events, accelerator applications, mentoring access, and startup funding. Its goal is to streamline these interactions, encouraging startup growth and fostering collaboration.

## Getting Started

This guide will walk you through the steps required to set up and run the project on your local machine.

### Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or newer)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [Git](https://git-scm.com/) (for version control)

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/cpsc330-main-project.git
   cd cpsc330-main-project
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   - Create a `.env` file in the root directory
   - Add the following environment variables:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
     NEXT_PUBLIC_DB_URL=postgresql://postgres.pxzgjodggxjprpwjqzic:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres
     ```
4. **Run the Development Server**

   ```bash
   npm run dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000)

5. **Build for Production**
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
- `/prisma` - Database schema and migrations

## Features

- Event participation tracking
- Startup management
- User authentication

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## Generating the schema.sql file

1. Install bun
2. From the root directory `cd scripts`
3. Run `bun merge-sql.ts`
4. View the result in `sql/schema.sql` file
