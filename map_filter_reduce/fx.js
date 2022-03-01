const log = console.log;

const _map = (func, iter) => {
  let result = [];
  for (const a of iter) {
    result.push(func(a));
  }
  return result;
};

const _filter = (func, iter) => {
  let result = [];
  for (const a of iter) {
    if (func(a)) result.push(a);
  }
  return result;
};

const _reduce = (func, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value; // iterator는 {value, done}
  }
  for (const n of iter) {
    acc = func(acc, n);
  }
  return acc;
};

module.exports = { log, _map, _filter, _reduce };
