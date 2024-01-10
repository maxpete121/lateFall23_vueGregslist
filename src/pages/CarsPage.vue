<template>
  <div class="container-fluid">
    <section class="row my-2">

      <div v-for="car in cars" class="col-4 mb-3">
        <!-- {{ car.make }} -->
        <CarCard :car="car"/>
      </div>

    </section>

<!-- THE CARS PAGE
    {{ cars }} -->


  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { carsService } from '../services/CarsService.js';
import CarCard from '../components/CarCard.vue'
export default {
  setup(){
    onMounted(()=>{
      getCars()
    })


    async function getCars(){
      try {
        await carsService.getCars()
      } catch (error) {
        Pop.error(error)
      }
    }
  return {
    cars: computed(()=> AppState.cars)
   }
  },
  components: {CarCard}
};
</script>


<style lang="scss" scoped>

</style>
