import {
  ArrowDownUp,
  SlidersHorizontal,
} from "lucide-react";

const sortOptions = [
  {
    label: "Featured",
    value: "featured",
  },
  {
    label: "Price: Low to High",
    value: "price-low",
  },
  {
    label: "Price: High to Low",
    value: "price-high",
  },
  {
    label: "Highest Rated",
    value: "rating",
  },
  {
    label: "Biggest Discount",
    value: "discount",
  },
];

const SortBar = ({
  resultCount = 0,
  sortBy,
  onSortChange,
  onOpenFilters,
}) => {
  return (
    <div
      className="
        mb-5

        flex
        flex-col
        gap-3

        rounded-2xl

        border
        border-stone-200
        dark:border-stone-700

        bg-white
        dark:bg-stone-900

        p-3

        shadow-sm
        dark:shadow-black/10

        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      {/* =====================================
          Result Count
      ===================================== */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-3
        "
      >
        <p
          className="
            px-1

            text-sm

            text-stone-500
            dark:text-stone-300
          "
        >
          <span
            className="
              font-black

              text-stone-900
              dark:text-white
            "
          >
            {resultCount}
          </span>{" "}
          {resultCount === 1
            ? "product found"
            : "products found"}
        </p>

        {/* Mobile Filter Button */}

        <button
          type="button"
          onClick={
            onOpenFilters
          }
          className="
            inline-flex
            items-center
            gap-2

            rounded-xl

            border
            border-stone-200
            dark:border-stone-700

            bg-white
            dark:bg-stone-800

            px-3
            py-2

            text-xs
            font-bold

            text-stone-700
            dark:text-stone-200

            transition-all
            duration-200

            hover:border-stone-300
            hover:bg-stone-50
            hover:text-emerald-700

            dark:hover:border-stone-600
            dark:hover:bg-stone-700
            dark:hover:text-emerald-400

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-emerald-500
            focus-visible:ring-offset-2

            dark:focus-visible:ring-offset-stone-900

            lg:hidden
          "
        >
          <SlidersHorizontal
            size={15}
            aria-hidden="true"
          />

          Filters
        </button>
      </div>

      {/* =====================================
          Sort
      ===================================== */}

      <div
        className="
          flex
          items-center
          gap-2
        "
      >
        <ArrowDownUp
          size={16}
          aria-hidden="true"
          className="
            hidden

            text-stone-400
            dark:text-stone-400

            sm:block
          "
        />

        <label
          htmlFor="product-sort"
          className="
            hidden

            text-xs
            font-semibold

            text-stone-500
            dark:text-stone-300

            sm:block
          "
        >
          Sort by
        </label>

        <select
          id="product-sort"
          value={
            sortBy
          }
          onChange={(
            event
          ) =>
            onSortChange(
              event.target.value
            )
          }
          className="
            w-full

            cursor-pointer

            rounded-xl

            border
            border-stone-200
            dark:border-stone-600

            bg-stone-50
            dark:bg-stone-800

            px-3
            py-2.5

            text-xs
            font-bold

            text-stone-700
            dark:text-stone-100

            outline-none

            transition-all
            duration-200

            hover:border-stone-300
            hover:bg-white

            dark:hover:border-stone-500
            dark:hover:bg-stone-800

            focus:border-emerald-500
            focus:ring-4
            focus:ring-emerald-500/10

            sm:w-auto
            sm:min-w-[190px]
          "
        >
          {sortOptions.map(
            ({
              label,
              value,
            }) => (
              <option
                key={value}
                value={value}
                className="
                  bg-white
                  text-stone-900

                  dark:bg-stone-800
                  dark:text-white
                "
              >
                {label}
              </option>
            )
          )}
        </select>
      </div>
    </div>
  );
};

export default SortBar;