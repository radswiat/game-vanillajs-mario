export default {
  port: process.env.PORT || 8081,
  socket: {
    origin: (process.env.PORT) ? `http://localhost:${process.env.PORT}` : 'http://mario.eu-west-1.elasticbeanstalk.com',
  },
};
