<template>
  <nav>
    <b-pagination-nav
      :link-gen="linkGen"
      :number-of-pages="10"
      use-router
      size="lg"
      align="center"
      :disabled="hidePagination ? true : false"
    ></b-pagination-nav>
    <h4 class="bg-info text-white p-2 mt-4" @click="showAllImages()">
      {{ message }} ( {{ this.imagesTotal }})
    </h4>
  </nav>
</template>

<script>
import { mapState } from "vuex";
import { BPaginationNav } from "bootstrap-vue";

export default {
  name: "Pagination",
  components: {
    BPaginationNav
  },
  props: {
    message: String
  },
  data() {
    return {
      hidePagination: false
    };
  },
  methods: {
    showAllImages() {
      this.$store.dispatch("fetchImages", {
        perPage: this.imagesTotal,
        page: 1
      });
      this.hidePagination = true;
    },
    linkGen(pageNum) {
      return pageNum === 1 ? "?" : `?page=${pageNum}`;
    }
  },
  computed: {
    ...mapState(["imagesTotal"])
  }
};
</script>

<style scoped>
.hidePagination {
  display: none;
}
</style>
