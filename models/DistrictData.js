const mongoose = require("mongoose");

const districtSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  state:{
    type: String,
    required: true,
  },
  students_total:{
    type: Number
  },
  student_out:{
    type:Number
  },
  pincode:{
    type:Number
  }
},{
    timestamps:true
});

module.exports=mongoose.model("district",districtSchema);