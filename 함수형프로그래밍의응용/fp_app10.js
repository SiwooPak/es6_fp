const {
  _reduce,
  log,
  _filter,
  _go,
  L,
  _object,
  _takeAll,
} = require('../lib/fx');
// indexBy
// 배열의 각 요소들의 id값을 인덱스로 매핑하여 객체로 만들어주는 함수.
const users = [
  { id: 1, name: 'AA', age: 35 },
  { id: 2, name: 'BB', age: 26 },
  { id: 3, name: 'CC', age: 28 },
  { id: 4, name: 'DD', age: 34 },
  { id: 5, name: 'EE', age: 23 },
];
const _indexBy = (func, iter) =>
  _reduce((obj, a) => ((obj[func(a)] = a), obj), {}, iter);

const users2 = _indexBy(u => u.id, users);
log(users2);
log(users2['1']);

// indexBy 된 값을 필터하기
// 기존의 이터러블 객체를 필터할때
_filter(age => age >= 30, users);
// 객체도 필터링을 하고 싶을 때
// entries()를 사용해서 배열로 만들고
// filter()로 인덱스 값을 제외, 밸류의 특정 키값만 가져와서 조건 비교후
// object()로 다시 객체 만들어주기
log(users2);
_go(
  users2,
  L._entries,
  L._filter(([, { age }]) => age < 30),
  _takeAll,
  _object,
  log,
);
