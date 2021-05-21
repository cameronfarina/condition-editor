import {
  handleContainsValue,
  handleEquals,
  handleHasAnyValue,
  handleIsAnyOf,
  handleIsGreaterThanOrLessThan,
  handleHasNoValue,
} from './filteringFunctions';

test('Check 1 equal product name', () => {
  const data = [
    { 0: 'Headphones', 1: 'black', 2: 5, 3: 'electronics', 4: 'false', id: 0 },
    { 0: 'Cell Phone', 1: 'black', 2: 3, 3: 'electronics', 4: 'true', id: 1 },
    { 0: 'Keyboard', 1: 'grey', 2: 5, 3: 'electronics', 4: 'false', id: 2 },
    { 0: 'Cup', 1: 'white', 2: 3, 3: 'kitchenware', id: 3 },
    { 0: 'Key', 1: 'silver', 2: 1, 3: 'tools', id: 4 },
    { 0: 'Hammer', 1: 'brown', 2: 19, 3: 'tools', id: 5 },
  ];
  const selectedProperty = { id: 0, name: 'Product Name', type: 'string' };
  const propertyValueInput = 'Headphones';
  const output = [
    { 0: 'Headphones', 1: 'black', 2: 5, 3: 'electronics', 4: 'false', id: 0 },
  ];

  expect(handleEquals(data, selectedProperty, propertyValueInput)).toEqual(
    output
  );
});

test('Check no equal product names', () => {
  const data = [
    { 0: 'Headphones', 1: 'black', 2: 5, 3: 'electronics', 4: 'false', id: 0 },
    { 0: 'Cell Phone', 1: 'black', 2: 3, 3: 'electronics', 4: 'true', id: 1 },
    { 0: 'Keyboard', 1: 'grey', 2: 5, 3: 'electronics', 4: 'false', id: 2 },
    { 0: 'Cup', 1: 'white', 2: 3, 3: 'kitchenware', id: 3 },
    { 0: 'Key', 1: 'silver', 2: 1, 3: 'tools', id: 4 },
    { 0: 'Hammer', 1: 'brown', 2: 19, 3: 'tools', id: 5 },
  ];
  const selectedProperty = { id: 0, name: 'Product Name', type: 'string' };
  const propertyValueInput = 'Headphone';
  const output = [];

  expect(handleEquals(data, selectedProperty, propertyValueInput)).toEqual(
    output
  );
});

test('Check multiple exact products with one category', () => {
  const data = [
    { 0: 'Headphones', 1: 'black', 2: 5, 3: 'electronics', 4: 'false', id: 0 },
    { 0: 'Cell Phone', 1: 'black', 2: 3, 3: 'electronics', 4: 'true', id: 1 },
    { 0: 'Keyboard', 1: 'grey', 2: 5, 3: 'electronics', 4: 'false', id: 2 },
    { 0: 'Cup', 1: 'white', 2: 3, 3: 'kitchenware', id: 3 },
    { 0: 'Key', 1: 'silver', 2: 1, 3: 'tools', id: 4 },
    { 0: 'Hammer', 1: 'brown', 2: 19, 3: 'tools', id: 5 },
  ];
  const selectedProperty = {
    id: 3,
    name: 'category',
    type: 'enumerated',
    values: ['tools', 'electronics', 'kitchenware'],
    length: 3,
  };
  const propertyValueSelect = 'Electronics';
  const output = [
    { 0: 'Headphones', 1: 'black', 2: 5, 3: 'electronics', 4: 'false', id: 0 },
    { 0: 'Cell Phone', 1: 'black', 2: 3, 3: 'electronics', 4: 'true', id: 1 },
    { 0: 'Keyboard', 1: 'grey', 2: 5, 3: 'electronics', 4: 'false', id: 2 },
  ];

  expect(handleEquals(data, selectedProperty, propertyValueSelect)).toEqual(
    output
  );
});

