"use strict";
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface) {
    const users = [
      {
        user_id: "c963c8a5-c75f-4d8f-991a-356af6d4af73",
        email: "nurlan.bek@mail.ru",
        password: await bcrypt.hash("password123", 10),
        role: "gpc",
        status: "verified",
        verification_token: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: uuidv4(),
        email: "dinara.k@mail.ru",
        password: await bcrypt.hash("password123", 10),
        role: "cpc",
        status: "verified",
        verification_token: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: uuidv4(),
        email: "askar.t@mail.ru",
        password: await bcrypt.hash("password123", 10),
        role: "applicant",
        status: "verified",
        verification_token: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: uuidv4(),
        email: "saltanat.a@mail.ru",
        password: await bcrypt.hash("password123", 10),
        role: "applicant",
        status: "pending",
        verification_token: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert("users", users, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
