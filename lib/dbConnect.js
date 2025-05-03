import mongoose from 'mongoose';

const dbConnect = async () => {
  // Verifica se já há uma conexão com o MongoDB, se sim, não faz a conexão novamente
  if (mongoose.connection.readyState >= 1) return;

  try {
    // Estabelece a conexão com o MongoDB usando a URI do ambiente
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado ao MongoDB');
  } catch (error) {
    // Caso ocorra um erro, será mostrado no console
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);  // Encerra o processo se não conseguir conectar
  }
};

export default dbConnect;
