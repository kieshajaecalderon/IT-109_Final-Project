# Multi-Canteen Order & Student Delivery Hub

A university-based, multi-vendor food ordering and student delivery platform that connects students and faculty with campus canteen stalls through peer-to-peer delivery services.

## 1. Project Overview

The **Multi-Canteen Order & Student Delivery Hub (CanteenHub)** is designed to make food ordering across the university campus more convenient.

Customers can browse participating canteens, select food items, add meals to their shopping cart, and specify their preferred building or room as the delivery destination.

Student delivery runners can claim available delivery jobs and earn an additional service fee of ₱5–₱10 per completed delivery.

The platform also provides canteen vendors with tools to manage their menus and incoming orders, while administrators can oversee canteen registrations, delivery activities, and vendor payouts.

## 2. User Roles

| User Role | Description |
|---|---|
| Customer | Students and faculty who browse canteens, order food, pay for orders, and specify delivery locations. |
| Canteen Stall Vendor | Manages menu items, updates food availability, accepts orders, and marks orders as ready for pickup. |
| Student Delivery Runner | Views available delivery jobs, claims orders, and updates delivery statuses. |
| Administrator | Manages canteen registrations, monitors delivery completion rates, and oversees vendor payouts. |

## 3. Core Modules

| Module | Main Functions |
|---|---|
| User Profiles | Create, view, update, and deactivate user profiles. |
| Canteens | Register, view, update, and deactivate participating canteen stalls. |
| Menu Items | Create, view, edit, and delete food items, including prices, photos, and availability. |
| Shopping Cart | Add items, update quantities, remove items, and calculate subtotals. |
| Orders | Place orders, process payments, view order history, and manage order statuses. |
| Delivery Jobs | Display available orders, allow runners to claim jobs, and update delivery statuses. |
| Payouts & Reports | Monitor vendor payouts, runner completion rates, and payout records. |

## 4. Order Fulfillment Workflow

Orders follow a defined state-based fulfillment process:

1. **Paid** – Payment is confirmed, and the order is forwarded to the vendor dashboard.
2. **Preparing** – The vendor accepts the order and begins food preparation.
3. **Ready for Pickup** – The vendor marks the order as ready, making it available on the runner job board.
4. **Out for Delivery** – A student runner claims the order and picks it up.
5. **Delivered** – The runner completes delivery to the customer's specified building or room.

Payment status is maintained separately from order fulfillment status.

## 5. Technology Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, React, TypeScript |
| Styling | Tailwind CSS |
| UI Components | Shadcn-style UI components |
| Backend | Laravel PHP REST API |
| Database | PostgreSQL (Supabase or local PostgreSQL) |
| Authentication | Laravel Sanctum; Google OAuth planned |
| Payment Processing | PayMongo Sandbox (integration in progress) |
| Caching | Laravel Cache or Redis (Upstash) |
| Object Storage | Supabase Storage, Cloudinary, or MinIO |
| Email Notifications | Google SMTP |
| Address Data | PSGC Address API |

**Note:** Integrations identified as planned or in progress should not be considered fully implemented until configured and tested.

## 6. Current Development Status

The project is being developed incrementally on the shared `develop` branch.

### Implemented initial frontend

- CanteenHub homepage and navigation.
- Canteen listing page.
- Individual canteen menu pages.
- Menu category filters.
- Add-to-cart functionality.
- Shopping cart with quantity controls.
- Cart data persistence using browser local storage.
- Checkout interface with delivery information fields.
- Customer order history interface with sample order statuses.
- Shared header, footer, and UI components.

### Implemented backend foundation

- Customer cart, cart item, order, order item, payment, and webhook event models.
- Customer cart, order, and payment migrations.
- Cart viewing, updating, and item removal endpoints.
- Customer order history and order details endpoints.
- Customer payment details endpoint.
- PayMongo checkout service foundation.
- Payment amount conversion to centavos.
- Order pricing service.
- PayMongo webhook signature verification and event recording foundation.
- Sanctum-protected customer routes and a public PayMongo webhook route.

