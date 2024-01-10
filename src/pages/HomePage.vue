<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div class="home-card p-5 card align-items-center shadow rounded elevation-3">
      <router-link :to="{name: 'Cars'}">
        <div>View Cars🚗</div>
      </router-link>
      <router-link :to="{path: '/houses'}">
        <div>View Houses🏠</div>
      </router-link>
      <div>View Jobs🧑‍🏭</div>

      <ModalWrapper modalId="home-page-modal" modalSize="sm">
        Modal on the homepage
      </ModalWrapper>
      <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#home-page-modal">open modal</button>
    </div>
  </div>
</template>

<script>
import ModalWrapper from '../components/ModalWrapper.vue';

export default {
    setup() {
        return {};
    },
    components: { ModalWrapper }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: clamp(500px, 50vw, 100%);

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
