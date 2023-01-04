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
        <button class="ui button" @click.prevent="findClosebyButtonPressed">
           Find Closeby 
        </button>
        </div>
      </div>
    </form>
    <places-list />
</template>

<script setup>
import typeValues from "@/data/typeOfLocations.json";
import categories from "@/data/allCategories.json"

const config = useRuntimeConfig();

const type = ref("accommodation");
const radius = ref("2");

const radiusValues = [2, 5, 10, 15, 20, 25]

const capitalise = (s) => {
  let parts = s.split("_");
  let ans = "";
  parts.forEach((s) => ans += s.charAt(0).toUpperCase() + s.slice(1) + " ");
  return ans;
}

const places = useState("places");
const lat = useState("lat");
const lng = useState("lng");

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
  let filteredCategories = [type.value];
  categories.categories.forEach((c) => {
    if (c.includes(type.value) && filteredCategories.length <= 94) filteredCategories.push(c);
  })
  
  const URL = `https://api.geoapify.com/v2/places?categories=${filteredCategories.join(",")}&filter=circle:${coordinates.value},${radius.value * 1000}&bias=proximity:${coordinates.value}&limit=30&apiKey=${config.GEOAPIFY_KEY}`
  console.log(URL);

  const { data: fetchedPlaces, error } = await useFetch(URL);
  if (error.value) {
    console.log("Error!!! ", error);
  } else {
    places.value = fetchedPlaces.value.features;
    console.log(places.value);
  }
};
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