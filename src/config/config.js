process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;

if(process.env.NODE_ENV === 'dev') {
  urlDB = "mongodb://localhost:27017/users";
}else {
  urlDB = process.env.mongoURI;
}

process.env.URLDB = urlDB;


// ================================
// Vencimiento del token
// ================================
process.env.EXP_TOKEN = 60 * 60;

// ================================
// Seed de authenticación
// ================================

process.env.SEED = process.env.SEED || 'Este es el seed de desarrollo';