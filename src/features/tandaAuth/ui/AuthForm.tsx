import { TextField, Button } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { useAuthLogic } from "~features/tandaAuth/model/hooks/useAuthLogic";

export const AuthForm = () => {
  const {
    name,
    phone,
    isFormValid,
    nameError,
    phoneError,
    handleChange,
    handlePhoneChange,
    handleSubmit,
    handleBlur,
  } = useAuthLogic();

  return (
    <div className="p-5 pb-20">
      <div className="bg-white rounded-[32px] shadow-2xl max-w-[568px] p-12 mx-auto mt-24 md:mt-12 sm:mt-10 xs:mt-4">
        <form onSubmit={handleSubmit} className="text-center">
          <h1 className="text-[28px] leading-[32px] font-semibold  font-[Graphik,sans-serif] text-[#4f4f4f]">
            Подобрали подходящие <br /> для вас профессии
          </h1>
          <p className="text-[#666666] text-base my-[12px] font-medium font-[Graphik,sans-serif]">
            Заполните форму, чтобы узнать результаты
          </p>

          <TextField
            style={{
              margin: "8px 0",
              width: "100%",
              outline: "#000",
              borderRadius: "30px",
            }}
            variant="outlined"
            label="Ваше Имя"
            name="name"
            value={name}
            onChange={handleChange}
            onBlur={() => handleBlur("name")}
            error={nameError}
            helperText={nameError && "Имя должно быть не менее 3 символов"}
            className="mb-2 font-[Graphik,sans-serif] font-bold"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "4px",
                "& fieldset": { borderColor: "#000" },
                "&:hover fieldset": {
                  borderColor: "#005B50",
                  fontWeight: "700",
                },
                "&.Mui-focused fieldset": { borderColor: "#005B50" },
              },
              "& .MuiFormLabel-root.Mui-focused": { color: "#000" },
            }}
          />

          <MuiTelInput
            style={{
              margin: "8px 0",
              width: "100%",
              outline: "#000",
              borderRadius: "30px",
            }}
            value={phone}
            onChange={handlePhoneChange}
            onBlur={() => handleBlur("phone")}
            defaultCountry="KG"
            placeholder="Введите номер телефона"
            error={phoneError}
            helperText={phoneError && "Неверный формат номера"}
            className="mb-2"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "4px",
                "& fieldset": { borderColor: "#000" },
                "&:hover fieldset": { borderColor: "#005B50" },
                "&.Mui-focused fieldset": { borderColor: "#005B50" },
              },
              "& .MuiFormLabel-root.Mui-focused": { color: "#000" },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={!isFormValid}
            className="mt-8 py-3 px-12 bg-[#005B50] rounded-2xl hover:bg-[#004940] text-sm md:text-base normal-case"
          >
            Перейти к результатам
          </Button>
        </form>
      </div>
    </div>
  );
};
