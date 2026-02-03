export let count = 1;

export function increment() {
  count++;
  console.log("-> Inside lib: count is now", count);
}
