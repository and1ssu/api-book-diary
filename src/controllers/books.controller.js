const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get book options (genres and statuses)
exports.getBookOptions = async (req, res) => {
  try {
    const options = {
      genres: [
        { value: 'Ficção', label: 'Ficção' },
        { value: 'NãoFicção', label: 'Não Ficção' },
        { value: 'Romance', label: 'Romance' },
        { value: 'Mistério', label: 'Mistério' },
        { value: 'Fantasia', label: 'Fantasia' },
        { value: 'Ciência', label: 'Ciência' },
        { value: 'História', label: 'História' },
        { value: 'Biografia', label: 'Biografia' },
        { value: 'Autoajuda', label: 'Autoajuda' },
        { value: 'Outro', label: 'Outro' }
      ],
      statuses: [
        { value: 'NãoLido', label: 'Não Lido' },
        { value: 'Lendo', label: 'Lendo' },
        { value: 'Lido', label: 'Lido' },
        { value: 'Abandonado', label: 'Abandonado' }
      ]
    };

    res.json({
      success: true,
      data: options
    });
  } catch (error) {
    next(error);
  }
};

// Create a new book
exports.createBook = async (req, res, next) => {
  try {
    const { title, author, genre, status, rating, notes } = req.body;
    const userId = req.user.id;


    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }


    const genreMap = {
      'Ficção': 'Ficção',
      'Não Ficção': 'NãoFicção',
      'Romance': 'Romance',
      'Mistério': 'Mistério',
      'Fantasia': 'Fantasia',
      'Ciência': 'Ciência',
      'História': 'História',
      'Biografia': 'Biografia',
      'Autoajuda': 'Autoajuda',
      'Outro': 'Outro'
    };

    const statusMap = {
      'Não Lido': 'NãoLido',
      'Lendo': 'Lendo',
      'Lido': 'Lido',
      'Abandonado': 'Abandonado'
    };

    const book = await prisma.book.create({
      data: {
        title,
        author,
        genre: genreMap[genre] || 'Outro',
        status: statusMap[status] || 'NãoLido',
        rating,
        notes,
        userId: user.id
      }
    });

    res.status(201).json({
      success: true,
      data: book
    });
  } catch (error) {
    console.error('Erro ao criar livro:', error);

    if (error.code === 'P2003') {
      return res.status(400).json({
        success: false,
        message: 'Erro ao criar livro: Usuário inválido'
      });
    }

    next(error);
  }
};

// Get all books with pagination
exports.getAllBooks = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const userId = req.user.id;
    const [books, total] = await Promise.all([
      prisma.book.findMany({
        where: {
          userId
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.book.count({
        where: {
          userId
        }
      })
    ]);

    res.status(200).json({
      success: true,
      count: books.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: books
    });
  } catch (error) {
    next(error);
  }
};

// Get a single book by ID
exports.getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const book = await prisma.book.findFirst({
      where: {
        id: parseInt(id),
        userId
      }
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Livro não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: book
    });
  } catch (error) {
    next(error);
  }
};

// Update a book
exports.updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, author, genre, status, rating, notes } = req.body;

    const book = await prisma.book.findFirst({
      where: {
        id: parseInt(id),
        userId
      }
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Livro não encontrado'
      });
    }

    const updatedBook = await prisma.book.update({
      where: {
        id: parseInt(id)
      },
      data: {
        title,
        author,
        genre: genre || 'Outro',
        status: status || 'NãoLido',
        rating,
        notes
      }
    });

    res.status(200).json({
      success: true,
      data: updatedBook
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    next(error);
  }
};

// Delete a book
exports.deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const book = await prisma.book.findFirst({
      where: {
        id: parseInt(id),
        userId
      }
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Livro não encontrado'
      });
    }

    await prisma.book.delete({
      where: {
        id: parseInt(id)
      }
    });

    res.status(200).json({
      success: true,
      message: 'Livro deletado com sucesso'
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    next(error);
  }
};

