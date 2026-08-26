const ProductCardSkeleton = () => {
  return (
    <div
      className="
        flex
        h-full
        flex-col

        overflow-hidden

        rounded-2xl

        border
        border-stone-200
        dark:border-stone-800

        bg-white
        dark:bg-stone-900

        shadow-sm
      "
      aria-hidden="true"
    >
      {/* =====================================
          Image Area
      ===================================== */}

      <div
        className="
          relative

          overflow-hidden

          bg-stone-100
          dark:bg-stone-800/70
        "
      >
        <div
          className="
            skeleton

            aspect-[4/4.3]
            w-full
          "
        />

        {/* Discount Badge Skeleton */}

        <div
          className="
            skeleton

            absolute
            left-3
            top-3

            h-6
            w-16

            rounded-lg
          "
        />

        {/* Wishlist / Compare Skeleton */}

        <div
          className="
            absolute
            right-3
            top-3

            flex
            flex-col
            gap-2
          "
        >
          <div
            className="
              skeleton

              h-9
              w-9

              rounded-xl
            "
          />

          <div
            className="
              skeleton

              h-9
              w-9

              rounded-xl
            "
          />
        </div>
      </div>

      {/* =====================================
          Product Content
      ===================================== */}

      <div
        className="
          flex
          flex-1
          flex-col

          p-4
        "
      >
        {/* Brand / Category */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-3
          "
        >
          <div
            className="
              skeleton

              h-3
              w-20

              rounded-full
            "
          />

          <div
            className="
              skeleton

              h-3
              w-14

              rounded-full
            "
          />
        </div>

        {/* Title */}

        <div
          className="
            skeleton

            mt-3

            h-4
            w-11/12

            rounded-full
          "
        />

        <div
          className="
            skeleton

            mt-2

            h-4
            w-3/4

            rounded-full
          "
        />

        {/* Rating */}

        <div
          className="
            mt-4

            flex
            items-center
            gap-2
          "
        >
          <div
            className="
              skeleton

              h-3
              w-14

              rounded-full
            "
          />

          <div
            className="
              skeleton

              h-3
              w-12

              rounded-full
            "
          />
        </div>

        {/* Price */}

        <div
          className="
            mt-auto
            pt-5
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <div
              className="
                skeleton

                h-5
                w-24

                rounded-full
              "
            />

            <div
              className="
                skeleton

                h-3
                w-16

                rounded-full
              "
            />

            <div
              className="
                skeleton

                h-3
                w-14

                rounded-full
              "
            />
          </div>

          {/* Mobile Add to Cart */}

          <div
            className="
              skeleton

              mt-4

              h-10
              w-full

              rounded-xl

              md:hidden
            "
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;