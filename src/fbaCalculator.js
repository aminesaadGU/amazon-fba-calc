function toNumber(v){
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function calculate(opts){
  const price = toNumber(opts.price);
  const cost = toNumber(opts.cost);
  const shipping = toNumber(opts.shipping);
  const referralPercent = toNumber(opts.referralPercent ?? opts.referral ?? 0.15);
  const fbaFee = toNumber(opts.fbaFee);
  const storage = toNumber(opts.storage);
  const otherFees = toNumber(opts.otherFees);

  const referral = price * referralPercent;
  const fees = referral + fbaFee + storage + otherFees;
  const profit = price - cost - shipping - fees;
  const roi = cost > 0 ? (profit / cost) * 100 : null;

  return {
    price: Number(price.toFixed(2)),
    cost: Number(cost.toFixed(2)),
    shipping: Number(shipping.toFixed(2)),
    fees: Number(fees.toFixed(2)),
    profit: Number(profit.toFixed(2)),
    roi: roi === null ? null : Number(roi.toFixed(2)),
    breakdown: {
      referral: Number(referral.toFixed(4)),
      fbaFee: Number(fbaFee.toFixed(2)),
      storage: Number(storage.toFixed(2)),
      otherFees: Number(otherFees.toFixed(2))
    }
  };
}

module.exports = { calculate };
