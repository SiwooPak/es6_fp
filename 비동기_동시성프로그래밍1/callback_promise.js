const { _find } = require("../lib/fx");
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
// 대기한 상태에서 함수합성을 안전하게
// 어떤 특정한 상황을 안전하게 함수 합성하기 위해
// 모나드는 연속적으로 안전하게 함수를 합성하기 위한 도구
// promise를 합성 관점에서 봤을때는
// 비동기 상황을 보면 얼마만큼의 딜레이가 필요한 상황에서도
// 함수를 적절한 시점의 평가해서 합성시키긴 위한 도구로써 promise를 바라볼 수 있다.
Promise.resolve(2).then(g).then(f) /*.then(r => log(r))*/;
new Promise((resolve) => setTimeout(() => resolve(2), 100))
  .then(g)
  .then(f) /*.then(r => log(r))*/;

// Klesli Composition관점에서의 promise
// 크레이슬리 컴포지션은 오류가 있을 수 있는 상황에서 함수합성을 안전하게 하는 하나의 규칙
// 상태와 효과, 외부 상황에 영향을 받기 때문에
// 들어오는 인자가 완전히 잘못된 인자여서 함수에서 오류가 나거나
// 정확히 인자가 들어왔지만 어떤 함수가 의존하고 잇는 외부의 상태에 의해서 결과를 정확하게
// 전달하지 못할때 사용하는 함수합성의 방법
// f*g
// f(g(x)) = f(g(x))
// 특정한 규칙을 만들어서 함수 합성을 안전하게 만드는 방법
console.clear();
const users = [
  { id: 1, name: "aa" },
  { id: 2, name: "bb" },
  { id: 3, name: "cc" },
];

// const getUserById = (id) => _find((u) => u.id === id, users);
const getUserById = (id) =>
  _find((u) => u.id === id, users) || Promise.reject("없어요!");
const f1 = ({ name }) => name;
const g1 = getUserById;
//const fg = (id) => f1(g1(id));
const fg = (id) =>
  Promise.resolve(id)
    .then(g1)
    .then(f1)
    .catch((a) => a);
fg(2).then(log);
users.pop();
users.pop();
fg(2).then(log);
