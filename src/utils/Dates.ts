export function displayDate(date: string) {
  const padSize = 2;
  const startSlice = 0;
  const size = 10;

  const [year, month, day] = date.slice(startSlice, size).split("-");
  const newDay = day.padStart(padSize, "0");
  const newMonth = month.padStart(padSize, "0");

  return `${newDay}/${newMonth}/${year}`;
}