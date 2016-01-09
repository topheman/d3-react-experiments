d3-react-experiments
====================

[![Build Status](https://travis-ci.org/topheman/d3-react-experiments.svg?branch=master)](https://travis-ci.org/topheman/d3-react-experiments)

The goal of this project is to test d3 integration into react.

This is still a work in progress and I don't have any specific idea of how it will turn. This is mostly an experiment and a demonstration.

###Setup

####Install

```shell
git clone https://github.com/topheman/d3-react-experiments.git
cd d3-react-experiments
npm install
```

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

