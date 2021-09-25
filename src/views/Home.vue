<template>
  <div>
    <div class="bannerimg"></div>
    <!-- <h1>{{ countryName }}</h1> -->
    <div class="searchinput my-3">
      <form @submit.prevent="searchCountry">
        <input
          required
          v-model="countryName"
          type="text"
          class="form-control"
          placeholder="Search Country"
        />
      </form>
    </div>
    <div class="regions">
      <span @click="fetchCounties" class="region all"> All </span>
      <span
        @click="queryCountry(region.name)"
        :style="`background-image: url(/assets/img/regions/${region.image})`"
        :class="{
          region: true,
          active: activeRegion == region.name,
        }"
        v-for="(region, index) in regions"
        :key="index"
        >{{ region.name }}</span
      >
    </div>

    <div class="my-5">
      <p v-if="loading" class="text-center">Loading...</p>
      <div v-else>
        <p v-if="noData">No Data Found</p>
        <p v-else class="text-uppercase font-bold">Country List</p>

        <CountryCard
          v-for="(country, index) in countries"
          :key="index"
          :country="country"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CountryCard from "@/components/CountryCard";
export default {
  data() {
    return {
      loading: true,
      countryName: "",
      noData: false,
      activeRegion: "",
      regions: [
        { name: "Africa", image: "africa.jpeg" },
        { name: "America", image: "america.jpeg" },
        { name: "Asia", image: "asia.jpeg" },
        { name: "Europe", image: "europe.jpeg" },
        { name: "Oceania", image: "oceania.jpeg" },
      ],
      countries: [],
    };
  },
  components: { CountryCard },
  mounted() {
    this.fetchCounties();
  },
  methods: {
    fetchCounties() {
      this.noData = false;
      this.loading = true;
      this.activeRegion = "";
      fetch("https://restcountries.com/v3/all")
        .then((response) => response.json())
        .then((data) => {
          this.loading = false;
          if (data) {
            this.countries = data;
          } else {
            this.noData = true;
            this.countries = [];
          }
        });
    },
    searchCountry() {
      this.loading = true;
      this.noData = false;

      fetch(`https://restcountries.com/v3/name/${this.countryName}`)
        .then((response) => response.json())
        .then((data) => {
          this.loading = false;
          if (data.length > 0) {
            this.countries = data;
          } else {
            this.noData = true;
            this.countries = [];
          }
        });
    },
    queryCountry(name) {
      this.loading = true;
      this.countryName = "";
      this.activeRegion = name;
      fetch(`https://restcountries.com/v3/region/${name}`)
        .then((response) => response.json())
        .then((data) => {
          this.loading = false;
          if (data.length > 0) {
            this.countries = data;
          } else {
            this.noData = true;
            this.countries = [];
          }
        });
    },
  },
};
</script>

<style lang="scss">
.bannerimg {
  width: 100%;
  height: 200px;
  background: #dddddd;
  background-image: url("/assets/img/pexels-photo-5643148.jpeg");
  margin-bottom: 28px;
  border-radius: 19px;
  background-size: cover;
  background-position: bottom;
}
.searchinput {
  input {
    border: 1px solid black;
    border-radius: 10px;
  }
}
.regions {
  .region {
    background-size: cover;
    background-color: darkgray;
    font-weight: bold;
    width: 100px;
    height: 100px;
    border-radius: 100px;
    display: inline-block;
    margin-right: 19px;
    text-align: center;
    line-height: 6.3;
    color: white;
    cursor: pointer;
    &.all {
      background: black;
    }
    &.active {
      border: 4px solid #ffffff;
      box-shadow: 0 0px 14px 1px #000000c9;
    }
  }
}
.font-bold {
  font-weight: bold;
}
</style>
