const getData = () => {
  // instance of the form
  const myForm = document.querySelector(".form_perc");

  // add event listener
  myForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let myFormData = new FormData(myForm);
    let userNumber = myFormData.get("userNumber");
    let userOp = myFormData.get("userOp");
    let userPer = myFormData.get("userPer");
    let result = percCalc(userNumber, userOp, userPer);
    showTitle(userNumber, userOp, userPer);
    showRes(result);
  });
};

const showTitle = (num, op, per) => {
  const cont = document.querySelector(".perc_card_res_header");
  if (op == 1) {
    cont.textContent = `${num} + ${per}% =`;
  }
  if (op == 2) {
    cont.textContent = `${num} - ${per}% =`;
  }
};

const percCalc = (number, oper, perc) => {
  if (oper == 1) {
    return Number(number) + (Number(number) / 100) * perc;
  }
  if (oper == 2) {
    return number - (number / 100) * perc;
  }
};

const showRes = (res) => {
  const container = document.querySelector(".perc_card_res-text");
  container.textContent = res;
};

getData();
