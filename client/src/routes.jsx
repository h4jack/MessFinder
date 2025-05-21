// routes.jsx
import {
  Route,
  createRoutesFromElements,
} from "react-router-dom";

// Layout & Error
import Layout from './Layout';
import { ErrorPage } from './components/error/';

// Pages: Home & Search
import { HomeSearch } from './pages/home';
import { OwnerPublicProfile } from './pages/profile';
import { SearchResult, RoomDetails } from './pages/rooms';

// Pages: Auth
import {
  AuthPage,
  Login,
  Logout,
  Register,
  ResettPassword
} from './pages/auth';

// Pages: Info
import {
  Info,
  ReportOwner,
  Contact,
  Faqs,
  About,
  TermsAndConditions
} from './pages/info';

// Dashboard Shared
import {
  Dashboard,
  ChatApp,
  Bookmarks,
  Profile,
  Settings,
  MyPGs,
  SubmitPG
} from './pages/dashboard';

export const routes = createRoutesFromElements(
  <Route path="/" element={<Layout />} ErrorBoundary={ErrorPage}>
    {/* Home */}
    <Route index element={<HomeSearch />} />
    <Route path="search" element={<SearchResult />}>
      <Route path=":query" element={<SearchResult />} />
    </Route>
    <Route path="room/:roomId" element={<RoomDetails />} />
    <Route path="profile/:username" element={<OwnerPublicProfile />} />

    {/* Owner Dashboard */}
    <Route path="owner/" element={<Dashboard />}>
      <Route path="messages" element={<ChatApp />} />
      <Route path="bookmarks" element={<Bookmarks />} />
      <Route path="pgs" element={<MyPGs />} />
      <Route path="submit-pg" element={<SubmitPG />} />
      <Route path="submit-pg/:roomId" element={<SubmitPG />} />
      <Route path="profile" element={<Profile />} />
      <Route path="settings" element={<Settings />} />
      <Route path="logout" element={<Logout />} />
    </Route>

    {/* User Dashboard */}
    <Route path="user/" element={<Dashboard />}>
      <Route path="messages" element={<ChatApp />} />
      <Route path="bookmarks" element={<Bookmarks />} />
      <Route path="profile" element={<Profile />} />
      <Route path="settings" element={<Settings />} />
      <Route path="logout" element={<Logout />} />
    </Route>

    {/* Auth */}
    <Route path="auth/" element={<AuthPage />}>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forget-password" element={<ResettPassword />} />
      <Route path="reset-password" element={<ResettPassword />} />
      <Route path="logout" element={<Logout />} />
    </Route>

    {/* Info */}
    <Route path="info/" element={<Info />}>
      <Route path="contact" element={<Contact />} />
      <Route path="about" element={<About />} />
      <Route path="faqs" element={<Faqs />} />
      <Route path="terms" element={<TermsAndConditions />} />
      <Route path="report" element={<ReportOwner />} />
    </Route>

    {/* Catch-All */}
    <Route path="*" element={<ErrorPage />} />
  </Route>
);
