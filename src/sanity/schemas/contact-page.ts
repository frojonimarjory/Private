import { defineType } from "sanity";
import { localeString, localeText } from "./locale";

export const contactPage = defineType({
  name: "contactPage",
  title: "Página de Contato",
  type: "document",
  fields: [
    localeString("title", "Título"),
    localeText("subtitle", "Subtítulo", 3),
    localeString("nameLabel", 'Rótulo do campo "Nome"'),
    localeString("emailLabel", 'Rótulo do campo "E-mail"'),
    localeString("messageLabel", 'Rótulo do campo "Mensagem"'),
    localeString("sendLabel", 'Texto do botão "Enviar"'),
    localeString("sendingLabel", 'Texto durante o envio ("Enviando...")'),
    localeText("successMessage", "Mensagem de sucesso", 2),
    localeText("errorMessage", "Mensagem de erro", 2),
    localeString("whatsappLabel", 'Texto do botão de WhatsApp'),
  ],
  preview: {
    prepare: () => ({ title: "Página de Contato" }),
  },
});
