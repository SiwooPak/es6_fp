const { _reduce, log } = require('../lib/fx');
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
