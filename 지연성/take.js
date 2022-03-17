const {
  log,
  _range,
  L,
  add,
  _curry,
  _reduce,
  _go,
} = require("../lib/fx");
// take
/*
const _take = (l, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length === l) return res;
  }

  return res;
};
*/

const _take = _curry((l, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length === l) return res;
  }

  return res;
});

// log(_take(5, _range(100)));
// log(_take(5, L._range(100)));

_go(_range(100), _take(5), _reduce(add), log);
_go(L._range(100), _take(5), _reduce(add), log);

// test
const test = (name, time, f) => {
  console.time(name);
  while (time--) f();
  console.timeEnd(name);
};
test("_range", 10, () => _take(5, _range(10000000)));
test("L._range", 10, () => _take(5, L._range(10000000)));
