function delayedCallback(callback: () => void, delay: number): void {
  setTimeout(() => {
    callback();
  }, delay);
}

delayedCallback(() => {
  console.log("Callback đã được gọi sau 2 giây!");
}, 2000);
