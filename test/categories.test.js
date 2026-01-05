const { getCategoryPaths, findCategoryById } = require("../src/categories");

const tree = {
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

describe("getCategoryPaths", () => {
  test("devuelve rutas completas de las hojas", () => {
    expect(getCategoryPaths(tree)).toEqual([
      "Electrónica/Computadoras/Laptops",
      "Electrónica/Computadoras/Desktops",
      "Electrónica/Celulares",
      "Electrónica/Accesorios",
    ]);
  });

  test("si root es inválido devuelve []", () => {
    expect(getCategoryPaths(null)).toEqual([]);
    expect(getCategoryPaths(undefined)).toEqual([]);
    expect(getCategoryPaths(123)).toEqual([]);
  });

  test("si faltan subcategories lo trata como hoja", () => {
    const only = { id: 10, name: "Solo" }; // no tiene subcategories
    expect(getCategoryPaths(only)).toEqual(["Solo"]);
  });

  test("limpia espacios en el nombre", () => {
    const t = { id: 1, name: "  A  ", subcategories: [{ id: 2, name: " B ", subcategories: [] }] };
    expect(getCategoryPaths(t)).toEqual(["A/B"]);
  });
});

describe("findCategoryById", () => {
  test("encuentra un id en profundidad", () => {
    expect(findCategoryById(tree, 6)).toEqual({
      id: 6,
      name: "Desktops",
      subcategories: [],
    });
  });

  test("si no existe devuelve null", () => {
    expect(findCategoryById(tree, 999)).toBeNull();
  });

  test("si root es inválido devuelve null", () => {
    expect(findCategoryById(null, 1)).toBeNull();
    expect(findCategoryById(undefined, 1)).toBeNull();
  });

  test("funciona con ids string", () => {
    const t = { id: "root", name: "Root", subcategories: [{ id: "x", name: "X", subcategories: [] }] };
    expect(findCategoryById(t, "x")).toEqual({ id: "x", name: "X", subcategories: [] });
  });
});
