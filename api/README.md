## First Time Setup

---

1. Make a .env.development file using .env.example as a template.
2. Create a new mysql schema called "birthly" and fill in the DATABASE_URL environment variable with your username and password if different.
3. `npm install` in /api folder.
4. `npm run migrate:dev` will setup prisma client and tables in database.
5. `npm run studio:dev` will let you view database in browser.
6. `npm run generate:dev` will re-generate the prisma types if you make schema changes
