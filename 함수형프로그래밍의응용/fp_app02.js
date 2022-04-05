const {L} = require('../lib/fx')

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
  for (const a of L._filter( a = a%2, list)) {
      const b = a * a;
      acc += b;
      if (--limit === 0) break;
  }
  log(acc);
}
// 값 변화 후 변수 할당을 map으로
function f2(limit, list) {
  let acc = 0;
  for (const a of L._map(a => a*a, L._filter( a = a%2, list))) {
      const b = a * a;
      acc += b;
      if (--limit === 0) break;
  }
  log(acc);
}
// break를 take로
// 축약 및 합산을 reduce로