# joe-site

## Installation

    $ git clone git@github.com:josephabrahams/joe-site.git

    $ git remote add upstream git@github.com:josephabrahams/gh-pages.git

    $ cd joe-site

    $ bundle install

## Local Development

Build Jekyll into `_site`:

    $ bundle exec jekyll build

Serve `_site` at <http://localhost:4000>, livereload changes as needed:

    $ bundle exec jekyll serve --livereload