test('Check multiple exact products with multiple categories', () => {
  const data = [
    { 0: 'Headphones', 1: 'black', 2: 5, 3: 'electronics', 4: 'false', id: 0 },
    { 0: 'Cell Phone', 1: 'black', 2: 3, 3: 'electronics', 4: 'true', id: 1 },
    { 0: 'Keyboard', 1: 'grey', 2: 5, 3: 'electronics', 4: 'false', id: 2 },
    { 0: 'Cup', 1: 'white', 2: 3, 3: 'kitchenware', id: 3 },
    { 0: 'Key', 1: 'silver', 2: 1, 3: 'tools', id: 4 },
    { 0: 'Hammer', 1: 'brown', 2: 19, 3: 'tools', id: 5 },
  ];
  const selectedProperty = {
    id: 3,
    name: 'category',
    type: 'enumerated',
    values: ['tools', 'electronics', 'kitchenware'],
  };
  const propertyValueSelect = [
    { id: 'electronics', label: 'electronics' },
    { id: 'kitchenware', label: 'kitchenware' },
  ];
  const propertyValueInput = '';
  const output = [
    { 0: 'Headphones', 1: 'black', 2: 5, 3: 'electronics', 4: 'false', id: 0 },
    { 0: 'Cell Phone', 1: 'black', 2: 3, 3: 'electronics', 4: 'true', id: 1 },
    { 0: 'Keyboard', 1: 'grey', 2: 5, 3: 'electronics', 4: 'false', id: 2 },
    { 0: 'Cup', 1: 'white', 2: 3, 3: 'kitchenware', id: 3 },
  ];

  expect(
    handleEquals(
      data,
      selectedProperty,
      propertyValueInput,
      propertyValueSelect
    )
  ).toEqual(output);
});

test('handle valid greater than value', () => {
  const data = [
    { 0: 'Headphones', 1: 'black', 2: 5, 3: 'electronics', 4: 'false', id: 0 },
    { 0: 'Cell Phone', 1: 'black', 2: 3, 3: 'electronics', 4: 'true', id: 1 },
    { 0: 'Keyboard', 1: 'grey', 2: 5, 3: 'electronics', 4: 'false', id: 2 },
    { 0: 'Cup', 1: 'white', 2: 3, 3: 'kitchenware', id: 3 },
    { 0: 'Key', 1: 'silver', 2: 1, 3: 'tools', id: 4 },
    { 0: 'Hammer', 1: 'brown', 2: 19, 3: 'tools', id: 5 },
  ];
  const selectedProperty = {
    id: 2,
    name: 'weight (oz)',
    type: 'number',
  };
  const value = 'Is greater than';
  const propertyValueInput = 2;
  const output = [
    { 0: 'Headphones', 1: 'black', 2: 5, 3: 'electronics', 4: 'false', id: 0 },
    { 0: 'Cell Phone', 1: 'black', 2: 3, 3: 'electronics', 4: 'true', id: 1 },
    { 0: 'Keyboard', 1: 'grey', 2: 5, 3: 'electronics', 4: 'false', id: 2 },
    { 0: 'Cup', 1: 'white', 2: 3, 3: 'kitchenware', id: 3 },
    { 0: 'Hammer', 1: 'brown', 2: 19, 3: 'tools', id: 5 },
  ];

  expect(
    handleIsGreaterThanOrLessThan(
      data,
      value,
      selectedProperty,
      propertyValueInput
    )
  ).toEqual(output);
});

test('handle invalid value', () => {
  const data = [
    { 0: 'Headphones', 1: 'black', 2: 5, 3: 'electronics', 4: 'false', id: 0 },
    { 0: 'Cell Phone', 1: 'black', 2: 3, 3: 'electronics', 4: 'true', id: 1 },
    { 0: 'Keyboard', 1: 'grey', 2: 5, 3: 'electronics', 4: 'false', id: 2 },
    { 0: 'Cup', 1: 'white', 2: 3, 3: 'kitchenware', id: 3 },
    { 0: 'Key', 1: 'silver', 2: 1, 3: 'tools', id: 4 },
    { 0: 'Hammer', 1: 'brown', 2: 19, 3: 'tools', id: 5 },
  ];
  const selectedProperty = {
    id: 2,
    name: 'weight (oz)',
    type: 'number',
  };
  const value = 'Is greater than';
  const propertyValueInput = 'test';

  expect(() => {
    handleIsGreaterThanOrLessThan(
      data,
      value,
      selectedProperty,
      propertyValueInput
    );
  }).toThrow('Please input a valid number and try again');
});

