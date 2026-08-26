import {
  ChevronRight,
  ShoppingBag,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

const ShopHeader = ({
  totalProducts = 0,
  categoryLabel = null,
}) => {
  return (
    <div>
      {/* =====================================
          Breadcrumb
      ===================================== */}

      <nav
        aria-label="Breadcrumb"
        className="
          flex
          items-center
          gap-2

          text-xs
          font-medium

          text-stone-500
          dark:text-stone-400
        "
      >
        <Link
          to="/"
          className="
            rounded-md

            transition-colors

            hover:text-emerald-700
            dark:hover:text-emerald-400

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-emerald-500
          "
        >
          Home
        </Link>

        <ChevronRight
          size={14}
          aria-hidden="true"
        />

        <span
          className="
            text-stone-900
            dark:text-white
          "
        >
          Shop
        </span>
      </nav>

      {/* =====================================
          Main Header
      ===================================== */}

      <div
        className="
          mt-5

          flex
          flex-col
          gap-5

          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >
        <div>
          <div
            className="
              inline-flex
              items-center
              gap-2

              rounded-full

              bg-emerald-50
              dark:bg-emerald-950/40

              px-3
              py-1.5

              text-xs
              font-black
              uppercase
              tracking-[0.12em]

              text-emerald-700
              dark:text-emerald-400
            "
          >
            <ShoppingBag
              size={14}
              aria-hidden="true"
            />

            ShopSphere Collection
          </div>

          <h1
            className="
              mt-4

              text-3xl
              font-black
              tracking-tight

              text-stone-900
              dark:text-white

              sm:text-4xl
              lg:text-5xl
            "
          >
            Explore Our Products
          </h1>

          <p
            className="
              mt-3
              max-w-2xl

              text-sm
              leading-6

              text-stone-500
              dark:text-stone-400

              sm:text-base
            "
          >
            Discover products
            across fashion,
            technology, beauty,
            home and everyday
            essentials.
          </p>
        </div>

        {/* =====================================
            Catalog Count
        ===================================== */}

        <div
          className="
            w-fit

            rounded-xl

            border
            border-stone-200
            dark:border-stone-800

            bg-white
            dark:bg-stone-900

            px-4
            py-3

            text-sm

            shadow-sm
          "
        >
          <span
            className="
              font-black

              text-stone-900
              dark:text-white
            "
          >
            {
              totalProducts
            }
          </span>

          <span
            className="
              ml-1

              text-stone-500
              dark:text-stone-400
            "
          >
            {categoryLabel
              ? `products in ${categoryLabel}`
              : "products in catalog"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShopHeader;