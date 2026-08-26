import {
  CalendarDays,
  ChevronLeft,
  CreditCard,
  ImageOff,
  MapPin,
  Package,
  ReceiptText,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";

import {
  Link,
  Navigate,
  useParams,
} from "react-router-dom";

import {
  useSelector,
} from "react-redux";

import {
  USD_TO_INR,
} from "../constants/commerce";

import {
  selectCurrentUser,
} from "../features/auth/authSlice";

import {
  getUserData,
} from "../utils/storage";

/* ========================================
   Order Details
======================================== */

const OrderDetails = () => {
  const {
    orderId,
  } = useParams();

  const currentUser =
    useSelector(
      selectCurrentUser
    );

  /* ========================================
     User Orders
  ======================================== */

  const userData =
    currentUser?.id
      ? getUserData(
          currentUser.id
        )
      : null;

  const orders =
    Array.isArray(
      userData?.orders
    )
      ? userData.orders
      : [];

  const order =
    orders.find(
      (savedOrder) =>
        String(
          savedOrder?.id
        ) ===
        String(
          orderId
        )
    );

  /* ========================================
     Invalid Order ID
  ======================================== */

  if (!orderId) {
    return (
      <Navigate
        to="/orders"
        replace
      />
    );
  }

  /* ========================================
     Order Not Found
  ======================================== */

  if (!order) {
    return (
      <div
        className="
          container-shell

          py-12

          sm:py-16
          lg:py-20
        "
      >
        <div
          className="
            mx-auto
            max-w-xl

            rounded-3xl

            border
            border-stone-200
            dark:border-stone-800

            bg-white
            dark:bg-stone-900

            p-8

            text-center

            shadow-sm

            sm:p-10
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

              bg-stone-100
              dark:bg-stone-800

              text-stone-400
              dark:text-stone-500
            "
          >
            <ReceiptText
              size={28}
              aria-hidden="true"
            />
          </div>

          <h1
            className="
              mt-5

              text-2xl
              font-black
              tracking-tight

              text-stone-900
              dark:text-white
            "
          >
            Order not found
          </h1>

          <p
            className="
              mt-2

              text-sm
              leading-6

              text-stone-500
              dark:text-stone-400
            "
          >
            We couldn't find this
            order in your ShopSphere
            account.
          </p>

          <Link
            to="/orders"
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
            <ChevronLeft
              size={16}
              aria-hidden="true"
            />

            Back to My Orders
          </Link>
        </div>
      </div>
    );
  }

  /* ========================================
     Order Information
  ======================================== */

  const orderItems =
    Array.isArray(
      order.items
    )
      ? order.items
      : [];

  const pricing =
    order.pricing || {};

  const payment =
    order.payment || {};

  const address =
    order.address || {};

  const itemCount =
    Number(
      order.itemCount
    ) ||
    orderItems.reduce(
      (
        total,
        item
      ) =>
        total +
        Number(
          item?.quantity ||
            0
        ),
      0
    );

  const savings =
    Number(
      pricing.savings ||
        0
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
      Number(
        value || 0
      )
    );
  };

  /* ========================================
     Date
  ======================================== */

  const formatDate = (
    value
  ) => {
    if (!value) {
      return "Date unavailable";
    }

    const date =
      new Date(
        value
      );

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return "Date unavailable";
    }

    return new Intl.DateTimeFormat(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",

        hour: "numeric",
        minute: "2-digit",
      }
    ).format(
      date
    );
  };

  /* ========================================
     Payment Details
  ======================================== */

  const getPaymentDetails =
    () => {
      if (
        payment.method ===
        "card"
      ) {
        return {
          title:
            payment.label ||
            "Credit / Debit Card",

          detail:
            payment.last4
              ? `Card ending in ${payment.last4}`
              : "Card payment",
        };
      }

      if (
        payment.method ===
        "upi"
      ) {
        return {
          title:
            payment.label ||
            "UPI",

          detail:
            payment.upiId ||
            "UPI payment",
        };
      }

      if (
        payment.method ===
        "cod"
      ) {
        return {
          title:
            payment.label ||
            "Cash on Delivery",

          detail:
            "Pay when your order arrives",
        };
      }

      return {
        title:
          payment.label ||
          "Payment",

        detail:
          "Payment method recorded",
      };
    };

  const paymentDetails =
    getPaymentDetails();

  /* ========================================
     Address Formatting
  ======================================== */

  const cityState =
    [
      address.city,
      address.state,
    ]
      .filter(Boolean)
      .join(", ");

  const cityLine =
    [
      cityState,
      address.postalCode,
    ]
      .filter(Boolean)
      .join(" - ");

  /* ========================================
     Item Total
  ======================================== */

  const getItemTotal =
    (item) => {
      const quantity =
        Number(
          item?.quantity ||
            0
        );

      if (
        Number.isFinite(
          Number(
            item?.lineTotal
          )
        ) &&
        item?.lineTotal !==
          undefined
      ) {
        return Number(
          item.lineTotal
        );
      }

      return (
        Number(
          item?.product
            ?.price || 0
        ) *
        USD_TO_INR *
        quantity
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
          flex-wrap
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

        <span>
          /
        </span>

        <Link
          to="/orders"
          className="
            transition-colors

            hover:text-emerald-700
            dark:hover:text-emerald-400
          "
        >
          Orders
        </Link>

        <span>
          /
        </span>

        <span
          aria-current="page"
          className="
            font-semibold

            text-stone-900
            dark:text-white
          "
        >
          Order Details
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
            <ReceiptText
              size={14}
              aria-hidden="true"
            />

            Order Details
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
            Order #{order.id}
          </h1>

          <div
            className="
              mt-3

              flex
              flex-wrap
              items-center
              gap-x-4
              gap-y-2

              text-sm

              text-stone-500
              dark:text-stone-400
            "
          >
            <div
              className="
                flex
                items-center
                gap-1.5
              "
            >
              <CalendarDays
                size={15}
                aria-hidden="true"
              />

              <span>
                Placed on{" "}
                {formatDate(
                  order.createdAt
                )}
              </span>
            </div>

            <div
              className="
                flex
                items-center
                gap-1.5
              "
            >
              <Package
                size={15}
                aria-hidden="true"
              />

              <span>
                {itemCount}{" "}
                {itemCount === 1
                  ? "item"
                  : "items"}
              </span>
            </div>
          </div>
        </div>

        <span
          className="
            w-fit

            rounded-full

            bg-emerald-50
            dark:bg-emerald-950/30

            px-4
            py-2

            text-sm
            font-black

            text-emerald-700
            dark:text-emerald-400
          "
        >
          {order.status ||
            "Order Placed"}
        </span>
      </div>

      {/* =====================================
          Layout
      ===================================== */}

      <div
        className="
          mt-8

          grid
          gap-6

          lg:grid-cols-[minmax(0,1fr)_340px]
        "
      >
        {/* =====================================
            Items
        ===================================== */}

        <section
          className="
            min-w-0

            rounded-2xl

            border
            border-stone-200
            dark:border-stone-800

            bg-white
            dark:bg-stone-900

            p-5

            shadow-sm

            sm:p-6
          "
        >
          <div>
            <h2
              className="
                text-lg
                font-black

                text-stone-900
                dark:text-white
              "
            >
              Items in Your Order
            </h2>

            <p
              className="
                mt-1

                text-xs

                text-stone-400
                dark:text-stone-500
              "
            >
              Products included in
              this purchase.
            </p>
          </div>

          <div
            className="
              mt-6

              divide-y
              divide-stone-200
              dark:divide-stone-800
            "
          >
            {orderItems.map(
              (
                item,
                index
              ) => (
                <div
                  key={`${item?.product?.id}-${index}`}
                  className="
                    flex
                    items-start
                    gap-4

                    py-5

                    first:pt-0
                    last:pb-0
                  "
                >
                  <Link
                    to={`/product/${item?.product?.id}`}
                    className="
                      flex
                      h-24
                      w-24
                      shrink-0
                      items-center
                      justify-center

                      overflow-hidden

                      rounded-xl

                      bg-stone-100
                      dark:bg-stone-800
                    "
                  >
                    {item?.product
                      ?.thumbnail ? (
                      <img
                        src={
                          item
                            .product
                            .thumbnail
                        }
                        alt={
                          item
                            .product
                            .title ||
                          "Product"
                        }
                        className="
                          h-full
                          w-full

                          object-contain

                          p-2
                        "
                      />
                    ) : (
                      <ImageOff
                        size={23}
                        aria-hidden="true"
                        className="
                          text-stone-400
                          dark:text-stone-600
                        "
                      />
                    )}
                  </Link>

                  <div
                    className="
                      min-w-0
                      flex-1
                    "
                  >
                    <Link
                      to={`/product/${item?.product?.id}`}
                      className="
                        line-clamp-2

                        text-base
                        font-black

                        text-stone-900
                        dark:text-white

                        transition-colors

                        hover:text-emerald-700
                        dark:hover:text-emerald-400
                      "
                    >
                      {item
                        ?.product
                        ?.title ||
                        "Product"}
                    </Link>

                    {item?.product
                      ?.brand && (
                      <p
                        className="
                          mt-1

                          text-xs
                          font-semibold

                          text-emerald-700
                          dark:text-emerald-400
                        "
                      >
                        {
                          item.product
                            .brand
                        }
                      </p>
                    )}

                    <p
                      className="
                        mt-3

                        text-xs

                        text-stone-500
                        dark:text-stone-400
                      "
                    >
                      Quantity:{" "}
                      <span
                        className="
                          font-bold

                          text-stone-700
                          dark:text-stone-300
                        "
                      >
                        {Number(
                          item
                            ?.quantity ||
                            0
                        )}
                      </span>
                    </p>
                  </div>

                  <p
                    className="
                      shrink-0

                      text-sm
                      font-black

                      text-stone-900
                      dark:text-white
                    "
                  >
                    {formatPrice(
                      getItemTotal(
                        item
                      )
                    )}
                  </p>
                </div>
              )
            )}
          </div>
        </section>

        {/* =====================================
            Sidebar
        ===================================== */}

        <aside
          className="
            space-y-4
          "
        >
          {/* =====================================
              Order Summary
          ===================================== */}

          <div
            className="
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
                gap-2
              "
            >
              <ReceiptText
                size={18}
                aria-hidden="true"
                className="
                  text-emerald-700
                  dark:text-emerald-400
                "
              />

              <h2
                className="
                  text-sm
                  font-black

                  text-stone-900
                  dark:text-white
                "
              >
                Order Summary
              </h2>
            </div>

            <div
              className="
                mt-5
                space-y-3
              "
            >
              <div
                className="
                  flex
                  justify-between
                  gap-3

                  text-xs
                "
              >
                <span
                  className="
                    text-stone-500
                    dark:text-stone-400
                  "
                >
                  Subtotal
                </span>

                <span
                  className="
                    font-bold

                    text-stone-900
                    dark:text-white
                  "
                >
                  {formatPrice(
                    pricing.subtotal
                  )}
                </span>
              </div>

              {savings > 0 && (
                <div
                  className="
                    flex
                    justify-between
                    gap-3

                    text-xs
                  "
                >
                  <span
                    className="
                      text-stone-500
                      dark:text-stone-400
                    "
                  >
                    You Saved
                  </span>

                  <span
                    className="
                      font-bold

                      text-emerald-700
                      dark:text-emerald-400
                    "
                  >
                    -
                    {formatPrice(
                      savings
                    )}
                  </span>
                </div>
              )}

              <div
                className="
                  flex
                  justify-between
                  gap-3

                  text-xs
                "
              >
                <span
                  className="
                    text-stone-500
                    dark:text-stone-400
                  "
                >
                  Delivery
                </span>

                <span
                  className="
                    font-bold

                    text-stone-900
                    dark:text-white
                  "
                >
                  {Number(
                    pricing.deliveryFee ||
                      0
                  ) === 0
                    ? "FREE"
                    : formatPrice(
                        pricing.deliveryFee
                      )}
                </span>
              </div>

              <div
                className="
                  border-t
                  border-stone-200
                  dark:border-stone-800
                "
              />

              <div
                className="
                  flex
                  items-end
                  justify-between
                  gap-3
                "
              >
                <span
                  className="
                    text-sm
                    font-black

                    text-stone-900
                    dark:text-white
                  "
                >
                  Total
                </span>

                <span
                  className="
                    text-xl
                    font-black

                    text-stone-900
                    dark:text-white
                  "
                >
                  {formatPrice(
                    pricing.total
                  )}
                </span>
              </div>
            </div>

            <div
              className="
                mt-4

                flex
                items-center
                gap-2

                rounded-xl

                bg-emerald-50
                dark:bg-emerald-950/20

                px-3
                py-2.5

                text-[11px]
                font-semibold

                text-emerald-700
                dark:text-emerald-400
              "
            >
              <Truck
                size={14}
                aria-hidden="true"
              />

              {Number(
                pricing.deliveryFee ||
                  0
              ) === 0
                ? "Free delivery applied"
                : "Delivery fee included"}
            </div>
          </div>

          {/* =====================================
              Payment
          ===================================== */}

          <div
            className="
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
                gap-2
              "
            >
              <CreditCard
                size={18}
                aria-hidden="true"
                className="
                  text-emerald-700
                  dark:text-emerald-400
                "
              />

              <h2
                className="
                  text-sm
                  font-black

                  text-stone-900
                  dark:text-white
                "
              >
                Payment Method
              </h2>
            </div>

            <div
              className="
                mt-4

                rounded-xl

                bg-stone-50
                dark:bg-stone-800/50

                p-3
              "
            >
              <p
                className="
                  text-sm
                  font-black

                  text-stone-900
                  dark:text-white
                "
              >
                {
                  paymentDetails.title
                }
              </p>

              <p
                className="
                  mt-1

                  break-all

                  text-xs
                  leading-5

                  text-stone-500
                  dark:text-stone-400
                "
              >
                {
                  paymentDetails.detail
                }
              </p>
            </div>

            <div
              className="
                mt-3

                flex
                items-center
                gap-2

                text-[11px]

                text-stone-400
                dark:text-stone-500
              "
            >
              <ShieldCheck
                size={13}
                aria-hidden="true"
                className="
                  text-emerald-600
                  dark:text-emerald-400
                "
              />

              Payment details secured
            </div>
          </div>

          {/* =====================================
              Delivery Address
          ===================================== */}

          <div
            className="
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
                gap-2
              "
            >
              <MapPin
                size={18}
                aria-hidden="true"
                className="
                  text-emerald-700
                  dark:text-emerald-400
                "
              />

              <h2
                className="
                  text-sm
                  font-black

                  text-stone-900
                  dark:text-white
                "
              >
                Delivery Address
              </h2>
            </div>

            {address.fullName && (
              <p
                className="
                  mt-4

                  text-sm
                  font-black

                  text-stone-900
                  dark:text-white
                "
              >
                {
                  address.fullName
                }
              </p>
            )}

            <div
              className="
                mt-2

                space-y-1

                text-xs
                leading-5

                text-stone-500
                dark:text-stone-400
              "
            >
              {address.addressLine && (
                <p>
                  {
                    address.addressLine
                  }
                </p>
              )}

              {cityLine && (
                <p>
                  {cityLine}
                </p>
              )}

              {address.phone && (
                <p>
                  Phone:{" "}
                  {
                    address.phone
                  }
                </p>
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* =====================================
          Actions
      ===================================== */}

      <div
        className="
          mt-8

          flex
          flex-col
          gap-3

          sm:flex-row
          sm:justify-center
        "
      >
        <Link
          to="/orders"
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

            px-5
            py-3

            text-sm
            font-bold

            text-stone-700
            dark:text-stone-200

            transition-colors

            hover:bg-stone-50
            dark:hover:bg-stone-800
          "
        >
          <ChevronLeft
            size={16}
            aria-hidden="true"
          />

          Back to My Orders
        </Link>

        <Link
          to="/shop"
          className="
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
          "
        >
          <ShoppingBag
            size={17}
            aria-hidden="true"
          />

          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderDetails;