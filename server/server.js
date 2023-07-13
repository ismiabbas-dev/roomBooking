const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

const PORT = process.env.PORT || 8080;

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Sample server",
    version: "1.0.0",
    description: "Sample server",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
  },
  servers: [
    {
      url: "http://localhost:8080",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["server.js"],
};

const swaggerSpec = swaggerJSDoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root12345",
  database: "mydb",
});

con.connect(function (err) {
  if (err) {
    console.error("Error connecting to database: ", err);
  } else {
    console.log("Connected to database!");
  }
});

app.use(express.json());
app.use(cors());

app.get("/room", (req, res) => {
  const SELECT_ROOMS_QUERY = `SELECT R.*, B.UserID, U.Name FROM Room R
  LEFT JOIN Booking B on R.RoomID = B.RoomID
  LEFT JOIN User U on B.UserID = U.UserID`;

  con.query(SELECT_ROOMS_QUERY, (err, results) => {
    if (err) {
      console.error("Error retrieving rooms: ", err);
      return res.status(500).send("Error retrieving rooms");
    } else {
      console.log("Retrieved rooms: ", results);
      return res.status(200).json(results);
    }
  });
});

// Create a new room
app.post("/room", (req, res) => {
  const { number, type } = req.body;
  const INSERT_ROOM_QUERY = `INSERT INTO Room (RoomNumber, RoomType, RoomStatus) VALUES (?, ?, ?)`;
  const values = [number, type, 1];

  con.query(INSERT_ROOM_QUERY, values, (err, results) => {
    if (err) {
      console.error("Error adding room: ", err);
      return res.status(500).send("Error adding room");
    } else {
      console.log("Successfully added room");
      return res.status(200).send({
        message: "Successfully added room",
      });
    }
  });
});

// Get a room
app.get("/room/:id", (req, res) => {
  const { id } = req.params;
  const SELECT_ROOM_QUERY = "SELECT * FROM Room WHERE RoomID = ?";
  const values = [id];

  con.query(SELECT_ROOM_QUERY, values, (err, results) => {
    if (err) {
      console.error("Error retrieving room: ", err);
      return res.status(500).send("Error retrieving room");
    } else {
      console.log("Retrieved room: ", results);
      return res.status(200).json(results);
    }
  });
});

// Update a room
app.put("/room/:id", (req, res) => {
  const { id } = req.params;
  const { status, number, type } = req.body;
  const UPDATE_ROOM_QUERY = `UPDATE Room SET RoomStatus = ?, RoomNumber = ?, RoomType = ? WHERE RoomID = ?`;
  const values = [status, number, type, id];

  con.query(UPDATE_ROOM_QUERY, values, (err, results) => {
    if (err) {
      console.error("Error updating room: ", err);
      return res.status(500).send("Error updating room");
    } else {
      console.log("Successfully updated room");
      return res.status(200).send({
        message: "Successfully updated room",
        results,
      });
    }
  });
});

// Delete a room
app.delete("/room/:id", (req, res) => {
  const { id } = req.params;
  const SELECT_EXISTING_BOOKINGS_QUERY =
    "SELECT 1 FROM mydb.Booking WHERE RoomID = ?";
  const DELETE_ROOM_QUERY = "DELETE FROM Room WHERE RoomID = ?";

  con.query(SELECT_EXISTING_BOOKINGS_QUERY, [id], (err, results) => {
    if (err) {
      console.error("Error checking existing bookings: ", err);
      return res.status(500).send("Error deleting room");
    } else {
      if (results.length > 0) {
        console.error("Existing bookings found, cannot delete the room");
        return res
          .status(400)
          .send("Existing bookings found, cannot delete the room");
      } else {
        con.query(DELETE_ROOM_QUERY, [id], (err, results) => {
          if (err) {
            console.error("Error deleting room: ", err);
            return res.status(500).send("Error deleting room");
          } else {
            console.log("Successfully deleted room");
            return res.status(200).send({
              message: "Successfully deleted room",
            });
          }
        });
      }
    }
  });
});

// Get a booking
app.get("/booking/:id", (req, res) => {
  const { id } = req.params;
  const SELECT_BOOKING_QUERY = `SELECT B.BookingID,
  B.BookingStatus,
  R.RoomNumber,
  R.RoomID,
  R.RoomType,
  U.UserID,
  U.Name
  FROM Booking B
    INNER JOIN Room R on B.RoomID = R.RoomID
    INNER JOIN User U on U.UserID = B.UserID
  WHERE BookingID = ?`;
  const values = [id];

  con.query(SELECT_BOOKING_QUERY, values, (err, results) => {
    if (err) {
      console.error("Error retrieving booking: ", err);
      return res.status(500).send("Error retrieving booking");
    } else {
      console.log("Retrieved booking: ", results);
      return res.status(200).json(results);
    }
  });
});

