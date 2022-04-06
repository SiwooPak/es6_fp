const log = console.log;

const add = (a, b) => a + b;

const _curry =
  (func) =>
  (a, ..._) =>
    _.length ? func(a, ..._) : (..._) => func(a, ..._);

const _map = _curry((func, iter) => {
  let result = [];
  for (const a of iter) {
    result.push(func(a));
  }
  return result;
});

const _filter = _curry((func, iter) => {
  let result = [];
  for (const a of iter) {
    if (func(a)) result.push(a);
  }
  return result;
});

const _reduce = _curry((func, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value; // iterator는 {value, done}
  }
  for (const n of iter) {
    acc = func(acc, n);
  }
  return acc;
});

const _go = (...args) => _reduce((a, func) => func(a), args);

const _pipe =
  (f, ...func) =>
  (...args) =>
    _go(f(...args), ...func);

// 요소와 문자를 연결시켜주는 함수
const _join = _curry((sep, iter) =>
  _reduce((a, b) => `${a}${sep}${b}`, iter)
);

module.exports = {
  add,
  log,
  _map,
  _filter,
  _reduce,
  _go,
  _pipe,
  _curry,
};
