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
                description: 'Dispositivo Movil de Tienda e-commerce',
                picture_url: path.resolve(fullPath,req.body.img),
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
            faulure: 'https://gregoreche-mp-ecommerce-nodejs.herokuapp.com/paymentfailure',
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
            ]
        } ,
        external_reference: 'greche@digitalhouse.com',
        
        
    };
    try {
        const respuesta = await mercadopago.preferences.create(preference);
        return res.json(respuesta);
        //return res.redirect(respuesta.response.sandbox_init_point)
        
    } catch (error) {
        console.log(error);
    }


}
const success = (req, res) => res.status(200).send('Pago aprobado.');

const failure = (req,res) => res.status(200).send('El pago no pudo realizarse. Vuelve a internatlo mas tarde');

const pending = (req,res) => res.status(200).send('El pago quedó pendinete');



module.exports = {createPreference, success, failure, pending}