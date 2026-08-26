import {
  Check,
  ChevronRight,
  Home,
  MapPin,
  Pencil,
  Plus,
  Star,
  Trash2,
  X,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  useSelector,
} from "react-redux";

import toast from "react-hot-toast";

import {
  selectCurrentUser,
} from "../features/auth/authSlice";

import {
  getUserData,
  updateUserData,
} from "../utils/storage";

const emptyForm = {
  fullName: "",
  phone: "",
  addressLine: "",
  city: "",
  state: "",
  postalCode: "",
  type: "Home",
};

const loadAddresses = (
  userId
) => {
  if (!userId) {
    return [];
  }

  const userData =
    getUserData(
      userId
    );

  const savedAddresses =
    Array.isArray(
      userData?.addresses
    )
      ? userData.addresses
      : [];

  if (
    savedAddresses.length > 0 &&
    !savedAddresses.some(
      (address) =>
        address.isDefault
    )
  ) {
    const normalized =
      savedAddresses.map(
        (
          address,
          index
        ) => ({
          ...address,
          isDefault:
            index === 0,
        })
      );

    updateUserData(
      userId,
      "addresses",
      normalized
    );

    return normalized;
  }

  return savedAddresses;
};

const Addresses = () => {
  const currentUser =
    useSelector(selectCurrentUser);

  const [addresses, setAddresses] =
    useState(
      () =>
        loadAddresses(
          currentUser?.id
        )
    );

  const [showForm, setShowForm] =
    useState(false);

  const [
    editingAddressId,
    setEditingAddressId,
  ] = useState(null);

  const [formData, setFormData] =
    useState(emptyForm);

  const persistAddresses = (
    nextAddresses
  ) => {
    if (!currentUser?.id) {
      return false;
    }

    const saved =
      updateUserData(
        currentUser.id,
        "addresses",
        nextAddresses
      );

    if (saved) {
      setAddresses(nextAddresses);
    }

    return saved;
  };

  const handleChange = (
    event
  ) => {
    const { name, value } =
      event.target;

    setFormData(
      (current) => ({
        ...current,
        [name]: value,
      })
    );
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingAddressId(null);
    setShowForm(false);
  };

  const handleAddAddress = () => {
    if (
      showForm &&
      !editingAddressId
    ) {
      resetForm();
      return;
    }

    setEditingAddressId(null);
    setFormData(emptyForm);
    setShowForm(true);
  };

  const handleEdit = (
    address
  ) => {
    setEditingAddressId(
      address.id
    );

    setFormData({
      fullName:
        address.fullName || "",
      phone:
        address.phone || "",
      addressLine:
        address.addressLine || "",
      city:
        address.city || "",
      state:
        address.state || "",
      postalCode:
        address.postalCode || "",
      type:
        address.type || "Home",
    });

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const validateForm = () => {
    const {
      fullName,
      phone,
      addressLine,
      city,
      state,
      postalCode,
    } = formData;

    if (
      !fullName.trim() ||
      !phone.trim() ||
      !addressLine.trim() ||
      !city.trim() ||
      !state.trim() ||
      !postalCode.trim()
    ) {
      toast.error(
        "Please complete all address fields"
      );
      return false;
    }

    if (
      !/^\d{10}$/.test(
        phone.trim()
      )
    ) {
      toast.error(
        "Enter a valid 10-digit phone number"
      );
      return false;
    }

    if (
      !/^\d{6}$/.test(
        postalCode.trim()
      )
    ) {
      toast.error(
        "Enter a valid 6-digit PIN code"
      );
      return false;
    }

    return true;
  };

  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const normalizedAddress = {
      fullName:
        formData.fullName.trim(),
      phone:
        formData.phone.trim(),
      addressLine:
        formData.addressLine.trim(),
      city:
        formData.city.trim(),
      state:
        formData.state.trim(),
      postalCode:
        formData.postalCode.trim(),
      type:
        formData.type,
    };

    if (editingAddressId) {
      const updated =
        addresses.map(
          (address) =>
            address.id ===
            editingAddressId
              ? {
                  ...address,
                  ...normalizedAddress,
                }
              : address
        );

      if (
        !persistAddresses(updated)
      ) {
        toast.error(
          "Unable to update address"
        );
        return;
      }

      resetForm();
      toast.success(
        "Address updated"
      );
      return;
    }

    const newAddress = {
      id: `address-${Date.now()}`,
      ...normalizedAddress,
      isDefault:
        addresses.length === 0,
    };

    const updated = [
      ...addresses,
      newAddress,
    ];

    if (
      !persistAddresses(updated)
    ) {
      toast.error(
        "Unable to save address"
      );
      return;
    }

    resetForm();

    toast.success(
      newAddress.isDefault
        ? "Address saved and set as default"
        : "Address saved"
    );
  };

  const handleSetDefault = (
    addressId
  ) => {
    const updated =
      addresses.map(
        (address) => ({
          ...address,
          isDefault:
            address.id ===
            addressId,
        })
      );

    if (
      !persistAddresses(updated)
    ) {
      toast.error(
        "Unable to update default address"
      );
      return;
    }

    toast.success(
      "Default address updated"
    );
  };

  const handleDelete = (
    addressId
  ) => {
    const deleted =
      addresses.find(
        (address) =>
          address.id ===
          addressId
      );

    let updated =
      addresses.filter(
        (address) =>
          address.id !==
          addressId
      );

    if (
      deleted?.isDefault &&
      updated.length > 0
    ) {
      updated =
        updated.map(
          (address, index) => ({
            ...address,
            isDefault:
              index === 0,
          })
        );
    }

    if (
      !persistAddresses(updated)
    ) {
      toast.error(
        "Unable to delete address"
      );
      return;
    }

    if (
      editingAddressId ===
      addressId
    ) {
      resetForm();
    }

    toast.success(
      "Address removed"
    );
  };

  const inputClass = `
    w-full rounded-xl border
    border-stone-200
    dark:border-stone-700
    bg-stone-50
    dark:bg-stone-800
    px-4 py-3 text-sm
    text-stone-900
    dark:text-white
    outline-none
    focus:border-emerald-500
    focus:ring-4
    focus:ring-emerald-500/10
  `;

  return (
    <div
      className="
        container-shell
        py-8
        sm:py-10
        lg:py-12
      "
    >
      <nav
        className="
          flex flex-wrap
          items-center gap-2
          text-xs font-medium
          text-stone-500
          dark:text-stone-400
        "
      >
        <Link
          to="/"
          className="
            hover:text-emerald-700
            dark:hover:text-emerald-400
          "
        >
          Home
        </Link>

        <ChevronRight size={14} />

        <Link
          to="/account"
          className="
            hover:text-emerald-700
            dark:hover:text-emerald-400
          "
        >
          My Account
        </Link>

        <ChevronRight size={14} />

        <span
          className="
            font-semibold
            text-stone-900
            dark:text-white
          "
        >
          Addresses
        </span>
      </nav>

      <div
        className="
          mt-6 flex flex-col
          gap-4
          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >
        <div>
          <div
            className="
              inline-flex
              items-center gap-2
              rounded-full
              bg-emerald-50
              dark:bg-emerald-950/30
              px-3 py-1.5
              text-xs font-black
              uppercase
              tracking-[0.12em]
              text-emerald-700
              dark:text-emerald-400
            "
          >
            <MapPin size={14} />
            Address Book
          </div>

          <h1
            className="
              mt-4 text-3xl
              font-black
              tracking-tight
              text-stone-900
              dark:text-white
              sm:text-4xl
              lg:text-5xl
            "
          >
            Saved Addresses
          </h1>

          <p
            className="
              mt-3 max-w-2xl
              text-sm leading-6
              text-stone-500
              dark:text-stone-400
            "
          >
            Add, edit and organize
            your delivery addresses.
            Your default address is
            selected automatically
            during checkout.
          </p>
        </div>

        <button
          type="button"
          onClick={
            handleAddAddress
          }
          className="
            inline-flex w-fit
            items-center
            justify-center gap-2
            rounded-xl
            bg-emerald-600
            px-4 py-3
            text-sm font-black
            text-white
            hover:bg-emerald-700
          "
        >
          {showForm &&
          !editingAddressId ? (
            <X size={17} />
          ) : (
            <Plus size={17} />
          )}

          {showForm &&
          !editingAddressId
            ? "Cancel"
            : "Add Address"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={
            handleSubmit
          }
          className="
            mt-8 rounded-2xl
            border
            border-stone-200
            dark:border-stone-800
            bg-white
            dark:bg-stone-900
            p-5 sm:p-6
          "
        >
          <div
            className="
              flex items-center
              justify-between gap-4
            "
          >
            <div>
              <h2
                className="
                  text-lg font-black
                  text-stone-900
                  dark:text-white
                "
              >
                {editingAddressId
                  ? "Edit Address"
                  : "Add New Address"}
              </h2>

              <p
                className="
                  mt-1 text-xs
                  text-stone-500
                  dark:text-stone-400
                "
              >
                {editingAddressId
                  ? "Update your saved delivery details."
                  : "Enter the address you want to save."}
              </p>
            </div>

            <button
              type="button"
              onClick={resetForm}
              aria-label="Close form"
              className="
                flex h-9 w-9
                items-center
                justify-center
                rounded-lg
                text-stone-400
                hover:bg-stone-100
                dark:hover:bg-stone-800
              "
            >
              <X size={16} />
            </button>
          </div>

          <div
            className="
              mt-6 grid gap-4
              sm:grid-cols-2
            "
          >
            <div>
              <label className="mb-2 block text-xs font-bold">
                Full Name
              </label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold">
                Phone
              </label>
              <input
                name="phone"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={formData.phone}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-xs font-bold">
                Address
              </label>
              <input
                name="addressLine"
                value={formData.addressLine}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold">
                City
              </label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold">
                State
              </label>
              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold">
                PIN Code
              </label>
              <input
                name="postalCode"
                inputMode="numeric"
                maxLength={6}
                value={formData.postalCode}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold">
                Address Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="submit"
              className="
                inline-flex
                items-center gap-2
                rounded-xl
                bg-emerald-600
                px-5 py-3
                text-sm font-black
                text-white
                hover:bg-emerald-700
              "
            >
              <Check size={17} />
              {editingAddressId
                ? "Update Address"
                : "Save Address"}
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="
                rounded-xl border
                border-stone-200
                dark:border-stone-700
                px-5 py-3
                text-sm font-bold
              "
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {addresses.length === 0 ? (
        <div
          className="
            mt-8 rounded-3xl
            border border-dashed
            border-stone-300
            dark:border-stone-700
            bg-white
            dark:bg-stone-900
            px-6 py-16
            text-center
          "
        >
          <MapPin
            size={38}
            className="
              mx-auto
              text-stone-300
            "
          />
          <h2
            className="
              mt-5 text-2xl
              font-black
            "
          >
            No saved addresses
          </h2>
          <p
            className="
              mt-2 text-sm
              text-stone-500
            "
          >
            Add an address now so
            checkout is faster next
            time.
          </p>
        </div>
      ) : (
        <div
          className="
            mt-8 grid gap-4
            lg:grid-cols-2
          "
        >
          {addresses.map(
            (address) => (
              <article
                key={address.id}
                className={`
                  rounded-2xl border
                  bg-white
                  dark:bg-stone-900
                  p-5
                  ${
                    address.isDefault
                      ? "border-emerald-400 ring-2 ring-emerald-500/10"
                      : "border-stone-200 dark:border-stone-800"
                  }
                `}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="
                      flex h-10 w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-stone-100
                      dark:bg-stone-800
                    "
                  >
                    <Home size={17} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-black">
                        {address.fullName}
                      </p>

                      <span
                        className="
                          rounded-full
                          bg-stone-100
                          dark:bg-stone-800
                          px-2 py-0.5
                          text-[10px]
                          font-bold
                        "
                      >
                        {address.type}
                      </span>

                      {address.isDefault && (
                        <span
                          className="
                            inline-flex
                            items-center gap-1
                            rounded-full
                            bg-emerald-50
                            dark:bg-emerald-950/30
                            px-2 py-0.5
                            text-[10px]
                            font-black
                            text-emerald-700
                            dark:text-emerald-400
                          "
                        >
                          <Star
                            size={10}
                            fill="currentColor"
                          />
                          Default
                        </span>
                      )}
                    </div>

                    <p className="mt-3 text-xs leading-5 text-stone-500">
                      {address.addressLine},{" "}
                      {address.city},{" "}
                      {address.state} -{" "}
                      {address.postalCode}
                    </p>

                    <p className="mt-1 text-xs text-stone-500">
                      Phone: {address.phone}
                    </p>
                  </div>
                </div>

                <div
                  className="
                    mt-5 flex
                    flex-wrap gap-2
                    border-t
                    border-stone-100
                    dark:border-stone-800
                    pt-4
                  "
                >
                  {!address.isDefault && (
                    <button
                      type="button"
                      onClick={() =>
                        handleSetDefault(
                          address.id
                        )
                      }
                      className="
                        inline-flex
                        items-center gap-2
                        rounded-xl
                        border
                        border-emerald-200
                        dark:border-emerald-900
                        px-3 py-2
                        text-xs font-bold
                        text-emerald-700
                        dark:text-emerald-400
                      "
                    >
                      <Star size={14} />
                      Set Default
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      handleEdit(address)
                    }
                    className="
                      inline-flex
                      items-center gap-2
                      rounded-xl
                      border
                      border-stone-200
                      dark:border-stone-700
                      px-3 py-2
                      text-xs font-bold
                    "
                  >
                    <Pencil size={14} />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(
                        address.id
                      )
                    }
                    className="
                      inline-flex
                      items-center gap-2
                      rounded-xl
                      border
                      border-rose-200
                      dark:border-rose-900
                      px-3 py-2
                      text-xs font-bold
                      text-rose-600
                      dark:text-rose-400
                    "
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </article>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Addresses;