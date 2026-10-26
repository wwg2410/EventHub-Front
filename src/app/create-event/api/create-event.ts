
export async function createEvent(eventData: {
  title: string;
  description: string;
  date: string;
  address: string;
  price: number;
  capacity: number;
  image: string;
}) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Сначала войдите в аккаунт");
  }

  const response = await fetch("http://localhost:8080/events/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      Array.isArray(result.message)
        ? result.message.join(", ")
        : result.message || "Не удалось создать мероприятие",
    );
  }

  return result;
}
