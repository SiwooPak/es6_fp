const log = console.log;

const add = (a, b) => a + b;

const _go1 = (a, func) => (a instanceof Promise ? a.then(func) : func(a));
const _not = a => !a;
const nop = Symbol.for('nop');

const _curry =
  func =>
  (a, ..._) =>
    _.length ? func(a, ..._) : (..._) => func(a, ..._);

const _map = _curry((func, iter) => {
  let result = [];
  /* 1st
  for (const a of iter) {
    result.push(func(a));
  }
  return result;
  */
  // Symbol iterator를 이용한 리팩토링
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
// 들어오는 인자가 프로미스객체인지 아닌지 에러인 경우 에러 출력
const _reduceF = (acc, a, func) =>
  a instanceof Promise
    ? a.then(
        a => func(acc, a),
        e => (e === nop ? acc : Promise.reject(e)),
      )
    : func(acc, a);
const _head = iter => _go1(_take(1, iter), ([h]) => h);
const _reduce = _curry((func, acc, iter) => {
  if (!iter) {
    // iter = acc[Symbol.iterator]();
    // acc = iter.next().value; // iterator는 {value, done}
    return _reduce(func, _head((iter = acc[Symbol.iterator]())), iter);
  } else {
    iter = iter[Symbol.iterator]();
  }
  // 유명함수: 함수를 값으로 다루면서 함수의 이름을 짓는
  return _go1(acc, function recur(acc) {
    let cur;
    while (!(cur = iter.next()).done) {
      acc = _reduceF(acc, cur.value, func);
      if (acc instanceof Promise) return acc.then(recur);
    }
    return acc;
  });
});

const _delay = _curry(async (time, a) => {
  await new Promise(res => setTimeout(res, time));
  return a;
});

const _go = (...args) => _reduce((a, func) => func(a), args);

const _pipe =
  (f, ...func) =>
  (...args) =>
    _go(f(...args), ...func);

const _range = l => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

const L = {};
L._range = function* (start = 0, stop = start, step = 1) {
  if (arguments.length === 1) start = 0;
  if (arguments.length < 3 && start > stop) step *= -1;
  if (start < stop) {
    while (start < stop) {
      yield start;
      start += step;
    }
  } else {
    while (start > stop) {
      yield start;
      start += step;
    }
  }
};

const _take = _curry((l, iter) => {
  let res = [];
  // for (const a of iter) {
  //   res.push(a);
  //   if (res.length === l) return res;
  // }
  iter = iter[Symbol.iterator]();
  return (function recur() {
    let cur;
    while (!(cur = iter.next()).done) {
      const a = cur.value;
      if (a instanceof Promise)
        return a
          .then(a => (res.push(a), res.length === l ? res : recur()))
          .catch(e => (e === nop ? recur() : Promise.reject(e)));
      res.push(a);
      if (res.length === l) return res;
    }
    return res;
  })();
});

const emptyIter = (function* () {})();

L._empty = () => emptyIter;

const toIter = iter => {
  return iter && iter[Symbol.iterator] ? iter[Symbol.iterator]() : L._empty();
};

L._take = _curry(function* (l, iter) {
  if (l < 1) return;
  let prev = null;
  for (const a of toIter(iter)) {
    if (a instanceof Promise) {
      a.catch(_noop);
      yield (prev = (prev || Promise.resolve())
        .then(_ => a)
        .then(a => (--l > -1 ? a : Promise.reject(nop))));
      prev = prev.catch(_noop);
    } else {
      yield (--l, a);
    }
    if (!l) break;
  }
});

L._map = _curry(function* (func, iter) {
  /*
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    yield func(a);
  }
  */
  for (const a of iter) yield _go1(a, func);
});

// L._filter
L._filter = _curry(function* (func, iter) {
  /*
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    if (func(a)) yield a;
  }
  */
  for (const a of iter) {
    const b = _go1(a, func);
    if (b instanceof Promise) yield b.then(b => (b ? a : Promise.reject(nop)));
    else if (b) yield a;
  }
});
L._reject = _curry((func, iter) => {
  return L._filter(a => _go1(func(a), _not), iter);
});
L._values = function* (obj) {
  for (const k in obj) yield obj[k];
};
L._entries = function* (obj) {
  for (const k in obj) yield [k, obj[k]];
};

const _entries = a => {
  return _takeAll(L._entries(a));
};
const _join = _curry((sep, iter) => _reduce((a, b) => `${a}${sep}${b}`, iter));

const _takeAll = _take(Infinity);

const isIterable = a => a && a[Symbol.iterator];

L._flatten = function* (iter) {
  for (const a of iter) {
    // if (isIterable(a)) for (const b of a) yield b;
    // 위의 코드는 yield* 를 활용하면 아래와 같이 변경 가능
    if (isIterable(a)) yield* a;
    // yield* iterable은 for(const val of iterable) yield val; 과 같다.
    else yield a;
  }
};

L._deepFlat = function* func(iter) {
  for (const a of iter) {
    if (isIterable(a)) yield* func(a);
    else yield a;
  }
};
const _flatten = _pipe(L._flatten, _takeAll);
L._flatMap = _curry(_pipe(L._map, L._flatten));
const _find = _curry((func, iter) =>
  _go(iter, L._filter(func), _take(1), ([a]) => a),
);
const map = _curry(_pipe(L._map, _takeAll));

// L._filter + take로 map 만들기
const filter = _curry(_pipe(L._filter, _takeAll));

// 배열을 객체로 바꿔주는 함수
const _object = entries =>
  _reduce((obj, [k, v]) => ((obj[k] = v), obj), {}, entries);

// 객체를 배열로, 인자로 함수로 배열 처리 후 다시 객체로 변환해주는 함수
const _mapObject = (func, obj) =>
  _go(
    obj,
    L._entries,
    L._map(([k, v]) => [k, func(v)]),
    _object,
  );
// 병렬처리 함수
const C = {};

function _noop() {}
/*
const _catchNoop = (arr) => (
  arr.forEach((a) => (a instanceof Promise ? a.catch(_noop) : a)), arr
);
*/

const _catchNoop = ([...arr]) => (
  arr.forEach(a => (a instanceof Promise ? a.catch(_noop) : a)), arr
);

/*
C._reduce = _curry((func, acc, iter) => {
  const iter2 = _catchNoop(iter ? [...iter] : [...acc]);
  return iter ? _reduce(func, acc, iter2) : _reduce(func, iter2);
});
*/

// C._reduce 좀 더 간단히 정리
/*
C._reduce = _curry((func, acc, iter) =>
  iter
    ? _reduce(func, acc, _catchNoop(iter))
    : _reduce(func, catchNoop(acc))
);
*/

C._reduce = _curry((func, acc, iter) =>
  _reduce(func, ...(iter ? [acc, _catchNoop(iter)] : [_catchNoop(acc)])),
);

C._take = _curry((l, iter) => _take(l, _catchNoop([...iter])));
C._takeAll = C._take(Infinity);
C._map = _curry(_pipe(L._map, C._takeAll));
C._filter = _curry(_pipe(L._filter, C._takeAll));

const _each = _curry((f, iter) => {
  return _map(a => _go1(f(a), () => a), iter);
});

const _reject = _curry((func, iter) => {
  return _filter(a => _go1(func(a), _not), iter);
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
  _join,
  _takeAll,
  _flatten,
  _find,
  map,
  filter,
  _each,
  _reject,
  _not,
  _object,
  _mapObject,
  C,
  _entries,
  _delay,
};
