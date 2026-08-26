import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,

  totalItems = 0,
  itemsPerPage = 12,
}) => {
  if (
    totalPages <= 1
  ) {
    return null;
  }

  const getVisiblePages =
    () => {
      const pages = [];

      const start =
        Math.max(
          1,
          currentPage - 2
        );

      const end =
        Math.min(
          totalPages,
          currentPage + 2
        );

      if (start > 1) {
        pages.push(1);

        if (
          start > 2
        ) {
          pages.push(
            "ellipsis-start"
          );
        }
      }

      for (
        let page = start;
        page <= end;
        page += 1
      ) {
        pages.push(
          page
        );
      }

      if (
        end < totalPages
      ) {
        if (
          end <
          totalPages - 1
        ) {
          pages.push(
            "ellipsis-end"
          );
        }

        pages.push(
          totalPages
        );
      }

      return pages;
    };

  const visiblePages =
    getVisiblePages();

  const startItem =
    totalItems === 0
      ? 0
      : (currentPage - 1) *
          itemsPerPage +
        1;

  const endItem =
    Math.min(
      currentPage *
        itemsPerPage,
      totalItems
    );

  return (
    <div
      className="
        mt-10

        flex
        flex-col
        gap-4

        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      {/* =====================================
          Page Information
      ===================================== */}

      <div>
        <p
          className="
            text-center

            text-sm

            text-stone-500
            dark:text-stone-300

            sm:text-left
          "
        >
          Showing{" "}
          <span
            className="
              font-bold

              text-stone-900
              dark:text-white
            "
          >
            {startItem}
          </span>
          {"–"}
          <span
            className="
              font-bold

              text-stone-900
              dark:text-white
            "
          >
            {endItem}
          </span>{" "}
          of{" "}
          <span
            className="
              font-bold

              text-stone-900
              dark:text-white
            "
          >
            {totalItems}
          </span>
        </p>

        <p
          className="
            mt-1

            text-center

            text-[11px]

            text-stone-400
            dark:text-stone-400

            sm:text-left
          "
        >
          Page{" "}
          {currentPage}{" "}
          of{" "}
          {totalPages}
        </p>
      </div>

      {/* =====================================
          Controls
      ===================================== */}

      <nav
        aria-label="Product pagination"
        className="
          flex
          flex-wrap
          items-center
          justify-center
          gap-2
        "
      >
        {/* Previous */}

        <button
          type="button"
          disabled={
            currentPage === 1
          }
          onClick={() =>
            onPageChange(
              currentPage - 1
            )
          }
          aria-label="Previous page"
          className="
            inline-flex
            h-10
            items-center
            justify-center
            gap-1.5

            rounded-xl

            border
            border-stone-200
            dark:border-stone-600

            bg-white
            dark:bg-stone-900

            px-3

            text-xs
            font-bold

            text-stone-600
            dark:text-stone-200

            transition-all
            duration-200

            hover:border-emerald-300
            hover:bg-emerald-50
            hover:text-emerald-700

            dark:hover:border-emerald-700
            dark:hover:bg-emerald-950/30
            dark:hover:text-emerald-400

            disabled:cursor-not-allowed
            disabled:opacity-40
            disabled:hover:border-stone-200
            disabled:hover:bg-white
            disabled:hover:text-stone-600

            dark:disabled:hover:border-stone-600
            dark:disabled:hover:bg-stone-900
            dark:disabled:hover:text-stone-200

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-emerald-500
            focus-visible:ring-offset-2

            dark:focus-visible:ring-offset-stone-950
          "
        >
          <ChevronLeft
            size={16}
            aria-hidden="true"
          />

          <span
            className="
              hidden

              sm:inline
            "
          >
            Previous
          </span>
        </button>

        {/* Page Numbers */}

        {visiblePages.map(
          (page) => {
            if (
              typeof page !==
              "number"
            ) {
              return (
                <span
                  key={page}
                  aria-hidden="true"
                  className="
                    flex
                    h-10
                    min-w-8
                    items-center
                    justify-center

                    text-sm
                    font-bold

                    text-stone-400
                    dark:text-stone-400
                  "
                >
                  ...
                </span>
              );
            }

            const isActive =
              page ===
              currentPage;

            return (
              <button
                key={
                  page
                }
                type="button"
                onClick={() =>
                  onPageChange(
                    page
                  )
                }
                aria-label={`Go to page ${page}`}
                aria-current={
                  isActive
                    ? "page"
                    : undefined
                }
                className={`
                  flex
                  h-10
                  min-w-10
                  items-center
                  justify-center

                  rounded-xl

                  border

                  px-3

                  text-sm
                  font-bold

                  transition-all
                  duration-200

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-emerald-500
                  focus-visible:ring-offset-2

                  dark:focus-visible:ring-offset-stone-950

                  ${
                    isActive
                      ? `
                        border-emerald-600

                        bg-emerald-600

                        text-white

                        shadow-md
                        shadow-emerald-600/15

                        dark:border-emerald-500
                        dark:bg-emerald-600
                      `
                      : `
                        border-stone-200
                        dark:border-stone-600

                        bg-white
                        dark:bg-stone-900

                        text-stone-600
                        dark:text-stone-200

                        hover:border-emerald-300
                        hover:bg-emerald-50
                        hover:text-emerald-700

                        dark:hover:border-emerald-700
                        dark:hover:bg-emerald-950/30
                        dark:hover:text-emerald-400
                      `
                  }
                `}
              >
                {page}
              </button>
            );
          }
        )}

        {/* Next */}

        <button
          type="button"
          disabled={
            currentPage ===
            totalPages
          }
          onClick={() =>
            onPageChange(
              currentPage + 1
            )
          }
          aria-label="Next page"
          className="
            inline-flex
            h-10
            items-center
            justify-center
            gap-1.5

            rounded-xl

            border
            border-stone-200
            dark:border-stone-600

            bg-white
            dark:bg-stone-900

            px-3

            text-xs
            font-bold

            text-stone-600
            dark:text-stone-200

            transition-all
            duration-200

            hover:border-emerald-300
            hover:bg-emerald-50
            hover:text-emerald-700

            dark:hover:border-emerald-700
            dark:hover:bg-emerald-950/30
            dark:hover:text-emerald-400

            disabled:cursor-not-allowed
            disabled:opacity-40
            disabled:hover:border-stone-200
            disabled:hover:bg-white
            disabled:hover:text-stone-600

            dark:disabled:hover:border-stone-600
            dark:disabled:hover:bg-stone-900
            dark:disabled:hover:text-stone-200

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-emerald-500
            focus-visible:ring-offset-2

            dark:focus-visible:ring-offset-stone-950
          "
        >
          <span
            className="
              hidden

              sm:inline
            "
          >
            Next
          </span>

          <ChevronRight
            size={16}
            aria-hidden="true"
          />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;