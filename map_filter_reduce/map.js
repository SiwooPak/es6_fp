const log = console.log;

const products = [
  { name: "half_tee", price: 15000 },
  { name: "long_tee", price: 20000 },
  { name: "mobile_case", price: 15000 },
  { name: "hood_tee", price: 30000 },
  { name: "pants", price: 25000 },
];

/* map */
const _map = (func, iter) => {
  let result = [];
  for (const a of iter) {
    result.push(func(a));
  }
  return result;
};

let names = [];
for (const p of products) {
  names.push(p.name);
}
log(names);
log("========== FP names start=========");
log(_map((p) => p.name, products));
log("========== FP end =========");

let prices = [];
for (const p of products) {
  prices.push(p.price);
}
log(prices);
log("========== FP price start =========");
log(_map((p) => p.price, products));
log("========== FP end =========");

/* 
이터러블 프로토콜을 따른 map의 다형성 
- document.querySelectorAll()은 array가 array.map()를 사용할수 없지만, 
이터러블 프로토콜을 따르기 때문에 위의 작성한 map()로 동일하게 사용가능
- 작성한 map함수는 array뿐만이 아니라 iterable한 arraylike 타입도 사용가능한
다형성 높은 함수
*/
/*
log(_map((el) => el.nodeName, document.querySelectorAll("*")));
const it = document.querySelectorAll("*")[Symbol.iterator]();
log(it.next());
log(it.next());
log(it.next());
log(it.next());
*/

const gen = function* () {
  yield 2;
  yield 3;
  yield 4;
};

log(_map((a) => a * a, gen()));

let m = new Map();
m.set("a", 10);
m.set("b", 20);
// const it = m[Symbol.iterator]();
// log(it.next());
// log(it.next());
// log(it.next());
let m2 = new Map(_map(([k, v]) => [k, v * 2], m));
log(m2);
