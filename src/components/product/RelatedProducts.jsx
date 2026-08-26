import {
  ArrowRight,
  PackageSearch,
  RefreshCcw,
  Sparkles,
} from "lucide-react";

import {
  useEffect,
  useMemo,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import ProductGrid from "./ProductGrid";

import {
  clearRelatedProducts,
  fetchRelatedProducts,
  selectRelatedError,
  selectRelatedLoading,
  selectRelatedProducts,
} from "../../features/products/productSlice";

/* ========================================
   Related Products
======================================== */

const RelatedProducts = ({
  product,
}) => {
  const dispatch =
    useDispatch();

  const relatedProducts =
    useSelector(
      selectRelatedProducts
    );

  const loading =
    useSelector(
      selectRelatedLoading
    );

  const error =
    useSelector(
      selectRelatedError
    );

  /* ========================================
     Load Related Products
  ======================================== */

  useEffect(() => {
    if (
      !product?.category ||
      !product?.id
    ) {
      return;
    }

    dispatch(
      fetchRelatedProducts({
        category:
          product.category,

        excludeId:
          product.id,

        limit: 4,
      })
    );

    return () => {
      dispatch(
        clearRelatedProducts()
      );
    };
  }, [
    dispatch,
    product?.category,
    product?.id,
  ]);

  /* ========================================
     Retry
  ======================================== */

  const handleRetry =
    () => {
      if (
        !product?.category ||
        !product?.id
      ) {
        return;
      }

      dispatch(
        fetchRelatedProducts({
          category:
            product.category,

          excludeId:
            product.id,

          limit: 4,
        })
      );
    };

  /* ========================================
     Safe Related Products

     Protect against:
     - duplicate products
     - current product appearing again
     - invalid product entries
  ======================================== */

  const safeRelatedProducts =
    useMemo(() => {
      if (
        !Array.isArray(
          relatedProducts
        )
      ) {
        return [];
      }

      const seenIds =
        new Set();

      return relatedProducts
        .filter(
          (item) => {
            if (
              !item?.id
            ) {
              return false;
            }

            if (
              String(
                item.id
              ) ===
              String(
                product?.id
              )
            ) {
              return false;
            }

            const key =
              String(
                item.id
              );

            if (
              seenIds.has(
                key
              )
            ) {
              return false;
            }

            seenIds.add(
              key
            );

            return true;
          }
        )
        .slice(
          0,
          4
        );
    }, [
      relatedProducts,
      product?.id,
    ]);

  /* ========================================
     Category Label
  ======================================== */

  const categoryLabel =
    product?.category
      ?.replaceAll(
        "-",
        " "
      )
      .replace(
        /\b\w/g,
        (letter) =>
          letter.toUpperCase()
      ) ||
    "Products";

  /* ========================================
     Category URL
  ======================================== */

  const categoryPath =
    product?.category
      ? `/shop?category=${encodeURIComponent(
          product.category
        )}`
      : "/shop";

  return (
    <section
      className="
        mt-14

        border-t
        border-stone-200
        dark:border-stone-800

        pt-10
      "
    >
      {/* =====================================
          Header
      ===================================== */}

      <div
        className="
          mb-8

          flex
          flex-col
          gap-4

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
              dark:bg-emerald-950/30

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
            <Sparkles
              size={14}
              aria-hidden="true"
            />

            You May Also Like
          </div>

          <h2
            className="
              mt-4

              text-2xl
              font-black
              tracking-tight

              text-stone-900
              dark:text-white

              sm:text-3xl
            "
          >
            Related Products
          </h2>

          <p
            className="
              mt-2
              max-w-2xl

              text-sm
              leading-6

              text-stone-500
              dark:text-stone-400
            "
          >
            Explore more products
            from the{" "}

            <span
              className="
                font-bold

                text-stone-700
                dark:text-stone-300
              "
            >
              {
                categoryLabel
              }
            </span>{" "}

            collection.
          </p>
        </div>

        <Link
          to={
            categoryPath
          }
          className="
            inline-flex
            w-fit
            items-center
            gap-2

            rounded-lg

            py-2

            text-sm
            font-bold

            text-emerald-700
            dark:text-emerald-400

            transition-all
            duration-200

            hover:gap-3

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-emerald-500
            focus-visible:ring-offset-2

            dark:focus-visible:ring-offset-stone-950
          "
        >
          View Category

          <ArrowRight
            size={17}
            aria-hidden="true"
          />
        </Link>
      </div>

      {/* =====================================
          Error State
      ===================================== */}

      {error &&
        !loading && (
          <div
            className="
              rounded-2xl

              border
              border-rose-200
              dark:border-rose-900/50

              bg-rose-50
              dark:bg-rose-950/20

              px-6
              py-10

              text-center
            "
          >
            <h3
              className="
                text-base
                font-black

                text-stone-900
                dark:text-white
              "
            >
              Related products
              couldn't be loaded
            </h3>

            <p
              className="
                mx-auto
                mt-2
                max-w-md

                text-sm
                leading-6

                text-stone-500
                dark:text-stone-400
              "
            >
              We couldn't load more
              products from this
              category right now.
            </p>

            <button
              type="button"
              onClick={
                handleRetry
              }
              className="
                mt-5

                inline-flex
                items-center
                justify-center
                gap-2

                rounded-xl

                bg-stone-900
                dark:bg-white

                px-5
                py-3

                text-sm
                font-bold

                text-white
                dark:text-stone-900

                transition-all

                hover:bg-stone-800
                dark:hover:bg-stone-200

                active:scale-[0.98]

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-emerald-500
              "
            >
              <RefreshCcw
                size={17}
                aria-hidden="true"
              />

              Try Again
            </button>
          </div>
        )}

      {/* =====================================
          Loading / Products
      ===================================== */}

      {!error && (
        <>
          {loading ? (
            <ProductGrid
              products={[]}
              loading
              skeletonCount={4}
            />
          ) : safeRelatedProducts.length >
            0 ? (
            <ProductGrid
              products={
                safeRelatedProducts
              }
              loading={
                false
              }
            />
          ) : (
            /* =================================
               Empty State
            ================================= */

            <div
              className="
                rounded-2xl

                border
                border-dashed
                border-stone-300
                dark:border-stone-700

                bg-white
                dark:bg-stone-900

                px-6
                py-12

                text-center
              "
            >
              <div
                className="
                  mx-auto

                  flex
                  h-14
                  w-14
                  items-center
                  justify-center

                  rounded-2xl

                  bg-stone-100
                  dark:bg-stone-800

                  text-stone-400
                  dark:text-stone-500
                "
              >
                <PackageSearch
                  size={24}
                  aria-hidden="true"
                />
              </div>

              <h3
                className="
                  mt-5

                  text-lg
                  font-black

                  text-stone-900
                  dark:text-white
                "
              >
                No related products
                available
              </h3>

              <p
                className="
                  mx-auto
                  mt-2
                  max-w-md

                  text-sm
                  leading-6

                  text-stone-500
                  dark:text-stone-400
                "
              >
                There aren't any
                other products in
                this category right
                now.
              </p>

              <Link
                to="/shop"
                className="
                  mt-5

                  inline-flex
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

                  active:scale-[0.98]

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-emerald-500
                "
              >
                Browse Shop

                <ArrowRight
                  size={17}
                  aria-hidden="true"
                />
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default RelatedProducts;