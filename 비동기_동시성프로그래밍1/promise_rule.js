const { log } = require("../lib/fx");

// promise.then의 중요한 규칙
Promise.resolve(Promise.resolve(Promise.resolve(1))).then(function (
  a
) {
  log(a);
});
// promise가 여러개 중첩이 되도 then() 하나로 출력할 수 있음
// then()로 반드시 promise 객체를 반환하는 것은 아님

new Promise((resolve) =>
  resolve(new Promise((resolve) => resolve(1)))
).then(log);
