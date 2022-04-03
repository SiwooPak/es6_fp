const { log } = require("../lib/fx");

// async, await
// 이미 promise로 만들어진 라이브러리를 사용할경우, async, await만으로도 가능하지만
// 없을 경우 promise를 사용해야 사용 가능
// async, await도 promise를 리턴함
function delay(time) {
  return new Promise((res) => setTimeout(() => res(), time));
}

async function delayIdentity(a) {
  await delay(500);
  return a;
}

async function f1() {
  const a = await delayIdentity(10);
  const b = await delayIdentity(5);

  return a + b;
}
// f1();
// f1().then(log);
// _go(f1(), log);
/*
(async () => {
  log(await f1());
})();
*/
const pa = Promise.resolve(10);
(async () => {
  log(await pa);
})();
