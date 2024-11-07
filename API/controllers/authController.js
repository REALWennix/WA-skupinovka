const authService = require("../services/authService");
const db = require("../config/db");

async function register(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Username, email, and password are required" });
  }

  try {
    const hashedPassword = await authService.hashPassword(password);

    authService.addUser(username, email, hashedPassword, (err) => {
      if (err) {
        if (err.code === "SQLITE_CONSTRAINT") {
          return res
            .status(400)
            .json({ error: "Username or email already exists" });
        }
        return res.status(500).json({ error: "Database error" });
      }
      res.status(201).json({ message: "User registered successfully" });
    });
  } catch (err) {
    res.status(500).json({ error: "Error hashing password" });
  }
}

async function login(req, res) {
  const { usernameOrEmail, password } = req.body;

  if (!usernameOrEmail || !password) {
    return res
      .status(400)
      .json({ error: "Username/Email and password are required" });
  }

  authService.getUserByUsernameOrEmail(usernameOrEmail, async (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    if (!user) {
      return res
        .status(400)
        .json({ error: "Invalid username/email or password" });
    }

    const isPasswordCorrect = await authService.comparePassword(
      password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ error: "Invalid username/email or password" });
    }

    req.session.userId = user.id;
    res.json({ message: "Login successful" });
  });
}

function profile(req, res) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  db.get(
    `SELECT id, username, email FROM users WHERE id = ?`,
    [req.session.userId],
    (err, user) => {
      if (err || !user) {
        return res.status(500).json({ error: "User not found" });
      }
      res.json({ user });
    }
  );
}

function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Logout successful" });
  });
}

module.exports = {
  register,
  login,
  profile,
  logout,
};
