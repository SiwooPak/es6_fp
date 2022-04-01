const { C } = require("../lib/fx");

// 즉시 병렬적으로 평가하기
//C.map((a) => delay1000(a * a), [1, 2, 3, 4]).then(log);
//C.filter((a) => delay1000(a % 2), [1, 2, 3, 4]).then(log);

//  즉시, 지연, Promise, 병렬적 조합하기

// const delay500 = a => a;
const delay500 = (a, name) =>
  new Promise((resolve) => {
    console.log(`${name}: ${a}`);
    setTimeout(() => resolve(a), 500);
  });

console.time("");
go(
  [1, 2, 3, 4, 5, 6, 7, 8],
  L.map((a) => delay500(a * a, "map 1")),
  L.filter((a) => delay500(a % 2, "filter 2")),
  L.map((a) => delay500(a + 1, "map 3")),
  C.take(2),
  reduce(add),
  log,
  (_) => console.timeEnd("")
);
