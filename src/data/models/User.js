/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import DataType from 'sequelize';
import Model from '../sequelize';

const User = Model.define(
  'User',
  {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV1,
      primaryKey: true,
    },

    email: {
      type: DataType.STRING(255),
      validate: { isEmail: true },
    },

    passwordHash: DataType.STRING(45),
    password: {
      type: DataType.VIRTUAL,
      set: function (val) {
         // Remember to set the data value, otherwise it won't be validated
         this.setDataValue('password', val);
         this.setDataValue('passwordHash', this.salt + val);
       },
       validate: {
          isLongEnough: function (val) {
            if (val.length < 7) {
              throw new Error("Please choose a longer password")
           }
        }
      }
    },

    emailConfirmed: {
      type: DataType.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    indexes: [{ fields: ['email'] }],
  },
);

export default User;
