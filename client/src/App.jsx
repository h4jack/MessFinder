import './index.css'
import { Navigation } from './components/ui/universal/header'
import { Footer } from './components/ui/universal/footer'
import {
  Outlet,
} from "react-router-dom";
import ScrollToTop from './components/ui/scroll-to-top';

const App = () => {
  const user = {
    isLoggedIn: true, // Set to false if the user is not logged in
    image: "", // Replace with the user's profile image URL or leave null/undefined if not available
  };

  return (
    <>
      <Navigation user={user} />
      <ScrollToTop />
      <Outlet />
      <Footer />
    </>
  )
}

export default App