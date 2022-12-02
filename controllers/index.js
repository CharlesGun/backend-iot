const {
    Sensor
} = require('../models')

const util = require('../utils/email');
const axios = require('axios')
const url = 'https://blynk.cloud/external/api/get?token=hgqbm33XJgDRC_wzDcZSaEp8R5X5PMHT&v0'

module.exports = {
    value: async (req, res, next) => {
            await fetch(url)
            .then((res)=>{
                return res.json();
            })
            .then(data=>{
                const value = data
                if(value==null){
                    return res.status(400).json({
                        status: false,
                        message: 'inset value failed!',
                        data: null
                    })
                }
                const input = Sensor.create({
                    value: value
                })
                
                if(input.value>=400){
                    htmlEmail = util.getHtml('announce.ejs',{});
                    util.sendEmail(htmlEmail);
                }
    
                return res.status(200).json({
                    status: true,
                    message: 'inset value success!',
                    data: input
                })
            })
            
            .catch (err=> {
            next(err)
        })
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