const { Usuario } = require("../../database/models");

module.exports = {
    list: async (req, res) => {
        try {
            const USUARIOS = await Usuario.findAll();
            
            const RESPONSE = {
                total: USUARIOS.length,
                msg : 'Lista de usuarios', 
                endpoint: "/users/",
                data: USUARIOS,
            };

            res.status(200).json(RESPONSE);

        } catch (error) {
            res.status(500).send(error);
        }
    },
    detail: async (req, res) => {
        const USER_ID = req.params.id;
        try {
            const USER = await Usuario.findByPk(USER_ID);

            if(USER !== null) {
                const RESPONSE = {
                    total: USER.length,
                    msg : 'Detalle del usuario',
                    endpoint: `/users/${USER_ID}`,
                    data: USER
                };
    
               return res.status(200).json(RESPONSE);
            }

            return res.status(400).json(`La categoria con id: ${USER_ID} no existe`)
            
        } catch (error) {
            res.status(500).send(error);           
        }
    }, 

}