
function calculate(
  a: number,
  b: number,
  callback: (result: number) => void
): void {
  const sum = a + b;
  callback(sum);
}

calculate(5, 7, (result) => {
  console.log("Kết quả là:", result);
});