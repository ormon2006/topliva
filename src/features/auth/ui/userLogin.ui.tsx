import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginForm } from "../modal/userLogin";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "~app/components/ui/card";
import { Label } from "~app/components/ui/label";
import { Input } from "~app/components/ui/input";
import { Button } from "~app/components/ui/button";
import { useToast } from "~app/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, User, Eye, EyeOff, ArrowRight, Info } from "lucide-react";

export const LoginForm = () => {
  const {
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword,
    setNameTouched,
    setEmailTouched,
    setPasswordTouched,
    isFormValid,
    errors,
  } = useLoginForm();

  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (isFormValid) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      navigate("/about");
    } else {
      toast({
        variant: "destructive",
        title: "Ошибка валидации",
        description: "Пожалуйста, проверьте правильность введенных данных",
      });
      setNameTouched(true);
      setEmailTouched(true);
      setPasswordTouched(true);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="w-full">
      <div className="h-screen  flex items-center justify-center  ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="w-full shadow-2xl border border-gray-200 overflow-hidden">
            <CardHeader className="text-center space-y-1 pb-1">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="mx-auto bg-white p-3 rounded-full w-16 h-16 flex items-center justify-center border border-gray-200 shadow-sm"
              >
                <Lock className="w-6 h-6 text-blue-600" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Вход в систему
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Введите свои учетные данные
                </p>
              </div>
            </CardHeader>

            <CardContent className="px-6 py-2">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100"
              >
                <div className="flex items-start">
                  <Info className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-blue-800 mb-1">
                      Для чего нужны эти данные?
                    </h3>
                    <p className="text-sm text-blue-700">
                      Мы собираем эту информацию для создания вашего аккаунта и
                      персонализации опыта. Ваши данные защищены и не будут
                      переданы третьим лицам.
                    </p>
                  </div>
                </div>
              </motion.div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2"
                >
                  <Label
                    htmlFor="name"
                    className="text-gray-700 font-medium flex items-center"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Имя пользователя
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setNameTouched(true)}
                    className="pl-3 border-gray-300 focus:ring-2 focus:ring-blue-500/50"
                  />
                  <AnimatePresence>
                    {errors.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center text-sm text-red-500 mt-1"
                      >
                        <Info className="w-4 h-4 mr-1" />
                        Имя должно быть не менее 3 символов
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <Label
                    htmlFor="email"
                    className="text-gray-700 font-medium flex items-center"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Электронная почта
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setEmailTouched(true)}
                    className="pl-3 border-gray-300 focus:ring-2 focus:ring-blue-500/50"
                  />
                  <AnimatePresence>
                    {errors.email && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center text-sm text-red mt-1"
                      >
                        <Info className="w-4 h-4 mr-1" />
                        Введите корректный email
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2"
                >
                  <Label
                    htmlFor="password"
                    className="text-gray-700 font-medium flex items-center"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Пароль
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={() => setPasswordTouched(true)}
                      className="pl-3 pr-10 border-gray-300 focus:ring-2 focus:ring-blue-500/50"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <AnimatePresence>
                    {errors.password && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center text-sm text-red-500 mt-1"
                      >
                        <Info className="w-4 h-4 mr-1" />
                        Пароль должен быть не менее 6 символов
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Запомнить меня
                    </label>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-blue hover:text-blue-800 hover:underline"
                    onClick={() => {
                      /* forgot password logic */
                    }}
                  >
                    Забыли пароль?
                  </button>
                </motion.div>

                <CardFooter className="flex flex-col space-y-3 p-0 pt-2">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    className="w-full"
                  >
                    <Button
                      type="submit"
                      className="w-full py-3  hover:bg-blue-700 text-white font-medium shadow-sm transition-colors"
                      disabled={!isFormValid || isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Вход в систему...
                        </span>
                      ) : (
                        <span className="flex items-center text-btnback justify-center">
                          Войти
                          <motion.span
                            animate={{ x: isHovered ? 5 : 0 }}
                            transition={{ type: "spring", stiffness: 500 }}
                            className="ml-2"
                          >
                            <ArrowRight className="w-5 h-5" />
                          </motion.span>
                        </span>
                      )}
                    </Button>
                  </motion.div>

                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink mx-4 text-gray-500 text-sm">
                      или
                    </span>
                    <div className="flex-grow border-t border-gray-300"></div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full py-3 border-gray-300 hover:bg-gray-50 text-gray-700 font-medium shadow-sm flex items-center justify-center"
                    onClick={() => {
                      /* social login logic */
                    }}
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.784-1.667-4.166-2.668-6.735-2.668-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.524 10-10 0-0.668-0.069-1.325-0.189-1.961h-9.811z" />
                    </svg>
                    Войти через Google
                  </Button>
                </CardFooter>
              </form>
            </CardContent>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-center text-sm text-gray-600 pb-6 px-6"
            >
              Еще нет аккаунта?{" "}
              <button
                className="text-blue-600 hover:text-blue-800 font-medium underline-offset-4 hover:underline"
                onClick={() => {
                  /* navigation to register */
                }}
              >
                Создать аккаунт
              </button>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
