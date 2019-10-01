<template>
  <b-row>
    <b-col>
      <hr class="mt-1" />
      <ImagesList heading="The list of images" />
    </b-col>
  </b-row>
</template>

<script>
import ImagesList from "@/components/ImagesList.vue";

export default {
  name: "home",
  components: {
    ImagesList
  }
};
</script>
