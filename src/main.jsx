function PrizeHistory({ entries }) { return <div className="prize-history"><div className="history-heading"><div><span className="kicker">HISTÓRICO DE PRÊMIOS</span><h2>Prêmios <em>entregues.</em></h2></div><small>{entries.length} GIROS REGISTRADOS</small></div>{entries.length === 0 ? <p className="history-empty">Nenhum prêmio saiu ainda. Seja o primeiro a girar.</p> : <div className="history-list">{entries.map((entry, index) => <div className="history-row" key={`${entry.prize}-${index}`}><b>#{String(entries.length - index).padStart(2, '0')}</b><span className="history-icon"><Gift size={16} /></span><strong>{entry.prize}</strong><small>{entry.time}</small><em>ENTREGUE</em></div>)}</div>}</div>; }
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, ChevronDown, CircleUserRound, Download, Gift, LogIn, Menu, MessageCircle, Package, Play, Settings, ShieldCheck, ShoppingBag, Sparkles, Trophy, UserPlus, X, Zap } from 'lucide-react';
import './styles.css';
import './pages.css';
import './reader.css';
import './logo.css';

import logoPath from '../imagens/logo/logoof.png';
import rankGeralImage from '../imagens/rank/rankgeral.jpg';
import rankPvpImage from '../imagens/rank/rankpvp.png';
import rankGuildaImage from '../imagens/rank/rankguilda.jpg';
import rankSonhoImage from '../imagens/rank/ranksonho.jpg';
import rankVotoImage from '../imagens/rank/rankvoto.jpg';
import prizeShowcaseImage from '../imagens/images.jfif';

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

const rankBoards = {
  GERAL: [['01', 'NexuS', '42.890', 'Iop', '200', 'Os Vaillants', 'N'], ['02', 'Avelorn', '39.420', 'Cra', '199', 'Sakura', 'A'], ['03', 'Khal Drogo', '36.115', 'Sacrier', '198', 'Impact Prime', 'K'], ['04', 'Lunara', '33.870', 'Eniripsa', '197', 'Lendas', 'L'], ['05', 'Mordred', '31.420', 'Sram', '196', 'Ordem Solar', 'M'], ['06', 'Elyra', '29.760', 'Sadida', '195', 'Aurora', 'E']],
  PVP: [['01', 'Khal Drogo', '18.640', 'Sacrier', '198', 'Impact Prime', 'K'], ['02', 'NexuS', '17.920', 'Iop', '200', 'Os Vaillants', 'N'], ['03', 'Lunara', '16.870', 'Eniripsa', '197', 'Lendas', 'L'], ['04', 'Avelorn', '15.430', 'Cra', '199', 'Sakura', 'A'], ['05', 'Mordred', '14.980', 'Sram', '196', 'Ordem Solar', 'M'], ['06', 'Elyra', '13.760', 'Sadida', '195', 'Aurora', 'E']],
  GUILDAS: [['01', 'Os Vaillants', '27.255'], ['02', 'Sakura', '21.969'], ['03', 'Impact Prime', '19.840'], ['04', 'Lendas', '18.420'], ['05', 'Ordem Solar', '16.910'], ['06', 'Aurora', '15.670']],
  KOLIZEU: [['01', 'Avelorn', '12.890', 'Cra', '199', 'Sakura', 'A'], ['02', 'NexuS', '12.420', 'Iop', '200', 'Os Vaillants', 'N'], ['03', 'Khal Drogo', '11.975', 'Sacrier', '198', 'Impact Prime', 'K'], ['04', 'Lunara', '10.860', 'Eniripsa', '197', 'Lendas', 'L'], ['05', 'Mordred', '10.210', 'Sram', '196', 'Ordem Solar', 'M'], ['06', 'Elyra', '9.740', 'Sadida', '195', 'Aurora', 'E']]
};
const rankImages = { GERAL: rankGeralImage, PVP: rankPvpImage, GUILDAS: rankGuildaImage, KOLIZEU: rankSonhoImage, VOTO: rankVotoImage };
const avatarImages = import.meta.glob('../imagens/avatar/*.jpg', { eager: true, query: '?url', import: 'default' });
const getAvatarImage = (className) => avatarImages[`../imagens/avatar/${className.toLowerCase()}.jpg`];

const testAccount = { email: 'teste@dyfus.com', password: 'Impact@123' };

function App() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState('home');
  const [activeVersion, setActiveVersion] = useState('251');
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem('dyfus_logged_in') === 'true');
  const [toast, setToast] = useState('');
  const [liked, setLiked] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [accountSettingsOpen, setAccountSettingsOpen] = useState(false);

  useEffect(() => { const timer = setTimeout(() => setLoading(false), 1800); return () => clearTimeout(timer); }, []);
  useEffect(() => { if (!toast) return; const timer = setTimeout(() => setToast(''), 2600); return () => clearTimeout(timer); }, [toast]);
  useEffect(() => { const symbol = document.querySelector('.version-visual .visual-symbol'); if (symbol) symbol.dataset.version = activeVersion; }, [activeVersion]);
  useLayoutEffect(() => {
    if (loading || page !== 'home') return undefined;
    const tabs = document.querySelectorAll('.ranking .rank-tabs span');
    const rows = document.querySelectorAll('.ranking .rank-row');
    const homeBoards = { GERAL: rankBoards.GERAL, PVP: rankBoards.PVP, GUILDAS: rankBoards.GUILDAS };
    const selectBoard = (boardName) => {
      const entries = homeBoards[boardName];
      entries.slice(0, rows.length).forEach(([position, name, score, className = 'Aventureiro', , , avatar = name[0]], index) => {
        const row = rows[index];
        if (!row) return;
        row.querySelector('b').textContent = position;
        row.querySelector('strong').textContent = name;
        row.querySelector('small').textContent = `${score} XP`;
        const avatarElement = row.querySelector('.rank-avatar');
        const image = getAvatarImage(className);
        avatarElement.textContent = image ? '' : avatar;
        avatarElement.style.backgroundImage = image ? `url(${image})` : '';
      });
      tabs.forEach((tab) => tab.classList.toggle('selected', tab.textContent === boardName));
    };
    const handlers = [...tabs].map((tab) => {
      const handler = () => selectBoard(tab.textContent);
      tab.addEventListener('click', handler);
      return [tab, handler];
    });
    selectBoard('GERAL');
    return () => handlers.forEach(([tab, handler]) => tab.removeEventListener('click', handler));
  }, [loading, page]);

  const notify = (message) => {
    if (message === 'Notícia aberta em modo de leitura.') {
      setSelectedNews(news[0]);
      return;
    }
    setToast(message);
  };
  const jump = (id) => {
    setMenuOpen(false);
    if (id === 'vote' && !loggedIn) {
      setModal('login');
      return;
    }
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
    <Header onMenu={() => setMenuOpen(!menuOpen)} menuOpen={menuOpen} jump={jump} openLogin={() => setModal('login')} openSignup={() => setModal('signup')} loggedIn={loggedIn} accountMenuOpen={accountMenuOpen} setAccountMenuOpen={setAccountMenuOpen} openSettings={() => setAccountSettingsOpen(true)} logout={() => { localStorage.removeItem('dyfus_logged_in'); setLoggedIn(false); setAccountMenuOpen(false); notify('Você saiu da conta.'); }} />
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
    {modal && <Modal type={modal} close={() => setModal(null)} notify={notify} onAuthenticated={() => { localStorage.setItem('dyfus_logged_in', 'true'); setLoggedIn(true); }} />}{accountSettingsOpen && <AccountSettings close={() => setAccountSettingsOpen(false)} notify={notify} />}{selectedNews && <NewsReader article={selectedNews} close={() => setSelectedNews(null)} />}{toast && <div className="toast"><ShieldCheck size={18} /> {toast}</div>}
  </div>;
}

function Loading() { return <div className="loading-screen"><img className="loading-logo" src={logoPath} alt="Dyfus Impact" /><p>CARREGANDO SEU PRÓXIMO DESTINO...</p><div className="loading-bar"><span /></div><small>ESTABELECENDO CONEXÃO</small></div>; }
function AccountSettings({ close, notify }) { const [selectedAvatar, setSelectedAvatar] = useState('Iop'); const [avatarPickerOpen, setAvatarPickerOpen] = useState(false); const [currentPassword, setCurrentPassword] = useState(''); const [newPassword, setNewPassword] = useState(''); const [secretAnswer, setSecretAnswer] = useState(''); const [nickname, setNickname] = useState('NexuS'); const [email, setEmail] = useState('teste@dyfus.com'); const avatarNames = Object.keys(avatarImages).map((path) => path.split('/').pop().replace('.jpg', '')).sort(); const dataChanged = nickname !== 'NexuS' || email !== 'teste@dyfus.com' || newPassword !== '' || secretAnswer !== ''; const saveSettings = () => { if (dataChanged && currentPassword !== testAccount.password) { notify('Confirme a senha atual para alterar os dados.'); return; } close(); notify(selectedAvatar !== 'Iop' && !dataChanged ? 'Avatar alterado com sucesso.' : 'Configurações salvas.'); }; return <div className="modal-backdrop" onClick={close}><section className="account-settings" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={close} aria-label="Fechar"><X size={18} /></button><div className="modal-brand"><img src={logoPath} alt="Dyfus Impact" /><span>CONFIGURAÇÃO DA CONTA</span></div><span className="kicker">CONTA DO AVENTUREIRO</span><h2>Suas <em>configurações.</em></h2><p>Gerencie os dados e preferências da sua conta Impact.</p><div className="settings-section"><h3>AVATAR DA CONTA</h3><div className="avatar-setting"><img src={getAvatarImage(selectedAvatar)} alt={`Avatar ${selectedAvatar}`} /><button className="button outline" onClick={() => setAvatarPickerOpen(!avatarPickerOpen)}>ALTERAR AVATAR <ChevronDown size={15} /></button></div>{avatarPickerOpen && <div className="avatar-picker">{avatarNames.map((avatarName) => <button className={selectedAvatar === avatarName ? 'selected' : ''} key={avatarName} onClick={() => { setSelectedAvatar(avatarName); setAvatarPickerOpen(false); }}><img src={getAvatarImage(avatarName)} alt={avatarName} /><span>{avatarName}</span></button>)}</div>}</div><div className="settings-section"><h3>DADOS DA CONTA</h3><label>TROCAR APELIDO<input value={nickname} onChange={(event) => setNickname(event.target.value)} /></label><label>TROCAR E-MAIL<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label></div><div className="settings-section"><h3>SEGURANÇA</h3><label>TROCAR SENHA<input type="password" placeholder="Digite a nova senha" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} /></label><label>TROCAR RESPOSTA SECRETA<input type="password" placeholder="Digite a nova resposta secreta" value={secretAnswer} onChange={(event) => setSecretAnswer(event.target.value)} /></label>{dataChanged && <label className="current-password">SENHA ATUAL<input type="password" placeholder="Confirme sua senha atual" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} /></label>}</div><button className="button primary full" onClick={saveSettings}>SALVAR ALTERAÇÕES <ArrowRight size={16} /></button></section></div>; }
function Header({ onMenu, menuOpen, jump, openLogin, openSignup, loggedIn, accountMenuOpen, setAccountMenuOpen, openSettings, logout }) { return <header><button className="brand" onClick={() => jump('home')}><img src={logoPath} alt="Dyfus Impact" /><div><small>PRIVATE MMORPG</small></div></button><nav className={menuOpen ? 'open' : ''}>{[['HOME','home'],['NOTÍCIAS','news'],['LOJA','store'],['RANK','rank'],['VOTO','vote'],['DOWNLOAD','download']].map(([label,id]) => <button key={id} onClick={() => jump(id)}>{label}</button>)}</nav><div className="header-actions">{loggedIn ? <div className="account-area"><button className="account-chip" onClick={() => setAccountMenuOpen(!accountMenuOpen)}><img src={getAvatarImage('Iop')} alt="Avatar da conta conectada" /><span><b>NexuS</b><small>CONECTADO</small></span><ChevronDown size={14} /></button>{accountMenuOpen && <div className="account-menu"><div className="account-summary"><strong>NexuS</strong><span>teste@dyfus.com</span></div><div className="account-info"><span><b>STATUS</b>VIP</span><span><b>OGRINES</b>2.500</span><span><b>PERSONAGENS</b>3</span></div><button onClick={openSettings}><Settings size={15} /> CONFIGURAÇÃO</button><button onClick={logout}><LogIn size={15} /> SAIR</button></div>}</div> : <><button className="login-link" onClick={openLogin}><LogIn size={16} /> CONECTE-SE</button><button className="button small" onClick={openSignup}><UserPlus size={14} /> CRIAR CONTA</button></>}</div><button className="menu-toggle" onClick={onMenu}>{menuOpen ? <X /> : <Menu />}</button></header>; }

