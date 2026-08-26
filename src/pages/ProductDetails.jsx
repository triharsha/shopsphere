import {
  useEffect,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  Link,
  useParams,
} from "react-router-dom";

import {
  ChevronRight,
  PackageX,
  RefreshCcw,
} from "lucide-react";

import ProductGallery from "../components/product/ProductGallery";
import ProductPurchasePanel from "../components/product/ProductPurchasePanel";
import ProductInformation from "../components/product/ProductInformation";
import ProductReviews from "../components/product/ProductReviews";
import RelatedProducts from "../components/product/RelatedProducts";

import {
  clearSelectedProduct,
  fetchProductById,
  selectProductLoading,
  selectSelectedProduct,
} from "../features/products/productSlice";

import {
  selectCurrentUser,
} from "../features/auth/authSlice";

import {
  addGuestRecentlyViewed,
  addRecentlyViewed,
} from "../utils/storage";

/* ========================================
   Product Details
======================================== */

const ProductDetails = () => {
  const dispatch =
    useDispatch();

  const { id } =
    useParams();

  const product =
    useSelector(
      selectSelectedProduct
    );

  const loading =
    useSelector(
      selectProductLoading
    );

  const currentUser =
    useSelector(
      selectCurrentUser
    );

  /* ========================================
     Validate Product ID
  ======================================== */

  const productId =
    Number(id);

  const hasValidId =
    Number.isInteger(
      productId
    ) &&
    productId > 0;

  /* ========================================
     Current Product Validation

     Prevent stale product data from another
     /product/:id route being rendered.
  ======================================== */

  const isCurrentProduct =
    Boolean(
      product?.id &&
        String(
          product.id
        ) ===
          String(id)
    );

  const currentProduct =
    isCurrentProduct
      ? product
      : null;

  /* ========================================
     Load Product
  ======================================== */

  useEffect(() => {
    if (!hasValidId) {
      dispatch(
        clearSelectedProduct()
      );

      return;
    }

    dispatch(
      fetchProductById(
        productId
      )
    );

    return () => {
      dispatch(
        clearSelectedProduct()
      );
    };
  }, [
    dispatch,
    productId,
    hasValidId,
  ]);

  /* ========================================
     Recently Viewed
  ======================================== */

  useEffect(() => {
    if (
      !currentProduct?.id
    ) {
      return;
    }

    if (currentUser?.id) {
      addRecentlyViewed(
        currentUser.id,
        currentProduct
      );

      return;
    }

    addGuestRecentlyViewed(
      currentProduct
    );
  }, [
    currentProduct,
    currentUser?.id,
  ]);

  /* ========================================
     Retry
  ======================================== */

  const handleRetry = () => {
    if (!hasValidId) {
      return;
    }

    dispatch(
      fetchProductById(
        productId
      )
    );
  };

  /* ========================================
     Loading
  ======================================== */

  if (
    loading &&
    hasValidId
  ) {
    return (
      <div
        className="
          container-shell

          py-8

          sm:py-10
          lg:py-12
        "
        aria-busy="true"
        aria-label="Loading product"
      >
        {/* Main Product Skeleton */}

        <div
          className="
            grid
            gap-8

            lg:grid-cols-2
            lg:gap-10
          "
        >
          {/* Gallery */}

          <div
            className="
              skeleton

              aspect-square

              rounded-3xl
            "
          />

          {/* Product Details */}

          <div
            className="
              space-y-5
            "
          >
            <div
              className="
                skeleton

                h-4
                w-32

                rounded-full
              "
            />

            <div
              className="
                skeleton

                h-10
                w-4/5

                rounded-xl
              "
            />

            <div
              className="
                skeleton

                h-5
                w-44

                rounded-full
              "
            />

            <div
              className="
                skeleton

                h-8
                w-36

                rounded-xl
              "
            />

            <div
              className="
                skeleton

                h-24
                w-full

                rounded-2xl
              "
            />

            <div
              className="
                grid
                gap-3

                sm:grid-cols-2
              "
            >
              <div
                className="
                  skeleton

                  h-12

                  rounded-xl
                "
              />

              <div
                className="
                  skeleton

                  h-12

                  rounded-xl
                "
              />
            </div>
          </div>
        </div>

        {/* Lower Section Skeleton */}

        <div
          className="
            mt-14

            grid
            gap-6

            lg:grid-cols-2
          "
        >
          <div
            className="
              skeleton

              h-80

              rounded-2xl
            "
          />

          <div
            className="
              skeleton

              h-80

              rounded-2xl
            "
          />
        </div>
      </div>
    );
  }

  /* ========================================
     Invalid ID
  ======================================== */

  if (!hasValidId) {
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

            sm:p-10
          "
        >
          <div
            className="
              mx-auto

              flex
              h-14
              w-14
              items-center
              justify-center

              rounded-2xl

              bg-stone-100
              dark:bg-stone-800

              text-stone-400
              dark:text-stone-500
            "
          >
            <PackageX
              size={25}
              aria-hidden="true"
            />
          </div>

          <h1
            className="
              mt-5

              text-2xl
              font-black

              text-stone-900
              dark:text-white
            "
          >
            Invalid product
          </h1>

          <p
            className="
              mx-auto
              mt-3
              max-w-md

              text-sm
              leading-6

              text-stone-500
              dark:text-stone-400
            "
          >
            The product address
            doesn't appear to be
            valid. Browse the shop
            to find what you're
            looking for.
          </p>

          <Link
            to="/shop"
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
              font-bold

              text-white

              transition-all

              hover:bg-emerald-700

              active:scale-[0.98]

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-emerald-500
              focus-visible:ring-offset-2

              dark:focus-visible:ring-offset-stone-900
            "
          >
            Browse Shop
          </Link>
        </div>
      </div>
    );
  }

  /* ========================================
     Product Unavailable / Error
  ======================================== */

  if (!currentProduct) {
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

            sm:p-10
          "
        >
          <div
            className="
              mx-auto

              flex
              h-14
              w-14
              items-center
              justify-center

              rounded-2xl

              bg-stone-100
              dark:bg-stone-800

              text-stone-400
              dark:text-stone-500
            "
          >
            <PackageX
              size={25}
              aria-hidden="true"
            />
          </div>

          <h1
            className="
              mt-5

              text-2xl
              font-black

              text-stone-900
              dark:text-white
            "
          >
            Product unavailable
          </h1>

          <p
            className="
              mx-auto
              mt-3
              max-w-md

              text-sm
              leading-6

              text-stone-500
              dark:text-stone-400
            "
          >
            We couldn't load this
            product. Please try
            again or return to the
            ShopSphere catalog.
          </p>

          <div
            className="
              mt-6

              flex
              flex-col
              justify-center
              gap-3

              sm:flex-row
            "
          >
            <button
              type="button"
              onClick={
                handleRetry
              }
              className="
                inline-flex
                items-center
                justify-center
                gap-2

                rounded-xl

                bg-stone-900
                dark:bg-white

                px-5
                py-3

                text-sm
                font-bold

                text-white
                dark:text-stone-900

                transition-all

                hover:bg-stone-800
                dark:hover:bg-stone-200

                active:scale-[0.98]

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-emerald-500
              "
            >
              <RefreshCcw
                size={17}
                aria-hidden="true"
              />

              Try Again
            </button>

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

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-emerald-500
              "
            >
              Back to Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ========================================
     Product Values
  ======================================== */

  const category =
    currentProduct.category ||
    "";

  const categoryLabel =
    category
      ? category
          .replaceAll(
            "-",
            " "
          )
          .replace(
            /\b\w/g,
            (letter) =>
              letter.toUpperCase()
          )
      : "Products";

  const categoryPath =
    category
      ? `/shop?category=${encodeURIComponent(
          category
        )}`
      : "/shop";

  const productTitle =
    currentProduct.title ||
    "Product";

  const productDescription =
    currentProduct.description ||
    "Product information is currently unavailable.";

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
          to="/shop"
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
          Shop
        </Link>

        <ChevronRight
          size={14}
          aria-hidden="true"
        />

        <Link
          to={
            categoryPath
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
          {
            categoryLabel
          }
        </Link>

        <ChevronRight
          size={14}
          aria-hidden="true"
        />

        <span
          aria-current="page"
          title={
            productTitle
          }
          className="
            max-w-[220px]
            truncate

            font-semibold

            text-stone-900
            dark:text-white

            sm:max-w-xs
          "
        >
          {
            productTitle
          }
        </span>
      </nav>

      {/* =====================================
          Main Product
      ===================================== */}

      <div
        className="
          mt-8

          grid
          gap-10

          lg:grid-cols-2
          lg:items-start
        "
      >
        <ProductGallery
          product={
            currentProduct
          }
        />

        <section
          className="
            min-w-0
          "
          aria-labelledby="product-title"
        >
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
            {currentProduct.brand ||
              categoryLabel}
          </p>

          <h1
            id="product-title"
            className="
              mt-3

              break-words

              text-3xl
              font-black
              leading-tight
              tracking-tight

              text-stone-900
              dark:text-white

              sm:text-4xl
              lg:text-5xl
            "
          >
            {
              productTitle
            }
          </h1>

          <p
            className="
              mt-5
              max-w-xl

              break-words

              text-sm
              leading-7

              text-stone-500
              dark:text-stone-400

              sm:text-base
            "
          >
            {
              productDescription
            }
          </p>

          <ProductPurchasePanel
            product={
              currentProduct
            }
          />
        </section>
      </div>

      {/* =====================================
          Product Information
      ===================================== */}

      <ProductInformation
        product={
          currentProduct
        }
      />

      {/* =====================================
          Customer Reviews
      ===================================== */}

      <ProductReviews
        product={
          currentProduct
        }
      />

      {/* =====================================
          Related Products
      ===================================== */}

      <RelatedProducts
        product={
          currentProduct
        }
      />
    </div>
  );
};

export default ProductDetails;