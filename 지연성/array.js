const {
  _go,
  _flatten,
  _filter,
  L,
  _take,
  log,
  _reduce,
  add,
} = require("../lib/fx");

// 2차원 배열 다루기
const arr = [
  [1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [9, 10],
];

// 2차원 배열의 요소의 값이 홀수인 숫자 3개만 뽑기.
_go(
  arr,
  L._flatten,
  L._filter((a) => a % 2),
  _take(3),
  log
);

// 위처럼 홀수인 요소를 구한 다음 제곱해서 3개만 뽑기
_go(
  arr,
  L._flatten,
  L._filter((a) => a % 2),
  L._map((n) => n * n),
  _take(3),
  _reduce(add),
  log
);

// 지연성 / 이터러블 중심 프로그래밍 실무적인 코드
// '프로그래밍 디자인 어떻게 할 것인가', '컴퓨터 프로그래밍 구조와 해석'
const users = [
  {
    name: "a",
    age: 21,
    family: [
      { name: "a1", age: 53 },
      { name: "a2", age: 47 },
      { name: "a3", age: 16 },
      { name: "a4", age: 15 },
    ],
  },
  {
    name: "b",
    age: 24,
    family: [
      { name: "b1", age: 58 },
      { name: "b2", age: 51 },
      { name: "b3", age: 19 },
      { name: "b4", age: 22 },
    ],
  },
  {
    name: "c",
    age: 31,
    family: [
      { name: "c1", age: 64 },
      { name: "c2", age: 62 },
    ],
  },
  {
    name: "d",
    age: 20,
    family: [
      { name: "d1", age: 42 },
      { name: "d2", age: 42 },
      { name: "d3", age: 11 },
      { name: "d4", age: 7 },
    ],
  },
];

// 유저정보를 담은 배열에서 가족 중에 성인 아닌 사람 4명만 뽑기
_go(
  users,
  L._map((u) => u.family),
  L._flatten,
  L._filter((u) => u.age < 20),
  L._map((u) => u.name),
  _take(4),
  log
);