function LegacyRoulette({ prizes, freeSpins, ogrines, spinResult, spinning, spinWheel }) { return null; }
function Roulette({ prizes, freeSpins, ogrines, spinResult, spinning, activePrizeIndex, spinWheel }) { return <div className="roulette-page"><div className="roulette-board"><div className="roulette-title"><span>ROULETA DE RECOMPENSAS</span><h2>CONFIRA OS <em>PRÊMIOS</em></h2><p>1 giro a cada 10 votos ou compre por 250 Ogrines</p></div><div className="prize-board">{prizes.map((prize, index) => <div className={`prize-tile ${index === 2 ? 'featured' : ''} ${spinning && activePrizeIndex === index ? 'prize-active' : ''} ${!spinning && activePrizeIndex === index ? 'prize-winner' : ''}`} key={prize}><span>PRÊMIO {String(index + 1).padStart(2, '0')}</span><strong>{prize}</strong><small>{index === 0 ? 'OGRINES' : index === 2 ? 'VIP IMPACT' : 'RECOMPENSA'}</small></div>)}<div className="roulette-result ${spinning ? 'spinning' : ''}"><img src={prizeShowcaseImage} alt="Todos os prêmios da roleta" /><div className="roulette-result-content"><Gift size={25} /><strong>{spinResult}</strong><button className="button primary" disabled={spinning || freeSpins < 1} onClick={() => spinWheel()}>GIRAR GRÁTIS ({freeSpins})</button></div></div></div><div className="wheel-actions"><button className="button outline" disabled={spinning || ogrines < 250} onClick={() => spinWheel(true)}>COMPRAR GIRO · 250 OGRINES <Sparkles size={15} /></button></div><div className="wheel-balance"><span>SEU SALDO <b>{ogrines.toLocaleString('pt-BR')} OGRINES</b></span><span>PRÓXIMO GIRO GRÁTIS <b>10 VOTOS</b></span></div></div><div className="vote-step panel"><span className="kicker">COMO FUNCIONA</span><h2>Vote. Gire.<br /><em>Ganhe recompensas.</em></h2><p>Participe das votações do servidor e acumule giros para concorrer a prêmios especiais.</p>{prizes.map((prize, index) => <div className="prize-line" key={prize}><span>0{index + 1}</span><strong>{prize}</strong><small>PRÊMIO</small></div>)}</div></div>; }

