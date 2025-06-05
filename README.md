# Hotel Booking App with AI Recommendation

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)

## Description

The Hotel Booking App with AI Recommendation is a full-stack application designed to help users book hotels with AI-driven recommendations. Users can browse hotels, book rooms, and interact with a chatbot for assistance.

## Features

- **AI-Driven Recommendations**: Personalized hotel recommendations based on user preferences.
- **Booking Management**: Book rooms and manage reservations.
- **User Authentication**: Sign up, log in, and profile management.
- **Admin Dashboard**: Provide admin functionalities to manage bookings, hotels, and users.
- **Responsive Design**: Optimized for both mobile and desktop platforms.

## Installation

1. **Client Application**

```sh
cd client
pnpm install
```

2. **Server Application**

```sh
cd server
npm install
```

## Usage

- **Running the Client**

```sh
cd client
pnpm dev
```

- **Running the Server**

```sh
cd server
npm run dev
```

### Environment Variables

Create a `.env` file in the `client` directory with the following variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Create a `.env` file in the `server` directory with the following variables:

```env
PORT=5000
```

## Technologies

- **Frontend**:
  - Next.js
  - TypeScript
  - React
  - Tailwind CSS

- **Backend**:
  - Node.js
  - Express.js
  - TypeScript

- **Database**:
  - MongoDB

## Folder Structure

```plaintext
├── .gitignore
├── client
│   ├── .gitignore
│   ├── app
│   │   ├── [file structure as provided]
│   ├── components
│   ├── hooks
│   ├── lib
│   ├── next-env.d.ts
│   ├── next.config.mjs
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── postcss.config.mjs
│   ├── public
│   ├── styles
│   ├── tailwind.config.ts
│   ├── tsconfig.json
├── server
│   ├── .env
│   ├── .gitignore
│   ├── nodemon.json
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   │   ├── configs
│   │   ├── controllers
│   │   ├── helpers
   │   ├── middleware
   │   ├── models
   │   ├── routes
   │   ├── services
   │   ├── types
   │   ├── utils
   │   ├── validators
├── tsconfig.json
```

## Authors

- **Kevin Diffey** (github: kevin-diffey)

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/SomethingCool`)
3. Commit your changes (`git commit -m 'Add some SomethingCool'`)
4. Push to the branch (`git push origin feature/SomethingCool`)
5. Open a Pull Request

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Express Documentation](https://expressjs.com/en/api.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

This README provides an overview of the project, instructions on how to install, use, and contribute to the Hotel Booking App with AI Recommendation. For more detailed information, refer to the documentation for each technology used in the project.