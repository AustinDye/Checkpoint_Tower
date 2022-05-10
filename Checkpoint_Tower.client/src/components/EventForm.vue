<template>
  <div class="container">
    <form @submit.prevent="createEvent" id="eventForm" class="text-center">
      <div class="mb-3">
        <label for="name" class="form-label"></label>
        <input
          type="text"
          class="form-control"
          name="name"
          id="name"
          aria-describedby="helpId"
          placeholder="Name..."
          v-model="editable.name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label"></label>
        <input
          type="text"
          class="form-control"
          name="description"
          id="description"
          aria-describedby="helpId"
          placeholder="Description..."
          v-model="editable.description"
          required
        />
      </div>
      <div class="mb-3">
        <label for="coverImg" class="form-label"></label>
        <input
          type="text"
          class="form-control"
          name="coverImg"
          id="coverImg"
          aria-describedby="helpId"
          placeholder="coverImg..."
          v-model="editable.coverImg"
          required
        />
      </div>
      <div class="mb-3">
        <label for="location" class="form-label"></label>
        <input
          type="text"
          class="form-control"
          name="location"
          id="location"
          aria-describedby="helpId"
          placeholder="location..."
          v-model="editable.location"
          required
        />
      </div>
      <div class="mb-3">
        <label for="capacity" class="form-label"></label>
        <input
          type="text"
          class="form-control"
          name="capacity"
          id="capacity"
          aria-describedby="helpId"
          placeholder="capacity..."
          v-model="editable.capacity"
          required
        />
      </div>
      <div class="mb-3">
        <label for="starDate" class="form-label"></label>
        <input
          type="date"
          class="form-control"
          name="starDate"
          id="starDate"
          aria-describedby="helpId"
          placeholder="starDate..."
          v-model="editable.starDate"
          required
        />
      </div>
      <div class="mb-3">
        <label for="type" class="form-label"></label>
        <input
          type="text"
          class="form-control"
          name="type"
          id="type"
          aria-describedby="helpId"
          placeholder="type..."
          v-model="editable.type"
          required
        />
      </div>
      <div class="mb-3">
        <label for="startDate" class="form-label"></label>
        <input
          type="text"
          class="form-control"
          name="startDate"
          id="startDate"
          aria-describedby="helpId"
          placeholder="startDate..."
          v-model="editable.startDate"
          required
        />
      </div>
      <button class="btn btn-info w-50 mt-3" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js";
import { Modal } from "bootstrap";
import { useRouter } from "vue-router";
export default {
  setup() {
    const editable = ref({});
    const router = useRouter();
    return {
      editable,
      async createEvent() {
        try {
          const newEvent = await eventsService.createEvent(editable.value);
          document.getElementById("eventForm").reset();
          Modal.getOrCreateInstance(
            document.getElementById("createEventModal")
          ).toggle();
          router.push({ path: "/events/" + newEvent.id });
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
