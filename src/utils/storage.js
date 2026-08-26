import {
  MAX_RECENTLY_VIEWED,
} from "../constants/commerce";

const USER_DATA_KEY =
  "shopsphere_user_data";

const GUEST_CART_KEY =
  "shopsphere_guest_cart";

const GUEST_RECENTLY_VIEWED_KEY =
  "shopsphere_guest_recently_viewed";

/* ========================================
   Generic JSON Helpers
======================================== */

const readJSON = (
  key,
  fallbackValue
) => {
  try {
    const storedValue =
      localStorage.getItem(key);

    if (!storedValue) {
      return fallbackValue;
    }

    return JSON.parse(
      storedValue
    );
  } catch (error) {
    console.error(
      `Failed to read ${key}:`,
      error
    );

    return fallbackValue;
  }
};

const writeJSON = (
  key,
  value
) => {
  try {
    localStorage.setItem(
      key,
      JSON.stringify(value)
    );

    return true;
  } catch (error) {
    console.error(
      `Failed to save ${key}:`,
      error
    );

    return false;
  }
};

/* ========================================
   User Data
======================================== */

export const getAllUserData =
  () => {
    const data = readJSON(
      USER_DATA_KEY,
      {}
    );

    return data &&
      typeof data === "object" &&
      !Array.isArray(data)
      ? data
      : {};
  };

export const getUserData = (
  userId
) => {
  if (!userId) {
    return null;
  }

  const allUserData =
    getAllUserData();

  return (
    allUserData[userId] || {
      cart: [],
      wishlist: [],
      addresses: [],
      orders: [],
      recentlyViewed: [],
    }
  );
};

export const saveUserData = (
  userId,
  userData
) => {
  if (!userId) {
    return false;
  }

  const allUserData =
    getAllUserData();

  allUserData[userId] = {
    cart:
      userData.cart || [],

    wishlist:
      userData.wishlist || [],

    addresses:
      userData.addresses || [],

    orders:
      userData.orders || [],

    recentlyViewed:
      userData.recentlyViewed ||
      [],
  };

  return writeJSON(
    USER_DATA_KEY,
    allUserData
  );
};

/* ========================================
   Update One User Data Section
======================================== */

export const updateUserData = (
  userId,
  section,
  value
) => {
  if (!userId) {
    return false;
  }

  const currentData =
    getUserData(userId);

  return saveUserData(
    userId,
    {
      ...currentData,
      [section]: value,
    }
  );
};

/* ========================================
   Guest Cart
======================================== */

export const getGuestCart =
  () => {
    const cart = readJSON(
      GUEST_CART_KEY,
      []
    );

    return Array.isArray(cart)
      ? cart
      : [];
  };

export const saveGuestCart = (
  cart
) => {
  return writeJSON(
    GUEST_CART_KEY,
    Array.isArray(cart)
      ? cart
      : []
  );
};

export const clearGuestCart =
  () => {
    try {
      localStorage.removeItem(
        GUEST_CART_KEY
      );

      return true;
    } catch (error) {
      console.error(
        "Failed to clear guest cart:",
        error
      );

      return false;
    }
  };

/* ========================================
   Recently Viewed Helpers
======================================== */

const normalizeRecentlyViewed =
  (items) => {
    if (!Array.isArray(items)) {
      return [];
    }

    const uniqueItems = [];

    items.forEach(
      (product) => {
        if (!product?.id) {
          return;
        }

        const exists =
          uniqueItems.some(
            (item) =>
              String(item.id) ===
              String(product.id)
          );

        if (!exists) {
          uniqueItems.push(
            product
          );
        }
      }
    );

    return uniqueItems.slice(
      0,
      MAX_RECENTLY_VIEWED
    );
  };

/* ========================================
   User Recently Viewed
======================================== */

export const getRecentlyViewed = (
  userId
) => {
  if (!userId) {
    return [];
  }

  const userData =
    getUserData(userId);

  return normalizeRecentlyViewed(
    userData?.recentlyViewed
  );
};

export const saveRecentlyViewed = (
  userId,
  products
) => {
  if (!userId) {
    return false;
  }

  return updateUserData(
    userId,
    "recentlyViewed",
    normalizeRecentlyViewed(
      products
    )
  );
};

export const addRecentlyViewed = (
  userId,
  product
) => {
  if (
    !userId ||
    !product?.id
  ) {
    return false;
  }

  const currentItems =
    getRecentlyViewed(
      userId
    );

  const filteredItems =
    currentItems.filter(
      (item) =>
        String(item.id) !==
        String(product.id)
    );

  const updatedItems =
    normalizeRecentlyViewed([
      product,
      ...filteredItems,
    ]);

  return saveRecentlyViewed(
    userId,
    updatedItems
  );
};

export const clearRecentlyViewed = (
  userId
) => {
  if (!userId) {
    return false;
  }

  return updateUserData(
    userId,
    "recentlyViewed",
    []
  );
};

/* ========================================
   Guest Recently Viewed
======================================== */

export const getGuestRecentlyViewed =
  () => {
    const products =
      readJSON(
        GUEST_RECENTLY_VIEWED_KEY,
        []
      );

    return normalizeRecentlyViewed(
      products
    );
  };

export const saveGuestRecentlyViewed =
  (products) => {
    return writeJSON(
      GUEST_RECENTLY_VIEWED_KEY,
      normalizeRecentlyViewed(
        products
      )
    );
  };

export const addGuestRecentlyViewed =
  (product) => {
    if (!product?.id) {
      return false;
    }

    const currentItems =
      getGuestRecentlyViewed();

    const filteredItems =
      currentItems.filter(
        (item) =>
          String(item.id) !==
          String(product.id)
      );

    return saveGuestRecentlyViewed([
      product,
      ...filteredItems,
    ]);
  };

export const clearGuestRecentlyViewed =
  () => {
    try {
      localStorage.removeItem(
        GUEST_RECENTLY_VIEWED_KEY
      );

      return true;
    } catch (error) {
      console.error(
        "Failed to clear guest recently viewed:",
        error
      );

      return false;
    }
  };