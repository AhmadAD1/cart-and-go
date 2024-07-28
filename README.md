<p align="center">
  <img src="./app/public/logo.png" alt="Cart & Go Logo" width="200" height="200">
</p>
# Cart & Go

**Cart & Go** is a comprehensive E-commerce application that offers a seamless shopping experience for users and an efficient management system for administrators.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Admin Dashboard](#admin-dashboard)
- [Landing Page](#landing-page)
- [Shopping Cart and Checkout](#shopping-cart-and-checkout)
- [User Reviews](#user-reviews)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Admin Dashboard**: Manage users, products, orders, and newsletters.
- **Landing Page**: Describe the website services and display products and categories.
- **Shopping Cart**: Add products to the cart and proceed to checkout using Stripe for secure payments.
- **User Reviews**: Users can review products to share their feedback.

## Installation

### Prerequisites

- Node.js
- MongoDB
- Stripe account for payment processing

### Clone the Repository

````bash
git clone https://github.com/Mohammedramadan99/ecommerce-fullStack
cd cart-and-go


### Install Dependencies
```bash
npm install
````

### Set Up Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
MONGO_URI=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
JWT_SECRET=your_jwt_secret_key
```

### Run the Application

```bash
npm start
```

## Usage

### Admin Dashboard

The Admin Dashboard provides functionalities to manage:

- **Users**: View, add, edit, and delete users.
- **Products**: View, add, edit, and delete products.
- **Orders**: View, update, and manage orders.
- **Newsletter**: Manage newsletter subscriptions and send out emails.

### Landing Page

The landing page serves as the entry point to the application, providing:

- A description of the website's services.
- Display of featured products and categories.
- A user-friendly interface for navigation.

### Shopping Cart and Checkout

Users can:

- Browse products and add them to their cart.
- Proceed to checkout and make secure payments using Stripe.
- View order history and status in their user profile.

### User Reviews

Users can:

- Review products they have purchased.
- Read reviews from other users to make informed purchasing decisions.

## Technologies Used

- **Frontend**: React, Material-UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Payment Processing**: Stripe
- **Authentication**: JWT

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License.

## Contact

For any questions or comments, please reach out to:

- Name: Ahmad Adawi
- Email: adawiahmad89@gmail.com
- GitHub:https://github.com/AhmadAD1
