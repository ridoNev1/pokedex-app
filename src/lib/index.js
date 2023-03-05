import { typePokemon } from "textConstant";

const countingOffestPage = (pages, limit) =>
  pages === 1 ? "0" : (pages - 1) * limit;

const filterTypePokemon = (type) => {
  const result = typePokemon.filter((el) => el?.name === type);
  return result?.[0]?.color || "bg-[#303134]";
};

export { countingOffestPage, filterTypePokemon };
