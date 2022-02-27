const log = console.log;
// es5에서 리스트 순회
const list = [1, 2, 3];
for (let i = 0; i < list.length; i++) {
  log(list[i]);
}

const str = "abc";
for (let i = 0; i < str.length; i++) {
  log(str[i]);
}

//es6에서 리스트 순회
for (const a of list) {
  log(a);
}
for (const a of str) {
  log(a);
}

// Array를 통해 알아보기
log("====== Array ======");
const arr = [1, 2, 3];
for (const n of arr) log(n);

// Set를 통해 알아보기
log("====== Set ======");
const set = new Set([1, 2, 3]);
for (const n of set) log(n);

// Map를 통해 알아보기
log("====== Map ======");
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
for (const n of map) log(n);

// Symbol.iterator(for of)
log(arr[Symbol.iterator]);
// arr[Symbol.iterator] = null;
// 이터레이터 값을 null로 할당하면 for of문은 에러 발생
for (const a of arr) log(a);

// 이터러블, 이터레이터 프로토콜
// - 이터러블: 이터레이터를 리턴하는 [Symbol.iterator]()를 가진 값
// - 이터레이터: {value, done} 객체를 리턴하는 next()를 가진 값
// 이터러블, 이터레이터 프로토콜: 이터러블을 for...of, 전개 연산자 등과 함께 동작하도록 한 규약
let iter = set[Symbol.iterator]();
log(iter.next());
log(iter.next());
log(iter.next());
log(iter.next());

// 사용자 정의 이터러블을 통해 알아보기
