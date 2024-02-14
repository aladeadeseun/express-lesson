module.exports = {
  generateRandomId() {
    return (Math.random() * Math.random() * Math.random())
      .toString(16)
      .replace(".", "");
  },
};
