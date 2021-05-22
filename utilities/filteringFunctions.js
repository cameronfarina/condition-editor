export function handleEquals(data, selectedProperty, productFilter) {
  const filtered = data.filter((product) => {
    if (Array.isArray(productFilter)) {
      return productFilter.some((propertyValue) => {
        return propertyValue.id === product[selectedProperty.id];
      });
    } else {
      return (
        product[selectedProperty.id].toString().toLowerCase() ===
        productFilter.toString().toLowerCase()
      );
    }
  });

  return filtered;
}

export function handleIsGreaterThanOrLessThan(
  data,
  value,
  selectedProperty,
  productFilter
) {
  if (isNaN(productFilter)) {
    return data;
  }

  const filtered = data.filter((product) => {
    if (value.includes('greater')) {
      return product[selectedProperty.id] > productFilter;
    } else {
      return product[selectedProperty.id] < productFilter;
    }
  });

  return filtered;
}

export function handleIsAnyOf(data, selectedProperty, productFilter) {
  const filtered = data.filter((product) => {
    return productFilter.some((propertyValue) => {
      return product[selectedProperty.id] === propertyValue.id;
    });
  });

  return filtered;
}

export function handleContainsValue(data, selectedProperty, productFilter) {
  const filtered = data.filter((product) => {
    return product[selectedProperty.id]
      ?.toLowerCase()
      .includes(productFilter.toLowerCase());
  });

  return filtered;
}

export function handleHasAnyValue(data, selectedProperty, productFilter) {
  const filtered = data.filter((product) => {
    if (Array.isArray(productFilter)) {
      return productFilter.some((propertyValue) => {
        return product[selectedProperty.id] === propertyValue.id;
      });
    } else {
      return product[selectedProperty.id]
        ?.toLowerCase()
        .includes(productFilter.toLowerCase());
    }
  });

  return filtered;
}

export function handleHasNoValue(data, selectedProperty, productFilter) {
  const filtered = data.filter((product) => {
    if (Array.isArray(productFilter)) {
      return productFilter.some((propertyValue) => {
        return product[selectedProperty.id] !== propertyValue.id;
      });
    } else {
      return !product[selectedProperty.id]
        ?.toLowerCase()
        .includes(productFilter.toLowerCase());
    }
  });

  return filtered;
}
