const productDisplay = {
    template:
        /*html*/
        `
    <div class="product-display">
            <div class="product-container">
                <div class="product-image">
                    <img :src="image">
                </div>
            </div>
            <div class="product-info">
                <h1>{{title}}</h1>
                <p v-if="inventory > 10">In Stock</p>
                <p v-else-if="inventory <= 10 && inventory > 0">Almost out of Stock</p>
                <p v-else>Out of Stock</p>
                <p>Shipping: {{shipping}}</p>
                <product-details :details="details"></product-details>
                <div v-for="(variant,index) in variants" :key="variant.id" @mouseover="updateVariant(index)"
                    class="color-circle" :style="{backgroundColor: variant.color}">
   
                </div>
                <button class="button" :disabled='!inStock' @click="addToCart" :class="{disabledButton: !inStock}">Add To
                    Cart</button>
                <button class="button" @click="removeFromCart">Remove From Cart</button>
            </div>
            <review-list v-if="reviews.length" :reviews="reviews"></review-list>
            <review-form @review-submitted="addReview"></review-form>
        </div>
       
    `,
    props: {
        premium: Boolean
    },
    setup(props, { emit }) {
        const shipping = computed(()=>{
            if (props.premium){
                return 'Free'
            } else {
                return 30
            }
           
        })
        const product = ref('Boots')
        const brand = ref('SE 331')
        // const image = ref('./assets/images/socks_green.jpg')
        // const inStock = ref(true)
        const inventory = ref(100)
        const details = ref([
            '50% cotton',
            '30% wool',
            '20% polyester'
        ])
        const variants = ref([
            { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
            { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 }
        ])
        const selectedVariant = ref(0)
        const cart = ref(0)
        const reviews = ref([])
        function updateVariant(index) {
            selectedVariant.value = index;
        }
        const image = computed(() => {
            return variants.value[selectedVariant.value].image
        })
        const inStock = computed(() => {
            return variants.value[selectedVariant.value].quantity
        })
        function addToCart() {
            emit('add-to-cart', variants.value[selectedVariant.value].id)
        }
        function removeFromCart() {
            emit('remove-from-cart', variants.value[selectedVariant.value].id)
        }
        function addReview(review){
            reviews.value.push(review)
        }
        const title = computed(() => {
            return brand.value + ' ' + product.value
        })
        function updateImage(variantImage) {
            image.value = variantImage
        }
        return {
            title,
            image,
            inStock,
            inventory,
            details,
            variants,
            addToCart,
            removeFromCart,
            updateImage,
            updateVariant,
            shipping,
            reviews,
            addReview
        }
    }
}