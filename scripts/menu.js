// Menu Data
const menuItems = [
    {
        id: 1,
        name: "Classic Chicken Shawarma",
        price: 89.99,
        category: "chicken",
        description: "Marinated chicken with garlic sauce, pickles, and fries wrapped in fresh pita",
        tags: ["chicken", "popular"],
        image: "assets/images/shawarma1.png"
    },
    {
        id: 2,
        name: "Spicy Beef Shawarma",
        price: 94.99,
        category: "beef",
        description: "Tender beef strips with hot sauce, hummus, and fresh vegetables",
        tags: ["beef", "spicy"],
        image: "assets/images/shawarma2.png"
    },
    {
        id: 3,
        name: "Premium Lamb Shawarma",
        price: 109.99,
        category: "lamb",
        description: "Succulent lamb with tahini, mint yogurt, and grilled vegetables",
        tags: ["lamb", "premium"],
        image: "assets/images/shawarma3.png"
    },
    {
        id: 4,
        name: "Falafel Shawarma",
        price: 79.99,
        category: "vegetarian",
        description: "Crispy falafel with tahini, salad, and pickled turnips",
        tags: ["vegetarian", "vegan"],
        image: "assets/images/shawarma4.png"
    },
    {
        id: 5,
        name: "Mix Grill Shawarma",
        price: 119.99,
        category: "beef",
        description: "Combination of chicken and beef with special house sauce",
        tags: ["beef", "chicken", "special"],
        image: "assets/images/shawarma5.png"
    },
    {
        id: 6,
        name: "Cheese Shawarma",
        price: 99.99,
        category: "chicken",
        description: "Chicken shawarma with melted mozzarella and cheddar cheese",
        tags: ["chicken", "cheese"],
        image: "assets/images/shawarma3.png"
    }
];

// Load Menu Items
function loadMenuItems(category = 'all') {
    const menuContainer = document.getElementById('menuItems');
    menuContainer.innerHTML = '';
    
    const filteredItems = category === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === category);
    
    filteredItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item fade-in-up';
        menuItem.innerHTML = `
            <div class="menu-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <h3 class="menu-item-title">${item.name}</h3>
                    <span class="menu-item-price">R ${item.price.toFixed(2)}</span>
                </div>
                <p class="menu-item-description">${item.description}</p>
                <div class="menu-item-tags">
                    ${item.tags.map(tag => `<span class="tag ${tag}">${tag}</span>`).join('')}
                </div>
                <button class="btn btn-primary add-to-cart" data-id="${item.id}">
                    Add to Order
                </button>
            </div>
        `;
        menuContainer.appendChild(menuItem);
    });
    
    // Add event listeners to add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = parseInt(e.target.dataset.id);
            const item = menuItems.find(i => i.id === itemId);
            addToCart(item);
        });
    });
}

// Filter Menu Items
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        e.target.classList.add('active');
        
        // Load filtered items
        const category = e.target.dataset.category;
        loadMenuItems(category);
    });
});