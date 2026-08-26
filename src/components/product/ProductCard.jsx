import {
  Heart,
  ImageOff,
  Scale,
  ShoppingBag,
  Star,
} from "lucide-react";

import { Link } from "react-router-dom";

/* ========================================
   Helpers
======================================== */

const INR_RATE = 83;

const formatINR = (value) => {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return "0";
  }

  return Math.round(
    amount * INR_RATE
  ).toLocaleString("en-IN");
};

const clampRating = (value) => {
  const rating = Number(value);

  if (!Number.isFinite(rating)) {
    return 0;
  }

  return Math.min(
    5,
    Math.max(0, rating)
  );
};

const formatCategory = (category) => {
  if (!category) {
    return "Featured";
  }

  return category
    .replaceAll("-", " ")
    .replace(
      /\b\w/g,
      (letter) =>
        letter.toUpperCase()
    );
};

/* ========================================
   Product Card
======================================== */

const ProductCard = ({
  product,
  onAddToCart,
  onToggleWishlist,
  onToggleCompare,
  isWishlisted = false,
  isCompared = false,
}) => {
  if (!product) {
    return null;
  }

  const {
    id,
    title,
    brand,
    category,
    price = 0,
    discountPercentage = 0,
    rating = 0,
    stock = 0,
    thumbnail,
    reviews,
  } = product;

  /* ========================================
     Safe Values
  ======================================== */

  const safePrice = Math.max(
    0,
    Number(price) || 0
  );

  const safeDiscount = Math.min(
    100,
    Math.max(
      0,
      Number(
        discountPercentage
      ) || 0
    )
  );

  const safeStock = Math.max(
    0,
    Number(stock) || 0
  );

  const safeRating =
    clampRating(rating);

  const discount = Math.round(
    safeDiscount
  );

  const isOutOfStock =
    safeStock <= 0;

  const isLowStock =
    safeStock > 0 &&
    safeStock <= 10;

  /* ========================================
     Price Calculation
  ======================================== */

  const originalPrice =
    safeDiscount > 0 &&
    safeDiscount < 100
      ? safePrice /
        (1 -
          safeDiscount / 100)
      : safePrice;

  const formattedPrice =
    formatINR(safePrice);

  const formattedOriginalPrice =
    formatINR(originalPrice);

  /* ========================================
     Product Metadata
  ======================================== */

  const productTitle = String(
    title || "Untitled Product"
  );

  const productBrand =
    brand ||
    category ||
    "ShopSphere";

  const categoryLabel =
    formatCategory(category);

  const reviewCount =
    Array.isArray(reviews)
      ? reviews.length
      : 0;

  /* ========================================
     Actions
  ======================================== */

  const handleAddToCart = (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (isOutOfStock) {
      return;
    }

    onAddToCart?.(product);
  };

  const handleWishlist = (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();

    onToggleWishlist?.(
      product
    );
  };

  const handleCompare = (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();

    onToggleCompare?.(
      product
    );
  };

  return (
    <article
      className="
        group
        relative

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

        transition-all
        duration-300

        hover:-translate-y-1
        hover:border-stone-300
        hover:shadow-xl
        hover:shadow-stone-900/5

        dark:hover:border-stone-700
        dark:hover:shadow-black/20
      "
    >
      {/* =====================================
          Product Image
      ===================================== */}

      <Link
        to={`/product/${id}`}
        aria-label={`View ${productTitle}`}
        className="
          relative
          block
          overflow-hidden

          bg-stone-100
          dark:bg-stone-800/70

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-inset
          focus-visible:ring-emerald-500
        "
      >
        <div
          className="
            aspect-[4/4.3]
            overflow-hidden
          "
        >
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={productTitle}
              loading="lazy"
              className="
                h-full
                w-full

                object-contain
                p-5

                transition-transform
                duration-500
                ease-out

                group-hover:scale-105
              "
            />
          ) : (
            <div
              className="
                flex
                h-full
                flex-col
                items-center
                justify-center
                gap-2

                px-5

                text-center
              "
            >
              <ImageOff
                size={25}
                aria-hidden="true"
                className="
                  text-stone-300
                  dark:text-stone-600
                "
              />

              <span
                className="
                  text-xs
                  font-medium

                  text-stone-400
                  dark:text-stone-500
                "
              >
                Image unavailable
              </span>
            </div>
          )}
        </div>

        {/* Discount */}

        {discount > 0 && (
          <span
            className="
              absolute
              left-3
              top-3

              rounded-lg

              bg-amber-400

              px-2.5
              py-1.5

              text-[11px]
              font-black

              text-stone-900

              shadow-sm
            "
          >
            {discount}% OFF
          </span>
        )}

        {/* Stock Status */}

        {isLowStock && (
          <span
            className="
              absolute
              bottom-3
              left-3

              rounded-lg

              bg-white/95
              dark:bg-stone-900/95

              px-2.5
              py-1.5

              text-[10px]
              font-bold

              text-rose-600
              dark:text-rose-400

              shadow-sm
              backdrop-blur-sm
            "
          >
            Only {safeStock}{" "}
            {safeStock === 1
              ? "unit"
              : "units"}{" "}
            left
          </span>
        )}

        {isOutOfStock && (
          <span
            className="
              absolute
              bottom-3
              left-3

              rounded-lg

              bg-stone-900/90
              dark:bg-white/90

              px-2.5
              py-1.5

              text-[10px]
              font-black
              uppercase
              tracking-wide

              text-white
              dark:text-stone-900

              shadow-sm
              backdrop-blur-sm
            "
          >
            Out of Stock
          </span>
        )}

        {/* Wishlist + Compare */}

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
          <button
            type="button"
            onClick={
              handleWishlist
            }
            aria-label={
              isWishlisted
                ? "Remove from wishlist"
                : "Add to wishlist"
            }
            aria-pressed={
              isWishlisted
            }
            className={`
              flex
              h-9
              w-9
              items-center
              justify-center

              rounded-xl

              border
              border-white/60
              dark:border-stone-700

              bg-white/90
              dark:bg-stone-900/90

              shadow-sm
              backdrop-blur-sm

              transition-all
              duration-200

              hover:scale-105

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-rose-500

              ${
                isWishlisted
                  ? `
                    text-rose-600
                    dark:text-rose-400
                  `
                  : `
                    text-stone-500
                    dark:text-stone-300

                    hover:text-rose-600
                    dark:hover:text-rose-400
                  `
              }
            `}
          >
            <Heart
              size={17}
              fill={
                isWishlisted
                  ? "currentColor"
                  : "none"
              }
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            onClick={
              handleCompare
            }
            aria-label={
              isCompared
                ? "Remove from comparison"
                : "Add to comparison"
            }
            aria-pressed={
              isCompared
            }
            className={`
              flex
              h-9
              w-9
              items-center
              justify-center

              rounded-xl

              border
              border-white/60
              dark:border-stone-700

              bg-white/90
              dark:bg-stone-900/90

              shadow-sm
              backdrop-blur-sm

              transition-all
              duration-200

              hover:scale-105

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-emerald-500

              ${
                isCompared
                  ? `
                    text-emerald-700
                    dark:text-emerald-400
                  `
                  : `
                    text-stone-500
                    dark:text-stone-300

                    hover:text-emerald-700
                    dark:hover:text-emerald-400
                  `
              }
            `}
          >
            <Scale
              size={17}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Desktop Quick Action */}

        <div
          className="
            pointer-events-none

            absolute
            inset-x-4
            bottom-4

            hidden

            translate-y-3
            opacity-0

            transition-all
            duration-300

            group-hover:translate-y-0
            group-hover:opacity-100

            group-focus-within:translate-y-0
            group-focus-within:opacity-100

            md:block
          "
        >
          <button
            type="button"
            onClick={
              handleAddToCart
            }
            disabled={
              isOutOfStock
            }
            className="
              pointer-events-auto

              flex
              w-full
              items-center
              justify-center
              gap-2

              rounded-xl

              bg-stone-900
              dark:bg-white

              px-4
              py-3

              text-sm
              font-bold

              text-white
              dark:text-stone-900

              shadow-xl

              transition-all

              hover:bg-emerald-600
              hover:text-white

              dark:hover:bg-emerald-600
              dark:hover:text-white

              active:scale-[0.98]

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-emerald-500

              disabled:cursor-not-allowed
              disabled:bg-stone-300
              disabled:text-stone-500

              dark:disabled:bg-stone-700
              dark:disabled:text-stone-400
            "
          >
            <ShoppingBag
              size={17}
              aria-hidden="true"
            />

            {isOutOfStock
              ? "Out of Stock"
              : "Add to Cart"}
          </button>
        </div>
      </Link>

      {/* =====================================
          Product Information
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
          <p
            title={String(
              productBrand
            )}
            className="
              min-w-0
              truncate

              text-[11px]
              font-bold
              uppercase
              tracking-[0.1em]

              text-emerald-700
              dark:text-emerald-400
            "
          >
            {productBrand}
          </p>

          <span
            title={
              categoryLabel
            }
            className="
              min-w-0
              truncate

              text-[10px]
              font-medium

              text-stone-400
              dark:text-stone-400
            "
          >
            {categoryLabel}
          </span>
        </div>

        {/* Title */}

        <Link
          to={`/product/${id}`}
          className="
            mt-2

            line-clamp-2
            min-h-[2.75rem]

            rounded

            text-sm
            font-bold
            leading-5

            text-stone-900
            dark:text-white

            transition-colors

            hover:text-emerald-700
            dark:hover:text-emerald-400

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-emerald-500

            sm:text-[15px]
          "
        >
          {productTitle}
        </Link>

        {/* Rating */}

        <div
          className="
            mt-3

            flex
            flex-wrap
            items-center
            gap-x-2
            gap-y-1
          "
        >
          <div
            className="
              flex
              items-center
              gap-1
            "
            aria-label={`${safeRating.toFixed(
              1
            )} out of 5 stars`}
          >
            <Star
              size={14}
              fill="currentColor"
              aria-hidden="true"
              className="
                text-amber-400
              "
            />

            <span
              className="
                text-xs
                font-bold

                text-stone-700
                dark:text-stone-200
              "
            >
              {safeRating.toFixed(
                1
              )}
            </span>
          </div>

          {reviewCount > 0 && (
            <span
              className="
                text-[11px]

                text-stone-400
                dark:text-stone-400
              "
            >
              {reviewCount}{" "}
              {reviewCount === 1
                ? "review"
                : "reviews"}
            </span>
          )}
        </div>

        {/* Price */}

        <div
          className="
            mt-auto
            pt-4
          "
        >
          <div
            className="
              flex
              flex-wrap
              items-baseline
              gap-x-2
              gap-y-1
            "
          >
            <span
              className="
                text-lg
                font-black

                text-stone-900
                dark:text-white
              "
            >
              ₹{formattedPrice}
            </span>

            {discount > 0 && (
              <span
                className="
                  text-xs

                  text-stone-400
                  dark:text-stone-500

                  line-through
                "
              >
                ₹
                {
                  formattedOriginalPrice
                }
              </span>
            )}

            {discount > 0 && (
              <span
                className="
                  text-xs
                  font-bold

                  text-emerald-600
                  dark:text-emerald-400
                "
              >
                Save {discount}%
              </span>
            )}
          </div>

          {/* Mobile Add To Cart */}

          <button
            type="button"
            onClick={
              handleAddToCart
            }
            disabled={
              isOutOfStock
            }
            className="
              mt-4

              flex
              w-full
              items-center
              justify-center
              gap-2

              rounded-xl

              bg-emerald-600

              px-4
              py-2.5

              text-sm
              font-bold
              text-white

              transition-all
              duration-200

              hover:bg-emerald-700

              active:scale-[0.98]

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-emerald-500

              disabled:cursor-not-allowed
              disabled:bg-stone-300
              disabled:text-stone-500

              dark:disabled:bg-stone-700
              dark:disabled:text-stone-400

              md:hidden
            "
          >
            <ShoppingBag
              size={16}
              aria-hidden="true"
            />

            {isOutOfStock
              ? "Out of Stock"
              : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;