const toLocaleDateString = (str) => {
  const date = new Date(str);
  const locales = "en-GB";
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString(locales, options);
};

const dateLib = { toLocaleDateString };
export default dateLib;
