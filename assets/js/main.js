var app = new Vue({
  el: "#app",

  data: {
    brand: "my brand",
    product: "Socks",
    description: "A pair of warm, fuzzy socks",
    selectedVariant: 0,
    link: "./assets/images/blueSock.png",
    //inventory: 5,
    cart: 0,

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
    }
  },
  methods: {
    addToCart() {
      if (this.inventory !== 0) {
        this.cart += 1;
      } else {
        this.inStock = false;
      }
    },
    removeFromCart() {
      this.cart -= 1;
    },
    updateProduct(index) {
      this.selectedVariant = index;
      console.log(index);
    }
  }
});
