const {
  _filter,
  _take,
  _map,
  _reduce,
  _range,
  _go,
  _pipe,
  log,
  L,
  _curry,
} = require("../lib/fx");

// range, map, filter, take, reduce 중첩사용
console.time("no lazy");
_go(
  _range(10),
  _map((n) => n + 10),
  _filter((n) => n % 2),
  _take(2),
  log
);
console.timeEnd("no lazy");

// 위의 코드 지연평가로 리팩토링
console.time("lazy func");
_go(
  L._range(10),
  L._map((n) => n + 10),
  L._filter((n) => n % 2),
  _take(2),
  log
);
console.timeEnd("lazy func");

/* 
map, filter 계열 함수들이 가지는 결합 법칙
- 사용하는 데이터가 무엇이든지
- 사용하는 보조함수가 순수함수 라면 무엇이든지
- 아래와 같이 결합한다면 둘 다 결과가 같다.

[[mapping, mapping],[filtering, filtering],[mapping. mapping]]
=
[[mapping,filtering,mapping],[mapping,filtering, mapping]]
*/
console.clear();
// 결과를 만드는 함수 reduce, take
// reduce
// const queryStr = (obj) =>
//   _go(
//     obj,
//     Object.entries,
//     _map(([k, v]) => `${k}=${v}`),
//     _reduce((a, b) => `${a}&${b}`)
//   );
L._entries = function* (obj) {
  for (const k in obj) yield [k, obj[k]];
};
const _join = _curry((sep, iter) =>
  _reduce((a, b) => `${a}${sep}${b}`, iter)
);

const queryStr = _pipe(
  L._entries,
  L._map(([k, v]) => `${k}=${v}`),
  _join("&")
);
log(queryStr({ limit: 10, offset: 10, type: "notice" }));

function* a() {
  yield 10;
  yield 11;
  yield 12;
  yield 13;
}

log(_join("-", a()));
console.clear();
// take, find
const users = [
  { age: 32 },
  { age: 28 },
  { age: 24 },
  { age: 20 },
  { age: 36 },
  { age: 40 },
];

const _find = _curry((func, iter) =>
  _go(iter, L._filter(func), _take(1), ([a]) => a)
);
log(_find((u) => u.age < 30, users));
_go(
  users,
  _map((u) => u.age),
  _find((n) => n < 30),
  log
);

// L._map + take로 map 만들기
/*
go()를 사용해서 리팩토링
const map = _curry((func, iter) =>
_go(L._map(func, iter), _take(Infinity))
);
*/
// _pipe()를 사용해서 리팩토링
const _takeAll = _take(Infinity);

const map = _curry(_pipe(L._map, _takeAll));
log(map((a) => a + 10, L._range(10)));

// L._filter + take로 map 만들기
const filter = _curry(_pipe(L._filter, _takeAll));
log(filter((a) => !(a % 2), _range(4)));

// L._flatten, _flatten
const isIterable = (a) => a && a[Symbol.iterator];

L._flatten = function* (iter) {
  for (const a of iter) {
    if (isIterable(a)) for (const b of a) yield b;
    else yield a;
  }
};

let it = L._flatten([[1, 2], 3, 4, [5, 6, 7]]);
log([...it]);

const _flatten = _pipe(L._flatten, _takeAll);
log(_flatten([[1, 2], 3, 4, [5, 6, 7]]));
