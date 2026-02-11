import { useSelector } from 'react-redux';

const containsProperty = (object, key) => (
  object && Object.prototype.hasOwnProperty.call(object, key) && object[key] !== null
);

export const usePreference = (key, defaultValue) => useSelector((state) => {
  const session = state?.session || {};
  const server = session.server || {};
  const user = session.user || {};
  const forceSettings = Boolean(server.forceSettings);

  if (forceSettings) {
    if (containsProperty(server, key)) {
      return server[key];
    }
    if (containsProperty(user, key)) {
      return user[key];
    }
    return defaultValue;
  }

  if (containsProperty(user, key)) {
    return user[key];
  }
  if (containsProperty(server, key)) {
    return server[key];
  }
  return defaultValue;
});

export const useAttributePreference = (key, defaultValue) => useSelector((state) => {
  const session = state?.session || {};
  const server = session.server || {};
  const user = session.user || {};
  const serverAttrs = server.attributes || {};
  const userAttrs = user.attributes || {};
  const forceSettings = Boolean(server.forceSettings);

  if (forceSettings) {
    if (containsProperty(serverAttrs, key)) {
      return serverAttrs[key];
    }
    if (containsProperty(userAttrs, key)) {
      return userAttrs[key];
    }
    return defaultValue;
  }

  if (containsProperty(userAttrs, key)) {
    return userAttrs[key];
  }
  if (containsProperty(serverAttrs, key)) {
    return serverAttrs[key];
  }
  return defaultValue;
});
