import axios from "axios";

const productApi = axios.create({
  baseURL:
    "https://dummyjson.com",
  timeout: 10000,
});

/* ========================================
   Search Normalization
======================================== */

const normalizeSearchQuery = (
  query
) => {
  return String(
    query || ""
  )
    .trim()
    .toLowerCase();
};

/* ========================================
   Category Aliases
======================================== */

const CATEGORY_ALIASES = {
  laptop: "laptops",
  laptops: "laptops",

  smartphone:
    "smartphones",
  smartphones:
    "smartphones",

  phone:
    "smartphones",
  phones:
    "smartphones",

  fragrance:
    "fragrances",
  fragrances:
    "fragrances",

  grocery:
    "groceries",
  groceries:
    "groceries",

  furniture:
    "furniture",

  beauty:
    "beauty",

  tablet:
    "tablets",
  tablets:
    "tablets",

  sunglasses:
    "sunglasses",
};

/* ========================================
   Get Products
======================================== */

export const getProducts = async ({
  limit = 12,
  skip = 0,
  sortBy,
  order,
} = {}) => {
  const params = {
    limit,
    skip,
  };

  if (sortBy) {
    params.sortBy = sortBy;
  }

  if (order) {
    params.order = order;
  }

  const response =
    await productApi.get(
      "/products",
      {
        params,
      }
    );

  return response.data;
};

/* ========================================
   Get Single Product
======================================== */

export const getProductById =
  async (id) => {
    const response =
      await productApi.get(
        `/products/${id}`
      );

    return response.data;
  };

/* ========================================
   Search Products
======================================== */

export const searchProducts =
  async (query) => {
    const normalizedQuery =
      normalizeSearchQuery(
        query
      );

    if (!normalizedQuery) {
      return {
        products: [],
        total: 0,
        skip: 0,
        limit: 0,
      };
    }

    /* =====================================
       Normal API Search
    ===================================== */

    const response =
      await productApi.get(
        "/products/search",
        {
          params: {
            q: normalizedQuery,
          },
        }
      );

    const searchData =
      response.data;

    /* =====================================
       If normal search found products,
       return them immediately.
    ===================================== */

    if (
      Array.isArray(
        searchData?.products
      ) &&
      searchData.products.length >
        0
    ) {
      return searchData;
    }

    /* =====================================
       Category Fallback

       Example:
       laptop  -> laptops
       laptops -> laptops
    ===================================== */

    const category =
      CATEGORY_ALIASES[
        normalizedQuery
      ];

    if (!category) {
      return searchData;
    }

    const categoryResponse =
      await productApi.get(
        `/products/category/${category}`
      );

    return categoryResponse.data;
  };

/* ========================================
   Get Categories
======================================== */

export const getCategories =
  async () => {
    const response =
      await productApi.get(
        "/products/categories"
      );

    return response.data;
  };

/* ========================================
   Get Products By Category
======================================== */

export const getProductsByCategory =
  async (category) => {
    const response =
      await productApi.get(
        `/products/category/${category}`
      );

    return response.data;
  };

export default productApi;