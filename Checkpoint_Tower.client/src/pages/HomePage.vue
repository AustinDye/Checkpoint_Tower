<template>
  <div class="row">
    <div class="col-2">
      <button @click="filterEventsByType('concert')">concert</button>
    </div>
    <div class="col-2">
      <button @click="filterEventsByType('digital')">digital</button>
    </div>
    <div class="col-2">
      <button @click="filterEventsByType('sport')">sport</button>
    </div>
    <div class="col-2">
      <button @click="filterEventsByType('convention')">convention</button>
    </div>
    <div class="col-2">
      <button @click="filterEventsByType('')">All</button>
    </div>
  </div>
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
      events: computed(() => {
        if (AppState.filter) {
          return AppState.events.filter((e) => e.type == AppState.filter);
        }
        return AppState.events;
      }),
      filterEventsByType(type) {
        console.log(type, AppState.filter);
        AppState.filter = type;
      },
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
