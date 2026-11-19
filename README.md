\#DEVELOP BRANCH ra po icheck sir Roman, currently naa pa sya sa testing stage, i-push ra namo sa main pag final na po amoa system, Thank you po!!

\# Multi-Canteen Order \& Student Delivery Hub



A university-based, multi-vendor food ordering and student delivery platform that connects students and faculty with campus canteen stalls through peer-to-peer delivery services.



\## 1. Project Overview



The \*\*Multi-Canteen Order \& Student Delivery Hub\*\* is designed to make food ordering across the university campus more convenient. Customers can browse participating canteens, select food items, place orders, and specify their preferred building or room as the delivery destination.



Student delivery runners can claim available delivery jobs and earn an additional service fee of ₱5–₱10 per completed delivery.



The platform also provides canteen vendors with tools to manage their menus and incoming orders, while administrators can oversee canteen registrations, delivery activities, and vendor payouts.



\## 2. User Roles



| User Role | Description |

|---|---|

| Customer | Students and faculty who browse canteens, order food, pay for orders, and specify delivery locations. |

| Canteen Stall Vendor | Manages menu items, updates food availability, accepts orders, and marks orders as ready for pickup. |

| Student Delivery Runner | Views available delivery jobs, claims orders, and updates delivery statuses. |

| Administrator | Manages canteen registrations, monitors delivery completion rates, and oversees vendor payouts. |



\## 3. Core Modules



| Module | Main Functions |

|---|---|

| User Profiles | Create, view, update, and deactivate user profiles. |

| Canteens | Register, view, update, and deactivate participating canteen stalls. |

| Menu Items | Create, view, edit, and delete food items, including their prices, photos, and availability. |

| Orders | Place orders, process payments, view order history, and manage order statuses. |

| Delivery Jobs | Display available orders, allow runners to claim jobs, and update delivery statuses. |

| Payouts \& Reports | Monitor vendor payouts, runner completion rates, and payout records. |



\## 4. Order Fulfillment Workflow



Orders follow a defined state-based fulfillment process:



1\. \*\*Paid\*\* – Payment is confirmed, and the order is forwarded to the vendor dashboard.

2\. \*\*Preparing\*\* – The vendor accepts the order and begins food preparation.

3\. \*\*Ready for Pickup\*\* – The vendor marks the order as ready, making it available on the runner job board.

4\. \*\*Out for Delivery\*\* – A student runner claims the order and picks it up.

5\. \*\*Delivered\*\* – The runner completes the delivery to the customer's specified building or room.



\## 5. Technology Stack



| Layer | Technology |

|---|---|

| Frontend | Next.js, TypeScript, Tailwind CSS |

| UI Components | Shadcn UI (planned) |

| Backend | Laravel (PHP) REST API |

| Database | PostgreSQL (Supabase or local PostgreSQL for development) |

| Authentication | Google OAuth (planned integration) |

| Payment Processing | PayMongo Sandbox (planned integration) |

| Caching | Laravel Cache or Redis (Upstash) |

| Object Storage | Supabase Storage, Cloudinary, or MinIO |

| Email Notifications | Google SMTP |

| Address Data | PSGC Address API |



\*Note: Integrations identified as planned are part of the proposed system design and should not be considered implemented until configured and tested.\*



\## 6. Project Structure



```text

IT-109\_Final-Project/

├── backend/

│   ├── app/

│   ├── bootstrap/

│   ├── config/

│   ├── database/

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

│   ├── public/

│   ├── package.json

│   ├── package-lock.json

│   └── tsconfig.json

│

└── README.md

```



\## 7. Prerequisites



Install the following before setting up the project:



\- PHP 8.3 or later

\- Composer

\- PHP PostgreSQL PDO extension (`pdo\_pgsql`)

\- PostgreSQL

\- Node.js and npm

\- Git



Verify your PHP PostgreSQL extension:



```bash

php -m

```



Make sure `pdo\_pgsql` appears in the list.



Verify your installed versions:



```bash

php -v

composer --version

node -v

npm -v

```



\## 8. Installation and Setup



Clone the repository:



```bash

git clone https://github.com/kieshajaecalderon/IT-109\_Final-Project.git

cd IT-109\_Final-Project

```



\### A. Backend Setup (Laravel)



Navigate to the backend directory:



```bash

cd backend

```



Install PHP dependencies:



```bash

composer install

```



Create the environment configuration file:



```bash

cp .env.example .env

```



For Windows PowerShell, use:



```powershell

Copy-Item .env.example .env

```



Generate the Laravel application key:



```bash

php artisan key:generate

```



\### Configure PostgreSQL



Create a PostgreSQL database named `plato\_nabuak`, or use another database name and update your `.env` accordingly.



Configure the following values in `backend/.env`:



```env

DB\_CONNECTION=pgsql

DB\_HOST=127.0.0.1

DB\_PORT=5432

DB\_DATABASE=plato\_nabuak

DB\_USERNAME=postgres

DB\_PASSWORD=your\_database\_password

```



Replace the database username and password with your own PostgreSQL credentials.



Run the database migrations:



```bash

php artisan migrate

```



Start the Laravel development server:



```bash

php artisan serve

```



The backend will be available at:



`http://127.0.0.1:8000`



\### B. Frontend Setup (Next.js)



Open a separate terminal and navigate to the frontend directory:



```bash

cd frontend

```



Install the exact dependencies recorded in the lock file:



```bash

npm ci

```



Start the Next.js development server:



```bash

npm run dev

```



The frontend will be available at:



`http://localhost:3000`



\### C. Additional Frontend Commands



Run the production build:



```bash

npm run build

```



Run the linter:



```bash

npm run lint

```



Start the production server after building:



```bash

npm run start

```



\## 9. Scope and Limitations



The initial project scope focuses on campus-based food ordering and peer delivery.



The following limitations apply:



\- No real-time GPS tracking.

\- No automated map routing or navigation.

\- Delivery destinations are specified through building and room information.

\- Order fulfillment follows a predefined state machine.

\- PayMongo integration is intended for sandbox testing during development.



\## 10. Security and Configuration



\- Never commit your actual `.env` files or private credentials.

\- Use `.env.example` as the environment configuration template.

\- Keep API keys, OAuth credentials, payment secrets, and database passwords private.

\- Do not expose private backend credentials in frontend code.

\- Use sandbox credentials when testing payment integrations.



\## 11. Development Notes



The backend and frontend are maintained as separate applications within one repository.



\- The Laravel backend handles API requests, business logic, authentication, and database operations.

\- The Next.js frontend provides the user interface and communicates with the backend through REST API endpoints.

\- PostgreSQL stores the application's persistent data.



For local development, both servers must be running in separate terminals.



\---



\*\*Project:\*\* Multi-Canteen Order \& Student Delivery Hub  

\*\*Course:\*\* IT 109 – Final Project  

\*\*Repository:\*\* \[IT-109\_Final-Project](https://github.com/kieshajaecalderon/IT-109\_Final-Project)

