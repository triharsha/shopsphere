import {
  ChevronRight,
  Search,
  X,
} from "lucide-react";

import {
  useEffect,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import ProductGrid from "../components/product/ProductGrid";

import {
  clearSearchResults,
  fetchSearchResults,
  selectSearchLoading,
  selectSearchResults,
} from "../features/products/productSlice";

const POPULAR_SEARCHES = [
  "Laptop",
  "Smartphone",
  "Beauty",
  "Fragrances",
  "Furniture",
  "Groceries",
];

const SearchResults = () => {
  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const [
    searchParams,
  ] = useSearchParams();

  const results =
    useSelector(
      selectSearchResults
    );

  const loading =
    useSelector(
      selectSearchLoading
    );

  const query =
    searchParams
      .get("q")
      ?.trim() || "";

  /* =====================================
     Load Search Results
  ===================================== */

  useEffect(() => {
    /*
     * Clear previous results first so
     * an old query does not briefly
     * appear while the next query loads.
     */

    dispatch(
      clearSearchResults()
    );

    if (!query) {
      return;
    }

    dispatch(
      fetchSearchResults(
        query
      )
    );
  }, [
    dispatch,
    query,
  ]);

  /* =====================================
     Clear Search
  ===================================== */

  const handleClear = () => {
    dispatch(
      clearSearchResults()
    );

    navigate(
      "/search"
    );
  };

  /* =====================================
     Suggested Search
  ===================================== */

  const handleSuggestedSearch = (
    value
  ) => {
    navigate(
      `/search?q=${encodeURIComponent(
        value
      )}`
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

            focus-visible:outline-none
            focus-visible:text-emerald-700

            dark:focus-visible:text-emerald-400
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
          Search
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
        <div
          className="
            max-w-3xl
          "
        >
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
            <Search
              size={14}
              aria-hidden="true"
            />

            Product Search
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
            Search ShopSphere
          </h1>

          <p
            className="
              mt-3
              max-w-2xl

              text-sm
              leading-6

              text-stone-500
              dark:text-stone-400

              sm:text-base
            "
          >
            Search products using
            the main search bar above
            or explore popular
            categories below.
          </p>
        </div>

        {/* Result Count */}

        {query && (
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
              Search Results
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
              {loading
                ? "..."
                : results.length}
            </p>
          </div>
        )}
      </div>

      {/* =====================================
          Blank Search State
      ===================================== */}

      {!query && (
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

              text-emerald-700
              dark:text-emerald-400
            "
          >
            <Search
              size={30}
              aria-hidden="true"
            />
          </div>

          <h2
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
            What are you looking
            for?
          </h2>

          <p
            className="
              mx-auto
              mt-2
              max-w-lg

              text-sm
              leading-6

              text-stone-500
              dark:text-stone-400
            "
          >
            Use the ShopSphere
            search bar above or
            choose one of these
            popular searches.
          </p>

          {/* Popular Searches */}

          <div
            className="
              mt-6

              flex
              flex-wrap
              justify-center
              gap-2
            "
          >
            {POPULAR_SEARCHES.map(
              (item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    handleSuggestedSearch(
                      item
                    )
                  }
                  className="
                    rounded-full

                    border
                    border-stone-200
                    dark:border-stone-700

                    bg-stone-50
                    dark:bg-stone-800

                    px-4
                    py-2

                    text-xs
                    font-bold

                    text-stone-700
                    dark:text-stone-300

                    transition-all
                    duration-200

                    hover:border-emerald-300
                    hover:bg-emerald-50
                    hover:text-emerald-700

                    dark:hover:border-emerald-800
                    dark:hover:bg-emerald-950/30
                    dark:hover:text-emerald-400

                    active:scale-[0.97]

                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-emerald-500
                    focus-visible:ring-offset-2

                    dark:focus-visible:ring-offset-stone-900
                  "
                >
                  {item}
                </button>
              )
            )}
          </div>

          <Link
            to="/shop"
            className="
              mt-7

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

              dark:focus-visible:ring-offset-stone-900
            "
          >
            Browse All Products

            <ChevronRight
              size={16}
              aria-hidden="true"
            />
          </Link>
        </div>
      )}

      {/* =====================================
          Search Results
      ===================================== */}

      {query && (
        <>
          <div
            className="
              mt-10

              flex
              flex-col
              gap-4

              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
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
                Results for{" "}

                <span
                  className="
                    break-words

                    text-emerald-700
                    dark:text-emerald-400
                  "
                >
                  “{query}”
                </span>
              </p>

              {!loading && (
                <p
                  className="
                    mt-1

                    text-xs

                    text-stone-500
                    dark:text-stone-400
                  "
                >
                  {results.length}{" "}
                  {results.length ===
                  1
                    ? "product"
                    : "products"}{" "}
                  found
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={
                handleClear
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

                text-xs
                font-bold

                text-stone-600
                dark:text-stone-300

                transition-all
                duration-200

                hover:border-rose-200
                hover:bg-rose-50
                hover:text-rose-600

                dark:hover:border-rose-900
                dark:hover:bg-rose-950/30
                dark:hover:text-rose-400

                active:scale-[0.98]

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-rose-500
                focus-visible:ring-offset-2

                dark:focus-visible:ring-offset-stone-950
              "
            >
              <X
                size={15}
                aria-hidden="true"
              />

              Clear Search
            </button>
          </div>

          {/* =====================================
              Products
          ===================================== */}

          {loading ||
          results.length > 0 ? (
            <div
              className="
                mt-6
              "
            >
              <ProductGrid
                products={
                  results
                }
                loading={
                  loading
                }
                skeletonCount={
                  8
                }
              />
            </div>
          ) : (
            /* =================================
               No Results
            ================================= */

            <div
              className="
                mt-6

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

                  bg-stone-100
                  dark:bg-stone-800

                  text-stone-400
                  dark:text-stone-500
                "
              >
                <Search
                  size={30}
                  aria-hidden="true"
                />
              </div>

              <h2
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
                No products found
              </h2>

              <p
                className="
                  mx-auto
                  mt-2
                  max-w-lg

                  text-sm
                  leading-6

                  text-stone-500
                  dark:text-stone-400
                "
              >
                We couldn't find
                anything matching{" "}

                <span
                  className="
                    break-words
                    font-bold

                    text-stone-700
                    dark:text-stone-200
                  "
                >
                  “{query}”
                </span>

                . Try another keyword
                or explore one of
                these popular
                searches.
              </p>

              {/* Suggestions */}

              <div
                className="
                  mt-6

                  flex
                  flex-wrap
                  justify-center
                  gap-2
                "
              >
                {POPULAR_SEARCHES.map(
                  (item) => (
                    <button
                      key={
                        item
                      }
                      type="button"
                      onClick={() =>
                        handleSuggestedSearch(
                          item
                        )
                      }
                      className="
                        rounded-full

                        border
                        border-stone-200
                        dark:border-stone-700

                        bg-stone-50
                        dark:bg-stone-800

                        px-4
                        py-2

                        text-xs
                        font-bold

                        text-stone-700
                        dark:text-stone-300

                        transition-all
                        duration-200

                        hover:border-emerald-300
                        hover:bg-emerald-50
                        hover:text-emerald-700

                        dark:hover:border-emerald-800
                        dark:hover:bg-emerald-950/30
                        dark:hover:text-emerald-400

                        active:scale-[0.97]

                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-emerald-500
                        focus-visible:ring-offset-2

                        dark:focus-visible:ring-offset-stone-900
                      "
                    >
                      {item}
                    </button>
                  )
                )}
              </div>

              {/* Actions */}

              <div
                className="
                  mt-7

                  flex
                  flex-wrap
                  justify-center
                  gap-3
                "
              >
                <button
                  type="button"
                  onClick={
                    handleClear
                  }
                  className="
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

                    transition-all
                    duration-200

                    hover:bg-stone-100
                    dark:hover:bg-stone-800

                    active:scale-[0.98]

                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-stone-400
                  "
                >
                  New Search
                </button>

                <Link
                  to="/shop"
                  className="
                    inline-flex
                    items-center
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

                    dark:focus-visible:ring-offset-stone-900
                  "
                >
                  Browse All Products

                  <ChevronRight
                    size={16}
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;