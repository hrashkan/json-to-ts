# json-to-ts

> Generate TypeScript interfaces, type aliases, or both from JSON input (local file or remote URL).

## 🚀 Features

- **Mode selection**: output `interface`, `type`, or `both` via `--mode` flag
- **Flexible input**: accepts local JSON file paths or remote URLs
- **Output control**: print to stdout or write to a file
- **Zero dependencies at runtime**: built on Node.js and Quicktype-core

## 💿 Installation

```bash
# Install globally via npm
npm install -g json-to-ts
```

Or clone and link locally:

```bash
git clone https://github.com/your-username/json-to-ts.git
cd json-to-ts
npm install
npm run build
npm link
```

> Requires Node.js v16 or newer.

## ⚙️ Usage

```bash
json-to-ts -i <path|url> [options]
```

### Options

| Flag                  | Description                                              | Default                                   |     |
| --------------------- | -------------------------------------------------------- | ----------------------------------------- | --- |
| \`-i, --input \<path  | url>\`                                                   | JSON file path or URL to fetch (required) | —   |
| `-o, --output <file>` | Output filename for the generated TypeScript definitions | stdout                                    |     |
| `-m, --mode <mode>`   | Generation mode: `interface` \| `type` \| `both`         | `interface`                               |     |
| `-V, --version`       | Show version number                                      | —                                         |     |
| `-h, --help`          | Display help information                                 | —                                         |     |

### Examples

Generate **interfaces** from a local file:

```bash
json-to-ts -i sample.json
```

Generate **types** from a remote URL and write to a file:

```bash
json-to-ts -i https://jsonplaceholder.typicode.com/todos/1 \
           -m type \
           -o todo-types.ts
```

Generate **both** interfaces and type aliases in one run:

```bash
json-to-ts -i sample.json -m both -o definitions.ts
```

## 🛠️ Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/name`)
3. Commit your changes (`git commit -m "feat: ..."`)
4. Push to the branch (`git push origin feature/name`)
5. Open a pull request

## 📜 License

MIT © Ashkan_Hooshidar
