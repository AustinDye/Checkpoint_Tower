<template>
  <form @submit.prevent="createComment" id="commentsForm" class="text-center">
    <div class="mb-3">
      <label for="body" class="form-label"></label>
      <input
        type="text-area"
        class="form-control"
        name="body"
        id="body"
        aria-describedby="helpId"
        placeholder="Tell us about this event..."
        v-model="editable.body"
        required
      />
    </div>
    <button class="btn btn-info w-50 mt-3" type="submit">Submit</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import { commentsService } from "../services/CommentService.js";
import Pop from "../utils/Pop";
import { useRoute } from "vue-router";
export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const route = useRoute();
    const editable = ref({
      eventId: route.params.eventId,
    });
    return {
      editable,
      async createComment() {
        try {
          await commentsService.createComment(editable.value);
          Pop.toast("Comment added!", "success");
          document.getElementById("commentsForm").reset();
        } catch (error) {
          console.error(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
