export default {
  name: 'Category',
  properties: {
    _id: 'objectId',
    name: 'string',
    menuItems: { type: 'list', objectType: 'MenuItem' }, // Relationship to MenuItem
  },
  primaryKey: '_id',
};
