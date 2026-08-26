import {
  createSlice,
} from "@reduxjs/toolkit";

import {
  getGuestCart,
  getUserData,
  saveGuestCart,
  updateUserData,
} from "../../utils/storage";

/* ========================================
   Helpers
======================================== */

const normalizeQuantity = (
  quantity,
  stock = 10
) => {
  const numericQuantity =
    Number(quantity) || 1;

  const numericStock =
    Number(stock) || 1;

  return Math.max(
    1,
    Math.min(
      numericQuantity,
      numericStock,
      10
    )
  );
};

const persistCart = (
  userId,
  cart
) => {
  if (userId) {
    updateUserData(
      userId,
      "cart",
      cart
    );

    return;
  }

  saveGuestCart(cart);
};

/* ========================================
   Initial State
======================================== */

const initialState = {
  items: [],

  initialized: false,
};

/* ========================================
   Cart Slice
======================================== */

const cartSlice =
  createSlice({
    name: "cart",

    initialState,

    reducers: {
      setCart: (
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

      resetCartState: (
        state
      ) => {
        state.items = [];

        state.initialized =
          false;
      },
    },
  });

/* ========================================
   Slice Actions
======================================== */

export const {
  setCart,
  resetCartState,
} = cartSlice.actions;

/* ========================================
   Initialize Cart

   Logged in:
   shopsphere_user_data[userId].cart

   Guest:
   shopsphere_guest_cart
======================================== */

export const initializeCart =
  () =>
  (
    dispatch,
    getState
  ) => {
    const currentUser =
      getState().auth
        .currentUser;

    if (currentUser?.id) {
      const userData =
        getUserData(
          currentUser.id
        );

      const cart =
        Array.isArray(
          userData?.cart
        )
          ? userData.cart
          : [];

      dispatch(
        setCart(cart)
      );

      return;
    }

    dispatch(
      setCart(
        getGuestCart()
      )
    );
  };

/* ========================================
   Add To Cart
======================================== */

export const addToCart =
  ({
    product,
    quantity = 1,
  }) =>
  (
    dispatch,
    getState
  ) => {
    if (!product?.id) {
      return;
    }

    const {
      items,
    } =
      getState().cart;

    const currentUser =
      getState().auth
        .currentUser;

    const existingItem =
      items.find(
        (item) =>
          String(
            item.product.id
          ) ===
          String(product.id)
      );

    let updatedCart;

    if (existingItem) {
      updatedCart =
        items.map(
          (item) => {
            if (
              String(
                item.product.id
              ) !==
              String(product.id)
            ) {
              return item;
            }

            return {
              ...item,

              quantity:
                normalizeQuantity(
                  item.quantity +
                    quantity,
                  product.stock
                ),
            };
          }
        );
    } else {
      updatedCart = [
        ...items,
        {
          product,

          quantity:
            normalizeQuantity(
              quantity,
              product.stock
            ),
        },
      ];
    }

    persistCart(
      currentUser?.id,
      updatedCart
    );

    dispatch(
      setCart(
        updatedCart
      )
    );
  };

/* ========================================
   Update Quantity
======================================== */

export const updateCartQuantity =
  ({
    productId,
    quantity,
  }) =>
  (
    dispatch,
    getState
  ) => {
    const {
      items,
    } =
      getState().cart;

    const currentUser =
      getState().auth
        .currentUser;

    const updatedCart =
      items.map(
        (item) => {
          if (
            String(
              item.product.id
            ) !==
            String(productId)
          ) {
            return item;
          }

          return {
            ...item,

            quantity:
              normalizeQuantity(
                quantity,
                item.product.stock
              ),
          };
        }
      );

    persistCart(
      currentUser?.id,
      updatedCart
    );

    dispatch(
      setCart(
        updatedCart
      )
    );
  };

/* ========================================
   Remove Item
======================================== */

export const removeFromCart =
  (productId) =>
  (
    dispatch,
    getState
  ) => {
    const {
      items,
    } =
      getState().cart;

    const currentUser =
      getState().auth
        .currentUser;

    const updatedCart =
      items.filter(
        (item) =>
          String(
            item.product.id
          ) !==
          String(productId)
      );

    persistCart(
      currentUser?.id,
      updatedCart
    );

    dispatch(
      setCart(
        updatedCart
      )
    );
  };

/* ========================================
   Clear Cart
======================================== */

export const clearCart =
  () =>
  (
    dispatch,
    getState
  ) => {
    const currentUser =
      getState().auth
        .currentUser;

    persistCart(
      currentUser?.id,
      []
    );

    dispatch(
      setCart([])
    );
  };

/* ========================================
   Selectors
======================================== */

export const selectCartItems = (
  state
) => state.cart.items;

export const selectCartInitialized = (
  state
) =>
  state.cart.initialized;

/* ========================================
   Total Quantity

   Example:
   Product A quantity 2
   Product B quantity 3

   Cart count = 5
======================================== */

export const selectCartCount = (
  state
) =>
  state.cart.items.reduce(
    (
      total,
      item
    ) =>
      total +
      Number(
        item.quantity || 0
      ),
    0
  );

/* ========================================
   Unique Product Count
======================================== */

export const selectCartProductCount =
  (state) =>
    state.cart.items.length;

/* ========================================
   Cart Subtotal

   Raw DummyJSON price for now.
   INR conversion will be handled
   consistently when Cart totals
   are implemented.
======================================== */

export const selectCartSubtotal = (
  state
) =>
  state.cart.items.reduce(
    (
      total,
      item
    ) =>
      total +
      Number(
        item.product?.price ||
          0
      ) *
        Number(
          item.quantity || 0
        ),
    0
  );

export default cartSlice.reducer;