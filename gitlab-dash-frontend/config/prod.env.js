'use strict'

module.exports = {
  NODE_ENV: 'production',
  MAIN_TITLE: process.env.MAIN_TITLE,
  SITE_KEY: process.env.SITE_KEY,
  FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
  FACEBOOK_SOCIAL_AUTH_ENDPOINT: process.env.FACEBOOK_SOCIAL_AUTH_ENDPOINT,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_SOCIAL_AUTH_ENDPOINT: process.env.GOOGLE_SOCIAL_AUTH_ENDPOINT,
  LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID,
  LINKEDIN_SOCIAL_AUTH_ENDPOINT: process.env.LINKEDIN_SOCIAL_AUTH_ENDPOINT,
  SM_LOGIN_GOOGLE: process.env.SM_LOGIN_GOOGLE,
  SM_LOGIN_FACEBOOK: process.env.SM_LOGIN_FACEBOOK,
  SM_LOGIN_LINKEDIN: process.env.SM_LOGIN_LINKEDIN,
  MULTILANG: process.env.MULTILANG,
  FIREBASE_NOTIFICATION: process.env.FIREBASE_NOTIFICATION,
  FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  FIREBASE_MESSAGING_SENDER_KEY: process.env.FIREBASE_MESSAGING_SENDER_KEY,
  FIREBASE_PUBLIC_VAPID_KEY: process.env.FIREBASE_PUBLIC_VAPID_KEY,

  // STAGING
  ROOT_API: process.env.ROOT_API_STAGING,
  MAIN_DOMAIN: process.env.MAIN_DOMAIN_STAGING,
  WEB_SOCKET_URL: process.env.WEB_SOCKET_URL_STAGING,
  CLIENT_ID: process.env.CLIENT_ID_STAGING,
  CLIENT_SECRET: process.env.CLIENT_SECRET_STAGING,
  FACEBOOK_SOCIAL_URL: process.env.FACEBOOK_SOCIAL_URL_STAGING,
  FACEBOOK_SOCIAL_REDIRECT_URL:
    process.env.FACEBOOK_SOCIAL_REDIRECT_URL_STAGING,
  GOOGLE_SOCIAL_URL: process.env.GOOGLE_SOCIAL_URL_STAGING,
  GOOGLE_SOCIAL_REDIRECT_URL: process.env.GOOGLE_SOCIAL_REDIRECT_URL_STAGING,
  LINKEDIN_SOCIAL_URL: process.env.LINKEDIN_SOCIAL_URL_STAGING,
  LINKEDIN_SOCIAL_REDIRECT_URL:
    process.env.LINKEDIN_SOCIAL_REDIRECT_URL_STAGING,
  ADVISOR_CATEGORY_VALIDATION: process.env.ADVISOR_CATEGORY_VALIDATION_STAGING,
  ADVISOR_PARTICIPANTS_VALIDATION:
    process.env.ADVISOR_PARTICIPANTS_VALIDATION_STAGING,
  ADVISOR_MIN_CREDITS_VALIDATION:
    process.env.ADVISOR_MIN_CREDITS_VALIDATION_STAGING

  // LIVE
  /* ROOT_API: process.env.ROOT_API,
  MAIN_DOMAIN: process.env.MAIN_DOMAIN,
  WEB_SOCKET_URL: process.env.WEB_SOCKET_URL,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  FACEBOOK_SOCIAL_URL: process.env.FACEBOOK_SOCIAL_URL,
  FACEBOOK_SOCIAL_REDIRECT_URL: process.env.FACEBOOK_SOCIAL_REDIRECT_URL,
  GOOGLE_SOCIAL_URL: process.env.GOOGLE_SOCIAL_URL,
  GOOGLE_SOCIAL_REDIRECT_URL: process.env.GOOGLE_SOCIAL_REDIRECT_URL,
  LINKEDIN_SOCIAL_URL: process.env.LINKEDIN_SOCIAL_URL,
  LINKEDIN_SOCIAL_REDIRECT_URL: process.env.LINKEDIN_SOCIAL_REDIRECT_URL,
  ADVISOR_CATEGORY_VALIDATION: process.env.ADVISOR_CATEGORY_VALIDATION,
  ADVISOR_PARTICIPANTS_VALIDATION: process.env.ADVISOR_PARTICIPANTS_VALIDATION,
  ADVISOR_MIN_CREDITS_VALIDATION: process.env.ADVISOR_MIN_CREDITS_VALIDATION */
}
