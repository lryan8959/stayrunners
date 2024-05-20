export const isValidName = (name: string): boolean => {
  const regex = /^[a-zA-Z\s'-]+$/;
  return name.trim().length > 0 && regex.test(name);
};

export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
