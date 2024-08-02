const getMethodsNames = {
  years: 'getFullYear',
  months: 'getMonth',
  days: 'getDate',
  hours: 'getHours',
  minutes: 'getMinutes',
  seconds: 'getSeconds',
  milliseconds: 'getMilliseconds',
};

const setMethodsNames = {
  years: 'setFullYear',
  months: 'setMonth',
  days: 'setDate',
  hours: 'setHours',
  minutes: 'setMinutes',
  seconds: 'setSeconds',
  milliseconds: 'setMilliseconds',
};

type TUnits = keyof typeof getMethodsNames;

class Shmoment {
  date: Date;
  constructor(date: Date) {
    this.date = date;
  }
  
  add(units: TUnits, value: number) {
    const getMethod = this.date[getMethodsNames[units] as keyof Date] as () => number;
    const currentUnitValue = getMethod.call(this.date);
    const setMethod = this.date[setMethodsNames[units] as keyof Date] as (v: number) => number;
    this.date = new Date(setMethod.call(this.date, currentUnitValue + value));
    return this;
  }

  set(units: TUnits, value: number) {
    const setMethod = this.date[setMethodsNames[units] as keyof Date] as (v: number) => void;
    setMethod.call(this.date, value);
    return this;
  }


  subtract(units: TUnits, value: number) {
    return this.add(units, -value);
  }

  result() {
    return this.date;
  }
}

export const shmoment = (date: Date) => {
  let result = new Date(date);

  const calculator = new Shmoment(result);

  return calculator;
};
