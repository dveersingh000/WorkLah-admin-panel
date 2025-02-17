import moment from "moment";

export const getErrorMessage = (error: any): string => {
  if (error?.response?.status === 404) {
    return "Requested resource not found.";
  }
  if (error?.response?.status === 500) {
    return "Server error. Please try again later.";
  }
  return (
    error?.response?.data?.message || "Something went wrong. Please try again."
  );
};


 // Convert { day, month, year } to a Date object
 export const convertToDate = (date: { day: number; month: number; year: number }) => {
  return new Date(date.year, date.month, date.day); // Month is 0-based
};

export const formatDate = (dateString: string): string => {
  const formattedDate = moment(dateString).format('DD MMM, YY');
  
  if (!formattedDate) {
    throw new Error("Invalid date");
  }

  return formattedDate;
}

export const convertIdToFourDigits = (id) => {
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < id?.length; i++) {
      hash = (hash << 5) - hash + id.charCodeAt(i);
      hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Ensure the hash is positive and get four digits
  let fourDigitId = Math.abs(hash % 10000);
  return fourDigitId.toString().padStart(4, '0'); // Pad with zeros if needed
}

export const getTodayDate = () => {
  const today = new Date();
  return {
    day: today.getDate(),
    month: today.getMonth(), // Months are zero-indexed
    year: today.getFullYear(),
  };
};
