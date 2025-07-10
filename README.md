# 🛍️ E-Commerce Showcase

This project is a React-based e-commerce front-end application. It showcases various product carousels, collections, and customer stories, creating a visually rich and engaging user experience. The application is built with Vite for a fast and modern development workflow.

## 🚀 Features

- **🖼️ 3D Carousel:** An immersive 3D carousel for showcasing products or promotional content.
- **✨ Main Carousel:** A prominent carousel on the landing page for featured products or offers.
- **💅 Styled Components:** A well-organized styling system with CSS modules for each component.
- **JSON-driven Content:** Most of the dynamic content is fetched from local JSON files, making it easy to manage and update.

## 📂 Directory Structure

```
E:/public/
├───.env
├───.gitignore
├───eslint.config.js
├───index.html
├───package-lock.json
├───package.json
├───README.md
├───vite.config.js
├───.qodo/
├───.vscode/
│   └───settings.json
├───node_modules/... 
├───public/
│   ├───404_No_Products.svg
│   ├───video-shopping-banner.jpg
│   ├───vite copy.svg
│   ├───vite.svg
│   ├───Jsons/
│   │   ├───3dcarousel.json
│   │   ├───carousel.json
│   │   ├───curatedCollections.json
│   │   ├───customerStories.json
│   │   ├───DSC-Card.json
│   │   ├───Footer.json
│   │   ├───MostWishlisted.json
│   │   ├───navbar.json
│   │   ├───productStaticData.json
│   │   ├───StylesUnderBudget.json
│   │   └───submenu.json
│   ├───staticAssets/
│   │   ├───24HourDispatch.svg
│   │   ├───AppStore.svg
│   │   ├───CustomFitting.svg
│   │   ├───EasyReturn.svg
│   │   ├───InStoreExperience.svg
│   │   └───PlayStore .svg
│   └───WebSiteImages/
│       ├───CollectionCards/
│       ├───CuratedColletions/
│       ├───CustomerImages/
│       ├───Payments/
│       ├───Products/
│       └───Slider/
└───src/
    ├───main.jsx
    ├───assets/
    │   └───react.svg
    ├───components/
    │   ├───ApplinkSection.jsx
    │   ├───CardGrid.jsx
    │   ├───CustomerStoryCard.jsx
    │   ├───CustomerStoryCarousel.jsx
    │   ├───DispatchCard.jsx
    │   ├───DispatchCarousel.jsx
    │   ├───FeatureSection.jsx
    │   ├───Footer.jsx
    │   ├───MainCarousel.jsx
    │   ├───Navbar.jsx
    │   ├───ProductCard.jsx
    │   ├───ProductCarousel.jsx
    │   ├───ProductGrid.jsx
    │   ├───Submenu.jsx
    │   ├───ThreeDCarousel.jsx
    │   └───VideoShopping.jsx
    ├───hooks/
    ├───layout/
    │   └───Layout.jsx
    ├───pages/
    │   ├───App.jsx
    │   ├───CollectionPage.jsx
    │   ├───LandingPage.jsx
    │   └───ProductDetailsPage.jsx
    ├───routes/
    ├───services/
    ├───store/
    ├───styles/
    │   ├───App.css
    │   ├───AppLinkSection.css
    │   ├───CardGrid.css
    │   ├───CollectionPage.css
    │   ├───CustomerStoryCard.css
    │   ├───CustomerStoryCarousel.css
    │   ├───DispatchCard.css
    │   ├───DispatchCarousel.css
    │   ├───FeatureSection.css
    │   ├───Footer.css
    │   ├───index.css
    │   ├───MainCarousel.css
    │   ├───Navbar.css
    │   ├───ProductCard.css
    │   ├───ProductCarousel.css
    │   ├───ProductDetails.css
    │   ├───ProductGrid.css
    │   ├───ThreeDCarousel.css
    │   └───VideoShopping.css
    └───utils/
```

## 📦 JSON Data Examples

The application uses JSON files to populate its components. Here are a few examples:

### `3dcarousel.json`

This JSON provides data for the 3D carousel, including video sources and titles.

```json
[
    {
        "src": "https://www.w3schools.com/html/mov_bbb.mp4",
        "type": "video/mp4",
        "alt": "Big Buck Bunny 1",
        "title": "Big Buck Bunny Adventure"
    },
    {
        "src": "https://www.w3schools.com/html/movie.mp4",
        "type": "video/mp4",
        "alt": "The Movie",
        "title": "The Classic Movie"
    }
]
```

### `carousel.json`

This JSON file contains data for the main image carousel, with links for each slide.

```json
[
  {
    "image": "/WebSiteImages/Slider/SliderImages (1).jpg",
    "link": "https://example.com/festive-drop-25"
  },
  {
    "image": "/WebSiteImages/Slider/SliderImages (2).jpg",
    "link": "https://example.com/summer-collection"
  }
]
```

## 🛠️ Installation and Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:5173`.

## 📜 Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run lint`: Lints the codebase for potential errors.
- `npm run preview`: Serves the production build locally.