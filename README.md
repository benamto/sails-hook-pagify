# @benamto/sails-hook-pagify
A fork of sails-hook-pagify with ongoing maintenance, I have changed a little bit to make it suitable for sails 1.0+. There is no dataKey anymore, it will return results as dataKey. also, I have added select and omit for pagify options

## DEPENDENCY

- Sails 1.0+

## Installation

```javascript
npm install -S @benamto/sails-hook-pagify
```

## Configuration (Project-wide)

Create `pagify.js` in the `config` folder. Set `perPage` for the number of records fetched per page. The default is `10`.

```javascript
module.exports.pagify = {
    perPage: 10
}
```
## Method

### pagify(options)

**Parameters**

- [**STRING**] `select` - Waterline select. Default is ''
- [**OBJECT**] `where` - Waterline query object. Default is {}.
- [**ARRAY**] `sort` - Default is [].
- [**ARRAY**] `populate`- Default is [].
- [**ARRAY**] `omit` - Default is [].
- [**INTEGER**] `page` - Current page number. Default is 1.
- [**INTEGER**] `perPage` - Number of records per page. Default is 10.

**Usage**

Use it as a Model class method:

```javascript
// Get Page 2 from the User Model where
// user.name is like 'colin', sort by `createdAt DESC`
// with pet field populated. 40 results per page.
// Results will be wrapped in `users` key.
User.pagify({
    where: {'name': {'like': '%colin%'}},
    sort: ['createdAt DESC'],
    populate: ['pet'],
    page: 2,
    perPage: 40 // Overwrite the project-wide settings
}).then(function(data){
    // See Response Object Below
}).catch(function(err){
    // err.Errors contains the error messages
});
```

As you can see, `pagify` is a promise-returning method.

**Response Object**
```json
{
    "results": [{
        /* 40 or less results here */
    }],
    "meta": {
        "currentPage": 2,
        "nextPage": null,
        "prevPage": 1,
        "totalPages": 2,
        "totalCount": 80,
        "perPage": 40
    }
}
```

## License

#### Sails hook pagify license

[Sails hook pagify](https://github.com/colintoh/sails-hook-pagify) is free and open source under the [MIT License](https://github.com/colintoh/sails-hook-pagify).
