const path = require('path');
// SDK de Mercado Pago
const mercadopago = require ('mercadopago');

// Agrego credenciales
mercadopago.configure({
    access_token: 'TEST-4107070442958768-081007-06f8f4a63921dc78a23aee8b2457bf83__LD_LA__-67593662'
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
                picture_url: path.resolve(req.body.img),
                unit_price: Number(req.body.price),
                quantity: Number(req.body.unit),
            }
        ],
        back_urls: {
            success: 'https://gregoreche-mp-ecommerce-nodejs.herokuapp.com/paymentsuccess',
            faulure: 'https://gregoreche-mp-ecommerce-nodejs.herokuapp.com/paymentfailure',
            pending: 'https://gregoreche-mp-ecommerce-nodejs.herokuapp.com/paymentpending',
        },
        auto_return: 'all', 
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