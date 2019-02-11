module.exports = function (options) {
  var errors = [];

  if (!options) return ['options parameter is undefined'];

  if (!_.isUndefined(options.select) && !(options.select instanceof Array)) {
    errors.push('"select" should be an array');
  }

  if (!_.isUndefined(options.omit) && !(options.omit instanceof Array)) {
    errors.push('"omit" should be an array');
  }

  if (!_.isUndefined(options.where) && typeof options.where !== 'object') {
    errors.push('"where" should be an object');
  }

  if (!_.isUndefined(options.sort) && typeof options.sort !== 'string') {
    errors.push('"sort" should be an string');
  }

  if (!_.isUndefined(options.populate) && typeof options.populate !== 'object') {
    errors.push('"populate" should be an object');
  }

  if (!_.isUndefined(options.page) && typeof options.page !== 'number') {
    errors.push('"page" should be a number');
  }

  if (!_.isUndefined(options.perPage) && typeof options.perPage !== 'number') {
    if(options.perPage < 0) {
      errors.push('"perPage" should be positive');
    } else {
      errors.push('"perPage" should be a number');
    }
  }

  return errors;
}
