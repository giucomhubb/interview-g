/**
 * @typedef {Object} Category
 * @property {number|string} id
 * @property {string} name
 * @property {Category[]} subcategories
 */

function getCategoryPaths(root) {
  if (!root || typeof root !== "object") return [];

  const paths = [];

  function dfs(node, stack) {
    const name = String(node?.name ?? "").trim();
    const nextStack = name ? [...stack, name] : [...stack];

    const subs = Array.isArray(node?.subcategories) ? node.subcategories : [];

    if (subs.length === 0) {
      if (nextStack.length > 0) paths.push(nextStack.join("/"));
      return;
    }

    for (const child of subs) dfs(child, nextStack);
  }

  dfs(root, []);
  return paths;
}

function findCategoryById(root, targetId) {
  if (!root || typeof root !== "object") return null;

  const stack = [root];

  while (stack.length) {
    const node = stack.pop();
    if (!node || typeof node !== "object") continue;

    if (node.id === targetId) return node;

    const subs = Array.isArray(node.subcategories) ? node.subcategories : [];
    for (let i = subs.length - 1; i >= 0; i--) stack.push(subs[i]);
  }

  return null;
}

function findCategoryPathById(root, targetId) {
  let result = null;

  function dfs(node, stack) {
    if (!node || result) return;

    const nextStack = [...stack, node.name];

    if (node.id === targetId) {
      result = nextStack.join("/");
      return;
    }

    for (const child of node.subcategories || []) {
      dfs(child, nextStack);
    }
  }

  dfs(root, []);
  return result;
}


module.exports = { getCategoryPaths, findCategoryById, findCategoryPathById };