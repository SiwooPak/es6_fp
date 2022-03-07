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

const _range = (l) => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

const L = {};
L._range = function* (l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};

module.exports = {
  add,
  log,
  _map,
  _filter,
  _reduce,
  _go,
  _pipe,
  _curry,
  _range,
  L,
};
