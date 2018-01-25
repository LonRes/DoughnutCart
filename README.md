# <img src="/media/doughnut.svg" width="30" /> Doughnut Cart

> Create a shopping cart for doughnuts using React, Redux, with associated unit-tests.

## Libraries

Whilst you're free to choose the libraries you need to make the app functional &ndash; please include the following libraries as they are applicable to the work we do at LonRes:

* [React](https://github.com/facebook/react)
* [Redux](https://github.com/reactjs/redux)
* [React Router](https://github.com/ReactTraining/react-router/)
* [AVA](https://github.com/avajs/ava)
* [Enzyme](https://github.com/airbnb/enzyme)
* [Webpack](https://github.com/webpack/webpack)

## Pages

The shopping cart consist of 3 pages which can be seen in [the accompanying PDF](/Pages.pdf).

* Index page is a simple enumeration of the products with name, description and image.
* Basket page is accessible via "Basket" in the top right, which lists the items added to the basket.
* An item page that has a different layout depending on whether it's in the shopping basket.

## Requirements

* Setup a simple API that enumerates [the doughnuts](/doughnuts.json) &ndash; but no other API endpoints;
* Setup the build process that minifies code **only** when `NODE_ENV=production`;
* Create the pages mentioned above using `react`, with [images for each doughnut](/media);
* Implement basic CSS/SASS/[StyledComponents](https://github.com/styled-components/styled-components);
* Basket count must be updated on-the-fly as you add, update and remove doughnuts;
* Basket **must** persist on page refresh using a FE approach &mdash; `localStorage`, `indexedDb`, etc...;
* Handle the potential failure of the AJAX request for fetching the doughnuts.
* Setup unit-tests using AVA/Enzyme with `nyc` for code-coverage;
