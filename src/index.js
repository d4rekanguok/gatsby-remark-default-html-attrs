const { selectAll } = require('unist-util-select');

// some shorthands
const headingsToQuery = () => {
  const result = {};
  for (let i = 1; i < 7; i++) {
    result[`h${i}`] = `heading[depth=${i}]`
  };
  return result;
}

const elToQuery = {
  ...headingsToQuery(),
  'p': 'paragraph',
  'img': 'image',
  'a': 'link',
  'em': 'emphasis',
  's': 'delete',
}

module.exports = ({ markdownAST: mdast }, pluginOptions) => {
  const { plugins, ...propOfEl } = pluginOptions;

  Object.keys(propOfEl).forEach(el => {
    // apply shorthand
    const query = elToQuery[el] || el;
    const targetNodes = selectAll(query, mdast);

    targetNodes.forEach(node => {
      if (!node.data) node.data = {};

      let props = propOfEl[el];

      if (typeof props === "string" || Array.isArray(props)) {
        props = {
          className: props,
        }
      }
      // if node.data.hProperties has already set, then assign it.
      node.data.hProperties = Object.assign({}, node.data.hProperties, props)
    })
  })
}