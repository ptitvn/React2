
function task1(next: () => void): void {
  setTimeout(() => {
    console.log("Task 1 được thực thi");
    next();
  }, 1000);
}

function task2(next: () => void): void {
  setTimeout(() => {
    console.log("Task 2 được thực thi");
    next();
  }, 2000);
}

function task3(): void {
  setTimeout(() => {
    console.log("Task 3 được thực thi! Hoàn thành");
  }, 2000);
}

task1(() => {
  task2(() => {
    task3();
  });
});