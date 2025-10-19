const { createApp, ref, computed, toRefs } = Vue

const app = createApp({
    setup() {
        const cart = ref([])
        const premium = ref(true)
        function updateCart(id) {
            cart.value.push(id)
        }
        function removeFromCart(id) {
            const index = cart.value.indexOf(id)
            if (index > -1) {
                cart.value.splice(index, 1)
            }
        }
        const cartCount = computed(() => {
            return cart.value.length
        })
        return {
            cart,
            premium,
            updateCart,
            removeFromCart,
            cartCount
        }
    }
})

app.component('product-display', productDisplay)
app.component('product-details', productDetails)
app.component('review-form', reviewForm)
app.component('review-list',reviewList)

app.mount('#app')