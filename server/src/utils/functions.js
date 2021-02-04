const bd = require('../models/index');
const CONSTANTS = require('../constants');

module.exports.createWhereForAllContests = (
  typeIndex,
  contestId,
  industry,
  awardSort
) => {
  let object = {
    where: {},
    order: [],
  };
  if (typeIndex) {
    Object.assign(object.where, { contestType: getPredicateTypes(typeIndex) });
  }
  if (contestId) {
    Object.assign(object.where, { id: contestId });
  }
  if (industry) {
    Object.assign(object.where, { industry: industry });
  }
  if (awardSort) {
    object.order.push(['prize', awardSort]);
  }
  Object.assign(object.where, {
    status: {
      [bd.Sequelize.Op.or]: [
        CONSTANTS.CONTEST_STATUS_FINISHED,
        CONSTANTS.CONTEST_STATUS_ACTIVE,
      ],
    },
  });
  object.order.push(['id', 'desc']);
  return object;
};

function getPredicateTypes(index) {
  return { [bd.Sequelize.Op.or]: [types[index].split(',')] };
}

const types = [
  '',
  'name,tagline,logo',
  'name',
  'tagline',
  'logo',
  'name,tagline',
  'logo,tagline',
  'name,logo',
];

// Calculate contests price
module.exports.getPricesArr = (totalPrice, num) => {
  const priceForEach = formValuta(totalPrice / num);
  const initPricesArr = formArr(priceForEach, num);

  const pricesSum = getSum(initPricesArr);

  const pricesArr = changeLastValue(
    initPricesArr,
    priceForEach,
    totalPrice,
    pricesSum
  );

  return pricesArr;
};

function formValuta(val) {
  return Number(val.toFixed(2));
}

function formArr(val, num) {
  const priceArr = [];
  for (let i = 1; i <= num; i++) {
    priceArr.push(val);
  }
  return priceArr;
}

function getSum(arr) {
  return arr.reduce((sum, value) => {
    return (sum += value);
  }, 0);
}

function changeLastValue(arr, val, initPrice, priceSum) {
  if (priceSum > initPrice) {
    arr[arr.length - 1] = formValuta(val - (priceSum - initPrice));
  }

  if (priceSum < initPrice) {
    arr[arr.length - 1] = formValuta(val + (initPrice - priceSum));
  }

  return arr;
}
