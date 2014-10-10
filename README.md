WP Cron Node
============

A simple Node command to run WordPress cron via PHP CLI. Running this command will execute WordPress cron events that are *due for execution*. If you want to execute cron events regardless of schedule, use [WP-CLI cron event run](http://wp-cli.org/commands/cron/event/run/).

## Installation
1. Make sure you have [Node.js](http://nodejs.org/) and [npm](https://www.npmjs.org/) installed.
1. Install [WP-CLI](http://wp-cli.org/).
1. Install the wp-cron-node npm package with the following shell command:

    ```
    npm install -g wp-cron-node
    ```
1. Disable WordPress cron. By adding the following to your ```wp-config.php``` file:
    
    ```php
    define( 'DISABLE_WP_CRON', true );
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