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

// 함수 합성 관점에서의 Promise와 모나드
// 함수는 두 집합을 연결하여 관계를 만들어 주는 연산
// 함수 합성 f.g
// f(g(x))
const g = (a) => a + 1;
const f = (a) => a * a;

// log(f(g(1)));
// log(f(g()));

// 모나드 형태의 map()을 이용하여 함수 합성
Array.of(1).map(g).map(f) /*.forEach(r => log(r))*/;
[].map(g).map(f) /*.forEach(r => log(r))*/;

// promise는 then()을 통해 함수 합성
Promise.resolve(2).then(g).then(f) /*.then(r => log(r))*/;
new Promise((resolve) => setTimeout(() => resolve(2), 100))
  .then(g)
  .then(f) /*.then(r => log(r))*/;

// Klesli Composition
