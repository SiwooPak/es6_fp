const {} = require("../lib/fx");
const log = console.log;
// Promise
// - 일급
const add10 = (a, cb) => {
  setTimeout(() => cb(a + 10), 100);
};

add10(5, (res) => {
  log("1st: ", res);
});

add10(5, (res) => {
  add10(res, (res) => {
    add10(res, (res) => {
      log("2nd: ", res);
    });
  });
});

const add20 = (a) => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(a + 20), 100)
  );
};
add20(5).then((res) => {
  log("3rd: ", res);
});
add20(5)
  .then(add20)
  .then(add20)
  .then((res) => {
    log("4st: ", res);
  });

// - 일급 활용
// 즉시 평가
const delay100 = (a) =>
  new Promise((resolve) => setTimeout(() => resolve(a), 100));
const go1 = (a, func) =>
  a instanceof Promise ? a.then(func) : func(a);
const add5 = (a) => a + 5;
log(go1(10, add5));
// 비동기적인 평가
const res1 = go1(Promise.resolve(10), add5);
res1.then(log);
const res2 = go1(delay100(10), add5);
res2.then(log);
// 코드 리팩터링
const n1 = Promise.resolve(10);
go1(go1(n1, add5), log);
const n2 = delay100(10);
go1(go1(n2, add5), log);
// Promise는 어떠한 일을 한 결과의 상황을 일급값으로 만들어서
// 지속적으로 어떠한 일들을 연결해나가는 것이 중요한 특징 중의 하나임.