function Page({ page, jump, notify }) {
  const [selectedNews, setSelectedNews] = useState(null);
  const [rankFilter, setRankFilter] = useState('GERAL');
  const [freeSpins, setFreeSpins] = useState(1);
  const [ogrines, setOgrines] = useState(2500);
  const [spinResult, setSpinResult] = useState('Gire para descobrir seu prêmio');
  const [spinning, setSpinning] = useState(false);
  const [activePrizeIndex, setActivePrizeIndex] = useState(-1);
  const [prizeHistory, setPrizeHistory] = useState([]);
  const spinTimer = useRef(null);
  const prizes = ['1.000 Ogrines', 'Baú do Aventureiro', 'VIP por 3 dias', '100.000 Kamas', 'Chave de Calabouço', 'Título exclusivo', 'Passe de Batalha', 'Emote raro'];
    const spinWheel = (paid = false) => {
    if (spinning || (paid ? ogrines < 250 : freeSpins < 1)) return;
    setSpinning(true);
      const winner = Math.floor(Math.random() * prizes.length);
      let current = 0;
      setActivePrizeIndex(0);
    if (paid) setOgrines((value) => value - 250); else setFreeSpins((value) => value - 1);
      spinTimer.current = setInterval(() => {
        current += 1;
        setActivePrizeIndex(current % prizes.length);
        if (current >= prizes.length * 2 + winner) {
          clearInterval(spinTimer.current);
          setActivePrizeIndex(winner);
          setSpinResult(prizes[winner]);
          setPrizeHistory((entries) => [{ prize: prizes[winner], time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) }, ...entries]);
          setSpinning(false);
        }
      }, 150);
  };
  const rankEntries = rankBoards[rankFilter];
  useLayoutEffect(() => {
    if (page !== 'rank') return undefined;
    const tabs = document.querySelectorAll('.full-panel .rank-tabs span');
    const rows = document.querySelectorAll('.full-panel .rank-row');
    const selectRank = (filter) => {
      setRankFilter(filter);
      document.querySelector('.full-panel')?.style.setProperty('--rank-cover', `url(${rankImages[filter]})`);
      rankBoards[filter].forEach(([position, name, score, className = 'Aventureiro', level = '—', guild = 'Sem guilda', avatar = name[0]], index) => {
        const row = rows[index];
        if (!row) return;
        row.querySelector('b').textContent = position;
        const avatarElement = row.querySelector('.rank-avatar');
        const avatarImage = getAvatarImage(className);
        avatarElement.textContent = avatarImage ? '' : avatar;
        avatarElement.style.backgroundImage = avatarImage ? `url(${avatarImage})` : '';
        avatarElement.style.backgroundSize = 'cover';
        avatarElement.style.backgroundPosition = 'center';
        row.querySelector('strong').textContent = name;
        row.querySelector('small').textContent = `${score} XP`;
        let details = row.querySelector('.rank-details');
        if (!details) {
          details = document.createElement('div');
          details.className = 'rank-details';
          row.append(details);
        }
        details.innerHTML = `<span><b>CLASSE</b>${className}</span><span><b>NÍVEL</b>${level}</span><span><b>GUILDA</b>${guild}</span>`;
      });
      tabs.forEach((tab) => tab.classList.toggle('selected', tab.textContent === filter));
    };
    const handlers = [...tabs].map((tab) => {
      tab.setAttribute('role', 'button');
      tab.setAttribute('tabindex', '0');
      const handler = () => selectRank(tab.textContent);
      tab.addEventListener('click', handler);
      return [tab, handler];
    });
    selectRank(rankFilter);
    return () => handlers.forEach(([tab, handler]) => tab.removeEventListener('click', handler));
  }, [page, rankFilter]);
  useEffect(() => {
    if (page !== 'vote') return undefined;
    const host = document.createElement('div');
    host.className = 'roulette-host';
    const innerPage = document.querySelector('.inner-page');
    innerPage?.appendChild(host);
    const root = createRoot(host);
    root.render(<><Roulette prizes={prizes} freeSpins={freeSpins} ogrines={ogrines} spinResult={spinResult} spinning={spinning} activePrizeIndex={activePrizeIndex} spinWheel={spinWheel} /><PrizeHistory entries={prizeHistory} /></>);
    return () => { root.unmount(); host.remove(); };
  }, [page, freeSpins, ogrines, spinResult, spinning, activePrizeIndex, prizeHistory]);
  const pageData = {
    news: { kicker: 'DO DIÁRIO DE BORDO', title: <>Notícias <em>Impact.</em></>, intro: 'Atualizações, eventos e histórias que movimentam o mundo Dyfus Impact.' },
    store: { kicker: 'FORJE SUA JORNADA', title: <>Loja <em>Impact.</em></>, intro: 'Itens, VIP e recursos para levar sua aventura ainda mais longe.' },
    rank: { kicker: 'AQUELES QUE SE DESTACAM', title: <>Ranking <em>Impact.</em></>, intro: 'Veja quem está escrevendo seu nome no topo das classificações.' },
    vote: { kicker: 'RECOMPENSE SUA PRESENÇA', title: <>Vote e <em>ganhe.</em></>, intro: 'Ajude o servidor a crescer e receba recompensas exclusivas.' },
    download: { kicker: 'PREPARE-SE PARA ENTRAR', title: <>Baixe o <em>launcher.</em></>, intro: 'Escolha sua versão e entre no mundo Dyfus Impact.' }
  }[page];
  const voteContent = page === 'vote' ? <Roulette prizes={prizes} freeSpins={freeSpins} ogrines={ogrines} spinResult={spinResult} spinning={spinning} activePrizeIndex={activePrizeIndex} spinWheel={spinWheel} /> : null;
  return <main className="inner-page"><section className="page-hero"><span className="kicker">{pageData.kicker}</span><h1>{pageData.title}</h1><p>{pageData.intro}</p><button className="text-button" onClick={() => jump('home')}>← VOLTAR PARA HOME</button></section>{page === 'news' && <div className="page-news news-grid">{news.map((item) => <article className="news-card" key={item.title}><div className="news-image" style={{ backgroundImage: `url(${item.image})` }}><span>{item.category}</span></div><div className="news-content"><small>{item.date}</small><h3>{item.title}</h3><p>{item.text}</p><button className="text-button" onClick={() => setSelectedNews(item)}>LER NOTÍCIA <ArrowRight size={14} /></button></div></article>)}</div>}{page === 'store' && <div className="page-products product-grid">{products.concat(products).map(({ name, type, price, detail, icon: Icon }, index) => <article className="product-card" key={`${name}-${index}`}><div className="product-icon"><Icon size={28} /></div><span>{type}</span><h3>{name}</h3><p>{detail}</p><strong>{price}</strong><button className="button outline" onClick={() => notify(`${name} adicionado ao carrinho.`)}>ADICIONAR <ShoppingBag size={14} /></button></article>)}</div>}{page === 'rank' && <div className="full-panel panel"><div className="rank-tabs"><span className="selected">GERAL</span><span>PVP</span><span>GUILDAS</span><span>KOLIZEU</span></div>{[['01','NexuS','42.890'],['02','Avelorn','39.420'],['03','Khal Drogo','36.115'],['04','Lunara','33.870'],['05','Mordred','31.420'],['06','Elyra','29.760']].map(([position, name, score]) => <div className="rank-row" key={name}><b>{position}</b><span className={`rank-avatar rank-${position}`}>{name[0]}</span><strong>{name}</strong><small>{score} XP</small></div>)}</div>}{page === 'vote' && <div className="vote-page"><div className="vote-step panel"><div className="vote-orb"><Gift size={28} /></div><h2>Vote pelo <em>Impact.</em></h2><p>Acesse um dos sites abaixo, vote no servidor e retorne para receber seus pontos.</p>{['TOP-GAMES', 'SERVIDORES PRIVADOS', 'LISTA MMORPG'].map((site, index) => <button className="vote-link" key={site} onClick={() => notify(`Site de votação ${site} aberto.`)}><span>0{index + 1}</span><strong>{site}</strong><ArrowRight size={16} /></button>)}</div><div className="vote-step panel"><span className="kicker">SEU PROGRESSO</span><h2>7 <small>/ 10 votos</small></h2><p>Faltam 3 votos para desbloquear o próximo prêmio.</p><div className="progress"><span /></div><button className="button primary" onClick={() => notify('Recompensa resgatada em modo demonstrativo.')}>RESGATAR PRÊMIO <Gift size={15} /></button></div></div>}{page === 'download' && <div className="download-list">{versions.map((version) => <article className="download-card" key={version.id}><div><span className="kicker">{version.label}</span><h2>{version.name}</h2><p>{version.desc}</p><small>CLIENTE WINDOWS · 2.4 GB · VERSÃO {version.label}</small></div><button className="button primary" disabled={version.status === 'EM BREVE'} onClick={() => notify(`Download de ${version.label} iniciado.`)}><Download size={16} /> {version.status === 'EM BREVE' ? 'EM BREVE' : 'BAIXAR CLIENTE'}</button></article>)}</div>}{selectedNews && <NewsReader article={selectedNews} close={() => setSelectedNews(null)} />}</main>;
}

