const { Customer } = require('../model/Customers');
const bcrypt = require("bcrypt");
const { createTokens, validateToken } = require("../JWT");
const { sendOTPByEmail } = require('../services/emailService');
const { sendContactInfo } = require('../services/contactMail');
const { randomInt } = require('crypto');

exports.register = async (req, res) => {
    try {
        let existingCustomer = await Customer.findOne({ email: req.body.email });
        if (existingCustomer) {
            res.status(200).json({
                success: false,
                message: 'User already exists.'
            });
        } else {

            const hash = await bcrypt.hash(req.body.password, 10);
            const customer = new Customer({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                mobile: req.body.mobile,
                dob: req.body.dob,
                address: req.body.address,
                appartment: req.body.appartment,
                country: req.body.country,
                state: req.body.state,
                city: req.body.city,
                pincode: req.body.pincode,
                countryCode: req.body.countryCode,
                password: hash,
                saveInfo: req.body.saveInfo,
                emailNewOffers: req.body.emailNewOffers,
                title: req.body.title,
                cart: req.body.cart,
                wishlist: req.body.wishlist,
                orders: req.body.orders,
            });


            // Generate JWT token for the newly registered customer
            const accessToken = createTokens(customer);

            // Update the customer document with the generated token
            customer.token = accessToken;

            const doc = await customer.save();

            res.status(201).json({
                success: true,
                data: {
                    firstName: doc.firstName,
                    lastName: doc.lastName,
                    email: doc.email,
                    cart: doc.cart,
                    wishlist: doc.wishlist,
                    orders: doc.orders,
                    id: doc.id
                },
                token: accessToken
            });

            // const frontendBaseUrl = "http://localhost:3000/register"
            // const jsonData = { f: doc.firstName, l: doc.lastName, email: doc.email };
            // const queryString = new URLSearchParams(jsonData).toString();
            // const redirectUrl = `${frontendBaseUrl}?` + queryString;
            // res.redirect(redirectUrl);
        }

    } catch (err) {
        console.log(err.message);

        res.status(500).json({
            success: false,
            data: "Internal server error"
        });
    }
}

// TODO
exports.login = async (req, res) => {
    try {
        const { email, password, by_form } = req.body;
        const customer = await Customer.findOne({ email });

        if (!customer) {
            return res.status(200).json({
                success: false,
                data: 'Customer Doesn\'t Exist',
            });
        }

        if (by_form) {
            const dbPassword = customer.password;

            if (!dbPassword) {
                return res.status(200).json({
                    success: false,
                    data: 'Password is not set for this customer',
                });
            }

            const match = await bcrypt.compare(password, dbPassword);
            if (match) {
                return res.status(200).json({
                    success: false,
                    data: 'Wrong Username and Password Combination!',
                });
            }
        } else {
            const dbId = customer.id;

            if (!dbId) {
                return res.status(200).json({
                    success: false,
                    data: 'Customer Does Not Exist',
                });
            }
        }

        // Generate JWT token for the logged-in customer
        const accessToken = createTokens(customer);

        // Update the customer document with the new token
        await Customer.findByIdAndUpdate(customer.id, { token: accessToken });

        res.json({
            success: true,
            data: customer,
            token: accessToken
        });
    } catch (err) {
        console.log(err.message);

        res.status(500).json({
            success: false,
            data: 'Internal Server Error'
        });
    }
}

