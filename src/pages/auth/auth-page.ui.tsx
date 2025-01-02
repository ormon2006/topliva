import React from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Title } from "~shared/ui/title";

export function AuthPage() {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Обязательно").min(3, "Минимум 3 символа"),
      password: Yup.string()
        .min(6, "Минимум 6 символов")
        .required("Обязательно"),
    }),
    onSubmit: (values) => {
      console.log("Submitted values:", values);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow-xl"
      >
        {/* <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Авторизация
        </h1> */}
        <Title className="text-center">Добро пожаловать в BilimTrack!</Title>
        <div className="mb-4">
          <TextField
            fullWidth
            id="username"
            name="username"
            label="Имя пользователя"
            variant="outlined"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        </div>
        <div className="mb-6">
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Пароль"
            type="password"
            variant="outlined"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          className="bg-green hover:bg-green text-white font-semibold shadow-none"
          aria-label="Авторизоваться"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Войти"
          )}
        </Button>
      </form>
    </div>
  );
}
