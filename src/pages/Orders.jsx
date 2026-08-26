import {
  CalendarDays,
  ChevronRight,
  ImageOff,
  MapPin,
  Package,
  ReceiptText,
  ShoppingBag,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import {
  useSelector,
} from "react-redux";

import {
  selectCurrentUser,
} from "../features/auth/authSlice";

import {
  getUserData,
} from "../utils/storage";

const Orders = () => {
  const currentUser =
    useSelector(
      selectCurrentUser
    );

  /* =====================================
     User Orders
  ===================================== */

  const userData =
    currentUser?.id
      ? getUserData(
          currentUser.id
        )
      : null;

  const storedOrders =
    Array.isArray(
      userData?.orders
    )
      ? userData.orders
      : [];

  /*
   * Always show newest orders first.
   *
   * We copy the array before sorting so the
   * original localStorage-derived data is not
   * mutated.
   */

  const orders = [
    ...storedOrders,
  ].sort(
    (first, second) => {
      const firstDate =
        new Date(
          first?.createdAt || 0
        ).getTime();

      const secondDate =
        new Date(
          second?.createdAt || 0
        ).getTime();

      const safeFirstDate =
        Number.isNaN(
          firstDate
        )
          ? 0
          : firstDate;

      const safeSecondDate =
        Number.isNaN(
          secondDate
        )
          ? 0
          : secondDate;

      return (
        safeSecondDate -
        safeFirstDate
      );
    }
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
      Number(
        value || 0
      )
    );
  };

  /* =====================================
     Date
  ===================================== */

  const formatDate = (
    value
  ) => {
    if (!value) {
      return "Date unavailable";
    }

    const parsedDate =
      new Date(value);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return value;
    }

    return new Intl.DateTimeFormat(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",

        hour: "numeric",
        minute: "2-digit",
      }
    ).format(
      parsedDate
    );
  };

  /* =====================================
     Order Item Count
  ===================================== */

  const getItemCount = (
    order
  ) => {
    const storedCount =
      Number(
        order?.itemCount
      );

    if (
      Number.isFinite(
        storedCount
      ) &&
      storedCount > 0
    ) {
      return storedCount;
    }

    if (
      !Array.isArray(
        order?.items
      )
    ) {
      return 0;
    }

    return order.items.reduce(
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
  };

  /* =====================================
     Delivery Location
  ===================================== */

  const getLocation = (
    order
  ) => {
    const city =
      order?.address?.city;

    const state =
      order?.address?.state;

    const location = [
      city,
      state,
    ]
      .filter(Boolean)
      .join(", ");

    return (
      location ||
      "Location unavailable"
    );
  };

  /* =====================================
     Empty Orders
  ===================================== */

  if (
    orders.length === 0
  ) {
    return (
      <div
        className="
          container-shell

          py-8

          sm:py-10
          lg:py-12
        "
      >
        {/* Breadcrumb */}

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
            Orders
          </span>
        </nav>

        {/* Empty State */}

        <div
          className="
            mx-auto
            mt-12
            max-w-xl

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

            sm:px-10
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
            <ShoppingBag
              size={30}
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

              sm:text-3xl
            "
          >
            No orders yet
          </h1>

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
            Your completed
            ShopSphere orders will
            appear here after you
            make your first
            purchase.
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
              duration-200

              hover:bg-emerald-700

              active:scale-[0.98]

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-emerald-500
              focus-visible:ring-offset-2

              dark:focus-visible:ring-offset-stone-950
            "
          >
            <ShoppingBag
              size={16}
              aria-hidden="true"
            />

            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  /* =====================================
     Orders
  ===================================== */

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
          Orders
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
            <ReceiptText
              size={14}
              aria-hidden="true"
            />

            Order History
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
            My Orders
          </h1>

          <p
            className="
              mt-3
              max-w-2xl

              text-sm
              leading-6

              text-stone-500
              dark:text-stone-400
            "
          >
            Review your previous
            ShopSphere purchases
            and order details.
          </p>
        </div>

        {/* Order Count */}

        <div
          className="
            w-fit

            rounded-xl

            border
            border-stone-200
            dark:border-stone-800

            bg-white
            dark:bg-stone-900

            px-4
            py-3

            shadow-sm
          "
        >
          <p
            className="
              text-xs

              text-stone-500
              dark:text-stone-400
            "
          >
            Total Orders
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
            {orders.length}
          </p>
        </div>
      </div>

      {/* =====================================
          Order List
      ===================================== */}

      <div
        className="
          mt-10
          space-y-6
        "
      >
        {orders.map(
          (order) => {
            const firstItem =
              order.items?.[0];

            const product =
              firstItem?.product;

            const remainingProducts =
              Math.max(
                0,
                Number(
                  order.items
                    ?.length ||
                    0
                ) - 1
              );

            const itemCount =
              getItemCount(
                order
              );

            const location =
              getLocation(
                order
              );

            return (
              <article
                key={
                  order.id
                }
                className="
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
                    Order Header
                ================================= */}

                <div
                  className="
                    flex
                    flex-col
                    gap-4

                    border-b
                    border-stone-200
                    dark:border-stone-800

                    bg-stone-50/70
                    dark:bg-stone-800/30

                    px-5
                    py-4

                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                >
                  <div
                    className="
                      flex
                      flex-wrap
                      items-center

                      gap-x-6
                      gap-y-3
                    "
                  >
                    {/* Order ID */}

                    <div
                      className="
                        min-w-0
                      "
                    >
                      <p
                        className="
                          text-[10px]
                          font-black
                          uppercase
                          tracking-[0.1em]

                          text-stone-400
                          dark:text-stone-500
                        "
                      >
                        Order ID
                      </p>

                      <p
                        title={
                          String(
                            order.id
                          )
                        }
                        className="
                          mt-1

                          max-w-[230px]

                          truncate

                          text-sm
                          font-black

                          text-stone-900
                          dark:text-white

                          sm:max-w-[320px]
                        "
                      >
                        {order.id}
                      </p>
                    </div>

                    {/* Date */}

                    <div>
                      <p
                        className="
                          text-[10px]
                          font-black
                          uppercase
                          tracking-[0.1em]

                          text-stone-400
                          dark:text-stone-500
                        "
                      >
                        Placed On
                      </p>

                      <div
                        className="
                          mt-1

                          flex
                          items-center
                          gap-1.5
                        "
                      >
                        <CalendarDays
                          size={13}
                          aria-hidden="true"
                          className="
                            shrink-0

                            text-stone-400
                            dark:text-stone-500
                          "
                        />

                        <p
                          className="
                            text-xs
                            font-semibold

                            text-stone-600
                            dark:text-stone-300
                          "
                        >
                          {formatDate(
                            order.createdAt
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Status */}

                  <span
                    className="
                      w-fit

                      rounded-full

                      bg-emerald-50
                      dark:bg-emerald-950/30

                      px-3
                      py-1.5

                      text-xs
                      font-black

                      text-emerald-700
                      dark:text-emerald-400
                    "
                  >
                    {order.status ||
                      "Order Placed"}
                  </span>
                </div>

                {/* =================================
                    Order Body
                ================================= */}

                <div
                  className="
                    grid
                    gap-6

                    p-5

                    sm:p-6

                    md:grid-cols-[minmax(0,1fr)_220px]
                  "
                >
                  {/* =================================
                      Product Preview
                  ================================= */}

                  <div
                    className="
                      min-w-0
                    "
                  >
                    {firstItem &&
                    product ? (
                      <div
                        className="
                          flex
                          gap-4
                        "
                      >
                        {/* Image */}

                        <Link
                          to={`/product/${product.id}`}
                          aria-label={`View ${
                            product.title ||
                            "product"
                          }`}
                          className="
                            group

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

                                p-2

                                transition-transform
                                duration-300

                                group-hover:scale-105
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

                        {/* Product Information */}

                        <div
                          className="
                            min-w-0
                            flex-1
                          "
                        >
                          <Link
                            to={`/product/${product.id}`}
                            className="
                              line-clamp-2

                              text-base
                              font-black

                              text-stone-900
                              dark:text-white

                              transition-colors

                              hover:text-emerald-700
                              dark:hover:text-emerald-400

                              focus-visible:outline-none
                              focus-visible:text-emerald-700
                              dark:focus-visible:text-emerald-400
                            "
                          >
                            {product.title ||
                              "Product"}
                          </Link>

                          <p
                            className="
                              mt-2

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
                                firstItem.quantity ||
                                  0
                              )}
                            </span>
                          </p>

                          {remainingProducts >
                            0 && (
                            <p
                              className="
                                mt-2

                                text-xs
                                font-bold

                                text-emerald-700
                                dark:text-emerald-400
                              "
                            >
                              +{" "}
                              {
                                remainingProducts
                              }{" "}
                              more{" "}
                              {remainingProducts ===
                              1
                                ? "product"
                                : "products"}
                            </p>
                          )}

                          {/* Metadata */}

                          <div
                            className="
                              mt-4

                              flex
                              flex-wrap

                              gap-x-5
                              gap-y-2
                            "
                          >
                            <div
                              className="
                                flex
                                items-center
                                gap-1.5

                                text-xs

                                text-stone-500
                                dark:text-stone-400
                              "
                            >
                              <Package
                                size={14}
                                aria-hidden="true"
                                className="
                                  shrink-0
                                "
                              />

                              <span>
                                {itemCount}{" "}
                                {itemCount ===
                                1
                                  ? "item"
                                  : "items"}
                              </span>
                            </div>

                            <div
                              className="
                                flex
                                min-w-0
                                items-center
                                gap-1.5

                                text-xs

                                text-stone-500
                                dark:text-stone-400
                              "
                            >
                              <MapPin
                                size={14}
                                aria-hidden="true"
                                className="
                                  shrink-0
                                "
                              />

                              <span
                                className="
                                  truncate
                                "
                              >
                                {location}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="
                          flex
                          items-center
                          gap-3

                          rounded-xl

                          border
                          border-dashed
                          border-stone-300
                          dark:border-stone-700

                          bg-stone-50
                          dark:bg-stone-800/50

                          p-4
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

                            bg-white
                            dark:bg-stone-900

                            text-stone-400
                            dark:text-stone-500
                          "
                        >
                          <Package
                            size={19}
                            aria-hidden="true"
                          />
                        </div>

                        <p
                          className="
                            text-sm

                            text-stone-500
                            dark:text-stone-400
                          "
                        >
                          Product
                          information is
                          unavailable for
                          this order.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* =================================
                      Order Summary
                  ================================= */}

                  <div
                    className="
                      flex
                      flex-col

                      border-t
                      border-stone-200
                      dark:border-stone-800

                      pt-5

                      md:border-l
                      md:border-t-0
                      md:pl-6
                      md:pt-0
                    "
                  >
                    {/* Total */}

                    <div>
                      <p
                        className="
                          text-xs

                          text-stone-500
                          dark:text-stone-400
                        "
                      >
                        Order Total
                      </p>

                      <p
                        className="
                          mt-1

                          text-2xl
                          font-black

                          text-stone-900
                          dark:text-white
                        "
                      >
                        {formatPrice(
                          order.pricing
                            ?.total
                        )}
                      </p>
                    </div>

                    {/* Payment */}

                    <div
                      className="
                        mt-4
                      "
                    >
                      <p
                        className="
                          text-[10px]
                          font-black
                          uppercase
                          tracking-[0.1em]

                          text-stone-400
                          dark:text-stone-500
                        "
                      >
                        Payment
                      </p>

                      <p
                        className="
                          mt-1

                          text-xs
                          font-bold

                          text-stone-700
                          dark:text-stone-300
                        "
                      >
                        {order.payment
                          ?.label ||
                          "Payment information unavailable"}
                      </p>
                    </div>

                    {/* Details */}

                    <Link
  to={`/orders/${encodeURIComponent(
    order.id
  )}`}
  className="
    group

    mt-6

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

    text-xs
    font-black

    text-stone-700
    dark:text-stone-200

    transition-all
    duration-200

    hover:border-emerald-300
    hover:bg-emerald-50
    hover:text-emerald-700

    dark:hover:border-emerald-800
    dark:hover:bg-emerald-950/30
    dark:hover:text-emerald-400

    active:scale-[0.98]

    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-emerald-500
  "
>
  <ReceiptText
    size={15}
    aria-hidden="true"
  />

  View Details

  <ChevronRight
    size={14}
    aria-hidden="true"
    className="
      transition-transform

      group-hover:translate-x-1
    "
  />
</Link>
                  </div>
                </div>
              </article>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Orders;