// Get all bookings
app.get("/booking", (req, res) => {
  const SELECT_BOOKINGS_QUERY = `SELECT B.BookingID,
    B.BookingStatus,
    R.RoomNumber,
    R.RoomID,
    R.RoomType,
    U.UserID,
    U.Name
    FROM Booking B
      INNER JOIN Room R on B.RoomID = R.RoomID
      INNER JOIN User U on U.UserID = B.UserID`;

  con.query(SELECT_BOOKINGS_QUERY, (err, results) => {
    if (err) {
      console.error("Error retrieving bookings: ", err);
      return res.status(500).send("Error retrieving bookings");
    } else {
      console.log("Retrieved bookings: ", results);
      return res.status(200).json(results);
    }
  });
});

// Create a new booking
app.post("/booking", (req, res) => {
  const { roomId, userId } = req.body;
  const INSERT_BOOKING_QUERY = `
    INSERT INTO Booking (BookingStatus, RoomID, UserID)
    SELECT ?, ?, ?
    WHERE NOT EXISTS (
      SELECT 1 FROM Booking WHERE RoomID = ? AND BookingStatus = 0
    )`;
  const UPDATE_ROOM_QUERY = `UPDATE Room SET RoomStatus = 0 WHERE RoomID = ?`;
  const values = [0, roomId, userId, roomId];

  con.query(INSERT_BOOKING_QUERY, values, (err, result) => {
    if (err) {
      return res.status(500).send("Error adding booking");
    } else if (result.affectedRows === 0) {
      return res.status(409).send({
        message: "Booking already exists",
      });
    } else {
      con.query(UPDATE_ROOM_QUERY, roomId, (err) => {
        if (err) {
          return res.status(500).send({
            message: "Error updating room status",
          });
        } else {
          return res.status(200).send({
            message: "Successfully added booking",
          });
        }
      });
    }
  });
});

// Update a booking
app.put("/booking/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const UPDATE_BOOKING_QUERY = `UPDATE Booking SET BookingStatus = ? WHERE BookingID = ?`;
  const values = [status, id];

  con.query(UPDATE_BOOKING_QUERY, values, (err, results) => {
    if (err) {
      console.error("Error updating booking: ", err);
      return res.status(500).send("Error updating booking");
    } else {
      console.log("Successfully updated booking");
      return res.status(200).send({ message: "Successfully updated booking" });
    }
  });
});

// Delete a booking
app.delete("/booking/:id", (req, res) => {
  const { id } = req.params;
  const DELETE_BOOKING_QUERY = `DELETE FROM Booking WHERE BookingID = ?`;
  const values = [id];

  con.query(DELETE_BOOKING_QUERY, values, (err, results) => {
    if (err) {
      console.error("Error deleting booking: ", err);
      return res.status(500).send({
        message: "Error deleting booking",
      });
    } else {
      console.log("Successfully deleted booking", results);
      return res.status(200).send({
        message: "Successfully deleted booking",
      });
    }
  });
});

// Get a user
app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  const SELECT_USER_QUERY = "SELECT * FROM User WHERE UserID = ?";

  con.query(SELECT_USER_QUERY, id, (err, results) => {
    if (err) {
      console.error("Error retrieving user: ", err);
      return res.status(500).send("Error retrieving user");
    } else {
      console.log("Retrieved user: ", results);
      return res.status(200).send(results[0]);
    }
  });
});

// Get all users
app.get("/user", (req, res) => {
  const SELECT_USERS_QUERY = "SELECT * FROM User";

  con.query(SELECT_USERS_QUERY, (err, results) => {
    if (err) {
      console.error("Error retrieving users: ", err);
      return res.status(500).send("Error retrieving users");
    } else {
      console.log("Retrieved users: ", results);
      return res.status(200).json(results);
    }
  });
});

// Update profile
app.put("/user/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const UPDATE_USER_QUERY = `UPDATE User SET Name = ?, Email = ?, Password = ? WHERE UserID = ?`;
  const values = [name, email, password, id];

  con.query(UPDATE_USER_QUERY, values, (err, results) => {
    if (err) {
      console.error("Error updating user: ", err);
      return res.status(500).send("Error updating user");
    } else {
      console.log("Successfully updated user");
      return res.status(200).send({
        message: "Successfully updated user",
      });
    }
  });
});

