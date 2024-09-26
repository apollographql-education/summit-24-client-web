import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { CreateListing } from "./add-listing";
import { EditListing } from "./edit-listing";
import { Home, loader as HomeLoader } from "./home";
import { HostBookings } from "./bookings";
import { HostListings } from "./host-listings";
import { HostPastBookings } from "./past-bookings";
import { Listing } from "./listing";
import { Listings } from "./listings";
import { Login } from "./login";
import { PastTrips } from "./past-trips";
import { Profile } from "./profile";
import { Root } from "./root";
import { Search } from "./search";
import { Trips } from "./trips";
import { UpcomingTrips } from "./upcoming-trips";
import { Wallet } from "./wallet";

import { RootErrorBoundary } from "../components/RootErrorBoundary";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />} errorElement={<RootErrorBoundary />}>
      <Route path="/" element={<Home />} loader={HomeLoader} />
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
