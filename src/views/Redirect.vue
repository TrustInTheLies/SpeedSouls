<template>
  <div class="container max-w-screen-md">
    <alert type="info" class="mb-4"
      >You are being redirected.
      <a :href="to" class="text-nord10 underline"
        >Click here if you're not being redirected automatically</a
      >.</alert
    >
    <div class="progress h-2 flex flex-row"></div>
  </div>
</template>

<script>
const { VUE_APP_WIKI } = process.env;
import Alert from '@/components/Alert';

export default {
  components: { Alert },
  computed: {
    to() {
      return `${VUE_APP_WIKI}${this.$route.fullPath}`;
    }
  },
  beforeRouteEnter(to, from, next) {
    window.location.replace(`${VUE_APP_WIKI}${to.fullPath}`);
    next();
  }
};
</script>
