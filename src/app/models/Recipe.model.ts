export interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string;
  imageUrl: string;
  created_at: Date;
  prepTime: string;
  cookTime: string;
  author: string;
}
