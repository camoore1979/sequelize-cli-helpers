'use strict';

const splitAttributesString = attrString => {
  return attrString
    .split(',')
    .map(attr => {
      const attrDef = attr.split(':');
      const fieldName = String(attrDef[0]).trim();
      const fieldType = String(attrDef[1]).trim();
      return {
        fieldName,
        fieldType
      };
    })
    .filter(({
      fieldName, fieldType 
    }) => !!fieldName && !!fieldType);
};

module.exports = splitAttributesString;
