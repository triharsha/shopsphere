import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

import {
  useState,
} from "react";

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
  login,
  selectIsAuthenticated,
  selectUsers,
} from "../features/auth/authSlice";

const Login = () => {
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
    email: "",
    password: "",
  });

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  /* =====================================
     Redirect
  ===================================== */

  const redirectPath =
    location.state?.from ||
    "/";

  /* =====================================
     Input Change
  ===================================== */

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

  /* =====================================
     Login
  ===================================== */

  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const email =
      formData.email
        .trim()
        .toLowerCase();

    const password =
      formData.password;

    if (!email) {
      toast.error(
        "Email address is required."
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
        "Please enter a valid email address."
      );

      return;
    }

    if (!password) {
      toast.error(
        "Password is required."
      );

      return;
    }

    const existingUser =
      users.find(
        (user) =>
          user.email
            ?.trim()
            .toLowerCase() ===
          email
      );

    if (!existingUser) {
      toast.error(
        "No account found with this email."
      );

      return;
    }

    if (
      existingUser.password !==
      password
    ) {
      toast.error(
        "Incorrect password."
      );

      return;
    }

    try {
      setIsSubmitting(
        true
      );

      dispatch(
        login(
          existingUser
        )
      );

      toast.success(
        `Welcome back, ${existingUser.name}!`
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
        to={redirectPath}
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

          sm:min-h-[calc(100vh-5rem)]

          lg:grid-cols-2
        "
      >
        {/* =====================================
            Brand Panel
        ===================================== */}

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

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-white/80
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
            Welcome back to
            smarter shopping.
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
            Sign in to access
            your wishlist, saved
            shopping preferences,
            checkout, and order
            history.
          </p>

          <div
            className="
              mt-10

              grid
              gap-4
            "
          >
            {[
              "Continue where you left off",
              "Access your saved wishlist",
              "Manage checkout and orders",
              "Keep your shopping experience personalized",
            ].map(
              (feature) => (
                <div
                  key={feature}
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

        {/* =====================================
            Login Card
        ===================================== */}

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

                transition-colors

                hover:text-emerald-800
                dark:hover:text-emerald-300

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-emerald-500
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
              Sign in
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
              Enter your account
              details to continue.
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

              Secure sign in
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
            {/* =====================================
                Email
            ===================================== */}

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
                  inputMode="email"
                  maxLength={100}
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

                    transition-all

                    placeholder:text-stone-400
                    dark:placeholder:text-stone-600

                    focus:border-emerald-500
                    focus:ring-4
                    focus:ring-emerald-500/10

                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                />
              </div>
            </div>

            {/* =====================================
                Password
            ===================================== */}

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
                  placeholder="Enter your password"
                  autoComplete="current-password"
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

                    transition-all

                    placeholder:text-stone-400
                    dark:placeholder:text-stone-600

                    focus:border-emerald-500
                    focus:ring-4
                    focus:ring-emerald-500/10

                    disabled:cursor-not-allowed
                    disabled:opacity-60
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
                  disabled={
                    isSubmitting
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  aria-pressed={
                    showPassword
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
                    dark:text-stone-500

                    transition-all

                    hover:bg-stone-100
                    hover:text-stone-700

                    dark:hover:bg-stone-800
                    dark:hover:text-white

                    active:scale-95

                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-emerald-500

                    disabled:cursor-not-allowed
                    disabled:opacity-50
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

            {/* =====================================
                Submit
            ===================================== */}

            <button
              type="submit"
              disabled={
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

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-emerald-500

                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {isSubmitting
                ? "Signing In..."
                : "Sign In"}
            </button>
          </form>

          {/* =====================================
              Signup Link
          ===================================== */}

          <p
            className="
              mt-7

              text-center

              text-sm

              text-stone-500
              dark:text-stone-400
            "
          >
            New to ShopSphere?{" "}

            <Link
              to="/signup"
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
              Create account
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
};

export default Login;