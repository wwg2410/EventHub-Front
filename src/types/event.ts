export interface Event {
  id: string;
  title: string;
  description: string;
  date: string; 
  time: string; 
  address: string;
  category: string;
  price: number;
  seats: number;
  imageUrl?: string | null;
}

export type EventFormData = Omit<Event, "id" | "imageUrl">;

export interface MyEventsResponse {
  created: Event[];
  registered: Event[];
}