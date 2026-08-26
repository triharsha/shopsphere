import {
  Check,
  GitCompareArrows,
  Heart,
  Minus,
  PackageCheck,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
  Zap,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  addToCart,
} from "../../features/cart/cartSlice";

import {
  selectIsWishlisted,
  toggleWishlist,
} from "../../features/wishlist/wishlistSlice";

import {
  selectIsAuthenticated,
} from "../../features/auth/authSlice";

import {
  selectCompareCount,
  selectIsCompared,
  toggleCompareItem,
} from "../../features/compare/compareSlice";

import {
  MAX_CART_QUANTITY,
  MAX_COMPARE_ITEMS,
  USD_TO_INR,
} from "../../constants/commerce";

/* ========================================
   Product Purchase Panel
======================================== */

const ProductPurchasePanel = ({
  product,
}) => {
  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const [
    quantityState,
    setQuantityState,
  ] = useState({
    productId:
      product?.id,
    value: 1,
  });

  const quantity =
    String(
      quantityState.productId
    ) ===
    String(
      product?.id
    )
      ? quantityState.value
      : 1;

  const setQuantity = (
    nextValue
  ) => {
    setQuantityState(
      (currentState) => {
        const currentValue =
          String(
            currentState.productId
          ) ===
          String(
            product?.id
          )
            ? currentState.value
            : 1;

        const resolvedValue =
          typeof nextValue ===
          "function"
            ? nextValue(
                currentValue
              )
            : nextValue;

        return {
          productId:
            product?.id,
          value:
            resolvedValue,
        };
      }
    );
  };

  /* ========================================
     Redux
  ======================================== */

  const isAuthenticated =
    useSelector(
      selectIsAuthenticated
    );

  const isWishlisted =
    useSelector(
      selectIsWishlisted(
        product?.id
      )
    );

  const isCompared =
    useSelector(
      selectIsCompared(
        product?.id
      )
    );

  const compareCount =
    useSelector(
      selectCompareCount
    );

  /* ========================================
     Product Values
  ======================================== */

  const price =
    Number(
      product?.price || 0
    ) * USD_TO_INR;

  const discount =
    Number(
      product?.discountPercentage ||
        0
    );

  const originalPrice =
    discount > 0 &&
    discount < 100
      ? price /
        (1 -
          discount / 100)
      : price;

  const rating =
    Number(
      product?.rating || 0
    );

  const stock =
    Number(
      product?.stock || 0
    );

  const reviewCount =
    Array.isArray(
      product?.reviews
    )
      ? product.reviews.length
      : 0;

  const isInStock =
    stock > 0;

  const maxQuantity =
    isInStock
      ? Math.min(
          stock,
          MAX_CART_QUANTITY
        )
      : 0;

  /* ========================================
     Currency
  ======================================== */

  const formatPrice = (
    value
  ) =>
    new Intl.NumberFormat(
      "en-IN",
      {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }
    ).format(value);

  /* ========================================
     Stock Status
  ======================================== */

  const getStockStatus = () => {
    if (!isInStock) {
      return {
        label:
          "Out of Stock",

        message:
          "This product is currently unavailable.",

        variant:
          "out",
      };
    }

    if (stock <= 5) {
      return {
        label:
          "Low Stock",

        message: `Only ${stock} ${
          stock === 1
            ? "unit"
            : "units"
        } left — order soon.`,

        variant:
          "critical",
      };
    }

    if (stock <= 10) {
      return {
        label:
          "In Stock",

        message: `Only ${stock} units currently available.`,

        variant:
          "low",
      };
    }

    return {
      label:
        "In Stock",

      message:
        "Ready to ship.",

      variant:
        "available",
    };
  };

  const stockStatus =
    getStockStatus();

  /* ========================================
     Quantity
  ======================================== */

  const decreaseQuantity =
    () => {
      setQuantity(
        (current) =>
          Math.max(
            1,
            current - 1
          )
      );
    };

  const increaseQuantity =
    () => {
      setQuantity(
        (current) =>
          Math.min(
            maxQuantity,
            current + 1
          )
      );
    };

  /* ========================================
     Add To Cart
  ======================================== */

  const handleAddToCart =
    () => {
      if (
        !product?.id ||
        !isInStock
      ) {
        return;
      }

      dispatch(
        addToCart({
          product,
          quantity,
        })
      );

      toast.success(
        `${quantity} ${
          quantity === 1
            ? "item"
            : "items"
        } added to cart`
      );
    };

  /* ========================================
     Buy Now
  ======================================== */

  const handleBuyNow =
    () => {
      if (
        !product?.id ||
        !isInStock
      ) {
        return;
      }

      if (
        !isAuthenticated
      ) {
        toast.error(
          "Please sign in to continue"
        );

        navigate(
          "/login",
          {
            state: {
              from:
                `/product/${product.id}`,
            },
          }
        );

        return;
      }

      navigate(
        "/checkout",
        {
          state: {
            buyNow: true,

            item: {
              product,
              quantity,
            },
          },
        }
      );
    };

  /* ========================================
     Wishlist
  ======================================== */

  const handleWishlist =
    () => {
      if (
        !product?.id
      ) {
        return;
      }

      if (
        !isAuthenticated
      ) {
        toast.error(
          "Please sign in to use your wishlist"
        );

        navigate(
          "/login",
          {
            state: {
              from:
                `/product/${product.id}`,
            },
          }
        );

        return;
      }

      dispatch(
        toggleWishlist(
          product
        )
      );

      toast.success(
        isWishlisted
          ? `${product.title} removed from wishlist`
          : `${product.title} added to wishlist`
      );
    };

  /* ========================================
     Compare
  ======================================== */

  const handleCompare =
    () => {
      if (
        !product?.id
      ) {
        return;
      }

      if (
        !isCompared &&
        compareCount >=
          MAX_COMPARE_ITEMS
      ) {
        toast.error(
          `You can compare up to ${MAX_COMPARE_ITEMS} products`
        );

        return;
      }

      dispatch(
        toggleCompareItem(
          product
        )
      );

      toast.success(
        isCompared
          ? `${product.title} removed from compare`
          : `${product.title} added to compare`
      );
    };

  /* ========================================
     Shared Focus Style
  ======================================== */

  const focusClass = `
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-emerald-500
    focus-visible:ring-offset-2

    dark:focus-visible:ring-offset-stone-950
  `;

  /* ========================================
     Render
  ======================================== */

  return (
    <div
      className="
        mt-7

        space-y-6
      "
    >
      {/* =====================================
          Rating / Reviews / Availability
      ===================================== */}

      <div
        className="
          flex
          flex-wrap
          items-center
          gap-x-3
          gap-y-2
        "
      >
        {/* Rating */}

        <div
          className="
            inline-flex
            items-center
            gap-1.5

            rounded-full

            bg-amber-50
            dark:bg-amber-950/30

            px-3
            py-1.5
          "
        >
          <Star
            size={15}
            fill="currentColor"
            aria-hidden="true"
            className="
              text-amber-400
            "
          />

          <span
            className="
              text-sm
              font-black

              text-stone-900
              dark:text-white
            "
          >
            {rating.toFixed(
              1
            )}
          </span>
        </div>

        {/* Reviews */}

        <span
          className="
            text-sm

            text-stone-500
            dark:text-stone-400
          "
        >
          {reviewCount > 0
            ? `${reviewCount} ${
                reviewCount === 1
                  ? "review"
                  : "reviews"
              }`
            : "No reviews yet"}
        </span>

        <span
          aria-hidden="true"
          className="
            hidden
            h-4
            w-px

            bg-stone-200
            dark:bg-stone-700

            sm:block
          "
        />

        {/* Stock */}

        {isInStock ? (
          <span
            className="
              inline-flex
              items-center
              gap-1.5

              text-sm
              font-bold

              text-emerald-700
              dark:text-emerald-400
            "
          >
            <Check
              size={15}
              aria-hidden="true"
            />

            {
              stockStatus.label
            }
          </span>
        ) : (
          <span
            className="
              text-sm
              font-bold

              text-rose-600
              dark:text-rose-400
            "
          >
            Out of Stock
          </span>
        )}
      </div>

      {/* =====================================
          Price
      ===================================== */}

      <div>
        <div
          className="
            flex
            flex-wrap
            items-end
            gap-x-3
            gap-y-2
          "
        >
          <span
            className="
              text-3xl
              font-black
              tracking-tight

              text-stone-900
              dark:text-white

              sm:text-4xl
            "
          >
            {formatPrice(
              price
            )}
          </span>

          {discount > 0 && (
            <span
              className="
                pb-1

                text-base

                text-stone-400
                dark:text-stone-500

                line-through
              "
            >
              {formatPrice(
                originalPrice
              )}
            </span>
          )}

          {discount > 0 && (
            <span
              className="
                mb-1

                rounded-lg

                bg-emerald-50
                dark:bg-emerald-950/40

                px-2.5
                py-1

                text-xs
                font-black

                text-emerald-700
                dark:text-emerald-400
              "
            >
              {Math.round(
                discount
              )}
              % OFF
            </span>
          )}
        </div>

        <p
          className="
            mt-2

            text-xs

            text-stone-400
            dark:text-stone-500
          "
        >
          Inclusive of all taxes
        </p>
      </div>

      {/* =====================================
          Stock Message
      ===================================== */}

      <div
        className={`
          flex
          items-start
          gap-3

          rounded-xl

          border

          px-4
          py-3

          ${
            stockStatus.variant ===
            "out"
              ? `
                border-rose-200
                dark:border-rose-900/50

                bg-rose-50
                dark:bg-rose-950/20
              `
              : stockStatus.variant ===
                  "critical"
                ? `
                  border-amber-200
                  dark:border-amber-900/50

                  bg-amber-50
                  dark:bg-amber-950/20
                `
                : `
                  border-stone-200
                  dark:border-stone-800

                  bg-stone-50
                  dark:bg-stone-800/60
                `
          }
        `}
      >
        <PackageCheck
          size={18}
          aria-hidden="true"
          className={`
            mt-0.5
            shrink-0

            ${
              stockStatus.variant ===
              "out"
                ? `
                  text-rose-600
                  dark:text-rose-400
                `
                : stockStatus.variant ===
                    "critical"
                  ? `
                    text-amber-600
                    dark:text-amber-400
                  `
                  : `
                    text-emerald-700
                    dark:text-emerald-400
                  `
            }
          `}
        />

        <div>
          <p
            className={`
              text-xs
              font-black

              ${
                stockStatus.variant ===
                "out"
                  ? `
                    text-rose-700
                    dark:text-rose-400
                  `
                  : stockStatus.variant ===
                      "critical"
                    ? `
                      text-amber-700
                      dark:text-amber-400
                    `
                    : `
                      text-stone-800
                      dark:text-stone-200
                    `
              }
            `}
          >
            {
              stockStatus.label
            }
          </p>

          <p
            className="
              mt-1

              text-xs
              leading-5

              text-stone-500
              dark:text-stone-400
            "
          >
            {
              stockStatus.message
            }
          </p>
        </div>
      </div>

      {/* =====================================
          Quantity
      ===================================== */}

      {isInStock && (
        <div>
          <div
            className="
              mb-3

              flex
              flex-wrap
              items-center
              gap-x-3
              gap-y-1
            "
          >
            <p
              className="
                text-sm
                font-bold

                text-stone-900
                dark:text-white
              "
            >
              Quantity
            </p>

            {stock >
              MAX_CART_QUANTITY && (
              <span
                className="
                  text-[11px]

                  text-stone-400
                  dark:text-stone-500
                "
              >
                Max{" "}
                {
                  MAX_CART_QUANTITY
                }{" "}
                per order
              </span>
            )}
          </div>

          <div
            className="
              inline-flex
              items-center

              overflow-hidden

              rounded-xl

              border
              border-stone-200
              dark:border-stone-700

              bg-white
              dark:bg-stone-900
            "
          >
            {/* Minus */}

            <button
              type="button"
              onClick={
                decreaseQuantity
              }
              disabled={
                quantity <= 1
              }
              aria-label="Decrease quantity"
              className={`
                flex
                h-11
                w-11
                items-center
                justify-center

                text-stone-600
                dark:text-stone-300

                transition-colors

                hover:bg-stone-100
                hover:text-emerald-700

                dark:hover:bg-stone-800
                dark:hover:text-emerald-400

                disabled:cursor-not-allowed
                disabled:opacity-30

                ${focusClass}
              `}
            >
              <Minus
                size={16}
                aria-hidden="true"
              />
            </button>

            {/* Quantity */}

            <span
              aria-live="polite"
              className="
                flex
                h-11
                min-w-12
                items-center
                justify-center

                border-x
                border-stone-200
                dark:border-stone-700

                px-3

                text-sm
                font-black

                text-stone-900
                dark:text-white
              "
            >
              {quantity}
            </span>

            {/* Plus */}

            <button
              type="button"
              onClick={
                increaseQuantity
              }
              disabled={
                quantity >=
                maxQuantity
              }
              aria-label="Increase quantity"
              className={`
                flex
                h-11
                w-11
                items-center
                justify-center

                text-stone-600
                dark:text-stone-300

                transition-colors

                hover:bg-stone-100
                hover:text-emerald-700

                dark:hover:bg-stone-800
                dark:hover:text-emerald-400

                disabled:cursor-not-allowed
                disabled:opacity-30

                ${focusClass}
              `}
            >
              <Plus
                size={16}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      )}

      {/* =====================================
          Main Purchase Actions
      ===================================== */}

      <div
        className="
          grid
          gap-3

          sm:grid-cols-2
        "
      >
        {/* Add To Cart */}

        <button
          type="button"
          onClick={
            handleAddToCart
          }
          disabled={
            !isInStock
          }
          className={`
            inline-flex
            items-center
            justify-center
            gap-2

            rounded-xl

            bg-emerald-600

            px-5
            py-3.5

            text-sm
            font-black

            text-white

            shadow-lg
            shadow-emerald-600/15

            transition-all
            duration-200

            hover:bg-emerald-700
            hover:shadow-xl

            active:scale-[0.98]

            disabled:cursor-not-allowed
            disabled:shadow-none
            disabled:opacity-50

            ${focusClass}
          `}
        >
          <ShoppingCart
            size={18}
            aria-hidden="true"
          />

          {isInStock
            ? "Add to Cart"
            : "Out of Stock"}
        </button>
{/* Buy Now */}

<button
  type="button"
  onClick={
    handleBuyNow
  }
  disabled={
    !isInStock
  }
  className={`
    inline-flex
    items-center
    justify-center
    gap-2

    rounded-xl

    border
    border-stone-300
    dark:border-stone-700

    bg-white
    dark:bg-stone-900

    px-5
    py-3.5

    text-sm
    font-black

    text-stone-900
    dark:text-stone-100

    transition-all
    duration-200

    hover:border-emerald-500
    hover:bg-emerald-50
    hover:text-emerald-700

    dark:hover:border-emerald-700
    dark:hover:bg-emerald-950/30
    dark:hover:text-emerald-400

    active:scale-[0.98]

    disabled:cursor-not-allowed
    disabled:opacity-50

    ${focusClass}
  `}
>
  <Zap
    size={18}
    aria-hidden="true"
  />

  Buy Now
</button>
        
      </div>

      {/* =====================================
          Wishlist / Compare
      ===================================== */}

      <div
        className="
          grid
          grid-cols-2
          gap-3
        "
      >
        {/* Wishlist */}

        <button
          type="button"
          onClick={
            handleWishlist
          }
          aria-pressed={
            isWishlisted
          }
          className={`
            inline-flex
            items-center
            justify-center
            gap-2

            rounded-xl

            border

            px-3
            py-3

            text-xs
            font-bold

            transition-all
            duration-200

            ${focusClass}

            ${
              isWishlisted
                ? `
                  border-rose-200
                  dark:border-rose-900

                  bg-rose-50
                  dark:bg-rose-950/30

                  text-rose-600
                  dark:text-rose-400
                `
                : `
                  border-stone-200
                  dark:border-stone-700

                  bg-white
                  dark:bg-stone-900

                  text-stone-600
                  dark:text-stone-300

                  hover:border-rose-200
                  hover:bg-rose-50
                  hover:text-rose-600

                  dark:hover:border-rose-900
                  dark:hover:bg-rose-950/20
                  dark:hover:text-rose-400
                `
            }
          `}
        >
          <Heart
            size={17}
            aria-hidden="true"
            fill={
              isWishlisted
                ? "currentColor"
                : "none"
            }
          />

          {isWishlisted
            ? "Saved"
            : "Wishlist"}
        </button>

        {/* Compare */}

        <button
          type="button"
          onClick={
            handleCompare
          }
          aria-pressed={
            isCompared
          }
          className={`
            inline-flex
            items-center
            justify-center
            gap-2

            rounded-xl

            border

            px-3
            py-3

            text-xs
            font-bold

            transition-all
            duration-200

            ${focusClass}

            ${
              isCompared
                ? `
                  border-emerald-200
                  dark:border-emerald-900

                  bg-emerald-50
                  dark:bg-emerald-950/30

                  text-emerald-700
                  dark:text-emerald-400
                `
                : `
                  border-stone-200
                  dark:border-stone-700

                  bg-white
                  dark:bg-stone-900

                  text-stone-600
                  dark:text-stone-300

                  hover:border-emerald-200
                  hover:bg-emerald-50
                  hover:text-emerald-700

                  dark:hover:border-emerald-900
                  dark:hover:bg-emerald-950/20
                  dark:hover:text-emerald-400
                `
            }
          `}
        >
          <GitCompareArrows
            size={17}
            aria-hidden="true"
          />

          {isCompared
            ? "Compared"
            : "Compare"}
        </button>
      </div>

      {/* =====================================
          Purchase Benefits
      ===================================== */}

      <div
        className="
          grid
          gap-3

          border-t
          border-stone-200
          dark:border-stone-800

          pt-6

          sm:grid-cols-3
        "
      >
        {/* Delivery */}

        <div
          className="
            flex
            items-start
            gap-3

            rounded-xl

            px-2
            py-2
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center

              rounded-lg

              bg-emerald-50
              dark:bg-emerald-950/30
            "
          >
            <Truck
              size={17}
              aria-hidden="true"
              className="
                text-emerald-700
                dark:text-emerald-400
              "
            />
          </div>

          <div>
            <p
              className="
                text-xs
                font-black

                text-stone-900
                dark:text-white
              "
            >
              Fast Delivery
            </p>

            <p
              className="
                mt-1

                text-[11px]
                leading-4

                text-stone-400
                dark:text-stone-500
              "
            >
              Quick dispatch
            </p>
          </div>
        </div>

        {/* Returns */}

        <div
          className="
            flex
            items-start
            gap-3

            rounded-xl

            px-2
            py-2
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center

              rounded-lg

              bg-emerald-50
              dark:bg-emerald-950/30
            "
          >
            <RotateCcw
              size={17}
              aria-hidden="true"
              className="
                text-emerald-700
                dark:text-emerald-400
              "
            />
          </div>

          <div>
            <p
              className="
                text-xs
                font-black

                text-stone-900
                dark:text-white
              "
            >
              Easy Returns
            </p>

            <p
              className="
                mt-1

                text-[11px]
                leading-4

                text-stone-400
                dark:text-stone-500
              "
            >
              Hassle-free
            </p>
          </div>
        </div>

        {/* Payment */}

        <div
          className="
            flex
            items-start
            gap-3

            rounded-xl

            px-2
            py-2
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center

              rounded-lg

              bg-emerald-50
              dark:bg-emerald-950/30
            "
          >
            <ShieldCheck
              size={17}
              aria-hidden="true"
              className="
                text-emerald-700
                dark:text-emerald-400
              "
            />
          </div>

          <div>
            <p
              className="
                text-xs
                font-black

                text-stone-900
                dark:text-white
              "
            >
              Secure Payment
            </p>

            <p
              className="
                mt-1

                text-[11px]
                leading-4

                text-stone-400
                dark:text-stone-500
              "
            >
              Protected checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPurchasePanel;