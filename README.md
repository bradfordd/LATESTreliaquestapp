# Getting Started

To run the code, follow the steps below:

1. Ensure you have Node.js installed on your system. If you don't have it, download and install it from https://nodejs.org/en/download/.

2. Install Git if you don't have it already. You can download it from https://git-scm.com/downloads.

3. Open your terminal or command prompt and clone the repository:
```
git clone https://github.com/bradfordd/LATESTreliaquestapp.git
```

4. Navigate to the "reliaquest/backend" directory and install the backend dependencies:
```
cd LATESTreliaquestapp/reliaquest/backend
npm install mongodb express cors dotenv
```

5. Start the server by running the following command in the terminal:
```
npm start
```

6. Open a new terminal or command prompt, navigate to the "reliaquestapp" directory and install the frontend dependencies:
```
cd LATESTreliaquestapp/reliaquestapp
npm install bootstrap react-router-dom
```

7. Start the frontend application by running the following command in the terminal:
```
npm start
```

The backend folder contained in this application contains the JavaScript code that boots up the server. The backend folder also contains all of the APIs that are utilized by the frontend to interact with the database. Within the backend, `config` and `node_modules` are included within the project initialization. `Models` contains the schema for each data object that makes up the database as well as the model for the tokens used in a session. `Routes` within backend contains the APIs associated with each object. `server.js` starts up the server.

Now, the application should be running on your local machine. You can access the frontend by opening a web browser and navigating to http://localhost:3000.

# Course Model Documentation

The `Course` model represents a course in a school or educational institution. This model is built using Mongoose, a popular Object Data Modeling (ODM) library for MongoDB and Node.js.

## Schema

The `courseSchema` defines the structure of a course document in the database. The schema consists of the following fields:

- `name`: (String, required) Represents the name of the course. This field is required, and the course cannot be created without it.
- `teacherAssigned`: (String) Represents the name of the teacher assigned to the course.
- `teacherID`: (String) Represents the unique identifier of the teacher assigned to the course.
- `students`: (Array of Strings) Contains the list of student names enrolled in the course.

## Model

The `Course` model is created by calling `mongoose.model()` and passing in the schema defined above. This creates a Mongoose model that can be used to interact with the `Course` collection in the MongoDB database.

```javascript
const Course = mongoose.model('Course', courseSchema);
```

## Usage

You can use the `Course` model to perform various CRUD (Create, Read, Update, and Delete) operations on the `Course` collection in the database.

### Importing the Model

To use the `Course` model in other parts of your application, you need to import it using `require()`:

```javascript
const Course = require('./models/Course');
```

### Creating a New Course

To create a new course, you can use the `save()` method on a new instance of the `Course` model:

```javascript
const newCourse = new Course({
  name: 'Mathematics',
  teacherAssigned: 'John Doe',
  teacherID: '12345',
  students: ['Alice', 'Bob', 'Charlie'],
});

newCourse.save().then(() => console.log('Course created successfully'));
```

### Finding Courses

To find courses in the database, you can use various Mongoose methods like `find()`, `findOne()`, `findById()`, etc.:

```javascript
Course.find().then((courses) => console.log(courses));

Course.findOne({ name: 'Mathematics' }).then((course) => console.log(course));

Course.findById('courseId').then((course) => console.log(course));
```

### Updating Courses

To update a course, you can use methods like `updateOne()`, `updateMany()`, or `findByIdAndUpdate()`:

```javascript
Course.updateOne({ _id: 'courseId' }, { name: 'New Course Name' }).then(() => console.log('Course updated'));

Course.findByIdAndUpdate('courseId', { name: 'New Course Name' }, { new: true }).then((updatedCourse) => console.log(updatedCourse));
```

### Deleting Courses

To delete a course, you can use methods like `deleteOne()`, `deleteMany()`, or `findByIdAndDelete()`:

```javascript
Course.deleteOne({ _id: 'courseId' }).then(() => console.log('Course deleted'));

Course.findByIdAndDelete('courseId').then(() => console.log('Course deleted'));
```

For more information on Mongoose models and their methods, refer to the official Mongoose documentation: https://mongoosejs.com/docs/models.html

# Grade Average Model Documentation

The `GradeAverage` model represents a student's average grade in a particular course. This model is built using Mongoose, a popular Object Data Modeling (ODM) library for MongoDB and Node.js.

## Schema

The `gradeaverageSchema` defines the structure of a grade average document in the database. The schema consists of the following fields:

- `grade`: (Number, required) Represents the average grade of the student in the course. This field is required.
- `courseID`: (String, required) Represents the unique identifier of the course. This field is required.
- `studentID`: (String, required) Represents the unique identifier of the student. This field is required.
- `studentName`: (String, required) Represents the name of the student. This field is required.
- `courseName`: (String, required) Represents the name of the course. This field is required.
- `sharedWith`: (Array of Strings) Contains a list of user identifiers who can access this grade average.

## Model

The `GradeAverage` model is created by calling `mongoose.model()` and passing in the schema defined above. This creates a Mongoose model that can be used to interact with the `GradeAverage` collection in the MongoDB database.

```javascript
const GradeAverage = mongoose.model('GradeAverage', gradeaverageSchema);
```

## Usage

You can use the `GradeAverage` model to perform various CRUD (Create, Read, Update, and Delete) operations on the `GradeAverage` collection in the database.

### Importing the Model

To use the `GradeAverage` model in other parts of your application, you need to import it using `require()`:

