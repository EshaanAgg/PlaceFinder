<template>
  <div class="ui grid">
    <div class="six wide column">
      <br />
      <div class="one">
  <h1>Find the <br /> BEST ACTIVITIES <br />near you!</h1>
</div>
        
        <userForm />
    </div>
    <div class="ten wide column segment ui">
      <GoogleMap :api-key="config.GOOGLE_API_KEY" style="width: 100%; height: 580px" :center="center" :zoom="10">
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

const markers = computed(() => {
  let markers = [{
    position: center.value,
    label: "You",
    title: "This is where you are"
  }]

  places.value.forEach((p, index) => {
    markers.push({
      position: {
        lat: p.lat,
        lng: p.lon
      },
      label: (index + 1).toString(),
      title: p.name
    });
  });
  console.log(markers);
  return markers;
})

</script>

<style>
body {
  margin: 10px;
  padding: 0%;
}

h1 {
  position: relative;
  padding: 0;
  margin: 0;
  font-family: "Raleway", sans-serif;
  font-weight: 200;
  font-size: 32px;
  color: #080808;
  -webkit-transition: all 0.4s ease 0s;
  -o-transition: all 0.4s ease 0s;
  transition: all 0.4s ease 0s;
}

h1 span {
  display: block;
  font-size: 0.5em;
  line-height: 1.3;
}
h1 em {
  font-style: normal;
  font-weight: 600;
}

.one h1 {
  text-align: center;
  padding-bottom: 5px;
}
.one h1:before {
  width: 28px;
  height: 5px;
  display: block;
  content: "";
  position: absolute;
  bottom: 3px;
  left: 50%;
  margin-left: -14px;
  background-color: #b80000;
}
.one h1:after {
  width: 100px;
  height: 1px;
  display: block;
  content: "";
  position: relative;
  margin-top: 25px;
  left: 50%;
  margin-left: -50px;
  background-color: #b80000;
}
</style>