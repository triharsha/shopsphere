import {
  Grid2X2,
  Sparkles,
} from "lucide-react";

import {
  Link,
  useLocation,
} from "react-router-dom";

const categories = [
  {
    id: "beauty",
    label: "Beauty",
    slug: "beauty",
  },
  {
    id: "fragrances",
    label: "Fragrances",
    slug: "fragrances",
  },
  {
    id: "furniture",
    label: "Furniture",
    slug: "furniture",
  },
  {
    id: "groceries",
    label: "Groceries",
    slug: "groceries",
  },
  {
    id: "home-decoration",
    label: "Home",
    slug: "home-decoration",
  },
  {
    id: "laptops",
    label: "Laptops",
    slug: "laptops",
  },
  {
    id: "mens-shirts",
    label: "Men",
    slug: "mens-shirts",
  },
  {
    id: "womens-dresses",
    label: "Women",
    slug: "womens-dresses",
  },
  {
    id: "smartphones",
    label: "Smartphones",
    slug: "smartphones",
  },
];

const CategoryNav = () => {
  const location =
    useLocation();

  const searchParams =
    new URLSearchParams(
      location.search
    );

  const activeCategory =
    searchParams.get(
      "category"
    );

  const activeSort =
    searchParams.get(
      "sort"
    );

  const isShopPage =
    location.pathname ===
    "/shop";

  const isAllProductsActive =
    isShopPage &&
    !activeCategory &&
    !activeSort;

  const isDealsActive =
    isShopPage &&
    activeSort ===
      "discount";

  return (
    <div
      className="
        hidden

        border-b
        border-stone-200
        dark:border-stone-800

        bg-white
        dark:bg-stone-950

        lg:block
      "
    >
      <div
        className="
          container-shell

          flex
          h-12
          min-w-0
          items-center
          gap-1
        "
      >
        {/* =====================================
            All Products
        ===================================== */}

        <Link
          to="/shop"
          className={`
            mr-2

            flex
            shrink-0
            items-center
            gap-2

            rounded-lg

            px-3
            py-2

            text-sm
            font-semibold

            transition-colors
            duration-200

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-emerald-500

            ${
              isAllProductsActive
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
                  hover:text-emerald-700

                  dark:hover:bg-stone-900
                  dark:hover:text-emerald-400
                `
            }
          `}
        >
          <Grid2X2
            size={16}
            aria-hidden="true"
          />

          All Products
        </Link>

        {/* =====================================
            Divider
        ===================================== */}

        <span
          aria-hidden="true"
          className="
            mr-1

            h-5
            w-px
            shrink-0

            bg-stone-200
            dark:bg-stone-800
          "
        />

        {/* =====================================
            Categories
        ===================================== */}

        <nav
          aria-label="Product categories"
          className="
            hide-scrollbar

            flex
            min-w-0
            flex-1
            items-center
            gap-1

            overflow-x-auto
            overscroll-x-contain

            scroll-smooth
          "
        >
          {categories.map(
            (category) => {
              const isActive =
                isShopPage &&
                activeCategory ===
                  category.slug;

              return (
                <Link
                  key={
                    category.id
                  }
                  to={`/shop?category=${encodeURIComponent(
                    category.slug
                  )}`}
                  className={`
                    shrink-0

                    rounded-lg

                    px-3
                    py-2

                    text-sm
                    font-medium

                    transition-colors
                    duration-200

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
                          hover:text-emerald-700

                          dark:hover:bg-stone-900
                          dark:hover:text-emerald-400
                        `
                    }
                  `}
                >
                  {
                    category.label
                  }
                </Link>
              );
            }
          )}
        </nav>

        {/* =====================================
            Deals
        ===================================== */}

        <span
          aria-hidden="true"
          className="
            ml-1

            h-5
            w-px
            shrink-0

            bg-stone-200
            dark:bg-stone-800
          "
        />

        <Link
          to="/shop?sort=discount"
          className={`
            ml-2

            flex
            shrink-0
            items-center
            gap-1.5

            rounded-lg

            px-3
            py-2

            text-sm
            font-bold

            transition-colors
            duration-200

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-amber-500

            ${
              isDealsActive
                ? `
                  bg-amber-50
                  text-amber-700

                  dark:bg-amber-950/30
                  dark:text-amber-400
                `
                : `
                  text-amber-600
                  dark:text-amber-400

                  hover:bg-amber-50
                  hover:text-amber-700

                  dark:hover:bg-amber-950/30
                `
            }
          `}
        >
          <Sparkles
            size={14}
            aria-hidden="true"
          />

          Today's Deals
        </Link>
      </div>
    </div>
  );
};

export default CategoryNav;