<template>
  <div class="col-md-4 bg-info">
    <div
      class="ticket-card"
      :style="{ backgroundImage: `url(${event.coverImg})` }"
    >
      <div class="btn" @click="goToEvent">
        <h3 class="">
          {{ event.name }}
        </h3>
        <p class="fs-6">
          {{ event.location }} <br />
          {{ event.startDate }}
        </p>
      </div>
    </div>
  </div>
  <br />
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true,
    },
    setup(props) {
      return {
        event: props.event,
      };
    },
  },
};
</script>

<style lang="scss" scoped></style>
