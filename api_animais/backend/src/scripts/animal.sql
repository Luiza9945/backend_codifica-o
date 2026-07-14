CREATE TABLE animal(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(30) NOT NULL,
    especie VARCHAR(50) NOT NULL,
    idade INT,
    status_saude VARCHAR(50) DEFAULT 'Saudável'
);