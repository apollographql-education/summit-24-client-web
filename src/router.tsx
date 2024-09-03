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
  HomeLoader,
  HostBookings,
  HostBookingsLoader,
  HostPastBookings,
  HostPastBookingsLoader,
  Listing,
  ListingLoader,
  Listings,
  ListingsLoader,
  Login,
  PastTrips,
  PastTripsLoader,
  Profile,
  ProfileLoader,
  Search,
  SearchLoader,
  Trips,
  TripsLoader,
  Wallet,
  WalletLoader,
} from "./pages";
import { Layout, loader as LayoutLoader } from "./layouts/Layout";
import { RootErrorBoundary } from "./components/RootErrorBoundary";
import {
  BookingsLayout,
  loader as BookingsLayoutLoader,
} from "./layouts/Bookings";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<Layout />}
      loader={LayoutLoader}
      errorElement={<RootErrorBoundary />}
    >
      <Route path="/" element={<Home />} loader={HomeLoader} />
      <Route path="/login" element={<Login />} />
      <Route path="/search" element={<Search />} loader={SearchLoader} />
      <Route path="/listings" element={<Listings />} loader={ListingsLoader} />
      <Route
        path="/listings/create"
        element={<CreateListing />}
        loader={CreateListingLoader}
      />
      <Route path="/listing/:id" element={<Listing />} loader={ListingLoader} />
      <Route
        path="/listing/:id/edit"
        element={<EditListing />}
        loader={EditListingLoader}
      />
      <Route
        path="/listing/:id/*"
        element={<BookingsLayout />}
        loader={BookingsLayoutLoader}
      >
        <Route
          path="bookings"
          element={<HostBookings />}
          loader={HostBookingsLoader}
        />
        <Route
          path="past-bookings"
          element={<HostPastBookings />}
          loader={HostPastBookingsLoader}
        />
      </Route>
      <Route path="/trips" element={<Trips />} loader={TripsLoader} />
      <Route
        path="/past-trips"
        element={<PastTrips />}
        loader={PastTripsLoader}
      />
      <Route path="/profile" element={<Profile />} loader={ProfileLoader} />
      <Route path="/wallet" element={<Wallet />} loader={WalletLoader} />
    </Route>
  )
);