test('handle valid less than value', () => {
  const data = [
    { 0: 'Headphones', 1: 'black', 2: 5, 3: 'electronics', 4: 'false', id: 0 },
    { 0: 'Cell Phone', 1: 'black', 2: 3, 3: 'electronics', 4: 'true', id: 1 },
    { 0: 'Keyboard', 1: 'grey', 2: 5, 3: 'electronics', 4: 'false', id: 2 },
    { 0: 'Cup', 1: 'white', 2: 3, 3: 'kitchenware', id: 3 },
    { 0: 'Key', 1: 'silver', 2: 1, 3: 'tools', id: 4 },
    { 0: 'Hammer', 1: 'brown', 2: 19, 3: 'tools', id: 5 },
  ];
  const selectedProperty = {
    id: 2,
    name: 'weight (oz)',
    type: 'number',
  };
  const value = 'Is less than';
  const propertyValueInput = 4;
  const output = [
    { 0: 'Cell Phone', 1: 'black', 2: 3, 3: 'electronics', 4: 'true', id: 1 },
    { 0: 'Cup', 1: 'white', 2: 3, 3: 'kitchenware', id: 3 },
    { 0: 'Key', 1: 'silver', 2: 1, 3: 'tools', id: 4 },
  ];

  expect(
    handleIsGreaterThanOrLessThan(
      data,
      value,
      selectedProperty,
      propertyValueInput
    )
  ).toEqual(output);
});

test('handle is any of with 2 categories', () => {
  const data = [
    { 0: 'Headphones', 1: 'black', 2: 5, 3: 'electronics', 4: 'false', id: 0 },
    { 0: 'Cell Phone', 1: 'black', 2: 3, 3: 'electronics', 4: 'true', id: 1 },
    { 0: 'Keyboard', 1: 'grey', 2: 5, 3: 'electronics', 4: 'false', id: 2 },
    { 0: 'Cup', 1: 'white', 2: 3, 3: 'kitchenware', id: 3 },
    { 0: 'Key', 1: 'silver', 2: 1, 3: 'tools', id: 4 },
    { 0: 'Hammer', 1: 'brown', 2: 19, 3: 'tools', id: 5 },
  ];
  const selectedProperty = {
    id: 3,
    name: 'category',
    type: 'enumerated',
    values: ['tools', 'electronics', 'kitchenware'],
  };
  const propertyValueSelect = [
    { id: 'electronics', label: 'electronics' },
    { id: 'kitchenware', label: 'kitchenware' },
  ];
  const output = [
    { 0: 'Headphones', 1: 'black', 2: 5, 3: 'electronics', 4: 'false', id: 0 },
    { 0: 'Cell Phone', 1: 'black', 2: 3, 3: 'electronics', 4: 'true', id: 1 },
    { 0: 'Keyboard', 1: 'grey', 2: 5, 3: 'electronics', 4: 'false', id: 2 },
    { 0: 'Cup', 1: 'white', 2: 3, 3: 'kitchenware', id: 3 },
  ];

  expect(handleIsAnyOf(data, propertyValueSelect, selectedProperty)).toEqual(
    output
  );
});

test('handle is any of with 3 product names', () => {
  const data = [
    { 0: 'Headphones', 1: 'black', 2: 5, 3: 'electronics', 4: 'false', id: 0 },
    { 0: 'Cell Phone', 1: 'black', 2: 3, 3: 'electronics', 4: 'true', id: 1 },
    { 0: 'Keyboard', 1: 'grey', 2: 5, 3: 'electronics', 4: 'false', id: 2 },
    { 0: 'Cup', 1: 'white', 2: 3, 3: 'kitchenware', id: 3 },
    { 0: 'Key', 1: 'silver', 2: 1, 3: 'tools', id: 4 },
    { 0: 'Hammer', 1: 'brown', 2: 19, 3: 'tools', id: 5 },
  ];
  const selectedProperty = { id: 0, name: 'Product Name', type: 'string' };

  const propertyValueSelect = [
    { id: 'Cell Phone', name: 'Cell Phone' },
    { id: 'Keyboard', name: 'Keyboard' },
    { id: 'Key', name: 'Key' },
  ];
  const output = [
    { 0: 'Cell Phone', 1: 'black', 2: 3, 3: 'electronics', 4: 'true', id: 1 },
    { 0: 'Keyboard', 1: 'grey', 2: 5, 3: 'electronics', 4: 'false', id: 2 },
    { 0: 'Key', 1: 'silver', 2: 1, 3: 'tools', id: 4 },
  ];

  expect(handleIsAnyOf(data, propertyValueSelect, selectedProperty)).toEqual(
    output
  );
});

