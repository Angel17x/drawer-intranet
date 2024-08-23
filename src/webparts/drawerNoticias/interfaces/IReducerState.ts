import { ICategoryItem } from "./ICategoryItem";

export interface IReducerState {
  loading: boolean;
  categories: ICategoryItem[];
  error?: string;
  selectedCategory: string;
}
