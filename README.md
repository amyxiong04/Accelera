# Accelera

## Project Description

<b>Accelera</b> is a platform that connects companies with investors, mentors, accelerators, and other vital resources to promote relationships within the startup ecosystem. The program simplifies essential processes such as resource sharing, networking events, accelerator applications, mentoring access, and startup funding. Its goal is to streamline these interactions, encouraging startup growth and fostering collaboration.

## Live Demo

You can view the live version of Accelera here:  
👉 https://accelera-rja1.vercel.app/


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
   git clone https://github.com/amyxiong04/Accelera.git
   cd Accelera
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```
   If running npm install leads to dependency conflicts, run the below command:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Environment Setup**
   - Create a `.env` file in the root directory
   - Add the following environment variables:

     ```
      NEXT_PUBLIC_SUPABASE_URL="https://pxzgjodggxjprpwjqzic.supabase.co/"
                        NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4emdqb2RnZ3hqcHJwd2pxemljIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MTY2NzM5MCwiZXhwIjoyMDU3MjQzMzkwfQ.cMfdacGFFyU875esn1YdzDMaNh9Yx_KEP4tt5ncgD_Y"
      NEXT_PUBLIC_DB_URL = postgresql://postgres.pxzgjodggxjprpwjqzic:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres
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
