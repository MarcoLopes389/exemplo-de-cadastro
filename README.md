# Exemplo de cadastro
Este é um codigo de exemplo de cadastro de postagens usando nodejs, mongodb e express.
O objetivo é conseguir cadastrar postagens e usuários que possam acessar a rota admin ou não.

<h3>Tabela de tópicos</h3>
   <ul>
  <li><a href="#módulos">Módulos usados</a></li>
  <li><a href="#status">Status do projeto</a></li>
  <li><a href="#rodar">Como rodar</a></li>
  <li><a href="#objetivos">Objetivos</a></li>
  </ul>
<h3 id="modulos">Módulos usados:</h3>
   <ul>
        <li><a href="https://www.npmjs.com/package/mongoose">mongoose</a></li>
        <li><a href="https://www.npmjs.com/package/connect-flash">connect-flash</a></li>
        <li><a href="https://www.npmjs.com/package/express-session">express-session</a></li>
        <li><a href="https://www.npmjs.com/package/express-handlebars">express-handlebars</a></li>
        <li><a href="https://www.npmjs.com/package/body-parser">body-parser</a></li>
   </ul>
   
<h3 id="status">Status</h3>
Em produção...

<h3 id="rodar">Como rodar:</h3>
  Se já tiver o nodejs instalado, rode os seguintes comandos no cmd dentro da pasta do projeto:
  <ul>
  <li>npm i</li>
  <li>npm start</li>
  </ul>
 
  A aplicação vai estar em localhost:3000

<h3 id="objetivos">Objetivos:</h3>
- [x] Configurações iniciais
- [x] CRUD de postagens
- [ ] CRUD de usuários
- [ ] Autenticação
