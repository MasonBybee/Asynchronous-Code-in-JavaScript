const p = document.querySelector("p");
const part2ul = document.querySelector(".part2ul");
const part3ul = document.querySelector(".part3ul");

async function part1() {
  axios.get("http://numbersapi.com/7").then((res) => (p.innerText = res.data));
}

part1();

async function part2() {
  axios.get("http://numbersapi.com/7,14,2,8").then((res) => {
    console.log(res.data);
    for (const fact of Object.values(res.data)) {
      li = document.createElement("li");
      li.textContent = fact;
      part2ul.append(li);
    }
  });
}

part2();

async function part3(num = 7, facts = 4) {
  for (i = 0; i < facts; i++) {
    axios.get(`http://numbersapi.com/${num}`).then((res) => {
      li = document.createElement("li");
      li.textContent = res.data;
      part3ul.append(li);
    });
  }
}

part3();
