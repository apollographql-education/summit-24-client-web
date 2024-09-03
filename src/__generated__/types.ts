export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type AddFundsToWalletResponse = MutationResponse & {
  __typename?: "AddFundsToWalletResponse";
  /** Updated wallet amount */
  amount: Maybe<Scalars["Float"]["output"]>;
  /** Similar to HTTP status code, represents the status of the mutation */
  code: Scalars["Int"]["output"];
  /** Human-readable message for the UI */
  message: Scalars["String"]["output"];
  /** Indicates whether the mutation was successful */
  success: Scalars["Boolean"]["output"];
};

/** What the location provides. An amenity should be tied to a specific category. */
export type Amenity = {
  __typename?: "Amenity";
  /** The category for the amenity */
  category: AmenityCategory;
  id: Scalars["ID"]["output"];
  /** The name of the amenity. Should be short. */
  name: Scalars["String"]["output"];
};

/** The category an amenity belongs to. */
export enum AmenityCategory {
  ACCOMMODATION_DETAILS = "ACCOMMODATION_DETAILS",
  OUTDOORS = "OUTDOORS",
  SPACE_SURVIVAL = "SPACE_SURVIVAL",
}

/** A booking is a reservation for a specific listing */
export type Booking = {
  __typename?: "Booking";
  /** Check-in date for the reservation */
  checkInDate: Scalars["String"]["output"];
  /** Check-out date for the reservation */
  checkOutDate: Scalars["String"]["output"];
  /** The guest that reserved the location */
  guest: Guest;
  /** The host's review about the guest */
  guestReview: Maybe<Review>;
  /** The guest's review about the host */
  hostReview: Maybe<Review>;
  id: Scalars["ID"]["output"];
  /** The listing associated with the reservation */
  listing: Listing;
  /** The guest's review of the location */
  locationReview: Maybe<Review>;
  /** The status of the booking - check BookingStatus type for all possibilities */
  status: BookingStatus;
  /** Total price paid, calculated using the listing's costPerNight and the check-in check-out dates */
  totalPrice: Scalars["Float"]["output"];
};

/** The status of a booking */
export enum BookingStatus {
  COMPLETED = "COMPLETED",
  CURRENT = "CURRENT",
  UPCOMING = "UPCOMING",
}

/** Fields for creating a booking */
export type CreateBookingInput = {
  /** Date of check-in */
  checkInDate: Scalars["ID"]["input"];
  /** Date of check-out */
  checkOutDate: Scalars["ID"]["input"];
  /** ID of the listing associated with the booking */
  listingId: Scalars["ID"]["input"];
};

/** The response after creating a booking. */
export type CreateBookingResponse = MutationResponse & {
  __typename?: "CreateBookingResponse";
  /** The newly-created booking */
  booking: Maybe<NewBookingResponse>;
  /** Similar to HTTP status code, represents the status of the mutation */
  code: Scalars["Int"]["output"];
  /** Human-readable message for the UI */
  message: Scalars["String"]["output"];
  /** Indicates whether the mutation was successful */
  success: Scalars["Boolean"]["output"];
};

/** Used to create a listing */
export type CreateListingInput = {
  /** The Listing's amenities  */
  amenities: Array<Scalars["ID"]["input"]>;
  /** The cost per night */
  costPerNight: Scalars["Float"]["input"];
  /** The listing's description */
  description: Scalars["String"]["input"];
  /** The location type of the listing */
  locationType: LocationType;
  /** The number of beds available */
  numOfBeds: Scalars["Int"]["input"];
  /** The thumbnail image for the listing */
  photoThumbnail: Scalars["String"]["input"];
  /** The listing's title */
  title: Scalars["String"]["input"];
};

/** Response after creating a listing */
export type CreateListingResponse = MutationResponse & {
  __typename?: "CreateListingResponse";
  /** Similar to HTTP status code, represents the status of the mutation */
  code: Scalars["Int"]["output"];
  /** The newly created listing */
  listing: Maybe<Listing>;
  /** Human-readable message for the UI */
  message: Scalars["String"]["output"];
  /** Indicates whether the mutation was successful */
  success: Scalars["Boolean"]["output"];
};

