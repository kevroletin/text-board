'use strict';

define(['underscore'], function(_) {
	function safe(obj) {
		var storage = obj;
		var history = ''; /* history is for debug */
		function safeWrapper(field) {
			if ( !_.isEmpty(storage) ) {
				storage = storage[field];
				if ( _.isUndefined(storage) ) {
					storage = null;
				}
				history = history + '.' + field;
			}
			return safeWrapper;
		}
		safeWrapper.get = function() {
			/* LOG( history ); */
			return storage;
		};
		safeWrapper.getArray = function() {
			/* LOG( history ); */
			if ( _(storage).isEmpty() ) {
				return null;
			} else if ( _(storage).isArray() ) {
				return storage;
			} else {
				return [storage];
			}
		};
		safeWrapper.callMe = function() {
			if ( _(storage).isFunction() ) {
				return storage.apply(storage, arguments);
			} else {
				return null;
			}
		};
		safeWrapper.call = function(method) {
			if ( !_(storage).isEmpty() ) {
				var f = storage[method];
				if (_(f).isFunction()) {
					return f.apply(storage, arguments);
				}
			}
			return null;
		};
		return safeWrapper;
	}

	/* TODO: Do we want this method globally ?
	_.mixin({
		safe: safe
	}); */

	return safe;
});
