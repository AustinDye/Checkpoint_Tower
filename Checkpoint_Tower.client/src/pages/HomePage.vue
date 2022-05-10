<template>
  <div v-if="events" class="row d-flex justify-content-center">
    <Event v-for="e in events" :key="e.id" :event="e" />
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { eventsService } from "../services/EventsService.js";
import { accountService } from "../services/AccountService.js";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js";
import { Modal } from "bootstrap";
export default {
  name: "Home",
  setup() {
    onMounted(async () => {
      try {
        await eventsService.getAllEvents();
      } catch (error) {
        console.error("[error prefix]", error.message);
        Pop.toast(error.message, "error");
      }
    });
    return {
      events: computed(() => AppState.events),
    };
  },
};
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
