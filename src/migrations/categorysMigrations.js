const { pool } = require('../db');


const insertCategorys = `
insert into categorias (descricao)
values
('Alimentação'),
('Assinatura e Serviços'),
('Casa'),
('Mercado'),
('Cuidados Pessoais'),
('Educacao'),
('Família'),
('Lazer'),
('Pets'),
('Presentes'),
('Roupas'),
('Saúde'),
('Transporte'),
('Salário'),
('Vendas'),
('Outras receitas'),
('Outras despesas');
`;

(async function () {
    await pool.query(insertCategorys);
})();