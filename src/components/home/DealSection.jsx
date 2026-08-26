import {
  ArrowRight,
  Clock3,
  Flame,
  Star,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  useSelector,
} from "react-redux";

import {
  selectProducts,
  selectProductsLoading,
} from "../../features/products/productSlice";

/* ========================================
   Deal Countdown
======================================== */

const getSecondsUntilMidnight =
  () => {
    const now =
      new Date();

    const midnight =
      new Date(now);

    midnight.setHours(
      24,
      0,
      0,
      0
    );

    return Math.max(
      0,
      Math.floor(
        (midnight.getTime() -
          now.getTime()) /
          1000
      )
    );
  };

/* ========================================
   Deal Section
======================================== */

const DealSection = () => {
  const products =
    useSelector(
      selectProducts
    );

  const loading =
    useSelector(
      selectProductsLoading
    );

  const [
    secondsRemaining,
    setSecondsRemaining,
  ] = useState(
    getSecondsUntilMidnight
  );

  /* ========================================
     Countdown Timer
  ======================================== */

  useEffect(() => {
    const timer =
      window.setInterval(
        () => {
          setSecondsRemaining(
            getSecondsUntilMidnight()
          );
        },
        1000
      );

    return () =>
      window.clearInterval(
        timer
      );
  }, []);

  const hours =
    String(
      Math.floor(
        secondsRemaining /
          3600
      )
    ).padStart(
      2,
      "0"
    );

  const minutes =
    String(
      Math.floor(
        (secondsRemaining %
          3600) /
          60
      )
    ).padStart(
      2,
      "0"
    );

  const seconds =
    String(
      secondsRemaining %
        60
    ).padStart(
      2,
      "0"
    );

  /* ========================================
     Deal Products
  ======================================== */

  const dealProducts =
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
              second
                .discountPercentage ||
                0
            ) -
            Number(
              first
                .discountPercentage ||
                0
            )
        )
        .slice(
          0,
          2
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
          relative
          overflow-hidden

          rounded-[1.75rem]

          bg-stone-900

          px-5
          py-8

          text-white

          sm:rounded-[2rem]
          sm:px-8
          sm:py-10

          lg:px-12
          lg:py-12
        "
      >
        {/* Background Glow */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            -left-32
            -top-32

            h-80
            w-80

            rounded-full

            bg-amber-400/10

            blur-3xl
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            -bottom-32
            right-10

            h-80
            w-80

            rounded-full

            bg-emerald-500/10

            blur-3xl
          "
        />

        {/* ========================================
            Deal Content
        ======================================== */}

        <div
          className="
            relative
            z-10

            grid
            gap-10

            lg:grid-cols-[0.8fr_1.2fr]
            lg:items-center
          "
        >
          {/* ========================================
              Left Content
          ======================================== */}

          <div>
            <div
              className="
                inline-flex
                items-center
                gap-2

                rounded-full

                border
                border-amber-400/20

                bg-amber-400/10

                px-3
                py-1.5

                text-xs
                font-bold
                uppercase
                tracking-[0.12em]

                text-amber-300
              "
            >
              <Flame
                size={15}
                aria-hidden="true"
              />

              Today's Deals
            </div>

            <h2
              className="
                mt-5

                max-w-lg

                text-3xl
                font-black
                leading-tight
                tracking-tight

                sm:text-4xl
                lg:text-5xl
              "
            >
              Big savings.
              <br />

              <span className="text-emerald-400">
                Better picks.
              </span>
            </h2>

            <p
              className="
                mt-4

                max-w-md

                text-sm
                leading-6

                text-stone-300

                sm:text-base
              "
            >
              Explore products with
              some of the strongest
              discounts currently
              available across
              ShopSphere.
            </p>

            {/* ========================================
                Countdown
            ======================================== */}

            <div
              className="
                mt-7

                flex
                items-center
                gap-2

                sm:gap-3
              "
            >
              <Clock3
                size={19}
                className="
                  hidden

                  text-amber-400

                  sm:block
                "
                aria-hidden="true"
              />

              {[
                {
                  value:
                    hours,
                  label:
                    "Hrs",
                },
                {
                  value:
                    minutes,
                  label:
                    "Min",
                },
                {
                  value:
                    seconds,
                  label:
                    "Sec",
                },
              ].map(
                ({
                  value,
                  label,
                }) => (
                  <div
                    key={
                      label
                    }
                    className="
                      min-w-[60px]

                      rounded-xl

                      border
                      border-white/10

                      bg-white/5

                      px-3
                      py-3

                      text-center

                      backdrop-blur-sm

                      sm:min-w-[64px]
                    "
                  >
                    <p
                      className="
                        text-xl
                        font-black

                        sm:text-2xl
                      "
                    >
                      {
                        value
                      }
                    </p>

                    <p
                      className="
                        mt-1

                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.15em]

                        text-stone-400
                      "
                    >
                      {
                        label
                      }
                    </p>
                  </div>
                )
              )}
            </div>

            <p
              className="
                mt-2

                text-[10px]

                text-stone-500
              "
            >
              Today's deal window
              refreshes at midnight.
            </p>

            {/* ========================================
                Explore Deals Button
            ======================================== */}

            <Link
              to="/shop?sort=discount"
              className="
                mt-7

                inline-flex
                items-center
                justify-center
                gap-2

                rounded-xl

                bg-emerald-500

                px-5
                py-3

                text-sm
                font-bold

                text-white

                transition-all

                hover:bg-emerald-400
                hover:gap-3

                active:scale-[0.98]

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-emerald-300
                focus-visible:ring-offset-2
                focus-visible:ring-offset-stone-900
              "
            >
              Explore All Deals

              <ArrowRight
                size={17}
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* ========================================
              Deal Product Cards
          ======================================== */}

          <div
            className="
              grid
              gap-4

              sm:grid-cols-2
            "
          >
            {/* Loading Skeletons */}

            {loading &&
              products.length ===
                0 &&
              [1, 2].map(
                (item) => (
                  <div
                    key={
                      item
                    }
                    className="
                      h-[360px]

                      animate-pulse

                      rounded-2xl

                      bg-white/10
                    "
                  />
                )
              )}

            {/* Products */}

            {!loading &&
              dealProducts.map(
                (
                  product
                ) => {
                  const price =
                    Math.round(
                      Number(
                        product.price ||
                          0
                      ) * 83
                    ).toLocaleString(
                      "en-IN"
                    );

                  const discount =
                    Math.round(
                      Number(
                        product
                          .discountPercentage ||
                          0
                      )
                    );

                  return (
                    <Link
                      key={
                        product.id
                      }
                      to={`/product/${product.id}`}
                      className="
                        group

                        overflow-hidden

                        rounded-2xl

                        border
                        border-stone-200
                        dark:border-stone-700

                        bg-white
                        dark:bg-stone-900

                        text-stone-900
                        dark:text-white

                        shadow-2xl

                        transition-all
                        duration-300

                        hover:-translate-y-1
                        hover:border-stone-300

                        dark:hover:border-stone-600

                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-emerald-400
                      "
                    >
                      {/* Product Image */}

                      <div
                        className="
                          relative

                          aspect-[4/3.4]

                          overflow-hidden

                          bg-stone-100
                          dark:bg-stone-800

                          transition-colors
                          duration-300
                        "
                      >
                        <img
                          src={
                            product.thumbnail
                          }
                          alt={
                            product.title
                          }
                          loading="lazy"
                          className="
                            h-full
                            w-full

                            object-contain

                            p-5

                            transition-transform
                            duration-500

                            group-hover:scale-105
                          "
                        />

                        {/* Discount Badge */}

                        {discount >
                          0 && (
                          <div
                            className="
                              absolute
                              left-3
                              top-3

                              rounded-lg

                              bg-amber-400

                              px-2.5
                              py-1.5

                              text-[10px]
                              font-black

                              text-stone-900

                              shadow-sm
                            "
                          >
                            SAVE{" "}
                            {
                              discount
                            }
                            %
                          </div>
                        )}
                      </div>

                      {/* ========================================
                          Product Details
                      ======================================== */}

                      <div className="p-5">
                        {/* Brand */}

                        <p
                          className="
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.12em]

                            text-emerald-700
                            dark:text-emerald-400
                          "
                        >
                          {product.brand ||
                            product.category}
                        </p>

                        {/* Product Name */}

                        <h3
                          className="
                            mt-2

                            line-clamp-2

                            min-h-[2.5rem]

                            text-base
                            font-black
                            leading-5

                            text-stone-900
                            dark:text-white
                          "
                        >
                          {
                            product.title
                          }
                        </h3>

                        {/* Rating */}

                        <div
                          className="
                            mt-3

                            flex
                            items-center
                            gap-1.5
                          "
                        >
                          <Star
                            size={14}
                            fill="currentColor"
                            className="
                              text-amber-400
                            "
                            aria-hidden="true"
                          />

                          <span
                            className="
                              text-xs
                              font-bold

                              text-stone-700
                              dark:text-stone-300
                            "
                          >
                            {Number(
                              product.rating ||
                                0
                            ).toFixed(
                              1
                            )}
                          </span>
                        </div>

                        {/* Price + Arrow */}

                        <div
                          className="
                            mt-5

                            flex
                            items-center
                            justify-between
                            gap-3
                          "
                        >
                          <div>
                            <p
                              className="
                                text-lg
                                font-black

                                text-stone-900
                                dark:text-white
                              "
                            >
                              ₹
                              {
                                price
                              }
                            </p>

                            <p
                              className="
                                text-[10px]

                                text-stone-500
                                dark:text-stone-400
                              "
                            >
                              Deal price
                            </p>
                          </div>

                          <div
                            className="
                              flex
                              h-10
                              w-10
                              shrink-0
                              items-center
                              justify-center

                              rounded-xl

                              bg-stone-900
                              dark:bg-stone-800

                              text-white

                              transition-colors
                              duration-200

                              group-hover:bg-emerald-600
                              dark:group-hover:bg-emerald-600
                            "
                            aria-hidden="true"
                          >
                            <ArrowRight
                              size={
                                17
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                }
              )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealSection;