#!/usr/bin/env node
const { calculate } = require('./fbaCalculator');

function parseArg(name, short){
  const long = `--${name}`;
  const shortFlag = short ? `-${short}` : null;
  const args = process.argv;
  const li = args.indexOf(long);
  if(li !== -1) return args[li+1];
  if(shortFlag){
    const si = args.indexOf(shortFlag);
    if(si !== -1) return args[si+1];
  }
  return undefined;
}

if(process.argv.includes('--help') || process.argv.includes('-h')){
  console.log('Usage: node src/index.js --price 19.99 --cost 5 --shipping 2 --fbaFee 3.5 --referral 0.15');
  process.exit(0);
}

const price = parseArg('price','p');
if(!price){
  console.error('Missing required --price');
  process.exit(1);
}

const result = calculate({
  price: Number(price),
  cost: Number(parseArg('cost','c') || 0),
  shipping: Number(parseArg('shipping','s') || 0),
  referralPercent: Number(parseArg('referral','r') || parseArg('ref') || 0.15),
  fbaFee: Number(parseArg('fbaFee','f') || 0),
  storage: Number(parseArg('storage') || 0),
  otherFees: Number(parseArg('otherFees') || 0)
});

console.log(JSON.stringify(result, null, 2));
