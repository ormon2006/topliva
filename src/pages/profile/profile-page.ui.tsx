import { EmojiEvents } from '@mui/icons-material';
import {
  Avatar,
  Typography,
  Paper,
  Chip,
  Button,
  LinearProgress,
  TextField,
} from '@mui/material';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import GroupIcon from '@mui/icons-material/Group';
import { BadgeCard } from '~widgets/badge-card';
import { userQueries, userTypes } from '~entities/user';
import { Chart } from '~widgets/chart';
import { Modal } from '~shared/ui/modal';
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikValues,
  useFormikContext,
} from 'formik';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { removeCookie } from 'typescript-cookie';
import { useNavigate } from 'react-router-dom';

interface Achievement {
  id: number;
  title: string;
  description: string;
  image: string;
  rarity: string;
}

interface Profile {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  photo_url: string;
  group_id: string;
  points: number;
  achievements: Achievement[];
}

export function ProfilePage() {
  const [active, setActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileSelected, setFileSelected] = useState(false);

  const {
    data: userData,
    isLoading,
    isError,
  } = userQueries.useLoginUserQuery();

  const {
    mutate: editUser,
    isPending,
    isError: isEditError,
    isSuccess: isEditSucces,
  } = userQueries.useEditUserProfile();

  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching user data.</div>;
  }

  const { email, firstName, lastName, username, photo } = userData?.data;

  const initialUser: userTypes.EditUserProfile = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    photo: null,
  };

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
    if (file) {
      setFileSelected(true);
    } else {
      setFileSelected(false);
    }
  };

  const handleLogout = () => {
    removeCookie('access');
    localStorage.removeItem('refresh');
    navigate(`/auth`);
    userQueries.userService.removeCache();
  };

  return (
    <div className="my-10 max-w-[400px]">
      <Paper
        elevation={3}
        sx={{ padding: 2 }}
        className="shadow-none border border-alto"
      >
        <div className="items-center">
          <div className="flex flex-col items-center">
            <Button className="rounded-full" onClick={() => setActive(true)}>
              <Avatar
                alt="User Photo"
                src={userData.data.photo}
                sx={{ width: 100, height: 100 }}
              />
            </Button>
            <Typography variant="body2" color="textSecondary" className="mt-2">
              @{userData.data.username}
            </Typography>
            <Typography variant="h6" className="text-center">
              {userData.data.firstName} {userData.data.lastName}
            </Typography>
            <Button
              variant="contained"
              size="small"
              className="rounded w-full shadow-none "
              onClick={() => setActive(true)}
              startIcon={<EditIcon />}
            >
              Редактировать 
            </Button>
            <Button className='w-full mt-2' size='small' variant='outlined' onClick={() => handleLogout()}>Выйти</Button>
          </div>
          {userData.data.role === 'student' ? (
            <>
              <div className="mt-5 flex flex-col items-center">
                <div className="flex flex-col gap-4 ">
                  <div className="flex  gap-4">
                    <Paper
                      className="max-w-[150px] min-w-[150px] shadow-none border border-alto"
                      elevation={2}
                      sx={{
                        padding: 1,
                        backgroundColor: '#e3f2fd',
                      }}
                    >
                      <Chip
                        label={userData.data.group}
                        color="primary"
                        className="text-white font-bold"
                        icon={<GroupIcon className="text-alto" />}
                      />
                      <p className="text-[15px] font-bold text-tundora">
                        Группа
                      </p>
                    </Paper>
                    <Paper
                      className="max-w-[150px] min-w-[150px] shadow-none border border-alto"
                      elevation={2}
                      sx={{
                        padding: 1,
                        backgroundColor: '#f1f8e9',
                        flex: 1,
                      }}
                    >
                      <Chip
                        label={userData.data.rating}
                        color="success"
                        className="text-white font-bold"
                        icon={<EmojiEvents className="text-sun" />}
                      />
                      <p className="text-[15px] font-bold text-tundora">
                        Рейтинг
                      </p>
                    </Paper>
                  </div>
                  <div className="flex gap-4">
                    <Paper
                      className="max-w-[150px] min-w-[150px] shadow-none border border-alto"
                      elevation={2}
                      sx={{
                        padding: 1,
                        backgroundColor: '#fff3e0',
                        flex: 1,
                      }}
                    >
                      <Chip
                        label={userData.data.achiviementsCount}
                        color="warning"
                        className="text-white font-bold"
                        icon={<WorkspacePremiumIcon />}
                      />
                      <p className="text-[15px] font-bold text-tundora">
                        Достижений
                      </p>
                    </Paper>
                    <Paper
                      className="max-w-[150px] min-w-[150px] shadow-none border border-alto"
                      elevation={2}
                      sx={{
                        padding: 1,
                        backgroundColor: '#fff3e0',
                      }}
                    >
                      <Chip
                        label={userData.data.points}
                        className="bg-cinnabar text-white font-bold"
                        icon={<ElectricBoltIcon className="text-yellow" />}
                      />
                      <p className="text-[15px] font-bold text-tundora">
                        Баллов
                      </p>
                    </Paper>
                  </div>
                </div>
              </div>
              <div className="mt-5  flex flex-col items-center">
                <Chart />
              </div>
              <div className="mt-5 flex flex-col items-center">
                <Typography
                  variant="h6"
                  className="text-center font-semibold text-tundora"
                >
                  Достижения
                </Typography>
                <div className="flex flex-col items-center gap-5">
                  {userData.data.achievements?.map((achievement) => (
                    <BadgeCard
                      key={achievement.id}
                      image={achievement.photo}
                      title={achievement.name}
                      description={achievement.description}
                      rarity={achievement.rarity.name}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </Paper>
      <Modal active={active} setActive={setActive}>
        <Formik
          initialValues={initialUser}
          validate={validateForm}
          onSubmit={(values) => {
            const formData = new FormData();
            formData.append('email', values.email);
            formData.append('firstName', values.firstName);
            formData.append('lastName', values.lastName);
            if (selectedFile) {
              formData.append('photo', selectedFile);
            }
            editUser({ user: formData });
          }}
        >
          {({ setFieldValue }) => (
            <Form>
              <fieldset disabled={isPending}>
                <fieldset className="my-5">
                  <Field
                    as={TextField}
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    size="small"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-xs text-[red]"
                  />
                </fieldset>
                <fieldset className="my-5">
                  <Field
                    as={TextField}
                    fullWidth
                    id="firstName"
                    name="firstName"
                    label="Имя"
                    size="small"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-xs text-[red]"
                  />
                </fieldset>
                <fieldset className="my-5">
                  <Field
                    as={TextField}
                    fullWidth
                    id="lastName"
                    name="lastName"
                    size="small"
                    label="Фамилия"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-xs text-[red]"
                  />
                </fieldset>
                <fieldset className="my-5">
                  <input
                    id="photo"
                    name="photo"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(event) => {
                      handleFileChange(event);
                      setFieldValue('photo', event.currentTarget.files[0]);
                    }}
                  />
                  <label htmlFor="photo">
                    <Button
                      size="small"
                      variant="contained"
                      component="span"
                      className="shadow-none bg-pc-500"
                    >
                      Выберите фото профиля
                    </Button>
                  </label>
                  {fileSelected && (
                    <p className="mt-2 text-xs">
                      Файл выбран: {selectedFile.name}
                    </p>
                  )}
                  <ErrorMessage
                    name="photo"
                    component="div"
                    className="text-xs text-[red]"
                  />
                </fieldset>
              </fieldset>
              {isPending ? (
                <div className="w-full mb-2 min-h-[40px]">
                  <LinearProgress />
                </div>
              ) : (
                <SubmitButton />
              )}
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
}

function SubmitButton() {
  const { isValidating, isValid } = useFormikContext();
  return (
    <Button
      variant="contained"
      type="submit"
      className="w-full mb-2 bg-second-100 shadow-none"
      disabled={!isValid || isValidating}
    >
      Редактировать
    </Button>
  );
}

const validateForm = (values) => {
  const errors: Partial<FormikValues> = {};

  if (!values.email) {
    errors.email = 'Обязательное поле';
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = 'Неправильный формат email';
  }

  if (!values.firstName) {
    errors.firstName = 'Обязательное поле';
  }

  if (!values.lastName) {
    errors.lastName = 'Обязательное поле';
  }

  return errors;
};