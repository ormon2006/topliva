import {
  AppBar,
  Avatar,
  Toolbar,
  Tooltip,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Badge,
} from "@mui/material";
import { Link } from "react-router-dom";
import { pathKeys } from "~shared/lib/react-router";
import { useState } from "react";
import {
  BarChartRounded,
  SchoolRounded,
  LibraryBooksRounded,
  EmojiEventsRounded,
  NotificationsRounded,
  MenuRounded,
  AccountCircleRounded,
} from "@mui/icons-material";

export function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(
    null
  );
  const open = Boolean(anchorEl);
  const mobileMenuOpen = Boolean(mobileMenuAnchor);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMobileMenuAnchor(null);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "white",
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        py: 1,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "xl",
          mx: "auto",
          width: "100%",
          px: { xs: 2, md: 6 },
        }}
      >
        {/* Логотип и мобильное меню */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMobileMenu}
            sx={{ display: { xs: "flex", md: "none" }, color: "text.primary" }}
          >
            <MenuRounded />
          </IconButton>

          <Link to={pathKeys.about()} style={{ textDecoration: "none" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <SchoolRounded
                sx={{
                  color: "primary.main",
                  fontSize: 32,
                }}
              />
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 700,
                  color: "text.primary",
                  display: { xs: "none", sm: "block" },
                }}
              >
                FuelCalk
              </Typography>
            </Box>
          </Link>
        </Box>

        {/* Навигация для десктопа */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 2,
          }}
        >
          <Button
            component={Link}
            to={pathKeys.ranking()}
            startIcon={<BarChartRounded />}
            sx={{
              color: "text.secondary",
              "&:hover": {
                color: "primary.main",
                backgroundColor: "rgba(25, 118, 210, 0.04)",
              },
            }}
          >
            Рейтинг
          </Button>
        </Box>

        {/* Иконки действий */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Tooltip title="Уведомления">
            <IconButton
              size="large"
              aria-label="show notifications"
              color="inherit"
              sx={{ color: "text.secondary" }}
            >
              <Badge badgeContent={3} color="error">
                <NotificationsRounded />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Профиль">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              sx={{ p: 0 }}
            >
              <Avatar
                alt="User Avatar"
                src="/path-to-avatar.jpg"
                sx={{
                  width: 36,
                  height: 36,
                  border: "2px solid",
                  borderColor: "primary.main",
                }}
              />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Меню профиля */}
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={open}
          onClose={handleClose}
          sx={{
            "& .MuiPaper-root": {
              mt: 1.5,
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.12)",
              minWidth: 200,
              borderRadius: 2,
            },
          }}
        >
          <MenuItem
            onClick={handleClose}
            component={Link}
            to={pathKeys.profile.root()}
            sx={{ py: 1.5 }}
          >
            <AccountCircleRounded sx={{ mr: 1.5, color: "text.secondary" }} />
            Профиль
          </MenuItem>

          <MenuItem
            onClick={handleClose}
            sx={{
              py: 1.5,
              borderTop: "1px solid",
              borderColor: "divider",
              mt: 0.5,
            }}
          >
            Выйти
          </MenuItem>
        </Menu>

        {/* Мобильное меню */}
        <Menu
          id="mobile-menu"
          anchorEl={mobileMenuAnchor}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={mobileMenuOpen}
          onClose={handleClose}
          sx={{
            "& .MuiPaper-root": {
              mt: 1.5,
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.12)",
              minWidth: 200,
              borderRadius: 2,
              display: { xs: "block", md: "none" },
            },
          }}
        >
          <MenuItem
            onClick={handleClose}
            component={Link}
            to={pathKeys.ranking()}
            sx={{ py: 1.5 }}
          >
            <BarChartRounded sx={{ mr: 1.5, color: "text.secondary" }} />
            Рейтинг
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
