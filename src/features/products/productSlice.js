import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import {
  getCategories,
  getProductById,
  getProducts,
  getProductsByCategory,
  searchProducts,
} from "../../services/productApi";

/* ========================================
   Async Actions
======================================== */

export const fetchProducts =
  createAsyncThunk(
    "products/fetchProducts",

    async (
      options = {},
      {
        rejectWithValue,
      }
    ) => {
      try {
        return await getProducts(
          options
        );
      } catch (error) {
        return rejectWithValue(
          error.response?.data
            ?.message ||
            "Unable to load products."
        );
      }
    }
  );

/* ========================================
   Single Product
======================================== */

export const fetchProductById =
  createAsyncThunk(
    "products/fetchProductById",

    async (
      id,
      {
        rejectWithValue,
      }
    ) => {
      try {
        return await getProductById(
          id
        );
      } catch (error) {
        return rejectWithValue(
          error.response?.data
            ?.message ||
            "Unable to load product."
        );
      }
    }
  );

/* ========================================
   Categories
======================================== */

export const fetchCategories =
  createAsyncThunk(
    "products/fetchCategories",

    async (
      _,
      {
        rejectWithValue,
      }
    ) => {
      try {
        return await getCategories();
      } catch (error) {
        return rejectWithValue(
          error.response?.data
            ?.message ||
            "Unable to load categories."
        );
      }
    }
  );

/* ========================================
   Category Products
======================================== */

export const fetchCategoryProducts =
  createAsyncThunk(
    "products/fetchCategoryProducts",

    async (
      category,
      {
        rejectWithValue,
      }
    ) => {
      try {
        return await getProductsByCategory(
          category
        );
      } catch (error) {
        return rejectWithValue(
          error.response?.data
            ?.message ||
            "Unable to load category products."
        );
      }
    }
  );

/* ========================================
   Related Products
======================================== */

export const fetchRelatedProducts =
  createAsyncThunk(
    "products/fetchRelatedProducts",

    async (
      {
        category,
        excludeId,
        limit = 4,
      },
      {
        rejectWithValue,
      }
    ) => {
      try {
        if (!category) {
          return [];
        }

        const response =
          await getProductsByCategory(
            category
          );

        const categoryProducts =
          Array.isArray(
            response?.products
          )
            ? response.products
            : [];

        return categoryProducts
          .filter(
            (product) =>
              String(
                product.id
              ) !==
              String(excludeId)
          )
          .slice(0, limit);
      } catch (error) {
        return rejectWithValue(
          error.response?.data
            ?.message ||
            "Unable to load related products."
        );
      }
    }
  );

/* ========================================
   Search
======================================== */

export const fetchSearchResults =
  createAsyncThunk(
    "products/fetchSearchResults",

    async (
      query,
      {
        rejectWithValue,
      }
    ) => {
      try {
        return await searchProducts(
          query
        );
      } catch (error) {
        return rejectWithValue(
          error.response?.data
            ?.message ||
            "Unable to search products."
        );
      }
    }
  );

/* ========================================
   Initial State
======================================== */

const initialState = {
  products: [],

  total: 0,
  skip: 0,
  limit: 12,

  categories: [],

  selectedProduct: null,

  relatedProducts: [],

  searchResults: [],

  loading: false,

  productLoading: false,

  categoriesLoading: false,

  relatedLoading: false,

  searchLoading: false,

  error: null,

  productError: null,

  relatedError: null,

  searchError: null,
};

/* ========================================
   Product Slice
======================================== */

