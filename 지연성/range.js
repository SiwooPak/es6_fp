const {
  log,
  add,
  _map,
  _filter,
  _reduce,
  _go,
  _pipe,
  _curry,
} = require("../lib/fx");

// range
const _range = (l) => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

log(_range(5));
log(_range(2));

let list = _range(4);
log(list);
[0, 1, 2, 3];
console.time("first timer");
log(_reduce(add, list)); // 6
console.timeEnd("first timer");

// 느긋한 L._range, 이터레이터를 사용한.
const L = {};
L._range = function* (l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};
log(L); // {_range: [GeneratorFunction]}
log(L._range(5)); // Object [Generator] {}
log(L._range(2));

list = L._range(4);
log(list); // // Object [Generator] {}
console.time("second timer");
log(_reduce(add, list)); // 6
console.timeEnd("second timer");
/*
_range()를 싱핼했을 때 배열로 즉시 평가가 됨
L._range()의 경우 일반적으로 대기상태였다가 내부의 값을 순회할때 함수가 실행됨.
두 함수를 시간을 비교하면 지연성이 있는 함수의 실행속도가 더 빠름.
*/
