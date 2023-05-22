const { Producto } = require("../../database/models");

module.exports = {
    list: async (req, res) => {
        try {
            const PRODUCTOS = await Producto.findAll({
                include: [
                  { association: "subcategoria", include: [{ association: "categoria" }] },
                ],
              });
          
            
            const PRODUCTOS_RESPONSE = PRODUCTOS.map(({id, titulo , descripcion, imagen, subcategoria}) => {
                return {
                    id,
                    titulo,
                    descripcion,
                    imagen,
                    subcategoria,
                    datail: `/api/v1/products/${id}`
                }
            }) 
            const getProductCountByCategory = (PRODUCTOS) => {
                const categoryCount = {};
        
                for (const product of PRODUCTOS) {
                  const categoryName = product.subcategoria.categoria.nombre;
        
                  if(categoryCount.hasOwnProperty(categoryName)){
                    categoryCount[categoryName]++;
                  }else{
                    categoryCount[categoryName] = 1;
                  }
                }
        
                return categoryCount;
              }

            const RESPONSE = {
                count: PRODUCTOS.length,
                countByCategory: getProductCountByCategory(PRODUCTOS),
                msg : 'Lista de productos', 
                endpoint: "/products/",
                data: PRODUCTOS_RESPONSE,
            };

            res.status(200).json(RESPONSE);

        } catch (error) {
            res.status(500).json(error);
        }
        
    },
    detail: async (req, res) => {
        const PRODUCT_ID = req.params.id;
        try {
            const PRODUCTO = await Producto.findByPk(PRODUCT_ID);


            if(PRODUCTO !== null) {
                const RESPONSE = {
                    msg : 'Detalle del producto',
                    endpoint: `/products/${PRODUCT_ID}`,
                    data: PRODUCTO,
                };
               return res.status(200).json(RESPONSE);
            }

            return res.status(400).json(`El producto con id: ${PRODUCT_ID} no existe`)
            
        } catch (error) {
            res.status(500).send(error);           
        }
    }, 

}