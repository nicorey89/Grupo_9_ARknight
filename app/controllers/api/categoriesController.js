const { Categoria } = require("../../database/models");

module.exports = {
    list: async (req, res) => {
        try {
            const CATEGORIES = await Categoria.findAll();
            
            const RESPONSE = {
                total: CATEGORIES.length,
                msg : 'Lista de categorias', 
                endpoint: "/categoria/",
                data: CATEGORIES,
            };

            res.status(200).json(RESPONSE);

        } catch (error) {
            res.status(500).send(error);
        }
    },
    detail: async (req, res) => {
        const CATEGORY_ID = req.params.id;
        try {
            const CATEGORY = await Categoria.findByPk(CATEGORY_ID, {
                include: [{association: "Subcategorias"}]
            });

            if(CATEGORY !== null) {
                const RESPONSE = {
                    total: CATEGORY.length,
                    msg : 'Detalle de categoria',
                    endpoint: `/categoria/${CATEGORY_ID}`,
                    data: CATEGORY
                };
    
               return res.status(200).json(RESPONSE);
            }

            return res.status(400).json(`La categoria con id: ${CATEGORY_ID} no existe`)
            
        } catch (error) {
            res.status(500).send(error);           
        }
    }, 
}