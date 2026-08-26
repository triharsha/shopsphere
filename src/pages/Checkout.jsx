import {
  useCallback,
  useMemo,
  useState,
} from "react";

import {
  ArrowLeft,
  Check,
  ChevronRight,
  ImageOff,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Zap,
} from "lucide-react";

import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import toast from "react-hot-toast";

import {
  clearCart,
  selectCartItems,
} from "../features/cart/cartSlice";

import {
  selectCurrentUser,
} from "../features/auth/authSlice";

import {
  getUserData,
  updateUserData,
} from "../utils/storage";

import AddressSection from "../components/checkout/AddressSection";
import PaymentSection from "../components/checkout/PaymentSection";

import {
  DELIVERY_FEE,
  FREE_DELIVERY_THRESHOLD,
  USD_TO_INR,
} from "../constants/commerce";

const initialPaymentData = {
  upiId: "",
  cardNumber: "",
  cardName: "",
  expiry: "",
  cvv: "",
};

/* ========================================
   Checkout
======================================== */

const createOrderId = () => {
  const timestamp =
    Date.now()
      .toString()
      .slice(-8);

  const randomPart =
    Math.random()
      .toString(36)
      .substring(
        2,
        6
      )
      .toUpperCase();

  return `SS-${timestamp}-${randomPart}`;
};

