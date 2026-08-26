import {
  Check,
  ChevronRight,
  CreditCard,
  MapPin,
  PackageCheck,
  ReceiptText,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";

import {
  Link,
  Navigate,
  useLocation,
  useSearchParams,
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

const OrderSuccess = () => {
  const location =
    useLocation();

  const [
    searchParams,
  ] = useSearchParams();

  const currentUser =
    useSelector(
      selectCurrentUser
    );

  const orderId =
    location.state
      ?.orderId ||
    searchParams.get(
      "order"
    );

  /* =====================================
     Find Order
  ===================================== */

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
          savedOrder.id
        ) ===
        String(orderId)
    );

  /* =====================================
     Currency
  ===================================== */

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

  /* =====================================
     Date
  ===================================== */

  const formatDate = (
    value
  ) => {
    if (!value) {
      return "";
    }

    const date =
      new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return "";
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
    ).format(date);
  };

  /* =====================================
     Invalid Order
  ===================================== */

  if (!orderId) {
    return (
      <Navigate
        to="/orders"
        replace
      />
    );
  }

  if (!order) {
    return (
      <div
        className="
          container-shell

          py-16
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
          "
        >
          <ReceiptText
            size={40}
            aria-hidden="true"
            className="
              mx-auto

              text-stone-300
              dark:text-stone-700
            "
          />

          <h1
            className="
              mt-5

              text-2xl
              font-black

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

              rounded-xl

              bg-emerald-600

              px-5
              py-3

              text-sm
              font-black

              text-white

              transition-colors

              hover:bg-emerald-700
            "
          >
            View My Orders
          </Link>
        </div>
      </div>
    );
  }

  /* =====================================
     Derived Order Information
  ===================================== */

  const orderItems =
    Array.isArray(
      order.items
    )
      ? order.items
      : [];

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

  const pricing =
    order.pricing || {};

  const payment =
    order.payment || {};

  const address =
    order.address || {};

  const savings =
    Number(
      pricing.savings ||
        0
    );

  /* =====================================
     Payment Display
  ===================================== */

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

  /* =====================================
     Address Formatting
  ===================================== */

  const cityStatePostal = [
    address.city,
    address.state,
  ]
    .filter(Boolean)
    .join(", ");

  const cityLine = [
    cityStatePostal,
    address.postalCode,
  ]
    .filter(Boolean)
    .join(" - ");

  /* =====================================
     Item Price
  ===================================== */

  const getItemTotal = (
    item
  ) => {
    const quantity =
      Number(
        item?.quantity ||
          0
      );

    /*
      Prefer a saved INR item
      total if we add one later.

      For current ShopSphere
      orders, product.price is
      the API USD price, so this
      fallback matches Checkout.
    */

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
          Order Complete
        </span>
      </nav>

      {/* =====================================
          Success Hero
      ===================================== */}

      <div
        className="
          mx-auto
          mt-8
          max-w-3xl

          text-center
        "
      >
        <div
          className="
            mx-auto

            flex
            h-20
            w-20
            items-center
            justify-center

            rounded-full

            bg-emerald-100
            dark:bg-emerald-950/40

            text-emerald-700
            dark:text-emerald-400
          "
        >
          <Check
            size={38}
            strokeWidth={2.5}
            aria-hidden="true"
          />
        </div>

        <div
          className="
            mt-6

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
          <PackageCheck
            size={14}
            aria-hidden="true"
          />

          Order Confirmed
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
          Thank You for Your Order!
        </h1>

        <p
          className="
            mx-auto
            mt-4
            max-w-xl

            text-sm
            leading-6

            text-stone-500
            dark:text-stone-400
          "
        >
          Your ShopSphere order has
          been placed successfully.
          You can view it anytime
          from your orders page.
        </p>

        {/* Order Meta */}

        <div
          className="
            mt-6

            flex
            flex-wrap
            items-center
            justify-center
            gap-2
          "
        >
          <div
            className="
              rounded-xl

              bg-stone-100
              dark:bg-stone-900

              px-4
              py-3
            "
          >
            <p
              className="
                text-xs

                text-stone-500
                dark:text-stone-400
              "
            >
              Order ID{" "}

              <span
                className="
                  ml-1

                  font-black

                  text-stone-900
                  dark:text-white
                "
              >
                {order.id}
              </span>
            </p>
          </div>

          <div
            className="
              rounded-xl

              bg-stone-100
              dark:bg-stone-900

              px-4
              py-3
            "
          >
            <p
              className="
                text-xs

                text-stone-500
                dark:text-stone-400
              "
            >
              Items{" "}

              <span
                className="
                  ml-1

                  font-black

                  text-stone-900
                  dark:text-white
                "
              >
                {itemCount}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* =====================================
          Order Details
      ===================================== */}

      <div
        className="
          mx-auto
          mt-10
          max-w-5xl

          grid
          gap-6

          lg:grid-cols-[minmax(0,1fr)_320px]
        "
      >
        {/* =====================================
            Products
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
          <div
            className="
              flex
              flex-wrap
              items-center
              justify-between
              gap-3
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
                Order Details
              </h2>

              <p
                className="
                  mt-1

                  text-xs

                  text-stone-400
                  dark:text-stone-500
                "
              >
                {formatDate(
                  order.createdAt
                )}
              </p>
            </div>

            <span
              className="
                rounded-full

                bg-emerald-50
                dark:bg-emerald-950/30

                px-3
                py-1

                text-xs
                font-bold

                text-emerald-700
                dark:text-emerald-400
              "
            >
              {order.status}
            </span>
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
                    gap-3

                    py-4

                    first:pt-0
                    last:pb-0

                    sm:gap-4
                  "
                >
                  {/* Image */}

                  <div
                    className="
                      flex
                      h-20
                      w-20
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
                      <ShoppingBag
                        size={22}
                        aria-hidden="true"
                        className="
                          text-stone-400
                          dark:text-stone-600
                        "
                      />
                    )}
                  </div>

                  {/* Details */}

                  <div
                    className="
                      min-w-0
                      flex-1
                    "
                  >
                    <p
                      className="
                        line-clamp-2

                        text-sm
                        font-black
                        leading-5

                        text-stone-900
                        dark:text-white
                      "
                    >
                      {item
                        ?.product
                        ?.title ||
                        "Product"}
                    </p>

                    <p
                      className="
                        mt-1

                        text-xs

                        text-stone-500
                        dark:text-stone-400
                      "
                    >
                      Qty:{" "}
                      {Number(
                        item
                          ?.quantity ||
                          0
                      )}
                    </p>

                    <p
                      className="
                        mt-2

                        text-sm
                        font-black

                        text-stone-900
                        dark:text-white

                        sm:hidden
                      "
                    >
                      {formatPrice(
                        getItemTotal(
                          item
                        )
                      )}
                    </p>
                  </div>

                  {/* Desktop Price */}

                  <p
                    className="
                      hidden
                      shrink-0

                      text-right
                      text-sm
                      font-black

                      text-stone-900
                      dark:text-white

                      sm:block
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
              Payment Summary
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

              <h3
                className="
                  text-sm
                  font-black

                  text-stone-900
                  dark:text-white
                "
              >
                Payment Summary
              </h3>
            </div>

            <div
              className="
                mt-5
                space-y-3
              "
            >
              {/* Subtotal */}

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

              {/* Savings */}

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

              {/* Delivery */}

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

              {/* Total */}

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
          </div>

          {/* =====================================
              Payment Method
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

              <h3
                className="
                  text-sm
                  font-black

                  text-stone-900
                  dark:text-white
                "
              >
                Payment Method
              </h3>
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
                  shrink-0

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

              <h3
                className="
                  text-sm
                  font-black

                  text-stone-900
                  dark:text-white
                "
              >
                Delivery Address
              </h3>
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
          mx-auto
          mt-8
          max-w-5xl

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

          View My Orders
        </Link>

        <Link
          to="/shop"
          className="
            inline-flex
            items-center
            justify-center

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
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;