<template>
      <v-skeleton-loader class="ma-md-2 ma-1"
        :loading="true"
        transition="fade-transition"
        :max-height="card_height"
        :width="card_width"
        type="card"
      ></v-skeleton-loader>
</template>
<script>
export default {
    computed: {
        card_width () {
            switch (this.$vuetify.breakpoint.name) {
            case 'xs': return 110
            case 'sm': return 110
            case 'md': return 205
            case 'lg': return 205
            case 'xl': return 205
            }
        },
        card_height() {
            switch (this.$vuetify.breakpoint.name) {
            case 'xs': return 105
            case 'sm': return 105
            case 'md': return 166
            case 'lg': return 166
            case 'xl': return 166
            }
        }
    }
}
</script>