const { Product } = require('../model/Products');

// Function to generate unique product ID with 'ST' prefix and 6 unique digits
function generateUniqueProductId() {
    const randomNumber = Math.floor(100000 + Math.random() * 900000); // Generate random 6-digit number
    return `ST${randomNumber}`;
}

exports.createProduct = async (req, res) => {
    try {
        // Generate unique product ID with 'ST' prefix and 6 unique digits
        let productId = generateUniqueProductId();
        // Ensure the generated product ID does not already exist in the database
        while (await Product.findOne({ productId })) {
            productId = generateUniqueProductId(); // Regenerate ID if it already exists
        }

        req.body.productId = productId; // Assign the generated productId to the request body
        const product = new Product(req.body);

        const doc = await product.save();
        res.status(201).json({
            success: true,
            data: doc
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            success: false,
            data: "Internal server error"
        });
    }
};

exports.fetchAllProducts = async (req, res) => {
    try {
        const { searchQuery, category, color, size, productType, material, price, page = 1, pageSize } = req.query;
        const filter = {};

        if (category) {
            const categories = category.split(',');
            filter.category = { $in: categories };
        }
        if (color) {
            const colors = color.split(',');
            filter['color.name'] = { $in: colors };
        }
        if (size) {
            const sizes = size.split(',');
            filter['size.sizeName'] = { $in: sizes };
        }
        if (productType) {
            const productTypes = productType.split(',');
            filter.productType = { $in: productTypes };
        }
        if (material) {
            const materials = material.split(',');
            filter.material = { $in: materials };
        }

        const query = {
            ...filter, // Add other filters
            $or: [
                { title: { $regex: `.*${searchQuery}.*`, $options: 'i' } },
                { category: { $regex: `.*${searchQuery}`, $options: 'i' } },
                { productId: { $regex: `.*${searchQuery}`, $options: 'i' } },
                { productType: { $in: [new RegExp(searchQuery, 'i')] } },
                { 'color.name': { $regex: `.*${searchQuery}.*`, $options: 'i' } },
                { material: { $in: [new RegExp(searchQuery, 'i')] } }
            ]
        }

        const skip = (page - 1) * pageSize;

        let productsData;

        if (price === 'High to Low') {
            productsData = await Product.find(query)
                .sort({ price: -1 }) // Sort by price descending
                .skip(skip)
                .limit(parseInt(pageSize));
        } else if (price === 'Low to High') {
            productsData = await Product.find(query)
                .sort({ price: 1 }) // Sort by price ascending
                .skip(skip)
                .limit(parseInt(pageSize));
        } else {
            productsData = await Product.find(query)
                .skip(skip)
                .limit(parseInt(pageSize));
        }

        const totalProducts = await Product.countDocuments(query);

        res.status(200).json({
            success: true,
            data: productsData,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalProducts / pageSize)
        });

    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            success: false,
            data: "Internal server error"
        });
    }
};

exports.fetchProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findOne({ productId: id });
        res.status(200).json({
            success: true,
            data: product
        });
    } catch (err) {
        console.log(err.message);

        res.status(500).json({
            success: false,
            data: "Internal server error"
        });
    }
};

exports.fetchPerticularProductsByIds = async (req, res) => {
    try {
        // Extract product details from the request body
        const productsInCart = req.body;

        // Extract product IDs from the array of objects
        const productIds = productsInCart.map(item => {
            // Extract the actual product ID from the key
            return Object.values(item)[0];
        });

        // Find products that match the provided product IDs
        const products = await Product.find({ productId: { $in: productIds } });

        // Filter products based on available stock for each variation (color and size)
        const availableProducts = products.filter(product => {
            const productId = product.productId;
            const cartItem = productsInCart.find(item => Object.keys(item)[0] === productId);

            if (!cartItem) return false;

            const colorr = cartItem.color;
            const sizee = cartItem.size;
            const amount = parseInt(cartItem.amount);

            // Find the corresponding color variation
            const colorVariation = product.color.find(color => color.name === colorr);
            if (!colorVariation) return false;

            // Find the corresponding size variation
            const sizeVariation = product.size.find(size => size.sizeName === sizee);
            if (!sizeVariation) return false;

            // Check if the quantity in cart is less than or equal to available stock
            return amount <= Math.min(colorVariation.stock, sizeVariation.stock);
        });

        res.status(200).json({
            success: true,
            data: availableProducts
        });

    } catch (err) {
        console.log(err.message);

        res.status(500).json({
            success: false,
            data: "Internal server error"
        });
    }
};

