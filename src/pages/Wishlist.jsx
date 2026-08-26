import {
  ChevronRight,
  Heart,
  ShoppingBag,
  Trash2,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import toast from "react-hot-toast";

import ProductGrid from "../components/product/ProductGrid";

import {
  selectWishlistItems,
  clearWishlist,
} from "../features/wishlist/wishlistSlice";

const Wishlist = () => {
  const dispatch =
    useDispatch();

  const items =
    useSelector(
      selectWishlistItems
    );

  /* =====================================
     Clear Wishlist
  ===================================== */

  const handleClear =
    () => {
      if (
        items.length === 0
      ) {
        return;
      }

      dispatch(
        clearWishlist()
      );

      toast.success(
        "Wishlist cleared"
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
          Wishlist
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
          {/* Badge */}

          <div
            className="
              inline-flex
              items-center
              gap-2

              rounded-full

              bg-rose-50
              dark:bg-rose-950/30

              px-3
              py-1.5

              text-xs
              font-black
              uppercase
              tracking-[0.12em]

              text-rose-600
              dark:text-rose-400
            "
          >
            <Heart
              size={14}
              aria-hidden="true"
            />

            Saved Items
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
            My Wishlist
          </h1>

          <p
            className="
              mt-3

              text-sm

              text-stone-500
              dark:text-stone-400
            "
          >
            {items.length}{" "}
            {items.length === 1
              ? "product"
              : "products"}{" "}
            saved for later.
          </p>
        </div>

        {/* Clear Wishlist */}

        {items.length > 0 && (
          <button
            type="button"
            onClick={
              handleClear
            }
            className="
              inline-flex
              w-fit
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
              duration-200

              hover:bg-rose-50
              dark:hover:bg-rose-950/30

              active:scale-[0.98]

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-rose-500
              focus-visible:ring-offset-2

              dark:focus-visible:ring-offset-stone-950
            "
          >
            <Trash2
              size={16}
              aria-hidden="true"
            />

            Clear Wishlist
          </button>
        )}
      </div>

      {/* =====================================
          Empty Wishlist
      ===================================== */}

      {items.length === 0 ? (
        <div
          className="
            mt-10

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

              bg-rose-50
              dark:bg-rose-950/30

              text-rose-500
              dark:text-rose-400
            "
          >
            <Heart
              size={30}
              aria-hidden="true"
            />
          </div>

          <h2
            className="
              mt-5

              text-2xl
              font-black

              text-stone-900
              dark:text-white
            "
          >
            Your wishlist is empty
          </h2>

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
            Save products you love
            while shopping and come
            back to them anytime.
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
              size={17}
              aria-hidden="true"
            />

            Explore Products
          </Link>
        </div>
      ) : (
        /* =====================================
           Wishlist Products
        ===================================== */

        <div
          className="
            mt-10
          "
        >
          <ProductGrid
            products={items}
            loading={false}
          />
        </div>
      )}
    </div>
  );
};

export default Wishlist;