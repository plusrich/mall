<template>
  <div class="home">
      <mall-header @showLogin="showLogin" @displayCart="displayCart"></mall-header>
      <mall-nav currentRoute="Goods"></mall-nav>
      <div class="sort-wrapper">
          <div class="sort">
              <span class="sort-by">Sort by:</span>
              <span class="sort-item" @click="changeDefaultSort" ref="defaultSort">Default</span>
              <span class="sort-item sort-price" @click="changePriceSort" ref="priceSort">Price</span>
              <i :class="{'icon-arrow-up2': ascending, 'icon-arrow-down2': descending}"></i>
          </div>
      </div>
      <div class="goods">
          <div class="filter">
              <h2 class="filter-by">PRICE：</h2>
              <div v-for="(item, index) in filter" :key="index" class="filter-item-wrapper">
                  <a href="javascript:void(0);" :class="['filter-item', selectedFilter === index ? 'selected-filter-item' : '']" @click="changeFilter(index)">{{ item }}</a>
                  <span :class="['filter-left-border', selectedFilter === index ? 'selected-filter-border' : '']"></span>
              </div>
          </div>
          <goods-list ref="goodsList" :data="goods" @addCart="addCart"></goods-list>
      </div>
      <mall-footer></mall-footer>
      <modal ref="modal" class="modal">
          <el-form slot="content" class="content">
              <h2 class="login-title">Login in</h2>
              <span v-if="loginErrorText !== ''" class="login-error">{{ loginErrorText }}</span>
              <el-form-item class="input-wrapper">
                  <el-input type="text" class="input" v-model="user">
                      <i slot="prefix" class="icon-user"></i>
                  </el-input>
              </el-form-item>
              <el-form-item class="input-wrapper">
                  <el-input type="password" class="input" v-model="pwd">
                      <i slot="prefix" class="icon-lock"></i>
                  </el-input>
              </el-form-item>
          </el-form>
          <el-button slot="button" type="primary" class="button" @click="sendLoginRequest">登陆</el-button>
      </modal>
      <modal ref="loginModal">
          <p slot="content">请先登陆</p>
      </modal>
  </div>
</template>

<script>
import MallFooter from 'base/mall-footer/mall-footer'
import MallHeader from 'base/mall-header/mall-header'
import MallNav from 'base/mall-nav/mall-nav'
import Modal from 'base/modal/modal'
import GoodsList from 'components/goods-list'
import {login, getGoods, sortByPrice, filterByPrice} from 'common/js/api.js'
import {mapGetters, mapMutations} from 'vuex'

