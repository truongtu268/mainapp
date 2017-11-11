const selectLocationState = () => {
  let prevRoutingState
  let prevRoutingStateJS

  return (state) => {
    const routingState = state.route

    if (routingState !== prevRoutingState) {
      prevRoutingState = routingState
      prevRoutingStateJS = routingState
    }

    return prevRoutingStateJS
  }
}

export { selectLocationState }
