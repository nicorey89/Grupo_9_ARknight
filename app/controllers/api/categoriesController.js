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
//     store: async (req, res) => {
//         try {
//               const RESULT = await Categoria.create({
//                     name: req.body.nombre,
//               });
//               return res.status(201).json({
//                     meta: {
//                           status: 201,
//                           url: "api/v1/categoria/create",
//                           msg: "Categoria Agregada",
//                     },
//                     data: RESULT,
//               });
//         } catch (error) {
//               console.log(error);
//         }
//   },
}