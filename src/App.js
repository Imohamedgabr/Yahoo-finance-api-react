import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';
import './App.css';

const App = () => {
  const [interval, setInterval] = useState('1d'); // Default interval is 1 day
  const [chartData, setChartData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `/v8/finance/chart/SPUS?period1=1633381200&period2=1664917199&interval=${interval}&events=history&crumb=5YTX%2FgVGBmg&corsDomain=finance.yahoo.com&.tsrc=finance`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
    
      const chartData = [['Timestamp', 'a', 'b', 'c', 'd']];
    
      const timestamps = res.data.chart.result[0]['timestamp'];
      const values = res.data.chart.result[0]['indicators']['quote'][0];
    
      timestamps.forEach((element, index) => {
        const date = new Date(element * 1000); // Unix time in ms
        const prettyDate = date.toDateString();
        chartData.push([prettyDate, values['high'][index], values['open'][index], values['close'][index], values['low'][index]]);
      });
    
      setChartData(chartData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [interval]);

  const options =  {
    legend: 'none',
    candlestick: {
      fallingColor: { strokeWidth: 0, fill: '#f00' }, // customize the color of the falling candles
      risingColor: { strokeWidth: 0, fill: '#0f0' }, // customize the color of the rising candles
      width: 0.5, // reduce the width of the candlesticks
    },
    chartArea: { width: '80%', height: '80%' }, // increase the chart area
  };

  const handleIntervalChange = (e) => {
    setInterval(e.target.value);
  };

  return (
    <div className="container">
      <div>
        <label htmlFor="interval">Select interval:</label>
        <select id="interval" value={interval} onChange={handleIntervalChange}>
          <option value="1d">1 day</option>
          <option value="1wk">1 week</option>
          <option value="1mo">1 month</option>
        </select>
      </div>
      <Chart
        chartType="CandlestickChart"
        width="100%"
        height="500px"
        data={chartData}
        options={options}
      />
    </div>
  );
};

export default App;