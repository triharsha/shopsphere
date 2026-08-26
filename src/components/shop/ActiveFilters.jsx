import {
  X,
} from "lucide-react";

const priceLabels = {
  "0-2500":
    "Under ₹2,500",

  "2500-5000":
    "₹2,500 - ₹5,000",

  "5000-10000":
    "₹5,000 - ₹10,000",

  "10000-25000":
    "₹10,000 - ₹25,000",

  "25000-plus":
    "Above ₹25,000",
};

const formatCategory = (
  category
) => {
  return category
    .replaceAll(
      "-",
      " "
    )
    .replace(
      /\b\w/g,
      (letter) =>
        letter.toUpperCase()
    );
};

const ActiveFilters = ({
  filters,
  onRemoveFilter,
  onClearFilters,
}) => {
  const activeFilters = [];

  if (
    filters.category &&
    filters.category !==
      "all"
  ) {
    activeFilters.push({
      id: "category",

      label:
        formatCategory(
          filters.category
        ),
    });
  }

  if (
    filters.priceRange &&
    filters.priceRange !==
      "all"
  ) {
    activeFilters.push({
      id: "priceRange",

      label:
        priceLabels[
          filters.priceRange
        ] ||
        filters.priceRange,
    });
  }

  if (
    filters.minRating > 0
  ) {
    activeFilters.push({
      id: "minRating",

      label: `${filters.minRating}★ & up`,
    });
  }

  if (
    filters.inStockOnly
  ) {
    activeFilters.push({
      id: "inStockOnly",

      label: "In Stock",
    });
  }

  if (
    activeFilters.length === 0
  ) {
    return null;
  }

  return (
    <div
      className="
        mb-6

        flex
        flex-wrap
        items-center
        gap-2
      "
    >
      <span
        className="
          mr-1

          text-[10px]
          font-black
          uppercase
          tracking-[0.12em]

          text-stone-400
          dark:text-stone-500

          sm:text-xs
        "
      >
        Active
      </span>

      {activeFilters.map(
        (filter) => (
          <button
            key={
              filter.id
            }
            type="button"
            onClick={() =>
              onRemoveFilter(
                filter.id
              )
            }
            aria-label={`Remove ${filter.label} filter`}
            className="
              inline-flex
              items-center
              gap-2

              rounded-full

              border
              border-emerald-200
              dark:border-emerald-900

              bg-emerald-50
              dark:bg-emerald-950/30

              px-3
              py-1.5

              text-xs
              font-semibold

              text-emerald-700
              dark:text-emerald-400

              transition-colors

              hover:bg-emerald-100

              dark:hover:bg-emerald-950/60

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-emerald-500
            "
          >
            {
              filter.label
            }

            <X
              size={13}
              aria-hidden="true"
            />
          </button>
        )
      )}

      <button
        type="button"
        onClick={
          onClearFilters
        }
        className="
          ml-1

          rounded-lg

          px-2
          py-1.5

          text-xs
          font-bold

          text-stone-400

          transition-colors

          hover:bg-rose-50
          hover:text-rose-600

          dark:hover:bg-rose-950/30
          dark:hover:text-rose-400

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-rose-500
        "
      >
        Clear All
      </button>
    </div>
  );
};

export default ActiveFilters;