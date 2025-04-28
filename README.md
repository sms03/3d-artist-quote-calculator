# Ren3Der

A modern 3D-Design Pricing Calculator and creative services platform.

## Screenshots

<!-- Adjust width as needed (e.g., 500px) -->
<img src="public/screenshot-1.png" alt="Home Page" width="500"/>
<img src="public/screenshot-3.png" alt="Home Page (Dark-Mode)" width="500"/>
<img src="public/screenshot-2.png" alt="Pricing Calculator" width="500"/>

## Features
- 3D Still Frame Artwork pricing
- 3D Animations pricing
- VFX Projects and Video Editing services
- Interactive cursor trail effect
- Responsive design
- Beautiful gallery of renders with modal view and grouping by style
- Built with Vite, React, TypeScript, shadcn-ui, and Tailwind CSS

## Getting Started

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Docker

You can build and run this app in a Docker container:

```sh
# Build the Docker image
docker build -t ren3der-app .

# Run the container (default: http://localhost:8080)
docker run -p 8080:80 ren3der-app
```

## Technologies Used
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Project Structure

The project is organized as follows:
- `src/`: Contains the source code for the application
  - `components/`: Reusable UI components (e.g., buttons, modals, navigation)
  - `pages/`: Individual pages of the application (e.g., Home, My Work, Pricing)
  - `hooks/`: Custom React hooks
  - `utils/`: Utility functions
- `public/`: Static assets (e.g., images, icons, PDFs)
- `Dockerfile`: Configuration for building and running the app in a Docker container
- `tailwind.config.ts`: Tailwind CSS configuration
- `vite.config.ts`: Vite configuration

## Gallery Features
- Displays a beautiful, responsive gallery of renders
- Supports all image formats (e.g., jpg, png, webp)
- Interactive modal for viewing images in full size
- Groups images by style for easy navigation

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.