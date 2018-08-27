<template>
    <div class="header-wrapper">
        <img src="../../assets/logo.png" width="40px" height="40px">
        <a href="" class="login" @click.prevent="showLoginPrompt" v-show="userId === ''">Login</a>
        <div v-show="userId !== ''" class="user">
            <span class="name">hello, {{ userId }}</span>
            <a class="logout">Logout</a>
        </div>
        <i class="icon-cart" @click="goToCart"></i>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userId: ''
        }
    },
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
        transform translateX(680px)
    .login:hover
        color $font-nav-color
    .user
        height 40px
        width 170px
        display flex
        justify-content space-between
        transform translateX(620px)
        .name
            width 100px
            height 100%
            line-height 40px
            font-size $font-size-medium
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            display inline-block
            //vertical-align middle
            box-sizing  border-box
        .logout
            display inline-block
            height 100%
            line-height 40px
            color $font-dark-color
            font-size $font-size-medium-x
            text-decoration none
        .logout:hover
            cursor pointer
            color $font-nav-color
    .icon-cart
        font-size $font-size-large
    .icon-cart:hover
        cursor pointer
</style>

