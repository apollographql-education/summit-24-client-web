/* eslint-disable @typescript-eslint/no-explicit-any */
import DatePicker, {
  DatePickerProps as ReactDatePickerProps,
} from "react-datepicker";
import { Input, InputProps } from "@chakra-ui/react";
import { getNextDate } from "../utils/dates";

type DatePickerProps = Omit<InputProps, keyof ReactDatePickerProps> &
  Omit<
    ReactDatePickerProps,
    "startDate" | "endDate" | "onSelect" | "onChange"
  > & {
    today: Date;
    startDate: Date;
    endDate: Date;
    setStartDate: (date: Date) => void;
    setEndDate: (date: Date) => void;
    onChange?: (date: Date) => void;
  };

export function DatePickerInput({
  today,
  endDate,
  setStartDate,
  setEndDate,
  ...props
}: DatePickerProps) {
  const handleChange: Extract<
    ReactDatePickerProps["onChange"],
    (date: Date | null) => void
  > = (date) => {
    if (!date) {
      return;
    }

    setStartDate(date);

    // match end date with start date if start date was changed to be farther in the future than the current end date
    if (endDate < date) {
      setEndDate(new Date(getNextDate(date)));
    }
  };

  return (
    <Input
      type="date"
      as={DatePicker}
      dateFormat="MM-dd-yyyy"
      minDate={today}
      endDate={endDate}
      onChange={handleChange as any}
      {...props}
    />
  );
}
