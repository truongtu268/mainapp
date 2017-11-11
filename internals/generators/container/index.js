/**
 * Container Generator
 */

const { containerExists } = require('../utils/componentExists');

module.exports = {
  description: 'Add a container component',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'GoodName',
    validate: value => {
      if ((/.+/).test(value)) {
        return containerExists(value) ? 'A container with this name already exists' : true;
      }

      return 'The name is required';
    },
  }, {
    type: 'confirm',
    name: 'wantActionsAndReducer',
    default: true,
    message: 'Do you want an actions/constants/selectors tupel for this container?',
  }, {
    type: 'confirm',
    name: 'wantSagas',
    default: true,
    message: 'Do you want sagas for asynchronous flows? (e.g. fetching data)',
  }],
  actions: data => {
    const actions = [{
      type: 'add',
      path: '../../app/containers/{{properCase name}}/{{properCase name}}Container.js',
      templateFile: './container/index.js.hbs',
      abortOnFail: true,
    }];

    // If they want actions and a reducer, generate actions.js, constants.js
    // and the corresponding tests for actions and the reducer
    if (data.wantActionsAndReducer) {
      // Actions
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/actions.js',
        templateFile: './container/actions.js.hbs',
        abortOnFail: true,
      });

      // Constants
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/constants.js',
        templateFile: './container/constants.js.hbs',
        abortOnFail: true,
      });

      // Selectors
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/selectors.js',
        templateFile: './container/selectors.js.hbs',
        abortOnFail: true,
      });
    }

    // Sagas
    if (data.wantSagas) {
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/sagas.js',
        templateFile: './container/sagas.js.hbs',
        abortOnFail: true,
      });
    }

    return actions;
  },
};
