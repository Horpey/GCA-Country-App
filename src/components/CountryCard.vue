<template>
  <div>
    <router-link :to="`/country/${country.cca3}`">
      <div class="card mb-3">
        <div class="card-body">
          <div class="row">
            <div class="col-2">
              <img :src="country.flags[0]" class="img-fluid" alt="" />
            </div>
            <div class="col-10">
              <div class="countryInfo">
                <p class="region">{{ country.region }}</p>
                <h4>{{ country.name.common }}</h4>
                <p v-if="country.capital" class="text-mini mb-1">
                  {{ country.capital[0] }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    country: Object,
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss">
.text-mini {
  font-size: 14px;
}
.countryInfo {
  .region {
    text-transform: uppercase;
    background-color: #000000;
    display: inline-block;
    color: white;
    font-size: 12px;
    font-weight: bold;
    padding: 5px 9px;
  }
}
</style>