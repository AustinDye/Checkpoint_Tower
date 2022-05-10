<template>
  <div class="row comment-body mx-2">
    <div class="col-12 justify-content-between bg-dark p-2">
      <span class="d-flex">
        <img
          class="profile-pic rounded-pill"
          :src="comment.creator.picture"
          alt=""
        />
        <b class="ms-3 mt-2">{{ comment.creator.name }}:</b>
      </span>
      <div class="p-2 rounded bg-white text-dark mt-2">
        {{ comment.body }}
      </div>
      <i
        v-if="comment.accountId == account.id"
        class="mdi mdi-trash-can pointer"
        @click="removeComment()"
      ></i>
    </div>
  </div>
  <br />
</template>

<script>
import { computed } from "@vue/reactivity";
import { commentsService } from "../services/CommentService";
import Pop from "../utils/Pop";
import { AppState } from "../AppState";
export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async removeComment() {
        try {
          if (await Pop.confirm()) {
            await commentsService.removeComment(props.comment);
            Pop.toast("Note delorted!", "success");
          }
        } catch (error) {
          Pop.toast("cannot delete", "error");
        }
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.profile-pic {
  object-fit: cover;
  height: 3em;
  width: 3em;
}
.mdi-close {
  right: 0;
}
.note-body {
  box-shadow: 0.4em 0.6em 0.6em rgba(0, 0, 0, 0.46);
}
.note-text {
  width: 100%;
}
</style>
