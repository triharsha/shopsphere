import {
  ChevronRight,
  ImageOff,
  Scale,
  ShoppingBag,
  Star,
  Trash2,
  X,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import toast from "react-hot-toast";

import {
  USD_TO_INR,
} from "../constants/commerce";

import {
  addToCart,
} from "../features/cart/cartSlice";

import {
  clearCompare,
  removeCompareItem,
  selectCompareItems,
} from "../features/compare/compareSlice";

/* ========================================
   Compare
======================================== */

const Compare = () => {
  const dispatch =
    useDispatch();

  const items =
    useSelector(
      selectCompareItems
    );

  /* ========================================
     Currency
  ======================================== */

  const formatPrice = (
    value
  ) => {
    return new Intl.NumberFormat(
      "en-IN",
      {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }
    ).format(
      Number(value || 0)
    );
  };

  /* ========================================
     Category
  ======================================== */

  const formatCategory = (
    value
  ) => {
    if (!value) {
      return "Not specified";
    }

    return value
      .replaceAll(
        "-",
        " "
      )
      .replace(
        /\b\w/g,
        (letter) =>
          letter.toUpperCase()
      );
  };

  /* ========================================
     Remove
  ======================================== */

  const handleRemove = (
    product
  ) => {
    dispatch(
      removeCompareItem(
        product.id
      )
    );

    toast.success(
      `${
        product.title ||
        "Product"
      } removed from comparison`
    );
  };

  /* ========================================
     Clear Compare
  ======================================== */

  const handleClear =
    () => {
      if (
        items.length === 0
      ) {
        return;
      }

      dispatch(
        clearCompare()
      );

      toast.success(
        "Comparison cleared"
      );
    };

  /* ========================================
     Add To Cart
  ======================================== */

  const handleAddToCart = (
    product
  ) => {
    const stock =
      Number(
        product.stock || 0
      );

    if (
      stock <= 0
    ) {
      toast.error(
        "This product is out of stock"
      );

      return;
    }

    dispatch(
      addToCart({
        product,
        quantity: 1,
      })
    );

    toast.success(
      `${
        product.title ||
        "Product"
      } added to cart`
    );
  };

  /* ========================================
     Specifications
  ======================================== */

  const specifications = [
    {
      label: "Brand",

      render: (
        product
      ) =>
        product.brand ||
        "Not specified",
    },

    {
      label: "Category",

      render: (
        product
      ) =>
        formatCategory(
          product.category
        ),
    },

    {
      label: "Rating",

      render: (
        product
      ) =>
        `${Number(
          product.rating || 0
        ).toFixed(
          1
        )} / 5`,
    },

    {
      label: "Stock",

      render: (
        product
      ) => {
        const stock =
          Number(
            product.stock || 0
          );

        return stock > 0
          ? `${stock} available`
          : "Out of stock";
      },
    },

    {
      label: "SKU",

      render: (
        product
      ) =>
        product.sku ||
        "Not specified",
    },

    {
      label: "Weight",

      render: (
        product
      ) =>
        product.weight ??
        "Not specified",
    },

    {
      label: "Dimensions",

      render: (
        product
      ) => {
        const dimensions =
          product.dimensions;

        if (!dimensions) {
          return "Not specified";
        }

        return `${dimensions.width ?? "-"} × ${
          dimensions.height ?? "-"
        } × ${
          dimensions.depth ?? "-"
        }`;
      },
    },

    {
      label: "Warranty",

      render: (
        product
      ) =>
        product.warrantyInformation ||
        "Not specified",
    },

    {
      label: "Shipping",

      render: (
        product
      ) =>
        product.shippingInformation ||
        "Not specified",
    },

    {
      label: "Return Policy",

      render: (
        product
      ) =>
        product.returnPolicy ||
        "Not specified",
    },
  ];

  return (
    <div
      className="
        container-shell

        py-8

        sm:py-10
        lg:py-12
      "
    >
      {/* =====================================
          Breadcrumb
      ===================================== */}

      <nav
        aria-label="Breadcrumb"
        className="
          flex
          items-center
          gap-2

          text-xs
          font-medium

          text-stone-500
          dark:text-stone-400
        "
      >
        <Link
          to="/"
          className="
            transition-colors

            hover:text-emerald-700
            dark:hover:text-emerald-400
          "
        >
          Home
        </Link>

        <ChevronRight
          size={14}
          aria-hidden="true"
        />

        <span
          aria-current="page"
          className="
            font-semibold

            text-stone-900
            dark:text-white
          "
        >
          Compare
        </span>
      </nav>

      {/* =====================================
          Header
      ===================================== */}

      <div
        className="
          mt-6

          flex
          flex-col
          gap-4

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
              dark:bg-emerald-950/30

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
            <Scale
              size={14}
              aria-hidden="true"
            />

            Product Comparison
          </div>

          <h1
            className="
              mt-4

              text-3xl
              font-black
              tracking-tight

              text-stone-900
              dark:text-white

              sm:text-4xl
              lg:text-5xl
            "
          >
            Compare Products
          </h1>

          <p
            className="
              mt-3

              text-sm

              text-stone-500
              dark:text-stone-400
            "
          >
            Compare up to 4
            products side by side.
          </p>

          {items.length > 0 && (
            <p
              className="
                mt-1

                text-xs

                text-stone-400
                dark:text-stone-500
              "
            >
              {items.length} of 4
              comparison slots used.
            </p>
          )}
        </div>

        {items.length > 0 && (
          <button
            type="button"
            onClick={
              handleClear
            }
            className="
              inline-flex
              w-fit
              items-center
              justify-center
              gap-2

              rounded-xl

              border
              border-rose-200
              dark:border-rose-900

              bg-white
              dark:bg-stone-900

              px-4
              py-2.5

              text-sm
              font-bold

              text-rose-600
              dark:text-rose-400

              transition-all

              hover:bg-rose-50
              dark:hover:bg-rose-950/30

              active:scale-[0.98]

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-rose-500
              focus-visible:ring-offset-2

              dark:focus-visible:ring-offset-stone-950
            "
          >
            <Trash2
              size={16}
              aria-hidden="true"
            />

            Clear Compare
          </button>
        )}
      </div>

      {/* =====================================
          Empty
      ===================================== */}

      {items.length === 0 ? (
        <div
          className="
            mt-10

            rounded-3xl

            border
            border-dashed
            border-stone-300
            dark:border-stone-700

            bg-white
            dark:bg-stone-900

            px-6
            py-16

            text-center

            sm:py-20
          "
        >
          <div
            className="
              mx-auto

              flex
              h-16
              w-16
              items-center
              justify-center

              rounded-2xl

              bg-emerald-50
              dark:bg-emerald-950/30

              text-emerald-600
              dark:text-emerald-400
            "
          >
            <Scale
              size={30}
              aria-hidden="true"
            />
          </div>

          <h2
            className="
              mt-5

              text-2xl
              font-black

              text-stone-900
              dark:text-white
            "
          >
            Nothing to compare yet
          </h2>

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
            Add products using the
            compare icon and their
            key specifications will
            appear here side by
            side.
          </p>

          <Link
            to="/shop"
            className="
              mt-6

              inline-flex
              items-center
              justify-center
              gap-2

              rounded-xl

              bg-emerald-600

              px-5
              py-3

              text-sm
              font-black

              text-white

              transition-all

              hover:bg-emerald-700

              active:scale-[0.98]

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-emerald-500
            "
          >
            <ShoppingBag
              size={16}
              aria-hidden="true"
            />

            Browse Products
          </Link>
        </div>
      ) : (
        /* =====================================
           Comparison Table
        ===================================== */

        <div
          className="
            mt-10

            overflow-x-auto

            pb-2
          "
        >
          <div
            className="
              min-w-[760px]

              overflow-hidden

              rounded-2xl

              border
              border-stone-200
              dark:border-stone-800

              bg-white
              dark:bg-stone-900

              shadow-sm
            "
          >
            {/* =================================
                Product Headers
            ================================= */}

            <div
              className="
                grid

                border-b
                border-stone-200
                dark:border-stone-800
              "
              style={{
                gridTemplateColumns:
                  `180px repeat(${items.length}, minmax(210px, 1fr))`,
              }}
            >
              {/* Label Column */}

              <div
                className="
                  flex
                  items-center

                  bg-stone-50
                  dark:bg-stone-800/40

                  p-5

                  text-sm
                  font-black

                  text-stone-900
                  dark:text-white
                "
              >
                Products
              </div>

              {/* Products */}

              {items.map(
                (product) => {
                  const stock =
                    Number(
                      product.stock ||
                        0
                    );

                  const price =
                    Number(
                      product.price ||
                        0
                    ) *
                    USD_TO_INR;

                  return (
                    <div
                      key={
                        product.id
                      }
                      className="
                        relative

                        border-l
                        border-stone-200
                        dark:border-stone-800

                        p-5
                      "
                    >
                      {/* Remove */}

                      <button
                        type="button"
                        onClick={() =>
                          handleRemove(
                            product
                          )
                        }
                        aria-label={`Remove ${
                          product.title ||
                          "product"
                        } from comparison`}
                        title="Remove from comparison"
                        className="
                          absolute
                          right-3
                          top-3
                          z-10

                          flex
                          h-8
                          w-8
                          items-center
                          justify-center

                          rounded-lg

                          bg-white/90
                          dark:bg-stone-900/90

                          text-stone-400
                          dark:text-stone-500

                          shadow-sm

                          backdrop-blur-sm

                          transition-all

                          hover:bg-rose-50
                          hover:text-rose-600

                          dark:hover:bg-rose-950/30
                          dark:hover:text-rose-400

                          focus-visible:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-rose-500
                        "
                      >
                        <X
                          size={15}
                          aria-hidden="true"
                        />
                      </button>

                      {/* Image */}

                      <Link
                        to={`/product/${product.id}`}
                        aria-label={`View ${
                          product.title ||
                          "product"
                        }`}
                        className="
                          group

                          mx-auto

                          flex
                          h-36
                          w-full
                          items-center
                          justify-center

                          overflow-hidden

                          rounded-xl

                          bg-stone-100
                          dark:bg-stone-800

                          focus-visible:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-emerald-500
                        "
                      >
                        {product.thumbnail ? (
                          <img
                            src={
                              product.thumbnail
                            }
                            alt={
                              product.title ||
                              "Product"
                            }
                            className="
                              h-full
                              w-full

                              object-contain

                              p-4

                              transition-transform
                              duration-300

                              group-hover:scale-105
                            "
                          />
                        ) : (
                          <ImageOff
                            size={24}
                            aria-hidden="true"
                            className="
                              text-stone-400
                              dark:text-stone-600
                            "
                          />
                        )}
                      </Link>

                      {/* Title */}

                      <Link
                        to={`/product/${product.id}`}
                        className="
                          mt-4
                          block

                          line-clamp-2

                          min-h-[2.5rem]

                          text-sm
                          font-black
                          leading-5

                          text-stone-900
                          dark:text-white

                          transition-colors

                          hover:text-emerald-700
                          dark:hover:text-emerald-400
                        "
                      >
                        {
                          product.title ||
                          "Product"
                        }
                      </Link>

                      {/* Rating */}

                      <div
                        className="
                          mt-3

                          flex
                          items-center
                          gap-1
                        "
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
                          {Number(
                            product.rating ||
                              0
                          ).toFixed(
                            1
                          )}
                        </span>
                      </div>

                      {/* Price */}

                      <p
                        className="
                          mt-3

                          text-xl
                          font-black

                          text-stone-900
                          dark:text-white
                        "
                      >
                        {formatPrice(
                          price
                        )}
                      </p>

                      {/* Stock Status */}

                      <p
                        className={`
                          mt-1

                          text-[11px]
                          font-semibold

                          ${
                            stock > 0
                              ? `
                                text-emerald-700
                                dark:text-emerald-400
                              `
                              : `
                                text-rose-600
                                dark:text-rose-400
                              `
                          }
                        `}
                      >
                        {stock > 0
                          ? `${stock} in stock`
                          : "Out of stock"}
                      </p>

                      {/* Cart */}

                      <button
                        type="button"
                        onClick={() =>
                          handleAddToCart(
                            product
                          )
                        }
                        disabled={
                          stock <= 0
                        }
                        className="
                          mt-4

                          inline-flex
                          w-full
                          items-center
                          justify-center
                          gap-2

                          rounded-xl

                          bg-emerald-600

                          px-4
                          py-2.5

                          text-xs
                          font-black

                          text-white

                          transition-all

                          hover:bg-emerald-700

                          active:scale-[0.98]

                          disabled:cursor-not-allowed
                          disabled:bg-stone-300
                          disabled:text-stone-500

                          dark:disabled:bg-stone-700
                          dark:disabled:text-stone-400
                        "
                      >
                        <ShoppingBag
                          size={15}
                          aria-hidden="true"
                        />

                        {stock > 0
                          ? "Add to Cart"
                          : "Out of Stock"}
                      </button>
                    </div>
                  );
                }
              )}
            </div>

            {/* =================================
                Specifications
            ================================= */}

            {specifications.map(
              (
                {
                  label,
                  render,
                },
                rowIndex
              ) => (
                <div
                  key={
                    label
                  }
                  className={`
                    grid

                    border-b
                    border-stone-200
                    dark:border-stone-800

                    last:border-b-0

                    ${
                      rowIndex %
                        2 ===
                      1
                        ? `
                          bg-stone-50/40
                          dark:bg-stone-800/20
                        `
                        : ""
                    }
                  `}
                  style={{
                    gridTemplateColumns:
                      `180px repeat(${items.length}, minmax(210px, 1fr))`,
                  }}
                >
                  {/* Label */}

                  <div
                    className="
                      bg-stone-50
                      dark:bg-stone-800/40

                      p-4

                      text-xs
                      font-black

                      text-stone-700
                      dark:text-stone-200
                    "
                  >
                    {label}
                  </div>

                  {/* Values */}

                  {items.map(
                    (product) => (
                      <div
                        key={
                          product.id
                        }
                        className="
                          break-words

                          border-l
                          border-stone-200
                          dark:border-stone-800

                          p-4

                          text-xs
                          leading-5

                          text-stone-600
                          dark:text-stone-300
                        "
                      >
                        {render(
                          product
                        )}
                      </div>
                    )
                  )}
                </div>
              )
            )}
          </div>

          {/* Mobile Hint */}

          <p
            className="
              mt-3

              text-center

              text-[11px]

              text-stone-400
              dark:text-stone-500

              sm:hidden
            "
          >
            Swipe horizontally to
            compare all products.
          </p>
        </div>
      )}
    </div>
  );
};

export default Compare;