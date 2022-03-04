const {
  log,
  _map,
  _filter,
  _reduce,
  _go,
  _pipe,
  _curry,
} = require("../map_filter_reduce/fx");

const products = [
  { name: "half_tee", price: 15000, qty: 1 },
  { name: "long_tee", price: 20000, qty: 2 },
  { name: "mobile_case", price: 15000, qty: 3 },
  { name: "hood_tee", price: 30000, qty: 4 },
  { name: "pants", price: 25000, qty: 5 },
];
//console.table(products);

// 합계 함수
const add = (a, b) => a + b;

// 상품의 총수량
const total_qty = _pipe(
  _map((p) => p.qty),
  _reduce(add)
);
log(total_qty(products));

// 상품들의 총가격
const total_price = _pipe(
  _map((p) => p.qty * p.price),
  _reduce(add)
);
log(total_price(products));

// const sum = (func, iter) => _go(iter, _map(func), _reduce(add));
// _curry() 적용하여 함수형 프로그래밍 코드 간결하게
const sum = _curry((func, iter) =>
  _go(iter, _map(func), _reduce(add))
);

// 배열을 인자로 받는 함수
// const total_qty2 = (products) => sum((p) => p.qty, products);
// _curry() 적용 코드
const total_qty2 = sum((p) => p.qty);
log(total_qty2(products));

// const total_price2 = (products) => sum((p) => p.price * p.qty, products);
const total_price2 = sum((p) => p.price * p.qty);
log(total_price2(products));

log(sum((u) => u.age, [{ age: 30 }, { age: 20 }, { age: 10 }]));
