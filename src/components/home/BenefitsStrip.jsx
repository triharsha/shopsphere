import {
  Headphones,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";

const benefits = [
  {
    id: 1,
    title: "Free Delivery",
    description:
      "On orders ₹999 and above",
    icon: Truck,
  },
  {
    id: 2,
    title: "Secure Shopping",
    description:
      "Protected checkout experience",
    icon: ShieldCheck,
  },
  {
    id: 3,
    title: "Easy Returns",
    description:
      "Simple return process",
    icon: RotateCcw,
  },
  {
    id: 4,
    title: "Customer Support",
    description:
      "We're here when you need us",
    icon: Headphones,
  },
];

const BenefitsStrip = () => {
  return (
    <section
      className="
        container-shell

        pt-5

        sm:pt-8
      "
    >
      <div
        className="
          grid

          overflow-hidden

          rounded-2xl

          border
          border-stone-200
          dark:border-stone-800

          bg-white
          dark:bg-stone-900

          sm:grid-cols-2
          lg:grid-cols-4
        "
      >
        {benefits.map(
          ({
            id,
            title,
            description,
            icon: Icon,
          }) => (
            <div
              key={id}
              className="
                flex
                items-center
                gap-4

                border-b
                border-stone-200
                dark:border-stone-800

                p-4

                last:border-b-0

                sm:p-5
                sm:[&:nth-child(odd)]:border-r

                lg:border-b-0
                lg:border-r
                lg:last:border-r-0
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
                  dark:bg-emerald-950/40

                  text-emerald-700
                  dark:text-emerald-400
                "
              >
                <Icon
                  size={20}
                  aria-hidden="true"
                />
              </div>

              <div className="min-w-0">
                <h3
                  className="
                    text-sm
                    font-bold

                    text-stone-900
                    dark:text-white
                  "
                >
                  {title}
                </h3>

                <p
                  className="
                    mt-1

                    text-xs
                    leading-5

                    text-stone-500
                    dark:text-stone-400
                  "
                >
                  {description}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default BenefitsStrip;