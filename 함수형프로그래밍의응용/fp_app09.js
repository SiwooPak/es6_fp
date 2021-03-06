const {
  _go,
  _reduce,
  add,
  log,
  L,
  _take,
  _takeAll,
  _map,
  _reject,
} = require('../lib/fx');
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
L._entries = function* (obj) {
  for (const k in obj) yield [k, obj[k]];
};
_go(obj1, L._entries, _takeAll, log);
_go(
  obj1,
  L._entries,
  L._filter(([, v]) => v % 2),
  L._map(([k, v]) => ({ [k]: v })),
  _reduce(Object.assign),
  log,
);

// 3. keys
L._keys = function* (obj) {
  for (const k in obj) yield k;
};

/* 
4. 어떠한 값이든 이터러블 프로그래밍으로 다루기
- 이터러블로 이터러블 프로그래밍
- 객체를 제너레이터로 이용해서 이터레이터로 만들어서 이터러블 프로그래밍
- 어떤 제너레이터든 이터레이터로 만들어 이터러블 프로그래밍
*/
const gen = function* (stop) {
  let i = -1;
  while (++i < stop) {
    yield 10;
    // eslint-disable-next-line no-constant-condition
    if (i === stop - 1) yield 20 + 30;
    yield 30;
  }
};
console.log([...gen(3)]);
/* 
5. object
배열을 객체로 만드는 함수
[['a', 1], ['b',2]] => { a:1. b:2 }
*/
// 위의 코드를 그대로 사용하였을 때
const a = [
  ['a', 1],
  ['b', 2],
];
const _object = _entries =>
  _go(
    _entries,
    L._map(([k, v]) => ({ [k]: v })),
    _reduce(Object.assign),
  );
log(_object(a));
// _reduce() 하나로
const _object2 = entries =>
  _reduce((obj, [k, v]) => ((obj[k] = v), obj), {}, entries);
log(_object2(a));
// Map의 자료구조 위의 함수를 통해 객체로 만들수 있음
let m = new Map();
m.set('a', 10);
m.set('b', 20);
m.set('c', 30);
// 아무 값도 안 나오지만,
JSON.stringify(m);
// object함수를 사용하여 객체로 만든 다음엔 JSON객체로 바꿀수 있음
JSON.stringify(_object2(m));
// 위처럼 되는 이유가 Map도 이터러블 갖고 있기 때문에 object()를 사용하여 객체화시킬 수 있기 때문이다.

// 6. mapObject
// [ ['a', 1], ['b',2], ['c',3] ]
// [['a', 11], ['b', 12], ['c', 13]]
// {a: 11}, ...
// {a: 11, b: 12, c: 13}
const _mapObject = (func, obj) =>
  _go(
    obj,
    L._entries,
    L._map(([k, v]) => [k, func(v)]),
    _object,
  );
log(_mapObject(a => a + 10, { a: 1, b: 2, c: 3 }));

// 7. pick
const obj2 = { a: 1, b: 2, c: 3, d: 4, e: 5 };
const _pick = (keys, obj) =>
  _go(
    keys,
    _map(k => [k, obj[k]]),
    _reject(([, v]) => v === undefined),
    _object2,
  );
/*
좀 더 간단하게  
const _pick2 = (keys, obj) => _object2(_map(k => [k, obj[k]], keys));
*/
log(_pick(['b', 'c'], obj2));
// {b: 2, c: 3}
