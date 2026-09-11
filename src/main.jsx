import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, ChevronDown, CircleUserRound, Download, Gift, Menu, MessageCircle, Package, Play, ShieldCheck, ShoppingBag, Sparkles, Trophy, UserPlus, X, Zap } from 'lucide-react';
import './styles.css';
import './pages.css';
import './reader.css';
import './logo.css';

const logoPath = '/imagens/logo/logoof.png';

const versions = [
  { id: '251', label: 'DYFUS 2.51', name: 'Dofus Impact', tag: 'A ERA PRINCIPAL', status: 'ONLINE', players: '1.248', desc: 'A experiência completa, com progressão intensa, eventos semanais e uma economia viva.' },
  { id: 'retro', label: 'RETRO 1.29', name: 'Impact Retro', tag: 'CLÁSSICO', status: 'ONLINE', players: '672', desc: 'A nostalgia do clássico com sistemas modernos, balanceamento próprio e comunidade fiel.' },
  { id: '36', label: 'DYFUS 3.6', name: 'Impact 3.6', tag: 'EM BREVE', status: 'EM BREVE', players: '—', desc: 'Uma nova fronteira está sendo forjada. Acompanhe o desenvolvimento desta versão.' }
];

const news = [
  { category: 'ATUALIZAÇÃO', date: '08 SET 2026', title: 'O Festival das Almas chegou ao mundo Impact', text: 'Novas missões, recompensas exclusivas e um mapa tomado por uma energia que ninguém consegue explicar.', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80' },
  { category: 'COMUNIDADE', date: '04 SET 2026', title: 'Conheça os campeões da Arena Impact', text: 'Os melhores estrategistas da temporada contam como chegaram ao topo do ranking PvP.', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80' },
  { category: 'EVENTO', date: '29 AGO 2026', title: 'Caçada ao Dragão: inscrições abertas', text: 'Monte sua guilda, trace sua estratégia e conquiste um lugar na história do servidor.', image: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=900&q=80' }
];

const products = [
  { name: 'VIP IMPACT', type: 'STATUS', price: 'R$ 49,90', detail: '30 dias de benefícios premium', icon: Zap },
  { name: 'BAÚ DO AVENTUREIRO', type: 'ITEM ESPECIAL', price: 'R$ 19,90', detail: 'Itens raros para começar sua jornada', icon: Package },
  { name: '2.500 OGRINES', type: 'OGRINES', price: 'R$ 24,90', detail: 'Moeda oficial da loja Impact', icon: Sparkles }
];

function App() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState('home');
  const [activeVersion, setActiveVersion] = useState('251');
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState('');
  const [liked, setLiked] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => { const timer = setTimeout(() => setLoading(false), 1800); return () => clearTimeout(timer); }, []);
  useEffect(() => { if (!toast) return; const timer = setTimeout(() => setToast(''), 2600); return () => clearTimeout(timer); }, [toast]);
  useEffect(() => { const symbol = document.querySelector('.version-visual .visual-symbol'); if (symbol) symbol.dataset.version = activeVersion; }, [activeVersion]);

  const notify = (message) => {
    if (message === 'Notícia aberta em modo de leitura.') {
      setSelectedNews(news[0]);
      return;
    }
    setToast(message);
  };
  const jump = (id) => {
    setMenuOpen(false);
    if (id === 'home' || ['news', 'store', 'rank', 'vote', 'download'].includes(id)) {
      setPage(id === 'home' ? 'home' : id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
  const current = versions.find((version) => version.id === activeVersion);

  if (loading) return <Loading />;
  return <div className="app">
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <Header onMenu={() => setMenuOpen(!menuOpen)} menuOpen={menuOpen} jump={jump} openLogin={() => setModal('login')} openSignup={() => setModal('signup')} />
    {page !== 'home' ? <Page page={page} jump={jump} notify={notify} /> : <main>
      <section className="hero" id="home">
        <div className="hero-copy reveal">
          <div className="eyebrow"><span className="live-dot" /> SERVIDOR PRIVADO MMORPG <span className="line" /></div>
          <h1>SUA LENDA<br /><em>COMEÇA AQUI.</em></h1>
          <p>Escolha sua aventura e entre em um mundo cheio de desafios, batalhas e recompensas.</p>
          <div className="hero-actions"><button className="button primary" onClick={() => jump('versions')}><Play size={16} fill="currentColor" /> JOGAR AGORA</button><button className="text-button" onClick={() => jump('about')}>CONHEÇA O IMPACT <ArrowRight size={16} /></button></div>
          <div className="player-proof"><div className="avatars"><span>DL</span><span>MK</span><span>+</span></div><div><strong>1.920 aventureiros</strong><small>online neste momento</small></div></div>
        </div>
        <div className="hero-art" aria-hidden="true"><img className="hero-logo" src={logoPath} alt="Logo Dyfus Impact" /><div className="ring ring-a" /><div className="ring ring-b" /></div>
        <div className="scroll-hint">ROLE PARA EXPLORAR <span /></div>
      </section>

      <section className="stats" id="about"><div><strong>03</strong><span>VERSÕES ATIVAS</span></div><div><strong>1.920</strong><span>JOGADORES ONLINE</span></div><div><strong>18.4K</strong><span>CONTAS CRIADAS</span></div><div><strong>07</strong><span>EVENTOS ATIVOS</span></div></section>

      <section className="section versions-section" id="versions"><div className="section-heading"><div><span className="kicker">ESCOLHA SEU CAMINHO</span><h2>Um mundo. <em>Três lendas.</em></h2></div><p>Cada versão possui sua própria identidade, economia e desafios. Onde sua história vai começar?</p></div><div className="version-tabs">{versions.map((version) => <button className={activeVersion === version.id ? 'active' : ''} key={version.id} onClick={() => setActiveVersion(version.id)}>{version.label}<span>{version.status}</span></button>)}</div><div className="version-feature"><div className="version-number">0{versions.findIndex((v) => v.id === activeVersion) + 1}</div><div className="version-info"><span className="kicker">{current.tag}</span><h3>{current.name}</h3><p>{current.desc}</p><div className="version-meta"><span><i className="status-dot" /> {current.status}</span><span><CircleUserRound size={15} /> {current.players} online</span></div><div className="hero-actions"><button className="button primary" disabled={current.status === 'EM BREVE'} onClick={() => notify('Conecte-se ao launcher para jogar!')}><Play size={15} fill="currentColor" /> {current.status === 'EM BREVE' ? 'EM BREVE' : 'JOGAR AGORA'}</button><button className="button outline" onClick={() => jump('download')}><Download size={15} /> SAIBA MAIS</button></div></div><div className="version-visual"><div className="visual-symbol">{activeVersion === 'retro' ? '◈' : activeVersion === '36' ? '◇' : '✦'}</div><span>IMPACT<br /><b>{activeVersion === 'retro' ? 'RETRO' : activeVersion === '36' ? '3.6' : '2.51'}</b></span></div></div></section>

      <section className="section news-section" id="news"><div className="section-heading"><div><span className="kicker">DO DIÁRIO DE BORDO</span><h2>Últimas <em>notícias.</em></h2></div><button className="text-button" onClick={() => notify('A página de notícias completa estará disponível em breve.')}>VER TODAS <ArrowRight size={16} /></button></div><div className="news-grid">{news.map((item) => <article className="news-card" key={item.title}><div className="news-image" style={{ backgroundImage: `url(${item.image})` }}><span>{item.category}</span></div><div className="news-content"><small>{item.date}</small><h3>{item.title}</h3><p>{item.text}</p><button className="text-button" onClick={() => notify('Notícia aberta em modo de leitura.')}>LER NOTÍCIA <ArrowRight size={14} /></button><button className="like-button" onClick={() => setLiked((items) => items.includes(item.title) ? items : [...items, item.title])}>{liked.includes(item.title) ? '♥ CURTIDO' : '♡ CURTIR'}</button></div></article>)}</div></section>

      <section className="section lower-grid"><div className="panel ranking" id="rank"><div className="panel-heading"><div><span className="kicker">AQUELES QUE SE DESTACAM</span><h2>Ranking <em>Impact.</em></h2></div><Trophy size={22} /></div><div className="rank-tabs"><span className="selected">GERAL</span><span>PVP</span><span>GUILDAS</span></div>{[['01','NexuS','42.890'],['02','Avelorn','39.420'],['03','Khal Drogo','36.115'],['04','Lunara','33.870']].map(([position, name, score]) => <div className="rank-row" key={name}><b>{position}</b><span className={`rank-avatar rank-${position}`}>{name[0]}</span><strong>{name}</strong><small>{score} XP</small></div>)}<button className="text-button" onClick={() => notify('Ranking completo em breve.')}>VER RANKING COMPLETO <ArrowRight size={14} /></button></div><div className="panel vote" id="vote"><div className="vote-orb"><Gift size={28} /></div><span className="kicker">RECOMPENSE SUA PRESENÇA</span><h2>Vote. Ganhe.<br /><em>Impacte o mundo.</em></h2><p>Ajude o servidor a crescer e receba recompensas exclusivas para sua jornada.</p><div className="progress-label"><span>PROGRESSO PARA O PRÓXIMO PRÊMIO</span><b>7 / 10 VOTOS</b></div><div className="progress"><span /></div><button className="button primary" onClick={() => notify('Obrigado pelo voto! O portal de votação será aberto em breve.')}>VOTAR AGORA <ArrowRight size={15} /></button></div></section>

      <section className="section store-section" id="store"><div className="section-heading"><div><span className="kicker">FORJE SUA JORNADA</span><h2>Loja <em>Impact.</em></h2></div><button className="text-button" onClick={() => notify('Carrinho vazio.')}>VER CARRINHO <ShoppingBag size={15} /></button></div><div className="product-grid">{products.map(({ name, type, price, detail, icon: Icon }) => <article className="product-card" key={name}><div className="product-icon"><Icon size={28} /></div><span>{type}</span><h3>{name}</h3><p>{detail}</p><strong>{price}</strong><button className="button outline" onClick={() => notify(`${name} adicionado ao carrinho.`)}>ADICIONAR <ShoppingBag size={14} /></button></article>)}</div></section>

      <section className="section download-band" id="download"><div><span className="kicker">PREPARE-SE PARA ENTRAR</span><h2>Seu próximo capítulo<br /><em>está a um download.</em></h2></div><button className="button primary" onClick={() => notify('Download do launcher iniciado.')}>BAIXAR LAUNCHER <Download size={16} /></button></section>
    </main>}
    <footer><div className="footer-brand"><img src={logoPath} alt="Dyfus Impact" /><div><strong>DYFUS <em>IMPACT</em></strong><small>SUA PRÓXIMA AVENTURA COMEÇA AQUI.</small></div></div><div className="footer-links"><span>SUPORTE</span><span>DISCORD</span><span>TERMOS</span><span>REGRAS</span></div><small>© 2026 DYFUS IMPACT. TODOS OS DIREITOS RESERVADOS.</small></footer>
    {modal && <Modal type={modal} close={() => setModal(null)} notify={notify} />}{selectedNews && <NewsReader article={selectedNews} close={() => setSelectedNews(null)} />}{toast && <div className="toast"><ShieldCheck size={18} /> {toast}</div>}
  </div>;
}

function Loading() { return <div className="loading-screen"><img className="loading-logo" src={logoPath} alt="Dyfus Impact" /><p>CARREGANDO SEU PRÓXIMO DESTINO...</p><div className="loading-bar"><span /></div><small>ESTABELECENDO CONEXÃO</small></div>; }
function Header({ onMenu, menuOpen, jump, openLogin, openSignup }) { return <header><button className="brand" onClick={() => jump('home')}><img src={logoPath} alt="Dyfus Impact" /><div><small>PRIVATE MMORPG</small></div></button><nav className={menuOpen ? 'open' : ''}>{[['HOME','home'],['NOTÍCIAS','news'],['LOJA','store'],['RANK','rank'],['VOTO','vote'],['DOWNLOAD','download']].map(([label,id]) => <button key={id} onClick={() => jump(id)}>{label}</button>)}</nav><div className="header-actions"><button className="login-link" onClick={openLogin}>ENTRAR</button><button className="button small" onClick={openSignup}><UserPlus size={14} /> CRIAR CONTA</button></div><button className="menu-toggle" onClick={onMenu}>{menuOpen ? <X /> : <Menu />}</button></header>; }

function Page({ page, jump, notify }) {
  const [selectedNews, setSelectedNews] = useState(null);
  const pageData = {
    news: { kicker: 'DO DIÁRIO DE BORDO', title: <>Notícias <em>Impact.</em></>, intro: 'Atualizações, eventos e histórias que movimentam o mundo Dyfus Impact.' },
    store: { kicker: 'FORJE SUA JORNADA', title: <>Loja <em>Impact.</em></>, intro: 'Itens, VIP e recursos para levar sua aventura ainda mais longe.' },
    rank: { kicker: 'AQUELES QUE SE DESTACAM', title: <>Ranking <em>Impact.</em></>, intro: 'Veja quem está escrevendo seu nome no topo das classificações.' },
    vote: { kicker: 'RECOMPENSE SUA PRESENÇA', title: <>Vote e <em>ganhe.</em></>, intro: 'Ajude o servidor a crescer e receba recompensas exclusivas.' },
    download: { kicker: 'PREPARE-SE PARA ENTRAR', title: <>Baixe o <em>launcher.</em></>, intro: 'Escolha sua versão e entre no mundo Dyfus Impact.' }
  }[page];
  return <main className="inner-page"><section className="page-hero"><span className="kicker">{pageData.kicker}</span><h1>{pageData.title}</h1><p>{pageData.intro}</p><button className="text-button" onClick={() => jump('home')}>← VOLTAR PARA HOME</button></section>{page === 'news' && <div className="page-news news-grid">{news.map((item) => <article className="news-card" key={item.title}><div className="news-image" style={{ backgroundImage: `url(${item.image})` }}><span>{item.category}</span></div><div className="news-content"><small>{item.date}</small><h3>{item.title}</h3><p>{item.text}</p><button className="text-button" onClick={() => setSelectedNews(item)}>LER NOTÍCIA <ArrowRight size={14} /></button></div></article>)}</div>}{page === 'store' && <div className="page-products product-grid">{products.concat(products).map(({ name, type, price, detail, icon: Icon }, index) => <article className="product-card" key={`${name}-${index}`}><div className="product-icon"><Icon size={28} /></div><span>{type}</span><h3>{name}</h3><p>{detail}</p><strong>{price}</strong><button className="button outline" onClick={() => notify(`${name} adicionado ao carrinho.`)}>ADICIONAR <ShoppingBag size={14} /></button></article>)}</div>}{page === 'rank' && <div className="full-panel panel"><div className="rank-tabs"><span className="selected">GERAL</span><span>PVP</span><span>GUILDAS</span><span>KOLIZEU</span></div>{[['01','NexuS','42.890'],['02','Avelorn','39.420'],['03','Khal Drogo','36.115'],['04','Lunara','33.870'],['05','Mordred','31.420'],['06','Elyra','29.760']].map(([position, name, score]) => <div className="rank-row" key={name}><b>{position}</b><span className={`rank-avatar rank-${position}`}>{name[0]}</span><strong>{name}</strong><small>{score} XP</small></div>)}</div>}{page === 'vote' && <div className="vote-page"><div className="vote-step panel"><div className="vote-orb"><Gift size={28} /></div><h2>Vote pelo <em>Impact.</em></h2><p>Acesse um dos sites abaixo, vote no servidor e retorne para receber seus pontos.</p>{['TOP-GAMES', 'SERVIDORES PRIVADOS', 'LISTA MMORPG'].map((site, index) => <button className="vote-link" key={site} onClick={() => notify(`Site de votação ${site} aberto.`)}><span>0{index + 1}</span><strong>{site}</strong><ArrowRight size={16} /></button>)}</div><div className="vote-step panel"><span className="kicker">SEU PROGRESSO</span><h2>7 <small>/ 10 votos</small></h2><p>Faltam 3 votos para desbloquear o próximo prêmio.</p><div className="progress"><span /></div><button className="button primary" onClick={() => notify('Recompensa resgatada em modo demonstrativo.')}>RESGATAR PRÊMIO <Gift size={15} /></button></div></div>}{page === 'download' && <div className="download-list">{versions.map((version) => <article className="download-card" key={version.id}><div><span className="kicker">{version.label}</span><h2>{version.name}</h2><p>{version.desc}</p><small>CLIENTE WINDOWS · 2.4 GB · VERSÃO {version.label}</small></div><button className="button primary" disabled={version.status === 'EM BREVE'} onClick={() => notify(`Download de ${version.label} iniciado.`)}><Download size={16} /> {version.status === 'EM BREVE' ? 'EM BREVE' : 'BAIXAR CLIENTE'}</button></article>)}</div>}{selectedNews && <NewsReader article={selectedNews} close={() => setSelectedNews(null)} />}</main>;
}

function NewsReader({ article, close }) {
  const [liked, setLiked] = useState(false);
  return <div className="modal-backdrop" onClick={close}><article className="news-reader" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={close}><X size={18} /></button><div className="reader-image" style={{ backgroundImage: `url(${article.image})` }}><span>{article.category}</span></div><div className="reader-content"><small>{article.date}</small><h2>{article.title}</h2><p>{article.text}</p><p>O mundo Impact continua em movimento. Prepare seu grupo, acompanhe os eventos e descubra tudo o que esta nova fase reserva para sua jornada.</p><div className="reader-actions"><button className={`button ${liked ? 'liked' : 'outline'}`} disabled={liked} onClick={() => setLiked(true)}>{liked ? '♥ CURTIDO' : '♡ CURTIR NOTÍCIA'}</button><button className="button outline" onClick={close}>FECHAR NOTÍCIA</button></div></div></article></div>;
}
function Modal({ type, close, notify }) { const login = type === 'login'; return <div className="modal-backdrop" onClick={close}><div className="modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={close}><X size={18} /></button><span className="kicker">{login ? 'BEM-VINDO DE VOLTA' : 'JUNTE-SE À LENDA'}</span><h2>{login ? 'Entrar no <em>Impact.</em>' : 'Crie sua <em>conta.</em>'}</h2><p>{login ? 'Acesse sua conta e continue sua jornada.' : 'Seu mundo está esperando por você.'}</p>{!login && <label>LOGIN<input placeholder="Escolha seu nome de aventureiro" /></label>}<label>E-MAIL<input type="email" placeholder="voce@email.com" /></label><label>SENHA<input type="password" placeholder="Sua senha secreta" /></label>{!login && <label>CONFIRMAR SENHA<input type="password" placeholder="Repita sua senha" /></label>}<button className="button primary full" onClick={() => { close(); notify(login ? 'Login demonstrativo realizado.' : 'Conta demonstrativa criada.') }}>{login ? 'ENTRAR NO MUNDO' : 'CRIAR MINHA CONTA'} <ArrowRight size={16} /></button>{login && <button className="modal-helper" onClick={() => notify('Fluxo de recuperação preparado para integração.')}>Esqueci minha senha</button>}</div></div>; }

createRoot(document.getElementById('root')).render(<App />);
