export const Categories = {
  1: "Saúde",
  2: "Alimentação",
  3: "Educação",
  4: "Entretenimento",
  5: "Vestuário",
  6: "Cuidados pessoais",
};

export function getNameFromCategoryId(id: number) {
  return Categories[id as keyof typeof Categories];
}