const {
  C,
  L,
  _curry,
  _pipe,
  log,
  _reduce,
  _go,
  add,
} = require("../lib/fx");

// 즉시 병렬적으로 평가하기(C._map, C._filter)
C._takeAll = C._take(Infinity);
C._map = _curry(_pipe(L._map, C._takeAll));
C._filter = _curry(_pipe(L._filter, C._takeAll));

const delay1000 = (a) =>
  new Promise((resolve) => {
    log(a);
    setTimeout(() => resolve(a), 1000);
  });

// C._map((a) => delay1000(a * a), [1, 2, 3, 4]).then(log);
// C._filter((a) => delay1000(a % 2), [1, 2, 3, 4]).then(log);

//  즉시, 지연, Promise, 병렬적 조합하기

// const delay500 = a => a;
const delay500 = (a, name) =>
  new Promise((resolve) => {
    console.log(`${name}: ${a}`);
    setTimeout(() => resolve(a), 3000);
  });

console.time("");
_go(
  [1, 2, 3, 4, 5, 6, 7, 8],
  L._map((a) => delay500(a * a, "map 1")),
  L._filter((a) => delay500(a % 2, "filter 2")),
  L._map((a) => delay500(a + 1, "map 3")),
  C._take(2),
  _reduce(add),
  log,
  (_) => console.timeEnd("")
);
