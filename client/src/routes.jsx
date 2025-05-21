// routes.jsx
import {
  Route,
  createRoutesFromElements,
} from "react-router-dom";

// Layout & Error
import Layout from './Layout';
import { ErrorPage } from './components/error/error';

// Pages: Home & Search
import { HomeSearch } from './pages/home/homeSearch';
import { SearchResult } from './pages/rooms/search';
import { RoomDetails } from './pages/rooms/room';
import OwnerPublicProfile from './pages/profile/publicProfile';

// Pages: Auth
import AuthPage from './pages/auth';
import Login from './pages/auth/login';
import { Register } from './pages/auth/register';
import { ResettPassword } from './pages/auth/reset';
import Logout from './pages/auth/logout';

// Pages: Info
import Info from './pages/info';
import { ReportOwner } from './pages/info/report';
import { Contact } from './pages/info/contact';
import { Faqs } from './pages/info/faqs';
import { About } from './pages/info/about';
import { TermsAndConditions } from './pages/info/terms';

// Dashboard Shared
import Dashboard from './pages/dashboard/dashboard';
import IncomingMessages from './pages/dashboard/messages';
import Bookmarks from './pages/dashboard/bookmarks';
import Profile from './pages/dashboard/profile';
import Settings from './pages/dashboard/settings';

// Dashboard Owner
import MyPGs from './pages/dashboard/owner/mypgs';
import SubmitPG from './pages/dashboard/owner/submit-pg';

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
      <Route path="messages" element={<IncomingMessages />} />
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
      <Route path="messages" element={<IncomingMessages />} />
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