```javascript
const GradeAverage = require('./models/GradeAverage');
```

### Creating a New Grade Average

To create a new grade average, you can use the `save()` method on a new instance of the `GradeAverage` model:

```javascript
const newGradeAverage = new GradeAverage({
  grade: 85,
  courseID: 'courseId',
  studentID: 'studentId',
  studentName: 'John Doe',
  courseName: 'Mathematics',
  sharedWith: ['userId1', 'userId2'],
});

newGradeAverage.save().then(() => console.log('Grade average created successfully'));
```

### Finding Grade Averages

To find grade averages in the database, you can use various Mongoose methods like `find()`, `findOne()`, `findById()`, etc.:

```javascript
GradeAverage.find().then((gradeAverages) => console.log(gradeAverages));

GradeAverage.findOne({ studentID: 'studentId', courseID: 'courseId' }).then((gradeAverage) => console.log(gradeAverage));

GradeAverage.findById('gradeAverageId').then((gradeAverage) => console.log(gradeAverage));
```

### Updating Grade Averages

To update a grade average, you can use methods like `updateOne()`, `updateMany()`, or `findByIdAndUpdate()`:

```javascript
GradeAverage.updateOne({ _id: 'gradeAverageId' }, { grade: 90 }).then(() => console.log('Grade average updated'));

GradeAverage.findByIdAndUpdate('gradeAverageId', { grade: 90 }, { new: true }).then((updatedGradeAverage) => console.log(updatedGradeAverage));
```

### Deleting Grade Averages

To delete a grade average, you can use methods like `deleteOne()`, `deleteMany()`, or `findByIdAndDelete()`:

```javascript
GradeAverage.deleteOne({ _id: 'gradeAverageId' }).then(() => console.log('Grade average deleted'));

GradeAverage.findByIdAndDelete('gradeAverageId').then(() => console.log('Grade average deleted'));
```

By using these methods, you can interact with the `GradeAverage` collection in the database and perform CRUD operations as needed.

# Grade Model Documentation

The `Grade` model represents an individual grade of a student in a specific course. This model is used to store and manage grades for students in different courses.

## Schema

The `Grade` schema consists of the following fields:

- `name` (String, required): The name of the grade, e.g., "Midterm Exam", "Quiz 1", etc.
- `gradeAssigned` (Number, required): The grade the student received for the specific assignment or exam.
- `total` (Number, required): The total possible points for the specific assignment or exam.
- `courseID` (String, required): The ID of the course in which the grade was assigned.
- `studentID` (String, required): The ID of the student who received the grade.
- `studentName` (String): The name of the student who received the grade.

## Usage

To interact with the `Grade` model, you need to import it and use Mongoose methods for creating, reading, updating, and deleting documents in the MongoDB database.

### Importing the Grade Model

```javascript
const Grade = require('./path/to/grade');
```

### Creating a New Grade

```javascript
const newGrade = await Grade.create({
  name: 'Midterm Exam',
  gradeAssigned: 85,
  total: 100,
  courseID: 'courseId',
  studentID: 'studentId',
  studentName: 'John Doe'
});
```

### Finding a Grade by Student ID and Course ID

```javascript
const grade = await Grade.findOne({ studentID: 'studentId', courseID: 'courseId' });
```

### Updating a Grade by ID

```javascript
const updatedGrade = await Grade.findByIdAndUpdate('gradeId', { gradeAssigned: 90 });
```

### Deleting a Grade by ID

```javascript
const deletedGrade = await Grade.findByIdAndRemove('gradeId');
```

By using these methods, you can interact with the `Grade` collection in the database and perform CRUD operations as needed.

# Register Model Documentation

The `Register` model represents user information, including students and teachers, for the application. This model is used to store and manage user accounts, their personal information, assigned courses, and roles.

## Schema

The `Register` schema consists of the following fields:

- `username` (String, required, unique): The username of the user, which must be unique.
- `password` (String, required): The hashed password of the user.
- `name` (String, required): The full name of the user.
- `address` (String, required): The address of the user.
- `teacher` (Boolean, required): A flag to indicate whether the user is a teacher (`true`) or a student (`false`).
- `date` (Date): The date the user was created, which defaults to the current date.
- `assignedCoursesIDs` (Array): An array of course IDs the user is assigned to (either as a student or a teacher).
- `admin` (Boolean): A flag to indicate whether the user is an administrator of the system.

## Usage

To interact with the `Register` model, you need to import it and use Mongoose methods for creating, reading, updating, and deleting documents in the MongoDB database.

### Importing the Register Model

```javascript
const Register = require('./path/to/register');
```

### Creating a New User

```javascript
const newUser = await Register.create({
  username: 'john.doe',
  password: 'hashed_password',
  name: 'John Doe',
  address: '123 Main St',
  teacher: false,
  assignedCoursesIDs: [],
  admin: false
});
```

### Finding a User by Username

```javascript
const user = await Register.findOne({ username: 'john.doe' });
```

### Updating a User by ID

```javascript
const updatedUser = await Register.findByIdAndUpdate('userId', { address: '456 New St' });
```

### Deleting a User by ID

```javascript
const deletedUser = await Register.findByIdAndRemove('userId');
```

By using these methods, you can interact with the `Register` collection in the database and perform CRUD operations as needed.

# Server Documentation

This server code initializes and runs an Express-based server with built-in API routes for managing user registration, courses, grades, and authentication. It also establishes a connection with a MongoDB database using Mongoose.

