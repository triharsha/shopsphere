import {
  Heart,
  Home,
  LogIn,
  LogOut,
  MapPin,
  Package,
  Scale,
  ShoppingBag,
  Store,
  User,
  UserPlus,
  X,
} from "lucide-react";

import {
  useEffect,
} from "react";

import {
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import toast from "react-hot-toast";

import {
  logout,
  selectCurrentUser,
  selectIsAuthenticated,
} from "../../features/auth/authSlice";

const MobileMenu = ({
  isOpen,
  onClose,
}) => {
  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const currentUser =
    useSelector(
      selectCurrentUser
    );

  const isAuthenticated =
    useSelector(
      selectIsAuthenticated
    );

  /* =====================================
     Scroll Lock + Escape To Close
  ===================================== */

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousBodyOverflow =
      document.body.style
        .overflow;

    const previousHtmlOverflow =
      document.documentElement
        .style.overflow;

    document.body.style.overflow =
      "hidden";

    document.documentElement.style
      .overflow = "hidden";

    const handleKeyDown = (
      event
    ) => {
      if (
        event.key ===
        "Escape"
      ) {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousBodyOverflow;

      document.documentElement.style
        .overflow =
        previousHtmlOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    isOpen,
    onClose,
  ]);

  /* =====================================
     Route Change Scroll Safety
  ===================================== */

  useEffect(() => {
    document.body.style.overflow =
      "";

    document.documentElement.style
      .overflow = "";
  }, [
    location.pathname,
  ]);

  /* =====================================
     Logout
  ===================================== */

  const handleLogout =
    () => {
      dispatch(
        logout()
      );

      toast.success(
        "You have been signed out."
      );

      onClose();

      navigate(
        "/",
        {
          replace: true,
        }
      );
    };

  /* =====================================
     Navigation Style
  ===================================== */

  const linkClass = ({
    isActive,
  }) => `
    flex
    items-center
    gap-3

    rounded-xl

    px-4
    py-3

    text-sm
    font-semibold

    transition-colors
    duration-200

    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-emerald-500
    focus-visible:ring-offset-2

    dark:focus-visible:ring-offset-stone-900

    ${
      isActive
        ? `
            bg-emerald-50
            text-emerald-700

            dark:bg-emerald-950/40
            dark:text-emerald-400
          `
        : `
            text-stone-700
            dark:text-stone-200

            hover:bg-stone-100
            hover:text-stone-900

            dark:hover:bg-stone-800
            dark:hover:text-white
          `
    }
  `;

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50

        lg:hidden
      "
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
    >
      {/* =====================================
          Backdrop
      ===================================== */}

      <button
        type="button"
        aria-label="Close navigation menu"
        onClick={
          onClose
        }
        className="
          absolute
          inset-0

          cursor-default

          bg-black/45

          backdrop-blur-[2px]
        "
      />

      {/* =====================================
          Drawer
      ===================================== */}

      <aside
        className="
          relative
          z-10

          flex
          h-full
          w-[min(300px,85vw)]
          flex-col

          overflow-hidden

          border-r
          border-stone-200
          dark:border-stone-800

          bg-white
          dark:bg-stone-900

          shadow-2xl
        "
      >
        {/* =====================================
            Header
        ===================================== */}

        <div
          className="
            flex
            shrink-0
            items-center
            justify-between
            gap-4

            border-b
            border-stone-200
            dark:border-stone-800

            px-5
            py-5
          "
        >
          <div
            className="
              min-w-0
            "
          >
            <p
              className="
                truncate

                text-xl
                font-black
                tracking-tight

                text-stone-900
                dark:text-white
              "
            >
              ShopSphere
            </p>

            <p
              className="
                mt-0.5

                truncate

                text-xs

                text-stone-500
                dark:text-stone-400
              "
            >
              Shop smarter. Live better.
            </p>
          </div>

          <button
            type="button"
            onClick={
              onClose
            }
            aria-label="Close menu"
            title="Close menu"
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center

              rounded-xl

              bg-stone-100
              dark:bg-stone-800

              text-stone-600
              dark:text-stone-300

              transition-colors

              hover:bg-stone-200
              hover:text-stone-900

              dark:hover:bg-stone-700
              dark:hover:text-white

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-emerald-500
              focus-visible:ring-offset-2

              dark:focus-visible:ring-offset-stone-900
            "
          >
            <X
              size={20}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* =====================================
            User Summary
        ===================================== */}

        {isAuthenticated && (
          <div
            className="
              shrink-0

              border-b
              border-stone-200
              dark:border-stone-800

              px-5
              py-5
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center

                  rounded-2xl

                  bg-emerald-100
                  dark:bg-emerald-950

                  text-emerald-700
                  dark:text-emerald-400
                "
              >
                <User
                  size={22}
                  aria-hidden="true"
                />
              </div>

              <div
                className="
                  min-w-0
                "
              >
                <p
                  className="
                    truncate

                    text-sm
                    font-bold

                    text-stone-900
                    dark:text-white
                  "
                >
                  {currentUser?.name ||
                    "ShopSphere User"}
                </p>

                <p
                  className="
                    mt-0.5

                    truncate

                    text-xs

                    text-stone-500
                    dark:text-stone-400
                  "
                >
                  {
                    currentUser?.email
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {/* =====================================
            Scrollable Navigation
        ===================================== */}

        <nav
          aria-label="Mobile navigation"
          className="
            min-h-0
            flex-1

            overflow-y-auto
            overscroll-contain

            px-4
            py-5
          "
        >
          {/* =====================================
              Shopping
          ===================================== */}

          <div
            className="
              space-y-1
            "
          >
            <NavLink
              to="/"
              onClick={
                onClose
              }
              className={
                linkClass
              }
              end
            >
              <Home
                size={18}
                aria-hidden="true"
              />

              Home
            </NavLink>

            <NavLink
              to="/shop"
              onClick={
                onClose
              }
              className={
                linkClass
              }
            >
              <Store
                size={18}
                aria-hidden="true"
              />

              Shop
            </NavLink>

            <NavLink
              to="/cart"
              onClick={
                onClose
              }
              className={
                linkClass
              }
            >
              <ShoppingBag
                size={18}
                aria-hidden="true"
              />

              Cart
            </NavLink>

            <NavLink
              to="/wishlist"
              onClick={
                onClose
              }
              className={
                linkClass
              }
            >
              <Heart
                size={18}
                aria-hidden="true"
              />

              Wishlist
            </NavLink>

            <NavLink
              to="/compare"
              onClick={
                onClose
              }
              className={
                linkClass
              }
            >
              <Scale
                size={18}
                aria-hidden="true"
              />

              Compare
            </NavLink>
          </div>

          {/* =====================================
              Account
          ===================================== */}

          <div
            className="
              mt-6

              border-t
              border-stone-200
              dark:border-stone-800

              pt-5
            "
          >
            <p
              className="
                mb-2
                px-4

                text-[11px]
                font-bold
                uppercase
                tracking-[0.14em]

                text-stone-400
                dark:text-stone-500
              "
            >
              Account
            </p>

            {isAuthenticated ? (
              <div
                className="
                  space-y-1
                "
              >
                <NavLink
                  to="/account"
                  onClick={
                    onClose
                  }
                  className={
                    linkClass
                  }
                >
                  <User
                    size={18}
                    aria-hidden="true"
                  />

                  My Account
                </NavLink>

                <NavLink
                  to="/orders"
                  onClick={
                    onClose
                  }
                  className={
                    linkClass
                  }
                >
                  <Package
                    size={18}
                    aria-hidden="true"
                  />

                  My Orders
                </NavLink>

                <NavLink
                  to="/addresses"
                  onClick={
                    onClose
                  }
                  className={
                    linkClass
                  }
                >
                  <MapPin
                    size={18}
                    aria-hidden="true"
                  />

                  Addresses
                </NavLink>
              </div>
            ) : (
              <div
                className="
                  space-y-1
                "
              >
                <NavLink
                  to="/login"
                  onClick={
                    onClose
                  }
                  className={
                    linkClass
                  }
                >
                  <LogIn
                    size={18}
                    aria-hidden="true"
                  />

                  Sign In
                </NavLink>

                <NavLink
                  to="/signup"
                  onClick={
                    onClose
                  }
                  className={
                    linkClass
                  }
                >
                  <UserPlus
                    size={18}
                    aria-hidden="true"
                  />

                  Create Account
                </NavLink>
              </div>
            )}
          </div>
        </nav>

        {/* =====================================
            Logout
        ===================================== */}

        {isAuthenticated && (
          <div
            className="
              shrink-0

              border-t
              border-stone-200
              dark:border-stone-800

              bg-white
              dark:bg-stone-900

              p-4
            "
          >
            <button
              type="button"
              onClick={
                handleLogout
              }
              className="
                flex
                w-full
                items-center
                justify-center
                gap-2

                rounded-xl

                bg-stone-900
                dark:bg-white

                px-4
                py-3

                text-sm
                font-semibold

                text-white
                dark:text-stone-900

                transition-all
                duration-200

                hover:bg-rose-600
                dark:hover:bg-rose-500
                dark:hover:text-white

                active:scale-[0.99]

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-rose-500
                focus-visible:ring-offset-2

                dark:focus-visible:ring-offset-stone-900
              "
            >
              <LogOut
                size={18}
                aria-hidden="true"
              />

              Sign Out
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};

export default MobileMenu;