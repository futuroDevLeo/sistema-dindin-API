create database dindin;

create table if not exists usuarios (
  id serial primary key,
  nome text not null,
  email text unique not null,
  senha text not null
 );

create table if not exists categorias (
  id serial primary key,
  descricao text not null
 );
  
create table if not exists transacoes (
  id serial primary key,
  descricao text not null,
  valor integer not null,
  data date not null,
  categoria_id integer not null references categorias(id),
  usuario_id integer not null references usuarios(id),
  tipo text not null
 );

insert into categorias (
  descricao
)
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