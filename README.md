# MIHAI-LISTOV-IS24-full-stack-competition-req97073

# IMB App

## Demo:

https://user-images.githubusercontent.com/7937856/229029391-1f5b9911-d3a9-4779-b716-a8d4f932f224.mov


## Getting started
1. Start the backend service by running the following command:

```
(from project root)
cd service && npm install && npm run start
```

2. Start the frontend React app by running the following:

```
(from project root)
cd app && npm install && npm start
```

3. Browse to `http://localhost:3001`

If the both the frontend and backend services are running properly you should see the following:

<img width="805" alt="Screen Shot 2023-03-30 at 9 48 24 PM" src="https://user-images.githubusercontent.com/7937856/229027274-a332640d-62f5-4230-b5b5-7558baf11cc4.png">


## Swagger Docs

Please browse to `http://localhost:3000/api/api-docs`

You can click "Try it out" to play with the API features.

## Troubleshooting

If there's any issues you may see the following error messages:

<img width="1027" alt="Screen Shot 2023-03-30 at 9 48 35 PM" src="https://user-images.githubusercontent.com/7937856/229027312-9b97e9b2-5932-4db0-9001-0d5bc73288f7.png">

Please check the status of both the frontend `app` service and the backend `service`. Ensure they are running without any errors.

## Design Decisions
Full disclosure, I spent a day on the backend, and then had to rush the frontend in half a day due to limited time.

### Backend Design
1. Opted for Typescript as it's a safer choice for a backend language. Enforcing type will be more secure and nicer to work with from a developer perspective especially on backend services where understanding what type of data you are handling is very important. As well as restricting types of input that may make it through the application code.
2. Opted to use IoC (Inversion of Control) and DI (Dependency Injection) principles for structuring the application. This leverages Awilix for managing the container and injecting required dependencies into it. The reason for this is to **make testing easier** in the future, you can easily inject test databases, services, or business logic. As well it helps to create separation of concern, so that each layer is only concerned with the logic that it is supposed to handle. This avoids tightly coupled layers and thay may leave you in 

Follows clear structure
1. Controller layer - where routing occurs, API endpoints
2. Service layer - business logic, calling on repository for DB access
3. Repository layer - where we interact with the database models, designed in such a way that it would be very easy to integrate with in ORM such as TypeORM, and use a real database
4. Schema/model layer - simply defined models

What I would do next to build it out
1. Integrate a real DB, ORM
2. Implement a testing framework, jest, supertest, etc.
3. Add logging and traceability for debugging purposes
4. Improve production-readiness

### Frontend Design
1. Simple Create React App, start from scratch to avoid bloating the app
2. Use just what I needed for this project: rather than opt for bootstrap or the like, I chose Material-UI as it is a robust library for functional, feature-rich UI components.
3. MUI-Datatables, something I have worked with before. Included searching, filtering, sorting already. No need to reinvent the wheel here.

What I would do next
1. Seperate out helper functions more, to clean it up a bit.
2. More snackbar notifications on user actions such as saving/editing
3. Use Typescript, just like the backend. More readable, useable, and secure.
4. Implement a store, such as redux, if managing state across components is neccesary.

## Why are there no comments in the projects?
I believe coding for readability, reuseability, and longevity is very important. In all of my developer experiences during my 6 years, in my experience, comments do no one good. Detailed documentation or cleaning up the code, and improving it's readability or breaking it up is the way to go. Comments often lead to more confusion.
