const {
  _go,
  L,
  _reduce,
  add,
  map,
  filter,
  _curry,
  log,
  _take,
} = require("../lib/fx");

// 지연된 함수열을 병렬적으로 평가하기 - C._reduce, C._take
const C = {};

function _noop() {}
const _catchNoop = (arr) => (
  arr.forEach((a) => (a instanceof Promise ? a.catch(_noop) : a)), arr
);

C._reduce = _curry((func, acc, iter) => {
  const iter2 = _catchNoop(iter ? [...iter] : [...acc]);
  return iter ? _reduce(func, acc, iter2) : _reduce(func, iter2);
});

C._take = _curry((l, iter) => _take(l, _catchNoop([...iter])));

const delay1000 = (a, str) =>
  new Promise((resolve) => {
    log(str);
    setTimeout(() => resolve(a), 1000);
  });

// 즉시 평가
console.time("1st");
_go(
  [1, 2, 3, 4, 5],
  map((a) => delay1000(a * a, "1st")),
  filter((a) => a % 2),
  _take(2),
  _reduce(add),
  log,
  (_) => console.timeEnd("1st")
);

// 지연평가
console.time("2nd");
_go(
  [1, 2, 3, 4, 5],
  L._map((a) => delay1000(a * a, "2nd")),
  L._filter((a) => a % 2),
  _take(2),
  _reduce(add),
  log,
  (_) => console.timeEnd("2nd")
);

// 병렬식 지연평가
console.time("3rd");
_go(
  [1, 2, 3, 4, 5],
  L._map((a) => delay1000(a * a, "3rd")),
  L._filter((a) => a % 2),
  _take(2),
  C._reduce(add),
  log,
  (_) => console.timeEnd("3rd")
);

console.time("4th");
_go(
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  L._map((a) => delay1000(a * a, "4th")),
  L._filter((a) => a % 2),
  L._map((a) => delay1000(a * a, "4th-2")),
  C._take(2),
  C._reduce(add),
  log,
  (_) => console.timeEnd("4th")
);
// 즉시 병렬적으로 평가하기 - C._map, C._filter
