import areIntervalsOverlapping from "date-fns/areIntervalsOverlapping";
import format from "date-fns/format";
import { Interval } from "date-fns";
import { SortByCriteria } from "./__generated__/types";

export const getNextDate = (date: Date) => {
  const nextDate = new Date(date).setDate(date.getDate() + 1);
  return new Date(nextDate);
};

// need to normalize Date time (data from getDatesToExclude times are all 00:00:00)
// from Fri Nov 05 2021 11:38:24 GMT-0600 (Mountain Daylight Time)
// to Fri Nov 05 2021 00:00:00 GMT-0600 (Mountain Daylight Time)
const normalizeDate = (date: Date) => {
  return new Date(format(date, "MMM d yyyy"));
};

export const getDatesToExclude = (startDate: string, endDate: string) => {
  const datesArr = [];
  const stringDatesArr = [];
  const end = new Date(endDate);
  const currDate = new Date(startDate);

  while (currDate < end) {
    const dateToAdd = new Date(currDate);
    datesArr.push(dateToAdd);
    stringDatesArr.push(dateToAdd.toString());
    currDate.setDate(currDate.getDate() + 1);
  }

  // keeping string values of the dates makes it easier to check
  // datepicker inputs to see if the user selected a date
  // that should be excluded
  return {
    dates: [...datesArr, end],
    stringDates: [...stringDatesArr, end.toString()],
  };
};

export const isDateValid = (invalidDates: string[], dateToCheck: Date) => {
  const checkDateString = normalizeDate(dateToCheck).toString();

  return !invalidDates.includes(checkDateString);
};

export const getFirstValidDate = (
  invalidDates: string[],
  checkInDate?: Date
) => {
  const today = checkInDate || new Date();
  const currDate = normalizeDate(today);

  while (!isDateValid(invalidDates, currDate)) {
    currDate.setDate(currDate.getDate() + 1);
  }

  return currDate;
};

// check if rangeToCheck (check in and check out dates) overlaps with an existing booking
export const areDatesValid = (
  bookings: Array<{ checkInDate: string; checkOutDate: string }>,
  rangeToCheck: Interval
) => {
  return bookings.find((booking) =>
    areIntervalsOverlapping(
      {
        start: new Date(booking.checkInDate),
        end: new Date(booking.checkOutDate),
      },
      rangeToCheck
    )
  )
    ? false
    : true;
};

export function getListingParamsFromSearchParams(
  searchParams: URLSearchParams
) {
  const checkInDate = searchParams.get("checkInDate");
  const checkOutDate = searchParams.get("checkOutDate");

  if (!checkInDate || !checkOutDate) {
    throw new Error("Could not determine dates to check");
  }

  return {
    checkInDate,
    checkOutDate,
    sortBy:
      (searchParams.get("sortBy") as SortByCriteria | null) ??
      SortByCriteria.COST_ASC,
    limit: 5,
    numOfBeds: parseInt(searchParams.get("numOfBeds") ?? "1", 10),
    page: parseInt(searchParams.get("page") ?? "1", 10),
  };
}
