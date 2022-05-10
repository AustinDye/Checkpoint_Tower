<template>
  <div class="col-md-3 bg-info m-1 p-2">
    <div
      class="event-card"
      :style="{ backgroundImage: `url(${event.coverImg})` }"
    >
      <div class="btn" @click="goToEvent">
        <h6 v-if="event.isCanceled" class="bg-danger">CANCELLED</h6>
        <h3 class="">
          {{ event.name }}
        </h3>
        <p class="fs-6">
          {{ event.type.toUpperCase() }}
          {{ event.location }} <br />
          DATE:{{ event.isCanceled ? "CANCELLED" : event.startDate }}
        </p>
        <span>
          <p>{{ event.capacity }} spots left</p>
          <p v-if="event.capacity == 0" class="bg-warning">SOLD OUT</p>
        </span>
      </div>
    </div>
  </div>
  <br />
</template>

<script>
import { computed } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { AppState } from "../AppState.js";
import { Event } from "../models/Event.js";
import { eventsService } from "../services/EventsService.js";
import Pop from "../utils/Pop.js";
export default {
  props: {
    event: {
      type: Event,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    return {
      account: computed(() => AppState.account),
      activeEvent: computed(() => AppState.activeEvent),
      async goToEvent() {
        await router.push({ path: "/events/" + props.event.id });
        await eventsService.setActiveEvent(props.event.id);
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.btn {
  background-color: rgba(206, 205, 205, 0.663);
  margin-top: 25vh;
  width: 100%;
}
</style>