## Dependencies

To run this server, make sure you have the following dependencies installed:

- express
- cors
- mongoose
- config
- jsonwebtoken (jwt)
- dotenv

## Usage

To start the server, run the following command:

```
node server.js
```

The server will run on port 8080 or the port defined in the `PORT` environment variable.

## Features

### Middleware

The server uses the following middleware:

- `cors`: Enable Cross-Origin Resource Sharing (CORS) for all routes.
- `express.json()`: Parse incoming JSON request payloads.

### Database Connection

The server establishes a connection to a MongoDB database using Mongoose. It uses the connection string from the `MongoURI` configuration value, which can be set in the `config` folder or through an environment variable.

### Routes

The server includes the following API routes:

- `/components/grades`: API routes for managing grades.
- `/components/register`: API routes for managing user registration.
- `/components/course`: API routes for managing courses.
- `/components/login`: API routes for user authentication.
- `/components/auth`: API routes for JWT authentication middleware.
- `/components/gradeaverage`: API routes for managing grade averages.

## Importing and Using Routes

For each route, import the corresponding router module and use it with the `app.use()` method. For example:

```javascript
const registerRouter = require("./routes/register");
app.use("/components/register", registerRouter);
```

## Server Listening

The server listens on the specified port and logs a message to the console when it starts:

```javascript
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
```

By following this documentation, you can set up and run the server to support the application's user registration, course management, and other related features.

# Authentication Middleware Documentation

This middleware module provides JWT-based authentication for protecting API routes. It verifies the provided JWT token and decodes the user information from the token payload.

## Dependencies

To use this middleware, make sure you have the following dependencies installed:

- jsonwebtoken (jwt)
- config

## Usage

To use this middleware, first import the `auth` function and then apply it to the API routes you want to protect:

```javascript
const auth = require("./auth");

app.use("/protected/route", auth, protectedRouteRouter);
```

## Middleware Function: `auth(req, res, next)`

This function checks for the presence of a JWT token in the request header and verifies it using the `jwt.verify()` method. If the token is valid, it adds the decoded user information to the request object and calls the `next()` function to continue processing the request.

### Parameters

- `req`: The request object.
- `res`: The response object.
- `next`: The next middleware function in the stack.

### Workflow

1. Extract the JWT token from the `x-auth-token` header of the request.
2. If there is no token, respond with a 401 status and an error message.
3. Verify the token using the `jwt.verify()` method and the secret key from the configuration.
4. If the token is valid, add the decoded user information to the `req.user` object and call the `next()` function to continue processing the request.
5. If the token is not valid, respond with a 400 status and an error message.

## Error Handling

The middleware will respond with an appropriate HTTP status code and an error message when it encounters a problem:

- `401`: No token provided.
- `400`: Token is not valid.

By implementing this authentication middleware in your application, you can effectively protect your API routes and ensure that only authenticated users with a valid JWT token can access them.

# React Application Documentation

This React application provides a platform for managing courses, grades, and users. The application offers various features, including user authentication, role-based access control, course management, grade management, and user management.

## Components

The application consists of several components to handle various aspects of the system:

- `LoginForm`: Handles user login.
- `RegisterForm`: Handles user registration.
- `Academic_Records`: Displays a user's academic records.
- `Courses`: Displays the list of courses.
- `NavBar`: Provides the main navigation bar for the application.
- `About`: Displays the about page.
- `Logout`: Handles user logout.
- `Dashboard`: Displays the dashboard for teachers.
- `Personal_info`: Displays the personal information of the user.
- `ProtectedRoute`: A higher-order component for protecting routes based on user authentication.
- `ProtectedRoutePermission`: A higher-order component for protecting routes based on user permission level.
- `CourseForm`: Handles course creation and updates.
- Various course components (e.g., `English`, `EnglishHonors2`, `Geometry`, etc.): Display course-specific information and options.

Additionally, there are components for handling administrative tasks:

- `AllCoursesAdmin`: Displays all courses for administrators.
- `CreateCourseForm`: Handles course creation for administrators.
- `UpdateCourseForm`: Handles course updates for administrators.
- `EnglishAdmin`: Displays course-specific information and options for administrators.

## Routing

The application uses `react-router-dom` to handle client-side routing. Routes are defined in the `Switch` component within the `App` component.

Routes are protected using the `ProtectedRoute` and `ProtectedRoutePermission` higher-order components to ensure that only authenticated users with the correct permission level can access specific routes.

## State Management

The application uses the `useState` API to manage the state of the user, including authentication status, permission level, and user information. When the component is mounted, the `componentDidMount` lifecycle method retrieves the current user object and updates the state accordingly.

## Styling

The application uses CSS styling for layout and appearance. The `linkStyle` object is used to define the color of links in the application.

## Dependencies

Make sure you have the following dependencies installed:

- react
- react-dom
- react-router-dom
- react-toastify
- jwt-decode

To run the application, use the appropriate command based on your package manager (`npm` or `yarn`):

```
npm start
```

or

```
yarn start
```

By following this documentation, you should have a better understanding of the structure and functionality of this React application.

## React Components Overview

This section of the documentation provides an in-depth explanation of the React components used in the application. Each component has a specific role in managing various aspects of the system, such as user authentication, course management, and user management. By understanding the purpose and functionality of each component, you can effectively navigate and modify the codebase.

### About Component

