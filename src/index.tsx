const add = document.getElementById("add") as HTMLButtonElement;
const minus = document.getElementById("minus") as HTMLButtonElement;
const number = document.querySelector("span") as HTMLSpanElement;

let count = 0;
number.innerText = String(count);

const updateText = () => {
  number.innerText = String(count);
};

const handleAdd = () => {
  count = count + 1;
  updateText();
};

const handleMinus = () => {
  count = count - 1;
  updateText();
};

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);
