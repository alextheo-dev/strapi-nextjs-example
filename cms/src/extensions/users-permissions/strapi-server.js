module.exports = plugin => {
  const sanitizeOutput = user => {
    const { password, resetPasswordToken, confirmationToken, ...sanitizedUser } = user;
    return sanitizedUser;
  };

  plugin.controllers.auth.callback = async ctx => {
    const { identifier, password } = ctx.request.body;

    const user = await strapi.entityService.findMany('plugin::users-permissions.user', {
      filters: {
        $or: [{ email: identifier.toLowerCase() }, { username: identifier }],
      },
      populate: ['role'],
    });

    if (!user.length) {
      throw new ApplicationError('Invalid identifier or password');
    }

    const validUser = user[0];

    if (!validUser.confirmed) {
      throw new ApplicationError('Your account email is not confirmed');
    }

    if (validUser.blocked) {
      throw new ApplicationError('Your account has been blocked by an administrator');
    }

    const validPassword = await strapi.plugin('users-permissions').service('user').validatePassword(password, validUser.password);

    if (!validPassword) {
      throw new ApplicationError('Invalid identifier or password');
    }

    const jwt = strapi.plugin('users-permissions').service('jwt').issue({
      id: validUser.id,
    });

    ctx.body = {
      jwt,
      user: sanitizeOutput(validUser),
      customField: 'your custom value',
    };
  };

  plugin.controllers.user.me = async ctx => {
    if (!ctx.state.user) {
      return ctx.unauthorized();
    }
    const user = await strapi.entityService.findOne('plugin::users-permissions.user', ctx.state.user.id, { populate: ['role'] });

    ctx.body = sanitizeOutput(user);
  };

  plugin.controllers.user.find = async ctx => {
    const users = await strapi.entityService.findMany('plugin::users-permissions.user', { ...ctx.params, populate: ['role'] });

    ctx.body = users.map(user => sanitizeOutput(user));
  };

  return plugin;
};
