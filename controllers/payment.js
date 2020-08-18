const path = require('path');
const fullPath = 'https://gregoreche-mp-ecommerce-nodejs.herokuapp.com/';
// SDK de Mercado Pago
const mercadopago = require ('mercadopago');

// Agrego credenciales
mercadopago.configure({
    access_token: 'APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398',
    integrator_id: 'dev_24c65fb163bf11ea96500242ac130004'
})


const createPreference = async (req, res) => {
    
    let fullUrl = req.protocol + '://' + req.get('host');
    // Crea un objeto de preferencia
    const preference = {
        items: [
            {   
                ID: 1234,
                title: req.body.title,
                description: 'Dispositivo móvil de Tienda e-commerce',
                picture_url: path.join(fullPath,req.body.img),
                unit_price: Number(req.body.price),
                quantity: Number(req.body.unit),
            }
        ],
        payer: {
            name: "Lalo",
            surname: "Landa",
            email: "test_user_63274575@testuser.com",
            phone: {
                area_code: "11",
                number: 22223333
            },
            address: {
                street_name: "False",
                street_number: 123,
                zip_code: "1111"
            }
        }
        ,
        back_urls: {
            success: 'https://gregoreche-mp-ecommerce-nodejs.herokuapp.com/paymentsuccess',
            failure: 'https://gregoreche-mp-ecommerce-nodejs.herokuapp.com/paymentfailure',
            pending: 'https://gregoreche-mp-ecommerce-nodejs.herokuapp.com/paymentpending',
        },
        auto_return: 'approved',
        payment_methods: {
            excluded_payment_methods: [
                {
                    id: 'amex'
                }
            ],
            excluded_payment_types: [
                {
                    id: 'atm'
                }
            ],
            installments: 6,
        },
        notification_url: 'https://gregoreche-mp-ecommerce-nodejs.herokuapp.com/notification',
        external_reference: 'greche@digitalhouse.com',
        
        
    };
    try {
        const respuesta = await mercadopago.preferences.create(preference);
        //return res.json(respuesta);
        return res.redirect(respuesta.response.init_point)
        
    } catch (error) {
        console.log(error);
    }


}



module.exports = {createPreference}