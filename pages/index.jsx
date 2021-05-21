import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { datastore } from '../components/table/datastore';
import {
  handleEquals,
  handleIsGreaterThanOrLessThan,
  handleIsAnyOf,
  handleHasAnyValue,
  handleContainsValue,
  handleHasNoValue,
} from '../utilities/filteringFunctions';
import Table from '../components/table/index';

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

const Index = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedOperator, setSelectedOperator] = useState(null);

  const [propertyValueInput, setPropertyValueInput] = useState('');
  const [propertyValueSelect, setPropertyValueSelect] = useState(null);

  const [productFilter, setProductFilter] = useState(null);

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

    enumerated: ['Equals', 'Has any value', 'Has no value', 'Is any of'],
  };

  const handleFilter = () => {
    if (propertyValueInput || propertyValueSelect?.length) {
      const productFilter = propertyValueInput
        ? propertyValueInput
        : propertyValueSelect;
      switch (selectedOperator.id) {
        case 'Equals':
          const equalsResult = handleEquals(
            initialTableData,
            selectedProperty,
            productFilter
          );
          setFilteredTableData(equalsResult);
          break;
        case 'Has any value':
          const hasAnyResult = handleHasAnyValue(
            initialTableData,
            selectedProperty,
            productFilter
          );
          setFilteredTableData(hasAnyResult);
          break;
        case 'Is greater than':
          const greaterThanResult = handleIsGreaterThanOrLessThan(
            initialTableData,
            selectedOperator.id,
            selectedProperty,
            productFilter
          );
          setFilteredTableData(greaterThanResult);
          break;
        case 'Is less than':
          const lessThanResult = handleIsGreaterThanOrLessThan(
            initialTableData,
            selectedOperator.id,
            selectedProperty,
            productFilter
          );
          setFilteredTableData(lessThanResult);
          break;
        case 'Is any of':
          const isAnyResult = handleIsAnyOf(
            initialTableData,
            selectedProperty,
            productFilter
          );
          setFilteredTableData(isAnyResult);
          break;
        case 'Contains':
          const containsResult = handleContainsValue(
            initialTableData,
            selectedProperty,
            productFilter
          );
          setFilteredTableData(containsResult);
          break;
        case 'Has no value':
          const hasNoResult = handleHasNoValue(
            initialTableData,
            selectedProperty,
            productFilter
          );
          setFilteredTableData(hasNoResult);
          break;
        default:
          break;
      }
    } else {
      setFilteredTableData(initialTableData);
    }
  };

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

        {(() => {
          if (selectedProperty?.values) {
            const ourOptions = selectedProperty.values.map((values) => ({
              id: values,
              label: values,
            }));
            return (
              <div
                className="product-filter-input-group"
                style={{ width: '250px' }}
              >
                <span className="validation" />
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
              <div
                className="product-filter-input-group"
                style={{ width: '250px' }}
              >
                <span className="validation" />
                <input
                  type="text"
                  onChange={(e) => setPropertyValueInput(e.target.value)}
                  value={propertyValueInput}
                />
              </div>
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

export default Index;