The `About` component is a simple functional React component that displays general information about the web application. It briefly explains the purpose of the application, the technologies used (MERN stack), and the features offered, such as student information management and different levels of authorization.

**File location**: `./components/About.js`

**Usage**: The `About` component is rendered when the user navigates to the "/components/about" route in the application.

**Code snippet**:

```javascript
import React from "react";

export default function About() {
  return (
    <div className="wrapper">
      <h1>About</h1>
      <p>
        Web application developed using the MERN stack. The goal of this
        application is to provide the features that are common in a school
        web-portal e.g. display the student's information as well as the ability
        to make modifications to it. It also utilizes different levels of
        authorization, which ensures security based on the current user.
      </p>
    </div>
  );
}
```

To update or modify the content displayed on the "About" page, simply edit the text within the `<p>` element in the component's return statement.

### About Component

The `About` component is a simple functional React component that displays general information about the web application. It briefly explains the purpose of the application, the technologies used (MERN stack), and the features offered, such as student information management and different levels of authorization.

**File location**: `./components/About.js`

**Usage**: The `About` component is rendered when the user navigates to the "/components/about" route in the application.

**Code snippet**:

```javascript
import React from "react";

export default function About() {
  return (
    <div className="wrapper">
      <h1>About</h1>
      <p>
        Web application developed using the MERN stack. The goal of this
        application is to provide the features that are common in a school
        web-portal e.g. display the student's information as well as the ability
        to make modifications to it. It also utilizes different levels of
        authorization, which ensures security based on the current user.
      </p>
    </div>
  );
}
```

To update or modify the content displayed on the "About" page, simply edit the text within the `<p>` element in the component's return statement.

### CourseForm Component

The `CourseForm` component is a class-based React component that allows students to register for courses. It fetches the available courses, displays them in a dropdown list, and submits the selected course for registration.

**File location**: `./components/CourseForm.js`

**Usage**: The `CourseForm` component is rendered when the user navigates to the "/components/courses" route in the application.

**Code snippet**:

```javascript
import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./Form";
import axios from "axios";

const Table = props => (
  <tr>
    <td>{props.course.name}</td>
    <td>{props.course._id}</td>
  </tr>
);

export default class CourseForm extends Component {
  // ...
}
```

**Main functionality**:

1. Define a `Table` functional component that renders the course name and course ID in a table row.
2. In the `CourseForm` class, initialize the state with `course_id`, `courses`, `table`, and `errors` properties.
3. Define a Joi schema for validating the selected course.
4. In `componentDidMount`, make API calls to fetch the available courses and all courses for reference.
5. Define a `tableList` method that maps over the `table` state array and returns a list of `Table` components.
6. Define `onChangeCourse` and `doSubmit` methods for handling the form input and submission.
7. In the `render` method, display a form with a dropdown list of available courses and a submit button, as well as a reference table of all courses.

**Notes**:

- To change the API endpoints for fetching the courses and submitting the form, update the URLs in the `axios.post` and `axios.get` calls in the `componentDidMount` and `doSubmit` methods, respectively.
- To customize the appearance of the form and table, modify the JSX in the `render` method.
- The component uses `localStorage` to store and retrieve the student's ID.

### Courses Component

The `Courses` component is a class-based React component that displays the list of courses a student is enrolled in, along with the instructor name and a button to drop the course.

**File location**: `./components/Courses.js`

**Usage**: The `Courses` component is rendered when the user navigates to the "/components/courses" route in the application.

**Code snippet**:

```javascript
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Course = props => (
  // ...
);

export default class Courses extends Component {
  // ...
}
```

**Main functionality**:

1. Define a `Course` functional component that renders the course name, instructor name, and a "Drop Course" button in a table row.
2. In the `Courses` class, initialize the state with `courses`, `group`, `s_id`, and `c_id` properties.
3. In `componentDidMount`, make an API call to fetch the courses a student is enrolled in.
4. Define a `deleteCourse` method that sends an API request to drop the course and remove the course from the state.
5. Define a `courseList` method that maps over the `courses` state array and returns a list of `Course` components.
6. In the `render` method, display a table with the list of enrolled courses and a "Register for a course" button that links to the `CourseForm` component.

**Notes**:

- To change the API endpoints for fetching and deleting the courses, update the URLs in the `axios.post` and `axios.put` calls in the `componentDidMount` and `deleteCourse` methods, respectively.
- To customize the appearance of the table and button, modify the JSX in the `render` method.
- The component uses `localStorage` to store and retrieve the student's ID.

### Dashboard Component

The `Dashboard` component is a class-based React component that displays the list of courses a teacher is enrolled in, along with a button to view the respective course.

**File location**: `./components/Dashboard.js`

**Usage**: The `Dashboard` component is rendered when the user navigates to the "/components/dashboard" route in the application.

**Code snippet**:

```javascript
import React, { Component } from "react";
import Form from "./Form";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";

const Course = props => (
  // ...
);

export default class Dashboard extends Component {
  // ...
}
```

**Main functionality**:

1. Define a `Course` functional component that renders the course name and a "View Course" button in a table row.
2. In the `Dashboard` class, initialize the state with a `courses` property.
3. In `componentDidMount`, make an API call to fetch the courses a teacher is enrolled in.
4. Define a `courseList` method that maps over the `courses` state array and returns a list of `Course` components.
5. Define a `navigateToCourse` method that navigates to the respective course page based on the course name.
6. In the `render` method, display a table with the list of enrolled courses.

**Notes**:

