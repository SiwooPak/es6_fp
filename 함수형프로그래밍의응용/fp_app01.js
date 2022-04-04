const {
  _go,
  C,
  log,
  L,
  _filter,
  _map,
  _reduce,
  _take,
  add,
  _range,
} = require("../lib/fx");

// 홀수 n개 더하기
// 명령형
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

// 함수형 즉시평가
function f2(limit, list) {
  _go(
    list,
    _filter((a) => a % 2),
    _map((a) => a * a),
    _take(limit),
    _reduce(add),
    log
  );
}

// 함수형 지연평가
function f3(limit, list) {
  _go(
    list,
    L._filter((a) => a % 2),
    L._map((a) => a * a),
    _take(limit),
    _reduce(add),
    log
  );
}

// 함수형 지연 및 병렬 평가
function f4(limit, list) {
  _go(
    list,
    C._filter((a) => a % 2),
    C._map((a) => a * a),
    C._take(limit),
    C._reduce(add),
    log
  );
}
//f1(가져올 갯수, 데이터)
console.time("1st");
f1(3, _range(20));
console.timeEnd("1st");

console.time("2nd");
f2(3, _range(20));
console.timeEnd("2nd");

console.time("3rd");
f3(3, _range(20));
console.timeEnd("3rd");

console.time("4th");
f4(3, _range(20));
console.timeEnd("4th");
