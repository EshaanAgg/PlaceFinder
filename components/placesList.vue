<template>
    <div class="ui segment"  style="max-height:500px;overflow:scroll">
    <div class="ui divided items">
        <div v-if="places.length==0">
            <br />
            <div class="center" >No places to show :( </div>
            <br />
        </div>
        <div v-else class="item" v-for="place in places" :key="place.id">
            <div class="content">
                <div class="header">{{place.name}}</div>
                <div class="meta">{{place.vicinity}}</div>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>

const places = useState("places");

</script>