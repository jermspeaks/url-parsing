var expect = require('expect');
var urlParser = require('../src/index');

describe('urlParser', () => {
	describe('parseUrlGroups', () => {
		const urlScenarios = [{
			testName: 'Full url',
			testUrl: 'http://denverpost.com/2016/07/27/donald-trump-colorado-springs-denver-tickets/',
			expectedGroups: {
				$D: 'denverpost.com',
				$P1: '2016',
				$P2: '07',
				$P3: '27',
				$P4: 'donald-trump-colorado-springs-denver-tickets'
			}
		}, {
			testName: 'Full url with hash',
			testUrl: 'http://www.forbes.com/sites/kathleenchaykowski/2016/07/27/facebook-shares-soar-on-sales-earnings-that-blow-away-estimates/#33da250329ae',
			expectedGroups: {
				$D: 'forbes.com',
				$P1: 'sites',
				$P2: 'kathleenchaykowski',
				$P3: '2016',
				$P4: '07',
				$P5: '27',
				$P6: 'facebook-shares-soar-on-sales-earnings-that-blow-away-estimates',
				$H1: '#33da250329ae',
			}
		}];

		urlScenarios.forEach(scenario => {
			it(`takes a url and parses out the url into different groups -- ${scenario.testName}`, () => {
				expect(urlParser.parseUrlGroups(scenario.testUrl)).toEqual(scenario.expectedGroups);
			});
		});
	});
});
