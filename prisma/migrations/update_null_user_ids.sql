-- Primeiro, vamos criar um usuário padrão se não existir
INSERT INTO users (email, password, name, "createdAt", "updatedAt")
SELECT 'default@example.com', '$2a$10$default', 'Usuário Padrão', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'default@example.com');

-- Agora, vamos atualizar os livros com userId nulo
UPDATE books
SET "userId" = (SELECT id FROM users WHERE email = 'default@example.com')
WHERE "userId" IS NULL;