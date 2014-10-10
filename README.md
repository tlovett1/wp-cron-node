WP Cron Node
============

A simple Node command to run WordPress cron. Requires WP-CLI.

## Install via npm
1. Make sure you have [Node.js](http://nodejs.org/) and [npm](https://www.npmjs.org/) installed.
1. Install [WP-CLI](http://wp-cli.org/)
1. Install the wp-cron-node npm package with the following shell command:

```
npm install -g wp-cron-node
```

## Usage

You can run the command without any arguments from within the root of a WordPress installation with the following shell
command:

```
wp-cron-node
```

You can also specify a relative or absolute path to a WordPress installation:

```
wp-cron-node ../wordpress
```

If you are running WordPress multi-site, you might want to change the site context by passing in a url:

```
wp-cron-node . http://example.com/site2
```

## License

This project is licensed under the [MIT](http://opensource.org/licenses/MIT) license.