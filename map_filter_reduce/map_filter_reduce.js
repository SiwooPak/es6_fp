const { log, _map, _filter, _reduce } = require("./fx");

const products = [
  { name: "half_tee", price: 15000 },
  { name: "long_tee", price: 20000 },
  { name: "mobile_case", price: 15000 },
  { name: "hood_tee", price: 30000 },
  { name: "pants", price: 25000 },
];

// 가격이 2만 미만인 상품의 가격만 출력
log(
  _map(
    (p) => p.price,
    _filter((p) => p.price < 20000, products)
  )
);

// 가격이 2만 미만인 상품들의 총가격
const add = (a, b) => a + b;
// filter로 2만 미만의 상품을 뽑고 가격만 매핑
log(
  _reduce(
    add,
    _map(
      (p) => p.price,
      _filter((p) => p.price < 20000, products)
    )
  )
);

// 먼저 map으로 가격만 배열로 뽑은 후에 가격이 2만원 이상인 상품들의 총가격
log(
  _reduce(
    add,
    _filter(
      (n) => n >= 20000,
      _map((p) => p.price, products)
    )
  )
);

// 맨 밑 오른쪽에서부터 왼쪽 위로 해석
// products 배열의 가격만 뽑아오고
// 그 뽑아 온 배열에서 가격이 2만원 이상인 상품의 가격들만 필터링하고
// 뽑아온 가격들의 총합을 구하는 함수형 프로그래밍
