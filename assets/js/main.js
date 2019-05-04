Vue.component("product-review", {
  template: `
<form class="review-form" @submit.prevent="onSubmit">
<p v-if="errors.length">
<b>Please correct the following error(s): </b>
<ul>
<li v-for="error in errors">{{ error }}</li>
</ul>

</p>
<p>
  <label for="name">Name:</label>
  <input id="name" v-model="name">
  </p>
  <p>
  <label for="review">Review:</label>
  <textarea id="review" v-model="review"></textarea>
  </p>
  <p>
  <label for="rating">Rating:</label>
  <select id="rating" v-model.number="rating">
    <option>5</option>
    <option>4</option>
    <option>3</option>
    <option>2</option>
    <option>1</option>
  </select>
  </p>
  <p>
  <input type="submit" value="Submit">
  </p>
  <p>
  <p>Would you recommend this product:</p>
  <label>Yes
  <input type="radio"value="Yes" v-model="recommend">  
  </label>
   <label>No
  <input type="radio"value="No" v-model="recommend">  
  </label>
</form>
`,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommend: null,
      errors: []
    };
  },
  methods: {
    onSubmit() {
      if (this.name && this.rating && this.review && this.recommend) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend,
        };
        this.$emit("review-submitted", productReview);
        this.name = null
        this.review = null
        this.rating = null
        this.recommend = null
      } else {
        if (!this.name) this.errors.push("Name required.")
        if (!this.review) this.errors.push("Review required.")
        if (!this.rating) this.errors.push("Rating required.")
         if (!this.recommend) this.errors.push("Recommend required.")
      }
    }
  }
});




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
  template: `
  <div>
  <div class="product">

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
      <p>Shipping :{{ shipping }}</p>
             
      <div class="color-box"
            v-for="(variant, index) in variants"
            :key="variant.variantId"
            :style="{ backgroundColor: variant.variantColor }"
            @mouseover="updateProduct(index)"
            >
      </div>
          
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
    
 </div>   
 <div class="review">
      <h2>Reviews</h2>
        <p v-if="!reviews.length">There are not reviews yet.</p>
        <ul v-else>
          <li v-for="(review, index) in reviews" :key="index">
          <p>{{ review.name }}</p>
          <p>Rating: {{ review.rating }}</p>
          <p>{{ review.review }}</p>
          <p> Do i recommend this product: {{ review.recommend }}</p>
          </li>
        </ul>
    
         <product-review @review-submitted="addReview"></product-review>   
  </div>
  </div>
  `,
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
      sizes: ["31/34", "35/38", "39/42", "43/46"],
      reviews: []
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
    },
    addReview(productReview) {
      this.reviews.push(productReview);
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
