import Vue from "vue";
import Vuex from "vuex";
import APIService from "@/services/APIService.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    images: [],
    perPage: 500,
    imagesTotal: 0,
    lastClickedData: "You did not click anything yet...",
    fetching: true
  },
  mutations: {
    SET_IMAGES(state, images) {
      state.images = images;
      state.fetching = false;
    },
    SET_IMAGES_TOTAL(state, imagesTotal) {
      state.imagesTotal = imagesTotal;
    },
    SET_STATE(state, e) {
      state.lastClickedData = e;
    }
  },
  actions: {
    fetchImages({ commit }, { perPage, page }) {
      APIService.getImages(perPage, page)
        .then(response => {
          commit("SET_IMAGES", response.data),
            commit(
              "SET_IMAGES_TOTAL",
              parseInt(response.headers["x-total-count"])
            );
        })
        .catch(error => {
          console.log("There was an error:", error.response);
        });
    }
  },
  getters: {
    maxPages: state => {
      return parseInt(state.imagesTotal / state.perPage);
    }
  }
});
