const formatDate = date => {
  return new Date(date).toLocaleDateString("en-UK");
};

export default formatDate;