test('handle contains partial value', () => {
  const data = [
    { 0: 'Headphones', 1: 'black', 2: 5, 3: 'electronics', 4: 'false', id: 0 },
    { 0: 'Cell Phone', 1: 'black', 2: 3, 3: 'electronics', 4: 'true', id: 1 },
    { 0: 'Keyboard', 1: 'grey', 2: 5, 3: 'electronics', 4: 'false', id: 2 },
    { 0: 'Cup', 1: 'white', 2: 3, 3: 'kitchenware', id: 3 },
    { 0: 'Key', 1: 'silver', 2: 1, 3: 'tools', id: 4 },
    { 0: 'Hammer', 1: 'brown', 2: 19, 3: 'tools', id: 5 },
  ];
  const selectedProperty = { id: 0, name: 'Product Name', type: 'string' };

  const propertyValueInput = 'head';

  const output = [
    { 0: 'Headphones', 1: 'black', 2: 5, 3: 'electronics', 4: 'false', id: 0 },
  ];

  expect(
    handleContainsValue(data, selectedProperty, propertyValueInput)
  ).toEqual(output);
});

test('handle contains exact value', () => {
  const data = [
    { 0: 'Headphones', 1: 'black', 2: 5, 3: 'electronics', 4: 'false', id: 0 },
    { 0: 'Cell Phone', 1: 'black', 2: 3, 3: 'electronics', 4: 'true', id: 1 },
    { 0: 'Keyboard', 1: 'grey', 2: 5, 3: 'electronics', 4: 'false', id: 2 },
    { 0: 'Cup', 1: 'white', 2: 3, 3: 'kitchenware', id: 3 },
    { 0: 'Key', 1: 'silver', 2: 1, 3: 'tools', id: 4 },
    { 0: 'Hammer', 1: 'brown', 2: 19, 3: 'tools', id: 5 },
  ];
  const selectedProperty = { id: 0, name: 'Product Name', type: 'string' };

  const propertyValueInput = 'Headphones';

  const output = [
    { 0: 'Headphones', 1: 'black', 2: 5, 3: 'electronics', 4: 'false', id: 0 },
  ];

  expect(
    handleContainsValue(data, selectedProperty, propertyValueInput)
  ).toEqual(output);
});

test.skip('handle contains partial value no case sensitivity', () => {
  const data = [
    { 0: 'Headphones', 1: 'black', 2: 5, 3: 'electronics', 4: 'false', id: 0 },
    { 0: 'Cell Phone', 1: 'black', 2: 3, 3: 'electronics', 4: 'true', id: 1 },
    { 0: 'Keyboard', 1: 'grey', 2: 5, 3: 'electronics', 4: 'false', id: 2 },
    { 0: 'Cup', 1: 'white', 2: 3, 3: 'kitchenware', id: 3 },
    { 0: 'Key', 1: 'silver', 2: 1, 3: 'tools', id: 4 },
    { 0: 'Hammer', 1: 'brown', 2: 19, 3: 'tools', id: 5 },
  ];
  const selectedProperty = { id: 0, name: 'Product Name', type: 'string' };

  const propertyValueInput = 'HEA';

  const output = [
    { 0: 'Headphones', 1: 'black', 2: 5, 3: 'electronics', 4: 'false', id: 0 },
  ];

  expect(
    handleContainsValue(data, selectedProperty, propertyValueInput)
  ).toEqual(output);
});

test('handle has any value with exact text input', () => {
  const data = [
    { 0: 'Headphones', 1: 'black', 2: 5, 3: 'electronics', 4: 'false', id: 0 },
    { 0: 'Cell Phone', 1: 'black', 2: 3, 3: 'electronics', 4: 'true', id: 1 },
    { 0: 'Keyboard', 1: 'grey', 2: 5, 3: 'electronics', 4: 'false', id: 2 },
    { 0: 'Cup', 1: 'white', 2: 3, 3: 'kitchenware', id: 3 },
    { 0: 'Key', 1: 'silver', 2: 1, 3: 'tools', id: 4 },
    { 0: 'Hammer', 1: 'brown', 2: 19, 3: 'tools', id: 5 },
  ];
  const selectedProperty = { id: 1, name: 'color', type: 'string' };

  const propertyValueInput = 'black';
  const propertyValueSelect = null;

  const output = [
    { 0: 'Headphones', 1: 'black', 2: 5, 3: 'electronics', 4: 'false', id: 0 },
    { 0: 'Cell Phone', 1: 'black', 2: 3, 3: 'electronics', 4: 'true', id: 1 },
  ];

  expect(
    handleHasAnyValue(
      data,
      propertyValueSelect,
      propertyValueInput,
      selectedProperty
    )
  ).toEqual(output);
});

