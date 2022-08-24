const mongoose = require("mongoose");
const app = require("./app");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/FormularioUni',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    const PORT = process.env.PORT || 3000;
    
    app.listen(PORT, function(){
        console.log("Conexion Exitosa");
        console.log("Corriendo en el puerto: "+PORT)
    });
}).catch((error)=>{console.log(error);});