### Features still requiring integration or completion

- Complete menu and canteen database integration.
- Cart item creation through the Laravel API.
- Order creation and checkout submission through the backend.
- Complete PayMongo checkout and payment confirmation workflow.
- Webhook processing that updates payment and order records.
- Google OAuth integration.
- Vendor and runner workflows.
- Admin management features.
- Email notifications.
- Production database integration and testing.

**Important:** The initial frontend currently uses sample menu items and sample order records. The checkout interface is not yet submitting orders to the backend. The frontend and backend are not yet fully connected.

## 7. Project Structure

```text
IT-109_Final-Project/
│
├── backend/
│   ├── app/
│   │   ├── Http/
│   │   ├── Models/
│   │   └── Services/
│   ├── bootstrap/
│   ├── config/
│   ├── database/
│   │   └── migrations/
│   ├── public/
│   ├── resources/
│   ├── routes/
│   ├── storage/
│   ├── tests/
│   ├── .env.example
│   ├── artisan
│   ├── composer.json
│   └── composer.lock
│
├── frontend/
│   ├── app/
│   │   ├── canteens/
│   │   ├── cart/
│   │   ├── checkout/
│   │   └── orders/
│   ├── components/
│   ├── context/
│   ├── lib/
│   ├── public/
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig.json
│
└── README.md
```

## 8. Prerequisites

Install the following before setting up the project:

- PHP 8.3 or later
- Composer
- PHP PostgreSQL PDO extension (`pdo_pgsql`)
- PostgreSQL
- Node.js and npm
- Git

Verify your PHP extensions:

```powershell
php -m
```

Make sure `pdo_pgsql` appears in the list.

Verify installed versions:

```powershell
php -v
composer --version
node -v
npm -v
git --version
```

## 9. Installation and Setup

### A. Clone the develop branch

The `develop` branch is the shared integration and testing branch.

Clone it directly:

```powershell
git clone -b develop https://github.com/kieshajaecalderon/IT-109_Final-Project.git
```

Navigate into the project:

```powershell
cd IT-109_Final-Project
```

To verify your current branch:

```powershell
git branch
```

Expected:

```text
* develop
```

GitHub repository:

https://github.com/kieshajaecalderon/IT-109_Final-Project

Develop branch:

https://github.com/kieshajaecalderon/IT-109_Final-Project/tree/develop

### B. Backend Setup (Laravel)

Open a terminal and navigate to the backend:

```powershell
cd backend
```

Install PHP dependencies:

```powershell
composer install
```

Create the environment configuration file:

```powershell
Copy-Item .env.example .env
```

Generate the Laravel application key:

```powershell
php artisan key:generate
```

### Configure PostgreSQL

Create a PostgreSQL database named `plato_nabuak`, or use another database name and update your `.env` accordingly.

Configure the following values in `backend/.env`:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=plato_nabuak
DB_USERNAME=postgres
DB_PASSWORD=your_database_password
```

Replace the database username and password with your own PostgreSQL credentials.

**Database migration warning:** Do not run `php artisan migrate` yet unless the team has confirmed that all required shared migrations and foreign-key dependencies have been integrated into the current branch. In particular, the customer ordering tables depend on the canteen and menu item schema.

Once the team confirms that the complete migration set is ready, database migrations can be run using:

```powershell
php artisan migrate
```

Start the Laravel development server:

```powershell
php artisan serve
```

Backend address:

http://127.0.0.1:8000

Laravel API routes can be inspected using:

```powershell
php artisan route:list --path=api -v
```

### C. Frontend Setup (Next.js)

Open a **separate terminal**.

Navigate to the project frontend directory:

```powershell
cd IT-109_Final-Project/frontend
```

If you are already inside the project root:

```powershell
cd frontend
```

Install the exact dependencies recorded in the lock file:

```powershell
npm ci
```

Start the Next.js development server:

```powershell
npm run dev
```

Frontend address:

http://localhost:3000

You can now open the application in your browser.

### D. Initial Application Pages

The following pages are available in the initial frontend:

| Page | URL | Description |
|---|---|---|
| Homepage | `http://localhost:3000` | Main CanteenHub landing page. |
| Canteens | `http://localhost:3000/canteens` | Browse participating canteens. |
| Canteen Menu | `http://localhost:3000/canteens/1` | View sample menu items for a canteen. |
| Shopping Cart | `http://localhost:3000/cart` | View and manage selected food items. |
| Checkout | `http://localhost:3000/checkout` | Enter delivery details and view payment summary. |
| Order History | `http://localhost:3000/orders` | View sample orders and fulfillment progress. |