test.skip('handle has any value with partial text input', () => {
  const data = [
    { 0: 'Headphones', 1: 'black', 2: 5, 3: 'electronics', 4: 'false', id: 0 },
    { 0: 'Cell Phone', 1: 'black', 2: 3, 3: 'electronics', 4: 'true', id: 1 },
    { 0: 'Keyboard', 1: 'grey', 2: 5, 3: 'electronics', 4: 'false', id: 2 },
    { 0: 'Cup', 1: 'white', 2: 3, 3: 'kitchenware', id: 3 },
    { 0: 'Key', 1: 'silver', 2: 1, 3: 'tools', id: 4 },
    { 0: 'Hammer', 1: 'brown', 2: 19, 3: 'tools', id: 5 },
  ];
  const selectedProperty = { id: 1, name: 'color', type: 'string' };

  const propertyValueInput = 'bl';
  const propertyValueSelect = [];

  const output = [
    { 0: 'Headphones', 1: 'black', 2: 5, 3: 'electronics', 4: 'false', id: 0 },
    { 0: 'Cell Phone', 1: 'black', 2: 3, 3: 'electronics', 4: 'true', id: 1 },
  ];

  expect(
    handleHasAnyValue(
      data,
      propertyValueSelect,
      propertyValueInput,
      selectedProperty
    )
  ).toEqual(output);
});

test('handle has any value with multiple selected options', () => {
  const data = [
    { 0: 'Headphones', 1: 'black', 2: 5, 3: 'electronics', 4: 'false', id: 0 },
    { 0: 'Cell Phone', 1: 'black', 2: 3, 3: 'electronics', 4: 'true', id: 1 },
    { 0: 'Keyboard', 1: 'grey', 2: 5, 3: 'electronics', 4: 'false', id: 2 },
    { 0: 'Cup', 1: 'white', 2: 3, 3: 'kitchenware', id: 3 },
    { 0: 'Key', 1: 'silver', 2: 1, 3: 'tools', id: 4 },
    { 0: 'Hammer', 1: 'brown', 2: 19, 3: 'tools', id: 5 },
  ];
  const selectedProperty = {
    id: 3,
    name: 'category',
    type: 'enumerated',
    values: ['tools', 'electronics', 'kitchenware'],
  };

  const propertyValueInput = '';
  const propertyValueSelect = [
    { id: 'electronics', label: 'electronics' },
    { id: 'kitchenware', label: 'kitchenware' },
  ];

  const output = [
    { 0: 'Headphones', 1: 'black', 2: 5, 3: 'electronics', 4: 'false', id: 0 },
    { 0: 'Cell Phone', 1: 'black', 2: 3, 3: 'electronics', 4: 'true', id: 1 },
    { 0: 'Keyboard', 1: 'grey', 2: 5, 3: 'electronics', 4: 'false', id: 2 },
    { 0: 'Cup', 1: 'white', 2: 3, 3: 'kitchenware', id: 3 },
  ];

  expect(
    handleHasAnyValue(
      data,
      propertyValueSelect,
      propertyValueInput,
      selectedProperty
    )
  ).toEqual(output);
});

test.skip('handle has no value with partial matching text input', () => {
  const data = [
    { 0: 'Headphones', 1: 'black', 2: 5, 3: 'electronics', 4: 'false', id: 0 },
    { 0: 'Cell Phone', 1: 'black', 2: 3, 3: 'electronics', 4: 'true', id: 1 },
    { 0: 'Keyboard', 1: 'grey', 2: 5, 3: 'electronics', 4: 'false', id: 2 },
    { 0: 'Cup', 1: 'white', 2: 3, 3: 'kitchenware', id: 3 },
    { 0: 'Key', 1: 'silver', 2: 1, 3: 'tools', id: 4 },
    { 0: 'Hammer', 1: 'brown', 2: 19, 3: 'tools', id: 5 },
  ];
  const selectedProperty = { id: 0, name: 'Product Name', type: 'string' };

  const propertyValueInput = 'key';
  const propertyValueSelect = null;

  const output = [
    { 0: 'Headphones', 1: 'black', 2: 5, 3: 'electronics', 4: 'false', id: 0 },
    { 0: 'Cell Phone', 1: 'black', 2: 3, 3: 'electronics', 4: 'true', id: 1 },
    { 0: 'Cup', 1: 'white', 2: 3, 3: 'kitchenware', id: 3 },
    { 0: 'Hammer', 1: 'brown', 2: 19, 3: 'tools', id: 4 },
  ];

  expect(
    handleHasNoValue(
      data,
      propertyValueSelect,
      propertyValueInput,
      selectedProperty
    )
  ).toEqual(output);
});
