require('dotenv').config();

module.exports = {
  dialect: 'postgres',
  url: process.env.DB_URL,
  define: {
    timestamps: true, // coluna de created_at e updated_at
    underscored: true, // utilizar padrao de separar a palavras com users_cores
    underscoredAll: true,
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // parte de segurança
    },
  },
};
