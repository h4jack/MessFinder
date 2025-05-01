import './index.css'
import { Navigation } from './components/ui/universal/header'
import { Footer } from './components/ui/universal/footer'
import {
  Outlet,
} from "react-router-dom";
import ScrollToTop from './components/ui/scroll-to-top';

function App() {

  return (
    <>
      <Navigation />
      <ScrollToTop />
      <Outlet />
      <Footer />
    </>
  )
}

export default App