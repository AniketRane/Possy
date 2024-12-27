import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
    state: () => ({
      "categories": [
        { "id": 1, "name": "Appetizers" },
        { "id": 2, "name": "Salads" },
        { "id": 3, "name": "Main Courses" },
        { "id": 4, "name": "Desserts" },
        { "id": 5, "name": "Beverages" },
        { "id": 6, "name": "Pizza" },
        { "id": 7, "name": "Burgers" },
        { "id": 8, "name": "Pasta" },
        { "id": 9, "name": "Sandwiches" },
        { "id": 10, "name": "Seafood" }
      ],
      "items": [
        { "id": 1, "name": "Spring Rolls", "price": 150, "shortcode": "SPR", "category_id": 1, "type": "veg" },
        { "id": 2, "name": "Mozzarella Sticks", "price": 180, "shortcode": "MOZ", "category_id": 1, "type": "veg" },
        { "id": 3, "name": "Stuffed Mushrooms", "price": 220, "shortcode": "STM", "category_id": 1, "type": "veg" },
        { "id": 4, "name": "Garlic Bread", "price": 100, "shortcode": "GBR", "category_id": 1, "type": "veg" },
        { "id": 5, "name": "Bruschetta", "price": 140, "shortcode": "BRU", "category_id": 1, "type": "veg" },
        
        { "id": 6, "name": "Caesar Salad", "price": 250, "shortcode": "CSS", "category_id": 2, "type": "veg" },
        { "id": 7, "name": "Greek Salad", "price": 270, "shortcode": "GKS", "category_id": 2, "type": "veg" },
        { "id": 8, "name": "Caprese Salad", "price": 300, "shortcode": "CPS", "category_id": 2, "type": "veg" },
        { "id": 9, "name": "Cobb Salad", "price": 350, "shortcode": "CBS", "category_id": 2, "type": "non-veg" },
        { "id": 10, "name": "Garden Salad", "price": 200, "shortcode": "GDS", "category_id": 2, "type": "veg" },
        
        { "id": 11, "name": "Grilled Chicken", "price": 400, "shortcode": "GRC", "category_id": 3, "type": "non-veg" },
        { "id": 12, "name": "Beef Stroganoff", "price": 500, "shortcode": "BFS", "category_id": 3, "type": "non-veg" },
        { "id": 13, "name": "Lamb Chops", "price": 550, "shortcode": "LCH", "category_id": 3, "type": "non-veg" },
        { "id": 14, "name": "Ratatouille", "price": 450, "shortcode": "RTT", "category_id": 3, "type": "veg" },
        { "id": 15, "name": "Stuffed Bell Peppers", "price": 400, "shortcode": "SBP", "category_id": 3, "type": "veg" },
        
        { "id": 16, "name": "Chocolate Cake", "price": 200, "shortcode": "CHC", "category_id": 4, "type": "veg" },
        { "id": 17, "name": "Cheesecake", "price": 250, "shortcode": "CCH", "category_id": 4, "type": "veg" },
        { "id": 18, "name": "Tiramisu", "price": 300, "shortcode": "TMS", "category_id": 4, "type": "veg" },
        { "id": 19, "name": "Ice Cream Sundae", "price": 150, "shortcode": "ICS", "category_id": 4, "type": "veg" },
        { "id": 20, "name": "Fruit Tart", "price": 180, "shortcode": "FRT", "category_id": 4, "type": "veg" },
        
        { "id": 21, "name": "Coke", "price": 50, "shortcode": "CKE", "category_id": 5, "type": "veg" },
        { "id": 22, "name": "Lemonade", "price": 60, "shortcode": "LEM", "category_id": 5, "type": "veg" },
        { "id": 23, "name": "Iced Tea", "price": 70, "shortcode": "ICT", "category_id": 5, "type": "veg" },
        { "id": 24, "name": "Coffee", "price": 80, "shortcode": "COF", "category_id": 5, "type": "veg" },
        { "id": 25, "name": "Smoothie", "price": 120, "shortcode": "SMT", "category_id": 5, "type": "veg" },
        
        { "id": 26, "name": "Margherita", "price": 250, "shortcode": "MGP", "category_id": 6, "type": "veg", "variants": [ { "id": 1, "name": "Small", "price": 200 }, { "id": 2, "name": "Medium", "price": 250 }, { "id": 3, "name": "Large", "price": 300 } ] },
        { "id": 27, "name": "Pepperoni", "price": 300, "shortcode": "PPR", "category_id": 6, "type": "non-veg", "variants": [ { "id": 4, "name": "Small", "price": 250 }, { "id": 5, "name": "Medium", "price": 300 }, { "id": 6, "name": "Large", "price": 350 } ] },
        { "id": 28, "name": "BBQ Chicken", "price": 350, "shortcode": "BQC", "category_id": 6, "type": "non-veg", "variants": [ { "id": 7, "name": "Small", "price": 300 }, { "id": 8, "name": "Medium", "price": 350 }, { "id": 9, "name": "Large", "price": 400 } ] },
        { "id": 29, "name": "Veggie", "price": 280, "shortcode": "VEG", "category_id": 6, "type": "veg", "variants": [ { "id": 10, "name": "Small", "price": 230 }, { "id": 11, "name": "Medium", "price": 280 }, { "id": 12, "name": "Large", "price": 330 } ] },
        { "id": 30, "name": "Hawaiian", "price": 320, "shortcode": "HWN", "category_id": 6, "type": "non-veg", "variants": [ { "id": 13, "name": "Small", "price": 270 }, { "id": 14, "name": "Medium", "price": 320 }, { "id": 15, "name": "Large", "price": 370 } ] },
        
        { "id": 31, "name": "Cheeseburger", "price": 150, "shortcode": "CHB", "category_id": 7, "type": "non-veg" },
        { "id": 32, "name": "Veggie Burger", "price": 120, "shortcode": "VGB", "category_id": 7, "type": "veg" },
        { "id": 33, "name": "Bacon Burger", "price": 180, "shortcode": "BCB", "category_id": 7, "type": "non-veg" },
        { "id": 34, "name": "Mushroom Swiss Burger", "price": 190, "shortcode": "MSB", "category_id": 7, "type": "veg" },
        { "id": 35, "name": "Chicken Burger", "price": 160, "shortcode": "CHN", "category_id": 7, "type": "non-veg" },
        
        { "id": 36, "name": "Spaghetti Bolognese", "price": 200, "shortcode": "SPB", "category_id": 8, "type": "non-veg" },
        { "id": 37, "name": "Fettuccine Alfredo", "price": 220, "shortcode": "FTA", "category_id": 8, "type": "veg" },
        { "id": 38, "name": "Penne Arrabbiata", "price": 240, "shortcode": "PNA", "category_id": 8, "type": "veg" },
        { "id": 39, "name": "Lasagna", "price": 260, "shortcode": "LSG", "category_id": 8, "type": "non-veg" },
        { "id": 40, "name": "Pesto Pasta", "price": 230, "shortcode": "PST", "category_id": 8, "type": "veg" },
        
        { "id": 41, "name": "Club Sandwich", "price": 150, "shortcode": "CLS", "category_id": 9, "type": "non-veg" },
        { "id": 42, "name": "BLT", "price": 140, "shortcode": "BLT", "category_id": 9, "type": "non-veg" },
        { "id": 43, "name": "Chicken Caesar Wrap", "price": 160, "shortcode": "CCW", "category_id": 9, "type": "non-veg" },
        { "id": 44, "name": "Grilled Cheese", "price": 130, "shortcode": "GRC", "category_id": 9, "type": "veg" },
        { "id": 45, "name": "Reuben Sandwich", "price": 170, "shortcode": "RBS", "category_id": 9, "type": "non-veg" },
        
        { "id": 46, "name": "Grilled Salmon", "price": 500, "shortcode": "GRS", "category_id": 10, "type": "non-veg" },
        { "id": 47, "name": "Shrimp Scampi", "price": 450, "shortcode": "SSP", "category_id": 10, "type": "non-veg" },
        { "id": 48, "name": "Fish Tacos", "price": 300, "shortcode": "FST", "category_id": 10, "type": "non-veg" },
        { "id": 49, "name": "Lobster Bisque", "price": 550, "shortcode": "LBS", "category_id": 10, "type": "non-veg" },
        { "id": 50, "name": "Crab Cakes", "price": 400, "shortcode": "CRB", "category_id": 10, "type": "non-veg" }
      ]
    
    }),
    actions: {
      
    },
})