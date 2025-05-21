import './index.css'
import { Header, Footer } from './components/layout'

import {
  Outlet,
} from "react-router-dom";
import ScrollToTop from './scroll-to-top';

const Layout = () => {
  const user = {
    isLoggedIn: true, // Set to false if the user is not logged in
    image: "", // Replace with the user's profile image URL or leave null/undefined if not available
  };

  return (
    <>
      <Header user={user} />
      <ScrollToTop />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout;