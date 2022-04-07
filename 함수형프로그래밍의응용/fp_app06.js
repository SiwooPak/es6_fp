const { log, _reduce, L } = require('../lib/fx');
// 명령형 습관 지우기
// 1. reduce + 복잡한 함수 + acc 보다 map + 간단한 함수 + reduce
const users = [
  { name: 'AA', age: 35 },
  { name: 'BB', age: 26 },
  { name: 'CC', age: 28 },
  { name: 'DD', age: 34 },
  { name: 'EE', age: 23 },
];

log(_reduce((total, u) => total + u.age, 0, users));
log(
  _reduce(
    (a, b) => a + b,
    L._map(u => u.age, users),
  ),
);
const add = (a, b) => a + b;
log(
  _reduce(
    add,
    L._map(u => u.age, users),
  ),
);
const ages = L._map(u => u.age);
log(_reduce(add, ages(users)));
// 2. reduce 하나보다 map + filter + reduce
// 3. query, queryToObject
