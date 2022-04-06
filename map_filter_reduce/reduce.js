const log = console.log;

const products = [
  { name: "half_tee", price: 15000 },
  { name: "long_tee", price: 20000 },
  { name: "mobile_case", price: 15000 },
  { name: "hood_tee", price: 30000 },
  { name: "pants", price: 25000 },
];

/* reduce */
const nums = [1, 2, 3, 4, 5];

let total = 0;
for (const n of nums) {
  total = total + n;
}
log(total);

const _reduce = (func, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value; // iterator는 {value, done}
  }
  for (const n of iter) {
    acc = func(acc, n);
  }
  return acc;
  //   if (args.length < 3) {
  //     let [func, iter] = args;
  //     let acc = iter.shift();
  //     for (const n of iter) {
  //       acc = func(acc, n);
  //     }
  //     return acc;
  //   } else {
  //     let [func, acc, iter] = args;
  //     for (const n of iter) {
  //       acc = func(acc, n);
  //     }
  //     return acc;
  //   }
};
const add = (a, b) => a + b;
log(_reduce(add, 0, nums));
log(_reduce(add, [1, 2, 3]));

log(
  _reduce(
    (total_price, product) => total_price + product.price,
    0,
    products
  )
);
