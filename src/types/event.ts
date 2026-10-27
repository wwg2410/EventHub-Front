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

export interface IUser{
  name: string;
  email: string;
  password: string;
  confirmPass?: string
}
export interface IMessage{
  text: string;
  color: string;
}
export interface ILogin{
  email: string;
  password: string;
}