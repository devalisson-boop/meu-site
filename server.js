const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const path = require('path');
const session = require('express-session');  // Aqui está a importação do express-session


const app = express();
const port = 3000;



// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Adicione sua senha do MySQL se houver
  database: 'gamer_store'
});

db.connect((err) => {
  if (err) {
    console.error('❌ Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('✅ Conectado ao banco de dados MySQL!');
});

// Middleware para tratar dados recebidos e arquivos estáticos
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve os arquivos HTML, CSS, JS da pasta 'public'

// Sessão
app.use(session({
  secret: 'chave_secreta_gamer', // Troque por algo mais seguro em produção
  resave: false,
  saveUninitialized: true
}));



// Rota para cadastro
app.post('/cadastro', async (req, res) => {
  const { nome, dataNascimento, email, password } = req.body;

  console.log('📥 Dados recebidos:', req.body);

  // Verifica se todos os campos foram preenchidos
  if (!nome || !dataNascimento || !email || !password) {
    return res.status(400).send("⚠️ Preencha todos os campos.");
  }

  try {
    // Criptografar senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Query SQL para inserir usuário
    const sql = 'INSERT INTO usuarios (nome, data_nascimento, email, senha) VALUES (?, ?, ?, ?)';
    const values = [nome, dataNascimento, email, hashedPassword];

    console.log('📤 Executando SQL:', sql, values);

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('❌ Erro ao inserir no banco de dados:', err);
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).send('⚠️ Email já cadastrado.');
        }
        return res.status(500).send('❌ Erro ao cadastrar.');
      }

      console.log('✅ Cadastro realizado com sucesso!');
      res.status(200).send('Cadastro realizado com sucesso!');
    });

  } catch (error) {
    console.error('❌ Erro interno do servidor:', error);
    res.status(500).send('Erro interno do servidor.');
  }
});

// Rota de Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Preencha todos os campos.');
  }

  const sql = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);
      return res.status(500).send('Erro ao buscar usuário.');
    }

    if (results.length === 0) {
      return res.status(401).send('Email não cadastrado.');
    }

    const user = results[0];

    // Verifica se a senha é válida
    const isMatch = await bcrypt.compare(password, user.senha);
    if (!isMatch) {
      return res.status(401).send('Senha incorreta.');
    }

    // Armazena o ID do usuário na sessão
    req.session.user = { id: user.id, nome: user.nome };
    
    // Redireciona para a página inicial ou outra página relevante
    res.status(200).send('Login realizado com sucesso!');
  });
});

// Inicia o servidor

app.get('/api/session', (req, res) => {
  if (req.session && req.session.user) {
    res.json({ logged: true, nome: req.session.user.nome, id: req.session.user.id, email: req.session.user.email });
  } else {
    res.json({ logged: false });
  }
});

app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});


// Rota para salvar itens no carrinho
app.post('/api/carrinho', (req, res) => {
  const { usuario_id, produto_nome, preco, quantidade, imagem_url } = req.body;

  const sql = `
    INSERT INTO carrinho (usuario_id, produto_nome, preco, quantidade, imagem_url)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [usuario_id, produto_nome, preco, quantidade, imagem_url], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao salvar no carrinho');
    } else {
      res.status(200).send('Item adicionado ao carrinho');
    }
  });
});

// Rota para buscar itens do carrinho
app.get('/api/carrinho/:usuario_id', (req, res) => {
  const { usuario_id } = req.params;

  const sql = `SELECT * FROM carrinho WHERE usuario_id = ?`;

  db.query(sql, [usuario_id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao buscar o carrinho');
    } else {
      res.status(200).json(results);
    }
  });
});


// Checa se está logado (sessão)
app.get('/api/session', (req, res) => {
  if (req.session && req.session.user) {
    res.json({ logged: true, nome: req.session.user.nome, id: req.session.user.id, email: req.session.user.email });
  } else {
    res.json({ logged: false });
  }
});

// Logout
app.post('/api/logout', (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

// Dados do perfil do usuário
app.get('/api/perfil', (req, res) => {
  if (!req.session || !req.session.user) return res.status(401).json({ error: 'Não autorizado' });
  const userId = req.session.user.id;
  db.query(
    'SELECT id, nome, data_nascimento, email FROM usuarios WHERE id = ?',
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Erro interno' });
      if (results.length === 0) return res.status(404).json({ error: 'Usuário não encontrado' });

      // Buscar compras
      db.query(
        'SELECT id, produto_nome, preco, quantidade, imagem_url FROM carrinho WHERE usuario_id = ? ORDER BY id DESC LIMIT 10',
        [userId],
        (err2, compras) => {
          if (err2) return res.status(500).json({ error: 'Erro ao buscar compras' });
          res.json({ ...results[0], compras });
        }
      );
    }
  );
});



// Rota para registrar pedido (checkout)
app.post('/api/pedido', (req, res) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({error: "Usuário não autenticado"});
  }
  const { usuario_id, itens, total, pagamento } = req.body;
  // Aqui você pode criar uma tabela de pedidos e itens_pedido para produção
  // Para simplicidade, vamos salvar como "compra" na tabela carrinho!
  if (!Array.isArray(itens) || itens.length === 0) {
    return res.status(400).json({error: "Carrinho vazio"});
  }
  // Simula registro de cada item como uma "compra"
  let inseridos = 0, erros = 0;
  itens.forEach(item => {
    db.query(
      `INSERT INTO carrinho (usuario_id, produto_nome, preco, quantidade, imagem_url)
      VALUES (?, ?, ?, ?, ?)`,
      [usuario_id, item.nome, item.preco, item.quantidade, item.imagem_url],
      (err) => {
        if(err) erros++;
        else inseridos++;
        if(inseridos + erros === itens.length) {
          if(erros === 0) res.json({success:true});
          else res.json({success:false, error:'Erro ao registrar itens'});
        }
      }
    );
  });
});