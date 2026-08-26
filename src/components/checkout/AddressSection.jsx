import {
  BriefcaseBusiness,
  Check,
  Home,
  MapPin,
  Pencil,
  Plus,
  Star,
  Trash2,
  X,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  getUserData,
  updateUserData,
} from "../../utils/storage";

/* ========================================
   Empty Form
======================================== */

const emptyForm = {
  fullName: "",
  phone: "",
  addressLine: "",
  city: "",
  state: "",
  postalCode: "",
  type: "Home",
};

/* ========================================
   Load Addresses
======================================== */

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

/* ========================================
   Address Section
======================================== */

const AddressSection = ({
  userId,
  selectedAddress,
  onSelectAddress,
}) => {
  const [
    addresses,
    setAddresses,
  ] = useState(
    () =>
      loadAddresses(
        userId
      )
  );

  const [
    showForm,
    setShowForm,
  ] = useState(false);

  const [
    formData,
    setFormData,
  ] = useState(
    emptyForm
  );

  const [
    editingAddressId,
    setEditingAddressId,
  ] = useState(null);

  /* ========================================
     Persist Addresses
  ======================================== */

  const persistAddresses = (
    nextAddresses
  ) => {
    if (!userId) {
      return false;
    }

    const saved =
      updateUserData(
        userId,
        "addresses",
        nextAddresses
      );

    if (saved) {
      setAddresses(
        nextAddresses
      );
    }

    return saved;
  };

  /* ========================================
     Auto-select Default Address
  ======================================== */

  useEffect(() => {
    if (!userId) {
      onSelectAddress?.(
        null
      );

      return;
    }

    if (
      addresses.length > 0 &&
      !selectedAddress
    ) {
      const defaultAddress =
        addresses.find(
          (address) =>
            address.isDefault
        ) ||
        addresses[0];

      onSelectAddress?.(
        defaultAddress
      );
    }
  }, [
    userId,
    addresses,
    selectedAddress,
    onSelectAddress,
  ]);

  /* ========================================
     Form Change
  ======================================== */

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    let nextValue =
      value;

    if (
      name === "phone"
    ) {
      nextValue =
        value
          .replace(
            /\D/g,
            ""
          )
          .slice(
            0,
            10
          );
    }

    if (
      name ===
      "postalCode"
    ) {
      nextValue =
        value
          .replace(
            /\D/g,
            ""
          )
          .slice(
            0,
            6
          );
    }

    setFormData(
      (current) => ({
        ...current,

        [name]:
          nextValue,
      })
    );
  };

  /* ========================================
     Reset Form
  ======================================== */

  const resetForm = () => {
    setFormData({
      ...emptyForm,
    });

    setEditingAddressId(
      null
    );

    setShowForm(false);
  };

  /* ========================================
     Add Address
  ======================================== */

  const handleAddAddress =
    () => {
      if (
        showForm &&
        !editingAddressId
      ) {
        resetForm();

        return;
      }

      setEditingAddressId(
        null
      );

      setFormData({
        ...emptyForm,
      });

      setShowForm(true);
    };

  /* ========================================
     Edit Address
  ======================================== */

  const handleEdit = (
    address
  ) => {
    setEditingAddressId(
      address.id
    );

    setFormData({
      fullName:
        address.fullName ||
        "",

      phone:
        address.phone ||
        "",

      addressLine:
        address.addressLine ||
        "",

      city:
        address.city ||
        "",

      state:
        address.state ||
        "",

      postalCode:
        address.postalCode ||
        "",

      type:
        address.type ||
        "Home",
    });

    setShowForm(true);
  };

  /* ========================================
     Validate Form
  ======================================== */

  const validateForm =
    () => {
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
          "Enter a valid 6-digit postal code"
        );

        return false;
      }

      return true;
    };

  /* ========================================
     Submit
  ======================================== */

  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    if (
      !validateForm()
    ) {
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

    /* -------------------------------------
       Edit Existing
    ------------------------------------- */

    if (
      editingAddressId
    ) {
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
        !persistAddresses(
          updated
        )
      ) {
        toast.error(
          "Unable to update address"
        );

        return;
      }

      const changed =
        updated.find(
          (address) =>
            address.id ===
            editingAddressId
        );

      if (
        selectedAddress?.id ===
          editingAddressId &&
        changed
      ) {
        onSelectAddress?.(
          changed
        );
      }

      resetForm();

      toast.success(
        "Address updated"
      );

      return;
    }

    /* -------------------------------------
       Add New
    ------------------------------------- */

    const newAddress = {
      id: `address-${Date.now()}`,

      ...normalizedAddress,

      isDefault:
        addresses.length ===
        0,
    };

    const updated = [
      ...addresses,
      newAddress,
    ];

    if (
      !persistAddresses(
        updated
      )
    ) {
      toast.error(
        "Unable to save address"
      );

      return;
    }

    onSelectAddress?.(
      newAddress
    );

    resetForm();

    toast.success(
      "Address saved"
    );
  };

  /* ========================================
     Select Address
  ======================================== */

  const handleSelect = (
    address
  ) => {
    onSelectAddress?.(
      address
    );
  };

  /* ========================================
     Set Default
  ======================================== */

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
      !persistAddresses(
        updated
      )
    ) {
      toast.error(
        "Unable to update default address"
      );

      return;
    }

    const newDefault =
      updated.find(
        (address) =>
          address.id ===
          addressId
      );

    if (
      newDefault
    ) {
      onSelectAddress?.(
        newDefault
      );
    }

    toast.success(
      "Default address updated"
    );
  };

  /* ========================================
     Delete Address
  ======================================== */

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

    /* -------------------------------------
       Reassign Default
    ------------------------------------- */

    if (
      deleted?.isDefault &&
      updated.length > 0
    ) {
      updated =
        updated.map(
          (
            address,
            index
          ) => ({
            ...address,

            isDefault:
              index === 0,
          })
        );
    }

    if (
      !persistAddresses(
        updated
      )
    ) {
      toast.error(
        "Unable to delete address"
      );

      return;
    }

    /* -------------------------------------
       Selected Address Deleted
    ------------------------------------- */

    if (
      selectedAddress?.id ===
      addressId
    ) {
      const next =
        updated.find(
          (address) =>
            address.isDefault
        ) ||
        updated[0] ||
        null;

      onSelectAddress?.(
        next
      );
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

  /* ========================================
     Shared Styles
  ======================================== */

  const inputClass = `
    w-full

    rounded-xl

    border
    border-stone-200
    dark:border-stone-700

    bg-white
    dark:bg-stone-900

    px-4
    py-3

    text-sm

    text-stone-900
    dark:text-white

    placeholder:text-stone-400
    dark:placeholder:text-stone-500

    outline-none

    transition-all

    hover:border-stone-300
    dark:hover:border-stone-600

    focus:border-emerald-500
    focus:ring-4
    focus:ring-emerald-500/10
  `;

  const labelClass = `
    mb-2
    block

    text-xs
    font-bold

    text-stone-600
    dark:text-stone-300
  `;

  /* ========================================
     Address Icon
  ======================================== */

  const getAddressIcon = (
    type
  ) => {
    if (
      type === "Work"
    ) {
      return BriefcaseBusiness;
    }

    if (
      type === "Home"
    ) {
      return Home;
    }

    return MapPin;
  };

  return (
    <section
      className="
        rounded-2xl

        border
        border-stone-200
        dark:border-stone-800

        bg-white
        dark:bg-stone-900

        p-5

        shadow-sm

        sm:p-6
      "
    >
      {/* =====================================
          Header
      ===================================== */}

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
              shrink-0
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
              aria-hidden="true"
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
              Delivery Address
            </h2>

            <p
              className="
                mt-0.5

                text-xs
                leading-5

                text-stone-500
                dark:text-stone-400
              "
            >
              Choose where this
              order should be
              delivered.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={
            handleAddAddress
          }
          className="
            inline-flex
            w-fit
            items-center
            justify-center
            gap-2

            rounded-xl

            bg-emerald-600

            px-4
            py-2.5

            text-xs
            font-bold

            text-white

            transition-all

            hover:bg-emerald-700

            active:scale-[0.98]

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-emerald-500
            focus-visible:ring-offset-2

            dark:focus-visible:ring-offset-stone-900
          "
        >
          {showForm &&
          !editingAddressId ? (
            <X
              size={16}
              aria-hidden="true"
            />
          ) : (
            <Plus
              size={16}
              aria-hidden="true"
            />
          )}

          {showForm &&
          !editingAddressId
            ? "Cancel"
            : "Add Address"}
        </button>
      </div>

      {/* =====================================
          Saved Addresses
      ===================================== */}

      {addresses.length >
        0 && (
        <div
          className="
            mt-6

            grid
            gap-3
          "
        >
          {addresses.map(
            (address) => {
              const isSelected =
                selectedAddress?.id ===
                address.id;

              const AddressIcon =
                getAddressIcon(
                  address.type
                );

              return (
                <div
                  key={
                    address.id
                  }
                  className={`
                    relative

                    rounded-xl

                    border

                    p-4

                    transition-all

                    ${
                      isSelected
                        ? `
                          border-emerald-500

                          bg-emerald-50/60
                          dark:bg-emerald-950/20

                          ring-2
                          ring-emerald-500/10
                        `
                        : `
                          border-stone-200
                          dark:border-stone-700

                          bg-white
                          dark:bg-stone-900

                          hover:border-emerald-300
                          dark:hover:border-emerald-800
                        `
                    }
                  `}
                >
                  {/* Select Area */}

                  <button
                    type="button"
                    onClick={() =>
                      handleSelect(
                        address
                      )
                    }
                    aria-pressed={
                      isSelected
                    }
                    aria-label={`Use ${address.fullName}'s ${address.type} address`}
                    className="
                      w-full

                      text-left

                      focus-visible:outline-none
                    "
                  >
                    <div
                      className="
                        flex
                        items-start
                        gap-3
                      "
                    >
                      {/* Icon */}

                      <div
                        className={`
                          flex
                          h-10
                          w-10
                          shrink-0
                          items-center
                          justify-center

                          rounded-xl

                          ${
                            isSelected
                              ? `
                                bg-emerald-100
                                dark:bg-emerald-950

                                text-emerald-700
                                dark:text-emerald-400
                              `
                              : `
                                bg-stone-100
                                dark:bg-stone-800

                                text-stone-500
                                dark:text-stone-400
                              `
                          }
                        `}
                      >
                        <AddressIcon
                          size={17}
                          aria-hidden="true"
                        />
                      </div>

                      {/* Information */}

                      <div
                        className="
                          min-w-0
                          flex-1
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

                              bg-stone-100
                              dark:bg-stone-800

                              px-2
                              py-0.5

                              text-[10px]
                              font-bold

                              text-stone-600
                              dark:text-stone-300
                            "
                          >
                            {
                              address.type
                            }
                          </span>

                          {address.isDefault && (
                            <span
                              className="
                                inline-flex
                                items-center
                                gap-1

                                text-[10px]
                                font-black

                                text-amber-600
                                dark:text-amber-400
                              "
                            >
                              <Star
                                size={11}
                                fill="currentColor"
                                aria-hidden="true"
                              />

                              Default
                            </span>
                          )}

                          {isSelected && (
                            <span
                              className="
                                inline-flex
                                items-center
                                gap-1

                                rounded-full

                                bg-emerald-100
                                dark:bg-emerald-950/50

                                px-2
                                py-0.5

                                text-[10px]
                                font-black

                                text-emerald-700
                                dark:text-emerald-400
                              "
                            >
                              <Check
                                size={11}
                                aria-hidden="true"
                              />

                              Selected
                            </span>
                          )}
                        </div>

                        <p
                          className="
                            mt-2

                            break-words

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

                        <p
                          className="
                            mt-1

                            text-xs

                            text-stone-500
                            dark:text-stone-400
                          "
                        >
                          Phone:{" "}
                          <span
                            className="
                              font-semibold

                              text-stone-600
                              dark:text-stone-300
                            "
                          >
                            {
                              address.phone
                            }
                          </span>
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* =================================
                      Actions
                  ================================= */}

                  <div
                    className="
                      mt-4

                      flex
                      flex-wrap
                      items-center
                      gap-2

                      border-t
                      border-stone-100
                      dark:border-stone-800

                      pt-3
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
                          items-center
                          gap-1.5

                          rounded-lg

                          px-2.5
                          py-2

                          text-[11px]
                          font-bold

                          text-stone-500
                          dark:text-stone-400

                          transition-colors

                          hover:bg-amber-50
                          hover:text-amber-700

                          dark:hover:bg-amber-950/20
                          dark:hover:text-amber-400
                        "
                      >
                        <Star
                          size={13}
                          aria-hidden="true"
                        />

                        Make Default
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        handleEdit(
                          address
                        )
                      }
                      className="
                        inline-flex
                        items-center
                        gap-1.5

                        rounded-lg

                        px-2.5
                        py-2

                        text-[11px]
                        font-bold

                        text-stone-500
                        dark:text-stone-400

                        transition-colors

                        hover:bg-emerald-50
                        hover:text-emerald-700

                        dark:hover:bg-emerald-950/20
                        dark:hover:text-emerald-400
                      "
                    >
                      <Pencil
                        size={13}
                        aria-hidden="true"
                      />

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
                        items-center
                        gap-1.5

                        rounded-lg

                        px-2.5
                        py-2

                        text-[11px]
                        font-bold

                        text-stone-500
                        dark:text-stone-400

                        transition-colors

                        hover:bg-rose-50
                        hover:text-rose-600

                        dark:hover:bg-rose-950/20
                        dark:hover:text-rose-400
                      "
                    >
                      <Trash2
                        size={13}
                        aria-hidden="true"
                      />

                      Delete
                    </button>
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}

      {/* =====================================
          Empty State
      ===================================== */}

      {addresses.length ===
        0 &&
        !showForm && (
          <div
            className="
              mt-6

              flex
              min-h-[200px]
              flex-col
              items-center
              justify-center

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
            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center

                rounded-2xl

                bg-white
                dark:bg-stone-900

                text-stone-400
                dark:text-stone-500

                shadow-sm
              "
            >
              <MapPin
                size={25}
                aria-hidden="true"
              />
            </div>

            <h3
              className="
                mt-4

                text-sm
                font-black

                text-stone-900
                dark:text-white
              "
            >
              No saved addresses
            </h3>

            <p
              className="
                mt-1
                max-w-sm

                text-xs
                leading-5

                text-stone-500
                dark:text-stone-400
              "
            >
              Add a delivery
              address to continue
              with checkout.
            </p>
          </div>
        )}

      {/* =====================================
          Address Form
      ===================================== */}

      {showForm && (
        <form
          onSubmit={
            handleSubmit
          }
          className="
            mt-6

            rounded-2xl

            border
            border-stone-200
            dark:border-stone-700

            bg-stone-50
            dark:bg-stone-800/50

            p-4

            sm:p-5
          "
        >
          {/* Form Header */}

          <div
            className="
              flex
              items-start
              justify-between
              gap-4
            "
          >
            <div>
              <h3
                className="
                  text-sm
                  font-black

                  text-stone-900
                  dark:text-white
                "
              >
                {editingAddressId
                  ? "Edit Address"
                  : "Add New Address"}
              </h3>

              <p
                className="
                  mt-1

                  text-xs

                  text-stone-500
                  dark:text-stone-400
                "
              >
                {editingAddressId
                  ? "Update your saved delivery details."
                  : "Enter your delivery details below."}
              </p>
            </div>

            <button
              type="button"
              onClick={
                resetForm
              }
              aria-label="Close address form"
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center

                rounded-lg

                text-stone-400

                transition-colors

                hover:bg-stone-200
                hover:text-stone-700

                dark:hover:bg-stone-700
                dark:hover:text-stone-200
              "
            >
              <X
                size={16}
                aria-hidden="true"
              />
            </button>
          </div>

          {/* Fields */}

          <div
            className="
              mt-5

              grid
              gap-4

              sm:grid-cols-2
            "
          >
            {/* Full Name */}

            <div>
              <label
                htmlFor="address-full-name"
                className={
                  labelClass
                }
              >
                Full Name
              </label>

              <input
                id="address-full-name"
                name="fullName"
                type="text"
                autoComplete="name"
                placeholder="Enter full name"
                value={
                  formData.fullName
                }
                onChange={
                  handleChange
                }
                className={
                  inputClass
                }
              />
            </div>

            {/* Phone */}

            <div>
              <label
                htmlFor="address-phone"
                className={
                  labelClass
                }
              >
                Phone Number
              </label>

              <input
                id="address-phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                maxLength={10}
                placeholder="10-digit phone number"
                value={
                  formData.phone
                }
                onChange={
                  handleChange
                }
                className={
                  inputClass
                }
              />
            </div>

            {/* Address */}

            <div
              className="
                sm:col-span-2
              "
            >
              <label
                htmlFor="address-line"
                className={
                  labelClass
                }
              >
                Address
              </label>

              <input
                id="address-line"
                name="addressLine"
                type="text"
                autoComplete="street-address"
                placeholder="House number, street, area"
                value={
                  formData.addressLine
                }
                onChange={
                  handleChange
                }
                className={
                  inputClass
                }
              />
            </div>

            {/* City */}

            <div>
              <label
                htmlFor="address-city"
                className={
                  labelClass
                }
              >
                City
              </label>

              <input
                id="address-city"
                name="city"
                type="text"
                autoComplete="address-level2"
                placeholder="City"
                value={
                  formData.city
                }
                onChange={
                  handleChange
                }
                className={
                  inputClass
                }
              />
            </div>

            {/* State */}

            <div>
              <label
                htmlFor="address-state"
                className={
                  labelClass
                }
              >
                State
              </label>

              <input
                id="address-state"
                name="state"
                type="text"
                autoComplete="address-level1"
                placeholder="State"
                value={
                  formData.state
                }
                onChange={
                  handleChange
                }
                className={
                  inputClass
                }
              />
            </div>

            {/* PIN */}

            <div>
              <label
                htmlFor="address-postal-code"
                className={
                  labelClass
                }
              >
                PIN Code
              </label>

              <input
                id="address-postal-code"
                name="postalCode"
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={6}
                placeholder="6-digit PIN"
                value={
                  formData.postalCode
                }
                onChange={
                  handleChange
                }
                className={
                  inputClass
                }
              />
            </div>

            {/* Type */}

            <div>
              <label
                htmlFor="address-type"
                className={
                  labelClass
                }
              >
                Address Type
              </label>

              <select
                id="address-type"
                name="type"
                value={
                  formData.type
                }
                onChange={
                  handleChange
                }
                className={
                  inputClass
                }
              >
                <option value="Home">
                  Home
                </option>

                <option value="Work">
                  Work
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>
          </div>

          {/* Actions */}

          <div
            className="
              mt-5

              flex
              flex-col
              gap-3

              sm:flex-row
              sm:flex-wrap
            "
          >
            <button
              type="submit"
              className="
                inline-flex
                items-center
                justify-center
                gap-2

                rounded-xl

                bg-emerald-600

                px-5
                py-3

                text-sm
                font-black

                text-white

                transition-all

                hover:bg-emerald-700

                active:scale-[0.98]

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-emerald-500
              "
            >
              <Check
                size={17}
                aria-hidden="true"
              />

              {editingAddressId
                ? "Update Address"
                : "Save Address"}
            </button>

            <button
              type="button"
              onClick={
                resetForm
              }
              className="
                rounded-xl

                border
                border-stone-200
                dark:border-stone-700

                bg-white
                dark:bg-stone-900

                px-5
                py-3

                text-sm
                font-bold

                text-stone-600
                dark:text-stone-300

                transition-colors

                hover:bg-stone-100
                dark:hover:bg-stone-800
              "
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default AddressSection;