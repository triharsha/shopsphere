import {
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

import {
  MAX_COMPARE_ITEMS,
} from "../../constants/commerce";

const COMPARE_KEY =
  "shopsphere_compare";

/* ========================================
   Storage Helpers
======================================== */

const loadCompare = () => {
  try {
    const saved =
      localStorage.getItem(
        COMPARE_KEY
      );

    const parsed =
      saved
        ? JSON.parse(saved)
        : [];

    return Array.isArray(
      parsed
    )
      ? parsed.slice(
          0,
          MAX_COMPARE_ITEMS
        )
      : [];
  } catch {
    return [];
  }
};

const saveCompare = (
  items
) => {
  try {
    localStorage.setItem(
      COMPARE_KEY,
      JSON.stringify(
        items
      )
    );

    return true;
  } catch (error) {
    console.error(
      "Unable to save compare products:",
      error
    );

    return false;
  }
};

/* ========================================
   Initial State
======================================== */

const initialState = {
  items: loadCompare(),
};

/* ========================================
   Slice
======================================== */

const compareSlice =
  createSlice({
    name: "compare",

    initialState,

    reducers: {
      addCompareItem: (
        state,
        action
      ) => {
        const product =
          action.payload;

        if (!product?.id) {
          return;
        }

        const exists =
          state.items.some(
            (item) =>
              String(item.id) ===
              String(product.id)
          );

        if (exists) {
          return;
        }

        if (
          state.items.length >=
          MAX_COMPARE_ITEMS
        ) {
          return;
        }

        state.items.push(
          product
        );

        saveCompare(
          state.items
        );
      },

      removeCompareItem: (
        state,
        action
      ) => {
        state.items =
          state.items.filter(
            (item) =>
              String(item.id) !==
              String(
                action.payload
              )
          );

        saveCompare(
          state.items
        );
      },

      toggleCompareItem: (
        state,
        action
      ) => {
        const product =
          action.payload;

        if (!product?.id) {
          return;
        }

        const exists =
          state.items.some(
            (item) =>
              String(item.id) ===
              String(product.id)
          );

        if (exists) {
          state.items =
            state.items.filter(
              (item) =>
                String(
                  item.id
                ) !==
                String(
                  product.id
                )
            );

          saveCompare(
            state.items
          );

          return;
        }

        if (
          state.items.length >=
          MAX_COMPARE_ITEMS
        ) {
          return;
        }

        state.items.push(
          product
        );

        saveCompare(
          state.items
        );
      },

      clearCompare: (
        state
      ) => {
        state.items = [];

        saveCompare([]);
      },
    },
  });

export const {
  addCompareItem,
  removeCompareItem,
  toggleCompareItem,
  clearCompare,
} = compareSlice.actions;

/* ========================================
   Selectors
======================================== */

export const selectCompareItems = (
  state
) => state.compare.items;

export const selectCompareCount =
  createSelector(
    [selectCompareItems],
    (items) =>
      items.length
  );

export const selectCompareIds =
  createSelector(
    [selectCompareItems],
    (items) =>
      items.map(
        (item) =>
          item.id
      )
  );

export const selectIsCompared =
  (productId) =>
    createSelector(
      [selectCompareItems],
      (items) =>
        items.some(
          (item) =>
            String(
              item.id
            ) ===
            String(
              productId
            )
        )
    );

export default compareSlice.reducer;