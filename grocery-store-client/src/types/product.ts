export interface Category {
  _id: string;
  name: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  averageRating?: number;
  totalReviews?: number;

  image: {
    url: string;
    public_id: string;
  };

  category: Category;
}