const Checkout = () => {
  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const location =
    useLocation();

  /* ========================================
     Redux
  ======================================== */

  const cartItems =
    useSelector(
      selectCartItems
    );

  const currentUser =
    useSelector(
      selectCurrentUser
    );

  /* ========================================
     Checkout Source

     Normal checkout:
     Redux cart

     Buy Now:
     Router state item
  ======================================== */

  const buyNowItem =
    location.state?.buyNow
      ? location.state?.item
      : null;

  const isBuyNow =
    Boolean(
      buyNowItem?.product?.id
    );

  /* ========================================
     Safe Checkout Items

     Prevent malformed items or zero
     quantities from entering checkout.
  ======================================== */

  const checkoutItems =
    useMemo(() => {
      const rawCheckoutItems =
        isBuyNow
          ? [buyNowItem]
          : cartItems;

      if (
        !Array.isArray(
          rawCheckoutItems
        )
      ) {
        return [];
      }

      const seenIds =
        new Set();

      return rawCheckoutItems
        .filter(
          (item) => {
            const productId =
              item?.product?.id;

            const quantity =
              Number(
                item?.quantity ||
                  0
              );

            if (
              !productId ||
              quantity <= 0
            ) {
              return false;
            }

            const key =
              String(
                productId
              );

            if (
              seenIds.has(
                key
              )
            ) {
              return false;
            }

            seenIds.add(
              key
            );

            return true;
          }
        )
        .map(
          (item) => ({
            ...item,

            quantity:
              Math.max(
                1,
                Number(
                  item.quantity
                ) || 1
              ),
          })
        );
    }, [
      isBuyNow,
      buyNowItem,
      cartItems,
    ]);

  const checkoutCount =
    checkoutItems.reduce(
      (
        total,
        item
      ) =>
        total +
        Number(
          item.quantity || 0
        ),
      0
    );

  /* ========================================
     Address
  ======================================== */

  const [
    selectedAddress,
    setSelectedAddress,
  ] = useState(null);

  const handleSelectAddress =
    useCallback(
      (address) => {
        setSelectedAddress(
          address
        );
      },
      []
    );

  /* ========================================
     Payment
  ======================================== */

  const [
    paymentMethod,
    setPaymentMethod,
  ] = useState("");

  const [
    paymentData,
    setPaymentData,
  ] = useState(
    initialPaymentData
  );

  const [
    isPlacingOrder,
    setIsPlacingOrder,
  ] = useState(false);

  /* ========================================
     Payment Method Change

     Clear previous payment fields when
     switching methods so card/UPI values
     do not remain unnecessarily in memory.
  ======================================== */

  const handlePaymentMethodChange =
    (method) => {
      if (
        method ===
        paymentMethod
      ) {
        return;
      }

      setPaymentMethod(
        method
      );

      setPaymentData({
        ...initialPaymentData,
      });
    };

  const handlePaymentDataChange =
    (data) => {
      setPaymentData(
        data
      );
    };

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
      Number(value) || 0
    );
  };

  /* ========================================
     Totals
  ======================================== */

  const subtotal =
    checkoutItems.reduce(
      (
        total,
        item
      ) => {
        const price =
          Number(
            item.product?.price ||
              0
          ) *
          USD_TO_INR;

        const quantity =
          Number(
            item.quantity || 0
          );

        return (
          total +
          price * quantity
        );
      },
      0
    );

  const totalSavings =
    checkoutItems.reduce(
      (
        total,
        item
      ) => {
        const price =
          Number(
            item.product?.price ||
              0
          ) *
          USD_TO_INR;

        const discount =
          Number(
            item.product
              ?.discountPercentage ||
              0
          );

        const quantity =
          Number(
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
          (1 -
            discount / 100);

        return (
          total +
          (originalPrice -
            price) *
            quantity
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
    subtotal +
    deliveryFee;

  /* ========================================
     Payment Labels
  ======================================== */

  const paymentLabels = {
    upi: "UPI",

    card:
      "Credit / Debit Card",

    cod:
      "Cash on Delivery",
  };

  /* ========================================
     Checkout Status
  ======================================== */

  const hasAddress =
    Boolean(
      selectedAddress
    );

  const hasPaymentMethod =
    Boolean(
      paymentMethod
    );

  /* ========================================
     Quiet Payment Validation

     Used only for progress UI.
     Toast validation remains separate.
  ======================================== */

  const hasValidUpi =
    () => {
      const upiId =
        paymentData.upiId
          ?.trim();

      return /^[\w.-]+@[\w.-]+$/.test(
        upiId || ""
      );
    };

  const hasValidCard =
    () => {
      const cardNumber =
        paymentData.cardNumber
          ?.replace(
            /\s/g,
            ""
          ) || "";

      const cardName =
        paymentData.cardName
          ?.trim() || "";

      const expiry =
        paymentData.expiry
          ?.trim() || "";

      const cvv =
        paymentData.cvv
          ?.trim() || "";

      if (
        !/^\d{16}$/.test(
          cardNumber
        ) ||
        !cardName ||
        !/^\d{2}\/\d{2}$/.test(
          expiry
        ) ||
        !/^\d{3}$/.test(
          cvv
        )
      ) {
        return false;
      }

      const [
        monthString,
        yearString,
      ] = expiry.split(
        "/"
      );

      const month =
        Number(
          monthString
        );

      const year =
        Number(
          `20${yearString}`
        );

      if (
        month < 1 ||
        month > 12
      ) {
        return false;
      }

      const now =
        new Date();

      const currentYear =
        now.getFullYear();

      const currentMonth =
        now.getMonth() + 1;

      if (
        year <
          currentYear ||
        (year ===
          currentYear &&
          month <
            currentMonth)
      ) {
        return false;
      }

      return true;
    };

  const hasPaymentDetails =
    paymentMethod === "cod"
      ? true
      : paymentMethod ===
          "upi"
        ? hasValidUpi()
        : paymentMethod ===
            "card"
          ? hasValidCard()
          : false;

  const isCheckoutReady =
    hasAddress &&
    hasPaymentMethod &&
    hasPaymentDetails;

  /* ========================================
     Validate UPI
  ======================================== */

  const validateUpi =
    () => {
      const upiId =
        paymentData.upiId
          .trim();

      const upiPattern =
        /^[\w.-]+@[\w.-]+$/;

      if (!upiId) {
        toast.error(
          "Enter your UPI ID"
        );

        return false;
      }

      if (
        !upiPattern.test(
          upiId
        )
      ) {
        toast.error(
          "Enter a valid UPI ID"
        );

        return false;
      }

      return true;
    };

  /* ========================================
     Validate Card
  ======================================== */

  const validateCard =
    () => {
      const cardNumber =
        paymentData.cardNumber
          .replace(
            /\s/g,
            ""
          );

      const cardName =
        paymentData.cardName
          .trim();

      const expiry =
        paymentData.expiry
          .trim();

      const cvv =
        paymentData.cvv
          .trim();

      if (
        !/^\d{16}$/.test(
          cardNumber
        )
      ) {
        toast.error(
          "Enter a valid 16-digit card number"
        );

        return false;
      }

      if (!cardName) {
        toast.error(
          "Enter the name on the card"
        );

        return false;
      }

      if (
        !/^\d{2}\/\d{2}$/.test(
          expiry
        )
      ) {
        toast.error(
          "Enter card expiry as MM/YY"
        );

        return false;
      }

      const [
        monthString,
        yearString,
      ] = expiry.split(
        "/"
      );

      const month =
        Number(
          monthString
        );

      const year =
        Number(
          `20${yearString}`
        );

      if (
        month < 1 ||
        month > 12
      ) {
        toast.error(
          "Enter a valid expiry month"
        );

        return false;
      }

      const now =
        new Date();

      const currentYear =
        now.getFullYear();

      const currentMonth =
        now.getMonth() + 1;

      if (
        year <
          currentYear ||
        (year ===
          currentYear &&
          month <
            currentMonth)
      ) {
        toast.error(
          "This card has expired"
        );

        return false;
      }

      if (
        !/^\d{3}$/.test(
          cvv
        )
      ) {
        toast.error(
          "Enter a valid 3-digit CVV"
        );

        return false;
      }

      return true;
    };

  /* ========================================
     Validate Checkout
  ======================================== */

  const validateCheckout =
    () => {
      if (
        !selectedAddress
      ) {
        toast.error(
          "Please select a delivery address"
        );

        return false;
      }

      if (
        !paymentMethod
      ) {
        toast.error(
          "Please select a payment method"
        );

        return false;
      }

      if (
        paymentMethod ===
          "upi" &&
        !validateUpi()
      ) {
        return false;
      }

      if (
        paymentMethod ===
          "card" &&
        !validateCard()
      ) {
        return false;
      }

      return true;
    };

  /* ========================================
     Safe Payment Summary

     Never persist full card number,
     expiry or CVV.
  ======================================== */

  const buildPaymentSummary =
    () => {
      if (
        paymentMethod ===
        "upi"
      ) {
        return {
          method: "upi",

          label: "UPI",

          upiId:
            paymentData.upiId.trim(),
        };
      }

      if (
        paymentMethod ===
        "card"
      ) {
        const cardNumber =
          paymentData.cardNumber
            .replace(
              /\s/g,
              ""
            );

        return {
          method: "card",

          label:
            "Credit / Debit Card",

          cardHolder:
            paymentData.cardName.trim(),

          last4:
            cardNumber.slice(
              -4
            ),
        };
      }

      return {
        method: "cod",

        label:
          "Cash on Delivery",
      };
    };

  /* ========================================
     Place Order
  ======================================== */

  const handlePlaceOrder =
    () => {
      if (
        isPlacingOrder
      ) {
        return;
      }

      if (
        !currentUser?.id
      ) {
        toast.error(
          "Please sign in to place your order"
        );

        return;
      }

      if (
        checkoutItems.length ===
        0
      ) {
        toast.error(
          "Your checkout is empty"
        );

        return;
      }

      if (
        !validateCheckout()
      ) {
        return;
      }

      setIsPlacingOrder(
        true
      );

      try {
        const orderId =
          createOrderId();

        const order = {
          id: orderId,

          createdAt:
            new Date()
              .toISOString(),

          status:
            "Order Placed",

          checkoutType:
            isBuyNow
              ? "buy-now"
              : "cart",

          items:
            checkoutItems.map(
              ({
                product,
                quantity,
              }) => ({
                product: {
                  id:
                    product.id,

                  title:
                    product.title,

                  brand:
                    product.brand,

                  category:
                    product.category,

                  price:
                    product.price,

                  discountPercentage:
                    product.discountPercentage,

                  thumbnail:
                    product.thumbnail,
                },

                quantity:
                  Number(
                    quantity
                  ),
              })
            ),

          itemCount:
            checkoutCount,

          address: {
            ...selectedAddress,
          },

          payment:
            buildPaymentSummary(),

          pricing: {
            subtotal,

            savings:
              totalSavings,

            deliveryFee,

            total:
              grandTotal,

            currency:
              "INR",
          },
        };

        const userData =
          getUserData(
            currentUser.id
          );

        const existingOrders =
          Array.isArray(
            userData?.orders
          )
            ? userData.orders
            : [];

        const updatedOrders = [
          order,
          ...existingOrders,
        ];

        const saved =
          updateUserData(
            currentUser.id,
            "orders",
            updatedOrders
          );

        if (!saved) {
          toast.error(
            "Unable to save your order"
          );

          setIsPlacingOrder(
            false
          );

          return;
        }

        /*
          Only normal cart checkout
          should clear the cart.

          Buy Now must leave the
          existing cart untouched.
        */

        if (!isBuyNow) {
          dispatch(
            clearCart()
          );
        }

        toast.success(
          "Order placed successfully"
        );

        navigate(
          `/order-success?order=${encodeURIComponent(
            orderId
          )}`,
          {
            replace: true,

            state: {
              orderId,
            },
          }
        );
      } catch (error) {
        console.error(
          "Order creation failed:",
          error
        );

        toast.error(
          "Unable to place order. Please try again."
        );

        setIsPlacingOrder(
          false
        );
      }
    };

  /* ========================================
     Empty Checkout Protection
  ======================================== */

  if (
    checkoutItems.length ===
      0 &&
    !isPlacingOrder
  ) {
    return (
      <Navigate
        to="/cart"
        replace
      />
    );
  }

  /* ========================================
     Back Destination
  ======================================== */

  const backPath =
    isBuyNow
      ? `/product/${buyNowItem.product.id}`
      : "/cart";

  const backLabel =
    isBuyNow
      ? "Back to Product"
      : "Back to Cart";

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
            rounded

            transition-colors

            hover:text-emerald-700
            dark:hover:text-emerald-400

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-emerald-500
          "
        >
          Home
        </Link>

        <ChevronRight
          size={14}
          aria-hidden="true"
        />

        <Link
          to={
            backPath
          }
          className="
            rounded

            transition-colors

            hover:text-emerald-700
            dark:hover:text-emerald-400

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-emerald-500
          "
        >
          {isBuyNow
            ? "Product"
            : "Cart"}
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
          Checkout
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
            {isBuyNow ? (
              <Zap
                size={14}
                aria-hidden="true"
              />
            ) : (
              <PackageCheck
                size={14}
                aria-hidden="true"
              />
            )}

            {isBuyNow
              ? "Buy Now Checkout"
              : "Secure Checkout"}
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
            Complete Your Order
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
            Review your delivery
            information, payment
            method and order before
            placing your purchase.
          </p>
        </div>

        <Link
          to={
            backPath
          }
          className="
            inline-flex
            w-fit
            items-center
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

            text-stone-600
            dark:text-stone-300

            transition-colors

            hover:bg-stone-50
            hover:text-emerald-700

            dark:hover:bg-stone-800
            dark:hover:text-emerald-400
          "
        >
          <ArrowLeft
            size={15}
            aria-hidden="true"
          />

          {backLabel}
        </Link>
      </div>

      {/* =====================================
          Checkout Progress
      ===================================== */}

      <div
        className="
          mt-8

          grid
          gap-3

          sm:grid-cols-3
        "
      >
        {[
          {
            step: "01",

            title:
              "Delivery Address",

            status:
              hasAddress
                ? "complete"
                : "active",
          },

          {
            step: "02",

            title:
              "Payment Method",

            status:
              hasPaymentMethod &&
              hasPaymentDetails
                ? "complete"
                : hasAddress
                  ? "active"
                  : "pending",
          },

          {
            step: "03",

            title:
              "Confirm & Place Order",

            status:
              isCheckoutReady
                ? "active"
                : "pending",
          },
        ].map(
          ({
            step,
            title,
            status,
          }) => {
            const isComplete =
              status ===
              "complete";

            const isActive =
              status ===
              "active";

            return (
              <div
                key={step}
                className={`
                  flex
                  items-center
                  gap-3

                  rounded-2xl

                  border

                  px-4
                  py-4

                  transition-colors

                  ${
                    isComplete
                      ? `
                        border-emerald-200
                        dark:border-emerald-900

                        bg-emerald-50/50
                        dark:bg-emerald-950/10
                      `
                      : isActive
                        ? `
                          border-emerald-300
                          dark:border-emerald-800

                          bg-white
                          dark:bg-stone-900

                          ring-1
                          ring-emerald-500/10
                        `
                        : `
                          border-stone-200
                          dark:border-stone-800

                          bg-white
                          dark:bg-stone-900
                        `
                  }
                `}
              >
                <div
                  className={`
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center

                    rounded-xl

                    text-xs
                    font-black

                    ${
                      isComplete
                        ? `
                          bg-emerald-600

                          text-white
                        `
                        : isActive
                          ? `
                            bg-emerald-600

                            text-white

                            shadow-sm
                            shadow-emerald-600/20
                          `
                          : `
                            bg-stone-100
                            dark:bg-stone-800

                            text-stone-500
                            dark:text-stone-400
                          `
                    }
                  `}
                >
                  {isComplete ? (
                    <Check
                      size={17}
                      aria-hidden="true"
                    />
                  ) : (
                    step
                  )}
                </div>

                <div>
                  <p
                    className={`
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.12em]

                      ${
                        isActive
                          ? `
                            text-emerald-600
                            dark:text-emerald-400
                          `
                          : `
                            text-stone-400
                            dark:text-stone-500
                          `
                      }
                    `}
                  >
                    {isActive
                      ? `Current Step ${step}`
                      : `Step ${step}`}
                  </p>

                  <p
                    className="
                      mt-0.5

                      text-sm
                      font-bold

                      text-stone-900
                      dark:text-white
                    "
                  >
                    {title}
                  </p>
                </div>
              </div>
            );
          }
        )}
      </div>

      {/* =====================================
          Checkout Layout
      ===================================== */}

      <div
        className="
          mt-8

          grid
          gap-8

          lg:grid-cols-[minmax(0,1fr)_390px]
        "
      >
        {/* =====================================
            Left
        ===================================== */}

        <div
          className="
            min-w-0
            space-y-6
          "
        >
          <AddressSection
            userId={
              currentUser?.id
            }
            selectedAddress={
              selectedAddress
            }
            onSelectAddress={
              handleSelectAddress
            }
          />

          <PaymentSection
            paymentMethod={
              paymentMethod
            }
            onPaymentMethodChange={
              handlePaymentMethodChange
            }
            paymentData={
              paymentData
            }
            onPaymentDataChange={
              handlePaymentDataChange
            }
          />
        </div>

        {/* =====================================
            Order Summary
        ===================================== */}

        <aside>
          <div
            className="
              sticky
              top-28

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
                Products
            ================================= */}

            <div
              className="
                border-b
                border-stone-200
                dark:border-stone-800

                p-5
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
                <div>
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

                  <p
                    className="
                      mt-1

                      text-[11px]
                      font-semibold

                      text-stone-400
                      dark:text-stone-500
                    "
                  >
                    {isBuyNow
                      ? "Buy Now checkout"
                      : "Cart checkout"}
                  </p>
                </div>

                <span
                  className="
                    rounded-full

                    bg-stone-100
                    dark:bg-stone-800

                    px-2.5
                    py-1

                    text-xs
                    font-bold

                    text-stone-500
                    dark:text-stone-400
                  "
                >
                  {checkoutCount}{" "}
                  {checkoutCount === 1
                    ? "item"
                    : "items"}
                </span>
              </div>

              <div
                className="
                  mt-5

                  max-h-[320px]
                  space-y-4

                  overflow-y-auto
                  pr-1
                "
              >
                {checkoutItems.map(
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

                    return (
                      <div
                        key={
                          product.id
                        }
                        className="
                          flex
                          items-center
                          gap-3
                        "
                      >
                        <div
                          className="
                            flex
                            h-14
                            w-14
                            shrink-0
                            items-center
                            justify-center

                            overflow-hidden

                            rounded-xl

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
                              className="
                                h-full
                                w-full

                                object-contain

                                p-1.5
                              "
                            />
                          ) : (
                            <ImageOff
                              size={20}
                              aria-hidden="true"
                              className="
                                text-stone-400
                                dark:text-stone-600
                              "
                            />
                          )}
                        </div>

                        <div
                          className="
                            min-w-0
                            flex-1
                          "
                        >
                          <p
                            className="
                              truncate

                              text-xs
                              font-bold

                              text-stone-900
                              dark:text-white
                            "
                            title={
                              product.title
                            }
                          >
                            {
                              product.title
                            }
                          </p>

                          <p
                            className="
                              mt-1

                              text-[11px]

                              text-stone-400
                              dark:text-stone-500
                            "
                          >
                            Qty:{" "}
                            {quantity}
                          </p>
                        </div>

                        <p
                          className="
                            shrink-0

                            text-xs
                            font-black

                            text-stone-900
                            dark:text-white
                          "
                        >
                          {formatPrice(
                            price *
                              quantity
                          )}
                        </p>
                      </div>
                    );
                  }
                )}
              </div>
            </div>

            <div
              className="
                p-5
              "
            >
              <div
                className="
                  space-y-4
                "
              >
                <div
                  className="
                    flex
                    justify-between
                    gap-4

                    text-sm
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
                      subtotal
                    )}
                  </span>
                </div>

                {totalSavings >
                  0 && (
                  <div
                    className="
                      flex
                      justify-between
                      gap-4

                      text-sm
                    "
                  >
                    <span
                      className="
                        text-stone-500
                        dark:text-stone-400
                      "
                    >
                      You save
                    </span>

                    <span
                      className="
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

                <div
                  className="
                    flex
                    justify-between
                    gap-4

                    text-sm
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
                    className={`
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
                    {deliveryFee ===
                    0
                      ? "FREE"
                      : formatPrice(
                          deliveryFee
                        )}
                  </span>
                </div>

                {deliveryFee ===
                  0 && (
                  <div
                    className="
                      flex
                      items-center
                      gap-2

                      rounded-xl

                      bg-emerald-50
                      dark:bg-emerald-950/20

                      px-3
                      py-2.5
                    "
                  >
                    <Truck
                      size={15}
                      aria-hidden="true"
                      className="
                        shrink-0

                        text-emerald-700
                        dark:text-emerald-400
                      "
                    />

                    <p
                      className="
                        text-[11px]
                        font-semibold

                        text-emerald-700
                        dark:text-emerald-400
                      "
                    >
                      Free delivery applied
                      to this order.
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

                        text-[10px]

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

              <div
                className="
                  mt-5

                  rounded-xl

                  bg-stone-50
                  dark:bg-stone-800/60

                  px-4
                  py-3
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
                  Delivery To
                </p>

                {selectedAddress ? (
                  <>
                    <p
                      className="
                        mt-2

                        text-sm
                        font-black

                        text-stone-900
                        dark:text-white
                      "
                    >
                      {
                        selectedAddress.fullName
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
                        selectedAddress.addressLine
                      }
                      ,{" "}
                      {
                        selectedAddress.city
                      }
                      ,{" "}
                      {
                        selectedAddress.state
                      }{" "}
                      -{" "}
                      {
                        selectedAddress.postalCode
                      }
                    </p>
                  </>
                ) : (
                  <p
                    className="
                      mt-2

                      text-xs
                      font-semibold

                      text-amber-600
                      dark:text-amber-400
                    "
                  >
                    Select a delivery
                    address.
                  </p>
                )}
              </div>

              <div
                className="
                  mt-3

                  rounded-xl

                  bg-stone-50
                  dark:bg-stone-800/60

                  px-4
                  py-3
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

                {paymentMethod ? (
                  <>
                    <p
                      className="
                        mt-2

                        text-sm
                        font-black

                        text-stone-900
                        dark:text-white
                      "
                    >
                      {
                        paymentLabels[
                          paymentMethod
                        ]
                      }
                    </p>

                    {!hasPaymentDetails &&
                      paymentMethod !==
                        "cod" && (
                        <p
                          className="
                            mt-1

                            text-[11px]
                            font-semibold

                            text-amber-600
                            dark:text-amber-400
                          "
                        >
                          Complete your
                          payment details.
                        </p>
                      )}
                  </>
                ) : (
                  <p
                    className="
                      mt-2

                      text-xs
                      font-semibold

                      text-amber-600
                      dark:text-amber-400
                    "
                  >
                    Select a payment
                    method.
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={
                  handlePlaceOrder
                }
                disabled={
                  isPlacingOrder
                }
                className="
                  mt-6

                  inline-flex
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

                  active:scale-[0.98]

                  disabled:cursor-not-allowed
                  disabled:opacity-60

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-emerald-500
                  focus-visible:ring-offset-2

                  dark:focus-visible:ring-offset-stone-900
                "
              >
                <PackageCheck
                  size={17}
                  aria-hidden="true"
                />

                {isPlacingOrder
                  ? "Placing Order..."
                  : "Place Order"}
              </button>

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

                Secure checkout
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div
        className="
          mt-8

          flex
          items-center
          gap-3

          rounded-xl

          border
          border-stone-200
          dark:border-stone-800

          bg-stone-50
          dark:bg-stone-900

          px-4
          py-3

          text-xs

          text-stone-500
          dark:text-stone-400
        "
      >
        <ShoppingBag
          size={15}
          aria-hidden="true"
          className="
            shrink-0
          "
        />

        <span>
          Checking out as{" "}

          <strong
            className="
              font-bold

              text-stone-900
              dark:text-white
            "
          >
            {currentUser?.name ||
              currentUser?.email ||
              "ShopSphere User"}
          </strong>
        </span>
      </div>
    </div>
  );
};

export default Checkout;