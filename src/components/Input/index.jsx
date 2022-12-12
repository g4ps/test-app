import {useState, useCallback} from 'react';

export const Input = ({addToList}) => {
  const [dateSend, setDateSend] = useState(null);
  const [forecastStart, setForecastStart] = useState(null);
  const [forecastEnd, setForecastEnd] = useState(null);

  const buttonClick = useCallback(() => {
    addToList(dateSend, forecastStart, forecastEnd);
  }, [dateSend, forecastStart, forecastEnd, addToList]);
  
  
  return <div>
           <input type="date"
                  onChange={
                    (e) => {
                      setDateSend(e?.target?.value);
                    }
                  }
           />
           <input
             type="date"
             onChange={
               (e) => {
                 setForecastStart(e?.target?.value);
               }
             }
           />
           <input
             type="date"
             onChange={
               (e) => {
                 setForecastEnd(e?.target?.value);
               }
             }
           />
           <button
             onClick={buttonClick}
           >
             Send
           </button>
         </div>;
};
