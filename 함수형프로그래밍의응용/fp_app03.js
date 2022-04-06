const { log, L, _each, _go } = require('../lib/fx');

// while을 range로
// 이터러블 프로그래밍 관점으로 range
// while은 조건만족하는 한 반복하는 구문
// 효과를 each로 구분
function f1(end) {
  let i = 0;
  while (i < end) {
    log(i);
    ++i;
  }
}
f1(10);
log('=========');
function f2(end) {
  _each(log, L._range(end));
}
f2(10);
log('=========');

// 부수효과는 each()로
const f3 = end => _go(L._range(1, end, 2), _each(log));
f3(5);
