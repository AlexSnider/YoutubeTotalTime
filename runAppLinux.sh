chmod +x runAppLinux.sh

npm install

DIR="$(cd "$(dirname "$0")" && pwd)"
node "$DIR/index.js"
