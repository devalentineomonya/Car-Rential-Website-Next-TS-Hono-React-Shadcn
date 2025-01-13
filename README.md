# Car Rental Website

Welcome to the **Car Rental Website** repository! This project is a fully-featured car rental application that provides seamless online booking, ride delivery, and car hiring services. The platform features separate user and admin panels and integrates modern web technologies for a smooth experience.

## Features

### Core Features
- **Online Car Rental and Booking:** Avoid long lines by booking your preferred car online.
- **Delivery Services:** Get your booked car delivered to your location.
- **Ride Booking and Hiring:** Book rides for your trips or hire cars for a specified duration.

### Admin Panel
- Manage cars (CRUD operations).
- Track bookings and payments.
- Monitor user activity and system performance.

### User Panel
- Browse available cars.
- Book, hire, and request delivery services.
- Track and manage bookings and payments.

### Payment Integration
- **[Paystack](https://paystack.com):** Secure payment gateway for processing transactions.

### Database
- **PostgreSQL on Neon:** A modern, high-performance database hosted on Neon for efficient data management.

## Technologies Used

### Frontend
- **Next.js**: For server-side rendering and building a fast, scalable frontend.
- **React**: For creating reusable UI components.
- **ShadCN**: For stylish, customizable design components.

### Backend
- **Hono**: A lightweight, fast web framework for handling API requests.

### Database
- **PostgreSQL**: For relational data storage.
- **Neon**: A cloud-native PostgreSQL platform for enhanced performance and scalability.

### Payment
- **Paystack**: To handle secure and reliable payment processing.

## Installation and Setup

Follow these steps to set up the project locally:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/devalentineomonya/Car-Rential-Website-Next-TS-Hono-React-Shadcn.git
   cd Car-Rential-Website-Next-TS-Hono-React-Shadcn
   ```

2. **Install Dependencies:**
   Ensure you have Node.js and npm or Yarn installed, then run:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URL=your_neon_database_url
   PAYSTACK_SECRET_KEY=your_paystack_secret_key
   NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The application will be available at `http://localhost:3000`.

5. **Build for Production:**
   ```bash
   npm run build
   ```

## Folder Structure

```
.
├── components       # Reusable React components
├── pages            # Next.js pages
├── public           # Static assets
├── server           # Hono backend server
├── styles           # Global and component-specific styles
├── utils            # Helper functions and utilities
├── prisma           # Prisma schema for PostgreSQL
└── .env             # Environment variables
```

## Deployment

1. Deploy the frontend on platforms like [Vercel](https://vercel.com).
2. Deploy the backend on your preferred hosting provider.
3. Use Neon to host the PostgreSQL database.

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- [Paystack](https://paystack.com)
- [Neon](https://neon.tech)
- [Next.js](https://nextjs.org)
- [Hono](https://hono.dev)
- [ShadCN](https://shadcn.dev)
- [PostgreSQL](https://www.postgresql.org)

## Author

Developed by [Valentine Omonya](https://github.com/devalentineomonya).
