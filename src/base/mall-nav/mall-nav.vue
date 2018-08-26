<template>
    <div class="nav">
        <a href="javascript:void(0);" class="home" @click="backToHome">Home</a>
        <span class="slash"> / </span>
        <a href="javascript:void(0);" class="second-route">{{ currentRoute }}</a>
    </div>
</template>

<script>
export default {
    props: {
        currentRoute: {
            type: String,
            default: ''
        }
    },
    methods: {
        backToHome() {
            this.$router.push('/')
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.nav
    width 100vw
    height 44px
    background-color $background-nav-color
    padding-left 20px
    box-sizing border-box
    display flex
    justify-content flex-start
    align-items center
    .home
        height 44px
        line-height 44px
        font-size $font-size-medium-x
        color $font-light-color
        text-decoration none
        margin-right 5px
    .home:hover
        color $font-nav-color
    .slash
        font-size $font-size-medium-x
        color $font-light-color
        margin-right 5px
    .second-route
        font-size $font-size-medium-x
        color $font-nav-color
        text-decoration none
</style>

