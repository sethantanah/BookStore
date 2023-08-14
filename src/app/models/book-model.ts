export interface Book {
    id: string;
    title: string;
    category: string;
    price: string;
    description: string;
    isEditing: boolean;
    urlHandle?: string; // Added property for editing state
  }


  