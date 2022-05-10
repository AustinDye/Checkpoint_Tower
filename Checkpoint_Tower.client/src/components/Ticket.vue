<template>
  <div class="col-md-4 bg-info">
    <div
      class="ticket-card"
      :style="{ backgroundImage: `url(${ticket.event.coverImg})` }"
    >
      <div class="btn" @click="goToEvent">
        <h3 class="">
          {{ ticket.event.name }}
        </h3>
        <p class="fs-6">
          {{ ticket.event.location }} <br />
          {{ ticket.event.startDate }}
        </p>
      </div>
      <i class="mdi mdi-trash-can btn" @click="deleteTicket()"></i>
    </div>
  </div>
  <br />
</template>

<script>
import { ticketsService } from "../services/TicketsService.js";
import Pop from "../utils/Pop";
export default {
  props: {
    ticket: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return {
      async deleteTicket() {
        try {
          if (await Pop.confirm()) {
            await ticketsService.deleteTicket(props.ticket.id);
            Pop.toast("Ticket delorted!", "success");
          }
        } catch (error) {
          Pop.toast("cannot delete", "error");
        }
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
