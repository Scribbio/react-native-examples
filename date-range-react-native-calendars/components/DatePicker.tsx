import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { DateData } from "react-native-calendars";

const DatePicker = () => {
  const [markedDates, setMarkedDates] = useState({});
  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("");

  const handleDayPress = (day: DateData) => {
    if (startDay && !endDay) {
      const date: any = {};
      for (
        const d = moment(startDay);
        d.isSameOrBefore(day.dateString);
        d.add(1, "days")
      ) {
        const formattedDate = d.format("YYYY-MM-DD");
        date[formattedDate] = {
          marked: true,
          color: "black",
          textColor: "white",
        };
        if (formattedDate === startDay) date[formattedDate].startingDay = true;
        if (formattedDate === day.dateString)
          date[formattedDate].endingDay = true;
      }
      setMarkedDates(date);
      setEndDay(day.dateString);
    } else {
      setStartDay(day.dateString);
      setEndDay("");
      setMarkedDates({
        [day.dateString]: {
          marked: true,
          color: "black",
          textColor: "white",
          startingDay: true,
          endingDay: true,
        },
      });
    }
  };

  return (
    <Calendar
      onDayPress={handleDayPress}
      enableSwipeMonths
      markingType={"period"}
      markedDates={markedDates}
    />
  );
};

export default DatePicker;
