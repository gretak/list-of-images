<template>
  <b-col>
    <section>
      <h1>{{ heading }}</h1>
    </section>
    <p class="bg-info text-white p-2">{{ lastClickedData }}</p>
    <b-spinner v-if="fetching" type="grow" label="Spinning"></b-spinner>
    <b-col v-else sm="10" offset="1">
      <table class="table table-sm mb-5 mt-4">
        <thead class="thead-dark">
          <th @click="sort('id')">ID</th>
          <th @click="sort('title')">Title</th>
          <th @click="sort('url')">Link</th>
        </thead>
        <tr
          v-for="image in sortedImages"
          :key="image.id"
          :class="{ highlightRow: image.id == selected }"
          @click="selected = image.id"
        >
          <td @click="outputLastClickedData">
            <b>{{ image.id }}</b>
          </td>
          <td @click="outputLastClickedData">
            {{ image.title }}
          </td>
          <td @click="outputLastClickedData">
            {{ image.url }}
          </td>
        </tr>
      </table>

      <Pagination message="Click here to view all results" />
    </b-col>
  </b-col>
</template>

<script>
import { mapState } from "vuex";
import { BSpinner } from "bootstrap-vue";
import Pagination from "@/components/Pagination.vue";

export default {
  name: "ImagesList",
  components: {
    Pagination,
    BSpinner
  },
  props: {
    heading: String
  },
  data() {
    return {
      currentSort: "id",
      currentSortDir: "asc",
      selected: false
    };
  },
  created() {
    this.$store.dispatch("fetchImages", {
      perPage: this.perPage,
      page: this.page
    });
  },
  methods: {
    sort(item) {
      if (item === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = item;
    },
    outputLastClickedData(e) {
      this.$store.commit("SET_STATE", e.target.innerHTML);
    }
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    sortedImages() {
      return this.images.slice().sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir === "desc") {
          modifier = -1;
        }
        if (a[this.currentSort] < b[this.currentSort]) {
          return -1 * modifier;
        } else if (a[this.currentSort] > b[this.currentSort]) {
          return 1 * modifier;
        }
        return 0;
      });
    },
    ...mapState(["images", "perPage", "lastClickedData", "fetching"])
  }
};
</script>

<style scoped>
section {
  background: url("../assets/cat.png") no-repeat bottom right;
  height: 25vw;
  max-height: 360px;
  background-size: contain;
}
section h1 {
  padding-top: 10vw;
}
</style>
