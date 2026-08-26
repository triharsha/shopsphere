import {
  ArrowLeft,
  Home,
  Search,
  ShoppingBag,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

const NotFound = () => {
  const navigate =
    useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <main
      className="
        container-shell

        flex
        min-h-[60vh]
        items-center
        justify-center

        py-14

        sm:py-16
        lg:py-20
      "
    >
      <div
        className="
          w-full
          max-w-3xl

          text-center
        "
      >
        {/* =====================================
            404 Badge
        ===================================== */}

        <div
          className="
            mx-auto

            flex
            h-20
            w-20
            items-center
            justify-center

            rounded-3xl

            border
            border-emerald-100
            dark:border-emerald-900/50

            bg-emerald-50
            dark:bg-emerald-950/30

            text-2xl
            font-black

            text-emerald-700
            dark:text-emerald-400

            shadow-sm
          "
        >
          404
        </div>

        {/* =====================================
            Content
        ===================================== */}

        <p
          className="
            mt-6

            text-xs
            font-black
            uppercase
            tracking-[0.14em]

            text-emerald-700
            dark:text-emerald-400
          "
        >
          Page Not Found
        </p>

        <h1
          className="
            mt-3

            text-3xl
            font-black
            tracking-tight

            text-stone-900
            dark:text-white

            sm:text-4xl
            lg:text-5xl
          "
        >
          Looks like this page
          wandered off.
        </h1>

        <p
          className="
            mx-auto
            mt-4
            max-w-xl

            text-sm
            leading-6

            text-stone-500
            dark:text-stone-400

            sm:text-base
          "
        >
          The page may have been
          moved, removed or the
          address may be incorrect.
          Continue exploring
          ShopSphere from one of the
          options below.
        </p>

        {/* =====================================
            Primary Actions
        ===================================== */}

        <div
          className="
            mt-8

            flex
            flex-col
            justify-center
            gap-3

            sm:flex-row
          "
        >
          <Link
            to="/"
            className="
              inline-flex
              items-center
              justify-center
              gap-2

              rounded-xl

              bg-emerald-600

              px-5
              py-3

              text-sm
              font-black

              text-white

              shadow-lg
              shadow-emerald-600/15

              transition-all
              duration-200

              hover:bg-emerald-700
              hover:shadow-xl

              active:scale-[0.98]

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-emerald-500
              focus-visible:ring-offset-2

              dark:focus-visible:ring-offset-stone-950
            "
          >
            <Home
              size={17}
              aria-hidden="true"
            />

            Go Home
          </Link>

          <Link
            to="/shop"
            className="
              inline-flex
              items-center
              justify-center
              gap-2

              rounded-xl

              border
              border-stone-200
              dark:border-stone-700

              bg-white
              dark:bg-stone-900

              px-5
              py-3

              text-sm
              font-black

              text-stone-700
              dark:text-stone-200

              transition-all
              duration-200

              hover:border-emerald-300
              hover:bg-emerald-50
              hover:text-emerald-700

              dark:hover:border-emerald-800
              dark:hover:bg-emerald-950/30
              dark:hover:text-emerald-400

              active:scale-[0.98]

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-emerald-500
            "
          >
            <ShoppingBag
              size={17}
              aria-hidden="true"
            />

            Browse Shop
          </Link>
        </div>

        {/* =====================================
            Secondary Actions
        ===================================== */}

        <div
          className="
            mt-6

            flex
            flex-wrap
            items-center
            justify-center
            gap-x-6
            gap-y-3
          "
        >
          <button
            type="button"
            onClick={
              handleGoBack
            }
            className="
              inline-flex
              items-center
              gap-2

              rounded-md

              text-xs
              font-bold

              text-stone-500
              dark:text-stone-400

              transition-colors

              hover:text-emerald-700
              dark:hover:text-emerald-400

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-emerald-500
            "
          >
            <ArrowLeft
              size={15}
              aria-hidden="true"
            />

            Go Back
          </button>

          <Link
            to="/search"
            className="
              inline-flex
              items-center
              gap-2

              rounded-md

              text-xs
              font-bold

              text-stone-500
              dark:text-stone-400

              transition-colors

              hover:text-emerald-700
              dark:hover:text-emerald-400

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-emerald-500
            "
          >
            <Search
              size={15}
              aria-hidden="true"
            />

            Search Products
          </Link>
        </div>

        {/* =====================================
            Helpful Note
        ===================================== */}

        <div
          className="
            mx-auto
            mt-10
            max-w-lg

            rounded-2xl

            border
            border-stone-200
            dark:border-stone-800

            bg-stone-50
            dark:bg-stone-900/60

            px-5
            py-4
          "
        >
          <p
            className="
              text-xs
              leading-5

              text-stone-400
              dark:text-stone-500
            "
          >
            You can also use the
            ShopSphere navigation
            above to continue
            browsing products,
            categories and your
            shopping tools.
          </p>
        </div>
      </div>
    </main>
  );
};

export default NotFound;