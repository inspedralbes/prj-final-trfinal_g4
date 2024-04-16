module.exports = {

    async obtenerInformacionUsuari(id, username){
        const userData = {
            id: id,
            username: username,
        };
        return userData;
    }
};