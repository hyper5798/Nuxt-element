'use strict';
export const chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
};

export const COLORS = [
  '#4dc9f6',
  '#f67019',
  '#f53794',
  '#537bc4',
  '#acc236',
  '#166a8f',
  '#00a950',
  '#58595b',
  '#8549ba'
];

export const emptyData = {
  labels: [],
  datasets: []
};

export const options = {
  title:{
    text: "Chart.js Time Scale"
  },
  tooltips: {
    mode: 'index',
  },
  hover: {
    mode: 'index'
  },
  scales: {
    xAxes: [{
      type: "time",
      time: {
        parser: 'labels',
        // round: 'day'
        tooltipFormat: 'll HH:mm'
      },
      scaleLabel: {
        display: true,
        labelString: 'Date'
      }
    }, ],
    yAxes: [{
      ticks: {
        beginAtZero: true,
      },
      scaleLabel: {
        display: true,
        labelString: 'value'
      }
    }]
  },
};

export const options1 =  {
  responsive:true,
  title:{
    text: "Chart.js Time Scale"
  },
  tooltips: {
    mode: 'index',
  },
  hover: {
    mode: 'index'
  },
  scales: {
    xAxes: [{
      type: "time",
      time: {
        parser: 'labels',
        // round: 'day'
        tooltipFormat: 'll HH:mm'
      },
      scaleLabel: {
        display: true,
        labelString: 'Date'
      }
    }, ],
    yAxes: [{
      ticks: {
        beginAtZero: false,
        maxTicksLimit: 5,
        stepSize: 5
      },
      scaleLabel: {
        display: true,
        labelString: 'value'
      }
    }]
  },
};



