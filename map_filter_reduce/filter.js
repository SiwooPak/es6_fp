const log = console.log;

const products = [
  { name: "half_tee", price: 15000 },
  { name: "long_tee", price: 20000 },
  { name: "mobile_case", price: 15000 },
  { name: "hood_tee", price: 30000 },
  { name: "pants", price: 25000 },
];

/* filter */
const _filter = (func, iter) => {
  let result = [];
  for (const a of iter) {
    if (func(a)) result.push(a);
  }
  return result;
};
let under20000 = [];
for (const p of products) {
  if (p.price < 20000) under20000.push(p);
}
log(...under20000);
let under20000Fp = _filter((el) => el.price < 20000, products);
log("under20000Fp");
log(under20000Fp);

let over20000 = [];
for (const p of products) {
  if (p.price > 20000) over20000.push(p);
}
log(...over20000);
let over20000Fp = _filter((el) => el.price > 20000, products);
log(over20000Fp);

log(_filter((el) => el.name === "pants", products));
log(_filter((e) => e % 2 === 0, [1, 2, 3, 4]));
log(
  _filter(
    (e) => e % 2,
    (function* () {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      yield 5;
    })()
  )
);
