# Deployment Guide for Hammad Foundation

This project is built with Next.js 16 and is optimized for deployment on Vercel.

## 1. Prerequisites

Before deploying, ensure you have:
- A [Vercel Account](https://vercel.com/signup)
- A GitHub repository with this code pushed

## 2. Environment Variables

The application requires a PostgreSQL database (via Vercel Postgres). You must set the following environment variable in your Vercel project settings:

- `POSTGRES_URL`: The connection string for your database.

If you are using Vercel Postgres, this variable is automatically added when you connect the storage to your project.

## 3. Deploying to Vercel

1.  **Push to GitHub**: ensure your code is committed and pushed.
2.  **Import Project**:
    - Go to your Vercel Dashboard.
    - Click "Add New..." -> "Project".
    - Import the repository.
3.  **Configure Project**:
    - Framework Preset: Next.js (should be auto-detected).
    - Root Directory: `./` (default).
4.  **Add Database**:
    - In the project dashboard, go to the "Storage" tab.
    - Click "Create Database" -> "Postgres".
    - Follow the prompts to create a new database.
    - Once created, Vercel will automatically add the required environment variables (like `POSTGRES_URL`, `POSTGRES_PRISMA_URL`, etc.) to your project.
5.  **Deploy**:
    - Click "Deploy".
    - Vercel will build and deploy your site.

## 4. Database Schema

After deployment, you may need to push your database schema. You can do this by running the migration command locally (connected to the remote DB) or adding a build step, but for Vercel Postgres with Drizzle, the recommended way is:

1.  Get your database credentials from Vercel.
2.  Add them to your local `.env` file.
3.  Run `npx drizzle-kit push` to push the schema changes to the database.

## 5. Troubleshooting

- **Build Errors**: Check the build logs in Vercel. Ensure all dependencies are installed.
- **Database Connection**: Verify `POSTGRES_URL` is set correctly in the Environment Variables section.
