# E-Commerce API

## Overview

This project is a **RESTful API** built for an **e-commerce platform**, designed to handle product inventory, user orders, authentication, and more. The API is developed using **Node.js (Express)** and **PostgreSQL**, with a focus on security, performance, and scalability.

## Features

### 1. **User Authentication & Authorization**

- Implements **JWT-based authentication** for secure access.
- Supports user roles (e.g., **Admin, Customer**).
- Middleware for **protected routes** to ensure only authorized users can access sensitive resources.

### 2. **Product & Category Management**

- CRUD operations for **products and categories**.
- Products are linked to categories for easy filtering.

### 3. **Shopping Cart & Orders**

- Users can **add products to their cart** and place orders.
- Orders store user purchase history and include relevant details like total price and status.

### 4. **Rate Limiting & Security Measures**

- Prevents API abuse using **Express rate limiting**.
- Implements **CORS and input validation** for security.

### 5. **Data Migration from Legacy System**

- Includes a script to **migrate product and order data from a CSV file** into the database.

### 6. **Flash Sales & High-Traffic Optimization**

- Implements a **Flash Sale system**, allowing for **time-sensitive discounts**.
- Optimized database queries using **PostgreSQL indexing and efficient query patterns**.

## Tech Stack

- **Backend:** Node.js (Express)
- **Database:** PostgreSQL
- **Authentication:** JWT
- **API Security:** Rate Limiting, CORS, Input Validation

## Installation & Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/ecommerce-api.git
   cd ecommerce-api
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables in a `.env` file:

   ```sh
   DATABASE_URL=your_postgres_connection_string
   JWT_SECRET=your_secret_key
   PORT=5000
   ```

4. Run database migrations (if applicable):

   ```sh
   npx prisma migrate dev
   ```

5. Start the server:

   ```sh
   npm start
   ```

## Live Demo & Documentation

- **Live URL:** [E-Commerce API](https://e-commerce-dope-production.up.railway.app/)
- **API Documentation:** [Postman Docs](https://documenter.getpostman.com/view/29521209/2sAYdfoW4f)

## License

This project is licensed under the **MIT License**.

