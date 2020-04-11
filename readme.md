# gatsby-remark-default-html-attrs

Add attributes to html transformed by [gatsby-transform-remark](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-remark), with the help of [unist-util-select](https://github.com/syntax-tree/unist-util-select).

## Install

```bash
npm install gatsby-remark-default-html-attrs
yarn add gatsby-remark-default-html-attrs
```

## Usage

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve:`gatsby-remark-default-html-attrs`,
            options: {
              "h1": "h1",
              "h2": ["h2", "bold"],
              "heading[depth=3]": {
                className: "h3",
                style: "color: red;",
              },
              "p": {
                className: "paragraph",
              }
            }
          }
        ],
      },
    },
  ]
}
```

### `options`

Accepts any valid `unist-util-select`'s `selectAll` query ([see list here](https://github.com/syntax-tree/unist-util-select#selectselectallselector-tree))

### markdown tokens

Please note that the plugin matches against **markdown tokens** (`paragraph`, `list`, `code`) and *not* html tags (`p`, `ul`, `pre`).
Here's a list of common markdown tokens & how it'll be translated to html tags:

| Token | Equivalent HTML Tag |
| --- | --- |
| blockquote | blockquote
| break | br |
|	code | pre |
| inlineCode | code |
|	delete | s
| emphasis | em |
|	heading | h1...h6
|	image | img |
|	link | a |
|	list | ul |
| list[ordered] | ol |
|	paragraph | p |
|	strong | strong |
|	table | table |
|	thematic-break | hr |

This plugin also provides a few shorthands:

| Value | Equivalent |
| --- | --- |
| h1 | heading[depth=1] |
| h2 | heading[depth=2] |
| h3 | heading[depth=3] |
| h4 | heading[depth=4] |
| h5 | heading[depth=5] |
| h6 | heading[depth=6] |
| img | image |
| a | link |
| em | emphasis |
| s | delete |

### value

If value is a string or an array, it'll be used as class name.

```js
  {
    'h1': 'hi',
    'h2': ['hi', 'hello'] 
  }
  // <h1 class="hi">...</h1>
  // <h2 class="hi hello">...</h2>
```

If value is an object, it should contains html attributes.

```js
  {
    'p': {
      className: 'paragraph',
      style: 'color: red;',
    }
  }
  // <p class="paragraph" style="color:red;">...</p>
```
