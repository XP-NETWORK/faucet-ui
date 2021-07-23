import styled from 'styled-components'
import { useTable } from 'react-table'

const borderColor = "#374462";
const borderRadius = "6px";

export const XPTableStyles = styled.div`

  table {
    border-spacing: 0;
    border: 1px solid ${borderColor};
    width: 100%;
    border-radius: ${borderRadius};
    font-size: 12px;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid ${borderColor};
      border-right: 1px solid ${borderColor};
      opacity: 0.6;
      :last-child {
        border-right: 0;
      }
    }
  }
`
const getFullTimestamp = (timestamp) => {
    const pad = (n,s=2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
    const d = new Date(timestamp);
    
    return `${pad(d.getFullYear(),4)}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }

const XPTable = ({columns, data}) => {

    data = data.map(record => {
        return {...record, 
            timestamp: getFullTimestamp(record.timestamp),
            value: record.value / 1000000000000000
        }
    });

    data.reverse();

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({
        columns,
        data,
      })

    return (
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      )
}

export default XPTable;