- To change the API endpoint for fetching the courses, update the URL in the `axios.post` call in the `componentDidMount` method.
- To customize the appearance of the table and button, modify the JSX in the `render` method.
- The component uses `localStorage` to store and retrieve the teacher's ID and course ID.
- To add more courses or modify the existing ones, update the conditions in the `navigateToCourse` method.

### Form Component

The `Form` component is a class-based, reusable React component that provides form validation and input handling functionalities.

**File location**: `./components/Form.js`

**Usage**: The `Form` component is meant to be extended by other components that require form validation and input handling.

**Code snippet**:

```javascript
import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./Input";

class Form extends Component {
  // ...
}

export default Form;
```

**Main functionality**:

1. The `Form` component initializes the state with `data` and `errors` properties.
2. The `validate` method validates the entire form using the `Joi` validation library and returns an `errors` object.
3. The `validateProperty` method validates a single form property and returns an error message if validation fails.
4. The `handleSubmit` method is called when the form is submitted. It validates the form, sets the state with any errors, and calls the `doSubmit` method if there are no errors.
5. The `handleChange` method is called when an input field's value changes. It updates the form data and errors in the state.
6. The `renderButton` method renders a submit button with the provided label, disabling the button if there are validation errors.
7. The `renderInput` method renders an `Input` component with the provided name, label, and type. It binds the `onChange` event to the `handleChange` method and passes the current input value and error state.

**Notes**:

- The `Form` component requires the `joi-browser` library for validation. Make sure it is installed in your project.
- To use the `Form` component in your custom form components, extend the `Form` class and define the `schema` and `doSubmit` properties in the extending component.
- The `Form` component uses the `Input` component for rendering form input fields. Ensure the `Input` component is available in your project.
- To customize the appearance of the form, update the JSX returned by the `renderButton` and `renderInput` methods.
- The `Form` component does not render a form element by default. When extending the `Form` component, you should wrap your form fields in a form element and bind the `onSubmit` event to the `handleSubmit` method.

### Input Component

The `Input` component is a stateless functional React component that renders a generic form input field, along with a label and error message if applicable.

**File location**: `./components/Input.js`

**Usage**: This component is used as a reusable input field component for forms. It can be used directly or indirectly via the `Form` component.

**Code snippet**:

```javascript
import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  // ...
};

export default Input;
```

**Main functionality**:

The `Input` component takes the following props:

- `name`: The name attribute for the input field.
- `label`: The text content of the label element.
- `error`: An error message to be displayed if the input field has a validation error.
- `...rest`: Any additional props to be passed to the input field, such as `type`, `value`, and `onChange`.

The component renders a form group with the following elements:

1. A `label` element with the provided `label` prop as its text content and the `htmlFor` attribute set to the input field's `name` prop.
2. An `input` element with the provided `name` prop and any additional props from the `rest` parameter. The input field has a `className` set to "form-control".
3. If there is an error, a `div` element with a `className` set to "alert alert-danger" is rendered, displaying the error message.

**Example usage**:

```javascript
import Input from "./Input";

function CustomFormComponent() {
  return (
    <form>
      <Input
        name="username"
        label="Username"
        type="text"
        value={username}
        onChange={handleInputChange}
        error={errors.username}
      />
      {/* Additional form fields */}
      <button type="submit">Submit</button>
    </form>
  );
}
```

**Notes**:

- The `Input` component is designed to work with the `Form` component, but it can also be used independently in custom form components.
- To style the input fields or error messages, modify the JSX returned by the `Input` component, or apply custom CSS classes to the rendered elements.
- The `Input` component does not handle input field validation or state management. When used independently, you will need to manage input state and validation in the parent component.

### LoginForm Component

The `LoginForm` component is a class-based React component that renders a login form using the reusable `Form` component. It handles user input validation, state management, and submission to authenticate users.

**File location**: `./components/LoginForm.js`

**Usage**: This component is used to display a login form for users to enter their credentials (username and password) and submit the form to log in to the application.

**Code snippet**:

```javascript
import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./Form";
import axios from "axios";
import { login } from "../services/authService";

class LoginForm extends Form {
  // ...
}

export default LoginForm;
```

**Main functionality**:

The `LoginForm` component extends the `Form` component and manages its own state for the `data` and `errors` properties. It defines a Joi validation schema for `username` and `password` fields and implements `doSubmit` method to handle form submission.

The component also includes the following methods:

- `onChangeUsername`: A method that updates the `username` state property based on user input.
- `onChangePassword`: A method that updates the `password` state property based on user input.
- `doSubmit`: A method that sends a POST request to the authentication API endpoint (`/components/auth`) with the user's credentials (username and password). On successful authentication, it stores the received JWT token and user information in the local storage and redirects the user to the `/components/about` page.

**Render method**:

The `render` method of the `LoginForm` component returns the following elements:

1. A heading element (`<h1>`) with the text "Login".
2. A form element with an `onSubmit` event handler set to the `handleSubmit` method from the parent `Form` component.
   - Inside the form, it renders the `username` and `password` input fields using the `renderInput` method from the `Form` component.
   - It renders a submit button using the `renderButton` method from the `Form` component with the label "Login".

**Example usage**:

To use the `LoginForm` component, import it and include it in the desired parent component:

```javascript
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <div className="App">
      {/* Additional components and content */}
      <LoginForm />
      {/* Additional components and content */}
    </div>
  );
}

export default App;
```

**Notes**:

