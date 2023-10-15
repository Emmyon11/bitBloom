export function getDaysDifference(dateString: String) {
  // Parse the input date string into a Date object
  const inputDate = new Date(Number(dateString));

  // Get today's date
  const today = new Date();

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = today.getTime() - inputDate.getTime();

  // Convert the difference to days
  const differenceInDays = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60 * 24)
  );

  return differenceInDays;
}

export function formatDate(dateString: string): string {
  const inputDate = new Date(Number(dateString));

  const day = inputDate.getDate();
  const month = inputDate.toLocaleString('default', { month: 'long' });
  const year = inputDate.getFullYear();

  // Function to add the appropriate suffix to the day
  const addDaySuffix = (day: number) => {
    if (day >= 11 && day <= 13) {
      return `${day}th`;
    }
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };

  const formattedDay = addDaySuffix(day);

  return `${formattedDay} ${month}, ${year}`;
}
