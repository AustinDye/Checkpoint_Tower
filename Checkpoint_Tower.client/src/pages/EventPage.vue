<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <h1>{{ activeEvent.name }}</h1>
        <img :src="activeEvent.coverImg" class="img-fluid banner-img" />
        <h6>{{ activeEvent.location }}</h6>
        <h6>{{ activeEvent.type }}</h6>
        <h6>Begins: {{ activeEvent.startDate }}</h6>
        <h6>Open Seats:{{ activeEvent.capacity }}</h6>
      </div>
      <div class="col-6 pt-4">
        <h3>{{ activeEvent.description }}</h3>
        <button @click="createTicket">Get Ticket</button>
        <div v-for="c in comments" :key="c.id" class="my-5">
          <Comment v-if="activeEvent.id == c.eventId" :comment="c" />
        </div>
        <CommentsForm />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { onMounted, watchEffect } from "@vue/runtime-core";
import Pop from "../utils/Pop";
import { useRoute, useRouter } from "vue-router";
import { eventsService } from "../services/EventsService";
import { commentsService } from "../services/CommentService";
import { ticketsService } from "../services/TicketsService";
export default {
  name: "Event",
  setup() {
    const route = useRoute();
    const router = useRouter();

    onMounted(async () => {
      try {
        const eventId = route.params.eventId;
        await commentsService.getAllComments(eventId);
        await eventsService.setActiveEvent(eventId);
      } catch (error) {
        Pop.toast("broke");
      }
    });
    return {
      comments: computed(() => AppState.comments),
      activeEvent: computed(() => AppState.activeEvent),
      account: computed(() => AppState.account),
      async createTicket() {
        try {
          let editable = {};
          editable.eventId = this.activeEvent.id;
          editable.accountId = this.account.id;
          const newTicket = await ticketsService.createTicket(editable);
        } catch (error) {
          console.error("[error prefix]", error.message);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
