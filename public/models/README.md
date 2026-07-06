# Modelos 3D (Hero3DBanner)

Coloque aqui o arquivo do modelo 3D do banner.

## iPhone 17 Pro

1. Baixe o modelo (precisa de conta Sketchfab grátis + aceitar a licença):
   https://sketchfab.com/3d-models/iphone-17-pro-4541aa8a28324b33a2baaf81d263aaec
2. No botão **Download 3D Model**, escolha o formato **glTF / GLB** (evite a opção "Draco" — o loader do projeto não descomprime Draco).
3. Se vier um `.zip` (glTF + texturas), converta/exporte para **`.glb`** (arquivo único). Renomeie para **`iphone.glb`** e coloque nesta pasta:
   `public/models/iphone.glb`
4. O componente `Hero3DBanner` já está apontando para `/models/iphone.glb`. Ao adicionar o arquivo, ele carrega automaticamente. Sem o arquivo, cai no iPhone procedural (fallback).

## Licença — ATRIBUIÇÃO OBRIGATÓRIA (CC BY 4.0)

O modelo é do autor **Ranguel** sob **Creative Commons Attribution (CC BY 4.0)**.
Uso comercial é permitido, mas o crédito é obrigatório. Adicione em algum lugar visível
do site (ex.: rodapé):

> Modelo 3D "iPhone 17 Pro" por Ranguel (https://sketchfab.com/3d-models/iphone-17-pro-4541aa8a28324b33a2baaf81d263aaec),
> licenciado sob CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/).
