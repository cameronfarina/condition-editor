import React from 'react';

const Table = (props) => {
  const { columns, data } = props;

  const renderTableData = () => {
    return data.map((product, i) => {
      return (
        <tr key={'tr-' + i}>
          {columns.map((column, j) => {
            return <td key={'td-' + j}>{product[column.key]}</td>;
          })}
        </tr>
      );
    });
  };

  const generateHeader = () => {
    return columns.map((column) => {
      return <th key={'th-' + column.key}>{column.label}</th>;
    });
  };

  return (
    <table>
      <thead>
        <tr>{generateHeader()}</tr>
      </thead>
      <tbody>{renderTableData()}</tbody>
    </table>
  );
};

export default Table;
