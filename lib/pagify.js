// DEPENDENCIES
var Q = require('q');
var path = require('path');
var libPath = path.join(__dirname);

var query = require(path.join(libPath, 'query'));
var validateOptions = require(path.join(libPath, 'validateOptions'));

/**
 * Get page
 * @param  {object} model   Model object
 * @param  {object} opts    {'findQuery', 'sort', 'populate', 'page', 'objsPerPage'}
 * @param  {object} context
 * @return {Promise}        Resolve to response body with page and meta-data {'dataKey':..., 'meta':...}
 */
var _getPage = function _getPage(model, opts, context) {

  opts = opts || {};

  var defaults = sails.config[context.configKey];
  var options = _.defaults(opts, defaults);


  // query for data and total row count
  return Q.Promise(function (resolve, reject) {

    // Validate parameters
    var errors = validateOptions(options);

    // If errors, reject errors
    if (errors.length) {
      var error = new Error('Invalid parameter(s)');
      error.Errors = errors;
      return reject(error);
    }

    return Q.all([
      query.find(model, options),
      query.count(model, options.where)
    ])
      .spread(function (data, count) {
        var json = {};

        // compute pagination meta
        var totalPages = Math.ceil(count / options.perPage) || 1; // min pages is 1, even with 0 rows

        // build the JSON
        json.results = data;
        json.meta = {
          currentPage: options.page,
          nextPage: (options.page < totalPages) ? options.page + 1 : null,
          prevPage: (options.page > 1) ? options.page - 1 : null,
          totalPages: opts.perPage < 0 ? 1 : totalPages,
          totalCount: count,
          perPage: opts.perPage,
        }

        resolve(json);
      }).catch(reject);
  });
}

module.exports = function (model, context) {
  model.pagify = function (opts) {
    return _getPage(model, opts, context);
  }
}
