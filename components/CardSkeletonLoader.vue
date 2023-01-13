<template>
      <v-skeleton-loader
        transition="fade-transition"
        :max-height="card_height"
        type="card"
      ></v-skeleton-loader>
</template>
<script>
export default {
    computed: {
        card_height() {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return 104
                case 'sm': return 134
                case 'md': return 134
                case 'lg': return 134
                case 'xl': return 184
            }
        }
    }
}
</script>