// External imports
import styled from 'styled-components'
import { useTable } from 'react-table'

// CSS related constants
const borderColor = "#374462";
const borderRadius = "6px";

// The table styles
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

/**
 * Accepts a timestamp and converts it to a human readable format
 * @param {Number} timestamp the timestamp of the transaction as time elapsed from Jan,1 1970
 * @returns a human readable formatted: "YYYY-MM-DD HH:MM:SS" string
 */
const getFullTimestamp = (timestamp) => {
    const pad = (n,s=2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
    const d = new Date(timestamp);
    
    return `${pad(d.getFullYear(),4)}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }

  /**
   * A React-table component
   * @param {Object[]} columns - captions, 
   * @param {Object[]} data - the historical transactions data 
   * @returns the JSX representation of the table populated with data
   */
const XPTable = ({columns, data}) => {

    // Converts the raw data into human readable
    data = data.map(record => {
        return {...record, 
            // Converts the timestamp to a human readable string
            timestamp: getFullTimestamp(record.timestamp),
            // Returns the value in XPNETs
            value: record.value / 1000000000000000
        }
    });

    // Show latest events first
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