// Auth login
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  const SELECT_USER_QUERY =
    "SELECT * FROM User WHERE Email = ? AND Password = ?";
  const values = [email, password];

  console.log(SELECT_USER_QUERY, values);

  con.query(SELECT_USER_QUERY, values, (err, results) => {
    if (err) {
      console.error("Error retrieving user: ", err);
      return res.status(500).send("Error retrieving user");
    } else {
      if (results.length === 0) {
        console.error("Invalid email or password");
        return res.status(400).send({
          message: "Invalid email or password",
        });
      }
      const data = results[0];

      token = generateToken(data);
      return res.status(200).json({
        id: data.UserID,
        name: data.Name,
        email: data.Email,
        role: data.Role,
        token,
      });
    }
  });
});

// Auth register
app.post("/auth/register", (req, res) => {
  const { email, username, password } = req.body;
  const INSERT_USER_QUERY =
    "INSERT INTO User (Name, Email, Password, Role) VALUES (?, ?, ?, ?)";
  const values = [username, email, password, "user"];

  con.query(INSERT_USER_QUERY, values, (err, results) => {
    if (err) {
      return res.status(500).send("Error adding user");
    } else {
      console.log("Successfully added user");
      return res.status(200).send({
        message: "Successfully added user",
      });
    }
  });
});

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.UserID,
      name: user.Name,
      email: user.Email,
    },
    "abbasSecretKey",
    {
      expiresIn: "1h",
      algorithm: "HS256",
    }
  );
};

app.listen(
  PORT,
  () => console.log("Server running on port " + PORT),
  console.log("Browser swagger at " + "http://localhost:" + PORT + "/docs")
);

/**
 * @swagger
 * tags:
 *   name: Room
 *   description: Room API
 */

/**
 * @swagger
 * /room:
 *   get:
 *     summary: Get all rooms
 *     tags: [Room]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error retrieving rooms
 *   post:
 *     summary: Create a new room
 *     tags: [Room]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: string
 *               status:
 *                 type: string
 *               type:
 *                 type: string
 *             example:
 *               number: "101"
 *               status: "available"
 *               type: "standard"
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error adding room
 */

/**
 * @swagger
 * /room/{id}:
 *   get:
 *     summary: Get a room
 *     tags: [Room]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Room ID
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error retrieving room
 *   put:
 *     summary: Update a room
 *     tags: [Room]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Room ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *             example:
 *               status: "booked"
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error updating room
 *   delete:
 *     summary: Delete a room
 *     tags: [Room]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Room ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Existing bookings found, cannot delete the room
 *       500:
 *         description: Error deleting room
 *
 *
 */

/**
 * @swagger
 * tags:
 *   name: Room
 *   description: Room API
 */

/**
 * @swagger
 * /room:
 *   get:
 *     summary: Get all rooms
 *     tags: [Room]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error retrieving rooms
 *   post:
 *     summary: Create a new room
 *     tags: [Room]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: string
 *               status:
 *                 type: string
 *               type:
 *                 type: string
 *             example:
 *               number: "101"
 *               status: "available"
 *               type: "standard"
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error adding room
 */

/**
 * @swagger
 * /room/{id}:
 *   get:
 *     summary: Get a room
 *     tags: [Room]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Room ID
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error retrieving room
 *   put:
 *     summary: Update a room
 *     tags: [Room]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Room ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *             example:
 *               status: "booked"
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error updating room
 *   delete:
 *     summary: Delete a room
 *     tags: [Room]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Room ID
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Existing bookings found, cannot delete the room
 *       500:
 *         description: Error deleting room
 */

/**
 * @swagger
 * tags:
 *   name: Booking
 *   description: Booking API
 */

/**
 * @swagger
 * /booking:
 *   get:
 *     summary: Get all bookings
 *     tags: [Booking]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error retrieving bookings
 *   post:
 *     summary: Create a new booking
 *     tags: [Booking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *               checkInDate:
 *                 type: string
 *                 format: date
 *               checkOutDate:
 *                 type: string
 *                 format: date
 *             example:
 *               roomId: 1
 *               userId: 1
 *               checkInDate: "2022-01-01"
 *               checkOutDate: "2022-01-05"
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error adding booking
 */

/**
 * @swagger
 * /booking/{id}:
 *   get:
 *     summary: Get a booking
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error retrieving booking
 *   put:
 *     summary: Update a booking
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Booking ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *             example:
 *               status: "checked_in"
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error updating booking
 *   delete:
 *     summary: Delete a booking
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error deleting booking
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User API
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error retrieving users
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *             example:
 *               name: "John Doe"
 *               email: "john@example.com"
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error adding user
 */

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error retrieving user
 *   put:
 *     summary: Update a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *             example:
 *               name: "Jane Doe"
 *               email: "jane@example.com"
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error updating user
 *   delete:
 *     summary: Delete a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error deleting user
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       500:
 *         description: Error adding user
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