- The `LoginForm` component is designed to work with a backend authentication API. Make sure the API endpoint URL in the `doSubmit` method matches the backend API endpoint.
- The `LoginForm` component uses the `axios` library for making HTTP requests. Ensure that `axios` is installed and imported in the component file.
- You may customize the styling of the form elements by modifying the JSX in the `render` method or applying custom CSS classes to the rendered elements.
### NavBar Component

The `NavBar` component is a functional React component that renders a responsive navigation bar with various links and menu items depending on the user's authentication status and permissions.

**File location**: `./components/NavBar.js`

**Usage**: This component is used to display a navigation bar at the top of the application, allowing users to navigate between different parts of the app.

**Code snippet**:

```javascript
import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user, permission, admin_status, user_name }) => {
  // ...
}

export default NavBar;
```

**Props**:

The `NavBar` component accepts the following props:

- `user`: An object representing the authenticated user, or `null` if the user is not authenticated.
- `permission`: A string representing the user's permission status (either "true" or "false").
- `admin_status`: A string representing the user's admin status (either "true" or "false").
- `user_name`: A string representing the user's name.

**Render method**:

The `NavBar` component returns a `nav` element with the following elements:

1. A `Link` element for the app's brand logo or name.
2. A button for toggling the menu on smaller screens.
3. A `div` element containing the navigation menu items.

Depending on the user's authentication status and permissions, the navigation menu items will be rendered conditionally using React Fragments.

**Example usage**:

To use the `NavBar` component, import it and include it in the desired parent component:

```javascript
import NavBar from "./components/NavBar";

function App() {
  // Fetch user, permission, admin_status, and user_name from the app's state or context
  return (
    <div className="App">
      <NavBar user={user} permission={permission} admin_status={admin_status} user_name={user_name} />
      {/* Additional components and content */}
    </div>
  );
}

export default App;
```

**Notes**:

- The `NavBar` component relies on the `react-router-dom` library for navigation. Ensure that the library is installed and imported in the component file.
- You may customize the styling of the navigation bar by modifying the JSX in the `render` method or applying custom CSS classes to the rendered elements.
- The component assumes that the user permissions and admin status are stored as strings with values "true" or "false". If your application stores these values differently, you may need to update the conditions in the component to match your data structure.
### RegisterForm Component

The `RegisterForm` component is a React class component that inherits from the `Form` component. It renders a registration form for users to input their information and create an account.

**File location**: `./components/RegisterForm.js`

**Usage**: This component is used to display a registration form in the application, allowing users to create an account.

**Code snippet**:

```javascript
import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./Form";
import axios from "axios";

class RegisterForm extends Form {
  // ...
}

export default RegisterForm;
```

**State**:

The `RegisterForm` component maintains a state with the following properties:

- `data`: An object containing the form field values, including `username`, `password`, `name`, `address`, and `teacher`.
- `errors`: An object containing any validation errors for the form fields.

**Schema**:

The `RegisterForm` component uses a Joi schema to validate the form fields:

- `username`: A required string that must be a valid email.
- `password`: A required string with a minimum length of 5 characters.
- `name`: A required string.
- `address`: A required string.
- `teacher`: A required boolean.

**Methods**:

The `RegisterForm` component defines several event handler methods for form fields, such as `onChangeUsername`, `onChangeTeacher`, `onChangePassword`, `onChangeName`, and `onChangeAddress`. These methods update the component state when the user interacts with the form fields.

The `doSubmit` method is called when the form is submitted. It sends a POST request to the server with the form data, and then redirects the user to the login page.

**Render method**:

The `RegisterForm` component's render method returns a JSX structure that includes an `h1` element, a `form` element, and various form inputs rendered using the inherited `renderInput` method.

**Example usage**:

To use the `RegisterForm` component, import it and include it in the desired parent component:

```javascript
import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <div className="App">
      <RegisterForm />
      {/* Additional components and content */}
    </div>
  );
}

export default App;
```

**Notes**:

- The `RegisterForm` component assumes that the server is running on `http://localhost:8080` and that the registration endpoint is available at `/components/register`. Update the URL in the `doSubmit` method if your server configuration is different.
- The component currently requires the user to input the `teacher` field value as either "true" or "false". You can replace this with a dropdown box to improve the user experience.

### Logout Component

The `Logout` component is a simple React class component that handles user logout functionality. When this component is mounted, it calls the `logout` function from the `authService` module to remove the user's token from the local storage, and then redirects the user to the login page.

**File location**: `./components/Logout.js`

**Usage**: This component is used to log out a user from the application, clearing their authentication data and redirecting them to the login page.

**Code snippet**:

```javascript
import React, { Component } from "react";
import auth from "../services/authService";

class Logout extends Component {
  // ...
}

export default Logout;
```

**Lifecycle Method**:

The `Logout` component uses the `componentDidMount` lifecycle method to perform the logout action when the component is mounted:

- It calls the `logout` function from the `authService` module to remove the user's token from the local storage.
- It then redirects the user to the login page by updating the `window.location`.

**Render method**:

The `Logout` component's render method returns `null` because it does not display any content. Its purpose is to handle the logout action and redirect the user to the login page.

**Example usage**:

To use the `Logout` component, import it and include it in the desired parent component, typically as part of a navigation menu or similar user interface element:

```javascript
import Logout from "./components/Logout";

function App() {
  return (
    <div className="App">
      {/* Navigation menu with a Logout link */}
      <nav>
        {/* Other navigation links */}
        <a href="/components/logout">Logout</a>
      </nav>

      {/* Additional components and content */}
    </div>
  );
}

export default App;
```

