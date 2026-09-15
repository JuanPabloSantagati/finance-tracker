const formatter = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" });

export default function TransactionList({ transactions, onEdit, onDelete }) {
  if (transactions.length === 0) {
    return <p className="text-sm text-slate-500">Todavía no cargaste ninguna transacción.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            <th className="px-4 py-2">Fecha</th>
            <th className="px-4 py-2">Descripción</th>
            <th className="px-4 py-2">Categoría</th>
            <th className="px-4 py-2 text-right">Monto</th>
            <th className="px-4 py-2 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id} className="border-t border-slate-100">
              <td className="px-4 py-2 text-slate-500">{new Date(t.date).toLocaleDateString("es-AR")}</td>
              <td className="px-4 py-2">{t.description}</td>
              <td className="px-4 py-2 text-slate-500">{t.category}</td>
              <td className={`px-4 py-2 text-right font-medium ${t.type === "income" ? "text-emerald-600" : "text-red-600"}`}>
                {t.type === "income" ? "+" : "-"}{formatter.format(t.amount)}
              </td>
              <td className="px-4 py-2 text-right">
                <button onClick={() => onEdit(t)} className="mr-2 text-indigo-600 hover:underline">Editar</button>
                <button onClick={() => onDelete(t.id)} className="text-red-600 hover:underline">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}