import {
  Heart,
  Menu,
  Moon,
  Scale,
  Search,
  ShoppingBag,
  Sun,
  User,
} from "lucide-react";

import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  useSelector,
} from "react-redux";

import {
  useState,
} from "react";

import {
  BRAND,
} from "../../constants/brand";

import {
  MAIN_NAV_LINKS,
} from "../../constants/navigation";

import {
  selectCurrentUser,
  selectIsAuthenticated,
} from "../../features/auth/authSlice";

import {
  selectCartCount,
} from "../../features/cart/cartSlice";

import {
  selectWishlistCount,
} from "../../features/wishlist/wishlistSlice";

import {
  selectCompareCount,
} from "../../features/compare/compareSlice";

import {
  useTheme,
} from "../../context/ThemeContext";

/* ========================================
   Count Badge
======================================== */

const CountBadge = ({
  count,
  variant = "emerald",
}) => {
  if (count <= 0) {
    return null;
  }

  return (
    <span
      className={`
        pointer-events-none

        absolute
        -right-0.5
        -top-0.5

        flex
        h-[18px]
        min-w-[18px]
        items-center
        justify-center

        rounded-full

        px-1

        text-[9px]
        font-black
        leading-none

        text-white

        ring-2
        ring-white
        dark:ring-stone-950

        ${
          variant === "rose"
            ? "bg-rose-500"
            : "bg-emerald-600"
        }
      `}
    >
      {count > 99
        ? "99+"
        : count}
    </span>
  );
};

/* ========================================
   Navbar
======================================== */

