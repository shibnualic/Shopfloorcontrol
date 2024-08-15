
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();



app.use(express.json());
app.use(cors());




mongoose.connect(process.env.MONGODB_URL);

app.get("/", (req, res) => {
    res.send("Express server is running")
})

const Inventory = mongoose.model("inventory", {
    id: {
        type: Number,
        required: true
    },
    item_id: {
        type: String,
        required: true
    },
    item_name: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },
    prefered_vendor: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },

})

app.post("/addinventory", async (req, res) => {

    let inventoryItems = await Inventory.find({});
    let id;
    if (inventoryItems.length > 0) {
        let lastProductArray = inventoryItems.slice(-1);
        let lastProduct = lastProductArray[0];
        id = lastProduct.id + 1
    } else {
        id = 1
    }
    const inventory = new Inventory({
        id: id,
        item_id: `S${id}`,
        item_name: req.body.item_name,
        category: req.body.category,
        prefered_vendor: req.body.prefered_vendor,
        stock: req.body.stock,
        price: req.body.price,
    })
    console.log(inventory);
    await inventory.save();
    console.log("saved");
    res.json({
        success: true,
        name: req.body.item_name
    }
    )
})


app.post("/removeinventory", async (req, res) => {
    await Inventory.findOneAndDelete({ item_id: req.body.item_id });
    console.log("removed")
    res.json({
        success: true,
        name: req.body.item_name
    })
})

app.get("/allinventory", async (req, res) => {
    let inventory = await Inventory.find({});
    console.log("all product fetched");
    res.send(inventory);
})

app.post("/findinventory", async (req, res) => {
    let inventory = await Inventory.find({
        $or: [
            { item_id: req.body.item_id_name },
            { item_name: req.body.item_id_name }
        ]
    });
    console.log(inventory);
    if (inventory.length > 0) {
        console.log("item exist")
        res.json({
            success: true,
            item: inventory[0]
        })
    } else {
        console.log("item doesn't exist")
        res.json({
            success: false,
        })
    }

})

app.post("/editinventory", async (req, res) => {
    await Inventory.findOneAndUpdate({ item_id: req.body.item_id }, {
        category: req.body.category,
        prefered_vendor: req.body.prefered_vendor,
        stock: req.body.stock,
        price: req.body.price,
    })
    res.json({
        success: true,
        name: req.body.item_name
    })
    console.log("inventory updated");
})

const Product = mongoose.model("product", {
    id: {
        type: Number,
        required: true
    },
    product_id: {
        type: String,
        required: true
    },
    product_name: {
        type: String,
        required: true
    },

    bom: {
        type: Array,
        required: true
    },
    bop: {
        type: Array,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    version: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }

})

app.post("/addproduct", async (req, res) => {

    let productItems = await Product.find({});
    let id;
    if (productItems.length > 0) {
        let lastProductArray = productItems.slice(-1);
        let lastProduct = lastProductArray[0];
        id = lastProduct.id + 1
    } else {
        id = 1
    }
    const product = new Product({
        id: id,
        product_id: `P${id}`,
        product_name: req.body.product_name,
        bom: [],
        bop: [],
        category: req.body.category,
        version: req.body.version
    })
    await product.save();
    console.log("saved");
    res.json({
        success: true,
        name: req.body.product_name
    }
    )
})

app.get("/allproduct", async (req, res) => {
    let product = await Product.find({});
    console.log("all product fetched");
    res.send(product);
})
app.post("/findproduct", async (req, res) => {
    let product = await Product.find({
        $or: [
            { product_id: req.body.product_id_name },
            { product_name: req.body.product_id_name }
        ]
    });
    if (product.length > 0) {
        res.json({
            success: true,
            item: product[0]
        })
    } else {
        res.json({
            success: false,
        })
    }

})
app.post("/editproduct", async (req, res) => {
    await Product.findOneAndUpdate({ product_id: req.body.product_id }, {
        category: req.body.category,
        version: req.body.version
    })
    res.json({
        success: true,
        name: req.body.product_name
    })
})

app.post("/removeproduct", async (req, res) => {
    await Inventory.findOneAndDelete({ product_id: req.body.product_id });
    res.json({
        success: true,
        name: req.body.product_name
    })
})
app.post("/editbom", async (req, res) => {
    await Product.findOneAndUpdate({ product_id: req.body.product_id }, {
        bom: req.body.bom
    })
    res.json({
        success: true,
        name: req.body.product_name
    })
})

