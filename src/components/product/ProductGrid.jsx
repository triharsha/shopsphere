import {
  PackageSearch,
} from "lucide-react";

import {
  useMemo,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

import {
  addToCart,
} from "../../features/cart/cartSlice";

import {
  selectWishlistIds,
  toggleWishlist,
} from "../../features/wishlist/wishlistSlice";

import {
  selectIsAuthenticated,
} from "../../features/auth/authSlice";

import {
  selectCompareIds,
  toggleCompareItem,
} from "../../features/compare/compareSlice";

import {
  MAX_COMPARE_ITEMS,
} from "../../constants/commerce";

/* ========================================
   Product Grid
======================================== */

const ProductGrid = ({
  products = [],
  loading = false,
  skeletonCount = 8,

  onAddToCart,
  onToggleWishlist,
  onToggleCompare,

  wishlistIds = null,
  compareIds = null,

  emptyTitle =
    "No products found",

  emptyMessage =
    "Try changing your search, category or filters.",
}) => {
  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const location =
    useLocation();

  /* ========================================
     Redux
  ======================================== */

  const isAuthenticated =
    useSelector(
      selectIsAuthenticated
    );

  const reduxWishlistIds =
    useSelector(
      selectWishlistIds
    );

  const reduxCompareIds =
    useSelector(
      selectCompareIds
    );

  /* ========================================
     Effective State
  ======================================== */

  const effectiveWishlistIds =
    Array.isArray(
      wishlistIds
    )
      ? wishlistIds
      : reduxWishlistIds;

  const effectiveCompareIds =
    Array.isArray(
      compareIds
    )
      ? compareIds
      : reduxCompareIds;

  /* ========================================
     Safe Products

     Protect against:
     - invalid products
     - missing ids
     - duplicate ids
  ======================================== */

  const safeProducts =
    useMemo(() => {
      if (
        !Array.isArray(
          products
        )
      ) {
        return [];
      }

      const seenIds =
        new Set();

      return products.filter(
        (product) => {
          if (
            !product?.id
          ) {
            return false;
          }

          const key =
            String(
              product.id
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
      );
    }, [
      products,
    ]);

  /* ========================================
     Wishlist / Compare Sets

     Using Sets keeps membership checks
     simple and avoids repeated .some()
     work for every rendered product.
  ======================================== */

  const wishlistSet =
    useMemo(() => {
      return new Set(
        (
          Array.isArray(
            effectiveWishlistIds
          )
            ? effectiveWishlistIds
            : []
        ).map(
          (id) =>
            String(id)
        )
      );
    }, [
      effectiveWishlistIds,
    ]);

  const compareSet =
    useMemo(() => {
      return new Set(
        (
          Array.isArray(
            effectiveCompareIds
          )
            ? effectiveCompareIds
            : []
        ).map(
          (id) =>
            String(id)
        )
      );
    }, [
      effectiveCompareIds,
    ]);

  /* ========================================
     Cart
  ======================================== */

  const handleAddToCart = (
    product
  ) => {
    if (
      !product?.id
    ) {
      return;
    }

    if (
      Number(
        product.stock || 0
      ) <= 0
    ) {
      return;
    }

    if (
      onAddToCart
    ) {
      onAddToCart(
        product
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
     Wishlist
  ======================================== */

  const handleWishlist = (
    product
  ) => {
    if (
      !product?.id
    ) {
      return;
    }

    if (
      onToggleWishlist
    ) {
      onToggleWishlist(
        product
      );

      return;
    }

    if (
      !isAuthenticated
    ) {
      toast.error(
        "Please sign in to use your wishlist"
      );

      navigate(
        "/login",
        {
          state: {
            from:
              `${location.pathname}${location.search}`,
          },
        }
      );

      return;
    }

    const exists =
      wishlistSet.has(
        String(
          product.id
        )
      );

    dispatch(
      toggleWishlist(
        product
      )
    );

    toast.success(
      exists
        ? `${
            product.title ||
            "Product"
          } removed from wishlist`
        : `${
            product.title ||
            "Product"
          } added to wishlist`
    );
  };

  /* ========================================
     Compare
  ======================================== */

  const handleCompare = (
    product
  ) => {
    if (
      !product?.id
    ) {
      return;
    }

    if (
      onToggleCompare
    ) {
      onToggleCompare(
        product
      );

      return;
    }

    const productId =
      String(
        product.id
      );

    const exists =
      compareSet.has(
        productId
      );

    if (
      !exists &&
      compareSet.size >=
        MAX_COMPARE_ITEMS
    ) {
      toast.error(
        `You can compare up to ${MAX_COMPARE_ITEMS} products`
      );

      return;
    }

    dispatch(
      toggleCompareItem(
        product
      )
    );

    toast.success(
      exists
        ? `${
            product.title ||
            "Product"
          } removed from compare`
        : `${
            product.title ||
            "Product"
          } added to compare`
    );
  };

  /* ========================================
     Loading
  ======================================== */

  if (loading) {
    const count =
      Math.max(
        1,
        Number(
          skeletonCount
        ) || 1
      );

    return (
      <div
        className="
          grid
          gap-5

          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        "
        aria-busy="true"
        aria-label="Loading products"
      >
        {Array.from({
          length:
            count,
        }).map(
          (_, index) => (
            <ProductCardSkeleton
              key={`product-skeleton-${index}`}
            />
          )
        )}
      </div>
    );
  }

  /* ========================================
     Empty
  ======================================== */

  if (
    safeProducts.length === 0
  ) {
    return (
      <div
        className="
          flex
          min-h-[280px]
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
          py-14

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

            text-stone-400
            dark:text-stone-500
          "
        >
          <PackageSearch
            size={24}
            aria-hidden="true"
          />
        </div>

        <h3
          className="
            mt-5

            text-xl
            font-black

            text-stone-900
            dark:text-white
          "
        >
          {
            emptyTitle
          }
        </h3>

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
          {
            emptyMessage
          }
        </p>
      </div>
    );
  }

  /* ========================================
     Products
  ======================================== */

  return (
    <div
      className="
        grid
        gap-5

        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
      "
    >
      {safeProducts.map(
        (product) => {
          const productId =
            String(
              product.id
            );

          return (
            <ProductCard
              key={
                productId
              }

              product={
                product
              }

              onAddToCart={
                handleAddToCart
              }

              onToggleWishlist={
                handleWishlist
              }

              onToggleCompare={
                handleCompare
              }

              isWishlisted={
                wishlistSet.has(
                  productId
                )
              }

              isCompared={
                compareSet.has(
                  productId
                )
              }
            />
          );
        }
      )}
    </div>
  );
};

export default ProductGrid;