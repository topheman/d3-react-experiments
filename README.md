##d3-react-experiments - distribution version (gh-pages branch)

This is the distribution version of [topheman/d3-react-experiments](https://github.com/topheman/d3-react-experiments) - v2.1.1 - [#9c5db2f](https://github.com/topheman/d3-react-experiments/tree/9c5db2fb095da5fe93054377ec274e53c1872e20).

**Warning**: This is the **generated** code, versionned on the `gh-pages` branch, testable online [here](https://topheman.github.io/d3-react-experiments/). If you wish to see the original source code, switch to the [master branch](https://github.com/topheman/d3-react-experiments).

###Infos:

Those informations are available on the [topheman/webpack-babel-starter](https://github.com/topheman/webpack-babel-starter) project:

* [How those files where generated (Readme - build section)](https://github.com/topheman/webpack-babel-starter#build)
* [How to deploy your generated version (Wiki - deploy section)](https://github.com/topheman/webpack-babel-starter/wiki#deploy)

As explained in the [README](https://github.com/topheman/webpack-babel-starter#build), when you `npm run build-prod-all`, two versions will be generated:

* One at the root (the production version)
* One in the [devtools folder](https://github.com/topheman/d3-react-experiments/tree/gh-pages/devtools), which contains as you'll see sourcemaps and are not minified.

Test the demo [here](https://topheman.github.io/d3-react-experiments/).

------

You can disable the generation of this file by removing the following line in the `package.json`:

```js
"postbuild-prod-all": "npm run generate-dist-readme"
```

You can customize the output of this file, the template is located at `bin/README.dist.template.md`.
