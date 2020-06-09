import { PROFANITY_WORDS } from 'constants/index';

export default {
	_badWords: PROFANITY_WORDS,

	/**
	 *
	 * @param {String} text
	 * @param {Function} callback
	 */
	scan: function (text, callback) {
		let word, key, match;
		let regex = /\w+/g;

		while ((match = regex.exec(text))) {
			word = match[0];
			key = word.toLowerCase();

			if (key in this._badWords && Array.isArray(this._badWords[key])) {
				if (callback(word, match.index, this._badWords[key]) === false) {
					break;
				}
			}
		}
	},
	/**
	 *
	 * @param {String} text
	 */
	profane: function (text) {
		let profane = false;

		this.scan(text, function (word, index, categories) {
			profane = true;
			return false; // Stop on first match
		});

		return profane;
	},

	/**
	 *
	 * @param {String} text
	 */
	scorecard: function (text) {
		let scorecard = {};

		this.scan(text, function (word, index, categories) {
			for (let i = 0; i < categories.length; i += 1) {
				const cat = categories[i];

				if (cat in scorecard) {
					scorecard[cat] += 1;
				} else {
					scorecard[cat] = 1;
				}
			}
		});

		return scorecard;
	},
};
