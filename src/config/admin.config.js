const AdminJS = require('adminjs');
const AdminJSSequelize = require('@adminjs/sequelize');
const { Users } = require('../models'); // adjust if path differs

AdminJS.registerAdapter(AdminJSSequelize);

const adminOptions = {
  resources: [
    {
      resource: Users,
      options: {
        properties: {
          password: { isVisible: false }, // hide sensitive field
          createdAt: { isVisible: { edit: false, show: true, list: true, filter: true } },
          updatedAt: { isVisible: { edit: false, show: true, list: true, filter: true } },
        }
      }
    }
  ],
  rootPath: '/admin',
};

module.exports = adminOptions;
