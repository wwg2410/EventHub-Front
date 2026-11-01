"use client";

import { useMemo, useState } from "react";
import { Users, Search } from "lucide-react";

export type UserItem = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  events: string[];
};

interface UsersTableProps {
  users: UserItem[];
}

export default function UsersTable({ users }: UsersTableProps) {
  const [userSearch, setUserSearch] = useState("");

  const filteredUsers = useMemo(() => {
    const query = userSearch.trim().toLocaleLowerCase("ru");
    return users.filter((user) => {
      const searchableText = [user.name, user.email, user.role, ...(user.events || [])]
        .join(" ")
        .toLocaleLowerCase("ru");
      return searchableText.includes(query);
    });
  }, [users, userSearch]);

  return (
    <div role="tabpanel" className="mt-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Список пользователей</h2>
              <p className="mt-1 text-sm text-slate-500">Управление пользователями и правами доступа.</p>
            </div>
          </div>
          <span className="flex items-center justify-center rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-500">
            Найдено: <strong className="ml-1 text-slate-700">{filteredUsers.length}</strong>
          </span>
        </div>

        <div className="relative mt-5">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            placeholder="Поиск по имени, email, роли или мероприятию"
            className="h-11 w-full rounded-lg border border-slate-200 pl-10 pr-3 text-sm outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {filteredUsers.length === 0 ? (
          <p className="px-5 py-12 text-center text-sm text-slate-500">Пользователи не найдены.</p>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[850px] text-left text-sm">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-4">Пользователь</th>
                    <th className="px-4 py-4">Email</th>
                    <th className="px-4 py-4">Созданные мероприятия</th>
                    <th className="px-4 py-4">Роль</th>
                    <th className="px-5 py-4">Статус</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="transition-colors hover:bg-slate-50/70">
                      <td className="px-5 py-4 font-semibold text-slate-900">{user.name}</td>
                      <td className="px-4 py-4 text-slate-600">{user.email}</td>
                      <td className="max-w-[280px] px-4 py-4 text-slate-600">
                        {user.events?.length ? user.events.join(", ") : "Нет мероприятий"}
                      </td>
                      <td className="px-4 py-4 text-slate-600">{user.role}</td>
                      <td className="px-5 py-4"><UserStatusBadge status={user.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-slate-100 md:hidden">
              {filteredUsers.map((user) => (
                <article key={user.id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-slate-900">{user.name}</h3>
                    <UserStatusBadge status={user.status} />
                  </div>
                  <p className="mt-1 break-all text-sm text-slate-500">{user.email}</p>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div>
                      <dt className="text-slate-400">Роль</dt>
                      <dd className="mt-1 text-slate-700">{user.role}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-400">Созданные мероприятия</dt>
                      <dd className="mt-1 text-slate-700">
                        {user.events?.length ? user.events.join(", ") : "Нет мероприятий"}
                      </dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function UserStatusBadge({ status }: { status: string }) {
  const styles =
    status === "Accumulated" || status === "Активен"
      ? "bg-emerald-50 text-emerald-700"
      : status === "Неактивен" || status === "Заблокирован"
        ? "bg-red-50 text-red-700"
        : "bg-slate-100 text-slate-600";

  return (
    <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${styles}`}>
      {status}
    </span>
  );
}
