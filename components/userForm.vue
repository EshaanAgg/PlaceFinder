<template>
    <form class="ui segment large form">
      <div class="ui segment">
        <div class="field">
          <div class="caption">Your Location</div>
          <div class="ui right icon input large">
            <input
              type="text"
              placeholder="Where you at?"
              v-model="coordinatesDisplay"
            />
            <i class="dot circle link icon" @click="locatorButtonPressed"></i>
          </div>
        </div>
        <div class="field">
          <div class="two fields">
            <div class="field">
              <div class="caption">Where do you want to go?</div>
              <select v-model="type">
                <option v-for="location in typeValues.locations" :key="location" :value="location">{{ capitalise(location) }}</option>
              </select>
            </div>
            <div class="field">
             <div class="caption"> How far?</div>
              <select v-model="radius">
                <option v-for="radius in radiusValues" :value="radius" :key="radius">{{radius}} KM</option>
              </select>
            </div>
          </div>
        </div>
        
        <div class="center">
        <button class="ui button" @click="findClosebyButtonPressed">
           Find Closeby 
        </button>
        </div>
      </div>
    </form>
    <places-list />
</template>

<script setup>
import typeValues from "@/data/typeOfLocations.json";
const config = useRuntimeConfig();

const lat = ref(0);
const lng = ref(0);
const type = ref("restaurant");
const radius = ref("2");

const radiusValues = [2, 5, 10, 15, 20, 25]

const capitalise = (s) => {
  let parts = s.split("_");
  let ans = "";
  parts.forEach((s) => ans += s.charAt(0).toUpperCase() + s.slice(1) + " ");
  return ans;
}

const places = useState("places", () => []);

const coordinates = computed(() => `${lat.value},${lng.value}`);
const coordinatesDisplay = computed(() => `${lat.value.toString().substring(0, 5)} Lat, ${lng.value.toString().substring(0, 5)} Lng`);

const locatorButtonPressed = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      lat.value = position.coords.latitude;
      lng.value = position.coords.longitude;
    },
    (error) => {
      console.log("Error getting location.");
    }
  );
};

const findClosebyButtonPressed = async () => {
  const URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
    coordinates.value
  }&type=${type.value}&radius=${radius.value * 1000}&key=${
    config.GOOGLE_API_KEY
    }`;
  console.log(URL);
  console.log("i");

  const { data: fetchedPlaces, error } = await useFetch(URL);
  console.log("hi");
  console.log(fetchedPlaces);
  if (error) {
    console.log(error.message);
  } else {
    places.value = data.data.results;
    console.log(places.value);
    console.log(data);
    addLocationsToGoogleMaps();
  }
};

const addLocationsToGoogleMaps = () => {
	var map = new google.maps.Map(this.$refs['map'], {
		zoom: 15,
		center: new google.maps.LatLng(lat.value, lng.value),
		mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    
	places.values.forEach((place) => {
		const lat = place.geometry.location.lat;
		const lng = place.geometry.location.lng;
		let marker = new google.maps.Marker({
			position: new google.maps.LatLng(lat, lng),
			map: map
		});
	});
}

</script>

<style>
.center {
  text-align: center;
}

.caption {
  font-size: small;
  text-decoration:wavy;
}
</style>