const { log, _go, L, _takeAll, _reduce, add } = require('../lib/fx');
// 사용자 정의 객체를 이터러블 프로그래밍으로 다루기
// 1. Map, Set
let m = new Map();
m.set('a', 1);
m.set('b', 2);
m.set('c', 3);
// log([...m.entries()]);
// log([...m.keys()]);
// log([...m.values()]);
log(m);
// map을 배열로
const a = _go(
  m,
  L._filter(([, v]) => v % 2),
  _takeAll,
  //   _entries => new Map(_entries),
);
log(a);

let s = new Set();
s.add(10);
s.add(20);
s.add(30);

log(_reduce(add, s));
// 2. Model, Collection

// 3.
