/* ---------------------------------- Utils --------------------------------- */
const calculateMean = (nums) => {
  if (nums.length === 0) return 0;
  let data = nums.reduce((acc, cur) => {
    return acc + cur;
  })
  return data / nums.length;
}

console.log(calculateMean([1, 2, 3, 4, 5]))

const calculateMedian = (nums) => {
  const sorted = nums.slice().sort((a, b) => {
    return a - b;
  })
  if (sorted.length % 2 === 0) {
    const first = sorted[sorted.length / 2 - 1];
    const second = sorted[sorted.length / 2];

    return (first + second) / 2;
  } else {
    const mid = Math.floor(sorted.length / 2);

    return sorted[mid];
  }
}

console.log(calculateMedian([1, 2, 3, 4, 5, 6, 7, 8, 9]))

const frequencyCounter = (arr) => {
  return arr.reduce(function(acc, next) {
    acc[next] = (acc[next] || 0) + 1;
    return acc;
  }, {});
}

const calculateMode = (arr) => {
  let freqCounter = frequencyCounter(arr);

  let count = 0;
  let mostFrequent;

  for (let key in freqCounter) {
    if (freqCounter[key] > count) {
      mostFrequent = key;
      count = freqCounter[key];
    }
  }

  return +mostFrequent;
}

console.log(calculateMode([1, 1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2]))

function convertAndValidate(numsAsStrings) {
  let result = [];

  for (let i = 0; i < numsAsStrings.length; i++) {
    let valToNumber = Number(numsAsStrings[i]);

    if (Number.isNaN(valToNumber)) {
      return new Error(
        `The value '${numsAsStrings[i]}' at index ${i} is not a valid number.`
      );
    }

    result.push(valToNumber);
  }
  return result;
}

console.log(convertAndValidate(['1', '2', '3', '4', '5']))


module.exports = {
  calculateMean,
  calculateMedian,
  calculateMode,
  convertAndValidate
}
