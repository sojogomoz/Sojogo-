
import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  await dbConnect();
  const { phone, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({ phone, passwordHash });
    await newUser.save();
    res.status(201).json({ message: 'Usuário criado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
}
