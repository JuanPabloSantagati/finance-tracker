import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import SummaryCards from "../components/SummaryCards";
import CategoryChart from "../components/CategoryChart";
import api from "../services/api";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingTransaction, setEditingTransaction] = useState(null);

  async function loadTransactions() {
    try {
      const { data } = await api.get("/transactions");
      setTransactions(data.transactions);
    } catch (err) {
      setError("No se pudieron cargar las transacciones");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  async function handleCreate(values) {
    try {
      const { data } = await api.post("/transactions", values);
      setTransactions((prev) => [data.transaction, ...prev]);
    } catch (err) {
      setError(err.response?.data?.error || "Error al crear la transacción");
    }
  }

  async function handleUpdate(values) {
    try {
      const { data } = await api.put(`/transactions/${editingTransaction.id}`, values);
      setTransactions((prev) => prev.map((t) => (t.id === data.transaction.id ? data.transaction : t)));
      setEditingTransaction(null);
    } catch (err) {
      setError(err.response?.data?.error || "Error al actualizar la transacción");
    }
  }

  async function handleDelete(id) {
    if (!confirm("¿Eliminar esta transacción?")) return;
    try {
      await api.delete(`/transactions/${id}`);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.response?.data?.error || "Error al eliminar la transacción");
    }
  }

  const income = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-6">
        <h1 className="mb-4 text-2xl font-semibold text-slate-900">Mis finanzas</h1>

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        <div className="mb-6">
          <SummaryCards income={income} expense={expense} />
        </div>

        <div className="mb-6">
          <CategoryChart transactions={transactions} />
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-lg font-medium text-slate-800">
            {editingTransaction ? "Editar transacción" : "Nueva transacción"}
          </h2>
          <TransactionForm
            key={editingTransaction?.id || "new"}
            onSubmit={editingTransaction ? handleUpdate : handleCreate}
            initialData={editingTransaction}
            onCancel={() => setEditingTransaction(null)}
            />
        </div>

        <div>
          <h2 className="mb-2 text-lg font-medium text-slate-800">Transacciones</h2>
          {loading ? (
            <p className="text-sm text-slate-500">Cargando...</p>
          ) : (
            <TransactionList transactions={transactions} onEdit={setEditingTransaction} onDelete={handleDelete} />
          )}
        </div>
      </main>
    </div>
  );
}