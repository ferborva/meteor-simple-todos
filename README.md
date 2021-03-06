## Meteor - Get started TODOS Tutorial

General introduction to the Meteor Framework. Building a simple 'Todos' App to manage a list of todos, create users to manage the lists publicly or privately, understand project structure ...


#### Code Linting

Lint configuration put in place:

```
meteor npm install --save-dev babel-eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-meteor eslint-plugin-react eslint-plugin-jsx-a11y eslint-import-resolver-meteor eslint
```

Rule control added to the package.json file (to avoid uncaught errors that the tutorial is currently not up to speed with):

```
"rules": {
  "import/no-extraneous-dependencies": 0,
  "import/extensions": 0,
  "import/prefer-default-export": 1
}
```

Rule Extension configuration:

```
"extends": [
  "airbnb",
  "eslint:recommended",
  "plugin:meteor/recommended"
]
```