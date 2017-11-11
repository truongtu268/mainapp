import 'babel-polyfill'
import 'sails.io.js'

// Load the manifest.json file and the .htaccess file
import '!file-loader?name=[name].[ext]!./manifest.json'
import 'file-loader?name=[name].[ext]!./.htaccess'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

// import useScroll from 'react-router-scroll'
import LanguageProvider from 'containers/LanguageProvider'
import configureStore from './store'
import { LocaleProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'

// Import i18n messages
import { translationMessages } from './i18n'

import 'sanitize.css/sanitize.css'
import 'antd/dist/antd.css'

const history = createHistory()

const initialState = {}
const store = configureStore(initialState, history)

import App from 'containers/App/AppContainer'
import loadableWithStore from 'hoc/Loadable'

const loadComponent = loadableWithStore(store)

// Setup Google Analytics
import ReactGA from 'react-ga'
ReactGA.initialize('UA-72571527-2')
const logPageView = () => {
  ReactGA.set({ page: window.location.pathname + window.location.search })
  ReactGA.pageview(window.location.pathname + window.location.search)
}

const render = (translatedMessages) => {
  ReactDOM.render(
    <Provider store={store}>
      <LocaleProvider locale={enUS}>
        <LanguageProvider messages={translatedMessages}>
          <ConnectedRouter history={history}>
          <Route path="/" component={loadComponent({
              sagaNames: ['App'],
              sagaLoader: () => [import('containers/App/sagas.js')],
              component: () => import('containers/App/AppContainer'),
            })} />
          </ConnectedRouter>
        </LanguageProvider>
      </LocaleProvider>
    </Provider>,
    document.getElementById('app')
  )
}


// Hot reloadable translation json files
if (module.hot) {
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept('./i18n', () => {
    render(translationMessages)
  })
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  Promise.all([
    System.import('intl'),
    System.import('intl/locale-data/jsonp/en.js'),
  ]).then(() => render(translationMessages))
} else {
  render(translationMessages)
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
// import { install } from 'offline-plugin/runtime'
// install()
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install() // eslint-disable-line global-require
}
