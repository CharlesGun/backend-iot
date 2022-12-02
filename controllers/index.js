const {
    Sensor
} = require('../models')

const util = require('../utils/email');
const url = 'https://blynk.cloud/external/api/get?token=hgqbm33XJgDRC_wzDcZSaEp8R5X5PMHT&v0'
const fetch = require('node-fetch')
module.exports = {
    value: async (req,res,next) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            const nilai1 = JSON.stringify(data)
            const nilai = parseFloat(nilai1)
            if(isNaN(nilai)){
                return res.status(400).json({
                    status: false,
                    message: 'inset value failed!',
                    data: null
                })
            }
            const input = await Sensor.create({
                value: nilai
            })
            
            if(input.value>=400){
                htmlEmail = await util.getHtml('announce.ejs',{});
                await util.sendEmail(htmlEmail);
            }

            return res.status(200).json({
                status: true,
                message: 'inset value success!',
                data: input
            })
        } catch (err) {
            next(err)
        }
    },
    getAll: async (req,res,next)=>{
        try{
            const values = await Sensor.findAll();
            if (!values) {
                res.status(404).json({
                status: false,
                message: "data was not-found",
                data: null,
                });
            }
            return res.status(200).json({
                status: true,
                message: "get data successful!",
                data: values
            });
        } catch(err){
            next(err)
        }
    }
}