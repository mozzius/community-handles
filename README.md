# Bluesky Community Handles tool

Get your own community handle for Bluesky!

Go to https://swifties.social to join the swifties.social community.

## What is a community handle?

A domain that other people can have their own subdomain on. For example, [@mozzius.swifties.social](https://mozzius.swifties.social) is a community handle that is part of the https://swifties.social community.

## How do I get a community handle?

This tool lets members of your community easily get a community handle. Simply go to the domain, such as https://swifties.social, and follow the instructions.

## How do I host my own community handle tool?

If you want to set up your own community handle for your own community, you can use this tool. It's free and open source, and you can host it yourself.

> These instructions assume you have a basic understanding of Git, GitHub, and Vercel. It not the only way to host it (it's just a Next.js app) but it is probably the simplest way.

You will need to own a domain you want to use, and have a Vercel account linked to your GitHub.

### 1. Fork this repository

Fork this repository to your own GitHub account, and clone it to your local machine.

### 2. Add the project to Vercel

Add the project to Vercel using the "Add New..." button. You will need to link your GitHub account to Vercel if you haven't already.

It will detect that it's a Next.js project and set up the build settings for you. That's all fine, but you will need to set up the environment variables.

Once that's done, deploy the app

### 3. Set up the domain

Once it's done, go to Settings > Domains and add the domain you want to use. **Don't do the redirect stuff it recommends, just use the plain domain. It's the third option on the list**. It'll give you the nameservers your need to point the domain to - go back to your registrar and do that.

> IMPORTANT: Make sure you use nameservers, not DNS records. If you use DNS records, it won't work.

You'll then want to add a wildcard domain using a `*`, such as `*.swifties.social`. This catches all the requests to subdomains - we use Next.js middleware to route them to the right place.

### 4. Add your database

You'll need to add a database to store the community handles. We recommend using [Railway](https://railway.app), but you can use whatever you want - if it's not Postgres, you'll likely need to modify the Prisma file. Railway will likely be the simply way to set it up.

Create a Postgres database via Railway, then get the connection string once it's ready. You'll need to add the connection strings to the environment variables. Create a file called `.env` in the root of the project, and add the following:

```env
DATABASE_URL=
```

Then run the following commands in your terminal, in the project directory:

```bash
pnpm i
pnpm prisma db push
```

Then, in Vercel, go to Settings > Environment Variables and add the `DATABASE_URL` variable with the connection string. Re-deploy the Vercel app.

### 5. Done!

That's it! You should now be able to go to your domain and use the community handle tool.

> Remember it takes a few minutes for DNS to propagate, so it might not work straight away.

If you like the project, you can [sponsor me](https://github.com/sponsors/mozzius)! It's not required, but it's appreciated :)