**Notes**:

- Ensure that the `authService` module is correctly configured and provides a `logout` function that removes the user's token from the local storage.
- The `Logout` component assumes that the login page is available at `/components/login`. Update the URL in the `componentDidMount` method if your application's routing is different.

### ProtectedRoute Component

The `ProtectedRoute` component is a higher-order component that wraps around React Router's `Route` component. It ensures that a user is authenticated before accessing certain routes in the application. If the user is not authenticated, they will be redirected to the login page.

**File location**: `./components/ProtectedRoute.js`

**Usage**: This component is used to protect specific routes in the application, requiring user authentication to access the content.

**Code snippet**:

```javascript
import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../services/authService";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  // ...
};

export default ProtectedRoute;
```

**Props**:

- `path`: The path of the route to be protected.
- `component`: The component to be rendered when the route is accessed, if the user is authenticated.
- `render`: An alternative render method to be used instead of a component, if the user is authenticated.
- `...rest`: Any additional props that should be passed to the underlying `Route` component.

**Render method**:

The `ProtectedRoute` component uses the `render` prop of the `Route` component to conditionally render the protected component or redirect the user to the login page.

- If the user is not authenticated (`!auth.getCurrentUser()`), it returns a `Redirect` component pointing to the `/login` page.
- If the user is authenticated, it renders the `Component` prop or calls the `render` prop with the route's `props`, depending on which one is provided.

**Example usage**:

To use the `ProtectedRoute` component, import it and replace the `Route` component with `ProtectedRoute` for the routes that require user authentication:

```javascript
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginComponent from "./components/Login";
import DashboardComponent from "./components/Dashboard";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginComponent} />
        <ProtectedRoute path="/dashboard" component={DashboardComponent} />
      </Switch>
    </Router>
  );
}

export default App;
```

**Notes**:

- Ensure that the `authService` module is correctly configured and provides a `getCurrentUser` function that returns the current user's information if they are authenticated, or `null`/`undefined` if they are not.
- The `ProtectedRoute` component assumes that the login page is available at `/login`. Update the `Redirect` component's `to` prop if your application's routing is different.

### ProtectedRoutePermission Component

The `ProtectedRoutePermission` component is a higher-order component that wraps around React Router's `Route` component. It ensures that a user is authenticated and has the required permission before accessing certain routes in the application. If the user does not meet these conditions, they will be redirected to the specified page (e.g., `/about`).

**File location**: `./components/ProtectedRoutePermission.js`

**Usage**: This component is used to protect specific routes in the application, requiring user authentication and specific permission to access the content.

**Code snippet**:

```javascript
import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../services/authService";

const ProtectedRoutePermission = ({ path, component: Component, render, ...rest }) => {
  // ...
};

export default ProtectedRoutePermission;
```

**Props**:

- `path`: The path of the route to be protected.
- `component`: The component to be rendered when the route is accessed, if the user is authenticated and has the required permission.
- `render`: An alternative render method to be used instead of a component, if the user is authenticated and has the required permission.
- `...rest`: Any additional props that should be passed to the underlying `Route` component.

**Render method**:

The `ProtectedRoutePermission` component uses the `render` prop of the `Route` component to conditionally render the protected component or redirect the user based on their authentication and permission status.

- If the user is authenticated (`auth.getCurrentUser()`) and has the required permission (`auth.getCurrentUserPermission() === "true"`), it returns a `Redirect` component pointing to the `/about` page.
- If the user is authenticated and has the required permission, it renders the `Component` prop or calls the `render` prop with the route's `props`, depending on which one is provided.

**Example usage**:

To use the `ProtectedRoutePermission` component, import it and replace the `Route` component with `ProtectedRoutePermission` for the routes that require user authentication and specific permission:

```javascript
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoutePermission from "./components/ProtectedRoutePermission";
import LoginComponent from "./components/Login";
import AdminDashboardComponent from "./components/AdminDashboard";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginComponent} />
        <ProtectedRoutePermission path="/admin-dashboard" component={AdminDashboardComponent} />
      </Switch>
    </Router>
  );
}

export default App;
```

**Notes**:

- Ensure that the `authService` module is correctly configured and provides a `getCurrentUser` function that returns the current user's information if they are authenticated, or `null`/`undefined` if they are not. Also, ensure that `getCurrentUserPermission` function returns the user's permission status as a string (`"true"` or `"false"`).
- The `ProtectedRoutePermission` component assumes that the redirection page is available at `/about`. Update the `Redirect` component's `to` prop if your application's routing is different.
### Dashboard Component

The `Dashboard` component displays a list of courses the user is enrolled in. Each course is presented as a row in a table with an action button allowing the user to view the course.

**File location**: `./components/Dashboard.js`

**Usage**: This component is typically used to show the user their enrolled courses on a dashboard page.

**Code snippet**:

```javascript
import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

// ...

export default class Dashboard extends Component {
  // ...
}
```

**Component State**:

- `courses`: An array of course objects, initially empty.

**Methods**:

- `componentDidMount()`: Fetches the list of courses from the server using the axios library and updates the component's state.
- `courseList()`: Maps over the `courses` array in the state and returns an array of `Course` components, each representing a course.
- `navigateToCourse(name_of_course, id)`: Handles navigation to the course page based on the provided course name and ID.
- `cascadeDeleteCourse(id)`: Handles the cascading deletion of a course with the provided ID. (Not used in the current implementation)

