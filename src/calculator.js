
/**
 * Datetime: dd-mm-yyyy
 * Function calculator Datetime Arrival when you know duration time
 */
var calArrivalDate = (dtcurrent, duration) => {
  let datem = dtcurrent.split('-')
  let namnew = duration / 12
  let thangle = duration % 12
  let yearcurren = parseInt(datem[2])
  let monthcurren = parseInt(datem[1])
  let daycurrent = parseInt(datem[0])
  if (namnew > 0) {
    yearcurren = yearcurren + namnew
    if (monthcurren + thangle > 12) {
      yearcurren = yearcurren + (monthcurren + thangle) / 12
      monthcurren = (monthcurren + thangle) % 12
    } else {
      monthcurren = monthcurren + thangle
    }
  } else {
    yearcurren = yearcurren + namnew
  }
  return (daycurrent + '-' + Math.floor(monthcurren) + '-' + Math.floor(yearcurren))
}
/*
** Calculator monthly interest and money
*/
var calDecreMoney = (dtcurrent, duration, irate, money) => {
  let datem = dtcurrent.split('-')
  let yearcurren = parseInt(datem[2])
  let monthcurren = parseInt(datem[1])
  let daycurrent = parseInt(datem[0])
  let moneyMonthly
  let interestly
  let total = money
  let ratemonthly
  if (irate === 0) {
    ratemonthly = 0
  } else {
    ratemonthly = (irate * 1 / 100) / 12
  }
  let datetime = []
  let totally = []
  let monthly = []
  let interly = []
  let payTotal = []
  datetime.push(yearcurren + '-' + monthcurren + '-' + daycurrent)
  totally.push(0)
  monthly.push(0)
  interly.push(0)
  payTotal.push(0)
  let looop = duration
  for (let i = 1; i <= looop; i++) {
    if (monthcurren + 1 > 12) {
      moneyMonthly = total / duration
      interestly = ratemonthly * total
      total = total - moneyMonthly
      duration--
      yearcurren++
      monthcurren = 1
    } else {
      moneyMonthly = total / duration
      interestly = ratemonthly * total
      total = total - moneyMonthly
      duration--
      monthcurren = monthcurren + 1
    }
    /**
     * Round except after .
     */
    let payCal = Math.round(moneyMonthly + interestly)
    let lamtronTotal = Math.round(total)
    let lamtronMonthy = Math.round(moneyMonthly)
    let lamtronInterst = Math.round(interestly)
    let lamtronTime = yearcurren + '-' + monthcurren + '-' + daycurrent
    datetime.push(lamtronTime)
    totally.push(lamtronTotal)
    interly.push(lamtronInterst)
    monthly.push(lamtronMonthy)
    payTotal.push(payCal)
    // console.log(lamtronTime + '  Total: ' + lamtronTotal + '   Monthly: ' + lamtronMonthy + '    Interst: ' + lamtronInterst )
  }

  let finalArr = {
    'datetime': [...datetime],
    'totally': [...totally],
    'monthly': [...monthly],
    'interest': [...interly],
    'paytotal': [...payTotal]
  }
  return finalArr
}
/**
 * return date comfortable JSON
 * Datetime: paytotal
 */
const dataChart = (datetime, paytotal) => {
  let count = 0
  let jsonData = {}
  for (var item of datetime) {
    jsonData[item] = paytotal[count]
    count++
  }
  return jsonData
}
/**
 *
 * Return money in Month
 */
const calMoneyDayMonth = (dtcurrent, duration, irate, money, datenow) => {
  let result = calDecreMoney(dtcurrent, duration, irate, money)
  let resultdate = result.datetime
  let resultmoneyly = result.paytotal
  // Get Date 
  let yearCr = datenow.getFullYear()
  let monthCr = datenow.getMonth() + 1
  // let dayCr = datenow.getDate()
  let countDayOfMonthCr = daysInMonth(monthCr, yearCr)
  for (let i = 0; i < resultdate.length; i++) {
    let daeSlit = resultdate[i].split('-')
    let day = daeSlit[2]
    let month = daeSlit[1]
    let year = daeSlit[0]
    if (yearCr.toString() === year && monthCr.toString() === month) {
      // console.log(yearCr + '-' + year + '-' + monthCr + '-' + month)
      if (i > 0 && day > 1) {
        let beforeCount = i - 1
        let currentCount = i
        let beforeDate = new Date(resultdate[beforeCount])
        let currentDate = new Date(resultdate[currentCount])
        let countDay = daysbetween(currentDate, beforeDate) // Before total day
        // only currenty month because i not calculator for before month
        let totalCurrentMoney = (resultmoneyly[currentCount] / countDay) * day // total before money
        // console.log('Count Day: ' + countDay)
        // console.log('totalCurrentMoney ' + totalCurrentMoney)
        // total current
        let afterCount = i + 1
        let futureDate = new Date(resultdate[afterCount])
        let countDayAfter = daysbetween(futureDate, currentDate) // Total day after
        let totalAfterMoney = (resultmoneyly[afterCount] / countDayAfter) * (countDayOfMonthCr - day)
        // Calculator money daily
        // console.log('Countggcurren' + countDayAfter)
        // console.log('totalAfterMoney' + totalAfterMoney)
        // console.log('countDayOfMonthCr' + countDayOfMonthCr)
        let moneyDaily = Math.round((totalCurrentMoney + totalAfterMoney) / countDayOfMonthCr)

        return { moneyDaily, countDayOfMonthCr }
      }
      if (i > 0 && day === '1') {
        let moneyMonthly = Math.round(resultmoneyly[i] / countDayOfMonthCr)
        return { moneyMonthly, countDayOfMonthCr }
      }
      if (i === 0) {
        let moneyMonthly = Math.round(resultmoneyly[i] / countDayOfMonthCr)
        return { moneyMonthly, countDayOfMonthCr }
      }
    }
  }
}
/**
 * Count day between Date
 * date1 current
 * date2 past
 */
const daysbetween = (date1, date2) => {
  let oneDay = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds
  let diffDays = Math.round(Math.abs((date1.getTime() - date2.getTime()) / (oneDay)))
  return diffDays
}
/**
 * Count Day of Month
 */
function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate()
}

export { calArrivalDate, calDecreMoney, dataChart, daysbetween, daysInMonth, calMoneyDayMonth }
