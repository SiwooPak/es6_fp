const log = console.log;

/* 
제너레이터, 이터레이터
- 제너레이터: 이터레이터이자 이터러블을 생성하는 함수
- 문장을 통해서 값을 만들 수 있고, 순회할수 있음
- 어떠한 상태나 어떠한 값이든 순회할 수 있게 함.
*/

const gen = function* () {
  yield 1;
  //   yield 2;
  if (false) yield 2;
  yield 3;
  return 100;
};
log(gen());

let iter = gen();
log(iter[Symbol.iterator]() === iter); // true
log(iter.next()); // 1
log(iter.next()); // 2
log(iter.next()); // 3
log(iter.next()); // 100

for (const a of gen()) log(a); // 반환값을 제외하고 1,2,3만 순회

/* odds */
const infinity = function* (i = 0) {
  while (true) yield i++;
};

const limit = function* (l, iter) {
  for (const a of iter) {
    yield a;
    if (a === l) return;
  }
};

const odds = function* (l) {
  for (const a of limit(l, infinity(1))) {
    if (a % 2) yield a;
  }
  //   for (let i = 0; i < l; i++) {
  //     if (i % 2) yield i;
  //   }
};

let iter2 = odds(10);
log(iter2.next());
log(iter2.next());
log(iter2.next());
log(iter2.next());
log(iter2.next());
log(iter2.next());

for (const a of odds(40)) log(a);

/* for of, 전개 연산자, 구조분해, 나머지 연산자 */
console.clear();
log(...odds(10));
log([...odds(10), ...odds(20)]);

const [head, ...tail] = odds(5);
log(head);
log(tail);

const [a, b, ...rest] = odds(10);
log(a);
log(b);
log(rest);
