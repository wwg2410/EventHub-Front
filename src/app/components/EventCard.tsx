import { Pencil, Trash2 } from "lucide-react";
import { formatDate } from "@/utils/format-date";
import type { Event } from "@/types/event";

interface Props {
  event: Event;
  onEdit?: (event: Event) => void;
  onDelete?: (event: Event) => void;
}

export default function EventCard({ event, onEdit, onDelete }: Props) {
  return (
    <article className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
      <div className="min-w-0">
        {event.category && (
          <span className="inline-block bg-blue-50 text-blue-600 text-xs font-medium px-2.5 py-0.5 rounded-md mb-2">
            {event.category}
          </span>
        )}
        <h3 className="font-semibold text-gray-900 text-base">{event.title}</h3>
        <p className="text-sm text-gray-500 mt-1">
          {formatDate(event.date)}, {event.time} &bull; {event.address}
        </p>
        <p className="text-sm text-gray-500 mt-0.5">
          {event.price > 0 ? `${event.price} сом` : "Бесплатно"} &bull; мест: {event.seats}
        </p>
      </div>

      {(onEdit || onDelete) && (
        <div className="flex shrink-0 gap-1.5">
          {onEdit && (
            <button
              type="button"
              onClick={() => onEdit(event)}
              className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-blue-600"
            >
              <Pencil size={16} />
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(event)}
              className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      )}
    </article>
  );
}