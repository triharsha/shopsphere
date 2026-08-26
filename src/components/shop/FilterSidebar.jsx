import {
  Check,
  RotateCcw,
  SlidersHorizontal,
  Star,
} from "lucide-react";

/* ========================================
   Categories
======================================== */

const categories = [
  {
    label: "All Categories",
    value: "all",
  },
  {
    label: "Beauty",
    value: "beauty",
  },
  {
    label: "Fragrances",
    value: "fragrances",
  },
  {
    label: "Furniture",
    value: "furniture",
  },
  {
    label: "Groceries",
    value: "groceries",
  },
  {
    label: "Home Decoration",
    value: "home-decoration",
  },
  {
    label: "Laptops",
    value: "laptops",
  },
  {
    label: "Men's Shirts",
    value: "mens-shirts",
  },
  {
    label: "Smartphones",
    value: "smartphones",
  },
];

/* ========================================
   Price Ranges
======================================== */

const priceRanges = [
  {
    label: "All Prices",
    value: "all",
  },
  {
    label: "Under ₹2,500",
    value: "0-2500",
  },
  {
    label: "₹2,500 - ₹5,000",
    value: "2500-5000",
  },
  {
    label: "₹5,000 - ₹10,000",
    value: "5000-10000",
  },
  {
    label: "₹10,000 - ₹25,000",
    value: "10000-25000",
  },
  {
    label: "Above ₹25,000",
    value: "25000-plus",
  },
];

/* ========================================
   Filter Sidebar
======================================== */

