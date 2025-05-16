const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    // Atualizar todos os livros existentes
    const result = await prisma.book.updateMany({
      where: {
        OR: [
          { genre: null },
          { status: null }
        ]
      },
      data: {
        genre: 'Outro',
        status: 'NãoLido'
      }
    });

    console.log(`Migração concluída. ${result.count} livros atualizados.`);
  } catch (error) {
    console.error('Erro durante a migração:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();