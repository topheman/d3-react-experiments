d3-react-experiments
====================

[![Build Status](https://travis-ci.org/topheman/d3-react-experiments.svg?branch=master)](https://travis-ci.org/topheman/d3-react-experiments)

[D3 (data driven documents)](http://d3js.org/) is a JavaScript library that helps you build visualisations. It is very powerfull (most of the JavaScript datavisualization libraries are based on it). It handles the data you pass it and mutates the DOM.

With [React](https://facebook.github.io/react/index.html), on the other hand, you never access directly the DOM and let it manage the changes as well as the events.

So, by default, the two of them don't really get along ... d3 messes up with [React's reconciliation](https://facebook.github.io/react/docs/reconciliation.html) and React removes what d3 is appending to the DOM ...

In the last year a lot of projects have risen with the goal to make those two work gently together, but there isn't a clear winner yet.

There are two main approaches, both of them using d3 for the processing:

* blackbox d3 and let it do the render without messing up with React livecyle
* reimplement the job done by d3 on the DOM by letting React do the render (wrapping svg inside jsx)

Both approaches have their pros and cons (I won't talk about that here - people with more experience in that field than me have written posts on that).

The goal of this project is to try those techniques and some libraries.

[This is a work in progress ...](https://topheman.github.io/d3-react-experiments/#/)

So far, I tried the following libraries:

* [d3act](https://github.com/AnSavvides/d3act)
* [victory](https://github.com/FormidableLabs/victory)

###Setup

####Install

```shell
git clone https://github.com/topheman/d3-react-experiments.git
cd d3-react-experiments
npm install
```

*Note:* **npm3 users**, there is a bug in the v3 of npm, it misses a package ([see here](https://travis-ci.org/topheman/d3-react-experiments/jobs/102454386#L1186)), you'll have to install it manually. Just run: `npm install invariant`

####Run

#####From localhost

`npm start`

#####From your network ip

Useful to access the website via wifi from other devices such as smartphones.

`NO_LOCALHOST=true npm start`

####Build

At the root of the project :

* `npm run build`: for debug (like in dev - with sourceMaps and all)
* `npm run build-prod`: for production (minified/optimized ...)
* `npm run build-prod-all`: both at once in the same build (with sourcemaps on dev version)

A `/build` folder will be created with your project built in it.

You can run it with `npm run serve-build`

####Linter

I'm using eslint, based on [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb), a preset for `.eslintrc` configuration. For more infos, checkout the release it was implemented: [v2.5.0](https://github.com/topheman/react-es6-redux/releases/tag/v2.5.0).

* `npm run lint`: single run linting of `/src` & `/test` folders
* `npm run lint-watch`: same in watch mode

You can disable the linter by `DISABLE_LINTER=true npm start` (though it will still be run a pre-commit hook)

##Resources

* [http://stackoverflow.com/research/developer-survey-2015](http://stackoverflow.com/research/developer-survey-2015)
* [http://www.census.gov/](http://www.census.gov/population/international/data/idb/informationGateway.php): I wrote a little routine to process the csv

