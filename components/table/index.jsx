import React from 'react';

const Table = (props) => {
  const { columns, data } = props;

  const renderTableData = () => {
    return data.map((product, i) => {
      return (
        <tr className="table-rows" key={'tr-' + i}>
          {columns.map((column, j) => {
            return (
              <td className="table-cells" key={'td-' + j}>
                {product[column.key]}
              </td>
            );
          })}
        </tr>
      );
    });
  };

  const generateHeader = () => {
    return columns.map((column) => {
      return (
        <th className="header-cells" key={'th-' + column.key}>
          {column.label}
        </th>
      );
    });
  };

  return (
    <table className="table">
      <thead className="header">{generateHeader()}</thead>
      <tbody>{renderTableData()}</tbody>
    </table>
  );
};

export default Table;
