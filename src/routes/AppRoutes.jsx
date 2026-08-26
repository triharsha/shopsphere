import {
  lazy,
  Suspense,
} from "react";

import {
  Route,
  Routes,
} from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

/* ========================================
   Lazy Loaded Pages
======================================== */

const Home = lazy(
  () => import("../pages/Home")
);

const Shop = lazy(
  () => import("../pages/Shop")
);

const ProductDetails = lazy(
  () =>
    import(
      "../pages/ProductDetails"
    )
);

const SearchResults = lazy(
  () =>
    import(
      "../pages/SearchResults"
    )
);

const Login = lazy(
  () => import("../pages/Login")
);

const Signup = lazy(
  () => import("../pages/Signup")
);

const Cart = lazy(
  () => import("../pages/Cart")
);

const Wishlist = lazy(
  () => import("../pages/Wishlist")
);

const Compare = lazy(
  () => import("../pages/Compare")
);

const Checkout = lazy(
  () => import("../pages/Checkout")
);

const OrderSuccess = lazy(
  () =>
    import(
      "../pages/OrderSuccess"
    )
);

const Orders = lazy(
  () => import("../pages/Orders")
);

const OrderDetails = lazy(
  () =>
    import(
      "../pages/OrderDetails"
    )
);

const Account = lazy(
  () => import("../pages/Account")
);

const Addresses = lazy(
  () =>
    import(
      "../pages/Addresses"
    )
);

const NotFound = lazy(
  () => import("../pages/NotFound")
);

/* ========================================
   Route Loader
======================================== */

const PageLoader = () => {
  return (
    <div
      className="
        flex
        min-h-[60vh]
        items-center
        justify-center
      "
    >
      <div
        className="
          h-10
          w-10

          animate-spin

          rounded-full

          border-4
          border-stone-200
          border-t-emerald-600

          dark:border-stone-700
          dark:border-t-emerald-400
        "
      />
    </div>
  );
};

/* ========================================
   Routes
======================================== */

const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <PageLoader />
      }
    >
      <Routes>
        {/* =====================================
            Main ShopSphere Layout
        ===================================== */}

        <Route
          element={
            <MainLayout />
          }
        >
          {/* =====================================
              Public Routes
          ===================================== */}

          <Route
            path="/"
            element={
              <Home />
            }
          />

          <Route
            path="/shop"
            element={
              <Shop />
            }
          />

          <Route
            path="/product/:id"
            element={
              <ProductDetails />
            }
          />

          <Route
            path="/search"
            element={
              <SearchResults />
            }
          />

          <Route
            path="/cart"
            element={
              <Cart />
            }
          />

          <Route
            path="/compare"
            element={
              <Compare />
            }
          />

          {/* =====================================
              Protected Routes
          ===================================== */}

          <Route
            element={
              <ProtectedRoute />
            }
          >
            <Route
              path="/wishlist"
              element={
                <Wishlist />
              }
            />

            <Route
              path="/checkout"
              element={
                <Checkout />
              }
            />

            <Route
              path="/order-success"
              element={
                <OrderSuccess />
              }
            />

            <Route
              path="/orders"
              element={
                <Orders />
              }
            />

            <Route
              path="/orders/:orderId"
              element={
                <OrderDetails />
              }
            />

            <Route
              path="/account"
              element={
                <Account />
              }
            />

            <Route
              path="/addresses"
              element={
                <Addresses />
              }
            />
          </Route>

          {/* =====================================
              404
          ===================================== */}

          <Route
            path="*"
            element={
              <NotFound />
            }
          />
        </Route>

        {/* =====================================
            Authentication Pages
        ===================================== */}

        <Route
          path="/login"
          element={
            <Login />
          }
        />

        <Route
          path="/signup"
          element={
            <Signup />
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;