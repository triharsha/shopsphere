import {
  MessageSquareText,
  Star,
} from "lucide-react";

/* ========================================
   Helpers
======================================== */

const clampRating = (
  value
) => {
  const rating =
    Number(value);

  if (
    !Number.isFinite(rating)
  ) {
    return 0;
  }

  return Math.min(
    5,
    Math.max(0, rating)
  );
};

const formatDate = (
  date
) => {
  if (!date) {
    return "Date unavailable";
  }

  const parsedDate =
    new Date(date);

  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {
    return String(date);
  }

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  ).format(parsedDate);
};

const getInitial = (
  name
) => {
  const value =
    String(
      name || ""
    ).trim();

  return value
    ? value
        .charAt(0)
        .toUpperCase()
    : "C";
};

/* ========================================
   Product Reviews
======================================== */

const ProductReviews = ({
  product,
}) => {
  const reviews =
    Array.isArray(
      product?.reviews
    )
      ? product.reviews
      : [];

  const productRating =
    clampRating(
      product?.rating
    );

  /* ========================================
     Average Rating

     Prefer review data when reviews exist.
     Otherwise use product rating only as
     general product metadata.
  ======================================== */

  const calculatedRating =
    reviews.length > 0
      ? reviews.reduce(
          (
            total,
            review
          ) =>
            total +
            clampRating(
              review?.rating
            ),
          0
        ) / reviews.length
      : productRating;

  /* ========================================
     Rating Distribution
  ======================================== */

  const ratingDistribution =
    [5, 4, 3, 2, 1].map(
      (rating) => {
        const count =
          reviews.filter(
            (review) =>
              Math.round(
                clampRating(
                  review?.rating
                )
              ) === rating
          ).length;

        const percentage =
          reviews.length > 0
            ? Math.round(
                (count /
                  reviews.length) *
                  100
              )
            : 0;

        return {
          rating,
          count,
          percentage,
        };
      }
    );

  /* ========================================
     Stars
  ======================================== */

  const renderStars = (
    rating,
    size = 16
  ) => {
    const safeRating =
      clampRating(rating);

    return Array.from({
      length: 5,
    }).map(
      (_, index) => {
        const isFilled =
          index <
          Math.round(
            safeRating
          );

        return (
          <Star
            key={index}
            size={size}
            aria-hidden="true"
            fill={
              isFilled
                ? "currentColor"
                : "none"
            }
            className={
              isFilled
                ? `
                  text-amber-400
                `
                : `
                  text-stone-300
                  dark:text-stone-700
                `
            }
          />
        );
      }
    );
  };

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
          Header
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
          Customer Feedback
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
          Customer Reviews
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
          See what shoppers are
          saying about this product.
        </p>
      </div>

      {/* =====================================
          Reviews Layout
      ===================================== */}

      <div
        className="
          mt-8

          grid
          gap-6

          lg:grid-cols-[300px_minmax(0,1fr)]
        "
      >
        {/* =====================================
            Rating Summary
        ===================================== */}

        <div
          className="
            h-fit

            rounded-2xl

            border
            border-stone-200
            dark:border-stone-800

            bg-white
            dark:bg-stone-900

            p-6

            shadow-sm
          "
        >
          {/* Score */}

          <div
            className="
              text-center
            "
          >
            <p
              className="
                text-5xl
                font-black
                tracking-tight

                text-stone-900
                dark:text-white
              "
            >
              {calculatedRating.toFixed(
                1
              )}
            </p>

            <div
              className="
                mt-3

                flex
                items-center
                justify-center
                gap-1
              "
              aria-label={`${calculatedRating.toFixed(
                1
              )} out of 5 stars`}
            >
              {renderStars(
                calculatedRating,
                17
              )}
            </div>

            <p
              className="
                mt-3

                text-sm
                font-semibold

                text-stone-500
                dark:text-stone-400
              "
            >
              {reviews.length >
              0 ? (
                <>
                  Based on{" "}
                  <span
                    className="
                      font-black

                      text-stone-700
                      dark:text-stone-200
                    "
                  >
                    {
                      reviews.length
                    }
                  </span>{" "}
                  {reviews.length ===
                  1
                    ? "review"
                    : "reviews"}
                </>
              ) : (
                "No customer reviews yet"
              )}
            </p>
          </div>

          {/* =====================================
              Distribution
          ===================================== */}

          {reviews.length >
            0 && (
            <>
              <div
                className="
                  my-6

                  h-px

                  bg-stone-200
                  dark:bg-stone-800
                "
              />

              <div
                className="
                  space-y-2.5
                "
              >
                {ratingDistribution.map(
                  ({
                    rating,
                    count,
                    percentage,
                  }) => (
                    <div
                      key={
                        rating
                      }
                      className="
                        flex
                        items-center
                        gap-2
                      "
                    >
                      <span
                        className="
                          w-3

                          text-xs
                          font-bold

                          text-stone-600
                          dark:text-stone-300
                        "
                      >
                        {
                          rating
                        }
                      </span>

                      <Star
                        size={12}
                        fill="currentColor"
                        aria-hidden="true"
                        className="
                          shrink-0

                          text-amber-400
                        "
                      />

                      <div
                        className="
                          h-2
                          min-w-0
                          flex-1

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

                            bg-amber-400

                            transition-all
                            duration-300
                          "
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>

                      <span
                        className="
                          w-6

                          text-right
                          text-xs
                          font-semibold

                          text-stone-400
                          dark:text-stone-500
                        "
                      >
                        {
                          count
                        }
                      </span>
                    </div>
                  )
                )}
              </div>

              <div
                className="
                  mt-6

                  flex
                  justify-center
                "
              >
                <span
                  className="
                    inline-flex
                    items-center
                    gap-2

                    rounded-full

                    bg-stone-100
                    dark:bg-stone-800

                    px-3
                    py-1.5

                    text-xs
                    font-bold

                    text-stone-600
                    dark:text-stone-300
                  "
                >
                  <MessageSquareText
                    size={14}
                    aria-hidden="true"
                  />

                  Customer feedback
                </span>
              </div>
            </>
          )}
        </div>

        {/* =====================================
            Review List
        ===================================== */}

        <div
          className="
            min-w-0
            space-y-4
          "
        >
          {reviews.length ===
          0 ? (
            /* =================================
               Empty State
            ================================= */

            <div
              className="
                flex
                min-h-[300px]
                flex-col
                items-center
                justify-center

                rounded-2xl

                border
                border-dashed
                border-stone-300
                dark:border-stone-700

                bg-white
                dark:bg-stone-900

                px-6
                py-12

                text-center
              "
            >
              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center

                  rounded-2xl

                  bg-stone-100
                  dark:bg-stone-800
                "
              >
                <MessageSquareText
                  size={25}
                  aria-hidden="true"
                  className="
                    text-stone-400
                    dark:text-stone-500
                  "
                />
              </div>

              <h3
                className="
                  mt-5

                  text-lg
                  font-black

                  text-stone-900
                  dark:text-white
                "
              >
                No reviews yet
              </h3>

              <p
                className="
                  mt-2
                  max-w-sm

                  text-sm
                  leading-6

                  text-stone-500
                  dark:text-stone-400
                "
              >
                Customer reviews
                for this product
                aren't available
                yet.
              </p>
            </div>
          ) : (
            reviews.map(
              (
                review,
                index
              ) => {
                const reviewerName =
                  String(
                    review?.reviewerName ||
                      review?.name ||
                      "ShopSphere Customer"
                  ).trim() ||
                  "ShopSphere Customer";

                const reviewRating =
                  clampRating(
                    review?.rating
                  );

                const comment =
                  String(
                    review?.comment ||
                      review?.body ||
                      ""
                  ).trim();

                return (
                  <article
                    key={
                      review?.id ||
                      `${reviewerName}-${review?.date || index}-${index}`
                    }
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

                      transition-shadow
                      duration-200

                      hover:shadow-md

                      sm:p-6
                    "
                  >
                    {/* =================================
                        Reviewer Header
                    ================================= */}

                    <div
                      className="
                        flex
                        flex-col
                        gap-4

                        sm:flex-row
                        sm:items-start
                        sm:justify-between
                      "
                    >
                      <div
                        className="
                          flex
                          min-w-0
                          items-center
                          gap-3
                        "
                      >
                        {/* Avatar */}

                        <div
                          className="
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center

                            rounded-full

                            bg-emerald-100
                            dark:bg-emerald-950

                            text-sm
                            font-black

                            text-emerald-700
                            dark:text-emerald-400
                          "
                          aria-hidden="true"
                        >
                          {getInitial(
                            reviewerName
                          )}
                        </div>

                        {/* Reviewer */}

                        <div
                          className="
                            min-w-0
                          "
                        >
                          <p
                            className="
                              break-words

                              text-sm
                              font-black

                              text-stone-900
                              dark:text-white
                            "
                          >
                            {
                              reviewerName
                            }
                          </p>

                          <p
                            className="
                              mt-0.5

                              text-xs

                              text-stone-400
                              dark:text-stone-500
                            "
                          >
                            Customer
                            review
                          </p>
                        </div>
                      </div>

                      {/* Date */}

                      <time
                        dateTime={
                          review?.date ||
                          undefined
                        }
                        className="
                          shrink-0

                          text-xs
                          font-medium

                          text-stone-400
                          dark:text-stone-500
                        "
                      >
                        {formatDate(
                          review?.date
                        )}
                      </time>
                    </div>

                    {/* =================================
                        Review Rating
                    ================================= */}

                    <div
                      className="
                        mt-5

                        flex
                        flex-wrap
                        items-center
                        gap-2
                      "
                    >
                      <div
                        className="
                          flex
                          gap-1
                        "
                        aria-label={`${reviewRating.toFixed(
                          1
                        )} out of 5 stars`}
                      >
                        {renderStars(
                          reviewRating
                        )}
                      </div>

                      <span
                        className="
                          text-xs
                          font-black

                          text-stone-600
                          dark:text-stone-300
                        "
                      >
                        {reviewRating.toFixed(
                          1
                        )}
                      </span>
                    </div>

                    {/* =================================
                        Review Comment
                    ================================= */}

                    <p
                      className="
                        mt-4

                        break-words

                        text-sm
                        leading-7

                        text-stone-600
                        dark:text-stone-300

                        [overflow-wrap:anywhere]
                      "
                    >
                      {comment ||
                        "No written feedback provided."}
                    </p>
                  </article>
                );
              }
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductReviews;