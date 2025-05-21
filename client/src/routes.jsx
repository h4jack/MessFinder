// routes.jsx
import {
  Route,
  createRoutesFromElements,
} from "react-router-dom";

// Layout & Error
import Layout from './Layout';
import { ErrorPage } from './components/error/error';

// Pages: Home & Search
import { HomeSearch } from './components/home/homeSearch';
import { SearchResult } from './components/rooms/search';
import { RoomDetails } from './components/rooms/room';
import OwnerPublicProfile from './components/dashboard/publicProfile';

// Pages: Auth
import AuthPage from './components/auth/auth';
import Login from './components/auth/login';
import { Register } from './components/auth/register';
import { ResettPassword } from './components/auth/reset';
import Logout from './components/auth/logout';

// Pages: Info
import Info from './components/info/info';
import { ReportOwner } from './components/info/report';
import { Contact } from './components/info/contact';
import { Faqs } from './components/info/faqs';
import { About } from './components/info/about';
import { TermsAndConditions } from './components/info/terms';

// Dashboard Shared
import Dashboard from './components/dashboard/dashboard';
import IncomingMessages from './components/dashboard/messages';
import Bookmarks from './components/dashboard/bookmarks';
import Profile from './components/dashboard/profile';
import Settings from './components/dashboard/settings';

// Dashboard Owner
import MyPGs from './components/dashboard/owner/mypgs';
import SubmitPG from './components/dashboard/owner/submit-pg';

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
