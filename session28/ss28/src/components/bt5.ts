function checkCondition(condition: boolean, callback: (result: boolean) => void): void {
  setTimeout(() => {
    callback(condition);
  }, 1000);
}

function display(result: boolean): void {
  console.log("Điều kiện trả về:", result);
}

checkCondition(true, display);  
checkCondition(false, display);