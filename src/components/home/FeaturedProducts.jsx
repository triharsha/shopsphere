import {
  ArrowRight,
  RefreshCcw,
  Sparkles,
} from "lucide-react";

import {
  useEffect,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import ProductGrid from "../product/ProductGrid";

import {
  fetchProducts,
  selectProducts,
  selectProductsError,
  selectProductsLoading,
} from "../../features/products/productSlice";

const FeaturedProducts = () => {
  const dispatch =
    useDispatch();

  const products =
    useSelector(
      selectProducts
    );

  const loading =
    useSelector(
      selectProductsLoading
    );

  const error =
    useSelector(
      selectProductsError
    );

  useEffect(() => {
    if (
      products.length === 0
    ) {
      dispatch(
        fetchProducts({
          limit: 8,
          skip: 0,
        })
      );
    }
  }, [
    dispatch,
    products.length,
  ]);

  const handleRetry =
    () => {
      dispatch(
        fetchProducts({
          limit: 8,
          skip: 0,
        })
      );
    };

  return (
    <section
      className="
        container-shell
        section-spacing
      "
    >
      <div
        className="
          mb-7

          flex
          flex-col
          gap-4

          sm:mb-8
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
            <Sparkles
              size={14}
              aria-hidden="true"
            />

            Curated for you
          </div>

          <h2
            className="
              mt-4

              text-3xl
              font-black
              tracking-tight

              text-stone-900
              dark:text-white

              sm:text-4xl
            "
          >
            Featured Products
          </h2>

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
            Discover a handpicked
            selection of popular
            products from across
            ShopSphere.
          </p>
        </div>

        <Link
          to="/shop"
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

            hover:gap-3

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-emerald-500
          "
        >
          View All Products

          <ArrowRight
            size={17}
            aria-hidden="true"
          />
        </Link>
      </div>

      {error &&
        !loading && (
          <div
            className="
              rounded-3xl

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
                text-lg
                font-bold

                text-stone-900
                dark:text-white
              "
            >
              We couldn't load
              featured products
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
              {error}
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

      {!error && (
        <ProductGrid
          products={
            products.slice(
              0,
              8
            )
          }
          loading={
            loading
          }
          skeletonCount={8}
        />
      )}
    </section>
  );
};

export default FeaturedProducts;