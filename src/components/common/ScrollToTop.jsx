import {
  useEffect,
} from "react";

import {
  useLocation,
} from "react-router-dom";

const ScrollToTop = () => {
  const {
    pathname,
    search,
  } = useLocation();

  useEffect(() => {
    /*
     * Safety cleanup:
     *
     * A mobile drawer/menu can temporarily
     * lock body scrolling with overflow:hidden.
     *
     * Whenever navigation completes, make sure
     * the new page is scrollable again.
     */

    document.body.style.overflow =
      "";

    document.documentElement.style.overflow =
      "";

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [
    pathname,
    search,
  ]);

  return null;
};

export default ScrollToTop;