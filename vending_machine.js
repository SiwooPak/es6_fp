const { _go, _filter, _reduce } = require("./lib/fx");
const { log, table } = console;

const _isObject = (obj) => typeof obj === "object" && !!obj;
const _keys = (obj) => (_isObject(obj) ? Object.keys(obj) : []);
const changeQty = (products, no) => {
  products.forEach((p) => {
    if (p.no === no) return p.qty--;
  });
};

const total = (obj) =>
  _go(
    _keys(obj),
    _reduce((a, b) => Number(a) * obj[a] + Number(b) * obj[b])
  );

const last_changes = (totalCash, changes) => {
  for (const coin of coins) {
    if (totalCash < coin) continue;
    const count = Math.floor(totalCash / coin);
    if (changes[coin]) changes[coin] += count;
    else changes[coin] = count;
    totalCash -= coin * Math.floor(totalCash / coin);
  }
};

const productsStatus = (str, products) => {
  log(str);
  table(products);
  log("================");
};

const _head = (list) => list[0];

const products = [
  { no: 1, name: "cola", price: 1100, qty: 2 },
  { no: 2, name: "water", price: 600, qty: 5 },
  { no: 3, name: "coffee", price: 700, qty: 0 },
];

const coins = [10000, 5000, 1000, 500, 100];

/*
  - selected_product: 선택한 상품의 번호
  - payment: 결제수단 방식
  - cash: 현금 결제식 투입되는 현금
  - getSelectedProductIno: 선택한 상품의 정보
  - changes: 잔돈
  - result: 결과값
*/
const main = (selectedProduct, payment, cash) => {
  let avlCash = {},
    changes = {};
  cash = cash || 0;
  // 결과값
  let result = {};

  // productsStatus("구매 전 재고 상태", products);
  // 결제수단이 혐금이고 현금을 투입하지 않을시
  if (payment === "cash" && cash === 0) {
    return { screen: "금액부족" };
  }

  // 선택한 상품의 정보 가져오기
  const getSelectedProductInfo = _go(
    products,
    _filter((p) => p.no === selectedProduct),
    _head
  );

  // 번호에 해당하는 상품이 없는 경우
  if (!getSelectedProductInfo)
    return {
      screen: `번호(${selectedProduct})에 해당하는 상품이 없습니다.`,
    };

  // 선택한 상품이 품절이라 구매 불가능한 경우
  if (!getSelectedProductInfo.qty) {
    return {
      screen: `선택하신 상품 ${getSelectedProductInfo.name}는(은) 품절입니다.`,
    };
  }

  // 구매가능한 경우, 결제수단은 카드인가?
  if (payment === "card") {
    // 해당 상품의 재고 변경
    changeQty(products, selectedProduct);
    // 결과 반환(상품 출고)
    result.output = getSelectedProductInfo.name;
    result.payment = payment;
    // 만약 현금을 투입한 경우
    if (cash > 0) result.changes = cash;
    //productsStatus("구매 후 재고 상태", products);
    return result;
  }

  // 구매가능하고, 결제수단이 현금인 경우
  // 투입한 현금 중에 사용가능한 현금만 걸러내기
  _go(
    _keys(cash),
    _filter((c) => {
      if (coins.find((v) => v === Number(c))) {
        avlCash[c] = cash[c];
      } else {
        changes[c] = cash[c];
      }
    })
  );

  let totalCash = total(avlCash);

  // 상품 금액이 충족한 경우
  if (getSelectedProductInfo.price <= totalCash) {
    // 해당 상품의 재고 변경
    changeQty(products, selectedProduct);
    // 현금 차감
    totalCash -= getSelectedProductInfo.price;
    // 최종 거스름돈 구하기
    last_changes(totalCash, changes);
    result.output = getSelectedProductInfo.name;
    result.payment = payment;
    result.changes = changes;
  } else {
    // 금액 부족일시 스크린에 금액부족 및 잔돈 반환
    last_changes(totalCash, changes);
    result.screen = "금액부족";
    result.changes = changes;
  }
  // productsStatus("구매 후 재고 상태", products);

  return result;
};

// 결제수단: 현금, 구매가능
log(main(1, "cash", { 500: 2, 1000: 1 }));
log(main(2, "cash", { 500: 2, 1000: 1 }));
// 상품의 없는 번호인 경우
log(main(4, "card"));
// 품절이 상품
log(main(3, "card"));
