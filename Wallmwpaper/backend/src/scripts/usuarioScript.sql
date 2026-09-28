
CREATE TABLE IF NOT EXISTS public.usuarios
(
    id serial NOT NULL,
    nome text NOT NULL,
    email character varying NOT NULL,
    senha character varying NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.wallpapers
(
    id serial NOT NULL,
    wallpaper character varying NOT NULL,
    id_criador integer NOT NULL,
    descricao text NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.wallpapers
    ADD FOREIGN KEY (id_criador)
    REFERENCES public.usuarios (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


	INSERT INTO public.usuarios (nome, email, senha)VALUES
('Ana Silva', 'ana@email.com', '123456'),
('Lucas Souza', 'lucas@email.com', '123456'),
('Mariana Oliveira', 'mariana@email.com', '123456'),
('João Santos', 'joao@email.com', '123456'),
('Beatriz Costa', 'beatriz@email.com', '123456');


INSERT INTO public.wallpapers (wallpaper, id_criador, descricao )
VALUES
('https://i.pinimg.com/736x/dc/c3/31/dcc331f46893a3730a0278ff311686b5.jpg', 1, 'Filhotes de gatos em diferentes posições sobre um fundo rosa com brilhos'),
('https://i.pinimg.com/736x/11/e4/7d/11e47d4dadcc16fd32ddafc6900f740d.jpg', 2, 'Ilustração floral em tons de rosa com flores, folhas e detalhes dourados'),
('https://i.pinimg.com/736x/bd/64/3e/bd643e06d42c995057d5ee6528470b93.jpg', 3, 'Gato siamês segurando um copo em uma composição artística com fundo rosa'),
('https://i.pinimg.com/1200x/52/3b/de/523bde3619191fb580db2b06e6fe7cfc.jpg', 1, 'Gato tricolor descansando entre folhas, flores e hortênsias'),
('https://i.pinimg.com/1200x/62/20/24/622024330c2f3ad4816786bae1787067.jpg', 4, 'Paisagem natural com lago verde, cachoeira e vegetação ao redor'),
('https://i.pinimg.com/1200x/6a/b2/cb/6ab2cbc74e096674cbe9a56f4ff6f25b.jpg', 5, 'Lago ao entardecer cercado por árvores, com céu alaranjado e montanhas ao fundo');

SELECT * from usuarios

SELECT 
    wallpapers.id,
    wallpapers.wallpaper,
    wallpapers.descricao,
    usuarios.nome AS criador
FROM wallpapers
INNER JOIN usuarios
ON wallpapers.id_criador = usuarios.id;