import {
  Banknote,
  Check,
  CreditCard,
  Smartphone,
} from "lucide-react";

/* =====================================
   Payment Option
===================================== */

const PaymentOption = ({
  value,
  icon: Icon,
  title,
  description,
  paymentMethod,
  onPaymentMethodChange,
}) => {
  const selected =
    paymentMethod === value;

  return (
    <button
      type="button"
      onClick={() =>
        onPaymentMethodChange(
          value
        )
      }
      className={`
        relative
        w-full

        rounded-xl

        border

        p-4

        text-left

        transition-all

        ${
          selected
            ? `
              border-emerald-500

              bg-emerald-50/70
              dark:bg-emerald-950/20

              ring-2
              ring-emerald-500/10
            `
            : `
              border-stone-200
              dark:border-stone-700

              hover:border-emerald-300
              dark:hover:border-emerald-800
            `
        }
      `}
    >
      <div
        className="
          flex
          items-start
          gap-3
        "
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

            ${
              selected
                ? `
                  bg-emerald-100
                  dark:bg-emerald-950/50

                  text-emerald-700
                  dark:text-emerald-400
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
          <Icon size={18} />
        </div>

        <div className="flex-1">
          <p
            className="
              text-sm
              font-black

              text-stone-900
              dark:text-white
            "
          >
            {title}
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
            {description}
          </p>
        </div>

        <div
          className={`
            flex
            h-5
            w-5
            shrink-0
            items-center
            justify-center

            rounded-full

            border

            ${
              selected
                ? `
                  border-emerald-600
                  bg-emerald-600

                  text-white
                `
                : `
                  border-stone-300
                  dark:border-stone-600
                `
            }
          `}
        >
          {selected && (
            <Check size={12} />
          )}
        </div>
      </div>
    </button>
  );
};

const PaymentSection = ({
  paymentMethod,
  onPaymentMethodChange,
  paymentData,
  onPaymentDataChange,
}) => {
  /* =====================================
     Generic Input Change
  ===================================== */

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    onPaymentDataChange({
      ...paymentData,
      [name]: value,
    });
  };

  /* =====================================
     Card Number Formatting
  ===================================== */

  const handleCardNumberChange =
    (event) => {
      const numbersOnly =
        event.target.value
          .replace(/\D/g, "")
          .slice(0, 16);

      const formatted =
        numbersOnly.replace(
          /(\d{4})(?=\d)/g,
          "$1 "
        );

      onPaymentDataChange({
        ...paymentData,
        cardNumber:
          formatted,
      });
    };

  /* =====================================
     Expiry Formatting
  ===================================== */

  const handleExpiryChange = (
    event
  ) => {
    let value =
      event.target.value
        .replace(/\D/g, "")
        .slice(0, 4);

    if (value.length > 2) {
      value = `${value.slice(
        0,
        2
      )}/${value.slice(2)}`;
    }

    onPaymentDataChange({
      ...paymentData,
      expiry: value,
    });
  };

  /* =====================================
     CVV
  ===================================== */

  const handleCvvChange = (
    event
  ) => {
    const value =
      event.target.value
        .replace(/\D/g, "")
        .slice(0, 3);

    onPaymentDataChange({
      ...paymentData,
      cvv: value,
    });
  };



  return (
    <section
      className="
        rounded-2xl

        border
        border-stone-200
        dark:border-stone-800

        bg-white
        dark:bg-stone-900

        p-5

        sm:p-6
      "
    >
      {/* Header */}

      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center

            rounded-xl

            bg-emerald-50
            dark:bg-emerald-950/30

            text-emerald-700
            dark:text-emerald-400
          "
        >
          <CreditCard size={19} />
        </div>

        <div>
          <h2
            className="
              text-lg
              font-black

              text-stone-900
              dark:text-white
            "
          >
            Payment Method
          </h2>

          <p
            className="
              mt-0.5

              text-xs

              text-stone-500
              dark:text-stone-400
            "
          >
            Choose how you would
            like to pay.
          </p>
        </div>
      </div>

      {/* Payment Options */}

      <div
        className="
          mt-6

          grid
          gap-3
        "
      >
        <PaymentOption
          value="upi"
          icon={Smartphone}
          title="UPI"
          description="Pay using your UPI ID."
          paymentMethod={paymentMethod}
          onPaymentMethodChange={onPaymentMethodChange}
        />

        <PaymentOption
          value="card"
          icon={CreditCard}
          title="Credit / Debit Card"
          description="Use a Visa, Mastercard or other card."
          paymentMethod={paymentMethod}
          onPaymentMethodChange={onPaymentMethodChange}
        />

        <PaymentOption
          value="cod"
          icon={Banknote}
          title="Cash on Delivery"
          description="Pay when your order arrives."
          paymentMethod={paymentMethod}
          onPaymentMethodChange={onPaymentMethodChange}
        />
      </div>

      {/* =====================================
          UPI
      ===================================== */}

      {paymentMethod ===
        "upi" && (
        <div
          className="
            mt-5

            rounded-xl

            bg-stone-50
            dark:bg-stone-800/50

            p-4
          "
        >
          <label
            htmlFor="upiId"
            className="
              mb-2
              block

              text-xs
              font-bold

              text-stone-600
              dark:text-stone-300
            "
          >
            UPI ID
          </label>

          <input
            id="upiId"
            name="upiId"
            value={
              paymentData.upiId
            }
            onChange={
              handleChange
            }
            placeholder="example@upi"
            autoComplete="off"
            className="
              w-full

              rounded-xl

              border
              border-stone-200
              dark:border-stone-700

              bg-white
              dark:bg-stone-900

              px-4
              py-3

              text-sm

              text-stone-900
              dark:text-white

              outline-none

              focus:border-emerald-500
              focus:ring-4
              focus:ring-emerald-500/10
            "
          />

          <p
            className="
              mt-2

              text-[11px]

              text-stone-400
            "
          >
            Example:
            name@upi
          </p>
        </div>
      )}

      {/* =====================================
          Card
      ===================================== */}

      {paymentMethod ===
        "card" && (
        <div
          className="
            mt-5

            rounded-xl

            bg-stone-50
            dark:bg-stone-800/50

            p-4
          "
        >
          <div
            className="
              grid
              gap-4

              sm:grid-cols-2
            "
          >
            {/* Card Number */}

            <div
              className="
                sm:col-span-2
              "
            >
              <label
                htmlFor="cardNumber"
                className="
                  mb-2
                  block

                  text-xs
                  font-bold

                  text-stone-600
                  dark:text-stone-300
                "
              >
                Card Number
              </label>

              <input
                id="cardNumber"
                name="cardNumber"
                inputMode="numeric"
                value={
                  paymentData.cardNumber
                }
                onChange={
                  handleCardNumberChange
                }
                placeholder="1234 5678 9012 3456"
                autoComplete="off"
                className="
                  w-full

                  rounded-xl

                  border
                  border-stone-200
                  dark:border-stone-700

                  bg-white
                  dark:bg-stone-900

                  px-4
                  py-3

                  text-sm

                  text-stone-900
                  dark:text-white

                  outline-none

                  focus:border-emerald-500
                  focus:ring-4
                  focus:ring-emerald-500/10
                "
              />
            </div>

            {/* Name */}

            <div
              className="
                sm:col-span-2
              "
            >
              <label
                htmlFor="cardName"
                className="
                  mb-2
                  block

                  text-xs
                  font-bold

                  text-stone-600
                  dark:text-stone-300
                "
              >
                Name on Card
              </label>

              <input
                id="cardName"
                name="cardName"
                value={
                  paymentData.cardName
                }
                onChange={
                  handleChange
                }
                placeholder="Name on card"
                autoComplete="off"
                className="
                  w-full

                  rounded-xl

                  border
                  border-stone-200
                  dark:border-stone-700

                  bg-white
                  dark:bg-stone-900

                  px-4
                  py-3

                  text-sm

                  text-stone-900
                  dark:text-white

                  outline-none

                  focus:border-emerald-500
                  focus:ring-4
                  focus:ring-emerald-500/10
                "
              />
            </div>

            {/* Expiry */}

            <div>
              <label
                htmlFor="expiry"
                className="
                  mb-2
                  block

                  text-xs
                  font-bold

                  text-stone-600
                  dark:text-stone-300
                "
              >
                Expiry
              </label>

              <input
                id="expiry"
                name="expiry"
                inputMode="numeric"
                value={
                  paymentData.expiry
                }
                onChange={
                  handleExpiryChange
                }
                placeholder="MM/YY"
                autoComplete="off"
                className="
                  w-full

                  rounded-xl

                  border
                  border-stone-200
                  dark:border-stone-700

                  bg-white
                  dark:bg-stone-900

                  px-4
                  py-3

                  text-sm

                  text-stone-900
                  dark:text-white

                  outline-none

                  focus:border-emerald-500
                  focus:ring-4
                  focus:ring-emerald-500/10
                "
              />
            </div>

            {/* CVV */}

            <div>
              <label
                htmlFor="cvv"
                className="
                  mb-2
                  block

                  text-xs
                  font-bold

                  text-stone-600
                  dark:text-stone-300
                "
              >
                CVV
              </label>

              <input
                id="cvv"
                name="cvv"
                type="password"
                inputMode="numeric"
                value={
                  paymentData.cvv
                }
                onChange={
                  handleCvvChange
                }
                placeholder="123"
                autoComplete="off"
                className="
                  w-full

                  rounded-xl

                  border
                  border-stone-200
                  dark:border-stone-700

                  bg-white
                  dark:bg-stone-900

                  px-4
                  py-3

                  text-sm

                  text-stone-900
                  dark:text-white

                  outline-none

                  focus:border-emerald-500
                  focus:ring-4
                  focus:ring-emerald-500/10
                "
              />
            </div>
          </div>

          <p
            className="
              mt-4

              text-[11px]
              leading-5

              text-stone-400
            "
          >
            For your security,
            full card details are not
            saved.
          </p>
        </div>
      )}

      {/* =====================================
          COD
      ===================================== */}

      {paymentMethod ===
        "cod" && (
        <div
          className="
            mt-5

            rounded-xl

            border
            border-emerald-100
            dark:border-emerald-900

            bg-emerald-50/60
            dark:bg-emerald-950/20

            p-4
          "
        >
          <div
            className="
              flex
              items-start
              gap-3
            "
          >
            <Banknote
              size={18}
              className="
                mt-0.5
                shrink-0

                text-emerald-700
                dark:text-emerald-400
              "
            />

            <div>
              <p
                className="
                  text-sm
                  font-black

                  text-stone-900
                  dark:text-white
                "
              >
                Cash on Delivery
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
                Pay for your order
                when it is delivered
                to your selected
                address.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PaymentSection;