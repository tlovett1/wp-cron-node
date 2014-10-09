'use strict';

exports.runCron = function() {
	var wpPath;

	/**
	 * Process command arguments
	 */
	if (process.argv.length > 2) {
		// Read the first additional argument passed to the program
		wpPath = process.argv[2];

		if (wpPath !== '/' && wpPath.substr(-1) == '/') {
			wpPath = wpPath.substr(0, wpPath.length - 1);
		}
	} else {
		wpPath = '.';
	}

	var exec = require('child_process').exec;
	var fs = require('fs');
	var path = require('path');

	var dirString = path.dirname(fs.realpathSync(__filename));

	exec("wp eval 'echo current_time( 'mysql' );'", function(error, time, stderr ) {
		var currentTime = new Date(time);

		exec('wp --allow-root --path=' + wpPath + ' cron event list --fields=hook,next_run --format=json', function(error, hooks, stderr) {
			if (hooks === '') {
				console.log('Either no WP installation found or no cron hooks.');
			} else {
				var hookLoop = {
					hooks: JSON.parse(hooks),
					index: 0,
					executed: 0,
					done: function() {
						console.log('Cron execution completed. ' + this.executed + ' hooks executed.');
					},
					processNextHook: function() {
						var SELF = this;

						if ( this.index >= this.hooks.length ) {
							this.done();
							return;
						}

						var hook = this.hooks[this.index];
						this.index++;

						if (currentTime >= hook['next_run']) {
							console.log( 'Executing ' + hook.hook);
							exec('wp --allow-root --path=' + wpPath + ' cron run ' + hook.hook, function() {
								console.log('Executed ' + hook.hook);
								SELF.executed++;
								SELF.processNextHook();
							});
						} else {
							SELF.processNextHook();
						}
					}
				};

				hookLoop.processNextHook();
			}
		});
	});
};