/** A guest is a type of Airlock user. They book places to stay. */
export type Guest = User & {
  __typename?: "Guest";
  /** Amount of money in the guest's wallet */
  funds: Scalars["Float"]["output"];
  id: Scalars["ID"]["output"];
  /** The user's first and last name */
  name: Scalars["String"]["output"];
  /** The user's profile photo URL */
  profilePicture: Scalars["String"]["output"];
};

/** A host is a type of Airlock user. They own listings. */
export type Host = User & {
  __typename?: "Host";
  id: Scalars["ID"]["output"];
  /** The user's first and last name */
  name: Scalars["String"]["output"];
  /** The overall calculated rating for the host */
  overallRating: Maybe<Scalars["Float"]["output"]>;
  /** The host's profile bio description, will be shown in the listing */
  profileDescription: Scalars["String"]["output"];
  /** The user's profile photo URL */
  profilePicture: Scalars["String"]["output"];
};

/** A listing is a location owned by a host. A listing has a list of amenities it offers. Listings have a fixed cost per night value. */
export type Listing = {
  __typename?: "Listing";
  /** The amenities available for this listing */
  amenities: Array<Maybe<Amenity>>;
  /** The list of bookings for a listing */
  bookings: Array<Maybe<Booking>>;
  /** The cost per night */
  costPerNight: Scalars["Float"]["output"];
  /** An array of upcoming reserved dates that the listing has been booked for */
  currentlyBookedDates: Array<Maybe<ReservedDate>>;
  /** The listing's description */
  description: Scalars["String"]["output"];
  /** Owner of the listing */
  host: Host;
  id: Scalars["ID"]["output"];
  /** The location type of the listing */
  locationType: LocationType;
  /** The number of beds available */
  numOfBeds: Scalars["Int"]["output"];
  /** The number of current and upcoming bookings for a listing */
  numberOfUpcomingBookings: Scalars["Int"]["output"];
  /** The overall calculated rating for a listing */
  overallRating: Maybe<Scalars["Float"]["output"]>;
  /** The thumbnail image for the listing */
  photoThumbnail: Scalars["String"]["output"];
  /** The submitted reviews for this listing */
  reviews: Array<Maybe<Review>>;
  /** The listing's title */
  title: Scalars["String"]["output"];
  /** Calculated total cost of the listing with the given arguments */
  totalCost: Scalars["Float"]["output"];
};

/** A listing is a location owned by a host. A listing has a list of amenities it offers. Listings have a fixed cost per night value. */
export type ListingtotalCostArgs = {
  checkInDate: Scalars["String"]["input"];
  checkOutDate: Scalars["String"]["input"];
};

/** A listing can be one of these types. */
export enum LocationType {
  APARTMENT = "APARTMENT",
  CAMPSITE = "CAMPSITE",
  HOUSE = "HOUSE",
  ROOM = "ROOM",
  SPACESHIP = "SPACESHIP",
}

export type Mutation = {
  __typename?: "Mutation";
  addFundsToWallet: AddFundsToWalletResponse;
  createBooking: CreateBookingResponse;
  /** Creates a new listing for the currently authenticated host */
  createListing: CreateListingResponse;
  /** Creates a review for the guest - must be authored by host of past booking */
  submitGuestReview: SubmitGuestReviewResponse;
  /** Creates reviews for both host and listing for a particular booking - must be authored by guest of past booking */
  submitHostAndLocationReviews: SubmitHostAndLocationReviewsResponse;
  /** Updates an existing listing */
  updateListing: UpdateListingResponse;
  /** Updates the logged-in user's profile information */
  updateProfile: UpdateProfileResponse;
};

export type MutationaddFundsToWalletArgs = {
  amount: Scalars["Float"]["input"];
};

export type MutationcreateBookingArgs = {
  createBookingInput?: InputMaybe<CreateBookingInput>;
};

