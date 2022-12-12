import './Table.scss';
import {ReactComponent as IconCross} from './cross.svg';

const TableRow = ({id, dateOfSend, forecastStart, forecastEnd, onDelete}) => {
  return (
    <tr className="tableRow">
      <td className="id">
        {id}
      </td>
      <td className="dateSend">
        {dateOfSend}   
      </td>
      <td className="fStart">
        {forecastStart + " - " + forecastEnd} 
      </td>
      <td>
        <button
          className="dButton"
          onClick={
            () => {
              onDelete(id);
            }
          }>
          <IconCross className="cr"/>
        </button>
      </td>
    </tr>
  );
}

export const Table = ({data, onDelete}) => {
  return (
    <table className="table">

      <tbody>
        <tr className="tableRow">
          <td className="id">
            id
          </td>
          <td className="dateSend">
            Дата отправки
          </td>
          <td className="fStart">
            Прогноз на период
          </td>
          <td >
            Действия
          </td>
        </tr>
        {
          data.map((i, pos) =>
            <TableRow
              key={pos}
              id={i.id}
              dateOfSend={i?.dateOfSend}
              forecastStart={i?.forecastStart}
              forecastEnd={i?.forecastEnd}
              onDelete={onDelete}
            />
          )
        }
      </tbody>
      
    </table>
  );
}
