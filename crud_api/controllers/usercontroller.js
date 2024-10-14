

const user = require('../config/mongodb_config')

exports.registration = (request,response) => {
    const userReistrationData = {
       username: request.body.username,
       age: request.body.age,
       gender:request.body.gender,
       education:request.body.education,
       occupation:request.body.occupation,
       blog:request.body.blog,
       mail:request.body.mail,
       password:request.body.password
    }
    const User = new user(userReistrationData);
    User.save();
    response.send("The userdata saved")
}

exports.userlogin = async (request, response) => {
    try {
        const allusers = await user.findOne({ mail: request.body.mail });

      
        if (!allusers) {
            return response.status(200).json({
                success: false,
                message: "Wrong Mail or Password",
            });
        }

    
        if (request.body.password === allusers.password) {
            return response.status(200).json({
                success: true,
                status: 200,
                error: "",
                message: allusers,
            });
        } else {
            return response.status(200).json({
                success: false,
                message: "Wrong Mail or Password",
            });
        }
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: "Server error. Please try again later.",
            error: error.message,
        });
    }
};


exports.userupdate = async(request,response) => {

    const updateData = {
        username: request.body.username,
        age: request.body.age,
        gender:request.body.gender,
        education:request.body.education,
        occupation:request.body.occupation,
        blog:request.body.blog,
        mail:request.body.mail,
        password:request.body.password
    }

    const urupdate = await user.findByIdAndUpdate(request.params.id,updateData);
    response.send(JSON.stringify({"status":200, "error": "", "message": urupdate }))
}

exports.userdelete = async(request,response) => {
    const urdelete = await user.findByIdAndDelete(request.params.id);
    response.send(JSON.stringify({"status":200, "error": "", "message": urdelete }))
}

exports.singleuserlist = async(request,response) => {
    const singleuser = await user.findById(request.params.id);
    response.send(JSON.stringify({"status":200, "error": "", "message": singleuser }))
}
