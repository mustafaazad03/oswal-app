import { exploreItems } from "./subCategories";

export const organizeItemsByCategory = (items) => {
  return items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});
};
export const subCategories = organizeItemsByCategory(exploreItems);
