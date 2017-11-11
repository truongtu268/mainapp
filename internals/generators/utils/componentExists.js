/**
 * componentExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

const fs = require('fs');
const pageComponents = fs.readdirSync('app/components');
const pageContainers = fs.readdirSync('app/containers');
// const components = pageComponents.concat(pageContainers);

function componentExists(comp) {
  return pageComponents.indexOf(comp) >= 0;
}

function containerExists(comp) {
  return pageContainers.indexOf(comp) >= 0;
}

module.exports = { componentExists, containerExists };