const productSlice =
  createSlice({
    name: "products",

    initialState,

    reducers: {
      clearSelectedProduct:
        (state) => {
          state.selectedProduct =
            null;

          state.productError =
            null;
        },

      clearRelatedProducts:
        (state) => {
          state.relatedProducts =
            [];

          state.relatedError =
            null;
        },

      clearSearchResults:
        (state) => {
          state.searchResults =
            [];

          state.searchError =
            null;
        },

      clearProductError:
        (state) => {
          state.error = null;
        },
    },

    extraReducers: (
      builder
    ) => {
      builder

        /* =====================================
           Products
        ===================================== */

        .addCase(
          fetchProducts.pending,
          (state) => {
            state.loading =
              true;

            state.error =
              null;
          }
        )

        .addCase(
          fetchProducts.fulfilled,
          (
            state,
            action
          ) => {
            state.loading =
              false;

            state.products =
              action.payload
                .products || [];

            state.total =
              action.payload
                .total || 0;

            state.skip =
              action.payload
                .skip || 0;

            state.limit =
              action.payload
                .limit || 12;
          }
        )

        .addCase(
          fetchProducts.rejected,
          (
            state,
            action
          ) => {
            state.loading =
              false;

            state.error =
              action.payload;
          }
        )

        /* =====================================
           Single Product
        ===================================== */

        .addCase(
          fetchProductById
            .pending,
          (state) => {
            state.productLoading =
              true;

            state.productError =
              null;
          }
        )

        .addCase(
          fetchProductById
            .fulfilled,
          (
            state,
            action
          ) => {
            state.productLoading =
              false;

            state.selectedProduct =
              action.payload;
          }
        )

        .addCase(
          fetchProductById
            .rejected,
          (
            state,
            action
          ) => {
            state.productLoading =
              false;

            state.selectedProduct =
              null;

            state.productError =
              action.payload;
          }
        )

        /* =====================================
           Categories
        ===================================== */

        .addCase(
          fetchCategories.pending,
          (state) => {
            state.categoriesLoading =
              true;
          }
        )

        .addCase(
          fetchCategories
            .fulfilled,
          (
            state,
            action
          ) => {
            state.categoriesLoading =
              false;

            state.categories =
              Array.isArray(
                action.payload
              )
                ? action.payload
                : [];
          }
        )

        .addCase(
          fetchCategories
            .rejected,
          (state) => {
            state.categoriesLoading =
              false;
          }
        )

        /* =====================================
           Category Products
        ===================================== */

        .addCase(
          fetchCategoryProducts
            .pending,
          (state) => {
            state.loading =
              true;

            state.error =
              null;
          }
        )

        .addCase(
          fetchCategoryProducts
            .fulfilled,
          (
            state,
            action
          ) => {
            state.loading =
              false;

            state.products =
              action.payload
                .products || [];

            state.total =
              action.payload
                .total || 0;

            state.skip =
              action.payload
                .skip || 0;

            state.limit =
              action.payload
                .limit || 0;
          }
        )

        .addCase(
          fetchCategoryProducts
            .rejected,
          (
            state,
            action
          ) => {
            state.loading =
              false;

            state.error =
              action.payload;
          }
        )

        /* =====================================
           Related Products
        ===================================== */

        .addCase(
          fetchRelatedProducts
            .pending,
          (state) => {
            state.relatedLoading =
              true;

            state.relatedError =
              null;

            state.relatedProducts =
              [];
          }
        )

        .addCase(
          fetchRelatedProducts
            .fulfilled,
          (
            state,
            action
          ) => {
            state.relatedLoading =
              false;

            state.relatedProducts =
              Array.isArray(
                action.payload
              )
                ? action.payload
                : [];
          }
        )

        .addCase(
          fetchRelatedProducts
            .rejected,
          (
            state,
            action
          ) => {
            state.relatedLoading =
              false;

            state.relatedProducts =
              [];

            state.relatedError =
              action.payload;
          }
        )

        /* =====================================
           Search
        ===================================== */

        .addCase(
          fetchSearchResults
            .pending,
          (state) => {
            state.searchLoading =
              true;

            state.searchError =
              null;
          }
        )

        .addCase(
          fetchSearchResults
            .fulfilled,
          (
            state,
            action
          ) => {
            state.searchLoading =
              false;

            state.searchResults =
              action.payload
                .products || [];
          }
        )

        .addCase(
          fetchSearchResults
            .rejected,
          (
            state,
            action
          ) => {
            state.searchLoading =
              false;

            state.searchError =
              action.payload;
          }
        );
    },
  });

/* ========================================
   Actions
======================================== */

export const {
  clearSelectedProduct,
  clearRelatedProducts,
  clearSearchResults,
  clearProductError,
} = productSlice.actions;

/* ========================================
   Selectors
======================================== */

export const selectProducts = (
  state
) => state.products.products;

export const selectProductsLoading = (
  state
) => state.products.loading;

export const selectProductsError = (
  state
) => state.products.error;

export const selectProductTotal = (
  state
) => state.products.total;

export const selectCategories = (
  state
) => state.products.categories;

export const selectSelectedProduct = (
  state
) =>
  state.products.selectedProduct;

export const selectProductLoading = (
  state
) =>
  state.products.productLoading;

export const selectRelatedProducts = (
  state
) =>
  state.products.relatedProducts;

export const selectRelatedLoading = (
  state
) =>
  state.products.relatedLoading;

export const selectRelatedError = (
  state
) =>
  state.products.relatedError;

export const selectSearchResults = (
  state
) =>
  state.products.searchResults;

export const selectSearchLoading = (
  state
) =>
  state.products.searchLoading;

export default productSlice.reducer;