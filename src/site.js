import { mkdir, writeFile, copyFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const distDir = join(projectRoot, 'dist');

export function createHTML({ title, message }) {
 return `<!doctype html>
<html lang="ja">
<head>
    <meta charset="utf-8" />
    <meta name = "viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <link rel="stylesheet" href="./style.css" />
</head>
<body>
    <main class="container">
        <p class="badge">Github Actions + Github Pages</p>
        <h1>${title}</h1>
        <p>${message}</p>
        <section>
            <h2>このページについて</h2>
            <p>Github Pagesへの自動デプロイ</p>
        </section>
    </main>
</body>
</html>`;
}

export async function build() {
    await mkdir(distDir, { recursive: true});

    const html = createHTML({
        title: 'CI/CD Handson',
        message: 'mainブランチへのpushをきっかけに、自動公開される'
    });

    await writeFile(join(distDir, 'index.html'), html, 'utf8');
    await copyFile(join(__dirname, 'style.css'), join(distDir, 'styles.css'));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    await build();
}