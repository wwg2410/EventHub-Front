This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Environment Variables Configuration

> ⚠️ **IMPORTANT:** Never commit your local `.env` or `.env.local` files containing real passwords and secret keys to GitHub. 

### 1. Local Configuration
To run this application locally, you must create an environment configuration file in the root directory of the project:

* Create a file named **`.env`** (or **`.env.local`**) in the root folder.
* Add your local connection links and environment configurations.

Example of what your local `.env` should look like:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
JWT_SECRET=your-custom-dev-secret-key
JWT_EXPIRES_IN=1d
DATABASE_URL=postgresql://username:password@localhost:5432/eventhub_db
```

### 2. Git Protection
Ensure that your secret configuration files are ignored by Git. Check your **`.gitignore`** file in the root directory and confirm it contains the following lines:

```text
# local env files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

### 3. Sharing an Environment Template
To help other developers set up the project without exposing real credentials, an **`.env.example`** file is provided in the repository. If you add new configuration variables, make sure to document them there with placeholder values.

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Backend documentation 
 Swagger http://localhost:8080/api
 link for github:
 https://github.com/legenda0123red-sys/EventHub-Back.git
 