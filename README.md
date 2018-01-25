# Doughnut Cart

![Doughnut](/media/doughnut.svg)

> Create a shopping cart for doughnuts using React, Redux, with associated unit-tests.

## Libraries

Whilst you're free to choose the libraries you need to make the app functional &ndash; please include the following tasks as they are applicable to the work we do at LonRes:

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

* Create the pages mentioned above using `react`, with images for each doughnut;
* Basket count must be updated on-the-fly as you add, update and remove doughnuts;
* Basket **must** persist on page refresh using a FE approach &mdash; `localStorage`, `indexedDb`, etc...;
* Setup a simple API that enumerates [the doughnuts](/doughnuts.json);
* Setup unit-tests using AVA/Enzyme with `nyc` for code-coverage;
