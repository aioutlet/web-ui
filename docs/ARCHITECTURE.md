# Customer UI - Architecture Document

## Table of Contents

1. [Overview](#1-overview)
2. [Technology Stack](#2-technology-stack)
3. [Application Architecture](#3-application-architecture)
4. [State Management](#4-state-management)
5. [API Integration](#5-api-integration)
6. [Routing](#6-routing)
7. [Deployment Architecture](#7-deployment-architecture)
8. [Security](#8-security)

---

## 1. Overview

### 1.1 Purpose

Customer UI is a React-based Single Page Application (SPA) that serves as the primary customer-facing interface for the xshopai e-commerce platform. It communicates exclusively with the Web BFF (Backend for Frontend) service, which aggregates and proxies requests to backend microservices.

### 1.2 Architecture Principles

| Principle                        | Description                                    |
| -------------------------------- | ---------------------------------------------- |
| **Single Responsibility**        | Components have one clear purpose              |
| **Composition over Inheritance** | Build complex UIs from simple components       |
| **Separation of Concerns**       | UI, state, and API logic are separated         |
| **BFF Pattern**                  | All backend communication goes through Web BFF |
| **Mobile-First**                 | Design for mobile, enhance for desktop         |

### 1.3 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Customer UI (React SPA)                   │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   Pages     │  │  Components │  │     Hooks & Utils       │  │
│  │  (Routes)   │  │    (UI)     │  │  (Business Logic)       │  │
│  └──────┬──────┘  └──────┬──────┘  └───────────┬─────────────┘  │
│         │                │                     │                 │
│  ┌──────┴────────────────┴─────────────────────┴──────────────┐  │
│  │                    State Management                         │  │
│  │  ┌─────────┐  ┌─────────────┐  ┌───────────────────────┐   │  │
│  │  │ Redux   │  │   Zustand   │  │    React Query        │   │  │
│  │  │ (Cart,  │  │   (Auth)    │  │  (Server State)       │   │  │
│  │  │ Orders) │  │             │  │                       │   │  │
│  │  └─────────┘  └─────────────┘  └───────────────────────┘   │  │
│  └────────────────────────┬───────────────────────────────────┘  │
│                           │                                      │
│  ┌────────────────────────┴───────────────────────────────────┐  │
│  │                     BFF Client (Axios)                      │  │
│  │            Interceptors: JWT, Correlation ID                │  │
│  └────────────────────────┬───────────────────────────────────┘  │
└───────────────────────────┼─────────────────────────────────────┘
                            │ HTTPS
                            ▼
              ┌─────────────────────────────┐
              │         Web BFF             │
              │   (Backend for Frontend)    │
              └──────────────┬──────────────┘
                             │ Dapr
                             ▼
              ┌──────────────────────────────┐
              │     Backend Microservices    │
              │  (Product, User, Cart, etc.) │
              └──────────────────────────────┘
```

---

## 2. Technology Stack

### 2.1 Core Technologies

| Technology   | Version | Purpose             |
| ------------ | ------- | ------------------- |
| React        | 18.2.x  | UI Framework        |
| React Router | 6.x     | Client-side routing |
| Tailwind CSS | 3.x     | Styling             |
| Axios        | 1.x     | HTTP client         |

### 2.2 State Management

| Library       | Purpose                                            |
| ------------- | -------------------------------------------------- |
| Redux Toolkit | Cart, orders, user profile state                   |
| Zustand       | Authentication state with localStorage persistence |
| React Query   | Server state caching and synchronization           |

### 2.3 Development Tools

| Tool                  | Purpose           |
| --------------------- | ----------------- |
| Create React App      | Build toolchain   |
| ESLint                | Code linting      |
| Prettier              | Code formatting   |
| Jest                  | Unit testing      |
| React Testing Library | Component testing |

### 2.4 Production Infrastructure

| Component  | Technology           |
| ---------- | -------------------- |
| Web Server | Nginx (Alpine)       |
| Container  | Docker               |
| Hosting    | Azure Container Apps |
| CDN        | Azure CDN (optional) |

---

## 3. Application Architecture

### 3.1 Directory Structure

```
src/
├── api/                    # API client and endpoints
│   ├── bffClient.js        # Axios instance with interceptors
│   ├── endpoints.js        # API endpoint definitions
│   ├── cartAPI.js          # Cart-specific API functions
│   └── ordersAPI.js        # Order-specific API functions
├── components/             # Reusable UI components
│   ├── cart/               # Cart-related components
│   ├── home/               # Homepage components
│   ├── layout/             # Layout components (Header, Footer)
│   └── ui/                 # Generic UI components (Button, Input)
├── contexts/               # React contexts
│   └── ThemeContext.js     # Dark mode context
├── data/                   # Static/mock data
├── hooks/                  # Custom React hooks
│   ├── useAuth.js          # Authentication hook
│   └── useCart.js          # Cart management hook
├── pages/                  # Page components (route targets)
│   ├── HomePage.jsx
│   ├── ProductListPage.jsx
│   ├── ProductDetailPage.jsx
│   ├── CartPage.jsx
│   ├── CheckoutPage.jsx
│   └── ...
├── store/                  # State management
│   ├── authStore.js        # Zustand auth store
│   └── slices/             # Redux slices
│       ├── cartSlice.js
│       ├── orderSlice.js
│       └── userSlice.js
├── utils/                  # Utility functions
│   ├── storage.js          # localStorage helpers
│   └── formatters.js       # Data formatters
├── App.jsx                 # Root component with providers
└── index.js                # Entry point
```

### 3.2 Component Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         App.jsx                              │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Providers: Redux, QueryClient, Theme, Router            ││
│  │  ┌─────────────────────────────────────────────────────┐││
│  │  │                    Layout                           │││
│  │  │  ┌────────────┐                                     │││
│  │  │  │   Header   │  (Navigation, Search, Cart Icon)    │││
│  │  │  └────────────┘                                     │││
│  │  │  ┌────────────────────────────────────────────────┐ │││
│  │  │  │              Page Content                      │ │││
│  │  │  │  (Rendered by React Router based on URL)       │ │││
│  │  │  └────────────────────────────────────────────────┘ │││
│  │  │  ┌────────────┐                                     │││
│  │  │  │   Footer   │                                     │││
│  │  │  └────────────┘                                     │││
│  │  │  ┌────────────┐                                     │││
│  │  │  │ CartSidebar│  (Slides in from right)             │││
│  │  │  └────────────┘                                     │││
│  │  └─────────────────────────────────────────────────────┘││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

---

## 4. State Management

### 4.1 State Management Strategy

The application uses a **hybrid state management** approach:

| Store           | Technology            | Use Case                                 |
| --------------- | --------------------- | ---------------------------------------- |
| **Redux (RTK)** | @reduxjs/toolkit      | Domain state: cart, orders, user profile |
| **Zustand**     | zustand               | Auth state with localStorage persistence |
| **React Query** | @tanstack/react-query | Server state: products, reviews, etc.    |
| **Context**     | React Context         | Theme (dark mode)                        |

### 4.2 Redux Slices

```javascript
// Cart Slice - src/store/slices/cartSlice.js
{
  items: [],           // Cart items with product details
  isLoading: false,    // Loading state for cart operations
  error: null,         // Error state
  lastSynced: null     // Timestamp of last server sync
}

// User Slice - src/store/slices/userSlice.js
{
  profile: null,       // User profile data
  addresses: [],       // Saved addresses
  paymentMethods: [],  // Saved payment methods
  isLoading: false,
  error: null
}

// Order Slice - src/store/slices/orderSlice.js
{
  orders: [],          // Order history
  currentOrder: null,  // Order being placed
  isLoading: false,
  error: null
}
```

### 4.3 Zustand Auth Store

```javascript
// Auth Store - src/store/authStore.js
{
  user: null,              // Current user object
  isAuthenticated: false,  // Auth status
  isLoading: false,        // Auth operation in progress
  error: null,             // Auth error

  // Actions
  setUser: (user) => {},
  clearAuth: () => {},
  setLoading: (loading) => {},
  setError: (error) => {}
}
```

### 4.4 React Query Configuration

```javascript
// Query Client Config
{
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,    // 5 minutes
      cacheTime: 10 * 60 * 1000,   // 10 minutes
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
}
```

---

## 5. API Integration

### 5.1 BFF Client Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      BFF Client (Axios)                      │
├─────────────────────────────────────────────────────────────┤
│  Request Interceptors:                                       │
│  ├── Add JWT token from storage                             │
│  ├── Add correlation ID (x-correlation-id)                  │
│  └── Add Content-Type header                                │
├─────────────────────────────────────────────────────────────┤
│  Response Interceptors:                                      │
│  ├── Handle 401 → Attempt token refresh → Retry             │
│  ├── Handle network errors → Show error message             │
│  └── Log errors for debugging                               │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 API Endpoints

| Category     | Endpoints                                                                     |
| ------------ | ----------------------------------------------------------------------------- |
| **Products** | `GET /api/products`, `GET /api/products/:id`, `GET /api/products/search`      |
| **Auth**     | `POST /api/auth/login`, `POST /api/auth/register`, `POST /api/auth/logout`    |
| **User**     | `GET /api/user/profile`, `PATCH /api/user/profile`, `GET /api/user/addresses` |
| **Cart**     | `GET /api/cart`, `POST /api/cart/items`, `DELETE /api/cart/items/:id`         |
| **Orders**   | `GET /api/orders`, `GET /api/orders/:id`, `POST /api/orders`                  |
| **Reviews**  | `GET /api/reviews/products/:id`, `POST /api/reviews`                          |

### 5.3 Error Handling

```javascript
// Error Response Format
{
  success: false,
  error: {
    message: "Human readable error",
    code: "ERROR_CODE",
    details: {}  // Optional additional info
  },
  traceId: "correlation-id"
}
```

---

## 6. Routing

### 6.1 Route Structure

| Route                    | Component         | Auth Required |
| ------------------------ | ----------------- | ------------- |
| `/`                      | HomePage          | No            |
| `/products`              | ProductListPage   | No            |
| `/products/:id`          | ProductDetailPage | No            |
| `/:department`           | ProductListPage   | No            |
| `/:department/:category` | ProductListPage   | No            |
| `/cart`                  | CartPage          | No            |
| `/checkout`              | CheckoutPage      | Yes           |
| `/login`                 | LoginPage         | No            |
| `/register`              | RegisterPage      | No            |
| `/account`               | AccountPage       | Yes           |
| `/account/orders`        | OrdersPage        | Yes           |
| `/account/orders/:id`    | OrderDetailPage   | Yes           |
| `/account/addresses`     | AddressesPage     | Yes           |
| `/account/wishlist`      | WishlistPage      | Yes           |

### 6.2 Protected Routes

```jsx
// ProtectedRoute.jsx
<Route
  path="/checkout"
  element={
    <ProtectedRoute>
      <CheckoutPage />
    </ProtectedRoute>
  }
/>
```

---

## 7. Deployment Architecture

### 7.1 Build Process

```
┌──────────────────────────────────────────────────────────────┐
│                    Build Pipeline                             │
├──────────────────────────────────────────────────────────────┤
│  1. npm install          → Install dependencies               │
│  2. npm run build        → Create optimized production build  │
│  3. Docker build         → Create Nginx-based container       │
│  4. Push to ACR          → Store in Azure Container Registry  │
│  5. Deploy to ACA        → Run in Azure Container Apps        │
└──────────────────────────────────────────────────────────────┘
```

### 7.2 Container Architecture

```dockerfile
# Multi-stage build
┌─────────────────────────────────────────┐
│  Stage 1: Build                         │
│  - Node.js 24 Alpine                    │
│  - npm ci && npm run build              │
│  - Output: /app/build                   │
└───────────────┬─────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│  Stage 2: Production                    │
│  - Nginx 1.27 Alpine                    │
│  - Copy build output to /usr/share/nginx│
│  - Expose port 8080                     │
│  - Health check on /health              │
└─────────────────────────────────────────┘
```

### 7.3 Azure Container Apps Deployment

```
┌─────────────────────────────────────────────────────────────────┐
│                 Azure Container Apps Environment                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────┐                                          │
│  │   customer-ui      │◄── External Ingress (HTTPS)              │
│  │   (Container App)  │    https://customer-ui.*.azurecontainerapps.io
│  │                    │                                          │
│  │  ┌──────────────┐  │    Environment Variables:                │
│  │  │    Nginx     │  │    - REACT_APP_BFF_URL                   │
│  │  │  (Port 8080) │  │                                          │
│  │  └──────────────┘  │                                          │
│  └─────────┬──────────┘                                          │
│            │                                                     │
│            │ HTTPS (internal)                                    │
│            ▼                                                     │
│  ┌────────────────────┐                                          │
│  │     web-bff        │◄── Internal Ingress                      │
│  │  (Container App)   │                                          │
│  └────────────────────┘                                          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 7.4 Environment Variables

| Variable            | Description | Example                                   |
| ------------------- | ----------- | ----------------------------------------- |
| `REACT_APP_BFF_URL` | Web BFF URL | `https://web-bff.*.azurecontainerapps.io` |
| `NODE_ENV`          | Environment | `production`                              |

**Note:** React apps build environment variables at build time, not runtime. For runtime configuration, use a config endpoint or inject into `window.__CONFIG__`.

---

## 8. Security

### 8.1 Authentication Flow

```
┌──────────────────────────────────────────────────────────────┐
│                   Authentication Flow                         │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  1. User enters credentials                                   │
│       │                                                       │
│       ▼                                                       │
│  2. POST /api/auth/login → Web BFF → Auth Service            │
│       │                                                       │
│       ▼                                                       │
│  3. Receive JWT token + refresh token                        │
│       │                                                       │
│       ▼                                                       │
│  4. Store tokens (localStorage via Zustand persist)          │
│       │                                                       │
│       ▼                                                       │
│  5. Subsequent requests include Bearer token                 │
│       │                                                       │
│       ▼                                                       │
│  6. On 401 → Attempt refresh → Retry original request        │
│       │                                                       │
│       ▼                                                       │
│  7. On refresh failure → Redirect to login                   │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### 8.2 Security Best Practices

| Practice         | Implementation                                          |
| ---------------- | ------------------------------------------------------- |
| XSS Prevention   | React's built-in escaping, no `dangerouslySetInnerHTML` |
| CSRF Protection  | JWT in Authorization header (not cookies)               |
| Secure Storage   | Tokens in localStorage (acceptable for SPAs)            |
| HTTPS Only       | All communication over HTTPS                            |
| Input Validation | Client-side validation + server-side enforcement        |
| Error Handling   | No sensitive data in error messages                     |

### 8.3 Content Security Policy

```nginx
# Nginx security headers
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
```

---

## Appendix A: Key Files Reference

| File                               | Purpose                                 |
| ---------------------------------- | --------------------------------------- |
| `src/App.jsx`                      | Root component, provider setup, routing |
| `src/api/bffClient.js`             | HTTP client with interceptors           |
| `src/api/endpoints.js`             | API endpoint definitions                |
| `src/store/authStore.js`           | Zustand auth store                      |
| `src/hooks/useAuth.js`             | Auth mutations and queries              |
| `src/components/layout/Layout.jsx` | App shell with navigation               |
| `nginx.conf`                       | Production web server config            |
| `Dockerfile`                       | Multi-stage build definition            |

---
