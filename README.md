# Smart-Cart-E-commerce-Full-Stack-Application

[![Smart Cart CI](https://github.com/Sandzdante01/Smart-Cart-E-commerce-Full-Stack-Application/actions/workflows/ci.yml/badge.svg)](https://github.com/Sandzdante01/Smart-Cart-E-commerce-Full-Stack-Application/actions/workflows/ci.yml)

Smart Cart is a full-featured MERN (MongoDB, Express, React, Node.js) e-commerce application. It is structured into a backend API service and a frontend React Single Page Application (SPA) powered by Vite, TypeScript, and Tailwind CSS. The app features a customer storefront, a user account management area, and a comprehensive admin control panel.

---

## 🚀 Features

### 🛒 Customer Storefront
*   **Home Page**: Dynamic landing page showcasing featured collections and banners.
*   **Shop Page**: Product browsing with search, filter (by category, price, brand, rating), and sorting capability.
*   **Product Details**: View product specs, dynamic stock status, reviews, and average rating.
*   **Cart & Wishlist**: Real-time cart calculations and persistent wishlist.
*   **Checkout Flow**: Multi-step checkout with address details and payment selection.
*   **Real-time Notifications**: Custom notifications for order placement and status updates via Socket.IO.

### 👤 User Account Panel
*   **Overview Dashboard**: View recent activities, order highlights, and account status.
*   **Profile Manager**: Update personal details (name, email, phone).
*   **Address Book**: Create and manage shipping/billing addresses.
*   **Order History**: Track past orders and view detailed invoices/receipts.
*   **Product Reviews**: Read, write, and manage submitted product reviews.
*   **Settings**: Password changes and account preferences.

### 🛠️ Administrative Dashboard
*   **Analytics Hub**: Visual charts displaying revenues, orders, top categories, and sales trends using Recharts.
*   **Product Catalog**: Full CRUD system to add, edit, or delete products (via a dedicated Product Form).
*   **Category Control**: Create, update, or remove categories to keep the catalog organized.
*   **Order Management**: Track all user orders, inspect payloads, and transition order statuses (Pending ➔ Processing ➔ Shipped ➔ Delivered ➔ Cancelled) in real time.
*   **Customer Directory**: Browse customer accounts, view profiles, and access customer transaction metrics.
*   **Reviews Moderation**: Monitor customer reviews and flag/delete inappropriate comments.
*   **Settings**: System configurations.

---

## 💻 Tech Stack

### Frontend
*   **Framework**: [React](https://react.dev/) (v18)
*   **Build Tool**: [Vite](https://vitejs.dev/) & [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/) (animations)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **State Management**: Context-based store provider (`StoreContext.tsx`)
*   **Real-time Client**: `socket.io-client`
*   **Charts**: [Recharts](https://recharts.org/)

### Backend
*   **Runtime**: [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/) (using ES Modules)
*   **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose ODM](https://mongoosejs.com/)
*   **Authentication**: JWT (JSON Web Tokens) & [bcryptjs](https://github.com/dcodeIO/bcrypt.js/)
*   **Real-time Server**: Socket.IO for event dispatching
*   **Testing**: [Jest](https://jestjs.io/)
*   **Daemon/Watcher**: [Nodemon](https://nodemon.io/)

---

## 📁 Repository Structure

```
├── .github/workflows/
│   └── ci.yml             # GitHub Actions CI configurations (backend & frontend)
├── backend/
│   ├── config/            # DB configuration
│   ├── models/            # Mongoose Schemas (User, Product, Order, etc.)
│   ├── routes/            # Express Route handlers
│   ├── scripts/           # Seeding script (seed.js)
│   ├── tests/             # Jest tests
│   ├── server.js          # App entrypoint & Socket.io configuration
│   └── package.json
└── frontend/
    ├── public/            # Static assets
    ├── src/
    │   ├── components/    # Modular UI components (admin, cart, layout, ui, product)
    │   ├── contexts/      # Context providers (StoreContext)
    │   ├── pages/         # Page components (Home, Shop, Account, Admin, etc.)
    │   ├── services/      # API communication layer (api.ts)
    │   ├── types/         # TypeScript declarations
    │   ├── App.tsx        # React Router layout and entry
    │   └── main.tsx       # Root entrypoint
    ├── tailwind.config.js
    ├── tsconfig.json
    └── package.json
```

---

## 🔧 Setup & Installation

### Prerequisites
*   [Node.js](https://nodejs.org/) (Recommended: Node 24 as targeted by CI/CD)
*   [MongoDB](https://www.mongodb.com/try/download/community) (Local running server or MongoDB Atlas URI)

### 1. Clone the repository
```bash
git clone https://github.com/Sandzdante01/Smart-Cart-E-commerce-Full-Stack-Application.git
cd Smart-Cart-E-commerce-Full-Stack-Application
```

### 2. Install all dependencies
You can install the root, frontend, and backend packages in a single command using the custom script defined in the root `package.json`:
```bash
npm run install-all
```

### 3. Environment Variables
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri_here
JWT_SECRET=your_jwt_secret_here
```

---

## 🏃 Running the Application

### Running Both Frontend & Backend Concurrently
Start the development server for both projects simultaneously using:
```bash
npm run dev
```
*   **Frontend App**: Runs on `http://localhost:5173` (by default)
*   **Backend Server**: Runs on `http://localhost:5000` (by default)

### Individual Process Execution
If you wish to run the backend and frontend separately:
*   **Run Backend Only**: `npm run backend` (or `npm run dev` inside `backend/`)
*   **Run Frontend Only**: `npm run frontend` (or `npm run dev` inside `frontend/`)

---

## 🗃️ Database Seeding

The server features an **automatic database seeding mechanism** upon startup. If the MongoDB database is empty, it automatically triggers the seeding script to populate default categories, products, and admin accounts.

To manually seed the database, run:
```bash
npm run seed
```

---

## 🧪 Running Tests & Validation

Run the test suite defined for the backend using:
```bash
# From the root directory
npm test --prefix backend

# Or inside backend directory
npm test
```

---

## 🔄 CI/CD Workflow

The repository is integrated with **GitHub Actions** (`.github/workflows/ci.yml`). Every push or pull request to the `main` or `develop` branches triggers:
1.  **Backend validation**: Sets up Node 24, installs dependencies via `npm ci`, and runs the Jest tests.
2.  **Frontend validation**: Sets up Node 24, installs client dependencies, and runs `npm run build` to verify there are no compilation or typescript errors.