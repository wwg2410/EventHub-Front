// праметры для создания мероприятия
interface CreateEventPayload {
  title: string;
  description: string;
  date: string;
  address: string;
  category: string;
  price: number;
  capacity: number;
  image: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
// функция которая смотрит обязательные поля и если нет то выбрасывает ошибку
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
// эта функция проверяет был ли вход в аккаунт, если нет, то выбрасывает ошибку
export async function createEvent(eventData: CreateEventPayload): Promise<void> {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Сначала войдите в аккаунт");
  }

  const response = await fetch(`${API_URL}/events/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  });
// проверка на запрос 
  const responseText = await response.text();
  let result: unknown;
  if (responseText) {
    try {
      result = JSON.parse(responseText) as unknown;
    } catch {
      result = { message: responseText };
    }
  }

  if (response.ok) {
    const rawMessage = isRecord(result) ? result.message : undefined;
    const message = Array.isArray(rawMessage)
      ? rawMessage.filter((item): item is string => typeof item === "string").join(", ")
      : typeof rawMessage === "string"
        ? rawMessage
        : undefined;
    throw new Error(message || "Не удалось создать мероприятие");
  }
}
