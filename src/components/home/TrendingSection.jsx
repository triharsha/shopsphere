import {
  ArrowRight,
  Award,
  Star,
  TrendingUp,
} from "lucide-react";

import {
  useMemo,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  useSelector,
} from "react-redux";

import ProductGrid from "../product/ProductGrid";

import {
  selectProducts,
  selectProductsLoading,
} from "../../features/products/productSlice";

const TrendingSection = () => {
  const products =
    useSelector(
      selectProducts
    );

  const loading =
    useSelector(
      selectProductsLoading
    );

  const trendingProducts =
    useMemo(() => {
      return [
        ...products,
      ]
        .sort(
          (
            first,
            second
          ) =>
            Number(
              second.rating ||
                0
            ) -
            Number(
              first.rating ||
                0
            )
        )
        .slice(
          0,
          4
        );
    }, [
      products,
    ]);

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
          gap-5

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

              bg-amber-50
              dark:bg-amber-950/30

              px-3
              py-1.5

              text-xs
              font-black
              uppercase
              tracking-[0.12em]

              text-amber-700
              dark:text-amber-400
            "
          >
            <TrendingUp
              size={14}
              aria-hidden="true"
            />

            Popular right now
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
            Trending Picks
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
            Explore some of the
            highest-rated products
            currently available
            across ShopSphere.
          </p>
        </div>

        <Link
          to="/shop?sort=rating"
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
          Explore Trending

          <ArrowRight
            size={17}
            aria-hidden="true"
          />
        </Link>
      </div>

      <div
        className="
          mb-6

          grid
          gap-3

          sm:grid-cols-2
        "
      >
        <div
          className="
            flex
            items-center
            gap-3

            rounded-2xl

            border
            border-stone-200
            dark:border-stone-800

            bg-white
            dark:bg-stone-900

            px-4
            py-4

            sm:px-5
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center

              rounded-xl

              bg-amber-100
              dark:bg-amber-950/40

              text-amber-700
              dark:text-amber-400
            "
          >
            <Star
              size={19}
              aria-hidden="true"
            />
          </div>

          <div>
            <p className="text-sm font-bold text-stone-900 dark:text-white">
              Top Rated
            </p>

            <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
              Selected using
              customer ratings
            </p>
          </div>
        </div>

        <div
          className="
            flex
            items-center
            gap-3

            rounded-2xl

            border
            border-stone-200
            dark:border-stone-800

            bg-white
            dark:bg-stone-900

            px-4
            py-4

            sm:px-5
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center

              rounded-xl

              bg-emerald-100
              dark:bg-emerald-950/40

              text-emerald-700
              dark:text-emerald-400
            "
          >
            <Award
              size={19}
              aria-hidden="true"
            />
          </div>

          <div>
            <p className="text-sm font-bold text-stone-900 dark:text-white">
              Curated Selection
            </p>

            <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
              Strong picks across
              categories
            </p>
          </div>
        </div>
      </div>

      <ProductGrid
        products={
          trendingProducts
        }
        loading={
          loading
        }
        skeletonCount={4}
      />
    </section>
  );
};

export default TrendingSection;