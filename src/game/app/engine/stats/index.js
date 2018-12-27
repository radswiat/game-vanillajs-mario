import Stats from './stats';

// export new instance of stats
const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

// simple singleton export
export default stats;
