import React, { Component } from 'react'
import { calArrivalDate, calDecreMoney } from '../calculator'

class AmDashboard extends Component {
  render () {
    // let time = calArrivalDate('3-1-2015', 35)
    let meo = calDecreMoney('3-1-2015', 35, 5, 1000000)
    // console.log(time)
    console.log(meo)
    return (
      <div>
        AmDashboard
      </div>
    )
  }
}

export default AmDashboard
