<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">HOME</div>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          <button
            class="btn bg-black text-light"
            type="button"
            @click="openModal()"
          >
            Host
          </button>
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>

  <Modal id="createEventModal">
    <template #title>
      <h3>Host Event</h3>
    </template>
    <template #body>
      <EventForm />
    </template>
  </Modal>
</template>

<script>
import { Modal } from "bootstrap";
import { computed } from "@vue/reactivity";
export default {
  setup() {
    return {
      openModal() {
        document.getElementById("eventForm").reset();
        Modal.getOrCreateInstance(
          document.getElementById("createEventModal")
        ).toggle();
      },
    };
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