**Subcomponent: Course**

The `Course` subcomponent is a functional component that renders a single course as a table row.

**Props**:

- `props.course`: A course object containing information about the course.
- `props.navigateToCourse`: A function that handles navigation to the specific course page.

**Render method**:

The `Dashboard` component renders a table with a header row, and a body containing the list of courses returned by the `courseList()` method. If there are no courses in the list, it renders a paragraph stating that the user is not enrolled in any courses.

**Example usage**:

To use the `Dashboard` component, import it and include it as part of your application's routing, or as a child component of another component:

```javascript
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import LoginComponent from "./components/Login";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginComponent} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
```

**Notes**:

- Ensure that the server API is properly set up to handle the axios requests made by this component.
- The `navigateToCourse()` method has commented out code for handling navigation to different course pages based on the course name. You may need to update or uncomment the code depending on your application's requirements.
- The `cascadeDeleteCourse()` method is not used in the current implementation but is available for future use.
### CourseForm Component

The `CourseForm` component is used to assign an instructor to a course. It renders a form that allows users to input the course ID and submit it. Additionally, it displays a table of instructors with their names and IDs as reference.

**File location**: `./components/CourseForm.js`

**Usage**: This component is typically used in an admin interface to assign instructors to courses.

**Code snippet**:

```javascript
import React, { Component } from "react";
import Joi from "joi-browser";
import axios from "axios";
import Form from "../Form";

// ...

export default class CourseForm extends Form {
  // ...
}
```

**Component State**:

- `data`: An object with the property `course_id_` to store the input value.
- `courses_ref`: An array of course objects, initially empty, used as a reference.
- `errors`: An object to store validation errors.

**Methods**:

- `onChangeCourse_(e)`: Handles the change in the course ID input field value.
- `componentDidMount()`: Fetches the list of courses from the server using the axios library and updates the `courses_ref` state.
- `tableList()`: Maps over the `courses_ref` array in the state and returns an array of `Table` components, each representing an instructor.
- `doSubmit()`: Handles the form submission by sending a request to the server to assign an instructor to the course based on the input course ID.

**Subcomponent: Table**

The `Table` subcomponent is a functional component that renders a single instructor as a table row.

**Props**:

- `props.course`: A course object containing information about the instructor.

**Render method**:

The `CourseForm` component renders a form to input the course ID and a submit button. It also renders a table displaying the list of instructors as a reference.

**Example usage**:

To use the `CourseForm` component, import it and include it as part of your application's routing or as a child component of another component:

```javascript
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CourseForm from "./components/CourseForm";
import LoginComponent from "./components/Login";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginComponent} />
        <Route path="/assign-instructor" component={CourseForm} />
      </Switch>
    </Router>
  );
}

export default App;
```

**Notes**:

- Ensure that the server API is properly set up to handle the axios requests made by this component.
- This component is designed for administrative purposes. Be sure to protect access to this component using proper authentication and authorization techniques.
### CourseForm Component

The `CourseForm` component is responsible for allowing users to assign an instructor to a course. This component fetches a list of courses and instructors and allows users to select a course and an instructor to associate them with each other.

**File location**: `./components/CourseForm.js`

**Usage**: This component is typically used within an admin interface to manage the assignment of instructors to courses.

**Code snippet**:

```javascript
import React, { Component } from "react";
import Joi from "joi-browser";
import axios from "axios";

// ...

export default class CourseForm extends Component {
  // ...
}
```

**Component State**:

- `course_id`: The selected course ID.
- `teacher_id`: The selected teacher ID.
- `courses_ref_id`: Not used in the component.
- `courses`: An array of course IDs.
- `courses_ref`: An array of course objects containing course details.
- `table`: An array of teacher IDs.
- `target_grade`: Not used in the component.
- `errors`: An object to store validation errors (not used in the current implementation).

**Methods**:

- `componentDidMount()`: Fetches course and teacher data from the server using axios and updates the state accordingly.
- `tableList()`: Maps over the `courses_ref` array in the state and returns an array of `Table` components, each representing a course with its associated teacher.
- `onChangeCourse(e)`: Updates the state with the selected course ID.
- `onChangeTeacher(e)`: Updates the state with the selected teacher ID.
- `doSubmit(e)`: Sends the selected course and teacher IDs to the server to create the association, then updates the component state accordingly.

**Subcomponent: Table**

The `Table` subcomponent is a functional component that renders a single course with its associated teacher as a table row.

**Props**:

- `props.course`: A course object containing information about the course and its associated teacher.

**Render method**:

The `CourseForm` component renders a form that allows users to select a course and a teacher. It also displays a table of the current course-teacher associations.

**Example usage**:

To use the `CourseForm` component, import it and include it as part of your application's routing or as a child component of another component:

```javascript
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CourseForm from "./components/CourseForm";
import LoginComponent from "./components/Login";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginComponent} />
        <Route path="/assign-instructor" component={CourseForm} />
      </Switch>
    </Router>
  );
}

export default App;
```

**Notes**:

- Ensure that the server API is properly set up to handle the axios requests made by this component.
- This component is designed for administrative purposes. Be sure to protect access to this component using proper authentication and authorization techniques.
- The current implementation uses the `Joi` library for validation, but no validation logic is implemented. If needed, add validation logic based on the `schema` object provided in the component.
