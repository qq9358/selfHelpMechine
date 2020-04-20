import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);

dayjs.prototype.toDateString = function() {
  return this.format("YYYY-MM-DD");
};

dayjs.prototype.toDateTimeString = function() {
  return this.format("YYYY-MM-DD HH:mm:ss");
};

dayjs.prototype.toEndDateTimeString = function() {
  return this.format("YYYY-MM-DD 23:59:59");
};

dayjs.prototype.addSeconds = function(value) {
  if (value < 0) {
    return this.subtract(Math.abs(value), "second");
  }
  return this.add(value, "second");
};

dayjs.prototype.addDays = function(value) {
  if (value < 0) {
    return this.subtract(Math.abs(value), "day");
  }
  return this.add(value, "day");
};

dayjs.prototype.addWeeks = function(value) {
  if (value < 0) {
    return this.subtract(Math.abs(value), "week");
  }
  return this.add(value, "week");
};

dayjs.prototype.addMonths = function(value) {
  if (value < 0) {
    return this.subtract(Math.abs(value), "month");
  }
  return this.add(value, "month");
};

dayjs.prototype.addYears = function(value) {
  if (value < 0) {
    return this.subtract(Math.abs(value), "year");
  }
  return this.add(value, "year");
};
