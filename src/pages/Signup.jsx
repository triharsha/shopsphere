import {
  useMemo,
  useState,
} from "react";

import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  User,
} from "lucide-react";

import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import toast from "react-hot-toast";

import {
  signup,
  selectIsAuthenticated,
  selectUsers,
} from "../features/auth/authSlice";

const Signup = () => {
  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const users =
    useSelector(
      selectUsers
    );

  const isAuthenticated =
    useSelector(
      selectIsAuthenticated
    );

  const [
    formData,
    setFormData,
  ] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const redirectPath =
    location.state?.from ||
    "/";

  const isFormComplete =
    useMemo(() => {
      return Boolean(
        formData.name.trim() &&
          formData.email.trim() &&
          formData.password &&
          formData.confirmPassword
      );
    }, [formData]);

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setFormData(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );
  };

  const validateForm =
    () => {
      const name =
        formData.name.trim();

      const email =
        formData.email
          .trim()
          .toLowerCase();

      const password =
        formData.password;

      const confirmPassword =
        formData.confirmPassword;

      if (
        name.length < 2
      ) {
        toast.error(
          "Please enter a valid name."
        );

        return null;
      }

      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (
        !emailPattern.test(
          email
        )
      ) {
        toast.error(
          "Please enter a valid email address."
        );

        return null;
      }

      const emailExists =
        users.some(
          (user) =>
            user.email
              ?.trim()
              .toLowerCase() ===
            email
        );

      if (emailExists) {
        toast.error(
          "An account with this email already exists."
        );

        return null;
      }

      if (
        password.length < 6
      ) {
        toast.error(
          "Password must be at least 6 characters."
        );

        return null;
      }

      if (
        password !==
        confirmPassword
      ) {
        toast.error(
          "Passwords do not match."
        );

        return null;
      }

      return {
        name,
        email,
        password,
      };
    };

  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const validatedData =
      validateForm();

    if (!validatedData) {
      return;
    }

    try {
      setIsSubmitting(
        true
      );

      const newUser = {
        id:
          typeof crypto !==
            "undefined" &&
          typeof crypto.randomUUID ===
            "function"
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random()
                .toString(36)
                .slice(2)}`,

        ...validatedData,

        createdAt:
          new Date().toISOString(),
      };

      dispatch(
        signup(newUser)
      );

      toast.success(
        "Account created successfully."
      );

      navigate(
        redirectPath,
        {
          replace: true,
        }
      );
    } finally {
      setIsSubmitting(
        false
      );
    }
  };

  /* =====================================
     Already Authenticated
  ===================================== */

  if (isAuthenticated) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return (
    <main
      className="
        min-h-screen

        bg-stone-50
        dark:bg-stone-950

        px-4
        py-8

        sm:px-6
        sm:py-10

        lg:px-8
      "
    >
      <div
        className="
          mx-auto

          grid
          min-h-[calc(100vh-4rem)]
          max-w-6xl
          items-center
          gap-10

          lg:grid-cols-2
        "
      >
        {/* Brand Panel */}

        <section
          className="
            hidden

            rounded-3xl

            bg-gradient-to-br
            from-emerald-700
            via-emerald-600
            to-emerald-500

            p-10

            text-white

            shadow-xl
            shadow-emerald-900/10

            lg:block
          "
        >
          <Link
            to="/"
            className="
              inline-flex

              rounded-full

              border
              border-white/20

              bg-white/10

              px-4
              py-2

              text-sm
              font-bold

              text-white

              backdrop-blur-sm

              transition-colors

              hover:bg-white/20
            "
          >
            ShopSphere
          </Link>

          <h1
            className="
              mt-8

              text-5xl
              font-black
              leading-tight
              tracking-tight
            "
          >
            Create your
            shopping space.
          </h1>

          <p
            className="
              mt-5
              max-w-lg

              text-lg
              leading-8

              text-emerald-50
            "
          >
            Save products,
            manage your
            wishlist, track
            orders, and enjoy
            a more personal
            shopping experience.
          </p>

          <div
            className="
              mt-10

              grid
              gap-4
            "
          >
            {[
              "Save products to your wishlist",
              "Keep your cart across visits",
              "Access checkout and order history",
              "Manage your personal shopping profile",
            ].map(
              (feature) => (
                <div
                  key={
                    feature
                  }
                  className="
                    rounded-2xl

                    border
                    border-white/15

                    bg-white/10

                    px-5
                    py-4

                    text-sm
                    font-medium

                    backdrop-blur-sm
                  "
                >
                  {feature}
                </div>
              )
            )}
          </div>
        </section>

        {/* Signup Card */}

        <section
          className="
            mx-auto
            w-full
            max-w-md

            rounded-3xl

            border
            border-stone-200
            dark:border-stone-800

            bg-white
            dark:bg-stone-900

            p-6

            shadow-xl
            shadow-stone-900/5

            sm:p-8
          "
        >
          <div>
            <Link
              to="/"
              className="
                inline-flex

                text-2xl
                font-black
                tracking-tight

                text-emerald-700
                dark:text-emerald-400

                hover:text-emerald-800
                dark:hover:text-emerald-300
              "
            >
              ShopSphere
            </Link>

            <h2
              className="
                mt-6

                text-3xl
                font-black
                tracking-tight

                text-stone-900
                dark:text-white
              "
            >
              Create account
            </h2>

            <p
              className="
                mt-2

                text-sm
                leading-6

                text-stone-500
                dark:text-stone-400
              "
            >
              Join ShopSphere
              and personalize
              your shopping
              experience.
            </p>

            <div
              className="
                mt-4

                inline-flex
                items-center
                gap-2

                rounded-full

                bg-emerald-50
                dark:bg-emerald-950/30

                px-3
                py-1.5

                text-xs
                font-bold

                text-emerald-700
                dark:text-emerald-400
              "
            >
              <ShieldCheck
                size={14}
                aria-hidden="true"
              />

              Secure account creation
            </div>
          </div>

          <form
            onSubmit={
              handleSubmit
            }
            aria-busy={
              isSubmitting
            }
            className="
              mt-8
              space-y-5
            "
            noValidate
          >
            {/* Name */}

            <div>
              <label
                htmlFor="name"
                className="
                  mb-2
                  block

                  text-sm
                  font-semibold

                  text-stone-700
                  dark:text-stone-200
                "
              >
                Full Name
              </label>

              <div className="relative">
                <User
                  size={18}
                  aria-hidden="true"
                  className="
                    pointer-events-none

                    absolute
                    left-4
                    top-1/2

                    -translate-y-1/2

                    text-stone-400
                    dark:text-stone-500
                  "
                />

                <input
                  id="name"
                  type="text"
                  name="name"
                  value={
                    formData.name
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter your full name"
                  autoComplete="name"
                  maxLength={50}
                  required
                  disabled={
                    isSubmitting
                  }
                  className="
                    w-full

                    rounded-xl

                    border
                    border-stone-300
                    dark:border-stone-700

                    bg-white
                    dark:bg-stone-950

                    py-3
                    pl-11
                    pr-4

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
            </div>

            {/* Email */}

            <div>
              <label
                htmlFor="email"
                className="
                  mb-2
                  block

                  text-sm
                  font-semibold

                  text-stone-700
                  dark:text-stone-200
                "
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  aria-hidden="true"
                  className="
                    pointer-events-none

                    absolute
                    left-4
                    top-1/2

                    -translate-y-1/2

                    text-stone-400
                    dark:text-stone-500
                  "
                />

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  disabled={
                    isSubmitting
                  }
                  className="
                    w-full

                    rounded-xl

                    border
                    border-stone-300
                    dark:border-stone-700

                    bg-white
                    dark:bg-stone-950

                    py-3
                    pl-11
                    pr-4

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
            </div>

            {/* Password */}

            <div>
              <label
                htmlFor="password"
                className="
                  mb-2
                  block

                  text-sm
                  font-semibold

                  text-stone-700
                  dark:text-stone-200
                "
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  aria-hidden="true"
                  className="
                    pointer-events-none

                    absolute
                    left-4
                    top-1/2

                    -translate-y-1/2

                    text-stone-400
                    dark:text-stone-500
                  "
                />

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={
                    formData.password
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Minimum 6 characters"
                  autoComplete="new-password"
                  minLength={6}
                  required
                  disabled={
                    isSubmitting
                  }
                  className="
                    w-full

                    rounded-xl

                    border
                    border-stone-300
                    dark:border-stone-700

                    bg-white
                    dark:bg-stone-950

                    py-3
                    pl-11
                    pr-12

                    text-sm

                    text-stone-900
                    dark:text-white

                    outline-none

                    focus:border-emerald-500
                    focus:ring-4
                    focus:ring-emerald-500/10
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (previous) =>
                        !previous
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="
                    absolute
                    right-3
                    top-1/2

                    flex
                    h-9
                    w-9

                    -translate-y-1/2
                    items-center
                    justify-center

                    rounded-lg

                    text-stone-400

                    hover:bg-stone-100
                    dark:hover:bg-stone-800
                  "
                >
                  {showPassword ? (
                    <EyeOff
                      size={18}
                      aria-hidden="true"
                    />
                  ) : (
                    <Eye
                      size={18}
                      aria-hidden="true"
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}

            <div>
              <label
                htmlFor="confirmPassword"
                className="
                  mb-2
                  block

                  text-sm
                  font-semibold

                  text-stone-700
                  dark:text-stone-200
                "
              >
                Confirm Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  aria-hidden="true"
                  className="
                    pointer-events-none

                    absolute
                    left-4
                    top-1/2

                    -translate-y-1/2

                    text-stone-400
                    dark:text-stone-500
                  "
                />

                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  value={
                    formData.confirmPassword
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  minLength={6}
                  required
                  disabled={
                    isSubmitting
                  }
                  className="
                    w-full

                    rounded-xl

                    border
                    border-stone-300
                    dark:border-stone-700

                    bg-white
                    dark:bg-stone-950

                    py-3
                    pl-11
                    pr-12

                    text-sm

                    text-stone-900
                    dark:text-white

                    outline-none

                    focus:border-emerald-500
                    focus:ring-4
                    focus:ring-emerald-500/10
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (previous) =>
                        !previous
                    )
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  className="
                    absolute
                    right-3
                    top-1/2

                    flex
                    h-9
                    w-9

                    -translate-y-1/2
                    items-center
                    justify-center

                    rounded-lg

                    text-stone-400

                    hover:bg-stone-100
                    dark:hover:bg-stone-800
                  "
                >
                  {showConfirmPassword ? (
                    <EyeOff
                      size={18}
                      aria-hidden="true"
                    />
                  ) : (
                    <Eye
                      size={18}
                      aria-hidden="true"
                    />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={
                !isFormComplete ||
                isSubmitting
              }
              className="
                w-full

                rounded-xl

                bg-emerald-600

                px-5
                py-3.5

                text-sm
                font-black

                text-white

                shadow-lg
                shadow-emerald-600/15

                transition-all

                hover:bg-emerald-700

                active:scale-[0.99]

                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {isSubmitting
                ? "Creating Account..."
                : "Create Account"}
            </button>
          </form>

          <p
            className="
              mt-7

              text-center

              text-sm

              text-stone-500
              dark:text-stone-400
            "
          >
            Already have an
            account?{" "}

            <Link
              to="/login"
              state={{
                from:
                  redirectPath,
              }}
              className="
                font-bold

                text-emerald-700
                dark:text-emerald-400

                hover:underline
              "
            >
              Sign in
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
};

export default Signup;