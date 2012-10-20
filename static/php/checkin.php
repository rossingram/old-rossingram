<?php
require_once 'foursquare.php';                         //including the class
$fq = new fourSquare("HFXVKY4SGDL0FTLQD2JHBVP1L2Q3FOVBVVKWVFPQOA35R2PZ");  //fetching the checkins data
?>
 
 
<div id="foursquare" style="text-align:center">
    <h2>Last known location:</h2>
 
    <!--displaying the foursquare logo for the venue type-->
    <img src="<?php echo $fq->venueIcon ?>" />
 
    <!--displaying the venue name and the venue type-->
    <?php echo $fq->venueName ?> (<?php echo $fq->venueType ?>)<br/>
 
    <!-- displaying the venue address -->
    <?php echo $fq->venueAddress . ", " . $fq->venueCity . ", " . $fq->venueState . ", " . $fq->venueCountry ?><br/>
    <!--Displaying the map-->
    <img src="<?php echo $fq->getMapUrl(250, 250) ?>" /><br/>
 
    <!-- displaying the user comment-->
    <i><?php echo $fq->comment ?></i><br>
</div>