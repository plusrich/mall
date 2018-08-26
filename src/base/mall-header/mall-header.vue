<template>
    <div class="header-wrapper">
        <img src="../../assets/logo.png" width="40px" height="40px">
        <a href="" class="login" @mouseenter="changeLoginColor" @mouseleave="revertLoginColor" @click.prevent="showLoginPrompt">Login</a>
        <i class="icon-cart" @click="goToCart"></i>
    </div>
</template>

<script>
export default {
    methods: {
        changeLoginColor(e) {
            e.target.classList.add('login-hover')
        },
        revertLoginColor(e) {
            e.target.classList.remove('login-hover')
        },
        showLoginPrompt() {
            this.$emit('showLogin')
        },
        goToCart() {
            this.$router.push('/cart')
        }
    }
}
</script>


<style lang="stylus">
@import '../../common/stylus/variable'
@import '../../common/stylus/style.css'

.header-wrapper
    position relative
    height 70px
    width 100vw
    max-width 100vw
    overflow hidden
    padding 0 20px
    box-sizing border-box
    display flex
    justify-content space-between
    align-items center
    .login
        color $font-dark-color
        font-size $font-size-medium-x
        text-decoration none
    .login-hover
        color $font-nav-color
    .icon-cart
        font-size $font-size-medium-x
    .icon-cart:hover
        cursor pointer
</style>

