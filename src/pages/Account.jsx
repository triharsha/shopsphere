import {
  ChevronRight,
  Heart,
  LogOut,
  MapPin,
  Package,
  Pencil,
  ReceiptText,
  Save,
  ShoppingBag,
  User,
  X,
} from "lucide-react";

import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import toast from "react-hot-toast";

import {
  logout,
  selectCurrentUser,
  selectUsers,
  updateProfile,
} from "../features/auth/authSlice";

import {
  selectCartCount,
} from "../features/cart/cartSlice";

import {
  selectWishlistCount,
} from "../features/wishlist/wishlistSlice";

import {
  getUserData,
} from "../utils/storage";

import RecentlyViewed from "../components/product/RecentlyViewed";

const Account = () => {
  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const currentUser =
    useSelector(
      selectCurrentUser
    );

  const users =
    useSelector(
      selectUsers
    );

  const cartCount =
    useSelector(
      selectCartCount
    );

  const wishlistCount =
    useSelector(
      selectWishlistCount
    );

  /* =====================================
     Edit Profile
  ===================================== */

  const [
    isEditing,
    setIsEditing,
  ] = useState(false);

  const [
    profileForm,
    setProfileForm,
  ] = useState({
    name:
      currentUser?.name ||
      "",

    email:
      currentUser?.email ||
      "",
  });

  /* =====================================
     User Data
  ===================================== */

  const userData =
    currentUser?.id
      ? getUserData(
          currentUser.id
        )
      : null;

  const orders =
    Array.isArray(
      userData?.orders
    )
      ? userData.orders
      : [];

  const addresses =
    Array.isArray(
      userData?.addresses
    )
      ? userData.addresses
      : [];

  const recentOrder =
    orders[0] || null;

  /* =====================================
     Currency
  ===================================== */

  const formatPrice = (
    value
  ) => {
    return new Intl.NumberFormat(
      "en-IN",
      {
        style:
          "currency",

        currency:
          "INR",

        maximumFractionDigits:
          0,
      }
    ).format(
      Number(
        value || 0
      )
    );
  };

  /* =====================================
     Date
  ===================================== */

  const formatDate = (
    value
  ) => {
    if (!value) {
      return "Date unavailable";
    }

    const date =
      new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return value;
    }

    return new Intl.DateTimeFormat(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    ).format(date);
  };

  /* =====================================
     Profile Form
  ===================================== */

  const handleProfileChange =
    (event) => {
      const {
        name,
        value,
      } = event.target;

      setProfileForm(
        (current) => ({
          ...current,

          [name]:
            value,
        })
      );
    };

  const handleEditProfile =
    () => {
      setProfileForm({
        name:
          currentUser?.name ||
          "",

        email:
          currentUser?.email ||
          "",
      });

      setIsEditing(
        true
      );
    };

  const handleCancelEdit =
    () => {
      setProfileForm({
        name:
          currentUser?.name ||
          "",

        email:
          currentUser?.email ||
          "",
      });

      setIsEditing(
        false
      );
    };

  /* =====================================
     Save Profile
  ===================================== */

  const handleSaveProfile =
    (event) => {
      event.preventDefault();

      const name =
        profileForm.name
          .trim();

      const email =
        profileForm.email
          .trim()
          .toLowerCase();

      if (!name) {
        toast.error(
          "Name is required"
        );

        return;
      }

      if (
        name.length < 2
      ) {
        toast.error(
          "Name must contain at least 2 characters"
        );

        return;
      }

      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (
        !emailPattern.test(
          email
        )
      ) {
        toast.error(
          "Enter a valid email address"
        );

        return;
      }

      const emailExists =
        users.some(
          (user) =>
            String(
              user.id
            ) !==
              String(
                currentUser.id
              ) &&
            user.email
              ?.trim()
              .toLowerCase() ===
              email
        );

      if (
        emailExists
      ) {
        toast.error(
          "An account already exists with this email"
        );

        return;
      }

      dispatch(
        updateProfile({
          name,
          email,
        })
      );

      setProfileForm({
        name,
        email,
      });

      setIsEditing(
        false
      );

      toast.success(
        "Profile updated successfully"
      );
    };

  /* =====================================
     Logout
  ===================================== */

  const handleLogout =
    () => {
      dispatch(
        logout()
      );

      toast.success(
        "Signed out successfully"
      );

      navigate(
        "/",
        {
          replace: true,
        }
      );
    };

  /* =====================================
     Stats
  ===================================== */

  const stats = [
    {
      id: "orders",

      label:
        "Orders",

      value:
        orders.length,

      icon:
        Package,

      path:
        "/orders",

      description:
        "Placed orders",
    },

    {
      id: "wishlist",

      label:
        "Wishlist",

      value:
        wishlistCount,

      icon:
        Heart,

      path:
        "/wishlist",

      description:
        "Saved products",
    },

    {
      id: "cart",

      label:
        "Cart",

      value:
        cartCount,

      icon:
        ShoppingBag,

      path:
        "/cart",

      description:
        "Items in cart",
    },

    {
      id: "addresses",

      label:
        "Addresses",

      value:
        addresses.length,

      icon:
        MapPin,

      path:
        "/addresses",

      description:
        "Saved addresses",
    },
  ];

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
        />

        <span
          className="
            font-semibold

            text-stone-900
            dark:text-white
          "
        >
          My Account
        </span>
      </nav>

      {/* =====================================
          Account Header
      ===================================== */}

      <section
        className="
          mt-6

          overflow-hidden

          rounded-3xl

          border
          border-stone-200
          dark:border-stone-800

          bg-white
          dark:bg-stone-900
        "
      >
        <div
          className="
            bg-gradient-to-r
            from-emerald-600
            to-emerald-500

            px-5
            py-8

            sm:px-8
            sm:py-10
          "
        >
          <div
            className="
              flex
              flex-col
              gap-5

              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div
              className="
                flex
                flex-col
                gap-5

                sm:flex-row
                sm:items-center
              "
            >
              <div
                className="
                  flex
                  h-20
                  w-20
                  shrink-0
                  items-center
                  justify-center

                  rounded-2xl

                  border
                  border-white/30

                  bg-white/15

                  text-3xl
                  font-black

                  text-white

                  backdrop-blur-sm
                "
              >
                {currentUser?.name
                  ?.trim()
                  ?.charAt(0)
                  ?.toUpperCase() ||
                  "U"}
              </div>

              <div
                className="
                  min-w-0
                "
              >
                <p
                  className="
                    text-xs
                    font-black
                    uppercase
                    tracking-[0.14em]

                    text-emerald-100
                  "
                >
                  Welcome Back
                </p>

                <h1
                  className="
                    mt-2

                    text-3xl
                    font-black
                    tracking-tight

                    text-white

                    sm:text-4xl
                  "
                >
                  {currentUser?.name ||
                    "ShopSphere User"}
                </h1>

                <p
                  className="
                    mt-2

                    text-sm

                    text-emerald-50/90
                  "
                >
                  {currentUser?.email}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={
                handleLogout
              }
              className="
                inline-flex
                w-fit
                items-center
                justify-center
                gap-2

                rounded-xl

                border
                border-white/30

                bg-white/10

                px-4
                py-2.5

                text-sm
                font-bold

                text-white

                backdrop-blur-sm

                transition-colors

                hover:bg-white/20
              "
            >
              <LogOut
                size={17}
              />

              Logout
            </button>
          </div>
        </div>

        {/* Stats */}

        <div
          className="
            grid
            gap-px

            bg-stone-200
            dark:bg-stone-800

            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {stats.map(
            ({
              id,
              label,
              value,
              icon: Icon,
              path,
              description,
            }) => (
              <Link
                key={id}
                to={path}
                className="
                  group

                  bg-white
                  dark:bg-stone-900

                  p-5

                  transition-colors

                  hover:bg-stone-50
                  dark:hover:bg-stone-800/70
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center

                      rounded-xl

                      bg-emerald-50
                      dark:bg-emerald-950/30

                      text-emerald-700
                      dark:text-emerald-400
                    "
                  >
                    <Icon
                      size={19}
                    />
                  </div>

                  <ChevronRight
                    size={17}
                    className="
                      text-stone-300

                      transition-transform

                      group-hover:translate-x-1
                    "
                  />
                </div>

                <p
                  className="
                    mt-5

                    text-2xl
                    font-black

                    text-stone-900
                    dark:text-white
                  "
                >
                  {value}
                </p>

                <p
                  className="
                    mt-1

                    text-sm
                    font-bold

                    text-stone-700
                    dark:text-stone-300
                  "
                >
                  {label}
                </p>

                <p
                  className="
                    mt-1

                    text-xs

                    text-stone-400
                  "
                >
                  {description}
                </p>
              </Link>
            )
          )}
        </div>
      </section>

      {/* =====================================
          Profile + Addresses
      ===================================== */}

      <div
        className="
          mt-8

          grid
          gap-6

          lg:grid-cols-2
        "
      >
        {/* Profile */}

        <section
          className="
            rounded-2xl

            border
            border-stone-200
            dark:border-stone-800

            bg-white
            dark:bg-stone-900

            p-5

            sm:p-6
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              gap-4
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center

                  rounded-xl

                  bg-emerald-50
                  dark:bg-emerald-950/30

                  text-emerald-700
                  dark:text-emerald-400
                "
              >
                <User
                  size={19}
                />
              </div>

              <div>
                <h2
                  className="
                    text-lg
                    font-black

                    text-stone-900
                    dark:text-white
                  "
                >
                  Profile Details
                </h2>

                <p
                  className="
                    mt-0.5

                    text-xs

                    text-stone-500
                    dark:text-stone-400
                  "
                >
                  Manage your personal information.
                </p>
              </div>
            </div>

            {!isEditing && (
              <button
                type="button"
                onClick={
                  handleEditProfile
                }
                className="
                  inline-flex
                  items-center
                  gap-2

                  rounded-xl

                  border
                  border-stone-200
                  dark:border-stone-700

                  px-3
                  py-2

                  text-xs
                  font-bold

                  text-stone-600
                  dark:text-stone-300

                  transition-colors

                  hover:border-emerald-300
                  hover:text-emerald-700
                "
              >
                <Pencil
                  size={14}
                />

                Edit
              </button>
            )}
          </div>

          {isEditing ? (
            <form
              onSubmit={
                handleSaveProfile
              }
              className="
                mt-6
                space-y-4
              "
            >
              <div>
                <label
                  htmlFor="profileName"
                  className="
                    mb-2
                    block

                    text-xs
                    font-bold

                    text-stone-600
                    dark:text-stone-300
                  "
                >
                  Full Name
                </label>

                <input
                  id="profileName"
                  name="name"
                  value={
                    profileForm.name
                  }
                  onChange={
                    handleProfileChange
                  }
                  className="
                    w-full

                    rounded-xl

                    border
                    border-stone-200
                    dark:border-stone-700

                    bg-stone-50
                    dark:bg-stone-800

                    px-4
                    py-3

                    text-sm

                    text-stone-900
                    dark:text-white

                    outline-none

                    focus:border-emerald-500
                    focus:ring-4
                    focus:ring-emerald-500/10
                  "
                />
              </div>

              <div>
                <label
                  htmlFor="profileEmail"
                  className="
                    mb-2
                    block

                    text-xs
                    font-bold

                    text-stone-600
                    dark:text-stone-300
                  "
                >
                  Email Address
                </label>

                <input
                  id="profileEmail"
                  name="email"
                  type="email"
                  value={
                    profileForm.email
                  }
                  onChange={
                    handleProfileChange
                  }
                  className="
                    w-full

                    rounded-xl

                    border
                    border-stone-200
                    dark:border-stone-700

                    bg-stone-50
                    dark:bg-stone-800

                    px-4
                    py-3

                    text-sm

                    text-stone-900
                    dark:text-white

                    outline-none

                    focus:border-emerald-500
                    focus:ring-4
                    focus:ring-emerald-500/10
                  "
                />
              </div>

              <div
                className="
                  flex
                  flex-wrap
                  gap-3
                "
              >
                <button
                  type="submit"
                  className="
                    inline-flex
                    items-center
                    gap-2

                    rounded-xl

                    bg-emerald-600

                    px-4
                    py-2.5

                    text-xs
                    font-black

                    text-white

                    hover:bg-emerald-700
                  "
                >
                  <Save
                    size={15}
                  />

                  Save Changes
                </button>

                <button
                  type="button"
                  onClick={
                    handleCancelEdit
                  }
                  className="
                    inline-flex
                    items-center
                    gap-2

                    rounded-xl

                    border
                    border-stone-200
                    dark:border-stone-700

                    px-4
                    py-2.5

                    text-xs
                    font-bold

                    text-stone-600
                    dark:text-stone-300
                  "
                >
                  <X
                    size={15}
                  />

                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div
              className="
                mt-6

                divide-y
                divide-stone-100
                dark:divide-stone-800
              "
            >
              <div
                className="
                  flex
                  justify-between
                  gap-5

                  py-4

                  first:pt-0
                "
              >
                <span
                  className="
                    text-sm

                    text-stone-500
                    dark:text-stone-400
                  "
                >
                  Name
                </span>

                <span
                  className="
                    text-right
                    text-sm
                    font-bold

                    text-stone-900
                    dark:text-white
                  "
                >
                  {currentUser?.name}
                </span>
              </div>

              <div
                className="
                  flex
                  justify-between
                  gap-5

                  py-4
                "
              >
                <span
                  className="
                    text-sm

                    text-stone-500
                    dark:text-stone-400
                  "
                >
                  Email
                </span>

                <span
                  className="
                    max-w-[65%]
                    truncate

                    text-right
                    text-sm
                    font-bold

                    text-stone-900
                    dark:text-white
                  "
                >
                  {currentUser?.email}
                </span>
              </div>

              <div
                className="
                  flex
                  justify-between
                  gap-5

                  py-4
                  last:pb-0
                "
              >
                <span
                  className="
                    text-sm

                    text-stone-500
                    dark:text-stone-400
                  "
                >
                  Account Status
                </span>

                <span
                  className="
                    rounded-full

                    bg-emerald-50
                    dark:bg-emerald-950/30

                    px-3
                    py-1

                    text-xs
                    font-black

                    text-emerald-700
                    dark:text-emerald-400
                  "
                >
                  Active
                </span>
              </div>
            </div>
          )}
        </section>

        {/* =====================================
            Saved Addresses
        ===================================== */}

        <section
          className="
            rounded-2xl

            border
            border-stone-200
            dark:border-stone-800

            bg-white
            dark:bg-stone-900

            p-5

            sm:p-6
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              gap-4
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center

                  rounded-xl

                  bg-emerald-50
                  dark:bg-emerald-950/30

                  text-emerald-700
                  dark:text-emerald-400
                "
              >
                <MapPin
                  size={19}
                />
              </div>

              <div>
                <h2
                  className="
                    text-lg
                    font-black

                    text-stone-900
                    dark:text-white
                  "
                >
                  Saved Addresses
                </h2>

                <p
                  className="
                    mt-0.5

                    text-xs

                    text-stone-500
                    dark:text-stone-400
                  "
                >
                  Your delivery locations.
                </p>
              </div>
            </div>

            <span
              className="
                rounded-full

                bg-stone-100
                dark:bg-stone-800

                px-3
                py-1

                text-xs
                font-bold

                text-stone-500
                dark:text-stone-400
              "
            >
              {addresses.length}
            </span>
          </div>

          {addresses.length ===
          0 ? (
            <div
              className="
                mt-6

                rounded-xl

                border
                border-dashed
                border-stone-300
                dark:border-stone-700

                bg-stone-50
                dark:bg-stone-800/50

                px-5
                py-8

                text-center
              "
            >
              <MapPin
                size={28}
                className="
                  mx-auto
                  text-stone-300
                "
              />

              <p
                className="
                  mt-3

                  text-sm
                  font-bold

                  text-stone-900
                  dark:text-white
                "
              >
                No addresses saved
              </p>

              <p
                className="
                  mt-1

                  text-xs

                  text-stone-500
                  dark:text-stone-400
                "
              >
                Add your first saved
                delivery address.
              </p>
            </div>
          ) : (
            <div
              className="
                mt-6
                space-y-3
              "
            >
              {addresses
                .slice(
                  0,
                  2
                )
                .map(
                  (address) => (
                    <div
                      key={
                        address.id
                      }
                      className="
                        rounded-xl

                        bg-stone-50
                        dark:bg-stone-800/60

                        p-4
                      "
                    >
                      <div
                        className="
                          flex
                          flex-wrap
                          items-center
                          gap-2
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
                          {
                            address.fullName
                          }
                        </p>

                        <span
                          className="
                            rounded-full

                            bg-white
                            dark:bg-stone-900

                            px-2
                            py-0.5

                            text-[10px]
                            font-bold

                            text-stone-500
                            dark:text-stone-400
                          "
                        >
                          {
                            address.type
                          }
                        </span>
                      </div>

                      <p
                        className="
                          mt-2

                          text-xs
                          leading-5

                          text-stone-500
                          dark:text-stone-400
                        "
                      >
                        {
                          address.addressLine
                        }
                        ,{" "}
                        {
                          address.city
                        }
                        ,{" "}
                        {
                          address.state
                        }{" "}
                        -{" "}
                        {
                          address.postalCode
                        }
                      </p>
                    </div>
                  )
                )}
            </div>
          )}

          <Link
            to="/addresses"
            className="
              mt-5

              inline-flex
              items-center
              gap-2

              text-xs
              font-black

              text-emerald-700
              dark:text-emerald-400
            "
          >
            Manage Addresses

            <ChevronRight
              size={14}
            />
          </Link>
        </section>
      </div>

      {/* =====================================
          Recent Order
      ===================================== */}

      <section
        className="
          mt-6

          rounded-2xl

          border
          border-stone-200
          dark:border-stone-800

          bg-white
          dark:bg-stone-900

          p-5

          sm:p-6
        "
      >
        <div
          className="
            flex
            flex-wrap
            items-center
            justify-between
            gap-4
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center

                rounded-xl

                bg-emerald-50
                dark:bg-emerald-950/30

                text-emerald-700
                dark:text-emerald-400
              "
            >
              <ReceiptText
                size={19}
              />
            </div>

            <div>
              <h2
                className="
                  text-lg
                  font-black

                  text-stone-900
                  dark:text-white
                "
              >
                Recent Order
              </h2>

              <p
                className="
                  mt-0.5

                  text-xs

                  text-stone-500
                  dark:text-stone-400
                "
              >
                Your latest ShopSphere purchase.
              </p>
            </div>
          </div>

          {orders.length >
            0 && (
            <Link
              to="/orders"
              className="
                inline-flex
                items-center
                gap-2

                text-xs
                font-black

                text-emerald-700
                dark:text-emerald-400
              "
            >
              View All Orders

              <ChevronRight
                size={14}
              />
            </Link>
          )}
        </div>

        {!recentOrder ? (
          <div
            className="
              mt-6

              rounded-xl

              border
              border-dashed
              border-stone-300
              dark:border-stone-700

              bg-stone-50
              dark:bg-stone-800/50

              px-5
              py-10

              text-center
            "
          >
            <Package
              size={30}
              className="
                mx-auto
                text-stone-300
              "
            />

            <p
              className="
                mt-3

                text-sm
                font-bold

                text-stone-900
                dark:text-white
              "
            >
              No orders yet
            </p>

            <Link
              to="/shop"
              className="
                mt-5

                inline-flex

                rounded-xl

                bg-emerald-600

                px-4
                py-2.5

                text-xs
                font-black

                text-white
              "
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div
            className="
              mt-6

              rounded-2xl

              bg-stone-50
              dark:bg-stone-800/50

              p-5
            "
          >
            <div
              className="
                flex
                flex-col
                gap-4

                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <div>
                <p
                  className="
                    text-[10px]
                    font-black
                    uppercase

                    text-stone-400
                  "
                >
                  Order ID
                </p>

                <p
                  className="
                    mt-1

                    text-sm
                    font-black

                    text-stone-900
                    dark:text-white
                  "
                >
                  {
                    recentOrder.id
                  }
                </p>

                <p
                  className="
                    mt-2

                    text-xs

                    text-stone-500
                    dark:text-stone-400
                  "
                >
                  {formatDate(
                    recentOrder.createdAt
                  )}
                </p>
              </div>

              <div
                className="
                  sm:text-right
                "
              >
                <span
                  className="
                    inline-flex

                    rounded-full

                    bg-emerald-50
                    dark:bg-emerald-950/30

                    px-3
                    py-1

                    text-xs
                    font-black

                    text-emerald-700
                    dark:text-emerald-400
                  "
                >
                  {recentOrder.status ||
                    "Order Placed"}
                </span>

                <p
                  className="
                    mt-3

                    text-xl
                    font-black

                    text-stone-900
                    dark:text-white
                  "
                >
                  {formatPrice(
                    recentOrder
                      .pricing
                      ?.total
                  )}
                </p>
              </div>
            </div>

            <Link
              to={`/order-success?order=${encodeURIComponent(
                recentOrder.id
              )}`}
              className="
                mt-5

                inline-flex
                items-center
                gap-2

                text-xs
                font-black

                text-emerald-700
                dark:text-emerald-400
              "
            >
              View Order Details

              <ChevronRight
                size={14}
              />
            </Link>
          </div>
        )}
      </section>

      {/* =====================================
          Recently Viewed
      ===================================== */}

      <RecentlyViewed
        userId={
          currentUser?.id
        }
      />

      {/* =====================================
          Quick Actions
      ===================================== */}

      <section
        className="
          mt-6

          grid
          gap-4

          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        <Link
          to="/orders"
          className="
            rounded-2xl

            border
            border-stone-200
            dark:border-stone-800

            bg-white
            dark:bg-stone-900

            p-5

            transition-all

            hover:-translate-y-0.5
            hover:border-emerald-300
          "
        >
          <Package
            size={22}
            className="
              text-emerald-700
              dark:text-emerald-400
            "
          />

          <p
            className="
              mt-4
              font-black
            "
          >
            My Orders
          </p>

          <p
            className="
              mt-1

              text-xs
              text-stone-500
            "
          >
            View order history
            and purchase details.
          </p>
        </Link>

        <Link
          to="/wishlist"
          className="
            rounded-2xl

            border
            border-stone-200
            dark:border-stone-800

            bg-white
            dark:bg-stone-900

            p-5

            transition-all

            hover:-translate-y-0.5
            hover:border-rose-300
          "
        >
          <Heart
            size={22}
            className="
              text-rose-500
            "
          />

          <p
            className="
              mt-4
              font-black
            "
          >
            Wishlist
          </p>

          <p
            className="
              mt-1

              text-xs
              text-stone-500
            "
          >
            Revisit products you
            saved for later.
          </p>
        </Link>

        <Link
          to="/shop"
          className="
            rounded-2xl

            border
            border-stone-200
            dark:border-stone-800

            bg-white
            dark:bg-stone-900

            p-5

            transition-all

            hover:-translate-y-0.5
            hover:border-emerald-300
          "
        >
          <ShoppingBag
            size={22}
            className="
              text-emerald-700
              dark:text-emerald-400
            "
          />

          <p
            className="
              mt-4
              font-black
            "
          >
            Continue Shopping
          </p>

          <p
            className="
              mt-1

              text-xs
              text-stone-500
            "
          >
            Explore more products
            across ShopSphere.
          </p>
        </Link>
      </section>
    </div>
  );
};

export default Account;