## First Time Setup

---

1. Make a .env.development file using .env.example as a template.
2. Create a new mysql schema called "birthly" and fill in the DATABASE_URL environment variable with your username and password if different.
3. `npm install` in /api folder.
4. `npm run dev:migrate` will setup prisma client and tables in database.
5. `npm run dev:start` will start the api.
6. `npm run dev:studio` will let you view database in browser.
7. `npm run dev:generate` will re-generate the prisma types if you make schema changes
