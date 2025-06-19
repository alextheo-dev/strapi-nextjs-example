"use strict";
const jwt = require('jsonwebtoken');

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    //web socket
    let io = require("socket.io")(strapi.server.httpServer, {
      cors: {
        origin: process.env.CORS_ORIGIN,
        methods: process.env.CORS_METHODS.split(','),
        allowedHeaders: process.env.CORS_ALLOW_HEADERS.split(','),
        credentials: true,
      },
    });

    io.use(async (socket, next) => {
      const token = socket.handshake.auth.token;

      if (!token) {
        return next(new Error("Authentication error"));
      }

      try {
        const apiTokenService = strapi.services['admin::api-token'];

        const accessKey = await apiTokenService.hash(token);

        const storedToken = await apiTokenService.getBy({accessKey: accessKey});

        if(!storedToken) {
          return next(new Error("Authentication error: Token not found"));
        }

        next();
      } catch (err) {
        console.error("Token validation failed:", err.message);
        return next(new Error("Authentication error: Invalid token"));
      }
    });

    io.on("connection", (socket) => {
      console.log(`A user connected: ${socket.id}`);
      socket.on("disconnect", () => {
        console.log(`A user disconnected: ${socket.id}`);
      });
    });

    strapi.io = io;

    //send invitation email to admin user
    strapi.db.lifecycles.subscribe({
      models: ["admin::user"],
      afterCreate: async ({ result }) => {
        try {
          if (!result.registrationToken || result.registrationToken == null)
            return;
          const link = `${process.env.REGISTRATION_LINK}?registrationToken=${result.registrationToken}`;
          await strapi.plugins["email"].services.email.send({
            to: result.email,
            subject: "Brave CMS invitation",
            text: `
              <span>Hello</span> <h3>${result.firstname} ${result.lastname}</h3><br/>
              <span>You have been invited to Brave CMS as ${result.roles[0].name}</p>
              <p>Please accept the invitation by clicking the link below.</p>
              <a href=${link}>Registation link</a>
              <p>Thanks you!</p>`,
          });
        } catch (error) {
          console.log(error);
        }
      },
    });
  },
};
