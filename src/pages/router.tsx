import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import {
  CreateListing,
  EditListing,
  Home,
  HostBookings,
  HostListings,
  HostPastBookings,
  Listing,
  Listings,
  Login,
  PastTrips,
  Profile,
  Root,
  Search,
  Trips,
  UpcomingTrips,
  Wallet,
} from "./index";
import { RootErrorBoundary } from "../components/RootErrorBoundary";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />} errorElement={<RootErrorBoundary />}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/search" element={<Search />} />
      <Route path="/listings" element={<Listings />} />
      <Route path="/listings/create" element={<CreateListing />} />
      <Route path="/listing/:id" element={<Listing />} />
      <Route path="/listing/:id/edit" element={<EditListing />} />
      <Route path="/listing/:id" element={<HostListings />}>
        <Route path="bookings" element={<HostBookings />} />
        <Route path="past-bookings" element={<HostPastBookings />} />
      </Route>
      <Route path="trips" element={<Trips />}>
        <Route index element={<UpcomingTrips />} />
        <Route path="past" element={<PastTrips />} />
      </Route>
      <Route path="/profile" element={<Profile />} />
      <Route path="/wallet" element={<Wallet />} />
    </Route>,
  ),
);
