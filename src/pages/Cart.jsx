import {
  ArrowRight,
  ChevronRight,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";

import { Link } from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import toast from "react-hot-toast";

import {
  clearCart,
  removeFromCart,
  selectCartCount,
  selectCartItems,
  updateCartQuantity,
} from "../features/cart/cartSlice";

import {
  DELIVERY_FEE,
  FREE_DELIVERY_THRESHOLD,
  MAX_CART_QUANTITY,
  USD_TO_INR,
} from "../constants/commerce";

const Cart = () => {
  const dispatch = useDispatch();

  const items = useSelector(
    selectCartItems
  );

  const cartCount = useSelector(
    selectCartCount
  );

  /* =====================================
     Currency
  ===================================== */

  const formatPrice = (value) => {
    return new Intl.NumberFormat(
      "en-IN",
      {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }
    ).format(
      Number(value) || 0
    );
  };

  /* =====================================
     Cart Totals
  ===================================== */

  const subtotal = items.reduce(
    (total, item) => {
      const price =
        Number(
          item.product?.price || 0
        ) * USD_TO_INR;

      const quantity = Number(
        item.quantity || 0
      );

      return (
        total +
        price * quantity
      );
    },
    0
  );

  const totalSavings = items.reduce(
    (total, item) => {
      const price =
        Number(
          item.product?.price || 0
        ) * USD_TO_INR;

      const discount = Number(
        item.product
          ?.discountPercentage || 0
      );

      const quantity = Number(
        item.quantity || 0
      );

      if (
        discount <= 0 ||
        discount >= 100
      ) {
        return total;
      }

      const originalPrice =
        price /
        (1 - discount / 100);

      const savingsPerUnit =
        originalPrice - price;

      return (
        total +
        savingsPerUnit * quantity
      );
    },
    0
  );

  const deliveryFee =
    subtotal === 0 ||
    subtotal >=
      FREE_DELIVERY_THRESHOLD
      ? 0
      : DELIVERY_FEE;

  const grandTotal =
    subtotal + deliveryFee;

  const amountForFreeDelivery =
    Math.max(
      0,
      FREE_DELIVERY_THRESHOLD -
        subtotal
    );

  const deliveryProgress =
    Math.min(
      100,
      (subtotal /
        FREE_DELIVERY_THRESHOLD) *
        100
    );

  /* =====================================
     Quantity
  ===================================== */

  const getMaxQuantity = (
    product
  ) => {
    return Math.max(
      1,
      Math.min(
        Number(
          product?.stock || 1
        ),
        MAX_CART_QUANTITY
      )
    );
  };

  const handleDecrease = (
    product,
    quantity
  ) => {
    if (quantity <= 1) {
      return;
    }

    dispatch(
      updateCartQuantity({
        productId: product.id,
        quantity: quantity - 1,
      })
    );
  };

  const handleIncrease = (
    product,
    quantity
  ) => {
    const maxQuantity =
      getMaxQuantity(product);

    if (
      quantity >= maxQuantity
    ) {
      toast.error(
        `Maximum available quantity is ${maxQuantity}`
      );

      return;
    }

    dispatch(
      updateCartQuantity({
        productId: product.id,
        quantity: quantity + 1,
      })
    );
  };

  /* =====================================
     Remove
  ===================================== */

  const handleRemove = (
    product
  ) => {
    dispatch(
      removeFromCart(product.id)
    );

    toast.success(
      `${
        product.title ||
        "Product"
      } removed from cart`
    );
  };

  /* =====================================
     Clear Cart
  ===================================== */

  const handleClearCart = () => {
    if (items.length === 0) {
      return;
    }

    dispatch(clearCart());

    toast.success(
      "Cart cleared"
    );
  };

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
          className="
            font-semibold

            text-stone-900
            dark:text-white
          "
        >
          Cart
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
          gap-5

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
            <ShoppingBag
              size={14}
              aria-hidden="true"
            />

            Your Bag
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
            Shopping Cart
          </h1>

          <p
            className="
              mt-3

              text-sm

              text-stone-500
              dark:text-stone-400
            "
          >
            {cartCount}{" "}
            {cartCount === 1
              ? "item"
              : "items"}{" "}
            in your cart
          </p>
        </div>

        <div
          className="
            flex
            flex-wrap
            gap-3
          "
        >
          {items.length > 0 && (
            <button
              type="button"
              onClick={
                handleClearCart
              }
              className="
                inline-flex
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
              "
            >
              <Trash2
                size={15}
                aria-hidden="true"
              />

              Clear Cart
            </button>
          )}

          <Link
            to="/shop"
            className="
              inline-flex
              items-center
              justify-center
              gap-2

              rounded-xl

              border
              border-stone-200
              dark:border-stone-700

              bg-white
              dark:bg-stone-900

              px-4
              py-2.5

              text-sm
              font-bold

              text-stone-700
              dark:text-stone-200

              transition-all

              hover:bg-stone-50
              dark:hover:bg-stone-800

              active:scale-[0.98]
            "
          >
            Continue Shopping

            <ArrowRight
              size={15}
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>

      {/* =====================================
          Empty Cart
      ===================================== */}

      {items.length === 0 ? (
        <div
          className="
            mt-10

            flex
            min-h-[420px]
            flex-col
            items-center
            justify-center

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
          "
        >
          <div
            className="
              flex
              h-20
              w-20
              items-center
              justify-center

              rounded-3xl

              bg-stone-100
              dark:bg-stone-800

              text-stone-400
              dark:text-stone-500
            "
          >
            <ShoppingBag
              size={34}
              aria-hidden="true"
            />
          </div>

          <h2
            className="
              mt-6

              text-2xl
              font-black

              text-stone-900
              dark:text-white
            "
          >
            Your cart is empty
          </h2>

          <p
            className="
              mt-2
              max-w-md

              text-sm
              leading-6

              text-stone-500
              dark:text-stone-400
            "
          >
            Looks like you haven't
            added anything yet.
            Explore ShopSphere and
            find something you'll
            love.
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
              font-bold

              text-white

              shadow-lg
              shadow-emerald-600/15

              transition-all

              hover:bg-emerald-700
              hover:gap-3

              active:scale-[0.98]
            "
          >
            Start Shopping

            <ArrowRight
              size={16}
              aria-hidden="true"
            />
          </Link>
        </div>
      ) : (
        <div
          className="
            mt-10

            grid
            gap-8

            lg:grid-cols-[minmax(0,1fr)_370px]
          "
        >
          {/* =================================
              Left Column
          ================================= */}

          <div className="min-w-0">
            {/* ===============================
                Free Delivery Progress
            =============================== */}

            <div
              className="
                mb-5

                rounded-2xl

                border
                border-stone-200
                dark:border-stone-800

                bg-white
                dark:bg-stone-900

                p-4

                sm:p-5
              "
            >
              <div
                className="
                  flex
                  items-start
                  gap-3
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

                    bg-emerald-50
                    dark:bg-emerald-950/30

                    text-emerald-700
                    dark:text-emerald-400
                  "
                >
                  <Truck
                    size={18}
                    aria-hidden="true"
                  />
                </div>

                <div
                  className="
                    min-w-0
                    flex-1
                  "
                >
                  <div
                    className="
                      flex
                      flex-col
                      gap-1

                      sm:flex-row
                      sm:items-center
                      sm:justify-between
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
                      {deliveryFee ===
                      0
                        ? "You've unlocked free delivery"
                        : `Add ${formatPrice(
                            amountForFreeDelivery
                          )} more for free delivery`}
                    </p>

                    <span
                      className="
                        text-xs
                        font-semibold

                        text-stone-400
                        dark:text-stone-500
                      "
                    >
                      Free above{" "}
                      {formatPrice(
                        FREE_DELIVERY_THRESHOLD
                      )}
                    </span>
                  </div>

                  <div
                    className="
                      mt-3

                      h-2
                      overflow-hidden

                      rounded-full

                      bg-stone-100
                      dark:bg-stone-800
                    "
                  >
                    <div
                      className="
                        h-full

                        rounded-full

                        bg-emerald-600

                        transition-[width]
                        duration-300
                      "
                      style={{
                        width: `${deliveryProgress}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ===============================
                Cart Products
            =============================== */}

            <section
              aria-label="Cart products"
              className="
                overflow-hidden

                rounded-2xl

                border
                border-stone-200
                dark:border-stone-800

                bg-white
                dark:bg-stone-900
              "
            >
              <div
                className="
                  divide-y
                  divide-stone-200
                  dark:divide-stone-800
                "
              >
                {items.map(
                  ({
                    product,
                    quantity,
                  }) => {
                    const price =
                      Number(
                        product?.price ||
                          0
                      ) *
                      USD_TO_INR;

                    const itemTotal =
                      price *
                      Number(
                        quantity || 0
                      );

                    const discount =
                      Number(
                        product
                          ?.discountPercentage ||
                          0
                      );

                    const originalPrice =
                      discount > 0 &&
                      discount < 100
                        ? price /
                          (1 -
                            discount /
                              100)
                        : null;

                    const maxQuantity =
                      getMaxQuantity(
                        product
                      );

                    const stock =
                      Number(
                        product?.stock ||
                          0
                      );

                    return (
                      <article
                        key={product.id}
                        className="
                          grid
                          gap-5

                          p-4

                          sm:grid-cols-[130px_minmax(0,1fr)]
                          sm:p-5
                        "
                      >
                        {/* Image */}

                        <Link
                          to={`/product/${product.id}`}
                          className="
                            group

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
                          {product.thumbnail ? (
                            <img
                              src={
                                product.thumbnail
                              }
                              alt={
                                product.title ||
                                "Product"
                              }
                              loading="lazy"
                              className="
                                h-full
                                w-full

                                object-contain

                                p-3

                                transition-transform
                                duration-300

                                group-hover:scale-105
                              "
                            />
                          ) : (
                            <ShoppingBag
                              size={28}
                              className="
                                text-stone-300
                                dark:text-stone-600
                              "
                              aria-hidden="true"
                            />
                          )}
                        </Link>

                        {/* Information */}

                        <div
                          className="
                            min-w-0

                            flex
                            flex-col
                          "
                        >
                          <div
                            className="
                              flex
                              items-start
                              justify-between
                              gap-4
                            "
                          >
                            <div
                              className="
                                min-w-0
                              "
                            >
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
                                  product.category ||
                                  "ShopSphere"}
                              </p>

                              <Link
                                to={`/product/${product.id}`}
                                className="
                                  mt-1
                                  block

                                  line-clamp-2

                                  text-base
                                  font-black
                                  leading-6

                                  text-stone-900
                                  dark:text-white

                                  transition-colors

                                  hover:text-emerald-700
                                  dark:hover:text-emerald-400
                                "
                              >
                                {
                                  product.title
                                }
                              </Link>

                              {/* Price */}

                              <div
                                className="
                                  mt-3

                                  flex
                                  flex-wrap
                                  items-center
                                  gap-2
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
                                  {formatPrice(
                                    price
                                  )}
                                </span>

                                {originalPrice && (
                                  <span
                                    className="
                                      text-xs
                                      font-medium

                                      text-stone-400

                                      line-through
                                    "
                                  >
                                    {formatPrice(
                                      originalPrice
                                    )}
                                  </span>
                                )}

                                {discount >
                                  0 && (
                                  <span
                                    className="
                                      rounded-full

                                      bg-emerald-50
                                      dark:bg-emerald-950/30

                                      px-2
                                      py-1

                                      text-[10px]
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

                              {/* Stock */}

                              <p
                                className={`
                                  mt-2

                                  text-xs
                                  font-semibold

                                  ${
                                    stock <= 5
                                      ? `
                                        text-amber-600
                                        dark:text-amber-400
                                      `
                                      : `
                                        text-stone-400
                                        dark:text-stone-500
                                      `
                                  }
                                `}
                              >
                                {stock <= 5
                                  ? `Only ${stock} left in stock`
                                  : "In stock"}
                              </p>
                            </div>

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
                              } from cart`}
                              title="Remove from cart"
                              className="
                                flex
                                h-9
                                w-9
                                shrink-0
                                items-center
                                justify-center

                                rounded-xl

                                text-stone-400
                                dark:text-stone-300

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
                              <Trash2
                                size={17}
                                aria-hidden="true"
                              />
                            </button>
                          </div>

                          {/* Bottom */}

                          <div
                            className="
                              mt-auto
                              pt-5

                              flex
                              flex-col
                              gap-4

                              sm:flex-row
                              sm:items-end
                              sm:justify-between
                            "
                          >
                            {/* Quantity */}

                            <div>
                              <div
                                className="
                                  mb-2

                                  flex
                                  items-center
                                  gap-2
                                "
                              >
                                <p
                                  className="
                                    text-xs
                                    font-bold

                                    text-stone-500
                                    dark:text-stone-400
                                  "
                                >
                                  Quantity
                                </p>

                                <span
                                  className="
                                    text-[10px]

                                    text-stone-400
                                    dark:text-stone-500
                                  "
                                >
                                  Max{" "}
                                  {
                                    maxQuantity
                                  }
                                </span>
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
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDecrease(
                                      product,
                                      quantity
                                    )
                                  }
                                  disabled={
                                    quantity <= 1
                                  }
                                  aria-label={`Decrease quantity of ${
                                    product.title ||
                                    "product"
                                  }`}
                                  className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center

                                    text-stone-600
                                    dark:text-stone-300

                                    transition-colors

                                    hover:bg-stone-100
                                    dark:hover:bg-stone-800

                                    disabled:cursor-not-allowed
                                    disabled:opacity-30
                                  "
                                >
                                  <Minus
                                    size={15}
                                    aria-hidden="true"
                                  />
                                </button>

                                <span
                                  className="
                                    flex
                                    h-10
                                    min-w-11
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
                                  aria-label={`Quantity ${quantity}`}
                                >
                                  {
                                    quantity
                                  }
                                </span>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleIncrease(
                                      product,
                                      quantity
                                    )
                                  }
                                  disabled={
                                    quantity >=
                                    maxQuantity
                                  }
                                  aria-label={`Increase quantity of ${
                                    product.title ||
                                    "product"
                                  }`}
                                  className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center

                                    text-stone-600
                                    dark:text-stone-300

                                    transition-colors

                                    hover:bg-stone-100
                                    dark:hover:bg-stone-800

                                    disabled:cursor-not-allowed
                                    disabled:opacity-30
                                  "
                                >
                                  <Plus
                                    size={15}
                                    aria-hidden="true"
                                  />
                                </button>
                              </div>
                            </div>

                            {/* Item Total */}

                            <div
                              className="
                                sm:text-right
                              "
                            >
                              <p
                                className="
                                  text-xs
                                  font-semibold

                                  text-stone-400
                                  dark:text-stone-500
                                "
                              >
                                Item total
                              </p>

                              <p
                                className="
                                  mt-1

                                  text-xl
                                  font-black

                                  text-stone-900
                                  dark:text-white
                                "
                              >
                                {formatPrice(
                                  itemTotal
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  }
                )}
              </div>
            </section>
          </div>

          {/* =================================
              Order Summary
          ================================= */}

          <aside>
            <div
              className="
                sticky
                top-28

                rounded-2xl

                border
                border-stone-200
                dark:border-stone-800

                bg-white
                dark:bg-stone-900

                p-5

                shadow-sm
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-3
                "
              >
                <h2
                  className="
                    text-lg
                    font-black

                    text-stone-900
                    dark:text-white
                  "
                >
                  Order Summary
                </h2>

                <span
                  className="
                    rounded-full

                    bg-stone-100
                    dark:bg-stone-800

                    px-2.5
                    py-1

                    text-[10px]
                    font-black

                    text-stone-500
                    dark:text-stone-400
                  "
                >
                  {cartCount}{" "}
                  {cartCount === 1
                    ? "item"
                    : "items"}
                </span>
              </div>

              <div
                className="
                  mt-6
                  space-y-4
                "
              >
                {/* Subtotal */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                  "
                >
                  <span
                    className="
                      text-sm

                      text-stone-500
                      dark:text-stone-400
                    "
                  >
                    Subtotal
                  </span>

                  <span
                    className="
                      text-sm
                      font-bold

                      text-stone-900
                      dark:text-white
                    "
                  >
                    {formatPrice(
                      subtotal
                    )}
                  </span>
                </div>

                {/* Savings */}

                {totalSavings > 0 && (
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-4
                    "
                  >
                    <span
                      className="
                        text-sm

                        text-stone-500
                        dark:text-stone-400
                      "
                    >
                      You save
                    </span>

                    <span
                      className="
                        text-sm
                        font-bold

                        text-emerald-700
                        dark:text-emerald-400
                      "
                    >
                      {formatPrice(
                        totalSavings
                      )}
                    </span>
                  </div>
                )}

                {/* Delivery */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                  "
                >
                  <span
                    className="
                      text-sm

                      text-stone-500
                      dark:text-stone-400
                    "
                  >
                    Delivery
                  </span>

                  <span
                    className={`
                      text-sm
                      font-bold

                      ${
                        deliveryFee ===
                        0
                          ? `
                            text-emerald-700
                            dark:text-emerald-400
                          `
                          : `
                            text-stone-900
                            dark:text-white
                          `
                      }
                    `}
                  >
                    {deliveryFee === 0
                      ? "FREE"
                      : formatPrice(
                          deliveryFee
                        )}
                  </span>
                </div>

                {/* Savings Information */}

                {totalSavings > 0 && (
                  <div
                    className="
                      rounded-xl

                      bg-emerald-50
                      dark:bg-emerald-950/20

                      px-4
                      py-3
                    "
                  >
                    <p
                      className="
                        text-xs
                        leading-5

                        text-emerald-700
                        dark:text-emerald-400
                      "
                    >
                      You're saving approximately{" "}
                      <span
                        className="
                          font-black
                        "
                      >
                        {formatPrice(
                          totalSavings
                        )}
                      </span>{" "}
                      with current product
                      discounts.
                    </p>
                  </div>
                )}

                {/* Delivery Message */}

                {deliveryFee > 0 && (
                  <div
                    className="
                      rounded-xl

                      bg-amber-50
                      dark:bg-amber-950/20

                      px-4
                      py-3
                    "
                  >
                    <p
                      className="
                        text-xs
                        leading-5

                        text-amber-700
                        dark:text-amber-400
                      "
                    >
                      Add{" "}
                      <span
                        className="
                          font-black
                        "
                      >
                        {formatPrice(
                          amountForFreeDelivery
                        )}
                      </span>{" "}
                      more to unlock free
                      delivery.
                    </p>
                  </div>
                )}

                <div
                  className="
                    border-t
                    border-stone-200
                    dark:border-stone-800
                  "
                />

                {/* Total */}

                <div
                  className="
                    flex
                    items-end
                    justify-between
                    gap-4
                  "
                >
                  <div>
                    <p
                      className="
                        text-sm
                        font-black

                        text-stone-900
                        dark:text-white
                      "
                    >
                      Total
                    </p>

                    <p
                      className="
                        mt-1

                        text-[11px]

                        text-stone-400
                        dark:text-stone-500
                      "
                    >
                      Inclusive of taxes
                    </p>
                  </div>

                  <span
                    className="
                      text-2xl
                      font-black

                      text-stone-900
                      dark:text-white
                    "
                  >
                    {formatPrice(
                      grandTotal
                    )}
                  </span>
                </div>
              </div>

              {/* Checkout */}

              <Link
                to="/checkout"
                className="
                  mt-6

                  flex
                  w-full
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

                  hover:bg-emerald-700
                  hover:gap-3

                  active:scale-[0.98]
                "
              >
                Proceed to Checkout

                <ArrowRight
                  size={16}
                  aria-hidden="true"
                />
              </Link>

              {/* Trust */}

              <div
                className="
                  mt-4

                  flex
                  items-center
                  justify-center
                  gap-2

                  text-[11px]

                  text-stone-400
                  dark:text-stone-500
                "
              >
                <ShieldCheck
                  size={14}
                  aria-hidden="true"
                />

                <span>
                  Secure checkout •
                  Easy returns
                </span>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Cart;