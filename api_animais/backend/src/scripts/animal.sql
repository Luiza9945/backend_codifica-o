CREATE TABLE animal(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(30) NOT NULL,
    especie VARCHAR(50) NOT NULL,
    idade INT,
    status_saude VARCHAR(50) DEFAULT 'Saudável'
);


INSERT INTO animal (nome, especie, idade, status_saude) 
VALUES 
('Menta', 'Leão', 5, 'Saudável'),
('Golias', 'Girafa', 4, 'Saudável'),
('Gloria', 'Hipopótamo', 6, 'Saudável'),
('Fran', 'Zebra', 3, 'Saudável'),
('Pingusso', 'Pinguim', 2, 'Saudável'),
('Pardo', 'Urso', 8, 'Em tratamento'),
('Tempestade', 'Pantera', 5, 'Saudável'),
('Verdinha', 'Píton', 12, 'Saudável'),
('Gorge', 'Macaco-prego', 1, 'Saudável'),
('Tigresa', 'Tigre', 7, 'Em observação');