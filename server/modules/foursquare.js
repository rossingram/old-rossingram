var f = function(config) {
    this.foursquare = require("node-foursquare")({
        "foursquare" : {
            "version" : "20121125"
        },
        "secrets": {
            "clientId" : config.clientId,
            "clientSecret" : config.clientSecret,
            "redirectUrl" : config.redirectUrl
        }
    });
    this.access_token = config.access_token;
};

f.prototype.last_check_in = function(beforeTimestamp, handler) {
    var params = {
        beforeTimestamp : beforeTimestamp,
        // Foursquare API requires an after timestamp.
        afterTimestamp : beforeTimestamp - 60 * 60 * 24 * 6 // Up to 7 days ago
    };

    this.foursquare.Users.getCheckins(
        "self",
        params,
        this.access_token,

        function(error, results) {
            if (error) {
                // API error response.
                handler(null, {"type": "api_error", "response": error});
            } else if (
                    results.checkins &&
                    results.checkins.items &&
                    results.checkins.items.length > 0) {

                // Check-ins are sorted in chronological order.
                var items = results.checkins.items;
                var checkin = items[items.length - 1];
                var date = new Date(checkin.createdAt * 1000); // Seconds -> milliseconds
                var dateString = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();

                var response = {
                    "date": dateString,
                    "venue": {
                        "id": checkin.venue.id,
                        "name": checkin.venue.name,
                        "twitter": checkin.venue.contact.twitter,
                        "location": checkin.venue.location,
                        "url": checkin.venue.url
                    },
                    // "debug": checkin
                };
                handler(response, null);

            } else {
                // Response was not formatted the way we expected.
                handler(null, {"type": "parse_error", "response": results});
            }
        }

        );
};

module.exports = f;