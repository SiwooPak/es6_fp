const { L, _take, _reduce, log, _go } = require('../lib/fx');

function f1(limit, list) {
  let acc = 0;
  for (const a of list) {
    if (a % 2) {
      const b = a * a;
      acc += b;
      if (--limit === 0) break;
    }
  }
  log(acc);
}

// 이티러블 프로그래밍으로 변환(LISP)
// if를 filter로
function f2(limit, list) {
  let acc = 0;
  for (const a of L._filter(a => a % 2, list)) {
    const b = a * a;
    acc += b;
    if (--limit === 0) break;
  }
  log(acc);
}
// 값 변화 후 변수 할당을 map으로
function f3(limit, list) {
  let acc = 0;
  for (const a of L._map(
    a => a * a,
    L._filter(a => a % 2, list),
  )) {
    acc += a;
    if (--limit === 0) break;
  }
  log(acc);
}
// break를 take로
function f4(limit, list) {
  let acc = 0;
  for (const a of _take(
    limit,
    L._map(
      a => a * a,
      L._filter(a => a % 2, list),
    ),
  )) {
    acc += a;
  }
  log(acc);
}
// 축약 및 합산을 reduce로
const add = (a, b) => a + b;
function f5(limit, list) {
  log(
    _reduce(
      add,
      _take(
        limit,
        L._map(
          a => a * a,
          L._filter(a => a % 2, list),
        ),
      ),
    ),
  );
}
f5(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

// _go로 변환

const f6 = (limit, list) =>
  _go(
    list,
    L._filter(a => a % 2),
    L._map(a => a * a),
    _take(limit),
    _reduce(add),
    log,
  );
f1(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
f2(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
f3(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
f4(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
f5(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
f6(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
