'use strict';

const splitAttributesString = attrString => {
  if (!attrString) return;
  const attrs = attrString
    .split(',')
    .map(attr => {
      const attrDef = attr.split(':');
      const fieldName = String(attrDef[0]).trim();
      const fieldType = String(attrDef[1])
        .trim()
        .toUpperCase();
      return {
        fieldName,
        fieldType
      };
    })
    .filter(({
      fieldName, fieldType 
    }) => !!fieldName && !!fieldType);
  return (attrs && attrs.length) > 0 ? attrs : undefined;
};

module.exports = splitAttributesString;
