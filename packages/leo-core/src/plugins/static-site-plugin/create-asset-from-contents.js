export default contents => ({
  source() {
    return contents;
  },
  size() {
    return contents.length;
  }
});
