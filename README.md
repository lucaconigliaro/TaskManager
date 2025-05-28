# 🧠 Task Manager

Un’applicazione web avanzata per la gestione dei task, sviluppata con React, che consente agli utenti di creare, modificare, organizzare ed eliminare task con una UI intuitiva, prestazioni ottimizzate e funzionalità avanzate come filtri, ricerca ottimizzata e modali di conferma.

---

## 🚀 Funzionalità principali

- Visualizzazione task in tabella con stati colorati  
- Creazione, modifica ed eliminazione di task tramite API  
- Validazioni dei form con gestione errori  
- Filtri, ricerca ottimizzata e ordinamento  
- Modal di conferma per azioni importanti  
- Gestione stato globale con Context API  
- Custom hook `useTasks()` per gestire tutta la logica dei tasks 

---

## 📦 Tech stack

- React con Vite  
- Context API per la gestione dello stato  
- React Router DOM per il routing  
- React.memo, useCallback, useRef per ottimizzazione delle prestazioni  
- ReactDOM.createPortal per i modali  
- REST API fornite da [boolean-it/react-task-manager-back](https://github.com/boolean-it/react-task-manager-back)  

---

## ⚙️ Setup del progetto

### 🔁 Backend

1. Clona il backend:

```bash
git clone https://github.com/boolean-it/react-task-manager-back.git
cd react-task-manager-back
npm install
npm run start
```

2.	Dopo qualche secondo, vedrai nel terminale:
```bash
✅ Server in ascolto su http://localhost:3001
```
---


### 🚀 Frontend
1.	Dal progetto frontend, installa le dipendenze e avvia il server:
```bash
npm install
npm run dev
```

2.	Apri il browser su:
```bash
http://localhost:5173
```
---

## 🔧 Variabile d’ambiente

Crea un file .env nella root del progetto frontend con la seguente variabile:
```bash
VITE_BACKEND_URL=http://localhost:3001
```

Questa variabile viene utilizzata dall’app per puntare al backend. Se cambi la porta o l’indirizzo, aggiorna questa variabile.
