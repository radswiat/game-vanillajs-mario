import path from 'path';

export default {
  extensions: [
    '.web.js', '.js', '.json', '.web.jsx', '.jsx', '.eot',
    '.svg', '.woff2', '.woff', '.tff', '.css', '.scss', '.png',
  ],
  alias: {
    assets: path.join(process.cwd(), 'src/game/assets'),
  },
};
