# Vue Starter

🌟 Welcome to Vue starter!

Explore the world of modern web development with our feature-packed Vue starter project, using cutting-edge technologies like Vue, Vuetify, Pinia, and Vite, it's designed to make your front-end development journey a breeze.

<img src="./.github/cover.gif" />

## Key Features 🚀

- Real-Time Chat System: Engage users with a powerful and feature-rich real-time chat system supports chat text and voice messages and typing indicator etc...
- Real-Time Notifications: The starter has a great real-time notifications system.
- Widgets: A set of beautiful charts using ChartJs (more coming soon)
- Access Control List (ACL): Leveraging Laravel's Spatie Permissions, we ensure smooth control on both the client and server sides.
- Validation Handling: Handle client-side and server-side validations effortlessly with zero-configuration.
- File Uploads Made Easy: Effortlessly upload files with simplified functionality.
- Theme Support: Enjoy light and dark theme options for a personalized user experience (in development).
- Multiple Layouts: Create your custom layouts to suit your application's needs.
- Multilingual-Ready: The starter has a multilingual-ready support.
- Complete Authentication System: Ensure security with a comprehensive authentication system.
- Flexible Middleware Functionality: Flexible middleware functionlaity for client-side using custom callbacks with roles and permissions.
- Code Quality: Maintain consistency with standard ESLint and Prettier configurations.
- Environment Variables: Easily manage different environments using .env and .env.production.

⚡ And More to Come!

## Installation

Clone the repository using the following command:

```bash
git clone git@github.com:themustafaomar/vue-starter.git
```

Install the dependencies and run the project using:

```bash
npm i && npm run dev
```

## Broadcasting Directory

This project has a server-side part please take a look at the following section

As for broadcasting we're not using laravel webosckets instead, we're using soketi to install soketi please follow the instructions below:

soketi may be easily installed via the NPM CLI:

```bash
npm install -g @soketi/soketi
```

Now we can run the websockets server, at your client-side root directory run the following command:

```bash
soketi start --config ./broadcasting/soketi.json
```

For more information about soketi please visit the offical website: https://soketi.app/

**Notice** that you can still using the laravel websockets but you will need to install it by your own on the server-side project.

## Server Side

For the server-side source code please visit: https://github.com/themustafaomar/vue-starter-server

## Licence

Vue starter project licensed under MIT.
