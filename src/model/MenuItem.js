export default {
    name: 'MenuItem',
    properties: {
      _id: 'objectId',
      name: 'string',
      price: 'double',
      category: 'Category?', // Reference to the parent Category
    },
    primaryKey: '_id',
};
  