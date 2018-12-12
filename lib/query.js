module.exports = {
  find: async function (Table, options) {

    // Set skip and limit options
    options.skip = (options.page - 1) * options.perPage;
    options.limit = options.perPage;

    // get params from the options
    var params = _.omit(options, ['page', 'perPage']);

    // get query from params
    var query = {
      criteria: _.omit(params, 'populate'),
      populate: _.get(params, 'populate', {})
    };

    // query the table
    var results = Table.find(query.criteria, query.populate);

    return results;
  },

  count: function (Table, findQuery) {
    return Table.count(findQuery);
  }
}
