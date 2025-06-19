module.exports = ({ env }) => ({
  // Other plugin configurations
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST"),
        port: env("SMTP_PORT"),
        auth: {
          user: env("SMTP_USERNAME"),
          pass: env("SMTP_PASSWORD"),
        },
        secure: false,
      },
      settings: {
        defaultFrom: "hello@example.com",
        defaultReplyTo: "hello@example.com",
      },
    },
  },
});
