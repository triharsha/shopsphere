import {
  useEffect,
  useState,
} from "react";

import {
  Outlet,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import AnnouncementBar from "./AnnouncementBar";
import Navbar from "./Navbar";
import CategoryNav from "./CategoryNav";
import MobileMenu from "./MobileMenu";
import Footer from "./Footer";

import {
  initializeCart,
} from "../../features/cart/cartSlice";

import {
  initializeWishlist,
} from "../../features/wishlist/wishlistSlice";

import {
  selectCurrentUser,
} from "../../features/auth/authSlice";

const MainLayout = () => {
  const dispatch =
    useDispatch();

  const currentUser =
    useSelector(
      selectCurrentUser
    );

  const [
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  ] = useState(false);

  useEffect(() => {
    dispatch(
      initializeCart()
    );
  }, [
    dispatch,
    currentUser?.id,
  ]);

  useEffect(() => {
    dispatch(
      initializeWishlist()
    );
  }, [
    dispatch,
    currentUser?.id,
  ]);

  const openMobileMenu =
    () => {
      setIsMobileMenuOpen(
        true
      );
    };

  const closeMobileMenu =
    () => {
      setIsMobileMenuOpen(
        false
      );
    };

  return (
    <div
      className="
        flex
        min-h-screen
        w-full
        flex-col

        overflow-x-hidden

        bg-stone-50
        dark:bg-stone-950

        text-stone-900
        dark:text-stone-100
      "
    >
      <AnnouncementBar />

      <Navbar
        onMenuClick={
          openMobileMenu
        }
      />

      <CategoryNav />

      <MobileMenu
        isOpen={
          isMobileMenuOpen
        }
        onClose={
          closeMobileMenu
        }
      />

      <main
        className="
          min-w-0
          flex-1

          overflow-x-hidden
        "
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
