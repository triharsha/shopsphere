import {
  PackageSearch,
  RefreshCcw,
} from "lucide-react";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useSearchParams,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import ProductGrid from "../components/product/ProductGrid";

import ShopHeader from "../components/shop/ShopHeader";
import FilterSidebar from "../components/shop/FilterSidebar";
import MobileFilterDrawer from "../components/shop/MobileFilterDrawer";
import SortBar from "../components/shop/SortBar";
import ActiveFilters from "../components/shop/ActiveFilters";
import Pagination from "../components/shop/Pagination";

import {
  fetchCategoryProducts,
  fetchProducts,
  selectProducts,
  selectProductsError,
  selectProductsLoading,
  selectProductTotal,
} from "../features/products/productSlice";

/* ========================================
   Constants
======================================== */

const PRODUCTS_PER_PAGE = 12;

const CATALOG_LIMIT = 200;

/* ========================================
   Price Helper
======================================== */

const getPriceRange = (
  value
) => {
  switch (value) {
    case "0-2500":
      return [
        0,
        2500,
      ];

    case "2500-5000":
      return [
        2500,
        5000,
      ];

    case "5000-10000":
      return [
        5000,
        10000,
      ];

    case "10000-25000":
      return [
        10000,
        25000,
      ];

    case "25000-plus":
      return [
        25000,
        Infinity,
      ];

    default:
      return [
        0,
        Infinity,
      ];
  }
};

/* ========================================
   Category Label Helper
======================================== */

const formatCategoryLabel = (
  value
) => {
  if (
    !value ||
    value === "all"
  ) {
    return null;
  }

  return value
    .replaceAll(
      "-",
      " "
    )
    .replace(
      /\b\w/g,
      (letter) =>
        letter.toUpperCase()
    );
};

/* ========================================
   Shop
======================================== */

