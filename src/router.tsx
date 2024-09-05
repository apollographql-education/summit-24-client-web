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
  HostListings,
  HostListingsLoader,
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
  Root,
  RootLoader,
  Search,
  SearchLoader,
  Trips,
  UpcomingTrips,
  UpcomingTripsLoader,
  Wallet,
  WalletLoader,
} from "./pages";
import { RootErrorBoundary } from "./components/RootErrorBoundary";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<Root />}
      loader={RootLoader}
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
        element={<HostListings />}
        loader={HostListingsLoader}
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
      <Route path="trips" element={<Trips />}>
        <Route index element={<UpcomingTrips />} loader={UpcomingTripsLoader} />
        <Route path="past" element={<PastTrips />} loader={PastTripsLoader} />
      </Route>
      <Route path="/profile" element={<Profile />} loader={ProfileLoader} />
      <Route path="/wallet" element={<Wallet />} loader={WalletLoader} />
    </Route>
  )
);
