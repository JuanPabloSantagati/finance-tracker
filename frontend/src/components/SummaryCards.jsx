const formatter = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" });

export default function SummaryCards({ income, expense }) {
  const balance = income - expense;

  const cards = [
    { label: "Ingresos", value: income, color: "text-emerald-600" },
    { label: "Gastos", value: expense, color: "text-red-600" },
    { label: "Balance", value: balance, color: balance >= 0 ? "text-emerald-600" : "text-red-600" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {cards.map((c) => (
        <div key={c.label} className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">{c.label}</p>
          <p className={`mt-1 text-2xl font-semibold ${c.color}`}>{formatter.format(c.value)}</p>
        </div>
      ))}
    </div>
  );
}