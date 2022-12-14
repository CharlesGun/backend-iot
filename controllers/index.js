const {
    Sensor
} = require('../models')
const util = require('../utils/email');

module.exports = {
    value: async (req,res,next) => {
        try {
            const {value} = req.body;
            if(!value){
                return res.status(400).json({
                    status: false,
                    message: 'inset value failed!',
                    data: null
                })
            }
            const data = await Sensor.create({
                value: value
            })
            
            if(data.value>=300){
                htmlEmail = await util.getHtml('announce.ejs',{});
                await util.sendEmail(htmlEmail);
            }

            return res.status(200).json({
                status: true,
                message: 'inset value success!',
                data: data
            })
        } catch (err) {
            next(err)
        }
    },

    getAll: async (req,res,next)=>{
        try{
            const values = await Sensor.findAll({
                order: [['id','desc']]
            });
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