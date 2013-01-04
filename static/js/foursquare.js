function formatDateString(responseString) {
    var dateArray = responseString.split("/");
        var date = new Date(dateArray[2], dateArray[0], dateArray[1]);
            var now = new Date();
                var daysAgo = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

                    if (daysAgo < 1) {
                            return "Today";
                                } else if (daysAgo == 1) {
                                        return "Yesterday";
                                            } else {
                                                    return daysAgo + " days ago";
                                                        }
}

function stripHtml(str) {
      return jQuery('<div />', { html: str }).text();
}

function formatVenue(venueData) {
    return "<strong>" + stripHtml(venueData.name) + "</strong> in " + stripHtml(venueData.location.city);
}

function updateLastCheckin() {
    $.ajax({
            url: "http://last-seen.herokuapp.com/",
            dataType: "jsonp",
            success: function(data, textStatus, jqXHR) {
                        var venueString = formatVenue(data.checkin.venue);
                                    var dateString = formatDateString(data.checkin.date);

                                                $("#foursquarePlace").html( "Last seen <strong>" + dateString + "</strong> at " +
                                                                 venueString + ".");
                                                            $(".foursquareFadein").fadeIn();
                                                                    }
        });
}
