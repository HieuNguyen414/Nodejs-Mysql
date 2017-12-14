# HoaLu RestAPI multiple modules

### Installation
Clone framework
```
git clone git@bitbucket.org:hoalu/devapi.git
cd devapi
npm install --production
```
Manipulation your file then Run development server
```
nodemon server.js
```
Or _node server.js_

Run production server
```
export NODE_ENV=production && pm2 start server.js
```
follow status by
```
pm2 list
then
pm2 show {id}
```

### Folder structure for multiple modules
```
 - modules
   | - module_name
   |   |   | - controllers
   |   |   | - controller_1.js
   |   |   | - controller_2.js
   |   |   - route.js
 - server.js
 - package.json
 - README.md
 - .env
 - .gitignore
```

### project api version sample
Example for module user_sample, controller get user list (list_user_v1.js)
```
module.exports = {
    get_users: function (req, res, next) {
        // content
    },
    get_active_users: function (req, res, next) {
        // content
    }
}
```

Example for module user_sample, controller get user list (list_user_v1.js)
```
// ApiDoc block
var list_user_v1 = require('./controllers/list_user_v1');
var list_user_v2 = require('./controllers/list_user_v2');

// Route user_example module
exports = module.exports = function(server){
    server.get('/user_example/users', list_user_v1.get_users);
    server.get('/user_example/v2/users', list_user_v2.get_users);
};
```


### Naming convension
| Object     | Rule        |
| ------------- |-------------|
|file_name   |lowercase, separate word by underscore |
|function_name    |lowercase, separate word by underscore |
|configItem    |camelCase |

### Configuration
Create .env file, contained environtment name to config which configuration is loaded.
If config item is missed. Server will load that config item from default.json
Example:
```
development
```


### APIDOC: Comment document for generate doc
#### 1. intall apidoc
```
npm install apidoc -g
```

#### 2. generate apidoc
```
apidoc -i modules/ -o apidoc/
```

#### 3. serve apidoc
Run server to serve static doc files
Run below command then follow link from console to view doc. Use nodemon to monitor changing automatically
```
nodemon .\server_doc.js
```

Using apidoc/apidoc to generate doc.
Please carefully read futher information [here](http://apidocjs.com/)

## Built With
* [apidoc](https://github.com/apidoc/apidoc/) - Document generation from comment
* restify
* restify validation
* config