exports.getVisitorsRegion = async (req, res) => {
    try {
        const fetch = await import('node-fetch');
        const response = await fetch.default("https://geolocation-db.com/json/0daad5e0-82e7-11ee-92e0-f5d620c7dcb4");
        const data = await response.json();

        if (data) {
            res.json({
                success: true,
                data: data,
            });
        } else {
            res.status(500).json({
                success: false,
                data: 'Internal Server Error'
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            data: 'Internal Server Error'
        });
    }
}

exports.google_callback = async (req, res) => {
    // Successful authentication
    const user = req.user;

    // const token = createTokens(user);

    // res.json({
    //     success: true,
    //     data: user,
    //     token: token
    // });

    const frontendBaseUrl = "http://localhost:3000/"
    const jsonData = { email: user.email, id: user.id };
    const queryString = new URLSearchParams(jsonData).toString();
    const redirectUrl = `${frontendBaseUrl}?` + queryString;
    res.redirect(redirectUrl);

}

exports.facebook_callback = async (req, res) => {
    const user = req.user;
    const frontendBaseUrl = "http://localhost:3000/"
    const jsonData = { email: user.email, id: user.id };
    const queryString = new URLSearchParams(jsonData).toString();
    const redirectUrl = `${frontendBaseUrl}?` + queryString;
    res.redirect(redirectUrl);
}

exports.UpdateCustomer = async (req, res) => {
    try {
        const customerId = req.params.id;
        const updatedCustomerData = req.body;

        const updatedCustomer = await Customer.findByIdAndUpdate(customerId, updatedCustomerData, { new: true });

        if (!updatedCustomer) {
            return res.status(404).json({
                success: false,
                data: 'Customer not found'
            });
        }

        // Respond with the updated customer object
        res.status(200).json({
            success: true,
            data: updatedCustomer
        });

    } catch (err) {
        console.log(err.message);

        res.status(500).json(
            {
                success: false,
                data: "Internal server error"
            }
        );
    }
}

exports.contact = async (req, res) => {
    try {
        const { email, name, inquiryType, message } = req.body;
        await sendContactInfo(email, name, inquiryType, message);
        res.status(200).json({
            success: true,
            message: 'Sent Succesfully!'
        });
    } catch (error) {
        console.log(err.message);

        res.status(500).json({
            success: false,
            data: "Internal server error"
        });
    }
}

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body

        // Check if a user with the provided email exists in the database
        const existingCustomer = await Customer.findOne({ email });

        if (existingCustomer) {
            const otp = String(randomInt(100000, 999999));

            // Send the OTP via email
            await sendOTPByEmail(email, otp);

            // Update user's OTP field in the database
            existingCustomer.otp = otp;
            await existingCustomer.save();

            res.status(200).json({
                success: true,
                message: 'OTP sent to the provided email address. Please check your inbox.'
            });
        } else {
            // User with the provided email does not exist
            res.status(200).json({
                success: false,
                message: 'User not found. Please check the email address.'
            });
        }
    } catch (err) {
        console.log(err.message);

        res.status(500).json({
            success: false,
            data: "Internal server error"
        });
    }
}

exports.updatePassword = async (req, res) => {
    const { email, newPassword } = req.body;

    const existingCustomer = await Customer.findOne({ email });
    console.log(email, newPassword);
    try {
        if (existingCustomer) {
            const hash = await bcrypt.hash(newPassword, 10);
            // Update the user's password
            existingCustomer.password = hash;
            existingCustomer.otp = null;
            await existingCustomer.save();
            return res.status(200).json({
                success: true,
                data: 'Password updated successfully'
            });
        } else {
            return res.status(200).json({
                success: false,
                data: 'User Does Not Exist'
            });
        }

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            success: false,
            data: 'Internal server error'
        });
    }
};

exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    const existingCustomer = await Customer.findOne({ email });
    // Validate the OTP
    if (!existingCustomer || existingCustomer.email !== email || existingCustomer.otp !== otp) {
        return res.status(200).json({
            success: false,
            data: 'Invalid OTP'
        });
    }

    try {

        return res.status(200).json({
            success: true,
            data: 'OTP is correct'
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            success: false,
            data: 'Internal server error'
        });
    }
}

exports.fetchAllCustomers = async (req, res) => {
    try {
        const customerData = await Customer.find();
        res.status(200).json({
            success: true,
            data: customerData
        });

    } catch (err) {
        console.log(err.message);

        res.status(500).json({
            success: false,
            data: "Internal server error"
        });
    }
};

exports.fetchCustomerById = async (req, res) => {
    const { id } = req.params;

    try {
        const customer = await Customer.findById(id);
        res.status(200).json({
            success: true,
            data: customer
        });
    } catch (err) {
        console.log(err.message);

        res.status(500).json({
            success: false,
            data: err
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const customerId = req.params.customerId;
        await Customer.findByIdAndDelete(customerId);
        return res.status(200).json({
            success: true,
            data: "Account Deactivated"
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            success: false,
            data: "Internal Server Error"
        });
    }
}

// Dummy data generation function
exports.generateDummyProducts = async (req, res) => {
    const dummyProducts = [];
    try {
        for (let i = 1; i <= 10; i++) {
            dummyProducts.push({
                firstName: `Harshang`,
                lastName: 'Thakar',
                email: 'harshangthakar@gmail.com',
                password: 'harshangthakar',
                policyAccepted: true
            });
        }
        // Insert dummy products into the database
        await Customer.insertMany(dummyProducts);
        res.status(200).json({
            success: true,
            data: "Done"
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
        await Customer.deleteMany({}); // Delete all Customer
        res.status(200).json({
            success: true,
            data: "All Customer deleted successfully."
        });
    } catch (err) {
        console.log(err.message);

        res.status(500).json({
            success: false,
            data: "Internal server error"
        });
    }
};