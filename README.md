# React + TypeScript + Vite

E-commerce Web App Frontend (React, Vite, Redux Toolkit, RTK Query)

This is the frontend of an eCommerce web application built with React and Vite, 
featuring state management via Redux Toolkit and data fetching using RTK Query. 
The frontend includes an Admin Panel for managing products, users and orders, along with statistics and security features.


Technologies Used

    React: JavaScript library for building user interfaces.
    Vite: Fast build tool that enhances the development experience.
    Redux Toolkit: Simplified state management for predictable state handling.
    RTK Query: Powerful data-fetching and caching solution integrated with Redux Toolkit.
    FireBase: Authentication with firebaee and 0Auth feature.
    Tailwind CSS: Utility-first CSS framework for responsive UI design.
    React Router: For client-side routing.
    Axios: HTTP client used within RTK Query to communicate with the backend.
    Chart.js: For generating statistics and charts in the admin panel.
    ESLint & Prettier: To maintain code quality and consistent formatting.

Features
1. User Authentication and Authorization

    JWT Authentication: Users can register, log in, and access secure parts of the application (e.g., profile, order history).
    Role-based Access: Admins have additional access to manage products, users, and view order statistics.

2. Admin Panel

    Dashboard: Provides an overview of key statistics, including total users, orders, and revenue.
    Charts: Interactive statistics using Chart.js to display sales, user growth, and product analytics.
    Product Management: Admins can create, update, and delete products.
    Order Management: Admins can view all orders, change order status, and track customer details.

3. State Management with Redux Toolkit

    Global State: Redux Toolkit is used to manage the app's global state, including user information, product listings, and cart data.
    RTK Query: Simplified data fetching and caching for APIs, integrated with the backend.

4. Product and Order Listings

    Dynamic Filtering: Users can search and filter products by categories, prices, and ratings.
    Pagination: Efficient pagination for product listings and order history.

5. Security Features

    JWT Protection: Secure routes and components are protected based on user roles (admin vs. regular users).
    Protected Routes: Ensure that only authenticated users can access certain routes like user profiles and the admin dashboard.
    Form Validation: Frontend validation to prevent malicious inputs and ensure data integrity.

6. Responsive Design

    Tailwind CSS: Fully responsive design for seamless experience across devices (desktop, tablet, mobile).

7. Performance Optimization

    Code Splitting: Vite automatically handles code splitting for performance, loading only the necessary parts of the app.
    Lazy Loading: Routes and components are lazily loaded to improve app performance.

State Management

State management is handled using Redux Toolkit, with RTK Query for efficient data fetching and caching.
Examples of Features Managed by Redux:

    Authentication: User login and FireBase Autentication.
    Cart: Local state for managing the shopping cart, including adding and removing products.
    Products: API state management for fetching, creating, updating, and deleting products.