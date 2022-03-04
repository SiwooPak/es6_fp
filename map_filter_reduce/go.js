const { log, add, _map, _filter, _reduce } = require("./fx");

/* go, pipe */
// go() 즉시 함수들과 인자들을 전달해서 즉시 값을 평가하는 함수
const _go = (...args) => _reduce((a, func) => func(a), args);

_go(
  0,
  (a) => a + 1,
  (a) => a + 10,
  (a) => a + 100,
  log
);

// pipe() 함수를 리턴하는 함수
const _pipe =
  (f, ...func) =>
  (...args) =>
    _go(f(...args), ...func);

const f = _pipe(
  (a) => a + 1,
  (a) => a + 10,
  (a) => a + 100
);
log(f(add(0, 1)));

const products = [
  { name: "half_tee", price: 15000 },
  { name: "long_tee", price: 20000 },
  { name: "mobile_case", price: 15000 },
  { name: "hood_tee", price: 30000 },
  { name: "pants", price: 25000 },
];

// 가독성이 있게 코드를 변경
_go(
  products,
  (products) => _filter((p) => p.price < 20000, products),
  (products) => _map((p) => p.price, products),
  (prices) => _reduce(add, prices),
  log
);
console.clear();

/* curry */
// go + curry로 더 읽기 좋은 코드로 만들기
const _curry =
  (func) =>
  (a, ..._) =>
    _.length ? func(a, ..._) : (..._) => func(a, ..._);
const multi = _curry((a, b) => a * b);

log(multi(1)(2));

const multi3 = multi(3);
log(multi3(5));
log(multi3(7));

_go(
  products,
  (products) => _filter((p) => p.price < 20000)(products),
  (products) => _map((p) => p.price)(products),
  (prices) => _reduce(add)(prices),
  log
);
_go(
  products,
  _filter((p) => p.price < 20000),
  _map((p) => p.price),
  _reduce(add),
  log
);

/* 함수 조합으로 함수만들기 */
// 공통으로 사용된 함수들 pipe로 묶어서 정리
const total_price = _pipe(
  _map((p) => p.price),
  _reduce(add)
);
log("필터링된 값들의 합을 처리하는 함수를 묶어서");
_go(
  products,
  _filter((p) => p.price < 20000),
  total_price,
  log
);

const base_total_price = (predi) =>
  _pipe(_filter(predi), total_price);
log("공통된 부분을 함수로 처리해서 go()의 가독성 높이기");

_go(
  products,
  base_total_price((p) => p.price < 20000),
  log
);
_go(
  products,
  base_total_price((p) => p.price >= 20000),
  log
);
