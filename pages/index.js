import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { datastore } from '../components/table/datastore';

const initialTableColumns = datastore.getProperties().map((property) => ({
  key: property.id,
  label: property.name,
}));

const consumerData = [];

datastore.products.forEach((product) => {
  const obj = {};
  product.property_values.forEach((property) => {
    obj[property.property_id] = property.value;
  });
  obj.id = product.id;
  consumerData.push(obj);
});

const initialTableData = consumerData;

const Index = (props) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedOperator, setSelectedOperator] = useState(null);

  const [propertyValueInput, setPropertyValueInput] = useState('');
  const [propertyValueSelect, setPropertyValueSelect] = useState(null);

  const [propertyValueError, setPropertyValueError] = useState('');

  const [filteredTableData, setFilteredTableData] = useState(initialTableData);

  const options = {
    string: [
      'Equals',
      'Has any value',
      'Has no value',
      'Is any of',
      'Contains',
    ],

    number: [
      'Equals',
      'Is greater than',
      'Is less than',
      'Has any value',
      'Has no value',
      'Is any of',
    ],

    enumerated: ['equals', 'Has any value', 'Has no value', 'Is any of'],
  };

  // useEffect(() => {
  //   console.log('filteredTableData Effect', filteredTableData);
  //   return () => {};
  // }, [filteredTableData]);

  const handleEquals = () => {
    const filtered = initialTableData.filter(
      (product) => product[selectedProperty.id] === propertyValueInput
    );

    setFilteredTableData(filtered);
  };

  const handleHasAnyValue = () => {};

  const handleIsGreaterThan = () => {
    if (isNaN(propertyValueInput)) {
      setPropertyValueError('input must be a number');
      return;
    }
    const filtered = initialTableData.filter((product) => {
      return product[selectedProperty.id] > propertyValueInput;
    });

    setFilteredTableData(filtered);
  };

  const handleIsLessThan = () => {
    if (isNaN(propertyValueInput)) {
      setPropertyValueError('input must be a number');
      return;
    }
    const filtered = initialTableData.filter((product) => {
      return product[selectedProperty.id] < propertyValueInput;
    });

    setFilteredTableData(filtered);
  };

  // const handleHasNoValue = () => {};

  const handleIsAnyOf = () => {
    const filtered = initialTableData.filter((product) => {
      return propertyValueSelect.some((propertyValue) => {
        return product[selectedProperty.id] === propertyValue.id;
      });
    });

    setFilteredTableData(filtered);
  };

  const handleContainsValue = () => {
    const filtered = initialTableData.filter((product) => {
      return product[selectedProperty.id]?.includes(propertyValueInput);
    });

    setFilteredTableData(filtered);
  };

  const handleFilter = () => {
    setPropertyValueError('');
    if (propertyValueInput || propertyValueSelect?.length) {
      switch (selectedOperator.id) {
        case 'Equals':
          handleEquals();
          break;
        case 'Has any value':
          console.log('in any value');
          handleHasAnyValue();
          break;
        case 'Is greater than':
          handleIsGreaterThan();
          break;
        case 'Is less than':
          handleIsLessThan();
          break;
        case 'Is any of':
          handleIsAnyOf();
          break;
        case 'Contains':
          handleContainsValue();
        case 'Has no value':
          handleHasNoValue();
        default:
          break;
      }
    } else {
      setFilteredTableData(initialTableData);
    }
  };

  const logger = () => {
    console.log('***************************************');
    console.log('datastore', datastore);
    console.log('initialTableData', initialTableData);
    console.log('initialColumnData', initialTableColumns);
    console.log('filteredTableData', filteredTableData);
    console.log('selectedProperty', selectedProperty);
    console.log('selectedOperator', selectedOperator);
    console.log('propertyValueInput', propertyValueInput);
    console.log('propertyValueSelect', propertyValueSelect);
    console.log('***************************************');
  };

  logger();

  return (
    <div>
      <form className="filter-form" onSubmit={() => {}}>
        <div style={{ width: '250px' }}>
          <Select
            instanceId="property"
            placeholder="Select a property"
            options={datastore.properties}
            onChange={(option) => {
              setSelectedProperty(option);
              setSelectedOperator(null);
              setPropertyValueInput('');
            }}
            value={selectedProperty}
            getOptionValue={(option) => option.id}
            getOptionLabel={(option) => option.name}
            isClearable
            className="select-property"
          />
        </div>

        {options[selectedProperty?.type] && (
          <div style={{ width: '250px' }}>
            <Select
              instanceId="property"
              className="select-operator"
              placeholder="Select an Operator"
              options={options[selectedProperty.type]?.map((val) => {
                return { id: val, label: val };
              })}
              onChange={(option) => {
                setSelectedOperator(option);
                setPropertyValueInput('');
              }}
              value={selectedOperator}
              getOptionValue={(option) => option.id}
              getOptionLabel={(option) => option.label}
              isClearable
            />
          </div>
        )}

        <div style={{ color: 'red' }}>{propertyValueError}</div>
        {(() => {
          if (selectedProperty?.values) {
            const ourOptions = selectedProperty.values.map((values) => ({
              id: values,
              label: values,
            }));

            return (
              <div style={{ width: '250px' }}>
                <Select
                  isMulti
                  options={ourOptions}
                  onChange={(option) => {
                    setPropertyValueSelect(option);
                  }}
                  getOptionValue={(option) => option.id}
                  getOptionLabel={(option) => option.label}
                  isClearable
                  value={propertyValueSelect}
                />
              </div>
            );
          } else if (selectedOperator?.id === 'Is any of') {
            const ourOptions = {};
            initialTableData.forEach((product) => {
              ourOptions[product[selectedProperty.id]] = {
                id: product[selectedProperty.id],
                name: product[selectedProperty.id],
              };
            });

            return (
              <div style={{ width: '250px' }}>
                <Select
                  isClearable
                  isMulti
                  options={Object.values(ourOptions)}
                  onChange={(option) => {
                    setPropertyValueSelect(option);
                  }}
                  getOptionValue={(option) => option.id}
                  getOptionLabel={(option) => option.name}
                  value={propertyValueSelect}
                />
              </div>
            );
          } else {
            return (
              <input
                type="text"
                onChange={(e) => setPropertyValueInput(e.target.value)}
                value={propertyValueInput}
              />
            );
          }
        })()}

        <button className="filter" type="button" onClick={handleFilter}>
          Filter
        </button>
      </form>

      <Table columns={initialTableColumns} data={filteredTableData} />
    </div>
  );
};

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

export default Index;