exports.fetchProductsByIds = async (req, res) => {
    try {
        // Extract product IDs and quantities from the request body
        const { productIds } = req.body;

        // Find products that match the provided product IDs
        const products = await Product.find({ productId: { $in: productIds } });

        // Filter products based on available stock for each variation (color and size)
        const availableProducts = products.filter(product => product.stock >= 1);

        res.status(200).json({
            success: true,
            data: availableProducts
        });

    } catch (err) {
        console.log(err.message);

        res.status(500).json({
            success: false,
            data: "Internal server error"
        });
    }
};

exports.exchangeRate = async (req, res) => {
    try {

        const { currency } = req.query;

        const fetch = await import('node-fetch');

        const response = await fetch.default(`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/pair/USD/${currency}`);

        if (!response.ok) {
            console.error('Failed to fetch exchange rates');
            return res.status(500).json({
                success: false,
                data: "Internal server error"
            });
        }

        const data = await response.json();

        if (data.result = "success") {
            res.status(200).json({
                success: true,
                data: {
                    base_code: data.base_code,
                    target_code: data.target_code,
                    conversion_rate: data.conversion_rate,
                }
            });
        } else {
            console.log("Exchange rate API response failed");

            res.status(500).json({
                success: false,
                data: "Internal server error"
            });
        }

    } catch (error) {
        console.log(err.message);

        res.status(500).json({
            success: false,
            data: "Internal server error"
        });
    }
}


// depricated 
exports.newProducts = async (req, res) => {
    try {
        const newProducts = await Product.find({ isNewProduct: true });

        res.status(200).json({
            success: true,
            data: newProducts
        });

    } catch (error) {
        console.log(err.message);
        res.status(500).json({
            success: false,
            data: "Internal server error"
        });
    }
}

exports.updateProducts = async (req, res) => {
    const { productId } = req.params;
    const updateData = req.body;
    try {
        // Find the product by its productId and update it
        const updatedProduct = await Product.findOneAndUpdate(
            { productId: productId },
            { $set: updateData },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(200).json({ success: false, data: 'Product not exist' });
        }

        return res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ success: false, data: 'Internal server error' });
    }
}

exports.updateStock = async (req, res) => {
    try {
        const { productId, color, size, amount, action } = req.body;

        // Find the product in the database
        const product = await Product.findOne({ productId });

        if (!product) {
            return res.status(404).json({
                success: false,
                data: "Product not found"
            });
        }

        // Update stock based on the action
        if (action === "increase") {
            product.stock += amount;

            const colorVariant = product.color.find(c => c.name === color);
            if (colorVariant) colorVariant.stock += amount;

            const sizeVariant = product.size.find(s => s.sizeName === size);
            if (sizeVariant) sizeVariant.stock += amount;
        } else if (action === "decrease") {
            product.stock -= amount;

            const colorVariant = product.color.find(c => c.name === color);
            if (colorVariant) colorVariant.stock -= amount;

            const sizeVariant = product.size.find(s => s.sizeName === size);
            if (sizeVariant) sizeVariant.stock -= amount;
        } else {
            return res.status(400).json({
                success: false,
                data: "Invalid action. Action must be 'increase' or 'decrease'."
            });
        }

        // Save the updated product back to the database
        await product.save();

        // Respond with success
        res.status(200).json({
            success: true,
            data: "Stock updated successfully"
        });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            data: "Internal Server Error"
        });
    }
}

