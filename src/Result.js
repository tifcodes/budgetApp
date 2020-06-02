import React, { Component } from "react";
import Chart from "chart.js";

class Result extends Component {
  chartRef = React.createRef();
  state = {
    labels: []
  }

  componentDidUpdate() {
    const myChartRef = this.chartRef.current.getContext("2d");
    const {expenseArray, expenseAmountArray, expenseCat} = this.props
    new Chart(myChartRef, {
      type: "horizontalBar",
      data: {
        //Bring in data
        labels: this.consolidateTrans().map((c) => { return c.split(': ')[0] }),
        datasets: [
          {
            label: "Expense ($)",
            data: this.consolidateTrans().map((c) => {return c.split(': ')[1]}),
            backgroundColor:                  "rgba(75, 192, 192, 0.2)",
            borderColor: 
              "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          }
        ],
      },
      options: {
        //Customize chart options
        legend: {
          labels: {
            fontSize: 18
          }
        },
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontSize: 18
              }
            }
          ],
          yAxes: [
            {
              type: 'category',
              ticks: {
                fontSize: 18
              }
            }
          ]
        }
      }
    });
  }


  consolidateTrans = () => {
    const consolidateCat =
    this.props.expenseArray.reduce((acc, trans) => {
      acc[trans.categories] = [...acc[trans.categories] || [], trans];
      return acc;
      }, {});

      return Object.keys(consolidateCat).map((category) => {
        if (consolidateCat[category] === undefined) {
            return
          } else {
            const consolidateTotal = consolidateCat[category].reduce((accTotal, trans) => {
              accTotal += parseFloat(trans.amount)
              return accTotal;
            }, 0)
            return `${category}: ${consolidateTotal}`;
          }
      })
    }
    
  render() {
    return (
        <canvas
          id="myChart"
          ref={this.chartRef}
      />
    )
  }
}

export default Result