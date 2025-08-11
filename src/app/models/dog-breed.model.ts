export interface Weight {
  imperial: string;
  metric: string;
}

export interface Height {
  imperial: string;
  metric: string;
}

// export interface Image {
//   id: string;
//   width: number;
//   height: number;
//   url: string;
// }

export interface DogBreed {
  id: number;
  name: string;
  weight: Weight;
  height: Height;
  bred_for?: string;
  breed_group?: string;
  life_span?: string;
  temperament?: string;
  origin?: string;
  country_code?: string;
  description?: string;
  history?: string;
  // reference_image_id?: string;
//   image?: Image;
}

export interface PaginationInfo {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}
