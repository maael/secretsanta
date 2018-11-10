export const formatDateTimeToDate = (str: string) => {
  const d = new Date(str);
  return `${d.getFullYear()}-${`0${d.getMonth() + 1}`.slice(
    -2,
  )}-${`0${d.getDate()}`.slice(-2)}`;
};

export const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return `${`0${d.getDate()}`.slice(-2)}/${`0${d.getMonth() + 1}`.slice(
    -2,
  )}/${d.getFullYear()}`;
};
