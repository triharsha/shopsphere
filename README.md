# 🛍️ ShopSphere

ShopSphere is a modern and responsive frontend e-commerce web application built with React. It provides a complete shopping experience including product discovery, search and filtering, cart management, wishlist, product comparison, checkout, order management, user accounts, and persistent user data.

The project demonstrates practical React development using Redux Toolkit, React Router, REST API integration, localStorage persistence, responsive UI design, protected routes, dark mode, and production-oriented optimization.

---

## 🌐 Live Demo

**Live Website:** https://shopsphere-rosy.vercel.app/

---

## 📖 Overview

ShopSphere simulates a complete e-commerce shopping platform where users can browse products, search and filter the catalog, view detailed product information, manage their cart and wishlist, compare products, complete checkout, and manage their orders and account information.

Product data is retrieved from the DummyJSON Products API, while authentication, checkout state, orders, addresses, and other user-specific information are simulated on the frontend using Redux Toolkit and browser localStorage.

The application is fully responsive and supports both light and dark themes.

> ShopSphere is a frontend portfolio project. Authentication, payment validation, checkout, and order processing are simulated client-side and do not represent real server-side authentication or payment processing.

---

## ✨ Features

### 🏠 Home Page

- Modern e-commerce landing page
- Hero section
- Product categories
- Featured products
- Trending products
- Deals section
- Promotional banners
- Shopping benefits section
- Responsive navigation and footer

### 🛒 Product Catalog

- Browse available products
- Product grid layout
- Category filtering
- Price and rating filters
- Multiple combined filters
- Active filter management
- Product sorting
- Pagination
- Loading skeletons
- Responsive mobile filter drawer

### 🔍 Search

- Search products by keyword
- Dedicated search results page
- Query-based product discovery
- Handles empty and invalid searches
- Integrated with the product API

### 📦 Product Details

- Product image gallery
- Product information
- Pricing and discount details
- Stock information
- Quantity selection
- Add to cart
- Buy Now
- Wishlist support
- Product comparison
- Product reviews
- Related products
- Recently viewed products

### 🛒 Shopping Cart

- Add products to cart
- Update product quantities
- Remove products
- Clear cart
- Cart quantity indicator
- Cart subtotal calculation
- Delivery charge calculation
- Free-delivery threshold
- Stock-aware quantity limits
- Guest cart persistence
- User-specific cart persistence

### ❤️ Wishlist

- Add products to wishlist
- Remove products from wishlist
- Toggle wishlist status
- Clear wishlist
- User-specific persistence
- Protected wishlist page

### ⚖️ Product Comparison

- Add products for comparison
- Remove compared products
- Compare multiple products
- Maximum comparison limit
- Persistent comparison data

### 🔐 Authentication

- User signup
- User login
- User logout
- Persistent login session
- Protected routes
- Redirect back to the originally requested page after login
- User-specific shopping data
- Profile information management

Authentication is implemented as a frontend simulation using browser storage and is not intended to represent production server-side authentication.

### 💳 Checkout

- Cart checkout
- Buy Now checkout
- Delivery address selection
- Add new delivery addresses
- Multiple payment methods
- UPI validation
- Card validation
- Cash on Delivery
- Order summary
- Pricing calculations
- Order creation
- Buy Now does not clear the existing cart

Payment methods are simulated for demonstration purposes. No real payment transaction is performed.

### 📍 Address Management

- Add addresses
- Edit addresses
- Delete addresses
- Select delivery address
- Persistent user-specific addresses
- Saved addresses available during checkout

### 📋 Orders

- Order success flow
- Generated order IDs
- Order history
- Order details
- Product and quantity information
- Delivery address details
- Payment method information
- Order totals
- Persistent order history

### 👤 Account

- View account information
- Update profile
- Persistent profile changes
- Account statistics
- Recent order summary
- Access orders
- Manage addresses
- User-specific data management

### 🕒 Recently Viewed

- Tracks recently viewed products
- Quick access to previously explored products
- Maximum history limit
- Clear recently viewed history
- User-specific persistence

### 🌙 Theme Support

- Light mode
- Dark mode
- Persistent theme preference
- Dark-mode styling across the application

### 📱 Responsive Design

ShopSphere is designed for:

- Mobile devices
- Tablets
- Laptops
- Desktop screens

The interface includes responsive navigation, mobile menus, filter drawers, adaptive product grids, responsive checkout layouts, and mobile-friendly account and order pages.

---

## 🛠️ Tech Stack

### Frontend

- React
- JavaScript (ES6+)
- HTML5
- CSS3
- Tailwind CSS

### State Management

- Redux Toolkit
- React Redux

### Routing

- React Router DOM

### API & HTTP

- Axios
- DummyJSON Products API

### UI & Utilities

- Lucide React
- React Hot Toast
- Framer Motion
- @hello-pangea/dnd

### Build Tool

- Vite

### Data Persistence

