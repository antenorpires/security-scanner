# Web Sec Inspector

Ferramenta de **inspeção passiva de segurança web** focada em **Application Security (AppSec)**, análise de superfície de ataque, enumeração controlada e **geração de relatórios de segurança**, destinada a **ambientes autorizados e uso profissional**.

> ⚠️ **Uso responsável:** este projeto deve ser utilizado **exclusivamente em sistemas próprios ou com autorização explícita** do responsável legal.

---

## 🎯 Objetivo

O **Web Sec Inspector** tem como objetivo ajudar desenvolvedores, estudantes e profissionais de segurança a:

* Entender a superfície de ataque de aplicações web
* Realizar enumeração **passiva e controlada**
* Identificar configurações inseguras
* Analisar headers HTTP, DNS, serviços expostos e fingerprinting
* Apoiar processos de **auditoria, AppSec e avaliação de risco**

Este projeto **não executa exploração ativa de vulnerabilidades**.

---

## 🧱 Arquitetura do projeto

* **Backend:** Node.js + Express
* **Frontend:** HTML5, CSS3 e JavaScript
* **Execução:** Docker e Docker Compose
* **Ferramentas utilizadas:** nmap, dig, whois, host

Estrutura principal:

```
.
├── src
│   ├── app.js
│   ├── routes
│   │   ├── health.js
│   │   └── scan.js
│   ├── services
│   │   └── scan.js
│   └── utils
│       ├── logs.js
│       └── sanitize.js
├── public
│   ├── index.html
│   ├── script.js
│   └── style.css
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── SECURITY.md
├── package.json
├── package-lock.json
├── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## 🚀 Como executar

### Pré-requisitos

* Docker
* Docker Compose

### Subindo o ambiente

```bash
docker compose up --build
```

A aplicação ficará disponível em:

```
http://localhost:8080
```

---

## 🖥️ Interface

A interface web consiste em:

* Campo único para inserção da URL ou domínio
* Botões de execução de scan
* Área de exibição de resultados

### Tipos de scan

#### 🔹 Basic Scan

* Enumeração rápida
* Portas mais comuns
* Serviços abertos

Utiliza:

```bash
nmap -F -Pn -sT --open <target>
```

---

#### 🔹 Expert Scan

* Enumeração DNS
* WHOIS
* DNSSEC
* Detecção de serviços, SO e scripts de vulnerabilidade

Utiliza:

```bash
host -d <target>
whois <target>
dig DNSKEY +dnssec <target>
nmap -F -Pn -sT --open -sV -A -O --script vuln <target>
```

---

## 🔐 Escopo de segurança

Este projeto **não aceita e não executa**:

* Exploração ativa de vulnerabilidades
* Ataques de força bruta
* SQL Injection
* Cross-Site Scripting (XSS)
* Remote Code Execution (RCE)
* Bypass de autenticação ou autorização

O foco é **análise, diagnóstico e enumeração passiva**.

---

## 🧼 Sanitização de entrada

Todas as URLs passam por sanitização antes da execução de comandos, reduzindo riscos de **command injection** e uso indevido.

---

## 🤝 Contribuição

Contribuições são bem-vindas!

Veja o arquivo [CONTRIBUTING.md](./CONTRIBUTING.md) para mais detalhes.

---

## 📜 Licença

Este projeto é distribuído sob a licença **MIT**.

Consulte o arquivo [LICENSE](./LICENSE) para mais informações.

---

## ⚖️ Aviso legal

Este projeto é fornecido **apenas para fins educacionais e profissionais autorizados**.

O autor **não se responsabiliza por qualquer uso indevido** desta ferramenta.
