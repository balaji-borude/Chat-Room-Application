const User = require("../model/User"); // import the User model 
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

require('dotenv').config();

// signup controller 
exports.signUp= async(req,res)=>{
    try {
        // get data from req.body 
        const{name,email,password,confirmPassword} = req.body;

        // validdation 
        if(! name || !email || ! password || !confirmPassword){
            res.status(403).json({
                success:false,
                message:"All fields are required"
            })
        };

        // check password 
        if(password !== confirmPassword){
            res.status(400).json({
                success:false,
                message:"password and confirm Password field are not matched !"
            })
        }
        // check user is already present in DB or not 
        const existing_user = await User.findOne({email});
        if(existing_user){
            res.status(400).json({
                success:false,
                message:"User is already exist, Please Logged in "
            })
        };

        // hasshed the password 
        let hasshedPassword = await bcrypt.hash(password,10);
        console.log("Password is hashed ", hasshedPassword)

        // create entry in Db 
        const user = await User.create({
            name,
            email,
            password:hasshedPassword
        });
        console.log("user is created in Db", user)

        // send the success message 
        res.status(200).json({
            success:true,
            message:"User is created Succesfully "
        })
    } catch (error) {

        res.status(500).json({
            success:false,
            message:"Issue in Creating New user ",
            error:error // yethe jo error ala to pass kela 
        })
    }
}

// login controler 
exports.login = async (req,res) => {
    try {
        console.log("entering in login handler ")
        // destruct email and passwod from req.body 
        const {email,password} = req.body;
        
        // validation 
        if(!email || !password){
            res.status(403).json({
                success:false,
                message:"All fields are required "
            })
        };
        //check email is present In Db or not 
        const user = await User.findOne({email:email});
        if(!user){
            res.status(401).json({
                success:false,
                message:"User is Not Registered ! Please Registered First"
            })
        };

        // compare entered password with existing password (present in DB )
        let comparePassword = await bcrypt.compare(password,user.password);

        // if password is match then 
        if(comparePassword){
            const payload= {
                id:user._id,
                email:user.email,
                //  chack ----> if any thing required in payload of token 
            };

            const JWT_SECRET= process.env.JWT_SECRET;

            // jwt options / expiry
            const jwtOptions = {
                expiresIn:'24h'
            };

            // create Token 
            const token = jwt.sign(payload,JWT_SECRET,jwtOptions);
            console.log("Token is Created ==> ", token );

            // add token in user 
            user.token = token;
            user.password = undefined;

            console.log("token is inserted on user ");

            // generate cookie 

            // cookie optons
            const cookie_option = {
                expires: new Date(Date.now() + 3 *24*60*60*1000), // cookie expires in 3 days 
                httpOnly:true // by doing thsese javascript does not access cookie (enhace security )
            };
            // create cookie and send to response --> add token in cookie 
            res.cookie("token",token,cookie_option).status(200).json({
                success:true,
                message:"User Logged In Succesfully ",
                token, // token la cookie chya data madhe pass kele tari pn token field madhe pathavt ahe 
                user  // jya user madhe token insert kela and password la Undefiend kela to user pass kela  
            });

        }else{
            return res.status(401).json({
                success:false,
                message:"Password is Incorrect"
            })
        };

    } catch (error) {
      console.log(error)  
      res.status(500).json({
        success:false,
        message:"Something went wrong , Login failure",
        error:error
      })

    }
};