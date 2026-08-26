import {
  SlidersHorizontal,
  X,
} from "lucide-react";

import {
  useEffect,
} from "react";

import FilterSidebar from "./FilterSidebar";

const MobileFilterDrawer = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  /* =====================================
     Escape To Close
  ===================================== */

  useEffect(() => {
    if (!isOpen) {
      return;
    }

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
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    isOpen,
    onClose,
  ]);

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
      aria-label="Product filters"
    >
      {/* =====================================
          Backdrop
      ===================================== */}

      <button
        type="button"
        aria-label="Close filters"
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
          absolute
          right-0
          top-0

          z-10

          flex
          h-full
          w-[90%]
          max-w-sm
          flex-col

          overflow-hidden

          border-l
          border-stone-200
          dark:border-stone-800

          bg-stone-50
          dark:bg-stone-950

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

            bg-white
            dark:bg-stone-900

            px-5
            py-4
          "
        >
          <div
            className="
              min-w-0
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
                  text-lg
                  font-black

                  text-stone-900
                  dark:text-white
                "
              >
                Filters
              </h2>
            </div>

            <p
              className="
                mt-1

                text-xs

                text-stone-500
                dark:text-stone-400
              "
            >
              Refine your product
              results
            </p>
          </div>

          <button
            type="button"
            onClick={
              onClose
            }
            aria-label="Close filter drawer"
            title="Close filters"
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
              size={19}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* =====================================
            Scrollable Filters
        ===================================== */}

        <div
          className="
            min-h-0
            flex-1

            overflow-y-auto
            overscroll-contain

            p-4
          "
        >
          <FilterSidebar
            filters={
              filters
            }
            onFilterChange={
              onFilterChange
            }
            onClearFilters={
              onClearFilters
            }
          />
        </div>

        {/* =====================================
            Footer
        ===================================== */}

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
              onClose
            }
            className="
              inline-flex
              w-full
              items-center
              justify-center
              gap-2

              rounded-xl

              bg-emerald-600

              px-5
              py-3

              text-sm
              font-bold

              text-white

              transition-all

              hover:bg-emerald-700

              active:scale-[0.99]

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-emerald-500
              focus-visible:ring-offset-2

              dark:focus-visible:ring-offset-stone-900
            "
          >
            View Products
          </button>
        </div>
      </aside>
    </div>
  );
};

export default MobileFilterDrawer;