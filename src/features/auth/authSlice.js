import {
  createSlice,
} from "@reduxjs/toolkit";

import {
  saveUserData,
} from "../../utils/storage";

const SESSION_KEY =
  "shopsphere_session";

const USERS_KEY =
  "shopsphere_users";

/* ========================================
   Local Storage Helpers
======================================== */

const loadSession = () => {
  try {
    const savedSession =
      localStorage.getItem(
        SESSION_KEY
      );

    if (!savedSession) {
      return null;
    }

    const parsedSession =
      JSON.parse(
        savedSession
      );

    return parsedSession &&
      typeof parsedSession ===
        "object"
      ? parsedSession
      : null;
  } catch (error) {
    console.error(
      "Failed to load ShopSphere session:",
      error
    );

    return null;
  }
};

const loadUsers = () => {
  try {
    const savedUsers =
      localStorage.getItem(
        USERS_KEY
      );

    if (!savedUsers) {
      return [];
    }

    const parsedUsers =
      JSON.parse(
        savedUsers
      );

    return Array.isArray(
      parsedUsers
    )
      ? parsedUsers
      : [];
  } catch (error) {
    console.error(
      "Failed to load ShopSphere users:",
      error
    );

    return [];
  }
};

const saveUsers = (
  users
) => {
  try {
    localStorage.setItem(
      USERS_KEY,
      JSON.stringify(
        users
      )
    );

    return true;
  } catch (error) {
    console.error(
      "Failed to save ShopSphere users:",
      error
    );

    return false;
  }
};

const saveSession = (
  user
) => {
  try {
    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify(
        user
      )
    );

    return true;
  } catch (error) {
    console.error(
      "Failed to save ShopSphere session:",
      error
    );

    return false;
  }
};

/* ========================================
   Session User Helper

   Never put password inside session.
======================================== */

const createSessionUser = (
  user
) => ({
  id: user.id,
  name: user.name,
  email: user.email,
});

/* ========================================
   Initial State
======================================== */

const savedSession =
  loadSession();

const initialState = {
  users:
    loadUsers(),

  currentUser:
    savedSession,

  isAuthenticated:
    Boolean(
      savedSession
    ),
};

/* ========================================
   Auth Slice
======================================== */

const authSlice =
  createSlice({
    name: "auth",

    initialState,

    reducers: {
      /* =====================================
         Signup
      ===================================== */

      signup: (
        state,
        action
      ) => {
        const user =
          action.payload;

        const sessionUser =
          createSessionUser(
            user
          );

        state.users.push(
          user
        );

        state.currentUser =
          sessionUser;

        state.isAuthenticated =
          true;

        saveUsers(
          state.users
        );

        saveSession(
          sessionUser
        );

        saveUserData(
          user.id,
          {
            cart: [],
            wishlist: [],
            addresses: [],
            orders: [],
            recentlyViewed:
              [],
          }
        );
      },

      /* =====================================
         Login
      ===================================== */

      login: (
        state,
        action
      ) => {
        const user =
          action.payload;

        const sessionUser =
          createSessionUser(
            user
          );

        state.currentUser =
          sessionUser;

        state.isAuthenticated =
          true;

        saveSession(
          sessionUser
        );
      },

      /* =====================================
         Update Profile
      ===================================== */

      updateProfile: (
        state,
        action
      ) => {
        if (
          !state.currentUser
            ?.id
        ) {
          return;
        }

        const {
          name,
          email,
        } = action.payload;

        const userIndex =
          state.users.findIndex(
            (user) =>
              String(
                user.id
              ) ===
              String(
                state
                  .currentUser
                  .id
              )
          );

        if (
          userIndex === -1
        ) {
          return;
        }

        /* Preserve password and
           any other user fields. */

        state.users[
          userIndex
        ] = {
          ...state.users[
            userIndex
          ],

          name,
          email,
        };

        /* Session only stores safe
           public user information. */

        const updatedSession =
          {
            ...state.currentUser,

            name,
            email,
          };

        state.currentUser =
          updatedSession;

        saveUsers(
          state.users
        );

        saveSession(
          updatedSession
        );
      },

      /* =====================================
         Logout
      ===================================== */

      logout: (
        state
      ) => {
        state.currentUser =
          null;

        state.isAuthenticated =
          false;

        try {
          localStorage.removeItem(
            SESSION_KEY
          );
        } catch (error) {
          console.error(
            "Failed to clear ShopSphere session:",
            error
          );
        }
      },
    },
  });

/* ========================================
   Actions
======================================== */

export const {
  signup,
  login,
  updateProfile,
  logout,
} = authSlice.actions;

/* ========================================
   Selectors
======================================== */

export const selectUsers = (
  state
) => state.auth.users;

export const selectCurrentUser =
  (state) =>
    state.auth
      .currentUser;

export const selectIsAuthenticated =
  (state) =>
    state.auth
      .isAuthenticated;

export default authSlice.reducer;