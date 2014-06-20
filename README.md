GoogleMaps-Cluster-QV11
=======================

QlikView 11 extension object.
Requires IE9+ installed to work in webview and normal browser or IE9+ to work the AJAX Client deployed over QVS.

##Object Properties

####Latitude
Th#e field in your data model that holds latitude data

####Longitude
The field in your data model that holds longitude data

####Expression
A QlikView expression that will calculate for each latitude and longitude pair.
The expression value will also be the indicator on the cluster. If no calculation is required and you only want to show every marker input a arbitrary value such as =1

####Popup contents
Define the contents of hover over popup window for a marker.
Takes a QlikView Expression, combine text and calculated values such as ='This is text string followed by a QV Expression' & Sum(FieldInYourDataModel)

####Pop-up styles
Enable or Disable hover over popup styles on marker (Sorry for the label typo)

####Grid Size
Defines the size of the cluster grid. The bigger the grid the more markers will be grouped into a single cluster.
Adjust to fit your data and the geography that you are mapping.

####Max zoom
The max zoom level before clustering is turned off and markers are displayed as-is.
Max available zoom level is 19 which is building level and minimum is 0 which is the entire world.

####Single cluster style
Enable or Disable different cluster styles. The Single Cluster Style disabled the cluster icons will scale according the markers inside the cluster.
