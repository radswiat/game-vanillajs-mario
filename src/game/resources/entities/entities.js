export default {
  MARIO: {
    sprite: {
      img: 'assets/mario.png',
      location: [211, 0],
      size: [16, 16],
    },
    animate: {
      type: '',
      speed: 3,
      sequences: {
        walk: {
          left: [[181, 0], [150, 0], [121, 0], [89, 0]],
          right: [[241, 0], [272, 0], [300, 0]],
        },
        jump: {
          left: [[29, 0]],
          right: [[359, 0]],
        },
        stand: {
          left: [[181, 0]],
          right: [[211, 0]],
        },
      },
    },
    behaviourClass: 'player',
  },
  LUIGI: {
    sprite: {
      img: 'assets/luigi.png',
      location: [211, 0],
      size: [16, 16],
    },
    animate: {
      type: '',
      speed: 3,
      sequences: {
        walk: {
          left: [[181, 0], [150, 0], [121, 0], [89, 0]],
          right: [[241, 0], [272, 0], [300, 0]],
        },
        jump: {
          left: [[29, 0]],
          right: [[359, 0]],
        },
        stand: {
          left: [[181, 0]],
          right: [[211, 0]],
        },
      },
    },
    behaviourClass: 'player2',
  },
  LUIGI_SYNC: {
    sprite: {
      img: 'assets/ghost.png',
      location: [211, 0],
      size: [16, 16],
    },
    animate: {
      type: '',
      speed: 3,
      sequences: {
        walk: {
          left: [[181, 0], [150, 0], [121, 0], [89, 0]],
          right: [[241, 0], [272, 0], [300, 0]],
        },
        jump: {
          left: [[29, 0]],
          right: [[359, 0]],
        },
        stand: {
          left: [[181, 0]],
          right: [[211, 0]],
        },
      },
    },
    behaviourClass: 'playerSync',
  },
  DUCK: {
    sprite: {
      img: 'assets/enemies.png',
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
        stand: {
          left: [[90, 0]],
          right: [[210, 0]],
        },
      },
    },
    behaviourClass: 'duck',
  },
  BIRD: {
    sprite: {
      img: 'assets/enemies.png',
      location: [0, 184],
      size: [16, 16],
    },
    animate: {
      type: '',
      speed: 3,
      sequences: {
        walk: {
          left: [[0, 184], [30, 184]],
          right: [[60, 184], [90, 184]],
        },
        stand: {
          left: [[0, 184], [30, 184]],
          right: [[60, 184], [90, 184]],
        },
      },
    },
    behaviourClass: 'bird',
  },
};
