# <img src="/doughnut.svg" width="30" /> Doughnut Cart

> Create a shopping cart for doughnuts using React, Redux, with associated unit-tests in AVA/Enzyme.

## Notes by Ashton

* [`render-prop`](https://ashtonsix.com/render-prop) connects Redux & React (created this weekend by myself)
* Would've been nice if create-react-app was an option to save time setting up
* First time using a code coverage tool

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

* Setup a simple API that enumerates [the doughnuts](/server/doughnuts.json) &ndash; but no other API endpoints;
* Use React Router's [BrowserRouter](https://reacttraining.com/react-router/web/api/BrowserRouter) to setup the routes for the 3 pages;
* Setup the build process with [watch](https://webpack.js.org/configuration/watch/) that minifies code **only** when `NODE_ENV=production`;
* Create the pages mentioned above using `react`, with [images for each doughnut](/media);
* Implement basic CSS/SASS/[StyledComponents](https://github.com/styled-components/styled-components);
* Basket count must be updated on-the-fly as you add, update and remove doughnuts;
* Basket **must** persist on page refresh using a FE approach &mdash; `localStorage`, `indexedDb`, etc...;
* Handle the potential failure of the AJAX request for fetching the doughnuts.
* Setup unit-tests using AVA/Enzyme with `nyc` for code-coverage;
