export type LoginCredentials = { email: string, password: string };

export type RegisterBody = {
  name: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  email: string;
  id: number;
  name: string;
  role: string;
};
