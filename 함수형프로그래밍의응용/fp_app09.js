const { _go, _reduce, add, log, L, _take } = require('../lib/fx');
// 객체를 이터러블 프로그래밍으로 다루기
const obj1 = {
  a: 1,
  b: 2,
  c: 3,
};
// 1. values
_go(obj1, Object.values, _reduce(add), log);
L._values = function* (obj) {
  for (const k in obj) yield obj[k];
};
_go(obj1, L._values, _reduce(add), log);
_go(
  obj1,
  L._values,
  L._map(a => a + 10),
  _take(2),
  _reduce(add),
  log,
);
// 2. entries

// 1. keys

// 1. 어떠한 값이든 이터러블 프로그래밍으로 다루기

// 1. object

// 1. mapObject
