function processArray(
  arr: number[],
  callback: (value: number, index: number) => void
): void {
  arr.forEach((value, index) => {
    setTimeout(() => {
      callback(value, index);
    }, index * 1000); 
  });
}

const numbers = [1, 2, 3, 4, 5];

processArray(numbers, (value) => {
  console.log(`Phần tử thứ: ${value}`);
});