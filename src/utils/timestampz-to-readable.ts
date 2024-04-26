/** converts ISO timestamp to readable format. eg 13 Aug 2023 */
export default function timestampzToReadable(isoTimestamp: string) {
  let date = new Date(isoTimestamp);

  let day = String(date.getDate()).padStart(2, "0");
  let monthIndex = date.getMonth();
  let year = date.getFullYear();

  let monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let monthName = monthNames[monthIndex];

  return `${day} ${monthName}, ${year}`;
}
