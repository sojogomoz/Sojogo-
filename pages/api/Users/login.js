import dbConnect from '../../../lib/dbConnect'; // Caminho corrigido
import User from '../../../models/User'; // Caminho corrigido
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ message: 'Preencha todos os campos.' });
  }

  try {
    await dbConnect();

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Senha incorreta.' });
    }

    res.status(200).json({ message: 'Login bem-sucedido', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
                  }
