<template>
  <div class="ui grid">
    <div class="six wide column">
        <userForm />
    </div>
    <div class="ten wide column segment ui">
      <GoogleMap :api-key="config.GOOGLE_API_KEY" style="width: 100%; height: 580px" :center="center" :zoom="15">
        <Marker v-for="(marker, index) in markers" :key="index" :options="marker" />
      </GoogleMap>
    </div>
  </div>
</template>

<script setup>
import { GoogleMap, Marker } from "vue3-google-map";

const config = useRuntimeConfig();

const places = useState("places", () => []);
const lat = useState("lat", () => 25.12);
const lng = useState("lng", () => 80.56);

const center = computed(() => ({ lat: lat.value, lng: lng.value }));

const getLabel = (s) => {
  let split = s.split(" ");
  let res = "";
  split.forEach((s) => res += res.charAt(0).toUpperCase());
  return res;
}

const markers = computed(() => {
  let markers = [{
    position: center.value,
    label: "You",
    title: "This is where you are"
  }]

  places.value.forEach((p) => {
    markers.push({
      position: {
        lat: p.lat,
        lng: p.lon
      },
      label: getLabel(p.name),
      title: p.name
    });
  });

  return markers;
})

</script>

<style>
body {
  margin: 10px;
  padding: 0%;
}
</style>