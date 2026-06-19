# Estratégia do Leitor Bíblico

## Por que não embutir traduções modernas sem licença

Traduções modernas da Bíblia podem ter direitos autorais e termos de uso próprios. O TRAVESSIA NT não deve copiar textos de NVI, NAA, ARA, NTLH ou similares para o repositório ou banco sem licença explícita.

## Como o MVP funciona sem texto interno

No MVP, cada missão mostra a referência do dia, um link externo de leitura, espaço de reflexão e o botão de concluir leitura. Assim o usuário já vive o fluxo do game sem travar o lançamento por causa de licenciamento.

## Como ativar texto interno no futuro

Quando houver uma tradução em domínio público ou licenciada, o texto pode ser importado para o Supabase e renderizado pelo `BibleReader` via `bibleApi`.

## Tabelas planejadas

- `bible_versions`
- `bible_books`
- `bible_chapters`
- `bible_verses`
- `reading_blocks`
- `player_reflections`

## Conexão com Supabase

O `BibleReader` deve pedir o bloco selecionado para `bibleApi`. Quando houver texto interno, `bibleApi` busca versão, capítulos e versículos no Supabase. Se não houver, retorna `available: false` e mantém o fallback de referência + link externo.

## Cuidados jurídicos

Antes de importar texto bíblico:

- Confirmar titularidade e licença da tradução.
- Registrar fonte e termos em `bible_versions`.
- Não misturar versões sem metadados.
- Não expor textos protegidos em repositório público.

## Estratégia recomendada

1. MVP: referência + link externo + reflexão + concluir leitura.
2. Versão 2: texto interno com tradução segura.
3. Versão 3: destaques de versículo, favoritos, áudio e busca.
