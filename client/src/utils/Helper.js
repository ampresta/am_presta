export const dateFormat = (timestamp) => {
    return timestamp.split("T")[0].split("-").reverse().join(" / ");
  };