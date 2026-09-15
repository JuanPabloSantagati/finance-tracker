const prisma = require("../prisma/client");

async function getTransactions(req, res) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId: req.userId },
      orderBy: { date: "desc" },
    });
    return res.json({ transactions });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error al obtener las transacciones" });
  }
}

async function createTransaction(req, res) {
  try {
    const { description, amount, type, category, date } = req.body;

    if (!description || amount === undefined || !type || !category) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    if (!["income", "expense"].includes(type)) {
      return res.status(400).json({ error: "El tipo debe ser 'income' o 'expense'" });
    }

    const transaction = await prisma.transaction.create({
      data: {
        description,
        amount: parseFloat(amount),
        type,
        category,
        date: date ? new Date(date) : new Date(),
        userId: req.userId,
      },
    });

    return res.status(201).json({ transaction });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error al crear la transacción" });
  }
}

async function updateTransaction(req, res) {
  try {
    const { id } = req.params;
    const { description, amount, type, category, date } = req.body;

    const existing = await prisma.transaction.findUnique({ where: { id: Number(id) } });
    if (!existing || existing.userId !== req.userId) {
      return res.status(404).json({ error: "Transacción no encontrada" });
    }

    const transaction = await prisma.transaction.update({
      where: { id: Number(id) },
      data: {
        ...(description !== undefined && { description }),
        ...(amount !== undefined && { amount: parseFloat(amount) }),
        ...(type !== undefined && { type }),
        ...(category !== undefined && { category }),
        ...(date !== undefined && { date: new Date(date) }),
      },
    });

    return res.json({ transaction });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error al actualizar la transacción" });
  }
}

async function deleteTransaction(req, res) {
  try {
    const { id } = req.params;

    const existing = await prisma.transaction.findUnique({ where: { id: Number(id) } });
    if (!existing || existing.userId !== req.userId) {
      return res.status(404).json({ error: "Transacción no encontrada" });
    }

    await prisma.transaction.delete({ where: { id: Number(id) } });

    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error al eliminar la transacción" });
  }
}

module.exports = { getTransactions, createTransaction, updateTransaction, deleteTransaction };