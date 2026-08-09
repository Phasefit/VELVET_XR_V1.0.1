function cleanValue(value: string | undefined) {
  const cleaned = value?.trim();
  return cleaned ? cleaned : null;
}

function cleanEmail(value: string | undefined) {
  const cleaned = cleanValue(value);
  if (!cleaned || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned)) return null;
  return cleaned;
}

export const publicSiteDetails = {
  operatorName: cleanValue(process.env.SITE_OPERATOR_NAME),
  operatorAddress: cleanValue(process.env.SITE_OPERATOR_ADDRESS),
  organizationNumber: cleanValue(process.env.SITE_OPERATOR_ORG_NUMBER),
  businessRegister: cleanValue(process.env.SITE_OPERATOR_REGISTER),
  vatDetails: cleanValue(process.env.SITE_OPERATOR_VAT),
  contactEmail: cleanEmail(process.env.CONTACT_EMAIL),
};

export const hasPublicOperatorDetails = Boolean(
  publicSiteDetails.operatorName &&
    publicSiteDetails.operatorAddress &&
    publicSiteDetails.contactEmail,
);
