
import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  method: String, // 'mpesa' ou 'emola'
  type: String, // 'deposit' ou 'withdrawal'
  status: { type: String, default: 'pending' },
  reference: String,
  createdAt: { type: Date, default: Date.now },
});

const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
export default Transaction;
