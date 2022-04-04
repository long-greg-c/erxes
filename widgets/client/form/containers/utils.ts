import gql from "graphql-tag";
import client from "../../apollo-client";
import { getLocalStorageItem } from "../../common";
import { IBrowserInfo, IEmailParams } from "../../types";
import { requestBrowserInfo } from "../../utils";
import { connection } from "../connection";
import {
  cancelOrderMutation,
  increaseViewCountMutation,
  saveFormMutation,
  sendEmailMutation
} from "../graphql";
import { IFormDoc, ISaveFormResponse } from "../types";

/*
 * Send message to iframe's parent
 */
export const postMessage = (options: any) => {
  // notify parent window launcher state
  window.parent.postMessage(
    {
      fromErxes: true,
      source: "fromForms",
      setting: connection.setting,
      ...options
    },
    "*"
  );
};

export const saveBrowserInfo = () => {
  requestBrowserInfo({
    source: "fromForms",
    postData: {
      setting: connection.setting
    },
    callback: browserInfo => {
      connection.browserInfo = browserInfo;
    }
  });
};

/*
 * Send email to submitted user after successfull submission
 */
export const sendEmail = ({
  toEmails,
  fromEmail,
  title,
  content,
  formId,
  attachments
}: IEmailParams) => {
  const customerId = connection.customerId
    ? connection.customerId
    : getLocalStorageItem("customerId");

  client.mutate({
    mutation: gql(sendEmailMutation),
    variables: {
      toEmails,
      fromEmail,
      title,
      content,
      customerId,
      formId,
      attachments
    }
  });
};

/*
 * Increasing view count
 */
export const increaseViewCount = (formId: string) => {
  return client.mutate({
    mutation: gql(increaseViewCountMutation),
    variables: {
      formId
    }
  });
};

/*
 * Save user submissions
 */
export const saveLead = (params: {
  doc: IFormDoc;
  browserInfo: IBrowserInfo;
  integrationId: string;
  formId: string;
  saveCallback: (response: ISaveFormResponse) => void;
}) => {
  const { doc, browserInfo, integrationId, formId, saveCallback } = params;

  const submissions = Object.keys(doc).map(fieldId => {
    const {
      value,
      text,
      type,
      validation,
      associatedFieldId,
      groupId,
      isHidden,
      column
    } = doc[fieldId];

    if (isHidden) {
      return;
    }

    return {
      _id: fieldId,
      type,
      text,
      value,
      validation,
      associatedFieldId,
      groupId,
      column
    };
  });

  const cachedCustomerId = connection.customerId
    ? connection.customerId
    : getLocalStorageItem("customerId");

  console.log("customerId", cachedCustomerId);
  console.log("connection: ", connection);

  const variables = {
    integrationId,
    formId,
    browserInfo,
    submissions: submissions.filter(e => e),
    cachedCustomerId
  };

  client
    .mutate({
      mutation: gql(saveFormMutation),
      variables
    })

    .then(async ({ data }) => {
      if (data) {
        const { widgetsSaveLead } = data;

        if (widgetsSaveLead.customerId) {
          connection.customerId = widgetsSaveLead.customerId;

          postMessage({
            fromErxes: true,
            message: "setLocalStorageItem",
            key: "customerId",
            value: widgetsSaveLead.customerId
          });
        }

        saveCallback(widgetsSaveLead);

        if (widgetsSaveLead && widgetsSaveLead.status === "ok") {
          postMessage({
            message: "formSuccess",
            variables
          });
        }
      }
    })

    .catch(e => {
      saveCallback({ status: "error", errors: [{ text: e.message }] });
    });
};

export const cancelOrder = (params: {
  customerId: string;
  messageId: string;
  cancelCallback: (response: string) => void;
}) => {
  const { customerId, messageId, cancelCallback } = params;

  client
    .mutate({
      mutation: gql(cancelOrderMutation),
      variables: {
        customerId,
        messageId
      }
    })
    .then(res => {
      cancelCallback("CANCELLED");
    })
    .catch(_e => {
      cancelCallback("CANCEL_FAILED");
    });
};
