<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
    <div v-for="t in tickets" :key="t.accountId" class="my-5">
      <Ticket :event="t.event" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState";
import { useRoute, useRouter } from "vue-router";
import { ticketsService } from "../services/TicketsService";
import Pop from "../utils/Pop";

export default {
  name: "Account",
  setup() {
    onMounted(async () => {
      try {
        await ticketsService.getUserTickets();
      } catch {
        Pop.toast("broke");
      }
    });
    return {
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.tickets),
    };
  },
};
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
