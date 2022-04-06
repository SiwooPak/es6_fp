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
// {}에서 value는 값, done키는 다음 값의 존재 유무에 따라 false, true
// for..of문은 done의 값이 true가 될때까지 순회하다가 멈춤

// 사용자 정의 이터러블을 통해 알아보기
const _iterable = {
  [Symbol.iterator]() {
    let i = 3;
    return {
      next() {
        return i === 0 ? { done: true } : { value: i--, done: false };
      },
      // 자기 자신 또한 이터러블일 경우에도 이터레이터를 반환
      [Symbol.iterator]() {
        return this;
      },
    };
  },
};

const _iterator = _iterable[Symbol.iterator]();
// _iterator.next();
// _iterator.next();
// _iterator.next();
// _iterator.next();
for (const a of _iterable) log(a);

const arr2 = [1, 2, 3];
let _iter2 = arr2[Symbol.iterator]();
for (const a of arr2) log(a);
for (const a of _iter2) log(a);

// html에서도 가능
// for (const a of document.querySelectorAll("*")) log(a);
// const all = document.querySelectorAll("*");
// const _iter3 = all[Symbol.iterator]();
// _iter3.next();
// _iter3.next();
// _iter3.next();

// 전개 연산자
console.clear();
const a = [1, 2];
log([...a, ...[3, 4]]);
log([...a, ...arr, ...set, ...map.keys()]);
