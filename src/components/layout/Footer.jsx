import {
  Headphones,
  Mail,
  MapPin,
  RotateCcw,
  Send,
  ShieldCheck,
  Truck,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import {
  useSelector,
} from "react-redux";

import toast from "react-hot-toast";

import {
  BRAND,
} from "../../constants/brand";

import {
  selectIsAuthenticated,
} from "../../features/auth/authSlice";

/* ========================================
   Footer
======================================== */

const Footer = () => {
  const isAuthenticated =
    useSelector(
      selectIsAuthenticated
    );

  /* ========================================
     Newsletter
  ======================================== */

  const handleNewsletterSubmit =
    (event) => {
      event.preventDefault();

      const form =
        event.currentTarget;

      const formData =
        new FormData(form);

      const email =
        formData
          .get("email")
          ?.toString()
          .trim();

      if (!email) {
        toast.error(
          "Enter your email address"
        );

        return;
      }

      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (
        !emailPattern.test(
          email
        )
      ) {
        toast.error(
          "Enter a valid email address"
        );

        return;
      }

      toast.success(
        "Thanks for subscribing!"
      );

      form.reset();
    };

  /* ========================================
     Footer Links
  ======================================== */

  const shopLinks = [
    {
      label: "All Products",
      path: "/shop",
    },
    {
      label: "Today's Deals",
      path: "/shop?sort=discount",
    },
    {
      label: "Wishlist",
      path: "/wishlist",
    },
    {
      label: "Compare Products",
      path: "/compare",
    },
    {
      label: "Shopping Cart",
      path: "/cart",
    },
  ];

  const accountLinks =
    isAuthenticated
      ? [
          {
            label: "My Account",
            path: "/account",
          },
          {
            label: "My Orders",
            path: "/orders",
          },
          {
            label: "Saved Addresses",
            path: "/addresses",
          },
          {
            label: "My Wishlist",
            path: "/wishlist",
          },
        ]
      : [
          {
            label: "Sign In",
            path: "/login",
          },
          {
            label: "Create Account",
            path: "/signup",
          },
          {
            label: "Shopping Cart",
            path: "/cart",
          },
          {
            label: "Compare Products",
            path: "/compare",
          },
        ];

  const supportItems = [
    "Shipping Information",
    "Returns & Refunds",
    "Order Support",
    "Privacy Policy",
    "Terms & Conditions",
  ];

  const footerLinkClass = `
    inline-flex
    w-fit

    rounded-md

    text-sm
    font-semibold

    text-stone-700
    dark:text-stone-300

    transition-colors
    duration-200

    hover:text-emerald-700
    dark:hover:text-emerald-400

    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-emerald-500
    focus-visible:ring-offset-2

    dark:focus-visible:ring-offset-stone-950
  `;

  return (
    <footer
      className="
        mt-14

        border-t
        border-stone-200
        dark:border-stone-800

        bg-white
        dark:bg-stone-950

        sm:mt-16
      "
    >
      {/* =====================================
          Newsletter
      ===================================== */}

      <section
        className="
          border-b
          border-stone-200
          dark:border-stone-800
        "
        aria-labelledby="footer-newsletter-title"
      >
        <div
          className="
            container-shell

            grid
            gap-7

            py-9

            sm:py-10

            lg:grid-cols-[minmax(0,1fr)_minmax(420px,590px)]
            lg:items-center
            lg:gap-12
          "
        >
          <div>
            <p
              className="
                text-xs
                font-black
                uppercase
                tracking-[0.18em]

                text-emerald-700
                dark:text-emerald-400

                sm:text-sm
              "
            >
              Stay in the loop
            </p>

            <h2
              id="footer-newsletter-title"
              className="
                mt-2

                text-2xl
                font-black
                tracking-tight

                text-stone-900
                dark:text-white

                sm:text-3xl
              "
            >
              Better finds,
              delivered to you.
            </h2>

            <p
              className="
                mt-1.5
                max-w-2xl

                text-sm
                leading-6

                text-stone-500
                dark:text-stone-300
              "
            >
              Get curated product
              picks, seasonal deals
              and shopping inspiration
              from ShopSphere.
            </p>
          </div>

          <form
            onSubmit={
              handleNewsletterSubmit
            }
            className="
              w-full
            "
          >
            <div
              className="
                flex
                flex-col
                gap-3

                sm:flex-row
              "
            >
              <div
                className="
                  relative
                  min-w-0
                  flex-1
                "
              >
                <Mail
                  size={18}
                  aria-hidden="true"
                  className="
                    pointer-events-none

                    absolute
                    left-4
                    top-1/2

                    -translate-y-1/2

                    text-stone-400
                    dark:text-stone-400
                  "
                />

                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  aria-label="Email address"
                  className="
                    w-full

                    rounded-xl

                    border
                    border-stone-300
                    dark:border-stone-600

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
                    dark:placeholder:text-stone-400

                    transition-all
                    duration-200

                    hover:border-stone-400
                    dark:hover:border-stone-500

                    focus:border-emerald-500
                    focus:ring-4
                    focus:ring-emerald-500/10
                  "
                />
              </div>

              <button
                type="submit"
                className="
                  inline-flex
                  shrink-0
                  items-center
                  justify-center
                  gap-2

                  rounded-xl

                  bg-emerald-600

                  px-6
                  py-3

                  text-sm
                  font-bold

                  text-white

                  shadow-lg
                  shadow-emerald-600/15

                  transition-all
                  duration-200

                  hover:bg-emerald-700
                  hover:shadow-xl

                  dark:hover:bg-emerald-500

                  active:scale-[0.98]

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-emerald-500
                  focus-visible:ring-offset-2

                  dark:focus-visible:ring-offset-stone-950
                "
              >
                Subscribe

                <Send
                  size={17}
                  aria-hidden="true"
                />
              </button>
            </div>

            <p
              className="
                mt-2

                text-[11px]
                leading-4

                text-stone-400
                dark:text-stone-400
              "
            >
              Get product updates,
              seasonal offers and
              shopping inspiration.
            </p>
          </form>
        </div>
      </section>

      {/* =====================================
          Main Footer
      ===================================== */}

      <div
        className="
          container-shell

          grid
          gap-x-10
          gap-y-10

          py-10

          sm:grid-cols-2
          sm:py-12

          lg:grid-cols-[1.35fr_0.85fr_0.95fr_1.05fr]
          lg:gap-x-14
        "
      >
        {/* Brand */}

        <div>
          <Link
            to="/"
            aria-label={`${BRAND.name} home`}
            className="
              inline-flex
              items-center
              gap-3

              rounded-xl

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-emerald-500
              focus-visible:ring-offset-2

              dark:focus-visible:ring-offset-stone-950
            "
          >
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center

                rounded-2xl

                brand-gradient

                text-xl
                font-black

                text-white

                shadow-lg
                shadow-emerald-600/15
              "
            >
              S
            </div>

            <div>
              <p
                className="
                  text-xl
                  font-black
                  tracking-tight

                  text-stone-900
                  dark:text-white
                "
              >
                {BRAND.name}
              </p>

              <p
                className="
                  text-xs

                  text-stone-500
                  dark:text-stone-300
                "
              >
                {BRAND.tagline}
              </p>
            </div>
          </Link>

          <p
            className="
              mt-3
              max-w-sm

              text-sm
              leading-6

              text-stone-500
              dark:text-stone-300
            "
          >
            Discover products,
            compare smarter, save
            favorites and enjoy a
            polished shopping
            experience from discovery
            to checkout.
          </p>

          <div
            className="
              mt-6

              inline-flex
              items-center
              gap-2.5

              rounded-xl

              border
              border-stone-200
              dark:border-stone-700

              bg-stone-50
              dark:bg-stone-900

              px-4
              py-2.5

              text-sm

              text-stone-500
              dark:text-stone-300
            "
          >
            <MapPin
              size={17}
              aria-hidden="true"
              className="
                shrink-0

                text-emerald-600
                dark:text-emerald-400
              "
            />

            Hyderabad, India
          </div>
        </div>

        {/* Shop */}

        <div>
          <h3
            className="
              text-sm
              font-black
              uppercase
              tracking-[0.08em]

              text-stone-900
              dark:text-white
            "
          >
            Shop
          </h3>

          <nav
            aria-label="Footer shop navigation"
            className="
              mt-5

              flex
              flex-wrap
              gap-x-6
              gap-y-3

              lg:flex-col
              lg:items-start
              lg:gap-3
            "
          >
            {shopLinks.map(
              ({
                label,
                path,
              }) => (
                <Link
                  key={label}
                  to={path}
                  className={
                    footerLinkClass
                  }
                >
                  {label}
                </Link>
              )
            )}
          </nav>
        </div>

        {/* Account */}

        <div>
          <h3
            className="
              text-sm
              font-black
              uppercase
              tracking-[0.08em]

              text-stone-900
              dark:text-white
            "
          >
            Account
          </h3>

          <nav
            aria-label="Footer account navigation"
            className="
              mt-5

              flex
              flex-wrap
              gap-x-6
              gap-y-3

              lg:flex-col
              lg:items-start
              lg:gap-3
            "
          >
            {accountLinks.map(
              ({
                label,
                path,
              }) => (
                <Link
                  key={label}
                  to={path}
                  className={
                    footerLinkClass
                  }
                >
                  {label}
                </Link>
              )
            )}
          </nav>
        </div>

        {/* Help & Support */}

        <div>
          <h3
            className="
              text-sm
              font-black
              uppercase
              tracking-[0.08em]

              text-stone-900
              dark:text-white
            "
          >
            Help & Support
          </h3>

          <ul
            className="
              mt-5
              space-y-3
            "
          >
            {supportItems.map(
              (item) => (
                <li
                  key={item}
                  className="
                    flex
                    items-start
                    gap-2

                    text-sm
                    leading-5

                    text-stone-500
                    dark:text-stone-300
                  "
                >
                  <span
                    aria-hidden="true"
                    className="
                      mt-[8px]
                      h-1
                      w-1
                      shrink-0

                      rounded-full

                      bg-stone-300
                      dark:bg-stone-600
                    "
                  />

                  <span>
                    {item}
                  </span>
                </li>
              )
            )}
          </ul>

          <div
            className="
              mt-6

              flex
              items-start
              gap-3

              rounded-xl

              border
              border-stone-200
              dark:border-stone-700

              bg-stone-50
              dark:bg-stone-900

              p-4
            "
          >
            <Headphones
              size={18}
              aria-hidden="true"
              className="
                mt-0.5
                shrink-0

                text-emerald-600
                dark:text-emerald-400
              "
            />

            <div>
              <p
                className="
                  text-xs
                  font-black

                  text-stone-800
                  dark:text-stone-100
                "
              >
                Customer Care
              </p>

              <p
                className="
                  mt-1

                  text-[11px]
                  leading-5

                  text-stone-400
                  dark:text-stone-400
                "
              >
                Help with orders,
                delivery, returns and
                shopping questions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================
          Trust Strip
      ===================================== */}

      <div
        className="
          border-y
          border-stone-200
          dark:border-stone-800

          bg-stone-50
          dark:bg-stone-900/60
        "
      >
        <div
          className="
            container-shell

            grid
            gap-4

            py-5

            sm:grid-cols-3
          "
        >
          {[
            {
              label:
                "Reliable delivery experience",
              icon: Truck,
            },
            {
              label:
                "Secure checkout",
              icon: ShieldCheck,
            },
            {
              label:
                "Simple shopping flow",
              icon: RotateCcw,
            },
          ].map(
            ({
              label,
              icon: Icon,
            }) => (
              <div
                key={label}
                className="
                  flex
                  items-center
                  justify-center
                  gap-3

                  text-center
                  text-sm
                  font-medium

                  text-stone-600
                  dark:text-stone-300
                "
              >
                <Icon
                  size={18}
                  aria-hidden="true"
                  className="
                    shrink-0

                    text-emerald-600
                    dark:text-emerald-400
                  "
                />

                {label}
              </div>
            )
          )}
        </div>
      </div>

      {/* =====================================
          Bottom Footer
      ===================================== */}

      <div
        className="
          container-shell

          flex
          flex-col
          gap-3

          py-5

          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <p
          className="
            text-center
            text-xs

            text-stone-400
            dark:text-stone-400

            sm:text-left
          "
        >
          © 2026 ShopSphere. All
          rights reserved.
        </p>

        <div
          className="
            flex
            items-center
            justify-center
            gap-3

            text-xs

            text-stone-400
            dark:text-stone-400
          "
          aria-label="Technology stack"
        >
          <span>React</span>

          <span
            aria-hidden="true"
            className="
              h-1
              w-1

              rounded-full

              bg-stone-300
              dark:bg-stone-600
            "
          />

          <span>Redux</span>

          <span
            aria-hidden="true"
            className="
              h-1
              w-1

              rounded-full

              bg-stone-300
              dark:bg-stone-600
            "
          />

          <span>
            Tailwind CSS
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;