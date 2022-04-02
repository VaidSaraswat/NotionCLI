const formatDate = (date) => {
  let newDate = new Date(date);
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${month[newDate.getMonth()]} ${
    newDate.getDate() + 1
  } ${newDate.getFullYear()}`;
};

module.exports = formatDate;
