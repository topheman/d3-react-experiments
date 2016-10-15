d3-react-experiments
====================

[![Build Status](https://travis-ci.org/topheman/d3-react-experiments.svg?branch=master)](https://travis-ci.org/topheman/d3-react-experiments)

<img src="https://cdn.rawgit.com/topheman/d3-react-experiments/master/src/assets/images/react-logo.svg" width="200"><img src="https://cdn.rawgit.com/topheman/d3-react-experiments/master/src/assets/images/d3-logo.png" width="200">

###Introduction

As I explain bellow, there are multiple approaches to handle d3 with React. The goal of this repo is to explore them and provide examples:

* to test those different approaches
* to help others choose the one that fit their needs

What will you find in that project ?

* Some [basic](https://topheman.github.io/d3-react-experiments/#/victory/world-population-by-age-range) and [advanced](https://topheman.github.io/d3-react-experiments/#/victory/count-npm-downloads) Victory based charts
* Some [vanilla d3](https://topheman.github.io/d3-react-experiments/#/d3) components based charts
* Some [react-faux-dom based](https://topheman.github.io/d3-react-experiments/#/d3/react-faux-dom) component charts
* Some [d3act](https://topheman.github.io/d3-react-experiments/#/d3act) based charts

Some blog posts I wrote about this project:

* [D3 React Components with Victory – Reusability / Composability](http://dev.topheman.com/d3-react-components-with-victory-reusability-composability)
* [Plain d3 code and React working together](http://dev.topheman.com/d3-react-chart-components/)

[This is still a work in progress](https://topheman.github.io/d3-react-experiments/#/), more examples / blog posts will come ...

###React & D3

[D3 (data driven documents)](http://d3js.org/) is a JavaScript library that helps you build visualisations. It is very powerfull (most of the JavaScript datavisualization libraries are based on it). It handles the data you pass it and mutates the DOM.

With [React](https://facebook.github.io/react/index.html), on the other hand, you never access directly the DOM and let it manage the changes as well as the events.

So, by default, the two of them don't really get along ... d3 messes up with [React's reconciliation](https://facebook.github.io/react/docs/reconciliation.html) and React removes what d3 is appending to the DOM ...

In the last year a lot of projects have risen with the goal to make those two work gently together, but there isn't a clear winner yet.

There are two main approaches, both of them using d3 for the processing:

* blackbox d3 and let it do the render without messing up with React lifecyle
* reimplement the job done by d3 on the DOM by letting React do the render (wrapping svg inside jsx)

Both approaches have their pros and cons (I won't talk about that here - people with more experience in that field than me have written posts on that).

###Prerequisite

You must have npm3 (enforced by Victory). You may have some peerDependency errors at `npm install` that won't affect the project, the problem is tracked on [this issue](https://github.com/FormidableLabs/victory/issues/275).

###Setup

This project now follows the same development workflow as the one explained in [topheman/webpack-babel-starter](https://github.com/topheman/webpack-babel-starter) (with some additions, specific to the project), and it runs with **Babel v6**.

####Install

```shell
git clone https://github.com/topheman/d3-react-experiments.git
cd d3-react-experiments
npm install
```

You will notice this project is shipped with a `yarn.lock` file, so instead of `npm install`, you can simply run `yarn` (this will ensure everybody has the exact same dependencies - [see more here](https://code.facebook.com/posts/1840075619545360)).

####Run

#####From localhost

`npm start`

#####From your network ip

Useful to access the website via wifi from other devices such as smartphones.

`LOCALHOST=false npm start`

####Build

At the root of the project :

* `npm run build`: for debug (like in dev - with sourceMaps and all)
* `npm run build-prod`: for production (minified/optimized ...)
* `npm run build-prod-all`: both at once in the same build (with sourcemaps on dev version)

A `/build/dist` folder will be created with your project built in it.

You can run it with `npm run serve-build`

####Linter

I'm using eslint, based on [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb), a preset for `.eslintrc` configuration. For more infos, checkout the release it was implemented: [react-es6-redux@2.5.0](https://github.com/topheman/react-es6-redux/releases/tag/v2.5.0).

* `npm run lint`: single run linting of `/src` & `/test` folders
* `npm run lint-watch`: same in watch mode

You can disable the linter by `LINTER=false npm start` (though it will still be run a pre-commit hook)

##Resources

* [http://stackoverflow.com/research/developer-survey-2015](http://stackoverflow.com/research/developer-survey-2015)
* [http://www.census.gov/](http://www.census.gov/population/international/data/idb/informationGateway.php): I wrote a little routine to process the csv
* [ourworldindata.org](https://ourworldindata.org)
* [npm registry](https://docs.npmjs.com/misc/registry)
* [topheman/webpack-babel-starter](https://github.com/topheman/webpack-babel-starter)

