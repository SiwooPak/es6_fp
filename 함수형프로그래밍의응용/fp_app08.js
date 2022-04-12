const { L, log, _go, _each, _find, _take } = require('../lib/fx');
// 함수의 안전한 합성
// map()으로 합성하기(이터러블이나 배열 모나드 합성)
const f = x => x + 10;
const g = x => x - 5;
const fg = x => f(g(x));
log(fg(10));
// 인자가 없을 때도 안전하게 처리
_go([], L._map(fg), _each(log));
_go([10], L._map(fg), _each(log));
// find 대신 L._filter 사용해보기
const users = [
  { name: 'AA', age: 35 },
  { name: 'BB', age: 26 },
  { name: 'CC', age: 28 },
  { name: 'DD', age: 34 },
  { name: 'EE', age: 23 },
];
const user = _find(u => u.name === 'FF', users);
if (user) {
  log(user);
}
// L._filter를 사용해서 함수 합성
_each(
  log,
  _take(
    1,
    L._filter(u => u.name === 'BB', users),
  ),
);
_go(
  users,
  L._filter(u => u.name === 'CC'),
  _take(1),
  _each(log),
);

_go(
  users,
  L._filter(u => u.name === 'HH'),
  L._map(u => u.age),
  _take(1),
  _each(log),
);
