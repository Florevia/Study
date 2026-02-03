let count = 1;

function increment() {
  count++;
  console.log("-> Inside lib: count is now", count);
}

module.exports = {
  count,
  increment,
};
