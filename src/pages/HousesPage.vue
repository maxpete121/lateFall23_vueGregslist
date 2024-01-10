<template>
  <section class="container-fluid">
    <div>
      <form class="row mt-2 mb-2" @submit.prevent="createHouse()">
        <div class="col-2">
          <label for="">Price:</label>
          <input v-model="houseData.price" type="text" required maxlength="20">
          <label for="">Levels:</label>
          <input v-model="houseData.levels" type="text" required maxlength="3">
        </div>
        <div class="col-2">
          <label for="">Bedrooms:</label>
          <input v-model="houseData.bedrooms" type="text" required maxlength="3">
          <label for="">Bathrooms:</label>
          <input v-model="houseData.bathrooms" type="text" required maxlength="3">
        </div>
        <div class="col-2">
          <label for="">Year:</label>
          <input v-model="houseData.year" type="text" required maxlength="4">
          <label for="">Image URL:</label>
          <input v-model="houseData.imgUrl" type="text" required maxlength="200">
        </div>
        <div class="col-3">
          <img class="img-fluid" :src="houseData.imgUrl" alt="Image Preview">
        </div>
        <div class="col-2">
          <label for="">Description:</label>
          <textarea v-model="houseData.description" name="house-description" maxlength="150" required cols="30" rows="5"></textarea>
        </div>
        <span>
          <button>Post</button>
        </span>
      </form>
    </div>
    <div class="row justify-content center">
      <div class="col-3 card m-2" v-for="houses in houses">
        <HouseCard :houseProp="houses" />
      </div>

    </div>

  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import { api } from '../services/AxiosService';
import { House } from '../models/House';
import HouseCard from '../components/HouseCard.vue'
import { houseService } from '../services/HouseService';
import Pop from '../utils/Pop';
export default {
  setup() {
    const houseData = ref({})
    onMounted(() => {
      getHouses()
    })
    async function getHouses() {
      try {
        await houseService.getHouses()
      } catch (error) {
        Pop.error('Failed to get listings...')
      }

    }

    async function createHouse(){
      await houseService.createHouse(houseData.value)
    }
    return {
      houseData,
      createHouse,
      houses: computed(() => AppState.houses)
    }
  }, components: { HouseCard }
};
</script>


<style lang="scss" scoped></style>