export type MutationcreateListingArgs = {
  listing: CreateListingInput;
};

export type MutationsubmitGuestReviewArgs = {
  bookingId: Scalars["ID"]["input"];
  guestReview: ReviewInput;
};

export type MutationsubmitHostAndLocationReviewsArgs = {
  bookingId: Scalars["ID"]["input"];
  hostReview: ReviewInput;
  locationReview: ReviewInput;
};

export type MutationupdateListingArgs = {
  listing: UpdateListingInput;
  listingId: Scalars["ID"]["input"];
};

export type MutationupdateProfileArgs = {
  updateProfileInput?: InputMaybe<UpdateProfileInput>;
};

export type MutationResponse = {
  /** Similar to HTTP status code, represents the status of the mutation */
  code: Scalars["Int"]["output"];
  /** Human-readable message for the UI */
  message: Scalars["String"]["output"];
  /** Indicates whether the mutation was successful */
  success: Scalars["Boolean"]["output"];
};

/** Minimum details needed for a newly created booking */
export type NewBookingResponse = {
  __typename?: "NewBookingResponse";
  checkInDate: Scalars["String"]["output"];
  checkOutDate: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
};

export type Query = {
  __typename?: "Query";
  /** All bookings for the given listing, optionally filtered by a BookingStatus */
  bookingsForListing: Array<Maybe<Booking>>;
  /** Current booking for guest based on current date */
  currentGuestBooking: Maybe<Booking>;
  /** A curated array of listings to feature on the homepage */
  featuredListings: Array<Listing>;
  /** A list of bookings for the guest - must be authenticated as guest */
  guestBookings: Array<Maybe<Booking>>;
  /** Return the listings that belong to the currently logged-in host */
  hostListings: Array<Maybe<Listing>>;
  /** Returns the details about this listing */
  listing: Maybe<Listing>;
  /** Returns all possible amenities for a listing */
  listingAmenities: Array<Amenity>;
  /** Currently logged-in user */
  me: User;
  /** Past bookings for guest based on current date */
  pastGuestBookings: Array<Maybe<Booking>>;
  /** Search results for listings that fit the criteria provided */
  searchListings: Array<Maybe<Listing>>;
  /** Upcoming and current bookings for guest based on current date */
  upcomingGuestBookings: Array<Maybe<Booking>>;
  user: Maybe<User>;
};

export type QuerybookingsForListingArgs = {
  listingId: Scalars["ID"]["input"];
  status?: InputMaybe<BookingStatus>;
};

export type QuerylistingArgs = {
  id: Scalars["ID"]["input"];
};

export type QuerysearchListingsArgs = {
  criteria?: InputMaybe<SearchListingsInput>;
};

export type QueryuserArgs = {
  id: Scalars["ID"]["input"];
};

/** A booking is reserved for a certain date range, marked by the checkInDate and checkOutDate fields */
export type ReservedDate = {
  __typename?: "ReservedDate";
  /** Date the guest checks in */
  checkInDate: Scalars["String"]["output"];
  /** Date the guest checks out */
  checkOutDate: Scalars["String"]["output"];
};

/** A review consists of a numerical rating and written text. It can be written by a host or a guest. */
export type Review = {
  __typename?: "Review";
  /** User that wrote the review */
  author: User;
  id: Scalars["ID"]["output"];
  /** The numerical rating for the review target, on a scale of 1-5, with 5 being excellent. */
  rating: Scalars["Float"]["output"];
  /** Written comment the author has written about the review target */
  text: Scalars["String"]["output"];
};

/** ReviewInput is the bare minimum needed to submit a review, not tied to any target. */
export type ReviewInput = {
  rating: Scalars["Float"]["input"];
  text: Scalars["String"]["input"];
};

