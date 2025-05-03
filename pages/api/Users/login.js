
import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  await dbConnect();
  const { phone, password } = req.body;

  const user = await User.findOne({ phone });
  if (!user) return res.status(401).json({ error: 'Usuário não encontrado' });

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) return res.status(401).json({ error: 'Senha incorreta' });

  res.status(200).json({ message: 'Login bem-sucedido', userId: user._id });
}
