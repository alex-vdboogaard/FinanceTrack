export function formatDate(dateString) {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

export function formatTimeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} second${diffInSeconds === 1 ? "" : "s"} ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths === 1 ? "" : "s"} ago`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears === 1 ? "" : "s"} ago`;
}

export function getCurrentMonthInfo() {
  const currentDate = new Date();
  const monthString = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return {
    year: year,
    month: monthString, // e.g., "December"
    days: daysInMonth, // e.g., 31
  };
}

export function getAdjacentMonthInfo(currentMonthInfo, direction = "next") {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonthIndex = months.indexOf(currentMonthInfo.month);
  const adjacentMonthIndex =
    (currentMonthIndex + (direction === "next" ? 1 : -1) + 12) % 12;
  const adjacentYear =
    direction === "next" && adjacentMonthIndex === 0
      ? currentMonthInfo.year + 1
      : direction === "prev" && adjacentMonthIndex === 11
      ? currentMonthInfo.year - 1
      : currentMonthInfo.year;
  const daysInAdjacentMonth = new Date(
    adjacentYear,
    adjacentMonthIndex + 1,
    0
  ).getDate();

  return {
    month: months[adjacentMonthIndex],
    year: adjacentYear,
    days: daysInAdjacentMonth,
  };
}
