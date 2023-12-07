import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarReservas from "./CalendarReservas";

function Cal() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CalendarReservas />
    </LocalizationProvider>
  );
}

export default Calendar;