function NewsReader({ article, close }) {
  const [liked, setLiked] = useState(false);
  return <div className="modal-backdrop" onClick={close}><article className="news-reader" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={close}><X size={18} /></button><div className="reader-image" style={{ backgroundImage: `url(${article.image})` }}><span>{article.category}</span></div><div className="reader-content"><small>{article.date}</small><h2>{article.title}</h2><p>{article.text}</p><p>O mundo Impact continua em movimento. Prepare seu grupo, acompanhe os eventos e descubra tudo o que esta nova fase reserva para sua jornada.</p><div className="reader-actions"><button className={`button ${liked ? 'liked' : 'outline'}`} disabled={liked} onClick={() => setLiked(true)}>{liked ? '♥ CURTIDO' : '♡ CURTIR NOTÍCIA'}</button><button className="button outline" onClick={close}>FECHAR NOTÍCIA</button></div></div></article></div>;
}
function Modal({ type, close, notify, onAuthenticated }) {
  const login = type === 'login';
  const [recover, setRecover] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const submitLogin = () => {
    if (loginEmail.trim().toLowerCase() !== testAccount.email || loginPassword !== testAccount.password) {
      notify('E-mail ou senha inválidos.');
      return;
    }
    onAuthenticated();
    close();
    notify('Login realizado com sucesso.');
  };

  if (login && recover) return <div className="modal-backdrop" onClick={close}><div className="modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={close} aria-label="Fechar"><X size={18} /></button><div className="modal-brand"><img src={logoPath} alt="Dyfus Impact" /><span>PORTAL DO AVENTUREIRO</span></div><span className="kicker">RECUPERE SUA CONTA</span><h2>Nova <em>senha.</em></h2><p>Confirme seus dados para atualizar o acesso ao seu personagem.</p><label>E-MAIL<input type="email" placeholder="voce@email.com" /></label><label>PALAVRA SECRETA<input type="password" placeholder="Sua palavra secreta" /></label><label>NOVA SENHA<input type="password" placeholder="Digite sua nova senha" /></label><button className="button primary full" onClick={() => { close(); notify('Solicitação de alteração enviada.') }}>ALTERAR MINHA SENHA <ArrowRight size={16} /></button><button className="modal-helper" onClick={() => setRecover(false)}>Voltar para entrar</button></div></div>;

  return <div className="modal-backdrop" onClick={close}><div className="modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={close} aria-label="Fechar"><X size={18} /></button><div className="modal-brand"><img src={logoPath} alt="Dyfus Impact" /><span>PORTAL DO AVENTUREIRO</span></div><span className="kicker">{login ? 'BEM-VINDO DE VOLTA' : 'JUNTE-SE À LENDA'}</span><h2>{login ? <>Entrar no <em>Impact.</em></> : <>Crie sua <em>conta.</em></>}</h2><p>{login ? 'Acesse sua conta e continue sua jornada.' : 'Seu mundo está esperando por você.'}</p>{!login && <label>LOGIN<input placeholder="Escolha seu nome de aventureiro" /></label>}<label>E-MAIL<input type="email" placeholder="voce@email.com" value={login ? loginEmail : undefined} onChange={login ? (event) => setLoginEmail(event.target.value) : undefined} /></label>{!login && <><label>PALAVRA SECRETA<select defaultValue=""><option value="" disabled>Escolha uma pergunta de segurança</option><option>Qual era o nome do seu primeiro personagem?</option><option>Qual é o nome do seu lugar favorito?</option><option>Qual era o apelido da sua infância?</option><option>Qual é o nome do seu jogo favorito?</option><option>Qual foi sua primeira guilda?</option></select></label><label>RESPOSTA SECRETA<input placeholder="Digite sua resposta secreta" /></label></>}<label>SENHA<input type="password" placeholder="Sua senha secreta" value={login ? loginPassword : undefined} onChange={login ? (event) => setLoginPassword(event.target.value) : undefined} /></label>{!login && <label>CONFIRMAR SENHA<input type="password" placeholder="Repita sua senha" /></label>}<button className="button primary full" onClick={login ? submitLogin : () => { onAuthenticated(); close(); notify('Conta demonstrativa criada.') }}>{login ? 'ENTRAR NO MUNDO' : 'CRIAR MINHA CONTA'} <ArrowRight size={16} /></button>{login && <button className="modal-helper" onClick={() => setRecover(true)}>Esqueci minha senha</button>}</div></div>;
}

createRoot(document.getElementById('root')).render(<App />);
