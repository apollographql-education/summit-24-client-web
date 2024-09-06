import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import {
  CreateListing,
  CreateListingLoader,
  EditListing,
  EditListingLoader,
  Home,
  HostBookings,
  HostListings,
  HostPastBookings,
  Listing,
  Listings,
  Login,
  PastTrips,
  PastTripsLoader,
  Profile,
  ProfileLoader,
  Root,
  Search,
  Trips,
  UpcomingTrips,
  UpcomingTripsLoader,
  Wallet,
  WalletLoader,
} from "./pages";
import { RootErrorBoundary } from "./components/RootErrorBoundary";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />} errorElement={<RootErrorBoundary />}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/search" element={<Search />} />
      <Route path="/listings" element={<Listings />} />
      <Route
        path="/listings/create"
        element={<CreateListing />}
        loader={CreateListingLoader}
      />
      <Route path="/listing/:id" element={<Listing />} />
      <Route
        path="/listing/:id/edit"
        element={<EditListing />}
        loader={EditListingLoader}
      />
      <Route path="/listing/:id/*" element={<HostListings />}>
        <Route path="bookings" element={<HostBookings />} />
        <Route path="past-bookings" element={<HostPastBookings />} />
      </Route>
      <Route path="trips" element={<Trips />}>
        <Route index element={<UpcomingTrips />} loader={UpcomingTripsLoader} />
        <Route path="past" element={<PastTrips />} loader={PastTripsLoader} />
      </Route>
      <Route path="/profile" element={<Profile />} loader={ProfileLoader} />
      <Route path="/wallet" element={<Wallet />} loader={WalletLoader} />
    </Route>
  )
);
