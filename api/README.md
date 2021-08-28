# Birthly API

A digital birth log for OB/GYNs, midwives, doulas, or birth workers.

## Getting the project up and running

1. Make a .env.development file using .env.example as a template.
2. Create a new mysql schema called "birthly" and fill in the DATABASE_URL environment variable with your username and password if different.
3. `npm install` in /api folder.
4. `npm run dev:migrate` will setup prisma client, prisma types, and tables in database.
5. `npm run dev:seed` will seed database with data.
6. `npm run dev:start` will start the api.

## &nbsp;

## Helpful commands

-   `npm run dev:studio` will let you view database in browser.
-   `npm run dev:generate` will re-generate the prisma types if you make schema changes

## &nbsp;

## Things to remember

-   If adding a new environment variable:
    -   Update .env.example
    -   Update .env variable type at `/api/src/types/nodejs/index.d.ts`
-   If adding a new folder directly in src, setup relative imports:
    -   Update tsconfig.json
    -   Update package.json \_moduleAliases
-   Generating prisma types will run the postTypeGeneration.ts script to copy the new types out to all the different projects.
