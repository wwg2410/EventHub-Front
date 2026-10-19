"use client";

import Modal from "./Modal";
import type { Event } from "@/types/event";

interface Props {
  event: Event;
  isDeleting: boolean;
  error: string;
  onConfirm: () => void;
  onClose: () => void;
}

export default function DeleteEventModal({
  event,
  isDeleting,
  error,
  onConfirm,
  onClose,
}: Props) {
  return (
    <Modal title="Удалить мероприятие?" onClose={onClose}>
      <p className="text-sm text-gray-600">
       Вы уверены, что хотите удалить мероприятие &laquo;{event.title}&raquo;? Оно будет удалено без возможности восстановления.
      </p>

      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          Отмена
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={isDeleting}
          className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
        >
          {isDeleting ? "Удаление..." : "Удалить"}
        </button>
      </div>
    </Modal>
  );
}