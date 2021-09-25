<template>
  <div>
    <router-link to="/">Go Back</router-link>
    <div class="my-5">
      <p v-if="loading">Loading...</p>
      <div v-else>
        <div class="row align-items-center">
          <div class="col-3">
            <img class="img-fluid" :src="countryData.flags[0]" />
          </div>
          <div class="col-9">
            <h1>{{ countryData.name }}</h1>
          </div>
        </div>

        <div class="mt-5">
          <l-map
            style="height: 500px"
            :zoom="zoom"
            :center="countryData.latlng"
          >
            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
            <l-marker :lat-lng="countryData.latlng"></l-marker>
          </l-map>
        </div>

        <div class="mt-5">
          <p class="countryInfolist" v-if="countryData.capital">
            Capital
            <span>
              {{ countryData.capital }}
            </span>
          </p>
          <p class="countryInfolist" v-if="countryData.callingCodes">
            Calling Codes
            <span>
              <span
                v-for="(code, index) in countryData.callingCodes"
                :key="index"
                >+{{ code }}
              </span>
            </span>
          </p>
          <p class="countryInfolist" v-if="countryData.continent">
            Continent
            <span>
              {{ countryData.continent }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      countryCode: "",
      loading: true,
      countryData: {},
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 6,
      center: [],
      markerLatLng: [],
    };
  },
  mounted() {
    this.countryCode = this.$route.params.code;
    this.fetchCountry();
  },
  methods: {
    fetchCountry() {
      this.loading = true;

      fetch(`https://restcountries.com/v2/alpha/${this.countryCode}`)
        .then((response) => response.json())
        .then((data) => {
          this.loading = false;
          this.countryData = data;
        });
    },
    doSomethingOnReady() {
      this.map = this.$refs.myMap.mapObject;
    },
  },
};
</script>
<style lang="scss">
.countryInfolist {
  font-size: 20px;
  font-size: 20px;
  border-bottom: 1px solid gainsboro;
  padding-bottom: 23px;
  font-weight: bold;
  span {
    float: right;
  }
}
.myMap {
  height: 300px !important;
}
</style>