const Navbar = ({
  onMenuClick,
}) => {
  const navigate =
    useNavigate();

  const {
    isDark,
    toggleTheme,
  } = useTheme();

  const currentUser =
    useSelector(
      selectCurrentUser
    );

  const isAuthenticated =
    useSelector(
      selectIsAuthenticated
    );

  const cartCount =
    useSelector(
      selectCartCount
    );

  const wishlistCount =
    useSelector(
      selectWishlistCount
    );

  const compareCount =
    useSelector(
      selectCompareCount
    );

  const [
    searchQuery,
    setSearchQuery,
  ] = useState("");

  /* ========================================
     Search
  ======================================== */

  const handleSearch = (
    event
  ) => {
    event.preventDefault();

    const query =
      searchQuery.trim();

    if (!query) {
      return;
    }

    navigate(
      `/search?q=${encodeURIComponent(
        query
      )}`
    );
  };

  /* ========================================
     Shared Icon Style
  ======================================== */

  const iconButtonClass = `
    relative

    flex
    h-11
    w-11
    shrink-0
    items-center
    justify-center

    rounded-xl

    text-stone-600
    dark:text-stone-300

    transition-colors
    duration-200

    hover:bg-stone-100
    hover:text-emerald-700

    dark:hover:bg-stone-900
    dark:hover:text-emerald-400

    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-emerald-500
    focus-visible:ring-offset-2

    dark:focus-visible:ring-offset-stone-950
  `;

  return (
    <header
      className="
        sticky
        top-0
        z-40

        border-b
        border-stone-200/80
        dark:border-stone-800

        bg-white/95
        dark:bg-stone-950/95

        shadow-sm
        shadow-stone-900/[0.02]

        backdrop-blur-xl
      "
    >
      {/* =====================================
          Main Navbar
      ===================================== */}

      <div
        className="
          container-shell

          flex
          h-[72px]
          min-w-0
          items-center
          gap-2

          sm:gap-3

          lg:h-20
          lg:gap-4
        "
      >
        {/* Mobile Menu */}

        <button
          type="button"
          onClick={
            onMenuClick
          }
          aria-label="Open navigation menu"
          title="Menu"
          className={`
            ${iconButtonClass}

            lg:hidden
          `}
        >
          <Menu
            size={21}
            aria-hidden="true"
          />
        </button>

        {/* Brand */}

        <Link
          to="/"
          aria-label={`${BRAND.name} home`}
          className="
            flex
            min-w-0
            shrink-0
            items-center
            gap-2

            rounded-xl

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-emerald-500

            sm:gap-3
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center

              rounded-xl

              brand-gradient

              text-lg
              font-black

              text-white

              shadow-sm
              shadow-emerald-600/20

              sm:h-11
              sm:w-11
              sm:rounded-2xl
              sm:text-xl
            "
          >
            S
          </div>

          <div
            className="
              hidden
              min-w-0

              sm:block
            "
          >
            <p
              className="
                truncate

                text-lg
                font-black
                tracking-tight

                text-stone-900
                dark:text-white

                lg:text-xl
              "
            >
              {BRAND.name}
            </p>

            <p
              className="
                hidden

                truncate

                text-[11px]

                text-stone-500
                dark:text-stone-400

                lg:block
              "
            >
              {
                BRAND.shortTagline
              }
            </p>
          </div>
        </Link>

        {/* Navigation */}

        <nav
          aria-label="Main navigation"
          className="
            hidden
            shrink-0
            items-center
            gap-1

            xl:flex
          "
        >
          {MAIN_NAV_LINKS.map(
            (item) => (
              <NavLink
                key={
                  item.id
                }
                to={
                  item.path
                }
                className={({
                  isActive,
                }) =>
                  `
                    rounded-xl

                    px-3
                    py-2.5

                    text-sm
                    font-semibold

                    transition-colors

                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-emerald-500

                    ${
                      isActive
                        ? `
                          bg-emerald-50
                          text-emerald-700

                          dark:bg-emerald-950/40
                          dark:text-emerald-400
                        `
                        : `
                          text-stone-600
                          dark:text-stone-300

                          hover:bg-stone-100
                          hover:text-stone-900

                          dark:hover:bg-stone-900
                          dark:hover:text-white
                        `
                    }
                  `
                }
              >
                {
                  item.label
                }
              </NavLink>
            )
          )}
        </nav>

        {/* Desktop Search */}

        <form
          onSubmit={
            handleSearch
          }
          role="search"
          className="
            hidden
            min-w-0
            flex-1

            md:block
          "
        >
          <div
            className="
              relative

              mx-auto
              max-w-2xl
            "
          >
            <Search
              size={18}
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                left-4
                top-1/2

                -translate-y-1/2

                text-stone-400
              "
            />

            <input
              type="search"
              value={
                searchQuery
              }
              onChange={(
                event
              ) =>
                setSearchQuery(
                  event.target
                    .value
                )
              }
              placeholder="Search products, categories and brands..."
              aria-label="Search products"
              className="
                w-full

                rounded-2xl

                border
                border-stone-200
                dark:border-stone-800

                bg-stone-50
                dark:bg-stone-900

                py-3
                pl-11
                pr-4

                text-sm

                text-stone-900
                dark:text-white

                outline-none

                placeholder:text-stone-400
                dark:placeholder:text-stone-500

                transition-all
                duration-200

                hover:border-stone-300
                dark:hover:border-stone-700

                focus:border-emerald-500
                focus:bg-white
                focus:ring-4
                focus:ring-emerald-500/10

                dark:focus:bg-stone-900
              "
            />
          </div>
        </form>

        {/* Actions */}

        <div
          className="
            ml-auto

            flex
            min-w-0
            shrink-0
            items-center
            gap-0.5

            sm:gap-1
            lg:gap-1.5
          "
        >
          {/* Theme */}

          <button
            type="button"
            onClick={
              toggleTheme
            }
            aria-label={
              isDark
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            title={
              isDark
                ? "Light mode"
                : "Dark mode"
            }
            className={
              iconButtonClass
            }
          >
            {isDark ? (
              <Sun
                size={20}
                aria-hidden="true"
              />
            ) : (
              <Moon
                size={20}
                aria-hidden="true"
              />
            )}
          </button>

          {/* Compare */}

          <Link
            to="/compare"
            aria-label={`Compare products${
              compareCount > 0
                ? ` (${compareCount})`
                : ""
            }`}
            title="Compare"
            className={`
              ${iconButtonClass}

              hidden

              sm:flex
            `}
          >
            <Scale
              size={20}
              aria-hidden="true"
            />

            <CountBadge
              count={
                compareCount
              }
            />
          </Link>

          {/* Wishlist */}

          <Link
            to="/wishlist"
            aria-label={`Wishlist${
              wishlistCount > 0
                ? ` (${wishlistCount})`
                : ""
            }`}
            title="Wishlist"
            className={`
              ${iconButtonClass}

              hidden

              sm:flex
            `}
          >
            <Heart
              size={20}
              aria-hidden="true"
            />

            <CountBadge
              count={
                wishlistCount
              }
              variant="rose"
            />
          </Link>

          {/* Cart */}

          <Link
            to="/cart"
            aria-label={`Shopping cart${
              cartCount > 0
                ? ` (${cartCount})`
                : ""
            }`}
            title="Cart"
            className={
              iconButtonClass
            }
          >
            <ShoppingBag
              size={21}
              aria-hidden="true"
            />

            <CountBadge
              count={
                cartCount
              }
            />
          </Link>

          {/* Account */}

          {isAuthenticated ? (
            <Link
              to="/account"
              title="My Account"
              aria-label="My Account"
              className="
                flex
                min-w-0
                items-center
                gap-2

                rounded-xl

                p-0.5

                transition-colors
                duration-200

                hover:bg-stone-100
                dark:hover:bg-stone-900

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-emerald-500

                lg:pr-2
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center

                  rounded-xl

                  bg-emerald-100
                  dark:bg-emerald-950

                  text-emerald-700
                  dark:text-emerald-400
                "
              >
                <User
                  size={19}
                  aria-hidden="true"
                />
              </div>

              <span
                className="
                  hidden
                  max-w-28

                  truncate

                  text-sm
                  font-semibold

                  text-stone-700
                  dark:text-stone-200

                  lg:block
                "
              >
                {
                  currentUser?.name ||
                  "Account"
                }
              </span>
            </Link>
          ) : (
            <Link
              to="/login"
              aria-label="Sign in"
              className="
                inline-flex
                h-10
                shrink-0
                items-center
                justify-center

                rounded-xl

                border
                border-emerald-600
                dark:border-emerald-500

                bg-emerald-600
                dark:bg-emerald-600

                px-3

                text-xs
                font-bold

                !text-white

                shadow-sm
                shadow-emerald-600/15

                transition-all
                duration-200

                hover:border-emerald-700
                hover:bg-emerald-700
                hover:!text-white

                dark:hover:border-emerald-400
                dark:hover:bg-emerald-500
                dark:hover:!text-white

                active:scale-[0.98]

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-emerald-500
                focus-visible:ring-offset-2

                dark:focus-visible:ring-offset-stone-950

                sm:px-4
                sm:text-sm
              "
            >
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* =====================================
          Mobile Search
      ===================================== */}

      <div
        className="
          container-shell

          pb-3

          md:hidden
        "
      >
        <form
          onSubmit={
            handleSearch
          }
          role="search"
        >
          <div
            className="
              relative
            "
          >
            <Search
              size={18}
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                left-4
                top-1/2

                -translate-y-1/2

                text-stone-400
              "
            />

            <input
              type="search"
              value={
                searchQuery
              }
              onChange={(
                event
              ) =>
                setSearchQuery(
                  event.target
                    .value
                )
              }
              placeholder="Search ShopSphere..."
              aria-label="Search ShopSphere"
              className="
                w-full

                rounded-xl

                border
                border-stone-200
                dark:border-stone-800

                bg-stone-50
                dark:bg-stone-900

                py-3
                pl-11
                pr-4

                text-sm

                text-stone-900
                dark:text-white

                outline-none

                placeholder:text-stone-400
                dark:placeholder:text-stone-500

                transition-all
                duration-200

                hover:border-stone-300
                dark:hover:border-stone-700

                focus:border-emerald-500
                focus:ring-4
                focus:ring-emerald-500/10
              "
            />
          </div>
        </form>
      </div>
    </header>
  );
};

export default Navbar;