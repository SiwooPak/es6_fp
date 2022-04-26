const {
  log,
  _go,
  L,
  _takeAll,
  _reduce,
  add,
  _map,
  _each,
} = require('../lib/fx');
// 사용자 정의 객체를 이터러블 프로그래밍으로 다루기
// 1. Map, Set
let m = new Map();
m.set('a', 1);
m.set('b', 2);
m.set('c', 3);
// log([...m.entries()]);
// log([...m.keys()]);
// log([...m.values()]);
log(m);
// map을 배열로
const a = _go(
  m,
  L._filter(([, v]) => v % 2),
  _takeAll,
  //   _entries => new Map(_entries),
);
log(a);

let s = new Set();
s.add(10);
s.add(20);
s.add(30);

log(_reduce(add, s));

// 2. Model, Collection
/** 
 * 일반적으로 정의된 객체가 아닌 사용자 정의 객체도
 * _map()를 이터러블 프로그래밍으로 다룰 수 있다.
 const els = document.querySelectorAll('*');
 els[Symbol.iterator]();
 const nodes = _map(el => el.nodeName, els);
 log(nodes);
*/

// 1. 기존의 객체지향 프로그래밍
class Model {
  constructor(attrs = {}) {
    this._attrs = attrs;
  }

  get(k) {
    return this._attrs[k];
  }

  set(k, v) {
    this.attrs[k] = v;
    return this;
  }
}

class Collection {
  constructor(models = []) {
    this._models = models;
  }

  at(idx) {
    return this._models[idx];
  }

  add(model) {
    this._models.push(model);
    return this;
  }

  // 3. Symbol iterator로 제너레이터로 처리해주기
  *[Symbol.iterator]() {
    // for (const model of this._models) {
    //   yield model;
    // }
    // 좀 더 간단하게 하면
    yield* this._models;
  }
  /*
  [Symbol.iterator]() {
      return this._models[Symbol.iterator]();
  }
  */
}

const coll = new Collection();
coll.add(new Model({ id: 1, name: 'AA' }));
coll.add(new Model({ id: 2, name: 'BB' }));
coll.add(new Model({ id: 3, name: 'CC' }));
log(coll.at(2).get('name'));
log(coll.at(1).get('id'));

// 2. 함수형 프로그래밍
// 클래스를 함수형 프로그래밍 사용했을 시 인덱스를 매핑해서 배열로 만들고
// 함수형 프로그래밍을 사용하는 불편한 점이 있다.
// _go(
//   L._range(3),
//   L._map(i => coll.at(i)),
//   L._filter(m => m.get('id') === 1),
//   L._map(m => m.get('name')),
//   _each(log),
// );
// 이터레이터와 제너레이터 추가 후 코드 변경
_go(
  coll,
  L._filter(m => m.get('id') === 1),
  L._map(m => m.get('name')),
  _each(log),
);

// 3. Product, Products
const addAll = _reduce(add);
class Product extends Model {}
class Products extends Collection {
  getPrice() {
    return _map(p => p.get('price'), this);
  }

  totalPrice() {
    /*
    명령형
    let total = 0;
    this._models.forEach(p => {
      total += p.get('price');
    });
    return total;
    */

    /*
    함수형
    return _go(
      this,
      L._map(p => p.get('price')),
      _reduce(add),
    );
    */
    /* 
    함수형 코드 더 간결하게
    return _reduce(
      add,
      L._map(p => p.get('price'), this),
    );
    */
    return addAll(this.getPrice());
  }
}

const products = new Products();
products.add(new Product({ id: 1, price: 10000 }));
products.add(new Product({ id: 3, price: 25000 }));
products.add(new Product({ id: 5, price: 35000 }));
log(products.totalPrice());