const FilterSidebar = ({
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  const {
    category,
    priceRange,
    minRating,
    inStockOnly,
  } = filters;

  /* =====================================
     Active Filter Check
  ===================================== */

  const hasActiveFilters =
    category !== "all" ||
    priceRange !== "all" ||
    minRating > 0 ||
    inStockOnly;

  /* =====================================
     Shared Label Styles
  ===================================== */

  const optionLabelClass = `
    group

    flex
    cursor-pointer
    items-center
    gap-3

    rounded-lg

    px-2
    py-1.5

    transition-colors
    duration-200

    hover:bg-stone-50
    dark:hover:bg-stone-800/70
  `;

  return (
    <div
      className="
        overflow-hidden

        rounded-2xl

        border
        border-stone-200
        dark:border-stone-800

        bg-white
        dark:bg-stone-900

        shadow-sm
      "
    >
      {/* =====================================
          Header
      ===================================== */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-3

          border-b
          border-stone-200
          dark:border-stone-800

          px-5
          py-4
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <SlidersHorizontal
            size={17}
            aria-hidden="true"
            className="
              text-emerald-700
              dark:text-emerald-400
            "
          />

          <h2
            className="
              text-sm
              font-black

              text-stone-900
              dark:text-white
            "
          >
            Filters
          </h2>
        </div>

        <button
          type="button"
          onClick={
            onClearFilters
          }
          disabled={
            !hasActiveFilters
          }
          className="
            inline-flex
            items-center
            gap-1.5

            rounded-lg

            px-2
            py-1.5

            text-xs
            font-semibold

            text-stone-400

            transition-colors

            hover:bg-rose-50
            hover:text-rose-600

            dark:hover:bg-rose-950/30
            dark:hover:text-rose-400

            disabled:cursor-not-allowed
            disabled:opacity-35
            disabled:hover:bg-transparent
            disabled:hover:text-stone-400

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-rose-500
          "
        >
          <RotateCcw
            size={13}
            aria-hidden="true"
          />

          Reset
        </button>
      </div>

      {/* =====================================
          Category
      ===================================== */}

      <div
        className="
          border-b
          border-stone-200
          dark:border-stone-800

          p-5
        "
      >
        <h3
          className="
            text-xs
            font-black
            uppercase
            tracking-[0.1em]

            text-stone-900
            dark:text-white
          "
        >
          Category
        </h3>

        <div
          className="
            mt-3
            space-y-1
          "
        >
          {categories.map(
            ({
              label,
              value,
            }) => {
              const isSelected =
                category === value;

              return (
                <label
                  key={value}
                  className={
                    optionLabelClass
                  }
                >
                  <input
                    type="radio"
                    name="category"
                    value={value}
                    checked={
                      isSelected
                    }
                    onChange={(
                      event
                    ) =>
                      onFilterChange(
                        "category",
                        event.target
                          .value
                      )
                    }
                    className="
                      h-4
                      w-4
                      shrink-0

                      accent-emerald-600

                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-emerald-500
                    "
                  />

                  <span
                    className={`
                      min-w-0
                      flex-1

                      text-sm

                      ${
                        isSelected
                          ? `
                            font-bold

                            text-emerald-700
                            dark:text-emerald-400
                          `
                          : `
                            text-stone-500
                            dark:text-stone-400
                          `
                      }
                    `}
                  >
                    {label}
                  </span>

                  {isSelected && (
                    <Check
                      size={14}
                      aria-hidden="true"
                      className="
                        shrink-0

                        text-emerald-600
                        dark:text-emerald-400
                      "
                    />
                  )}
                </label>
              );
            }
          )}
        </div>
      </div>

      {/* =====================================
          Price
      ===================================== */}

      <div
        className="
          border-b
          border-stone-200
          dark:border-stone-800

          p-5
        "
      >
        <h3
          className="
            text-xs
            font-black
            uppercase
            tracking-[0.1em]

            text-stone-900
            dark:text-white
          "
        >
          Price Range
        </h3>

        <div
          className="
            mt-3
            space-y-1
          "
        >
          {priceRanges.map(
            ({
              label,
              value,
            }) => {
              const isSelected =
                priceRange === value;

              return (
                <label
                  key={value}
                  className={
                    optionLabelClass
                  }
                >
                  <input
                    type="radio"
                    name="priceRange"
                    value={value}
                    checked={
                      isSelected
                    }
                    onChange={(
                      event
                    ) =>
                      onFilterChange(
                        "priceRange",
                        event.target
                          .value
                      )
                    }
                    className="
                      h-4
                      w-4
                      shrink-0

                      accent-emerald-600
                    "
                  />

                  <span
                    className={`
                      min-w-0
                      flex-1

                      text-sm

                      ${
                        isSelected
                          ? `
                            font-bold

                            text-emerald-700
                            dark:text-emerald-400
                          `
                          : `
                            text-stone-500
                            dark:text-stone-400
                          `
                      }
                    `}
                  >
                    {label}
                  </span>

                  {isSelected && (
                    <Check
                      size={14}
                      aria-hidden="true"
                      className="
                        shrink-0

                        text-emerald-600
                        dark:text-emerald-400
                      "
                    />
                  )}
                </label>
              );
            }
          )}
        </div>
      </div>

      {/* =====================================
          Rating
      ===================================== */}

      <div
        className="
          border-b
          border-stone-200
          dark:border-stone-800

          p-5
        "
      >
        <h3
          className="
            text-xs
            font-black
            uppercase
            tracking-[0.1em]

            text-stone-900
            dark:text-white
          "
        >
          Customer Rating
        </h3>

        <div
          className="
            mt-3
            space-y-1
          "
        >
          {[
            4,
            3,
            2,
            0,
          ].map(
            (rating) => {
              const isSelected =
                minRating === rating;

              return (
                <label
                  key={rating}
                  className={
                    optionLabelClass
                  }
                >
                  <input
                    type="radio"
                    name="rating"
                    checked={
                      isSelected
                    }
                    onChange={() =>
                      onFilterChange(
                        "minRating",
                        rating
                      )
                    }
                    className="
                      h-4
                      w-4
                      shrink-0

                      accent-emerald-600
                    "
                  />

                  {rating === 0 ? (
                    <span
                      className={`
                        flex-1

                        text-sm

                        ${
                          isSelected
                            ? `
                              font-bold

                              text-emerald-700
                              dark:text-emerald-400
                            `
                            : `
                              text-stone-500
                              dark:text-stone-400
                            `
                        }
                      `}
                    >
                      All Ratings
                    </span>
                  ) : (
                    <div
                      className="
                        flex
                        flex-1
                        items-center
                        gap-1.5
                      "
                    >
                      <Star
                        size={14}
                        fill="currentColor"
                        aria-hidden="true"
                        className="
                          text-amber-400
                        "
                      />

                      <span
                        className={`
                          text-sm

                          ${
                            isSelected
                              ? `
                                font-bold

                                text-emerald-700
                                dark:text-emerald-400
                              `
                              : `
                                font-semibold

                                text-stone-600
                                dark:text-stone-300
                              `
                          }
                        `}
                      >
                        {rating}.0 & up
                      </span>
                    </div>
                  )}

                  {isSelected && (
                    <Check
                      size={14}
                      aria-hidden="true"
                      className="
                        shrink-0

                        text-emerald-600
                        dark:text-emerald-400
                      "
                    />
                  )}
                </label>
              );
            }
          )}
        </div>
      </div>

      {/* =====================================
          Availability
      ===================================== */}

      <div className="p-5">
        <h3
          className="
            text-xs
            font-black
            uppercase
            tracking-[0.1em]

            text-stone-900
            dark:text-white
          "
        >
          Availability
        </h3>

        <label
          className="
            mt-4

            flex
            cursor-pointer
            items-center
            justify-between
            gap-4

            rounded-xl

            border
            border-stone-200
            dark:border-stone-700

            bg-stone-50
            dark:bg-stone-800/60

            px-4
            py-3

            transition-colors

            hover:border-emerald-300
            dark:hover:border-emerald-800
          "
        >
          <div>
            <p
              className="
                text-sm
                font-semibold

                text-stone-700
                dark:text-stone-300
              "
            >
              In stock only
            </p>

            <p
              className="
                mt-1

                text-xs

                text-stone-400
              "
            >
              Hide unavailable
              products
            </p>
          </div>

          <input
            type="checkbox"
            checked={
              inStockOnly
            }
            onChange={(
              event
            ) =>
              onFilterChange(
                "inStockOnly",
                event.target
                  .checked
              )
            }
            className="
              h-4
              w-4
              shrink-0

              accent-emerald-600
            "
          />
        </label>
      </div>
    </div>
  );
};

export default FilterSidebar;