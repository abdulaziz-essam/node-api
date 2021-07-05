const Bootcamp = require("../modals/bootcamp");
const geoCoder=require('../utils/geocoder');
exports.getBootcamps =async (req, res, next) => {
    const bootcamps=await Bootcamp.find();
    console.log(req.query)
    res.status(200).json({ data: bootcamps, hello: req.hello });

}
exports.createBootcamp = async(req, res, next) => {

   

}
exports.getBootcamp = async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id)
console.log("this data is coming from database  "+req.params.id);
    res.status(200).json({ data: bootcamp, hello: "specific boocamp" });

}
exports.updateBootcamp=async(req , res , next)=>{
    const bootcamp=await Bootcamp.findByIdAndUpdate(req.params.id,req.body,{new:"true"});
    res.status(200).json({data:bootcamp, update: "success" })
}
// exports.getBootcampsInRadius=async(req,res,next)=>{
// const {zipCode,distance}=req.params;
// res.status(200).json();

// }