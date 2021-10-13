const mongoose = require('mongoose')
//quiero hacer cambios aqui
const patientsSchema = new mongoose.Schema({

    idDentist:{
        required:false,
        type:mongoose.Types.ObjectId,
    },
    name:{
        type:String,
        required:false,
        lowercase:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:false,
        lowercase:true,
        trim:true,
    },
    email:{
        type:String,
        required:false,
        lowercase:true,
        match: /.*@.*\..*/
    },
    password:{
        type:String,
        required:false
    },
    userImage:{
        type:String
      },
    gender:{
        type:String,
        required:false,
        lowercase:true,
        trim:true,
        enum: { values: ['masculino','femenino','otro'], message: '{VALUE} is not supported' }
    },
    age:{
        type:Number,
        required:false,
        min:0,
        max:200
    },
    height:{
        type:Number,
        required:false,
        min:0,
        max:300
    },
    weight:{
        type:Number,
        required:false,
        min:0,
        max:500
    },
    bloodType:{
        type:String,
        required:false,
        uppercase:true,
        trim:true,
        enum:{values:['A+','O+','B+','AB+','A-','O-','B-','AB-'], message: '{VALUE} is not supported'}
    },
    maritalStatus:{
        type:String,
        required:false,
        lowercase:true,
        trim:true,
    },
    address:{
        state:{
            type:String,
            required:false,
            lowercase:true,
            trim:true,
        },
        city:{
            type:String,
            required:false,
            lowercase:true,
            trim:true,
        },
        neighborhood:{
            type:String,
            required:false,
            lowercase:true,
            trim:true,
        },
        street:{
            type:String,
            required:false,
            lowercase:true,
            trim:true,
        },
        streetNumber:{
            type:String,
            required:false,
        },
        innerNumber:{
            type:String,
        }
    },
    familyPractitioner:{
        name:{
            type:String,
            lowercase:true,
            trim:true,
        },
        lastName:{
            type:String,
            lowercase:true,
            trim:true,
        },
        email:{
            type:String,
            lowercase:true,
            trim:true,
        },
        phoneNumber:{
            type:String,
            lowercase:true,
            trim:true,
        }
    },
    personInCharge:{
        name:{
            type:String,
            required:false,
            lowercase:true,
            trim:true,
        },
        lastName:{
            type:String,
            required:false,
            lowercase:true,
            trim:true,
        },
        email:{
            type:String,
            required:false,
            lowercase:true,
            trim:true,
        },
        phoneNumber:{
            type:String,
            required:false,
            lowercase:true,
            trim:true,
        }  
    },
    familyBackground:{
        father:{
            pathologies:{
                type:[{
                    type:String,
                    lowercase:true,
                    trim:true,
                }],
                default:[],
            },
            description:{
                type:String,
                lowercase:true,
                trim:true,
            }
        },
        mother:{
            pathologies:{   
                type:[{
                    type:String,
                    lowercase:true,
                    trim:true,
                }],
            default:[],
            },
            description:{
                type:String,
                lowercase:true,
                trim:true,
            }
        },
        grandFather:{
            pathologies:{
                type:[{
                    type:String,
                    lowercase:true,
                    trim:true,
                }],
                default:[],
            },
            description:{
                type:String,
                lowercase:true,
                trim:true,
            }
        },
        grandMother:{
            pathologies:{
                type:[{
                    type:String,
                    lowercase:true,
                    trim:true,
                }],
                default:[],
            },
            description:{
                type:String,
                lowercase:true,
                trim:true,
            }
        },
        partner:{
            pathologies:{
                type:[{
                    type:String,
                    lowercase:true,
                    trim:true,
                }],
                default:[],
            },
            description:{
                type:String,
                lowercase:true,
                trim:true,
            }
        },
        brothers:{
            pathologies:{
                type:[{
                    type:String,
                    lowercase:true,
                    trim:true,
                }],
                default:[],
            },
            description:{
                type:String,
                lowercase:true,
                trim:true,
            }
        }
    },
    pathologicalBackground:{
        currentDiseases:{
            type:[{
                type:String,
                lowercase:true,
                trim:true,
            }], 
            default:[]
        },
        previousDiseases:{
                type:[{
                    type:String,
                    lowercase:true,
                    trim:true,
                }], 
                default:[]
            },
        drugAllergies:{
                type:[{
                    type:String,
                    lowercase:true,
                    trim:true,
                }], 
                default:[]
            },
        currentMedications:{
                type:[{
                    type:String,
                    lowercase:true,
                    trim:true,
                }], 
                default:[]
        },
        previousOperations:{
                type:String,
                required:false,
                lowercase:true,
                trim:true,
                enum: { values: ['si','no'], message: '{VALUE} is not supported' }
            
        },
        bloodDonation:{
                type:String,
                required:false,
                lowercase:true,
                trim:true,
                enum: { values: ['si','no'], message: '{VALUE} is not supported' }
        },
        birthControlPills:{
                type:String,
                required:false,
                lowercase:true,
                trim:true,
                enum: { values: ['si','no'], message: '{VALUE} is not supported' }
            
        },
        observations:{
            type:String,
            lowercase:true,
            trim:true,
        },  
    },
    nonPathologicalBackground:{
        feeding:{
            type:String,
            required:false,
            lowercase:true,
            trim:true,
            enum: { values: ['buena','mala','regular'], message: '{VALUE} is not supported' }
        },
        toothBrushingFrequency:{
            type:String,
            required:false,
        },
        vaccines:{
            type:[{
                type:String,
                lowercase:true,
                trim:true,
            }], 
            default:[]
        },
        addictions:{
            type:[{
                type:String,
                lowercase:true,
                trim:true,
            }], 
            default:[]
        },
        alcoholConsumption:{
                type:String,
                trim:true,
                required:false,
               
            },
        
        cigarConsumption:{
                type:String,
                trim:true,
                required:false,
               
        },
        recentTattos:{
            type:String,
            lowercase:true,
            trim:true,
            required:false,
            enum: { values: ['si','no'], message: '{VALUE} is not supported' }
        },
        hygieneDescription:{
            type:String,
            lowercase:true,
            trim:true,
        },
        services:{
            type:[{
                type:String,
                lowercase:true,
                trim:true,
            }], 
            default:[]
        },
        unusualHabits:{
            type:String,
            lowercase:true,
            trim:true,
        },
        observations:{
            type:String,
            lowercase:true,
            trim:true,
        }
    }
},{ timestamps: true })

const model = mongoose.model('patients', patientsSchema)

module.exports = model