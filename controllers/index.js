const {
    Sensor
} = require('../models')

const util = require('../utils/email');
const axios = require('axios')
const url = 'https://blynk.cloud/external/api/get?token=hgqbm33XJgDRC_wzDcZSaEp8R5X5PMHT&v0'
var value = 0;
module.exports = {
    value: (req,res,next) => {
        try {
            axios({
                method: 'get',
                url: url,
                responseType: 'json'
            })
            .then(function (response) {
                value = response.data;
                if(value==null){
                    return res.status(400).json({
                        status: false,
                        message: 'inset value failed!',
                        data: null
                    })
                }
                const data = Sensor.create({
                    value: response.data
                })
                
                if(data.value>=400){
                    htmlEmail = util.getHtml('announce.ejs',{});
                    util.sendEmail(htmlEmail);
                }
    
                return res.status(200).json({
                    status: true,
                    message: 'inset value success!',
                    data: data
                })
                
            });
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