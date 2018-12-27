export default {
  GREEN: {
    sprite: {
      img: 'assets/bg.png',
      location: [90, 0],
      size: [16, 24],
    },
    animate: {
      type: '',
      speed: 6,
      sequences: {
        walk: {
          left: [[90, 0], [120, 0], [150, 0], [180, 0]],
          right: [[210, 0], [240, 0], [270, 0], [300, 0]],
        },
        jump: {
          left: [[90, 0], [120, 0], [150, 0], [180, 0]],
          right: [[90, 0], [120, 0], [150, 0], [180, 0]],
        },
      },
    },
  },
};
