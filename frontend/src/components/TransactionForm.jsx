import { useState } from "react";

const CATEGORIES = ["Comida", "Transporte", "Vivienda", "Entretenimiento", "Salud", "Sueldo", "Otros"];

export default function TransactionForm({ onSubmit, initialData, onCancel }) {
  const [description, setDescription] = useState(initialData?.description || "");
  const [amount, setAmount] = useState(initialData?.amount ?? "");
  const [type, setType] = useState(initialData?.type || "expense");
  const [category, setCategory] = useState(initialData?.category || CATEGORIES[0]);
  const [date, setDate] = useState(
    initialData?.date ? initialData.date.slice(0, 10) : new Date().toISOString().slice(0, 10)
  );
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!description.trim() || !amount) {
      setError("Completá la descripción y el monto");
      return;
    }

    onSubmit({ description, amount: Number(amount), type, category, date });

    if (!initialData) {
      setDescription("");
      setAmount("");
      setType("expense");
      setCategory(CATEGORIES[0]);
      setDate(new Date().toISOString().slice(0, 10));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:grid-cols-2">
      {error && <p className="col-span-full text-sm text-red-600">{error}</p>}

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-slate-700">Descripción</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          placeholder="Ej: Supermercado"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-slate-700">Monto</label>
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          placeholder="0.00"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-slate-700">Tipo</label>
        <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-md border border-slate-300 px-3 py-2 text-sm">
          <option value="expense">Gasto</option>
          <option value="income">Ingreso</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-slate-700">Categoría</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-md border border-slate-300 px-3 py-2 text-sm">
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-slate-700">Fecha</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="col-span-full flex gap-2">
        <button type="submit" className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
          {initialData ? "Guardar cambios" : "Agregar transacción"}
        </button>
        {initialData && (
          <button type="button" onClick={onCancel} className="rounded-md bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}