exports.searchProduct = async (req, res) => {
    try {
        const { searchQuery, page = 1, pageSize = 5 } = req.query;

        // Constructing a MongoDB query to search across multiple fields
        const query = {
            $or: [
                { title: { $regex: `.*${searchQuery}.*`, $options: 'i' } },
                { category: { $regex: `.*${searchQuery}`, $options: 'i' } },
                { productId: { $regex: `.*${searchQuery}`, $options: 'i' } },
                { productType: { $in: [new RegExp(searchQuery, 'i')] } },
                { 'color.name': { $regex: `.*${searchQuery}.*`, $options: 'i' } },
                { material: { $in: [new RegExp(searchQuery, 'i')] } }
            ]
        };

        // Pagination
        const limit = parseInt(pageSize);
        const skip = (parseInt(page) - 1) * limit;

        // Querying products based on the constructed query
        const products = await Product.find(query)
            .limit(limit)
            .skip(skip);

        if (products.length === 0) {
            // If no products match the query, send a custom error message
            return res.status(200).json({
                success: false,
                data: 'No products found matching the query.'
            });
        }

        res.status(200).json({
            success: true,
            data: products
        });

    } catch (err) {
        console.log(err.message);

        res.status(500).json({
            success: false,
            data: "Internal server error"
        });
    }
}

exports.isAvailable = async (req, res) => {
    try {
        const { productId, color, size } = req.body;

        const product = await Product.findOne({ productId });

        // Find the color object with the specified name
        const selectedColor = product.color.find(c => c.name === color);

        if (!selectedColor) {
            return res.status(200).json({
                success: false,
                data: 0,
                message: 'Color not available for this product'
            });
        }

        // Find the size object with the specified sizeName
        const selectedSize = product.size.find(s => s.sizeName === size);

        if (!selectedSize) {
            return res.status(200).json({
                success: false,
                data: 0,
                message: 'Size not available for this product'
            });
        }

        if (!product) {
            return res.status(200).json({
                success: false,
                data: 'Product not found'
            });
        }

        const availableQty = Math.min(selectedColor.stock, selectedSize.stock);

        res.status(200).json({
            success: true,
            data: availableQty,
            currentPrice: product.price
        });
    } catch (err) {
        console.log(err.message);


        res.status(500).json({
            success: false,
            data: "Internal server error"
        });
    }
}

// Dummy data generation function
exports.generateDummyProducts = async (req, res) => {
    const dummyProducts = [];
    try {
        for (let i = 1; i <= 10; i++) {
            // Generate unique product ID with 'ST' prefix and 6 unique digits
            let productId = generateUniqueProductId();
            // Ensure the generated product ID does not already exist in the database
            while (await Product.findOne({ productId })) {
                productId = generateUniqueProductId(); // Regenerate ID if it already exists
            }
            dummyProducts.push({
                productId: productId,
                title: `Product ${i}`,
                price: Math.floor(Math.random() * 100) + 1, // Random price between 1 and 100
                stock: Math.floor(Math.random() * 100) + 1, // Random stock between 1 and 100
                color: [{ name: 'White', stock: Math.floor(Math.random() * 10) + 1 }],
                size: [{ sizeName: 'M', stock: Math.floor(Math.random() * 10) + 1 }, { sizeName: 'SM', stock: Math.floor(Math.random() * 10) + 1 }, { sizeName: 'XL', stock: Math.floor(Math.random() * 10) + 1 }],
                productDetails: `Details of Product ${i}`,
                category: 'Women',
                productType: ['Hoodie', 'Jacket'],
                material: ['Cotton'],
                images: {
                    primary: 'p-2.1.png',
                    secondary: 'p-2.3.png',
                    general: ['p-2.1.png', 'p-2.2.png', 'p-2.3.png', 'p-2.4.png']
                }
            });
        }
        // Insert dummy products into the database
        await Product.insertMany(dummyProducts);
        res.status(200).json({
            success: true,
            data: 'Done'
        });
    } catch (err) {
        console.log(err.message);

        res.status(500).json({
            success: false,
            data: "Internal server error"
        });
    }
}

exports.deleteAllProducts = async (req, res) => {
    try {
        await Product.deleteMany({}); // Delete all products
        res.status(200).json({
            success: true,
            data: "All products deleted successfully."
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            success: false,
            data: "Internal server error"
        });
    }
};
