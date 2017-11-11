import { conformsTo, isEmpty, isFunction, isObject } from 'lodash'
import invariant from 'invariant'
import warning from 'warning'

/**
 * Validate the shape of redux store
 */
function checkStore(store) {
  const shape = {
    dispatch: isFunction,
    subscribe: isFunction,
    getState: isFunction,
    replaceReducer: isFunction,
    runSaga: isFunction,
    asyncReducers: isObject,
  };
  invariant(
    conformsTo(store, shape),
    '(app/utils...) asyncInjectors: Expected a valid redux store'
  )
}

/**
 * Inject an asynchronously loaded saga
 */
function injectAsyncSagas(store, isValid) {
  return function injectSagas(name, sagas) {
    if (!isValid) checkStore(store)

    if (store.asyncSagas[name]) {
      return
    }

    invariant(
      Array.isArray(sagas),
      '(app/utils...) injectAsyncSagas: Expected `sagas` to be an array of generator functions'
    )

    warning(
      !isEmpty(sagas),
      '(app/utils...) injectAsyncSagas: Received an empty `sagas` array'
    )

    sagas.map(store.runSaga)
    store.asyncSagas[name] = sagas
  }
}

/**
 * Helper for creating injectors
 */
export default function getAsyncInjectors(store) {
  checkStore(store)

  return {
    injectSagas: injectAsyncSagas(store, true),
  }
}