/** To search for a listing, you need these fields. */
export type SearchListingsInput = {
  checkInDate: Scalars["String"]["input"];
  checkOutDate: Scalars["String"]["input"];
  /** The number of listings you can display in a page, defaults to 5 */
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  numOfBeds?: InputMaybe<Scalars["Int"]["input"]>;
  /** The page in the search results, defaults to 1 */
  page?: InputMaybe<Scalars["Int"]["input"]>;
  /** The results sort order, defaults to cost descending */
  sortBy?: InputMaybe<SortByCriteria>;
};

/** Listings can be sorted by these options */
export enum SortByCriteria {
  COST_ASC = "COST_ASC",
  COST_DESC = "COST_DESC",
}

/** The response after submitting reviews for a guest. */
export type SubmitGuestReviewResponse = MutationResponse & {
  __typename?: "SubmitGuestReviewResponse";
  /** Similar to HTTP status code, represents the status of the mutation */
  code: Scalars["Int"]["output"];
  /** Newly created review about the guest */
  guestReview: Maybe<Review>;
  /** Human-readable message for the UI */
  message: Scalars["String"]["output"];
  /** Indicates whether the mutation was successful */
  success: Scalars["Boolean"]["output"];
};

/** The response after submitting reviews for both host and location together. */
export type SubmitHostAndLocationReviewsResponse = MutationResponse & {
  __typename?: "SubmitHostAndLocationReviewsResponse";
  /** Similar to HTTP status code, represents the status of the mutation */
  code: Scalars["Int"]["output"];
  /** Newly created review about the host */
  hostReview: Maybe<Review>;
  /** Newly created review about the location */
  locationReview: Maybe<Review>;
  /** Human-readable message for the UI */
  message: Scalars["String"]["output"];
  /** Indicates whether the mutation was successful */
  success: Scalars["Boolean"]["output"];
};

/** Updates the properties included. If none are given, don't update anything */
export type UpdateListingInput = {
  /** The Listing's amenities  */
  amenities?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  /** The cost per night */
  costPerNight?: InputMaybe<Scalars["Float"]["input"]>;
  /** The listing's description */
  description?: InputMaybe<Scalars["String"]["input"]>;
  /** The location type of the listing */
  locationType?: InputMaybe<LocationType>;
  /** The number of beds available */
  numOfBeds?: InputMaybe<Scalars["Int"]["input"]>;
  /** The thumbnail image for the listing */
  photoThumbnail?: InputMaybe<Scalars["String"]["input"]>;
  /** The listing's title */
  title?: InputMaybe<Scalars["String"]["input"]>;
};

/** Response after updating a listing */
export type UpdateListingResponse = MutationResponse & {
  __typename?: "UpdateListingResponse";
  /** Similar to HTTP status code, represents the status of the mutation */
  code: Scalars["Int"]["output"];
  /** The newly updated listing */
  listing: Maybe<Listing>;
  /** Human-readable message for the UI */
  message: Scalars["String"]["output"];
  /** Indicates whether the mutation was successful */
  success: Scalars["Boolean"]["output"];
};

/** Fields that can be updated */
export type UpdateProfileInput = {
  /** The user's first and last name */
  name?: InputMaybe<Scalars["String"]["input"]>;
  /** The host's profile bio description, will be shown in the listing */
  profileDescription?: InputMaybe<Scalars["String"]["input"]>;
  /** The user's profile photo URL */
  profilePicture?: InputMaybe<Scalars["String"]["input"]>;
};

/** The response after updating a profile */
export type UpdateProfileResponse = MutationResponse & {
  __typename?: "UpdateProfileResponse";
  /** Similar to HTTP status code, represents the status of the mutation */
  code: Scalars["Int"]["output"];
  /** Human-readable message for the UI */
  message: Scalars["String"]["output"];
  /** Indicates whether the mutation was successful */
  success: Scalars["Boolean"]["output"];
  /** Updated user */
  user: Maybe<User>;
};

/** Represents an Airlock user's common properties */
export type User = {
  id: Scalars["ID"]["output"];
  /** The user's first and last name */
  name: Scalars["String"]["output"];
  /** The user's profile photo URL */
  profilePicture: Scalars["String"]["output"];
};
