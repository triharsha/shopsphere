import {
  ArrowRight,
  Laptop,
  Shirt,
  ShoppingBasket,
  Smartphone,
  Sofa,
  Sparkles,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

const categories = [
  {
    id: 1,
    title: "Smartphones",
    description:
      "Latest mobile technology",
    slug: "smartphones",
    icon: Smartphone,
  },
  {
    id: 2,
    title: "Laptops",
    description:
      "Work, create and play",
    slug: "laptops",
    icon: Laptop,
  },
  {
    id: 3,
    title: "Beauty",
    description:
      "Everyday beauty essentials",
    slug: "beauty",
    icon: Sparkles,
  },
  {
    id: 4,
    title: "Furniture",
    description:
      "Upgrade your living space",
    slug: "furniture",
    icon: Sofa,
  },
  {
    id: 5,
    title: "Groceries",
    description:
      "Daily household essentials",
    slug: "groceries",
    icon: ShoppingBasket,
  },
  {
    id: 6,
    title: "Men's Fashion",
    description:
      "Modern wardrobe picks",
    slug: "mens-shirts",
    icon: Shirt,
  },
];

const CategorySection = () => {
  return (
    <section
      className="
        container-shell
        section-spacing
      "
    >
      <div
        className="
          flex
          flex-col
          gap-4

          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >
        <div>
          <p
            className="
              text-xs
              font-black
              uppercase
              tracking-[0.14em]

              text-emerald-700
              dark:text-emerald-400
            "
          >
            Explore Collections
          </p>

          <h2
            className="
              mt-2

              text-3xl
              font-black
              tracking-tight

              text-stone-900
              dark:text-white

              sm:text-4xl
            "
          >
            Shop by Category
          </h2>

          <p
            className="
              mt-3
              max-w-xl

              text-sm
              leading-6

              text-stone-500
              dark:text-stone-400
            "
          >
            Browse popular
            categories and discover
            products selected for
            every part of your
            lifestyle.
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
          View All

          <ArrowRight
            size={17}
            aria-hidden="true"
          />
        </Link>
      </div>

      <div
        className="
          mt-7

          grid
          gap-4

          sm:mt-8
          sm:grid-cols-2

          lg:grid-cols-3
        "
      >
        {categories.map(
          ({
            id,
            title,
            description,
            slug,
            icon: Icon,
          }) => (
            <Link
              key={id}
              to={`/shop?category=${encodeURIComponent(
                slug
              )}`}
              className="
                group

                relative

                overflow-hidden

                rounded-2xl

                border
                border-stone-200
                dark:border-stone-800

                bg-white
                dark:bg-stone-900

                p-5

                transition-all
                duration-300

                hover:-translate-y-1
                hover:border-emerald-200
                hover:shadow-xl
                hover:shadow-stone-900/5

                dark:hover:border-emerald-900

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-emerald-500

                sm:p-6
              "
            >
              <div
                aria-hidden="true"
                className="
                  absolute
                  -right-10
                  -top-10

                  h-28
                  w-28

                  rounded-full

                  bg-emerald-50
                  dark:bg-emerald-950/30

                  transition-transform
                  duration-300

                  group-hover:scale-125
                "
              />

              <div className="relative z-10">
                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center

                    rounded-2xl

                    bg-emerald-100
                    dark:bg-emerald-950

                    text-emerald-700
                    dark:text-emerald-400

                    transition-transform

                    group-hover:scale-105
                  "
                >
                  <Icon
                    size={22}
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
                  {title}
                </h3>

                <p
                  className="
                    mt-1

                    text-sm

                    text-stone-500
                    dark:text-stone-400
                  "
                >
                  {description}
                </p>

                <div
                  className="
                    mt-5

                    flex
                    items-center
                    gap-2

                    text-xs
                    font-bold

                    text-emerald-700
                    dark:text-emerald-400
                  "
                >
                  Shop Now

                  <ArrowRight
                    size={15}
                    aria-hidden="true"
                    className="
                      transition-transform
                      group-hover:translate-x-1
                    "
                  />
                </div>
              </div>
            </Link>
          )
        )}
      </div>
    </section>
  );
};

export default CategorySection;