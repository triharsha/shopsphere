import {
  ImageOff,
} from "lucide-react";

import {
  useState,
} from "react";

const ProductGallery = ({
  product,
}) => {
  /* ========================================
     Product Images

     Use product.images as the gallery.

     Thumbnail is only used as a fallback
     when product.images is unavailable.
  ======================================== */

  const productImages =
    Array.isArray(
      product?.images
    ) &&
    product.images.length > 0
      ? [
          ...new Set(
            product.images.filter(
              Boolean
            )
          ),
        ]
      : product?.thumbnail
        ? [
            product.thumbnail,
          ]
        : [];

  /* ========================================
     Selected Image
  ======================================== */

  const [
    selectedImage,
    setSelectedImage,
  ] = useState(null);

  const [
    failedImage,
    setFailedImage,
  ] = useState(null);

  /*
   * Keep the user's selected thumbnail only
   * while it belongs to the current product.
   * When the route changes to another product,
   * the first image becomes active automatically.
   */
  const activeImage =
    selectedImage &&
    productImages.includes(
      selectedImage
    )
      ? selectedImage
      : productImages[0] ||
        null;

  const imageError =
    Boolean(
      activeImage &&
        failedImage ===
          activeImage
    );

  /* ========================================
     Discount
  ======================================== */

  const discount =
    Math.round(
      Number(
        product?.discountPercentage ||
          0
      )
    );

  /* ========================================
     Select Image
  ======================================== */

  const handleSelectImage = (
    image
  ) => {
    setSelectedImage(
      image
    );

    setFailedImage(
      null
    );
  };

  /* ========================================
     Render
  ======================================== */

  return (
    <section
      className="
        overflow-hidden

        rounded-3xl

        border
        border-stone-200
        dark:border-stone-800

        bg-white
        dark:bg-stone-900

        p-4

        shadow-sm

        sm:p-5
      "
    >
      {/* =====================================
          Main Image
      ===================================== */}

      <div
        className="
          group
          relative

          flex
          aspect-square
          items-center
          justify-center

          overflow-hidden

          rounded-2xl

          bg-stone-100
          dark:bg-stone-800
        "
      >
        {/* =====================================
            Discount Badge
        ===================================== */}

        {discount > 0 && (
          <span
            className="
              absolute
              left-4
              top-4
              z-10

              rounded-full

              bg-emerald-600

              px-3
              py-1.5

              text-xs
              font-black

              text-white

              shadow-sm
            "
          >
            {discount}% OFF
          </span>
        )}

        {/* =====================================
            Product Image
        ===================================== */}

        {activeImage &&
        !imageError ? (
          <img
            src={
              activeImage
            }
            alt={
              product?.title
                ? `${product.title} product image`
                : "Product"
            }
            onError={() =>
              setFailedImage(
                activeImage
              )
            }
            className="
              h-full
              w-full

              object-contain

              p-6

              transition-transform
              duration-500
              ease-out

              group-hover:scale-105

              sm:p-9
              lg:p-12
            "
          />
        ) : (
          /* =====================================
             Image Fallback
          ===================================== */

          <div
            className="
              flex
              h-full
              w-full
              flex-col
              items-center
              justify-center
              gap-3

              px-6

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

                bg-stone-200
                dark:bg-stone-700

                text-stone-500
                dark:text-stone-400
              "
            >
              <ImageOff
                size={24}
                aria-hidden="true"
              />
            </div>

            <p
              className="
                text-sm
                font-semibold

                text-stone-500
                dark:text-stone-400
              "
            >
              Product image
              unavailable
            </p>
          </div>
        )}

        {/* =====================================
            Bottom Gradient
        ===================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            inset-x-0
            bottom-0

            h-24

            bg-gradient-to-t
            from-black/[0.04]
            to-transparent

            dark:from-black/10
          "
        />
      </div>

      {/* =====================================
          Thumbnail Gallery
      ===================================== */}

      {productImages.length >
        1 && (
        <div
          className="
            hide-scrollbar

            mt-4

            flex
            gap-3

            overflow-x-auto

            pb-1
          "
        >
          {productImages.map(
            (
              image,
              index
            ) => {
              const isActive =
                activeImage ===
                image;

              return (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() =>
                    handleSelectImage(
                      image
                    )
                  }
                  aria-label={`View product image ${
                    index + 1
                  }`}
                  aria-pressed={
                    isActive
                  }
                  className={`
                    relative

                    flex
                    h-20
                    w-20
                    shrink-0
                    items-center
                    justify-center

                    overflow-hidden

                    rounded-xl

                    border-2

                    bg-stone-100
                    dark:bg-stone-800

                    transition-all
                    duration-200

                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-emerald-500
                    focus-visible:ring-offset-2
                    dark:focus-visible:ring-offset-stone-900

                    ${
                      isActive
                        ? `
                          border-emerald-500

                          shadow-sm
                          shadow-emerald-500/10
                        `
                        : `
                          border-transparent

                          hover:border-stone-300

                          dark:hover:border-stone-600
                        `
                    }
                  `}
                >
                  <img
                    src={
                      image
                    }
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="
                      h-full
                      w-full

                      object-contain

                      p-2
                    "
                  />

                  {/* Active Indicator */}

                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="
                        absolute
                        inset-x-2
                        bottom-1

                        h-0.5

                        rounded-full

                        bg-emerald-500
                      "
                    />
                  )}
                </button>
              );
            }
          )}
        </div>
      )}

      {/* =====================================
          Gallery Information
      ===================================== */}

      <div
        className="
          mt-4

          flex
          flex-col
          gap-2

          px-1

          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:gap-4
        "
      >
        {/* Image Count */}

        <p
          className="
            text-xs
            font-medium

            text-stone-400
            dark:text-stone-500
          "
        >
          {productImages.length >
          1
            ? `${productImages.length} product images`
            : "Product image"}
        </p>

        {/* SKU */}

        {product?.sku && (
          <p
            className="
              text-xs

              text-stone-400
              dark:text-stone-500
            "
          >
            SKU:{" "}

            <span
              className="
                font-bold

                text-stone-600
                dark:text-stone-300
              "
            >
              {
                product.sku
              }
            </span>
          </p>
        )}
      </div>
    </section>
  );
};

export default ProductGallery;