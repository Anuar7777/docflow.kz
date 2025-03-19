"use strict";

const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    const forms = [
      {
        form_id: uuidv4(),
        schema: {
          pages: [
            {
              title: "Личная информация",
              fields: [
                {
                  name: "first_name",
                  label: "Имя",
                  type: "text",
                  required: true,
                },
                {
                  name: "last_name",
                  label: "Фамилия",
                  type: "text",
                  required: true,
                },
                {
                  name: "passport",
                  label: "Удостоверение личности",
                  type: "file",
                  required: true,
                  file_types: ["pdf", "jpg", "png"],
                },
                {
                  name: "birth_date",
                  label: "Дата рождения",
                  type: "date",
                  required: true,
                },
              ],
            },
          ],
        },
        status: "published",
        created_by: "c963c8a5-c75f-4d8f-991a-356af6d4af73",
        updated_by: "c963c8a5-c75f-4d8f-991a-356af6d4af73",
        created_at: now,
        updated_at: now,
      },
      {
        form_id: uuidv4(),
        schema: {
          pages: [
            {
              title: "Контактные данные",
              fields: [
                {
                  name: "contact_info.email",
                  label: "Email",
                  type: "email",
                  required: true,
                },
                {
                  name: "contact_info.phone",
                  label: "Телефон",
                  type: "text",
                  required: true,
                },
              ],
            },
          ],
        },
        status: "published",
        created_by: "c963c8a5-c75f-4d8f-991a-356af6d4af73",
        updated_by: "c963c8a5-c75f-4d8f-991a-356af6d4af73",
        created_at: now,
        updated_at: now,
      },
      {
        form_id: uuidv4(),
        schema: {
          pages: [
            {
              title: "Личная информация",
              fields: [
                {
                  name: "first_name",
                  label: "Имя",
                  type: "text",
                  required: true,
                },
                {
                  name: "last_name",
                  label: "Фамилия",
                  type: "text",
                  required: true,
                },
                {
                  name: "passport",
                  label: "Удостоверение личности",
                  type: "file",
                  required: true,
                  file_types: ["pdf", "jpg", "png"],
                },
                {
                  name: "birth_date",
                  label: "Дата рождения",
                  type: "date",
                  required: true,
                },
              ],
            },
            {
              title: "Контактные данные",
              fields: [
                {
                  name: "contact_info.email",
                  label: "Email",
                  type: "email",
                  required: true,
                },
                {
                  name: "contact_info.phone",
                  label: "Телефон",
                  type: "text",
                  required: true,
                },
              ],
            },
            {
              title: "Образование",
              fields: [
                {
                  name: "diploma",
                  label: "Диплом об образовании",
                  type: "file",
                  required: true,
                  file_types: ["pdf", "jpg", "png"],
                },
              ],
            },
            {
              title: "Дополнительная информация",
              fields: [
                {
                  name: "additional_info",
                  label: "Дополнительная информация",
                  type: "textarea",
                  required: false,
                },
              ],
            },
          ],
        },
        status: "published",
        created_by: "c963c8a5-c75f-4d8f-991a-356af6d4af73",
        updated_by: "c963c8a5-c75f-4d8f-991a-356af6d4af73",
        created_at: now,
        updated_at: now,
      },
    ];

    await queryInterface.bulkInsert(
      "application_forms",
      forms.map((form) => ({
        ...form,
        schema: JSON.stringify(form.schema),
      })),
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("application_forms", null, {});
  },
};
