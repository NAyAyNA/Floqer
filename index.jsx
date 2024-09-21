import React from 'react';
import ReactDOM from 'react-dom/client';
import LineGraph from './LineGraph';

                   
       
function App() {
  const [displayData, setdisplayData] = React.useState([]);
  const [clickedRow, setClickedRow] = React.useState(null);
  const [sortConfig, setSortConfig] = React.useState({ key: null, direction: 'ascending' });
  
  function processData(data){
    const yearMap = {};

      // Grouping data by year and calculating count of jobs and total salary
    data.forEach(item => {
        const { work_year, salary, job_title } = item; //to avoid item.work_year every time

        if (!yearMap[work_year]) {
            yearMap[work_year] = { count: 0, totalSalary: 0, jobs : {} };
        }

        yearMap[work_year].count += 1;              
        yearMap[work_year].totalSalary += salary; 
        
        if (!yearMap[work_year].jobs[job_title]) {
            yearMap[work_year].jobs[job_title] = 0;
        }
        
        yearMap[work_year].jobs[job_title]+=1; 
    });  // end of forEach
    
    //console.log(yearMap[2020]);
    
    const displayData = Object.keys(yearMap).map(year => {
        return {
          year: year,
          count: yearMap[year].count,
          avgSalary: (yearMap[year].totalSalary / yearMap[year].count).toFixed(2),  // Averagesalary
          jobs: yearMap[year].jobs,
        };
      });
      
      displayData.reverse();
      setdisplayData(displayData);
         
    }   
   
 function handleRowClick(row)
  {
    setClickedRow(row);  // Store the clicked row data
    //console.log(row);
  };
  
  function sortData(key){
    let sortedData = [...displayData];
    let direction = 'ascending';

    
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    sortedData.sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setdisplayData(sortedData);
    setSortConfig({ key, direction });
  };
                                    
  React.useEffect(() => {
      fetch("https://raw.githubusercontent.com/NAyAyNA/dataset/main/salaries.json")
            .then(res => res.json())
            .then(data => {
      processData(data); // Passing the fetched data
    });
      
    }, []);
                                                                                             
    return (
     <div className="container">
      <div className="table-container">
        <h2>Main Table</h2>
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th> Year <button onClick={() => sortData('year')}> s </button> </th>
              <th>No. Of Jobs <button onClick={() => sortData('count')}> s </button></th>
              <th>Average Salary <button onClick={() => sortData('avgSalary')}> s </button></th>
            </tr>
          </thead>
          <tbody>
              {displayData.map((item,index) => (
            <tr key={index} onClick={() => handleRowClick(item)}>
              <td>{item.year}</td>
              <td>{item.count}</td>
              <td>{item.avgSalary}</td>
            </tr>
            ))}
          </tbody>
        </table>
        {clickedRow && (
        <div>
          <h3>Details for Year {clickedRow.year}</h3>
          <table border="1" cellPadding="10" cellSpacing="0">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Count of Job Title</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(clickedRow.jobs).map((jobTitle) => (
              <tr key={jobTitle}>
                <td>{jobTitle}</td>
                <td>{clickedRow.jobs[jobTitle]}</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      </div> 
      <div className="chart-container">
        <h2>Trends from 2020 to 2024</h2>
        <LineGraph displayData={displayData}/>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />); 

               