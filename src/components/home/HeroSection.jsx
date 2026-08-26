import {
  ArrowRight,
  BadgeCheck,
  ShoppingBag,
  Sparkles,
  Star,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

const HeroSection = () => {
  return (
    <section
      className="
        container-shell

        pt-5

        sm:pt-8
        lg:pt-10
      "
    >
      <div
        className="
          relative
          overflow-hidden

          rounded-[1.75rem]

          bg-stone-900

          px-5
          py-9

          text-white

          sm:rounded-[2rem]
          sm:px-10
          sm:py-14

          lg:min-h-[520px]
          lg:px-14
          lg:py-16
        "
      >
        {/* Decorative Background */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            -right-24
            -top-32

            h-96
            w-96

            rounded-full

            bg-emerald-500/20

            blur-3xl
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            -bottom-40
            left-1/3

            h-96
            w-96

            rounded-full

            bg-amber-500/10

            blur-3xl
          "
        />

        <div
          className="
            relative
            z-10

            grid
            items-center
            gap-10

            lg:grid-cols-[1.1fr_0.9fr]
            lg:gap-12
          "
        >
          {/* Content */}

          <div className="max-w-2xl">
            <div
              className="
                inline-flex
                items-center
                gap-2

                rounded-full

                border
                border-emerald-400/20

                bg-emerald-400/10

                px-3
                py-1.5

                text-[11px]
                font-bold
                uppercase
                tracking-[0.12em]

                text-emerald-300

                backdrop-blur-sm

                sm:px-4
                sm:py-2
                sm:text-xs
              "
            >
              <Sparkles
                size={14}
                aria-hidden="true"
              />

              New season collection
              is live
            </div>

            <h1
              className="
                mt-5

                max-w-2xl

                text-4xl
                font-black
                leading-[1.08]
                tracking-[-0.04em]

                sm:mt-6
                sm:text-5xl

                lg:text-6xl
              "
            >
              Discover products
              you'll{" "}
              <span className="text-emerald-400">
                love
              </span>
              , all in one place.
            </h1>

            <p
              className="
                mt-5

                max-w-xl

                text-sm
                leading-7

                text-stone-300

                sm:mt-6
                sm:text-lg
              "
            >
              Explore trending
              products, compare your
              favorites and enjoy a
              smarter shopping
              experience designed
              around you.
            </p>

            <div
              className="
                mt-7

                flex
                flex-col
                gap-3

                sm:mt-8
                sm:flex-row
              "
            >
              <Link
                to="/shop"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2

                  rounded-xl

                  bg-emerald-500

                  px-6
                  py-3.5

                  text-sm
                  font-bold

                  text-white

                  shadow-lg
                  shadow-emerald-950/30

                  transition-all

                  hover:bg-emerald-400
                  hover:shadow-xl

                  active:scale-[0.98]

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-emerald-300
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-stone-900
                "
              >
                <ShoppingBag
                  size={18}
                  aria-hidden="true"
                />

                Shop Now

                <ArrowRight
                  size={17}
                  aria-hidden="true"
                />
              </Link>

              <Link
                to="/shop?sort=discount"
                className="
                  inline-flex
                  items-center
                  justify-center

                  rounded-xl

                  border
                  border-white/15

                  bg-white/5

                  px-6
                  py-3.5

                  text-sm
                  font-semibold

                  text-white

                  backdrop-blur-sm

                  transition-all

                  hover:border-white/25
                  hover:bg-white/10

                  active:scale-[0.98]

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-white/70
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-stone-900
                "
              >
                Explore Deals
              </Link>
            </div>

            <div
              className="
                mt-8

                flex
                flex-wrap
                gap-x-6
                gap-y-3

                sm:mt-9
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2

                  text-xs
                  font-medium

                  text-stone-300
                "
              >
                <BadgeCheck
                  size={16}
                  className="text-emerald-400"
                  aria-hidden="true"
                />

                Curated products
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-2

                  text-xs
                  font-medium

                  text-stone-300
                "
              >
                <Star
                  size={16}
                  className="text-amber-400"
                  aria-hidden="true"
                />

                Top-rated picks
              </div>
            </div>
          </div>

          {/* Visual */}

          <div
            className="
              relative

              mx-auto

              hidden
              w-full
              max-w-md

              lg:block
            "
          >
            <div
              className="
                relative

                rounded-[2rem]

                border
                border-white/10

                bg-white/10

                p-6

                shadow-2xl

                backdrop-blur-xl
              "
            >
              <div
                className="
                  flex
                  aspect-square
                  items-center
                  justify-center

                  overflow-hidden

                  rounded-[1.5rem]

                  bg-gradient-to-br
                  from-emerald-100
                  via-stone-100
                  to-amber-100
                "
              >
                <ShoppingBag
                  size={110}
                  strokeWidth={1}
                  className="text-emerald-700/70"
                  aria-hidden="true"
                />
              </div>

              <div
                className="
                  mt-5

                  flex
                  items-end
                  justify-between
                  gap-4
                "
              >
                <div>
                  <p
                    className="
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wider

                      text-emerald-300
                    "
                  >
                    Featured
                  </p>

                  <h2
                    className="
                      mt-1

                      text-lg
                      font-bold

                      text-white
                    "
                  >
                    Premium Collection
                  </h2>

                  <div className="mt-2 flex items-center gap-1">
                    <Star
                      size={14}
                      className="
                        fill-amber-400
                        text-amber-400
                      "
                      aria-hidden="true"
                    />

                    <span className="text-xs font-semibold text-stone-300">
                      4.9
                    </span>

                    <span className="text-xs text-stone-500">
                      • Trending now
                    </span>
                  </div>
                </div>

                <div
                  className="
                    rounded-xl

                    bg-white

                    px-4
                    py-2

                    text-sm
                    font-black

                    text-stone-900
                  "
                >
                  From ₹999
                </div>
              </div>
            </div>

            <div
              className="
                absolute
                -right-5
                top-10

                rounded-2xl

                bg-amber-400

                px-4
                py-3

                text-stone-900

                shadow-xl
              "
            >
              <p className="text-xs font-bold uppercase">
                Save up to
              </p>

              <p className="text-2xl font-black">
                40%
              </p>
            </div>

            <div
              className="
                absolute
                -bottom-5
                -left-5

                flex
                items-center
                gap-3

                rounded-2xl

                bg-white

                px-4
                py-3

                text-stone-900

                shadow-xl
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center

                  rounded-xl

                  bg-emerald-100
                "
              >
                <Star
                  size={19}
                  className="
                    fill-emerald-600
                    text-emerald-600
                  "
                  aria-hidden="true"
                />
              </div>

              <div>
                <p className="text-sm font-black">
                  4.9/5
                </p>

                <p className="text-[11px] text-stone-500">
                  Customer rating
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;