- Browser localStorage

---

## 🌐 API

ShopSphere uses the **DummyJSON Products API** for product information.

Product API functionality includes:

- Fetch products
- Fetch individual products
- Search products
- Fetch product categories
- Fetch products by category

API service logic is centralized inside:

```text
src/services/productApi.js
```

---

## 🧠 State Management

Redux Toolkit is used to manage important application state.

The project contains dedicated Redux slices for:

```text
Authentication
Cart
Products
Wishlist
Compare
```

The Redux store is configured in:

```text
src/app/store.js
```

Additional persistent application features such as addresses, orders, recently viewed products, and theme preferences are managed through the application's storage and supporting state logic.

---

## 💾 Local Storage

ShopSphere uses browser localStorage to simulate persistent application data without requiring a backend database.

Persistent information includes:

- Registered users
- Login session
- Guest cart
- User cart
- Wishlist
- Compare products
- Addresses
- Orders
- Recently viewed products
- Theme preference

User-specific information is isolated so different ShopSphere accounts maintain their own shopping data.

---

## 🛡️ Protected Routes

Certain pages require authentication.

Protected pages include:

```text
/wishlist
/checkout
/order-success
/orders
/orders/:orderId
/account
/addresses
```

Unauthenticated users are redirected to the login page.

After successful authentication, ShopSphere returns the user to the page they originally attempted to access.

---

## 📁 Project Structure

```text
src/
│
├── app/
│   └── store.js
│
├── assets/
│   └── hero.png
│
├── components/
│   ├── checkout/
│   ├── common/
│   ├── home/
│   ├── layout/
│   ├── product/
│   └── shop/
│
├── constants/
│
├── context/
│   └── ThemeContext.jsx
│
├── features/
│   ├── auth/
│   ├── cart/
│   ├── compare/
│   ├── products/
│   └── wishlist/
│
├── pages/
│
├── routes/
│   ├── AppRoutes.jsx
│   └── ProtectedRoute.jsx
│
├── services/
│   └── productApi.js
│
├── utils/
│   └── storage.js
│
├── App.jsx
├── index.css
└── main.jsx
```

---

## 🚀 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/triharsha/shopsphere.git
```

### 2. Navigate into the project

```bash
cd shopsphere
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL displayed by Vite in your browser.

---

## 🧪 Linting

Run ESLint using:

```bash
npm run lint
```

The ShopSphere codebase is validated with ESLint as part of the final production-readiness checks.

---

## 📦 Production Build

Create an optimized production build using:

```bash
npm run build
```

The generated production files will be available inside:

```text
dist/
```

ShopSphere uses route-based code splitting to reduce the initial JavaScript bundle and improve application loading performance.

---

## 👀 Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

---

## 📸 Screenshots

### Home Page

![ShopSphere Home](./screenshots/home.png)

### Shop

![ShopSphere Shop](./screenshots/shop.png)

### Product Details

![ShopSphere Product Details](./screenshots/product-details.png)

### Checkout

![ShopSphere Checkout](./screenshots/checkout.png)

### Dark Mode

![ShopSphere Dark Mode](./screenshots/dark-mode.png)

---

## 🧪 Testing

ShopSphere has been manually tested across its major application flows, including:

- Authentication
- Protected route redirects
- Product browsing
- Search
- Filtering
- Combined filters
- Sorting
- Pagination
- Product details
- Cart operations
- Wishlist
- Product comparison
- Checkout
- Buy Now
- Payment validation
- Address management
- Order creation
- Order history
- Order details
- Account management
- Recently viewed products
- User-specific data persistence
- Theme persistence
- localStorage persistence
- Responsive layouts
- Route navigation and scrolling

The project is also validated using ESLint and a Vite production build before deployment.

---

## ⚡ Performance

ShopSphere includes production-oriented optimizations such as:

- Route-based lazy loading
- JavaScript code splitting
- Optimized Vite production build
- Loading skeletons
- Centralized API services
- Redux selectors
- Reusable React components

---

## 🔮 Future Improvements

ShopSphere currently operates as a frontend e-commerce application.

Possible future improvements include:

- Spring Boot backend
- MySQL database
- JWT authentication
- Real payment gateway integration
- Admin dashboard
- Product inventory management
- Server-side order management
- Product recommendations
- Email order confirmation
- Cloud image storage

---

## 🎯 Project Purpose

ShopSphere was developed to demonstrate practical frontend development skills using React and modern JavaScript technologies.

The project focuses on building a realistic e-commerce workflow while applying:

- Component-based architecture
- State management
- REST API integration
- Client-side routing
- Authentication flows
- Persistent browser storage
- Responsive design
- Performance optimization
- Production-ready project organization

---

## 👨‍💻 Author

**Triharsha**

Full Stack Developer | Java Enthusiast

---

## ⭐ Support

If you found this project useful or interesting, consider giving the repository a ⭐ on GitHub.