export default {
    data () {
        return {
            user: '',
            pwd: '',
            loginErrorText: '',
            goods: [],
            selectedFilter: 0,
            ascending: true,
            descending: false,
            filter: ['All', '0.00 - 100.00', '100.00 - 500.00', '500.00 - 1000.00', '1000.00 - 5000.00']
        }
    },
    computed: {
        ...mapGetters([
            'id',
            'cartList'
        ])
    },
    async mounted() {
        let obj = await getGoods()
        this.goods = obj.products
    },
    methods: {
        showLogin() {
            this.$refs.modal.show()
        },
        displayCart() {
            if (this.id === '') {
                this.$refs.loginModal.show()
                return
            }
            this.$router.push('/cart')
        },
        addCart(item) {
            if (this.id === '') {
                this.$refs.loginModal.show()
                return
            }
            let index = this.cartList.findIndex((g) => {
                return g._id === item._id
            })
            let p = Object.assign({}, this.cartList[index])
            p.quantity += 1
            p.subtotal += p.price
            p.checked = true
            this.setCartList(p)
            this.$router.push('/cart')
        },
        initializeCartList(list) {
            for (var i = 0;i < list.length;i++) {
                let p = Object.assign({}, list[i])
                p['quantity'] = 0
                p['subtotal'] = 0
                p['checked'] = false
                this.setCartList(p)
            }
        },
        async changeFilter(index) {
            this.selectedFilter = index
            //let obj = await filterByPrice()
            if (index === 0) {
                let obj = await getGoods()
                this.goods = obj.products
            } else {
                let range = this.filter[index]
                let min = range.match(/\d+\.\d+(?=\s+-\s+)/)
                min = Number(min[0])
                let max = range.match(/(?<=\s+\-\s+)\d+\.\d+/)
                max = Number(max[0])
                let obj = await filterByPrice(min, max)
                this.goods = obj.data
            }
        },
        async changeDefaultSort() {
            this.$refs.defaultSort.style.color = 'rgb(238, 122, 35)'
            this.$refs.priceSort.style.color = 'rgb(0, 0, 0)'
            let obj = await getGoods()
            this.goods = obj.products
        },
        async changePriceSort() {
            this.ascending = !this.ascending
            this.descending = !this.descending
            this.$refs.defaultSort.style.color = 'rgb(0, 0, 0)'
            this.$refs.priceSort.style.color = 'rgb(238, 122, 35)'
            let sortFlag = this.ascending === true ? -1 : 1
            let obj = await sortByPrice(sortFlag)
            this.goods = obj.data
        },
        async sendLoginRequest() {
            let user = this.user
            let pwd = this.pwd
            let res = await login(user, pwd)
            if (res.status !== 1) {          
                this.loginErrorText = res.messgae
                this.user = ''
                this.pwd = ''
                return
            }
            this.$refs.modal.hide()
            this.loginErrorText = ''
            this.user = ''
            this.pwd = ''
            this.setId(res.user._id)
            this.setName(res.user.userName)
            this.initializeCartList(this.goods)
        },
        ...mapMutations({
            setId: 'SET_ID',
            setName: 'SET_NAME',
            setCartList: 'SET_CARTLIST'
        })
    },
    components: {
        MallFooter,
        MallHeader,
        Modal,
        GoodsList,
        MallNav
    }
}
</script>

<style lang="stylus" scoped>
@import '../common/stylus/style.css'
@import '../common/stylus/variable'

.home
    padding 0
    margin 0
    .sort-wrapper
        width 100vw
        height 80px
        background-color $background-content-color
        text-align center
        padding-top 30px
        box-sizing border-box
        .sort
            width 98vw
            height 44px
            background-color $background-color
            margin 0 auto
            display flex
            justify-content flex-end
            align-items center
            padding-right 40px
            box-sizing border-box
            .sort-by, .sort-item
                height 30px
                line-height 30px
                font-size $font-size-medium
                display inline-block
                margin-right 15px
            .sort-item
                color $font-emphasize-color
            .sort-price
                margin-right 0
                color $font-black
            .sort-item:hover
                color $font-emphasize-color
                cursor pointer
    .goods
        width 100vw
        box-sizing border-box
        padding 20px 20px
        background-color $background-content-color
        display flex
        justify-content space-between
        .filter
            width 20%
            height 100%
            box-sizing border-box
            display inline-block
            .filter-by
                font-size $font-size-medium
                letter-spacing 2px
                text-align left
                margin-bottom 0
            .filter-item-wrapper
                margin-top 20px
                width 130px
                position relative
                height 26px
                .filter-item
                    text-decoration none
                    color $font-dark-color
                    text-align left
                    transition transform .5s
                    width 100%
                    height 26px
                    line-height 26px
                    display inline-block
                .selected-filter-item
                    transform translateX(20px)
                .filter-left-border
                    display inline-block
                    height 26px
                    position absolute
                    left 0
                    top 0
                .selected-filter-border
                    width 2px
                    background-color $font-emphasize-color
                .filter-item:hover
                    color $font-emphasize-color
                    transform translateX(20px)
                .filter-item:hover + .filter-left-border
                    width 2px
                    background-color $font-emphasize-color
                    
    .modal
        .content
            width 70%
            margin 30px auto 0
            .login-title
                margin-bottom .5em
                font-size $font-size-medium-x
                text-align left
            .login-error
                color $font-nav-color
                text-align left
                display inline-block
                width 100%
            .input-wrapper
                .input
                    font-size 16px
                    .icon-lock
                        display inline-block
                        margin 0 3px
        .button
            width 70%
</style>
