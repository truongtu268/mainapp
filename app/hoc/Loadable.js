import React from 'react'
import Loadable from 'react-loadable'
import getAsyncInjectors from '../utils/asyncInjectors'

export default function loadableWithStore(store) {
  const { injectSagas } = getAsyncInjectors(store)
  return function L(opts) {
    const { sagaNames, sagaLoader, component, ...rest } = opts
    return Loadable({
      loader: () => {
        return Promise.all([
          Promise.all(sagaLoader()),
          component(),
        ])
        .then(([sagas, comp]) => {
          sagaNames.map((n, i) => injectSagas(n, sagas[i].default))
          return comp.default
        })
      },
      delay: 300,
      loading: () => <div></div>,
      ...rest,
    })
  }
}
