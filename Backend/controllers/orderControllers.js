    import orderModel from "../models/orderModel.js";
    import userModel from '../models/userModel.js';
    import Stripe from 'stripe';

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    //Placing user order from frontend 
    const placeOrder = async (req, res) => {
        const frontend_url = "https://cake-bakery-shop-1-frontend.onrender.com/";

        try {
            const newOrder = new orderModel({
                userId: req.body.userId,
                items: req.body.items,
                amount: req.body.amount,
                address: req.body.address
            });

            await newOrder.save();
            await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

            const line_items = req.body.items.map((item) => ({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name
                    },
                    unit_amount: item.price * 100 // Stripe expects amounts in cents
                },
                quantity: item.quantity
            }));

            // Adding delivery charges
            line_items.push({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: "Delivery Charges"
                    },
                    unit_amount: 2 * 100 // Delivery charge in cents
                },
                quantity: 1
            });

            // Creating Stripe payment session
            const session = await stripe.checkout.sessions.create({
                line_items: line_items,
                mode: 'payment',
                success_url: `${frontend_url}verify?success=true&orderId=${newOrder._id}`,
                cancel_url: `${frontend_url}verify?success=false&orderId=${newOrder._id}`,
            });

            // Correcting the returned response by using session.url
            res.json({ success: true, session_url: session.url });

        } catch (error) {
            console.log(error);
            res.json({ success: false, message: "Error" });
        }
    };

    const verifyOrder = async (req,res) =>{
        console.log("currently in verifyOrder function");
        const {orderId,success} = req.body;
        try {
            if (success=="true") {
                await orderModel.findByIdAndUpdate(orderId,{payment:true});
                res.json({success:true,message:"Paid"})
            }
            else{
                findByIdAndDelete(orderId);
                res.json({success:false,message:"Not Paid"})
            }
        } catch (error) {
            console.log(error);
            res.json({success:false,message:"Error"})
                    
        }
    }

    // userorders for frontend

    const userOrders = async (req,res)=>{
        try {
            const orders = await orderModel.find({
                userId:req.body.userId
            });
            res.json({success:true,data:orders})

        } catch (error) {
            console.log(error);
            res.json({success:false,message:"Error"})
        }
    }


    //listing orders for admin panel 

    const listOrders = async (req,res)=>{
        try {
            const orders = await orderModel.find({});
            res.json({success:true,data:orders})
        } catch (error) {
            console.log(error);
            res.json({success:false,message:"Error"})
            
        }
    }

    const updateStatus = async (req,res)=>{
        try {
            await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
            res.json({success:true,message:"Status Updated"})
        } catch (error) {
            console.log(error);
            res.json({success:false,message:"Error"})
            
        }
    }

    export { placeOrder,verifyOrder, userOrders ,listOrders,updateStatus };
