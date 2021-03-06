module.exports = {
  find: async function (Table, options) {

    // Set skip and limit options
    options.skip = (options.page - 1) * options.perPage;

    if(options.perPage > 0) {
      options.limit = options.perPage;
    } else {
      options.limit = 10;
    }

    // get params from the options
    var params = _.omit(options, ['page', 'perPage']);

    // get query from params
    var query = {
      criteria: _.omit(params, 'populate'),
      populate: _.get(params, 'populate', {})
    };

    // query the table
    var results = Table.find(query.criteria, query.populate).meta({makeLikeModifierCaseInsensitiveInMongo: true});

    return results;
  },

  count: function (Table, findQuery) {
    return Table.count(findQuery);
  }
}
