const {
  _go,
  L,
  _takeAll,
  _take,
  log,
  map,
  _reduce,
  add,
} = require("../lib/fx");

// 지연평가 + Promise - L.map, map, take
_go(
  [1, 2, 3],
  L._map((a) => Promise.resolve(a + 10)),
  _take(2),
  log
);

_go(
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  L._map((a) => Promise.resolve(a + 10)),
  _take(2),
  log
);

_go(
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  map((a) => Promise.resolve(a + 10)),
  log
);

// Kleisli composition - L.filter, filter, nop, take
_go(
  [1, 2, 3, 4, 5, 6, 7, 8],
  L._map((a) => Promise.resolve(a * a)),
  L._filter((a) => {
    return !(a % 2);
  }),
  L._map((a) => a * a),
  _take(4),
  log
);

// _reduce에서 nop지원
// 배열 안의 요소를 제곱해서 홀수인 숫자의 합을 구하시오
_go(
  [1, 2, 3, 4, 5],
  L._map((a) => Promise.resolve(a * a)),
  L._filter((a) => Promise.resolve(a % 2)),
  _reduce(add),
  log
);

// 지연 평가 + Promise의 효율성
_go(
  [1, 2, 3, 4, 5, 6, 7, 8],
  L._map((a) => {
    log(a);
    return new Promise.resolve(a * a);
  }),
  L._filter((a) => {
    log(a);
    return Promise.resolve(a % 2);
  }),
  _take(2),
  log
);
