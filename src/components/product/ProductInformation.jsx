import {
  Box,
  Package,
  RotateCcw,
  Ruler,
  ShieldCheck,
  Tag,
  Truck,
  Weight,
} from "lucide-react";

/* ========================================
   Helpers
======================================== */

const formatCategory = (
  value
) => {
  if (!value) {
    return "Not specified";
  }

  return value
    .replaceAll("-", " ")
    .replace(
      /\b\w/g,
      (letter) =>
        letter.toUpperCase()
    );
};

const formatDimensionValue = (
  value
) => {
  const number =
    Number(value);

  return Number.isFinite(
    number
  )
    ? number
    : "—";
};

const getAvailabilityText = (
  stock
) => {
  if (stock <= 0) {
    return "Currently out of stock";
  }

  if (stock <= 5) {
    return `Only ${stock} ${
      stock === 1
        ? "unit"
        : "units"
    } left`;
  }

  if (stock <= 10) {
    return "Limited stock available";
  }

  return "Ready to ship";
};

/* ========================================
   Product Information
======================================== */

const ProductInformation = ({
  product,
}) => {
  const dimensions =
    product?.dimensions;

  const hasDimensions =
    dimensions &&
    [
      dimensions.width,
      dimensions.height,
      dimensions.depth,
    ].some(
      (value) =>
        value != null
    );

  const dimensionText =
    hasDimensions
      ? `${formatDimensionValue(
          dimensions.width
        )} × ${formatDimensionValue(
          dimensions.height
        )} × ${formatDimensionValue(
          dimensions.depth
        )}`
      : "Not specified";

  const weight =
    product?.weight != null
      ? `${product.weight}`
      : "Not specified";

  const stock =
    Number(
      product?.stock || 0
    );

  /* ========================================
     Product Details
  ======================================== */

  const details = [
    {
      label: "Brand",

      value:
        product?.brand ||
        "Not specified",

      icon: Box,
    },

    {
      label: "Category",

      value:
        formatCategory(
          product?.category
        ),

      icon: Tag,
    },

    {
      label: "SKU",

      value:
        product?.sku ||
        "Not specified",

      icon: Package,
    },

    {
      label: "Weight",

      value: weight,

      icon: Weight,
    },

    {
      label: "Dimensions",

      value:
        dimensionText,

      icon: Ruler,
    },
  ];

  /* ========================================
     Shopping Information
  ======================================== */

  const shoppingInfo = [
    {
      title: "Warranty",

      value:
        product?.warrantyInformation ||
        "Warranty information unavailable",

      icon: ShieldCheck,
    },

    {
      title: "Shipping",

      value:
        product?.shippingInformation ||
        "Shipping information unavailable",

      icon: Truck,
    },

    {
      title:
        "Return Policy",

      value:
        product?.returnPolicy ||
        "Return information unavailable",

      icon: RotateCcw,
    },

    {
      title:
        "Availability",

      value:
        getAvailabilityText(
          stock
        ),

      icon: Package,
    },
  ];

  /* ========================================
     Tags

     Remove empty and duplicate values.
  ======================================== */

  const tags =
    Array.isArray(
      product?.tags
    )
      ? [
          ...new Set(
            product.tags
              .filter(Boolean)
              .map(
                (tag) =>
                  String(
                    tag
                  ).trim()
              )
              .filter(Boolean)
          ),
        ]
      : [];

  return (
    <section
      className="
        mt-14

        border-t
        border-stone-200
        dark:border-stone-800

        pt-10
      "
    >
      {/* =====================================
          Heading
      ===================================== */}

      <div>
        <p
          className="
            text-xs
            font-black
            uppercase
            tracking-[0.14em]

            text-emerald-700
            dark:text-emerald-400
          "
        >
          Know Your Product
        </p>

        <h2
          className="
            mt-2

            text-2xl
            font-black
            tracking-tight

            text-stone-900
            dark:text-white

            sm:text-3xl
          "
        >
          Product Information
        </h2>

        <p
          className="
            mt-2
            max-w-2xl

            text-sm
            leading-6

            text-stone-500
            dark:text-stone-400
          "
        >
          Technical details,
          shipping information and
          important purchase
          policies for this product.
        </p>
      </div>

      {/* =====================================
          Information Grid
      ===================================== */}

      <div
        className="
          mt-8

          grid
          gap-6

          lg:grid-cols-2
        "
      >
        {/* =====================================
            Product Details
        ===================================== */}

        <div
          className="
            overflow-hidden

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
          <h3
            className="
              text-lg
              font-black

              text-stone-900
              dark:text-white
            "
          >
            Product Details
          </h3>

          <p
            className="
              mt-1

              text-xs
              leading-5

              text-stone-400
              dark:text-stone-500
            "
          >
            Core specifications and
            identification details.
          </p>

          <div
            className="
              mt-5

              divide-y
              divide-stone-100
              dark:divide-stone-800
            "
          >
            {details.map(
              ({
                label,
                value,
                icon: Icon,
              }) => (
                <div
                  key={
                    label
                  }
                  className="
                    flex
                    flex-col
                    gap-3

                    py-4

                    first:pt-0
                    last:pb-0

                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    sm:gap-5
                  "
                >
                  {/* Label */}

                  <div
                    className="
                      flex
                      min-w-0
                      items-center
                      gap-3
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

                        text-emerald-700
                        dark:text-emerald-400
                      "
                    >
                      <Icon
                        size={16}
                        aria-hidden="true"
                      />
                    </div>

                    <span
                      className="
                        text-sm
                        font-semibold

                        text-stone-500
                        dark:text-stone-400
                      "
                    >
                      {label}
                    </span>
                  </div>

                  {/* Value */}

                  <span
                    className="
                      break-words

                      pl-12

                      text-sm
                      font-bold

                      text-stone-900
                      dark:text-white

                      sm:max-w-[60%]
                      sm:pl-0
                      sm:text-right
                    "
                  >
                    {value}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* =====================================
            Shopping Information
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

            sm:p-6
          "
        >
          <h3
            className="
              text-lg
              font-black

              text-stone-900
              dark:text-white
            "
          >
            Shopping Information
          </h3>

          <p
            className="
              mt-1

              text-xs
              leading-5

              text-stone-400
              dark:text-stone-500
            "
          >
            Delivery, returns and
            after-purchase information.
          </p>

          <div
            className="
              mt-5
              space-y-3
            "
          >
            {shoppingInfo.map(
              ({
                title,
                value,
                icon: Icon,
              }) => (
                <div
                  key={
                    title
                  }
                  className="
                    flex
                    items-start
                    gap-4

                    rounded-xl

                    border
                    border-transparent

                    bg-stone-50
                    dark:bg-stone-800/60

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

                      text-emerald-700
                      dark:text-emerald-400

                      shadow-sm
                    "
                  >
                    <Icon
                      size={18}
                      aria-hidden="true"
                    />
                  </div>

                  <div
                    className="
                      min-w-0
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
                      {title}
                    </p>

                    <p
                      className="
                        mt-1

                        break-words

                        text-xs
                        leading-5

                        text-stone-500
                        dark:text-stone-400
                      "
                    >
                      {value}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* =====================================
          Product Tags
      ===================================== */}

      {tags.length > 0 && (
        <div
          className="
            mt-6

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
          <h3
            className="
              text-sm
              font-black

              text-stone-900
              dark:text-white
            "
          >
            Product Tags
          </h3>

          <p
            className="
              mt-1

              text-xs

              text-stone-400
              dark:text-stone-500
            "
          >
            Helpful keywords
            associated with this
            product.
          </p>

          <div
            className="
              mt-4

              flex
              flex-wrap
              gap-2
            "
          >
            {tags.map(
              (tag) => (
                <span
                  key={tag}
                  className="
                    rounded-full

                    border
                    border-stone-200
                    dark:border-stone-700

                    bg-stone-50
                    dark:bg-stone-800

                    px-3
                    py-1.5

                    text-xs
                    font-semibold

                    text-stone-600
                    dark:text-stone-300
                  "
                >
                  #{tag}
                </span>
              )
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductInformation;