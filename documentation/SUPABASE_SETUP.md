# CanteenHub - Supabase Database Setup

## 1. Database Overview

CanteenHub uses Supabase PostgreSQL as its shared relational database.

- Project: CanteenHub
- Database: PostgreSQL
- Connection: Supabase Session Pooler
- Port: 5432
- Backend: Laravel REST API
- Frontend: Next.js

## 2. Configure the Laravel Environment

Each team member must configure their own local `backend/.env` file.

Use the following configuration:

```env
DB_CONNECTION=pgsql
DB_HOST=YOUR_SUPABASE_HOST
DB_PORT=5432
DB_DATABASE=postgres
DB_USERNAME=YOUR_SUPABASE_USERNAME
DB_PASSWORD=YOUR_SUPABASE_PASSWORD
```

Replace the placeholders with the shared database connection details. Obtain the password securely from the project owner.

## 3. Verify the Connection

Open a terminal inside the `backend` directory and execute:

```bash
php artisan config:clear
php artisan db:show
php artisan migrate:status
```

## 4. Database Collaboration Rules

- All team members use the same Supabase project.
- Keep database credentials in local `.env` files.
- Never commit `.env` files or expose database passwords.
- Use Laravel migrations for schema changes.
- Coordinate migration changes with the team.
- Never execute `php artisan migrate:fresh` on the shared database.
- Do not drop or modify shared tables without team approval.

## 5. System Connection

Next.js Frontend -> Laravel REST API -> Supabase PostgreSQL

Laravel handles database access, authentication, authorization, and application logic. The frontend communicates with Laravel through API endpoints.