const log = console.log;

const add = (a, b) => a + b;

const _curry =
  (func) =>
  (a, ..._) =>
    _.length ? func(a, ..._) : (..._) => func(a, ..._);

const _map = _curry((func, iter) => {
  let result = [];
  // for (const a of iter) {
  //   result.push(func(a));
  // }
  // return result;
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    result.push(func(a));
  }
  return result;
});

const _filter = _curry((func, iter) => {
  let result = [];
  // for (const a of iter) {
  //   if (func(a)) result.push(a);
  // }
  // return result;
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    if (func(a)) result.push(a);
  }
  return result;
});

const _reduce = _curry((func, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value; // iterator는 {value, done}
  } else {
    iter = iter[Symbol.iterator]();
  }
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    acc = func(acc, a);
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

const _take = _curry((l, iter) => {
  let res = [];
  // for (const a of iter) {
  //   res.push(a);
  //   if (res.length === l) return res;
  // }
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    res.push(a);
    if (res.length === l) return res;
  }

  return res;
});

L._map = _curry(function* (func, iter) {
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    yield func(a);
  }
});

// L._filter
L._filter = _curry(function* (func, iter) {
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    if (func(a)) yield a;
  }
});

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
  _take,
};
