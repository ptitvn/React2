
function displayNumbers(callback: (value: number) => void, delay: number): void {
  let count = 1;

  setInterval(() => {
    callback(count);
    count++;
  }, delay);
}

displayNumbers((value) => {
  console.log(`Số thứ tự: ${value}`);
}, 1000);