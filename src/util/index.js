export const number2Thousands = (x) => {
    return String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  /**
       * 为数字加上单位：万或亿
       *
       * 例如：
       *      1000.01 => 1000.01
       *      10000 => 1万
       *      99000 => 9.9万
       *      566000 => 56.6万
       *      5660000 => 566万
       *      44440000 => 4444万
       *      11111000 => 1111.1万
       *      444400000 => 4.44亿
       *      40000000,00000000,00000000 => 4000万亿亿
       *      4,00000000,00000000,00000000 => 4亿亿亿
       *
       * @param {number} number 输入数字.
       * @param {number} decimalDigit 小数点后最多位数，默认为2
       * @return {string} 加上单位后的数字
       */
  export const addChineseUnit = function addChineseUnit() {
    var addWan = function (integer, number, mutiple, decimalDigit) {
      var digit = getDigit(integer);
      if (digit > 3) {
        var remainder = digit % 8;
        if (remainder >= 5) {   // ‘十万’、‘百万’、‘千万’显示为‘万’
          remainder = 4;
        }
        return Math.round(number / Math.pow(10, remainder + mutiple - decimalDigit)) / Math.pow(10, decimalDigit) + '万';
      } else {
        return Math.round(number / Math.pow(10, mutiple - decimalDigit)) / Math.pow(10, decimalDigit);
      }
    };
  
    var getDigit = function (integer) {
      var digit = -1;
      while (integer >= 1) {
        digit++;
        integer = integer / 10;
      }
      return digit;
    };
  
    return function (number, decimalDigit) {
      decimalDigit = decimalDigit == null ? 2 : decimalDigit;
      var integer = Math.floor(number);
      var digit = getDigit(integer);
      // ['个', '十', '百', '千', '万', '十万', '百万', '千万'];
      var unit = [];
      if (digit > 3) {
        var multiple = Math.floor(digit / 8);
        if (multiple >= 1) {
          var tmp = Math.round(integer / Math.pow(10, 8 * multiple));
          unit.push(addWan(tmp, number, 8 * multiple, decimalDigit));
          for (var i = 0; i < multiple; i++) {
            unit.push('亿');
          }
          return unit.join('');
        } else {
          return addWan(integer, number, 0, decimalDigit);
        }
      } else {
        return number;
      }
    };
  }();
  
  export function unitConvert (num) {
    var moneyUnits = ["元", "万", "亿", "万亿"] 
    var dividend = 10000;
    var curentNum = num;
    //转换数字 
    var curentUnit = moneyUnits[0];
    //转换单位 
    for (var i = 0; i <4; i++) { 
        curentUnit = moneyUnits[i] 
        if(strNumSize(curentNum)<5){ 
            break;
        }
        curentNum = curentNum / dividend 
    } 
    var m = {num: 0, unit: ""} 
    m.num = curentNum.toFixed(2)
    m.unit = curentUnit;
    return m;
  }
  
  const strNumSize = function(tempNum){ 
    var stringNum = tempNum.toString() 
    var index = stringNum.indexOf(".") 
    var newNum = stringNum;
    if(index!=-1){
        newNum = stringNum.substring(0,index) 
    } 
    return newNum.length
  }
  
  export function nFormatter(num, digits) {
    var si = [
      { value: 1, symbol: "" },
      { value: 1E3, symbol: "k" },
      { value: 1E6, symbol: "M" },
      { value: 1E9, symbol: "G" },
      { value: 1E12, symbol: "T" },
      { value: 1E15, symbol: "P" },
      { value: 1E18, symbol: "E" }
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
  }