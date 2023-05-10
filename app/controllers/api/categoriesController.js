const { Categoria, Subcategia } = require("../../database/models");

module.exports = {
    list: async (req, res) => {
        try {
            const CATEGORIES = await Categoria.findAll();
            
            const RESPONSE = {
                endpoint: "/categoria/",
                data: CATEGORIES,
                total: CATEGORIES.length 
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
    listSubCat:  async (req, res) => {
        try {
            const SUB_CATEGORIES = await Subcategia.findAll({include: [{association: "Categoria"}]});
            
            const RESPONSE = {
                endpoint: "/subcategorias",
                data: SUB_CATEGORIES
            };

            res.status(200).json(RESPONSE);

        } catch (error) {
            res.status(500).send(error);
        }
    }
}