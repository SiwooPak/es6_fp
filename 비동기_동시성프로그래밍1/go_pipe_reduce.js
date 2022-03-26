const { _go, log } = require("../lib/fx");
// go, pipe, reduce에서 비동기 제어
_go(
  1,
  (a) => a + 10,
  (a) => Promise.resolve(a + 100),
  (a) => a + 1000,
  (a) => a + 10000,
  log
);
/**
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
    // 밑의 코드는 promise 객체의 처리를 하지 않아 주석 위의 코드를 실행시
    // 프로미스 대기 상태에서 멈춰잇음
    acc = func(acc, a);
  }
  return acc;
});
// _reduce()가 promise 객체도 처리하기 위해선
acc = acc instanceof Promise ? acc.then(acc => func(acc,a)) : func(acc,a)
// 로 수정하면 비동기로 처리 가능
// 하지만 밑의 코드도 비동기로 처리하기 때문에 좋은 코드라고 볼 수 없음.

 */
_go(
  Promise.resolve(1),
  (a) => a + 10,
  (a) => Promise.resolve(a + 100),
  (a) => a + 1000,
  (a) => a + 10000,
  log
);

_go(
  Promise.resolve(1),
  (a) => a + 10,
  (a) => Promise.reject("error"),
  (a) => console.log("----"),
  (a) => a + 1000,
  (a) => a + 10000,
  log
).catch((err) => log(err));
