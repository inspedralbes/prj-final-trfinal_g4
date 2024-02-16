const io = require('socket.io-client');
const socket = io.connect('http://localhost:3001');


module.exports =  async () => {
    
    try{

        const userData = await strapi.services.user.obtenerInformacionUsuari('id', 'username');
        console.log('entro ',userData);
        socket.emit('join', userData);

    }catch(err){
        console.log(err);
    }


};
