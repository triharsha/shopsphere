import {
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

const AnnouncementBar = () => {
  return (
    <div
      className="
        bg-stone-900
        dark:bg-black

        text-white
      "
    >
      <div
        className="
          container-shell

          flex
          min-h-9
          items-center
          justify-center
          gap-4

          py-2

          sm:justify-between
        "
      >
        {/* =====================================
            Shipping Message
        ===================================== */}

        <div
          className="
            flex
            min-w-0
            items-center
            gap-2

            text-center

            text-[11px]
            font-medium

            text-stone-200

            sm:text-xs
          "
        >
          <Truck
            size={14}
            className="
              shrink-0

              text-emerald-400
            "
            aria-hidden="true"
          />

          <span>
            Free shipping on orders
            ₹999 and above
          </span>
        </div>

        {/* =====================================
            Desktop Benefits
        ===================================== */}

        <div
          className="
            hidden
            shrink-0
            items-center
            gap-5

            sm:flex
          "
        >
          <div
            className="
              flex
              items-center
              gap-2

              text-xs
              font-medium

              text-stone-300
            "
          >
            <ShieldCheck
              size={14}
              className="
                shrink-0

                text-emerald-400
              "
              aria-hidden="true"
            />

            Secure shopping
          </div>

          <span
            aria-hidden="true"
            className="
              h-4
              w-px

              bg-stone-700
            "
          />

          <Link
            to="/shop?sort=discount"
            className="
              flex
              items-center
              gap-1.5

              rounded-md

              text-xs
              font-bold

              text-amber-400

              transition-colors

              hover:text-amber-300

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-amber-400
              focus-visible:ring-offset-2
              focus-visible:ring-offset-stone-900
            "
          >
            <Sparkles
              size={13}
              aria-hidden="true"
            />

            New season deals
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;