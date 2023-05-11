const { Subcategoria } = require("../../database/models");
module.exports = {
      category: async (req, res) => {
            try {
                  const RESULT = await Subcategoria.findAll({ where: { categoria_id: req.params.id } });
                  return res.status(201).json({
                        meta: {
                              status: 201,
                              url: "api/v1/subCategories/category/:id",
                              msg: "Subcategoria Agregada",
                        },
                        data: RESULT,
                  });
            } catch (error) {
                  console.log(error);
            }
      },
};
