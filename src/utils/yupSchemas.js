import * as Yup from 'yup';

export const signupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
  name: Yup.string().required('Required'),
  country: Yup.string().required('Required'),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

export const projectSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
});

export const taskSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
});
