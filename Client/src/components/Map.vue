<template>
    <div class="container">
        <div class="columns">
        <div class="column is-8" style="padding-top:30px;">
            <div style="font-family:FontAwesome;position:absolute;color:transparent;">Preload font, otherwise we may end up trying to use it before it is available.</div>
            <div id="map" style="position:relative;width:800px;height:600px;"></div>
        </div>
        <div class="column is-5" style="padding-top:30px;">
            <!--<div class="field">
                <p id="timeContent" style="font-size: 15px;font-weight: 700;font-family: sans-serif;color: lightseagreen;"> Estimated Arrival : <span id="estimatedTime"> </span> </p>
            </div>-->
            <div class="field">
                <p id="stopsContent" style="font-size: 20px;font-weight: 700;font-family: sans-serif;color: lightseagreen;"> Your package is <span id="hops"> </span> away from you!! </p>
            </div>
        </div>
        </div>
        <!-- <div class="button primary" @click="changeStartPoint">Change</div> -->
    </div>
    
</template>



<script>
var map;
var userPin;
var directionsManager;
var lat = [42.298885, 42.298972, 42.299012, 42.298941, 42.298806, 42.298576, 42.298322, 42.297955, 42.296768, 42.294210, 42.294272, 42.296803, 42.296866, 42.296914, 42.297041, 42.297525, 42.297668,42.294944, 42.294341, 42.293889, 42.293365, 42.291534, 42.290539, 42.289120, 42.288866, 42.288818, 42.288699, 42.285737, 42.284840, 42.276843, 42.268722, 42.269476] ;
var lng = [-71.383323, -71.387314, -71.390565, -71.394256, -71.398483, -71.403933, -71.408524, -71.449108, -71.452569, -71.458046, -71.475644, -71.477511, -71.480236, -71.483326,  -71.486266, -71.488401, -71.505138, -71.507294, -71.509665,  -71.512422, -71.533781, -71.536367,-71.545152, -71.557934, -71.561925,  -71.567279, -71.572831,  -71.597118, -71.598169, -71.608631, -71.614028, -71.616485];

var createFontPushpin = function(location, text, fontName, fontSizePx, color){
        var c = document.createElement('canvas');
        var ctx = c.getContext('2d');

        var font = fontSizePx + 'px ' + fontName;
        ctx.font = font

        var size = ctx.measureText(text);
        c.width = size.width;
        c.height = fontSizePx;

        ctx.font = font;
        ctx.textBaseline = 'top';
        ctx.fillStyle = color;

        ctx.fillText(text, 0, 0);

        return new Microsoft.Maps.Pushpin(location, {
            icon: c.toDataURL(),
            anchor: new Microsoft.Maps.Point(c.width / 2, c.height / 2)
        });
         }

var changeStartPoint = function(){
var i = 0;
            var interval = setInterval(()=>{ var position = new Microsoft.Maps.Location(lat[i], lng[i]);
                 userPin.setLocation(position);
                 userPin.setOptions({ visible: true });
                var wp = directionsManager.getAllWaypoints();
                directionsManager.removeWaypoint(wp[0]);
                directionsManager.addWaypoint(new Microsoft.Maps.Directions.Waypoint({ location: position}), 0);
                //directionsManager.calculateDirections();
                 if(i == lat.length-1){
                     clearInterval(interval)
                     document.getElementById('stopsContent').innerHTML = 'Your package has been delivered';
                 }else{
                     var stopNumber = Math.round((lat.length - i) / 5)
                     stopNumber = stopNumber > 1? stopNumber : 1;
                     document.getElementById('hops').innerHTML = (stopNumber > 1)?stopNumber + " stops" : stopNumber + " stop";
                 }
                 
                 i++; }, 3000);
}
export default {
    name: 'Map',
     components: {
     },
    data(){
       return {
         location: null,
         userPin:null,

       }
     },
     methods:{
         displayRoute(position){
             var wp = directionsManager.getAllWaypoints();
             console.log(wp[0]);
             directionsManager.removeWaypoint(wp[0]);
             directionsManager.addWaypoint(new Microsoft.Maps.Directions.Waypoint({ location: position}), 0);
         },
         changeStartPoint(){
             var i = 0;
             setInterval(()=>{ var position = new Microsoft.Maps.Location(lat[i], lng[i]);
                 userPin.setLocation(position);
                 userPin.setOptions({ visible: true });
                 i++; }, 5000);
             
         },
         
       initMap(){
        
         map = new window.Microsoft.Maps.Map(document.getElementById('map'), {});
         this.map = map;
         Microsoft.Maps.loadModule('Microsoft.Maps.Directions', function () {
            directionsManager = new Microsoft.Maps.Directions.DirectionsManager(map);
            directionsManager.setRenderOptions({ lastWaypointPushpinOptions:{visible: false }, firstWaypointPushpinOptions:{visible: false}, drivingPolylineOptions:{visible: false}})
            Microsoft.Maps.Events.addHandler(directionsManager, 'directionsUpdated', function () {
                var time = Math.round((directionsManager._routeResult.routeSummary[0].timeWithTraffic)/60);
                //document.getElementById("time").innerHTML = time;
                //document.getElementById('estimatedTime').innerHTML = time + " minutes";
        
            });
            userPin = createFontPushpin(new Microsoft.Maps.Location(lat[0], lng[0]), '\uf0d1', 'FontAwesome', 30, 'red');
            map.entities.push(userPin);
            var bluePin = createFontPushpin(new Microsoft.Maps.Location(42.269476, -71.616485), '\uf041', 'FontAwesome', 30, 'blue');
            map.entities.push(bluePin);
            directionsManager.addWaypoint(new Microsoft.Maps.Directions.Waypoint({ location: new Microsoft.Maps.Location(lat[0], lng[0]), visible: false}, 1));
            directionsManager.addWaypoint(new Microsoft.Maps.Directions.Waypoint({location: new Microsoft.Maps.Location(42.269476, -71.616485), visible: false}));
                    //directionsManager.calculateDirections();
            changeStartPoint();
            directionsManager.calculateDirections();
    
        });
       }
     },
     mounted(){
        var linkTag = document.createElement("link");
        linkTag.href = "http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css";
        linkTag.rel = "stylesheet";

        document.head.appendChild(linkTag);
            if (document.getElementById("scriptBingMaps")) {
                return; // already loaded
            }
   
        window.OnLoadBingMapsApi = () => this.initMap();
        var scriptTag = document.createElement("script");
        scriptTag.src = "https://www.bing.com/api/maps/mapcontrol?callback=OnLoadBingMapsApi&key=";
        scriptTag.id = "scriptBingMaps";
        document.head.appendChild(scriptTag)
        document.getElementById('hops').innerHTML = Math.round(lat.length / 5) + " stops";
    }
}
</script>

