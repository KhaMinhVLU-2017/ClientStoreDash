
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

var calDecreMoney = (dtcurrent, duration, irate, money) => {
  let datem = dtcurrent.split('-')
  let yearcurren = parseInt(datem[2])
  let monthcurren = parseInt(datem[1])
  let daycurrent = parseInt(datem[0])
  let moneyMonthly
  let interestly
  let total = money
  let ratemonthly = (irate * 1 / 100) / 12
  let datetime = []
  let totally = []
  let monthly = []
  let interly = []
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
    let lamtronTotal = Math.round(total)
    let lamtronMonthy = Math.round(moneyMonthly)
    let lamtronInterst = Math.round(interestly)
    let lamtronTime = yearcurren + '-' + monthcurren + '-' + daycurrent
    datetime.push(lamtronTime)
    totally.push(lamtronTotal)
    interly.push(lamtronInterst)
    monthly.push(lamtronMonthy)
    // console.log(lamtronTime + '  Total: ' + lamtronTotal + '   Monthly: ' + lamtronMonthy + '    Interst: ' + lamtronInterst )
  }
  let finalArr = [[...datetime], [...totally], [...monthly], [...interly]]
  return finalArr
}

export { calArrivalDate, calDecreMoney }
