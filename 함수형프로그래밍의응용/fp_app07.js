const {
  log,
  L,
  _join,
  _reduce,
  _map,
  _reject,
  _curry,
  _pipe,
  _go,
} = require('../lib/fx');
// query, queryToObject
const obj1 = {
  a: 1,
  b: undefined,
  c: 'CC',
  d: 'DD',
};
// 명령형
function query1(obj) {
  let res = '';
  for (const k in obj) {
    const v = obj[k];
    if (v === undefined) continue;
    if (res != '') res += '&';
    res += k + '=' + v;
  }
  return res;
}
log(query1(obj1));
// 함수형(entries(), reduce())
function query2(obj) {
  return Object.entries(obj).reduce((query, [k, v], i) => {
    if (v === undefined) return query;
    return query + (i > 0 ? '&' : '') + k + '=' + v;
  }, '');
}
log(query2(obj1));

// 함수형(reject, map, reduce) 사용해서 만들기
/*
function query3(obj) {
  return _reduce(
    (a, b) => `${a}&${b}`,
    _map(
      ([k, v]) => `${k}=${v}`,
      _reject(([_, v]) => v === undefined, Object.entries(obj)),
    ),
  );
}
*/

const query3 = obj => {
  return _join(
    '&',
    _map(
      ([k, v]) => `${k}=${v}`,
      _reject(([k, v]) => v === undefined, Object.entries(obj)),
    ),
  );
};
log(query3(obj1));

// 좀 더 간단하게
const query4 = obj =>
  _go(
    obj,
    Object.entries,
    L._reject(([k, v]) => v === undefined),
    L._map(_join('=')),
    _join('&'),
  );
console.log(query4(obj1));

// queryToObject
const split = _curry((sep, str) => str.split(sep));
const queryToObject = _pipe(
  split('&'),
  L._map(split('=')),
  L._map(([k, v]) => ({ [k]: v })),
  _reduce(Object.assign),
);
log(queryToObject('a=1&c=CC&d=DD'));
