<template>
    <div class="car-card border border-primary rounded shadow">
      <!-- 🚗 {{ car.make }} -->
      <img :src="car.imgUrl" class="img-fluid rounded-top" :alt="`picture of ${car.make} ${car.model}`">
      <div class="p-1">
        <p class="fw-bold text-center"> {{ car.year }} {{ car.make }} {{ car.model }}</p>
        <p>{{ car.description }}</p>
        <div class="text-success text-end"><b>${{ car.price }}</b></div>
      </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import { Car } from '../models/Car.js';
export default {
  props: {car: {type: Car, required: true}},
  setup(){
  return {
    // REVIEW the reason we CAN'T use info from the AppState to display the SINGLE car data here, is cause this component doesn't know which car it's supposed to render
    // singleCar : computed(()=> AppState.cars)
   }
  }
};
</script>


<style lang="scss" scoped>
.car-card{
  img{
    width: 100%;
    height: 25vh;
    object-fit: cover;
    object-position: center;
  }
}
</style>
