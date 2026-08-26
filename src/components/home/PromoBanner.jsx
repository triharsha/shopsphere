import {
  ArrowRight,
  Gift,
  Sparkles,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

const PromoBanner = () => {
  return (
    <section
      className="
        container-shell

        pb-8

        sm:pb-12
      "
    >
      <div
        className="
          relative
          overflow-hidden

          rounded-[1.75rem]

          bg-gradient-to-r
          from-emerald-700
          via-emerald-600
          to-emerald-500

          px-5
          py-9

          text-white

          sm:rounded-[2rem]
          sm:px-10
          sm:py-12

          lg:px-14
        "
      >
        <div
          aria-hidden="true"
          className="
            absolute
            -right-24
            -top-28

            h-72
            w-72

            rounded-full

            bg-white/10

            blur-2xl
          "
        />

        <div
          aria-hidden="true"
          className="
            absolute
            -bottom-24
            left-1/3

            h-64
            w-64

            rounded-full

            bg-amber-400/15

            blur-3xl
          "
        />

        <div
          className="
            relative
            z-10

            flex
            flex-col
            gap-8

            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          <div className="max-w-2xl">
            <div
              className="
                inline-flex
                items-center
                gap-2

                rounded-full

                border
                border-white/20

                bg-white/10

                px-3
                py-1.5

                text-xs
                font-bold
                uppercase
                tracking-[0.12em]

                text-emerald-50
              "
            >
              <Sparkles
                size={14}
                aria-hidden="true"
              />

              ShopSphere Exclusive
            </div>

            <h2
              className="
                mt-5

                text-3xl
                font-black
                leading-tight
                tracking-tight

                sm:text-4xl
                lg:text-5xl
              "
            >
              More choices.
              <br />

              Better shopping.
            </h2>

            <p
              className="
                mt-4
                max-w-xl

                text-sm
                leading-6

                text-emerald-50/90

                sm:text-base
              "
            >
              Discover products
              across fashion,
              technology, beauty,
              home and everyday
              essentials — all in
              one shopping
              experience.
            </p>
          </div>

          <div
            className="
              w-full

              rounded-2xl

              border
              border-white/20

              bg-white/10

              p-5

              backdrop-blur-md

              sm:max-w-sm
              sm:p-6
            "
          >
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center

                rounded-2xl

                bg-amber-400

                text-stone-900
              "
            >
              <Gift
                size={22}
                aria-hidden="true"
              />
            </div>

            <h3 className="mt-5 text-xl font-black">
              Start exploring
              today
            </h3>

            <p
              className="
                mt-2

                text-sm
                leading-6

                text-emerald-50/80
              "
            >
              Browse every category
              and find products that
              match what you're
              looking for.
            </p>

            <Link
              to="/shop"
              className="
                mt-5

                inline-flex
                w-full
                items-center
                justify-center
                gap-2

                rounded-xl

                bg-white

                px-5
                py-3

                text-sm
                font-bold

                text-emerald-800

                transition-all

                hover:bg-amber-50
                hover:gap-3

                active:scale-[0.98]

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-white
                focus-visible:ring-offset-2
                focus-visible:ring-offset-emerald-600
              "
            >
              Browse Shop

              <ArrowRight
                size={17}
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;