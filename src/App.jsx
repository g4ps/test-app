import {useState, useEffect, useCallback, useMemo} from 'react';
import './App.css';
import {Header} from './components/Header';
import {Table} from './components/Table';
import {Input} from './components/Input';


const serviceLink = 'https://virtserver.swaggerhub.com/LOL11999333/Planner/1.0.0' 

function App() {
  const [currData, setCurrData] = useState(null);

  useEffect(() => {
    if (currData === null) {
      const xhr = new XMLHttpRequest();
      const methodName = '/findAllForecastPlanerItems';
      xhr.open("GET", serviceLink + methodName 
              );
      xhr.onload = (e) => {
        if (e.target.response === undefined ) {
          console.lgo("ERROR")
        }
        setCurrData(JSON.parse(e.target.response));
      };
      xhr.send();
      
    }
  }, [currData]);

  const maxId = useMemo(() => {
    let max = null;
    for (let i = 0; i < currData?.length; i++) {
      if (max === null || max < currData[i]?.id) {
        max = currData[i]?.id;
      }
    }
    return max === null ? 0 : max;
  }, [currData]);

  const addToList = useCallback( (dateOfSend, forecastStart, forecastEnd) => { 
    const obj = {
      id: maxId + 1,
      dateOfSend: dateOfSend,
      forecastStart: forecastStart,
      forecastEnd: forecastEnd
    };
    let r = [...currData, obj];
    setCurrData(r);
    const xhr = new XMLHttpRequest();
    const methodName = '/addNewForecastPlannerItem';
    xhr.open("GET", serviceLink + methodName +
             "?" +
             `dateOfSend=${dateOfSend}&` +
             `forecastStart=${forecastStart}&` +
             `forecastEnd=${forecastEnd}`
            );
    xhr.send();
  }, [currData, maxId]);

  const removeFromList = useCallback((id) => {
    setCurrData(currData.filter(i => i.id !== id));
    const xhr = new XMLHttpRequest();
    const methodName = '/deleteForecastPlannerItemById';
    xhr.open("GET", serviceLink + methodName +
             "?" +
             `id=${id}`
            );
    xhr.send();
  }, [currData]);


  
  return (
    <div className="App">
      <Header
      />
      <Table
        data={currData || []}
        onDelete={removeFromList}
      />
      <Input addToList={addToList}/>
    </div>
  );
}

export default App;
