const { Usuario } = require("../../database/models");

module.exports = {
    list: async (req, res) => {
        try {
            const USUARIOS = await Usuario.findAll();
            
            const USERS_RESPONSE = USUARIOS.map(({id, nombre , email}) => {
                return {
                    id,
                    nombre,
                    email,
                    datail: `/api/v1/users/${id}`
                }
            }) 

            const RESPONSE = {
                total: USERS_RESPONSE.length,
                msg : 'Lista de usuarios', 
                endpoint: "/users/",
                data: USERS_RESPONSE,
            };

            res.status(200).json(RESPONSE);

        } catch (error) {
            res.status(500).json({error});
        }
        
    },
    detail: async (req, res) => {
        const USER_ID = req.params.id;
        try {
            const {
                id,
                nombre,
                apellido,
                email,
                avatar,
                telefono,
                codigo_postal,
                provincia,
                localidad,
                direccion
            } = await Usuario.findByPk(USER_ID);

            const USER_DATA_RESPONSE = {
                 id,
                nombre,
                apellido,
                email,
                telefono,
                avatar,
                codigo_postal,
                provincia,
                localidad,
                direccion
            };

            if(USER_DATA_RESPONSE !== null) {
                const RESPONSE = {
                    msg : 'Detalle del usuario',
                    endpoint: `/users/${USER_ID}`,
                    data: USER_DATA_RESPONSE,
                };
               return res.status(200).json(RESPONSE);
            }

            return res.status(400).json(`La categoria con id: ${USER_ID} no existe`)
            
        } catch (error) {
            res.status(500).send(error);           
        }
    }, 

}