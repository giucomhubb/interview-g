const { getCategoryPaths, findCategoryById, findCategoryPathById} = require("./src/categories");

const categories = {
  id: 1,
  name: "Electrónica",
  subcategories: [
    {
      id: 2,
      name: "Computadoras",
      subcategories: [
        { id: 5, name: "Laptops", subcategories: [] },
        { id: 6, name: "Desktops", subcategories: [] },
      ],
    },
    { id: 3, name: "Celulares", subcategories: [] },
    { id: 4, name: "Accesorios", subcategories: [] },
  ],
};

console.log("rutas:");
console.log(getCategoryPaths(categories));

console.log("\nBUSCAR Id 6:");
console.log(findCategoryById(categories, 6));


console.log("\nRUTA DEL ID 6 o buscar con id");
console.log(findCategoryPathById(categories, 6));

