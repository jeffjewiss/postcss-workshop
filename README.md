Postcss Workshop
================

A guided workshop on writing plugins for Postcss. The goal will be to take a couple of “atRules”, which will get converted into randomized CSS properties by the plugin created in the workshop.

The CSS syntax we will be working with is:

```CSS
  @randomize example 1-5
  @rand-props color blue,white,red
```

Setup Instructions
------------------

* clone this repo and run `npm install`
* running `npm start` will begin running “devtool” and “gulp”
* start creating the plugin in `index.js`

You can debug the plugin using the chrome devtools started by “devtool”, and see the progress of CSS changes on the testing page at the URL provided in the console by browser-sync.
