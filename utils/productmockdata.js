// just to showcase the dummy data that is used and useing fetch we created our oiwn api and then we used in fetch api 

const url = "https://mocki.io/v1/e4027d83-f009-4d43-9537-e3626dfc7acd";
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 2499,
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR9i4j266RhdnkR6WNnKEhJrKbiCoQsBmhAm2dbgbUyAZSRW3E58hDZaD0Ku3XGGgOefmhz_pp0S9zgK0jsk7VnXcKRJXXfj9CFdTaxxNAO-XtBp1TJmCnXiLY",
    rating: 4.5,
    stock: 12,
    description: "Bluetooth over-ear headphones with noise cancellation and 20-hour battery life."
  },
  {
    id: 2,
    name: "Smartwatch Pro",
    category: "Electronics",
    price: 5999,
    image: "https://m.media-amazon.com/images/I/71PpQR2in0L.jpg",
    rating: 4.2,
    stock: 20,
    description: "Track your fitness, heart rate, and notifications on the go."
  },
  {
    id: 3,
    name: "Gaming Mouse RGB",
    category: "Accessories",
    price: 1499,
    image: "https://m.media-amazon.com/images/I/61Ahjsi1iOL.jpg",
    rating: 4.7,
    stock: 30,
    description: "Ergonomic gaming mouse with RGB lighting and 6 programmable buttons."
  },
  {
    id: 4,
    name: "Leather Wallet",
    category: "Fashion",
    price: 999,
    image: "https://m.media-amazon.com/images/I/81WIcyHQ7oL._UY1100_.jpg",
    rating: 4.3,
    stock: 50,
    description: "Genuine leather wallet with multiple compartments and a sleek design."
  },
  {
    id: 5,
    name: "Running Shoes",
    category: "Footwear",
    price: 2899,
    image: "https://www.campusshoes.com/cdn/shop/files/VESPER_VESPER_WHT-MILKY_BLU_07.webp?v=1758174807",
    rating: 4.6,
    stock: 18,
    description: "Lightweight and comfortable shoes ideal for running and workouts."
  },
  {
    id: 6,
    name: "Laptop Backpack",
    category: "Bags",
    price: 1799,
    image: "https://safaribags.com/cdn/shop/files/3_4bde5165-92cd-4305-b571-dea21fe6568e.jpg?v=1707731843",
    rating: 4.4,
    stock: 25,
    description: "Water-resistant backpack with padded laptop compartment and USB charging port."
  },
  {
    id: 7,
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 2199,
    image: "https://m.media-amazon.com/images/I/71poiJ97u9L._UF1000,1000_QL80_.jpg",
    rating: 4.6,
    stock: 40,
    description: "Portable Bluetooth speaker with deep bass and 10-hour battery life."
  },
  
  {
    id: 9,
    name: "Cotton T-Shirt",
    category: "Fashion",
    price: 499,
    image: "https://thehouseofrare.com/cdn/shop/files/MANO-WHITE00346.jpg?v=1719486109&width=375",
    rating: 4.1,
    stock: 80,
    description: "Soft, breathable cotton T-shirt available in multiple colors."
  },
  {
    id: 10,
    name: "LED Monitor 24-inch",
    category: "Electronics",
    price: 9999,
    image: "https://rukminim2.flixcart.com/image/480/640/xif0q/monitor/4/8/a/zeb-a24fhd-led-full-hd-24-2022-zeb-a24fhd-led-zebronics-original-imah32qqezxvhdtg.jpeg?q=90",
    rating: 4.5,
    stock: 15,
    description: "Full HD 24-inch monitor with ultra-slim design and flicker-free technology."
  },
  {
    id: 11,
    name: "Coffee Maker",
    category: "Home Appliances",
    price: 3499,
    image: "https://images.philips.com/is/image/philipsconsumer/vrs_a6f229ac53eb2ad8dcf9e281050310d76783fec6?wid=700&hei=700&$pnglarge$",
    rating: 4.3,
    stock: 22,
    description: "Automatic coffee maker with reusable filter and fast brewing system."
  },
  {
    id: 12,
    name: "Electric Kettle",
    category: "Home Appliances",
    price: 1199,
    image: "https://images.philips.com/is/image/philipsconsumer/vrs_05e438e0ba2f3f5b44bdb70a523281228fb381f1?wid=700&hei=700&$pnglarge$",
    rating: 4.4,
    stock: 33,
    description: "1.8L stainless steel kettle with auto shut-off and 360° swivel base."
  },
  {
    id: 13,
    name: "Book: Atomic Habits",
    category: "Books",
    price: 499,
    image: "https://images.squarespace-cdn.com/content/v1/5a4b6d1f9f07f5d01c10f2b6/e9b992f6-72bf-4cb8-8be5-19bde83e566a/352707224_10159200474907341_8781875447665972430_n.jpg",
    rating: 4.9,
    stock: 100,
    description: "A proven framework for building good habits and breaking bad ones."
  },
  {
    id: 14,
    name: "Sunglasses",
    category: "Fashion",
    price: 899,
    image: "https://m.media-amazon.com/images/I/41Dr9I4x1EL._UY1100_.jpg",
    rating: 4.3,
    stock: 45,
    description: "UV-protected polarized sunglasses with stylish frame."
  },
  {
    id: 15,
    name: "Office Chair",
    category: "Furniture",
    price: 6999,
    image: "https://m.media-amazon.com/images/I/71ClGjocCKL._SX569_.jpg",
    rating: 4.5,
    stock: 12,
    description: "Ergonomic chair with adjustable height and lumbar support."
  },
  {
    id: 16,
    name: "Power Bank 20000mAh",
    category: "Electronics",
    price: 1999,
    image: "https://m.media-amazon.com/images/I/41vBAaU8clL._UF894,1000_QL80_.jpg",
    rating: 4.6,
    stock: 25,
    description: "Fast-charging power bank with dual USB output and LED indicator."
  },
  {
    id: 17,
    name: "Wireless Keyboard & Mouse",
    category: "Accessories",
    price: 2299,
    image: "https://m.media-amazon.com/images/I/71Pp+rzmuwL._SY450_.jpg",
    rating: 4.4,
    stock: 18,
    description: "Compact wireless keyboard and mouse combo with long battery life."
  },
  {
    id: 18,
    name: "Vacuum Cleaner",
    category: "Home Appliances",
    price: 4499,
    image: "https://www.electrolux.in/globalassets/appliances/vacuum-clearner/corded-vacuum/z931/z931-fr-1500x1500.png",
    rating: 4.5,
    stock: 10,
    description: "Lightweight vacuum cleaner with high suction power and dust filter."
  },
  {
    id: 19,
    name: "Book: The Alchemist",
    category: "Books",
    price: 399,
    image: "https://m.media-amazon.com/images/I/617lxveUjYL.jpg",
    rating: 4.8,
    stock: 120,
    description: "A philosophical story about following your dreams and destiny."
  },
  {
    id: 20,
    name: "Wireless Earbuds",
    category: "Electronics",
    price: 2999,
    image: "https://www.edyell.in/wp-content/uploads/2024/10/1.jpg",
    rating: 4.5,
    stock: 30,
    description: "Compact earbuds with touch controls and noise reduction."
  }
];

export default products;
