# typebeast

## For Artists

A `pnpm` monorepo containing three packages, client(reactjs), api(nodejs), database(prisma/sqlite). This repository contains all services, libraries, and tools required to build, develop, and run the app.

---

## Prerequisites

This project was developed with

- Node.js (v23.10)
- pnpm (v10.10)

---

## Getting Started

In the root directory

```

    node init.js

    pnpm dev

```

open browser - http://localhost:5173

## Project Structure

```
/ (root)
├─ apps/
│  ├─ client/         # React application
│  └─ api/            # Express API server
|  └─ database/       # SQLite / Prisma
├─ pnpm-workspace.yaml
└─ README.md
```
