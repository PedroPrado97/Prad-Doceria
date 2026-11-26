# Pradô Doceria · Cardápio de Natal

Landing page interativa em React + TypeScript (Vite).

## Rodar
```bash
npm install
npm run dev      # desenvolvimento
npm run build    # gera a pasta dist
```

## Configurar
Edite `src/config.ts` com o WhatsApp (DDI + DDD + número, só dígitos) e o Instagram.
Produtos, preços e descrições ficam em `src/data.ts`. Fotos em `src/assets`.

## Publicar no GitHub Pages
Suba para o GitHub, vá em Settings → Pages → Source: **GitHub Actions**.
O workflow em `.github/workflows/deploy.yml` publica a cada push na `main`.
