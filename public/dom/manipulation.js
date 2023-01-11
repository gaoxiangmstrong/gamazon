const btns = document.querySelectorAll(".btns");
let prices = document.querySelectorAll(".price");
let total = document.querySelector(".total");
let quantities = document.querySelectorAll(".quantity");

let sum = 0;
// for (let btn of btns) {
//   btn.addEventListener("click", function () {
//     sum = sum - parseInt(this.parentElement.previousElementSibling.textContent);
//     total.textContent = `The total price is : ${sum}`;
//     this.parentElement.parentElement.remove();
//   });
// }

for (let i = 0; i < prices.length; i++) {
  sum += parseInt(prices[i].textContent) * parseInt(quantities[i].textContent);
  total.textContent = `The total price is : ${sum}`;
}

for (let btn of btns) {
  btn.addEventListener("click", function () {
    let price = parseInt(this.parentElement.previousElementSibling.textContent);
    let quantity = parseInt(
      this.parentElement.previousElementSibling.previousElementSibling.value
    );
    sum -= price * quantity;
    total.textContent = `The total price is : ${sum}`;
    this.parentElement.parentElement.remove();
  });
}

// 1. select form and get textContent of the input
const inputForm = document.querySelector(".search");
const titles = document.querySelectorAll(".box #title span");

// 2. found the mangas title's textContent

function removeHideAndShow() {
  for (let title of titles) {
    title.parentNode.parentNode.classList.remove("show");
    title.parentNode.parentNode.classList.remove("hide");
  }
}
//3. keyup to update the form value. if match show, unmatch hide.
inputForm.addEventListener("keyup", function () {
  removeHideAndShow();
  for (let i = 0; i < titles.length; i++) {
    if (titles[i].textContent.includes(inputForm.value)) {
      titles[i].parentNode.parentNode.classList.add("show");
    } else {
      titles[i].parentNode.parentNode.classList.add("hide");
    }
  }
});

function selectAllTitles() {
  let all_titles = [];
  for (let title of titles) {
    all_titles.push(title.textContent);
  }
  return all_titles;
}

// show list
// let ul = document.querySelector(".showList");
// let newLi = document.createElement("li");

// function createShowList() {
//   let allTitles = selectAllTitles();
//   for (let i = 0; i < allTitles.length; i++) {

//   }
// }

function toggleUl() {
  if (inputForm.value) {
    ul.classList.remove("hide");
  }
}

inputForm.addEventListener("keyup", function () {
  createShowList();
});
