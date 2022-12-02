const {
    Sensor
} = require('../models')

const util = require('../utils/email');
const fetch = require('node-fetch')
const {BLYNK_TOKEN}= process.env;
module.exports = {
    value: async (req,res,next) => {
        try {
            const response = await fetch(`https://blynk.cloud/external/api/get?token=${BLYNK_TOKEN}&v0`);
            const data = await response.text();
            console.log(data)
            if(isNaN(+data)){
                console.log(data)
                return res.status(400).json({
                    status: false,
                    message: 'inset value failed!',
                    data: null
                })
            }
            const input = await Sensor.create({
                value: +data
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