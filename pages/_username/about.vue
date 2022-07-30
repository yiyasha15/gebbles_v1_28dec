<template>
    <v-app>
    </v-app>
</template>
<script>
export default {
    head() {
        return {
            title: this.artist.username,     //do not miss "this"
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'What you need to know about this artist #' + this.artist.name
                }
            ]
        }
    },
    scrollToTop: true,
    created(){
        this.$router.push('/'+ this.$props.artist.username)
    },
    // layout: 'username',
    props: ["artist"],
    
    
}
</script>
<style scoped>
</style>