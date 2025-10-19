const productDetails = {
    template:
        /*html*/
        `
    <div class="product-details">
        <h3>Details</h3>
        <ul>
            <li v-for="detail in details" :key="detail">{{detail}}</li>
        </ul>
    </div>
    `,
    props: {
        details: {
            type: Array,
            required: true
        }
    }
}