**Initial application flow:**

1. Open the homepage.
2. Select Explore Canteens.
3. Choose a canteen.
4. Browse the sample menu.
5. Select a food category.
6. Add food items to the cart.
7. Open the shopping cart.
8. Adjust quantities or remove items.
9. Proceed to checkout.
10. View the sample order history.

The initial frontend can be explored independently using sample data. Live ordering, payment processing, and backend synchronization are still being developed.

## 10. Additional Frontend Commands

Run the production build:

```powershell
npm run build
```

Run the linter:

```powershell
npm run lint
```

Start the production server after building:

```powershell
npm run start
```

## 11. Running the Initial Application

For local development, open two separate PowerShell terminals.

**Terminal 1 – Laravel Backend**

```powershell
cd IT-109_Final-Project/backend
php artisan serve
```

**Terminal 2 – Next.js Frontend**

```powershell
cd IT-109_Final-Project/frontend
npm run dev
```

Open your browser:

http://localhost:3000

Both servers should remain running while developing.

If you only want to explore the current sample frontend, starting the Next.js server is sufficient.

## 12. Scope and Limitations

The project focuses on campus-based food ordering and peer delivery.

The following limitations apply:

- No real-time GPS tracking.
- No automated map routing or navigation.
- Delivery destinations are specified through building and room information.
- Order fulfillment follows a predefined state machine.
- PayMongo integration is intended for sandbox testing during development.
- Initial menu and order displays use sample data until backend integration is completed.

## 13. Security and Configuration

- Never commit actual `.env` files or private credentials.
- Use `.env.example` as the environment configuration template.
- Keep API keys, OAuth credentials, payment secrets, and database passwords private.
- Do not expose private backend credentials in frontend code.
- Use sandbox credentials when testing payment integrations.
- Validate user input on both frontend and backend.
- Protect customer-specific endpoints using authentication and authorization.
- Keep the PayMongo webhook publicly accessible but validate its signature before processing events.

## 14. Development and Git Workflow

The team uses separate feature branches and a shared `develop` branch for integration and testing.

Current relevant branches:

- `main` – Main project branch.
- `develop` – Shared integration and application testing branch.
- `feature/auth-admin` – Authentication and administration development.
- `feature/customer-payment-Calderon` – Customer ordering and payment development.

### Switch to develop

```powershell
git switch develop
git pull origin develop
```

### Create your own feature branch

```powershell
git switch develop
git pull origin develop
git switch -c feature/your-feature-name
```

### Save and push your changes

```powershell
git add .
git commit -m "Describe your changes"
git push -u origin feature/your-feature-name
```

After testing, submit a pull request targeting `develop`, not `main`.

**Important:** Do not push incomplete or untested changes directly to `main`. Use `develop` for integration and testing first.

## 15. Development Notes

The backend and frontend are maintained as separate applications within one repository.

- Laravel handles API requests, business logic, authentication, and database operations.
- Next.js provides the user interface and communicates with the backend through REST API endpoints.
- PostgreSQL stores persistent application data.
- Both servers must be running in separate terminals for full local development.

---

**Project:** Multi-Canteen Order & Student Delivery Hub (CanteenHub)  
**Course:** IT 109 – Final Project  
**Team:** Plato Nabuak  
**Repository:** [IT-109_Final-Project](https://github.com/kieshajaecalderon/IT-109_Final-Project)  
**Integration Branch:** `develop`