const Program = mongoose.model("program", {
    id: {
        type: Number,
        required: true
    },
    program_id: {
        type: String,
        required: true
    },
    program_name: {
        type: String,
        required: true
    },

    machine: {
        type: String,
        required: true
    },
    raw_material: {
        type: String,
        required: true
    },
    qtyOfMaterial: {
        type: Number,
        required: true
    },
    unitsPerProgram: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },

})
app.post("/addprogram", async (req, res) => {

    let programitems = await Program.find({});
    let id;
    if (programitems.length > 0) {
        let lastProgramArray = programitems.slice(-1);
        let lastProgram = lastProgramArray[0];
        id = lastProgram.id + 1
    } else {
        id = 1
    }
    const program = new Program({
        id: id,
        program_id: `C${id}`,
        program_name: req.body.program_name,
        machine: req.body.machine,
        raw_material: req.body.raw_material,
        qtyOfMaterial: req.body.qtyOfMaterial,
        unitsPerProgram: req.body.unitsPerProgram,
    })
    console.log(program);
    await program.save();
    console.log("saved");
    res.json({
        success: true,
        name: req.body.program_name
    }
    )
})


app.post("/removeprogram", async (req, res) => {
    await Program.findOneAndDelete({ program_id: req.body.program_id });
    console.log("removed")
    res.json({
        success: true,
        name: req.body.program_name
    })
})

app.get("/allprogram", async (req, res) => {
    let program = await Program.find({});
    console.log("all product fetched");
    res.send(program);
})

app.post("/findprogram", async (req, res) => {
    let program = await Program.find({
        $or: [
            { program_id: req.body.program_id_name },
            { program_name: req.body.program_id_name }
        ]
    });
    console.log(program);
    if (program.length > 0) {
        console.log("program exist")
        res.json({
            success: true,
            item: program[0]
        })
    } else {
        console.log("program doesn't exist")
        res.json({
            success: false,
        })
    }

})

app.post("/editprogram", async (req, res) => {
    await Program.findOneAndUpdate({ program_id: req.body.program_id }, {
        machine: req.body.machine,
        raw_material: req.body.raw_material,
        qtyOfMaterial: req.body.qtyOfMaterial,
        unitsPerProgram: req.body.unitsPerProgram
    })
    res.json({
        success: true,
        name: req.body.program_name
    })
})
app.post("/editbop", async (req, res) => {
    await Product.findOneAndUpdate({ product_id: req.body.product_id }, {
        bop: req.body.bop
    })
    res.json({
        success: true,
        name: req.body.product_name
    })
})

const Order = mongoose.model("order", {
    id: {
        type: Number,
        required: true
    },
    order_id: {
        type: String,
        required: true
    },

    order_unit: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },
    po_number: {
        type: Number,
        required: true
    },
    customer_name: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }

})
app.post("/addorder", async (req, res) => {

    let orderitems = await Order.find({});
    let id;
    if (orderitems.length > 0) {
        let lastorderArray = orderitems.slice(-1);
        let lastorder = lastorderArray[0];
        id = lastorder.id + 1
    } else {
        id = 1
    }
    const order = new Order({
        id: id,
        order_id: `O${id}`,
        order_unit: req.body.order_unit,
        quantity: req.body.quantity,
        po_number: req.body.po_number,
        customer_name: req.body.customer_name
    })
    console.log(order);
    await order.save();
    console.log("saved");
    res.json({
        success: true,
        id: req.body.order_id
    }
    )
})


app.post("/removeorder", async (req, res) => {
    await Order.findOneAndDelete({ order_id: req.body.order_id });
    console.log("removed")
    res.json({
        success: true,
        id: req.body.order_id
    })
})

app.get("/allorder", async (req, res) => {
    let order = await Order.find({});
    console.log("all product fetched");
    res.send(order);
})

app.post("/findorder", async (req, res) => {
    let order = await Order.find({ order_id: req.body.order_id });
    console.log(order);
    if (order.length > 0) {
        console.log("order exist")
        res.json({
            success: true,
            item: order[0]
        })
    } else {
        console.log("order doesn't exist")
        res.json({
            success: false,
        })
    }

})

app.post("/editorder", async (req, res) => {
    await Order.findOneAndUpdate({ order_id: req.body.order_id }, {
        order_unit: req.body.order_unit,
        quantity: req.body.quantity,
        po_number: req.body.po_number,
        customer_name: req.body.customer_name
    })
    res.json({
        success: true,
        id: req.body.order_id
    })
})
const Users = mongoose.model('Users', {
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }

})

// Creating endpoint for registering user

app.post("/signup", async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({
            success: false,
            error: "Email already exist"
        })
    } else {

        const user = new Users({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,

        })
        await user.save();
        const data = {
            user: {
                id: user.id
            }
        }

        const token = jwt.sign(data, 'secret_ecom');
        res.json({
            success: true,
            token
        })
    }


});

//creating endpoint for login

app.post("/login", async (req, res) => {
    let user = await Users.findOne({ email: req.body.email })
    if (user) {
        const passcode = user.password === req.body.password;
        if (passcode) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token });
        } else {
            res.json({ success: false, error: "wrong password" });
        }
    } else {
        res.json({ success: false, error: "email id doesn't exist" });
    }
})



app.listen(process.env.PORT, (error) => {
    if (!error) {
        console.log("server running on port"+ process.env.PORT)
    } else {
        console.log("Error:" + error)
    }
});