const Shop = () => {
  const dispatch =
    useDispatch();

  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();

  /* ========================================
     Redux
  ======================================== */

  const products =
    useSelector(
      selectProducts
    );

  const loading =
    useSelector(
      selectProductsLoading
    );

  const error =
    useSelector(
      selectProductsError
    );

  const catalogTotal =
    useSelector(
      selectProductTotal
    );

  /* ========================================
     UI State
  ======================================== */

  const [
    isFilterOpen,
    setIsFilterOpen,
  ] = useState(false);

  /* ========================================
     URL State
  ======================================== */

  const category =
    searchParams.get(
      "category"
    ) || "all";

  const priceRange =
    searchParams.get(
      "price"
    ) || "all";

  const minRating =
    Number(
      searchParams.get(
        "rating"
      ) || 0
    );

  const inStockOnly =
    searchParams.get(
      "stock"
    ) === "true";

  const sortBy =
    searchParams.get(
      "sort"
    ) || "featured";

  const parsedPage =
    Number(
      searchParams.get(
        "page"
      ) || 1
    );

  const currentPage =
    Number.isInteger(
      parsedPage
    ) &&
    parsedPage > 0
      ? parsedPage
      : 1;

  /* ========================================
     Filters Object
  ======================================== */

  const filters = {
    category,
    priceRange,
    minRating,
    inStockOnly,
  };

  /* ========================================
     Category Label
  ======================================== */

  const categoryLabel =
    formatCategoryLabel(
      category
    );

  /* ========================================
     Load Catalog
  ======================================== */

  useEffect(() => {
    if (
      category !== "all"
    ) {
      dispatch(
        fetchCategoryProducts(
          category
        )
      );

      return;
    }

    dispatch(
      fetchProducts({
        limit:
          CATALOG_LIMIT,
        skip: 0,
      })
    );
  }, [
    dispatch,
    category,
  ]);

  /* ========================================
     Query Parameter Helper
  ======================================== */

  const updateParams =
    useCallback((
      updates
    ) => {
    const nextParams =
      new URLSearchParams(
        searchParams
      );

    Object.entries(
      updates
    ).forEach(
      ([
        key,
        value,
      ]) => {
        if (
          value === null ||
          value === undefined ||
          value === "" ||
          value === "all" ||
          value === false ||
          value === 0
        ) {
          nextParams.delete(
            key
          );

          return;
        }

        nextParams.set(
          key,
          String(value)
        );
      }
    );

    setSearchParams(
      nextParams
    );
  }, [
    searchParams,
    setSearchParams,
  ]);

  /* ========================================
     Filter Change
  ======================================== */

  const handleFilterChange = (
    key,
    value
  ) => {
    const paramMap = {
      category:
        "category",

      priceRange:
        "price",

      minRating:
        "rating",

      inStockOnly:
        "stock",
    };

    updateParams({
      [paramMap[key]]:
        value,

      page:
        null,
    });
  };

  /* ========================================
     Remove One Filter
  ======================================== */

  const handleRemoveFilter = (
    filterId
  ) => {
    const paramMap = {
      category:
        "category",

      priceRange:
        "price",

      minRating:
        "rating",

      inStockOnly:
        "stock",
    };

    updateParams({
      [paramMap[
        filterId
      ]]:
        null,

      page:
        null,
    });
  };

  /* ========================================
     Clear Filters
  ======================================== */

  const handleClearFilters =
    () => {
      const nextParams =
        new URLSearchParams();

      if (
        sortBy !==
        "featured"
      ) {
        nextParams.set(
          "sort",
          sortBy
        );
      }

      setSearchParams(
        nextParams
      );
    };

  /* ========================================
     Sort Change
  ======================================== */

  const handleSortChange = (
    value
  ) => {
    updateParams({
      sort:
        value ===
        "featured"
          ? null
          : value,

      page:
        null,
    });
  };

  /* ========================================
     Page Change
  ======================================== */

  const handlePageChange = (
    page
  ) => {
    updateParams({
      page:
        page <= 1
          ? null
          : page,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* ========================================
     Mobile Filter Drawer
  ======================================== */

  const handleOpenFilters =
    () => {
      setIsFilterOpen(
        true
      );
    };

  const handleCloseFilters =
    () => {
      setIsFilterOpen(
        false
      );
    };

  /* ========================================
     Lock Background Scroll
  ======================================== */

  useEffect(() => {
    if (
      !isFilterOpen
    ) {
      return;
    }

    const previousOverflow =
      document.body.style
        .overflow;

    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [
    isFilterOpen,
  ]);

  /* ========================================
     Filter + Sort Complete Catalog
  ======================================== */

  const filteredProducts =
    useMemo(() => {
      let result =
        Array.isArray(
          products
        )
          ? [
              ...products,
            ]
          : [];

      /* -------------------------------------
         Price
      ------------------------------------- */

      if (
        priceRange !== "all"
      ) {
        const [
          minPrice,
          maxPrice,
        ] =
          getPriceRange(
            priceRange
          );

        result =
          result.filter(
            (product) => {
              const priceInRupees =
                Number(
                  product.price ||
                    0
                ) * 83;

              return (
                priceInRupees >=
                  minPrice &&
                priceInRupees <=
                  maxPrice
              );
            }
          );
      }

      /* -------------------------------------
         Rating
      ------------------------------------- */

      if (
        minRating > 0
      ) {
        result =
          result.filter(
            (product) =>
              Number(
                product.rating ||
                  0
              ) >=
              minRating
          );
      }

      /* -------------------------------------
         Stock
      ------------------------------------- */

      if (
        inStockOnly
      ) {
        result =
          result.filter(
            (product) =>
              Number(
                product.stock ||
                  0
              ) > 0
          );
      }

      /* -------------------------------------
         Sort
      ------------------------------------- */

      switch (sortBy) {
        case "price-low":
          result.sort(
            (a, b) =>
              Number(
                a.price ||
                  0
              ) -
              Number(
                b.price ||
                  0
              )
          );

          break;

        case "price-high":
          result.sort(
            (a, b) =>
              Number(
                b.price ||
                  0
              ) -
              Number(
                a.price ||
                  0
              )
          );

          break;

        case "rating":
          result.sort(
            (a, b) =>
              Number(
                b.rating ||
                  0
              ) -
              Number(
                a.rating ||
                  0
              )
          );

          break;

        case "discount":
          result.sort(
            (a, b) =>
              Number(
                b.discountPercentage ||
                  0
              ) -
              Number(
                a.discountPercentage ||
                  0
              )
          );

          break;

        default:
          break;
      }

      return result;
    }, [
      products,
      priceRange,
      minRating,
      inStockOnly,
      sortBy,
    ]);

  /* ========================================
     Pagination
  ======================================== */

  const matchingCount =
    filteredProducts.length;

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        matchingCount /
          PRODUCTS_PER_PAGE
      )
    );

  const safeCurrentPage =
    Math.min(
      currentPage,
      totalPages
    );

  const pageStart =
    (safeCurrentPage - 1) *
    PRODUCTS_PER_PAGE;

  const visibleProducts =
    filteredProducts.slice(
      pageStart,
      pageStart +
        PRODUCTS_PER_PAGE
    );

  /* ========================================
     Fix Invalid Page
  ======================================== */

  useEffect(() => {
    if (
      loading ||
      matchingCount === 0
    ) {
      return;
    }

    if (
      currentPage >
      totalPages
    ) {
      updateParams({
        page:
          totalPages <= 1
            ? null
            : totalPages,
      });
    }
  }, [
    currentPage,
    totalPages,
    matchingCount,
    loading,
    updateParams,
  ]);

  /* ========================================
     Retry
  ======================================== */

  const handleRetry =
    () => {
      if (
        category !== "all"
      ) {
        dispatch(
          fetchCategoryProducts(
            category
          )
        );

        return;
      }

      dispatch(
        fetchProducts({
          limit:
            CATALOG_LIMIT,
          skip: 0,
        })
      );
    };

  /* ========================================
     Header Catalog Count
  ======================================== */

  const headerProductCount =
    category === "all"
      ? catalogTotal
      : products.length;

  /* ========================================
     Render
  ======================================== */

  return (
    <div
      className="
        min-h-screen

        bg-stone-50
        dark:bg-stone-950
      "
    >
      <div
        className="
          container-shell

          py-8

          sm:py-10
          lg:py-12
        "
      >
        {/* =====================================
            Header
        ===================================== */}

        <ShopHeader
          totalProducts={
            headerProductCount
          }
          categoryLabel={
            categoryLabel
          }
        />

        {/* =====================================
            Catalog
        ===================================== */}

        <div
          className="
            mt-10

            grid
            gap-8

            lg:grid-cols-[260px_minmax(0,1fr)]
          "
        >
          {/* =====================================
              Desktop Filters
          ===================================== */}

          <aside
            className="
              hidden

              lg:block
            "
          >
            <div
              className="
                sticky
                top-36
              "
            >
              <FilterSidebar
                filters={
                  filters
                }
                onFilterChange={
                  handleFilterChange
                }
                onClearFilters={
                  handleClearFilters
                }
              />
            </div>
          </aside>

          {/* =====================================
              Products
          ===================================== */}

          <div
            className="
              min-w-0
            "
          >
            <SortBar
              resultCount={
                matchingCount
              }
              sortBy={
                sortBy
              }
              onSortChange={
                handleSortChange
              }
              onOpenFilters={
                handleOpenFilters
              }
            />

            <ActiveFilters
              filters={
                filters
              }
              onRemoveFilter={
                handleRemoveFilter
              }
              onClearFilters={
                handleClearFilters
              }
            />

            {/* =====================================
                Error State
            ===================================== */}

            {error &&
              !loading && (
                <div
                  className="
                    rounded-3xl

                    border
                    border-rose-200
                    dark:border-rose-900/50

                    bg-rose-50
                    dark:bg-rose-950/20

                    px-6
                    py-14

                    text-center
                  "
                >
                  <h2
                    className="
                      text-xl
                      font-black

                      text-stone-900
                      dark:text-white
                    "
                  >
                    We couldn't load
                    the products
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
                    {error}
                  </p>

                  <button
                    type="button"
                    onClick={
                      handleRetry
                    }
                    className="
                      mt-6

                      inline-flex
                      items-center
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
                </div>
              )}

            {/* =====================================
                Product Content
            ===================================== */}

            {!error && (
              <>
                {loading ? (
                  <ProductGrid
                    products={[]}
                    loading
                    skeletonCount={
                      PRODUCTS_PER_PAGE
                    }
                  />
                ) : matchingCount >
                  0 ? (
                  <>
                    <ProductGrid
                      products={
                        visibleProducts
                      }
                      loading={
                        false
                      }
                    />

                    <Pagination
                      currentPage={
                        safeCurrentPage
                      }
                      totalPages={
                        totalPages
                      }
                      totalItems={
                        matchingCount
                      }
                      itemsPerPage={
                        PRODUCTS_PER_PAGE
                      }
                      onPageChange={
                        handlePageChange
                      }
                    />
                  </>
                ) : (
                  /* =====================================
                     Empty State
                  ===================================== */

                  <div
                    className="
                      rounded-3xl

                      border
                      border-stone-200
                      dark:border-stone-800

                      bg-white
                      dark:bg-stone-900

                      px-6
                      py-16

                      text-center
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

                        text-stone-500
                        dark:text-stone-400
                      "
                    >
                      <PackageSearch
                        size={25}
                        aria-hidden="true"
                      />
                    </div>

                    <h2
                      className="
                        mt-5

                        text-xl
                        font-black

                        text-stone-900
                        dark:text-white
                      "
                    >
                      No products
                      match your
                      filters
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
                      Try removing
                      one or more
                      filters to
                      discover more
                      products.
                    </p>

                    <button
                      type="button"
                      onClick={
                        handleClearFilters
                      }
                      className="
                        mt-6

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
                      "
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* =====================================
          Mobile Filters
      ===================================== */}

      <MobileFilterDrawer
        isOpen={
          isFilterOpen
        }
        onClose={
          handleCloseFilters
        }
        filters={
          filters
        }
        onFilterChange={
          handleFilterChange
        }
        onClearFilters={
          handleClearFilters
        }
      />
    </div>
  );
};

export default Shop;