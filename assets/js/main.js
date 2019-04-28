Vue.component("product-details", {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
  `
});

Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `<div class="product">
        <div class="product-image">
          <img :src="image" :alt="description" />
        </div>

        <div class="product-info">
          <h1>{{ brand }} {{ product }}</h1>

          <p v-if="inStock">In Stock</p>

          <p v-else-if="inStock > 0 && inStock < 10">
            Almost sold Out, {{ inventory }} in stock
          </p>
          <p v-else :style="{ textDecoration: linethrough}">Out of Stock</p>
          <p>Shipping : {{ shipping }}</p>
          <div
            class="color-box"
            v-for="(variant, index) in variants"
            :key="variant.variantId"
            :style="{ backgroundColor: variant.variantColor }"
            @mouseover="updateProduct(index)"
          ></div>

          <button
            @click="addToCart"
            :disabled="!inStock"
            :class="{ disabledButton: !inStock}"
          >
            Add to Cart
          </button>

          <button @click="removeFromCart" class="">Remove</button>
          
          <p>{{ description }}</p>
          <a :href="link" target="_blank">More products like this</a>
        </div>
      </div>`,
  data() {
    return {
      //datav goes here
      brand: "my brand",
      product: "Socks",
      description: "A pair of warm, fuzzy socks",
      selectedVariant: 0,
      link: "./assets/images/blueSock.png",
      textDecoration: "text-decoration",
      linethrough: "line-through",
      details: ["80% cotton", "20%polyester", "Gender-neutral"],
      variants: [
        {
          variantId: "0022",
          variantColor: "green",
          variantImage: "./assets/images/greenSock.png",
          variantQuantity: 10
        },
        {
          variantId: "0023",
          variantColor: "blue",
          variantImage: "./assets/images/blueSock.png",
          variantQuantity: 0
        }
      ],
      sizes: ["31/34", "35/38", "39/42", "43/46"]
    };
  },
  computed: {
    title() {
      return this.brand + "" + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    shipping() {
      if (this.premium) {
        return "Free";
      }
      return 2.99;
    }
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId);
    },
    removeFromCart() {
      this.$emit(
        "remove-from-cart",
        this.variants[this.selectedVariant].variantId
      );
    },
    updateProduct(index) {
      this.selectedVariant = index;
      console.log(index);
    }
  }
});

var app = new Vue({
  el: "#app",
  data: {
    cart: [],
    premium: false
  },
  methods: {
    updateCart(id) {
      if (this.inStock !== 0) {
        this.cart.push(id);
      } else {
        this.inStock = false;
      }
    },
    removeItem(id) {
      this.cart.pop(id);
    }
  }
});
