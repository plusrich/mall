import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = (resolve) => {
  import('@/components/home').then((module) => {
    resolve(module)
  })
}

const Cart = (resolve) => {
  import('@/components/cart').then((module) => {
    resolve(module)
  })
}

const Address = (resolve) => {
  import('@/components/address').then((module) => {
    resolve(module)
  })
}

const OrderConfirm = (resolve) => {
  import('@/components/order-confirm').then((module) => {
    resolve(module)
  })
}

const OrderSuccess = (resolve) => {
  import('@/components/order-success').then((module) => {
    resolve(module)
  })
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/orderConfirm',
      name: 'OrderConfirm',
      component: OrderConfirm
    },
    {
      path: '/orderSuccess',
      name: 'OrderSuccess',
      component: OrderSuccess
    }
  ]
})
