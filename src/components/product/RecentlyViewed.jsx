import {
  Clock3,
  Trash2,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import toast from "react-hot-toast";

import ProductGrid from "./ProductGrid";

import {
  clearRecentlyViewed,
  getRecentlyViewed,
} from "../../utils/storage";

import {
  MAX_RECENTLY_VIEWED,
} from "../../constants/commerce";

const RecentlyViewed = ({
  userId,
}) => {
  const [
    refreshVersion,
    setRefreshVersion,
  ] = useState(0);

  /* ========================================
     Load Recently Viewed

     refreshVersion intentionally causes
     this value to be recalculated after
     clearing the recently viewed history.
  ======================================== */

  const products =
    useMemo(() => {
      /*
       * This value is intentionally read
       * so changing refreshVersion causes
       * the storage data to be re-read.
       */
      void refreshVersion;

      if (!userId) {
        return [];
      }

      const recentlyViewed =
        getRecentlyViewed(
          userId
        );

      return Array.isArray(
        recentlyViewed
      )
        ? recentlyViewed
        : [];
    }, [
      userId,
      refreshVersion,
    ]);

  /* ========================================
     Clear History
  ======================================== */

  const handleClearHistory =
    () => {
      if (
        !userId ||
        products.length === 0
      ) {
        return;
      }

      const cleared =
        clearRecentlyViewed(
          userId
        );

      if (!cleared) {
        toast.error(
          "Unable to clear recently viewed products"
        );

        return;
      }

      /*
       * Storage has changed.
       * Trigger a fresh read from storage.
       */

      setRefreshVersion(
        (currentVersion) =>
          currentVersion + 1
      );

      toast.success(
        "Recently viewed history cleared"
      );
    };

  const hasProducts =
    products.length > 0;

  return (
    <section
      className="
        mt-6

        rounded-2xl

        border
        border-stone-200
        dark:border-stone-800

        bg-white
        dark:bg-stone-900

        p-5

        shadow-sm

        sm:p-6
      "
    >
      {/* =====================================
          Header
      ===================================== */}

      <div
        className="
          flex
          flex-col
          gap-4

          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div
          className="
            flex
            min-w-0
            items-center
            gap-3
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

              rounded-xl

              bg-emerald-50
              dark:bg-emerald-950/30

              text-emerald-700
              dark:text-emerald-400
            "
          >
            <Clock3
              size={19}
              aria-hidden="true"
            />
          </div>

          <div
            className="
              min-w-0
            "
          >
            <div
              className="
                flex
                flex-wrap
                items-center
                gap-2
              "
            >
              <h2
                className="
                  text-lg
                  font-black

                  text-stone-900
                  dark:text-white
                "
              >
                Recently Viewed
              </h2>

              {hasProducts && (
                <span
                  className="
                    rounded-full

                    bg-stone-100
                    dark:bg-stone-800

                    px-2.5
                    py-1

                    text-[10px]
                    font-black

                    text-stone-500
                    dark:text-stone-400
                  "
                >
                  {products.length}{" "}
                  {products.length ===
                  1
                    ? "item"
                    : "items"}
                </span>
              )}
            </div>

            <p
              className="
                mt-0.5

                text-xs
                leading-5

                text-stone-500
                dark:text-stone-400
              "
            >
              {hasProducts
                ? "Quickly return to products you've explored recently."
                : "Products you open will appear here for quick access later."}
            </p>
          </div>
        </div>

        {/* =================================
            Clear History
        ================================= */}

        {hasProducts && (
          <button
            type="button"
            onClick={
              handleClearHistory
            }
            className="
              inline-flex
              w-fit
              items-center
              justify-center
              gap-2

              rounded-xl

              border
              border-rose-200
              dark:border-rose-900

              bg-white
              dark:bg-stone-900

              px-4
              py-2.5

              text-xs
              font-bold

              text-rose-600
              dark:text-rose-400

              transition-all

              hover:bg-rose-50
              dark:hover:bg-rose-950/30

              active:scale-[0.98]

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-rose-500
              focus-visible:ring-offset-2

              dark:focus-visible:ring-offset-stone-900
            "
          >
            <Trash2
              size={15}
              aria-hidden="true"
            />

            Clear History
          </button>
        )}
      </div>

      {/* =====================================
          Content
      ===================================== */}

      <div
        className="
          mt-6
        "
      >
        {hasProducts ? (
          <ProductGrid
            products={
              products
            }
            loading={false}
          />
        ) : (
          <div
            className="
              flex
              min-h-[220px]
              flex-col
              items-center
              justify-center

              rounded-xl

              border
              border-dashed
              border-stone-300
              dark:border-stone-700

              bg-stone-50
              dark:bg-stone-800/50

              px-5
              py-10

              text-center
            "
          >
            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center

                rounded-2xl

                bg-white
                dark:bg-stone-900

                text-stone-400
                dark:text-stone-500

                shadow-sm
              "
            >
              <Clock3
                size={25}
                aria-hidden="true"
              />
            </div>

            <h3
              className="
                mt-4

                text-sm
                font-black

                text-stone-900
                dark:text-white
              "
            >
              No recently viewed
              products
            </h3>

            <p
              className="
                mt-1
                max-w-sm

                text-xs
                leading-5

                text-stone-500
                dark:text-stone-400
              "
            >
              Start exploring the
              catalog and your
              recently viewed
              products will appear
              here.
            </p>
          </div>
        )}
      </div>

      {/* =====================================
          Footer Note
      ===================================== */}

      {hasProducts && (
        <div
          className="
            mt-5

            border-t
            border-stone-100
            dark:border-stone-800

            pt-4
          "
        >
          <p
            className="
              text-center

              text-[11px]

              text-stone-400
              dark:text-stone-500
            "
          >
            ShopSphere keeps your
            latest{" "}
            {MAX_RECENTLY_VIEWED}{" "}
            recently viewed
            products.
          </p>
        </div>
      )}
    </section>
  );
};

export default RecentlyViewed;