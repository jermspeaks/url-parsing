const url = require('url');

/**
 * Parses url to output array
 * @param		{String}	UrlString		URL string of article
 * @return	{Array}								URL broken down by hostname and paths
 */
const parseUrlGroups = urlString => {
	const parseHostname = hostname => hostname.match(/^(?:w{3}\.)?(.+)$/)[1];
	const parsePaths = pathname => pathname.match(/[^\/]+/g);
	var groups = {};

	// Parse Url using Url library
	var parsedUrl = url.parse(urlString);

	// Get matches from URL
	var hostMatch = parseHostname(parsedUrl.hostname);
	var pathMatches = parsePaths(parsedUrl.pathname);
	var hashMatch = parsedUrl.hash;
	var queryMatches = parsedUrl.query;

	// if hostname found, pass in hostname
	if (!hostMatch) throw new Error('Hostname could not be found');
	groups.$D = hostMatch;

	// if pathnames found, add each of them incrementing the key by 1 starting at 1
	if (pathMatches) {
		pathMatches.forEach((path, pathIndex) => {
			groups[`$P${pathIndex + 1}`] = path;
		});
	}

	// If hash found, pass in hash without # symbol
	if (hashMatch) {
		groups.$H = hashMatch.replace('#', '');
	}

	if (queryMatches) {
		groups.$Q = queryMatches;
	}

	// Return hostmatch only if no path matches found
	return groups;
}

module.exports = {
	parseUrlGroups: parseUrlGroups
};
