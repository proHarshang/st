const express = require('express');
const Stripe = require("stripe");
const stripeAPI = require('../stripe');
const router = express.Router();
require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
    const customer = await stripe.customers.create({
        metadata: {
            userId: req.body.userId,
            cart: JSON.stringify(req.body.cartItems),
        },
    });

    const line_items = req.body.cart.map((item) => {
        return {
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.productTitle,
                    images: [item.primaryImage],
                    metadata: {
                        id: item.productId,
                    },
                },
                unit_amount: item.price * 100,
            },
            quantity: item.amount,
        };
    });

    const domainUrl = process.env.CLIENT_URL;
    // const { line_items, customer_email } = req.body;

    // if (!line_items || !customer_email) {
    //     return res.status(400).json({ error: 'missing parameters' })
    // }

    let session;

    try {
        session = await stripeAPI.checkout.sessions.create({
            phone_number_collection: {
                enabled: true,
            },
            payment_method_types: ['card'],
            mode: 'payment',
            line_items,
            customer: customer.id,
            success_url: `${domainUrl}order-confirmed`,
            cancel_url: `${domainUrl}cancel`,
        });
        // res.status(200).json({
        //     sessionId: session.id
        // })
        res.send({ url: session.url });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            data: "Internal Server Error"
        })
    }
}
)

// This is your Stripe CLI webhook secret for testing your endpoint locally.

router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
    // let endpointSecret = "whsec_b41baa15320d955326adfb59da596307265105ce610dfa85993215638ee1cc9a";
    let endpointSecret = "whsec_d9e285b79ba3331ddfadcad3efd6fa45bfd1d0bb4079d58eb28518e11ac87013";
    let data;
    let eventType;

    // let webhookSecret;
    // const payload = req.body.toString('utf8');

    if (endpointSecret) {

        const sig = req.headers['stripe-signature'];
        let event;

        try {
            event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
            console.log("Webhook varified")
        } catch (err) {
            console.log("Webhook Error: " + err.message)
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        data = event.data.object;
        eventType = event.type;
    } else {
        data = req.body.data.object;
        eventType = req.body.type;
    }

    // Handle the event
    switch (eventType) {
        // case 'payment_intent.succeeded':
        case 'checkout.session.completed':
            const paymentIntentSucceeded = data;
            console.log(data)
            console.log("--------------------data")
            // Then define and call a function to handle the event payment_intent.succeeded
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${eventType}`);
    }

    // Return a 200 res to acknowledge receipt of the event
    res.send().end();
});

module.exports = router;