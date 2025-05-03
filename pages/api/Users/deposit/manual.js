
import dbConnect from '../../../../lib/dbConnect';
import Transaction from '../../../../models/Transaction';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  await dbConnect();
  const { userId, amount, method } = req.body;
  const reference = 'REF-' + Math.floor(100000 + Math.random() * 900000);

  try {
    const transaction = new Transaction({
      userId,
      amount,
      method,
      type: 'deposit',
      reference,
    });
    await transaction.save();
    res.status(200).json({ message: 'Depósito criado. Aguarde confirmação.', reference });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar depósito' });
  }
      }
