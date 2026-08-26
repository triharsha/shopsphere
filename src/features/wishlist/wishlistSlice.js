import {
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

import {
  getUserData,
  updateUserData,
} from "../../utils/storage";

/* ========================================
   Helpers
======================================== */

const persistWishlist = (
  userId,
  wishlist
) => {
  if (!userId) {
    return false;
  }

  return updateUserData(
    userId,
    "wishlist",
    wishlist
  );
};

/* ========================================
   Initial State
======================================== */

const initialState = {
  items: [],
  initialized: false,
};

/* ========================================
   Slice
======================================== */

const wishlistSlice =
  createSlice({
    name: "wishlist",

    initialState,

    reducers: {
      setWishlist: (
        state,
        action
      ) => {
        state.items =
          Array.isArray(
            action.payload
          )
            ? action.payload
            : [];

        state.initialized =
          true;
      },

      resetWishlistState:
        (state) => {
          state.items = [];

          state.initialized =
            false;
        },
    },
  });

export const {
  setWishlist,
  resetWishlistState,
} = wishlistSlice.actions;

/* ========================================
   Initialize Wishlist
======================================== */

export const initializeWishlist =
  () =>
  (
    dispatch,
    getState
  ) => {
    const currentUser =
      getState().auth
        .currentUser;

    if (!currentUser?.id) {
      dispatch(
        setWishlist([])
      );

      return;
    }

    const userData =
      getUserData(
        currentUser.id
      );

    const wishlist =
      Array.isArray(
        userData?.wishlist
      )
        ? userData.wishlist
        : [];

    dispatch(
      setWishlist(
        wishlist
      )
    );
  };

/* ========================================
   Add
======================================== */

export const addToWishlist =
  (product) =>
  (
    dispatch,
    getState
  ) => {
    if (!product?.id) {
      return;
    }

    const currentUser =
      getState().auth
        .currentUser;

    if (!currentUser?.id) {
      return;
    }

    const items =
      getState().wishlist
        .items;

    const exists =
      items.some(
        (item) =>
          String(item.id) ===
          String(product.id)
      );

    if (exists) {
      return;
    }

    const updated = [
      ...items,
      product,
    ];

    persistWishlist(
      currentUser.id,
      updated
    );

    dispatch(
      setWishlist(
        updated
      )
    );
  };

/* ========================================
   Remove
======================================== */

export const removeFromWishlist =
  (productId) =>
  (
    dispatch,
    getState
  ) => {
    const currentUser =
      getState().auth
        .currentUser;

    if (!currentUser?.id) {
      return;
    }

    const items =
      getState().wishlist
        .items;

    const updated =
      items.filter(
        (item) =>
          String(item.id) !==
          String(productId)
      );

    persistWishlist(
      currentUser.id,
      updated
    );

    dispatch(
      setWishlist(
        updated
      )
    );
  };

/* ========================================
   Toggle
======================================== */

export const toggleWishlist =
  (product) =>
  (
    dispatch,
    getState
  ) => {
    const items =
      getState().wishlist
        .items;

    const exists =
      items.some(
        (item) =>
          String(item.id) ===
          String(product.id)
      );

    if (exists) {
      dispatch(
        removeFromWishlist(
          product.id
        )
      );

      return;
    }

    dispatch(
      addToWishlist(
        product
      )
    );
  };

/* ========================================
   Clear
======================================== */

export const clearWishlist =
  () =>
  (
    dispatch,
    getState
  ) => {
    const currentUser =
      getState().auth
        .currentUser;

    if (!currentUser?.id) {
      return;
    }

    persistWishlist(
      currentUser.id,
      []
    );

    dispatch(
      setWishlist([])
    );
  };

/* ========================================
   Selectors
======================================== */

export const selectWishlistItems = (
  state
) => state.wishlist.items;

export const selectWishlistCount =
  createSelector(
    [selectWishlistItems],
    (items) =>
      items.length
  );

export const selectWishlistIds =
  createSelector(
    [selectWishlistItems],
    (items) =>
      items.map(
        (item) =>
          item.id
      )
  );

export const selectIsWishlisted =
  (productId) =>
    createSelector(
      [selectWishlistItems],
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

export default wishlistSlice.reducer;