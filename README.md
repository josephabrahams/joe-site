# josephabrahams.com

## Installation

    $ git clone git@github.com:josephabrahams/josephabrahams.com.git

    $ git remote add upstream git@github.com:josephabrahams/gh-pages.git

    $ cd josephabrahams.com

    $ bundle install

    $ npm install

## Local Development

Build Jekyll into `_site`:

    $ grunt build

Build Jekyll and run [htmlproofer](https://github.com/gjtorikian/html-proofer) on `_site`:

    $ grunt test

Serve `_site` at <http://localhost:8000>, livereload expanded sass changes, rebuild Jekyll as needed:

    $ grunt serve

Parse `_sass`, `css`, and `js` for [Modernizr](http://modernizr.com/) references and build to `js/lib/modernizr.min.js`.

    $ grunt modernizr

