/* 
이터러블 중심 프로그래밍에서의 지연 평가 (Lazy Evaluation)
- 제때 계산법: 필요할 때마다 평가
- 느긋한 계산법: 게으르지만 할 때 한다
- 제너레이터/이터레이터 프로토콜을 기반으로 구현
*/

const { L, log } = require("../lib/fx");

// L._map
L._map = function* (func, iter) {
  for (const a of iter) yield func(a);
};
const it = L._map((n) => n + 2, [1, 2, 3]);
log([...it]);

// L._filter
L._filter = function* (func, iter) {
  for (const a of iter) if (func(a)) yield a;
};
const it2 = L._filter((n) => !(n % 2), [1, 2, 3]);
log([...it2]);
/* 
map, filter 계열 함수들이 가지는 결합 법칙
- 사용하는 데이터가 무엇이든지
- 사용하는 보조함수가 순수함수라면 무엇이든지
- 아래와 같이 결합한다면 둘다 결과가 같다
*/
