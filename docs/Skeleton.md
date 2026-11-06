You are a Senior React Frontend Architect and UI Engineer.
I am building my academic Software Development II project called Travel Planner.travel planner is making only for bangladesh Popular visited place..
Your task is to generate a complete, production-quality frontend project skeleton using modern React best practices.
Tech Stack
Use ONLY these technologies:
•	React (Vite) 
•	React Router DOM 
•	Tailwind CSS v4 
•	DaisyUI 
•	React Context API 
Do NOT use:
•	Backend 
•	PHP 
•	MySQL 
•	Express 
•	Firebase 
•	Authentication 
•	API Integration 
•	Redux 
•	TypeScript 
Everything must use local mock JSON data.

IMPORTANT
This project already exists.
Do NOT recreate the project from scratch.
Keep the existing Vite configuration.
Extend and reorganize the existing project professionally.
Current structure:
src/
│
├── assets/
├── components/
│   ├── Hero.jsx
│   ├── Navbar.jsx
│   ├── ThemeSwitcher.jsx
│   └── Destinations.jsx
│
├── pages/
│
├── App.jsx
├── App.css
├── index.css
└── main.jsx
Reorganize this into a scalable architecture.
________________________________________
Required Folder Structure
src/

assets/
    images/
    icons/

components/

    common/
        Navbar.jsx
        Footer.jsx
        ThemeSwitcher.jsx
        Button.jsx
        EmptyState.jsx

    home/
        Hero.jsx
        Features.jsx
        PopularDestinations.jsx
        CTA.jsx

    destination/
        DestinationCard.jsx
        DestinationGrid.jsx
        FilterBar.jsx

    planner/
        TripForm.jsx
        BudgetCard.jsx
        TripSummary.jsx

context/
    TripContext.jsx

data/
    destinations.json

layouts/
    MainLayout.jsx

pages/
    Home.jsx
    Destination.jsx
    TripPlanner.jsx
    AboutUs.jsx
    NotFound.jsx

routes/
    Router.jsx

utils/
    helpers.js

App.jsx
main.jsx
index.css
________________________________________
Pages
Home
Route:
/
Sections
•	Hero 
•	Popular Destinations 
•	Why Choose Us 
•	How It Works 
•	CTA 
•	Footer 
________________________________________
Destination
Route
/destination
Sections
•	Search 
•	Filter 
•	Destination Grid 
Each destination card shows
•	Image 
•	Name 
•	Country 
•	Category 
•	Budget 
•	Rating 
•	View Details Button 
________________________________________
Trip Planner
Route
/tripplanner
Sections

•	Destination Select 
•	Transportation 
•	Transportation Budget
•	Accommodation 
•	Accommodation Budget
•	Trip Summary 
Use Context API only.
________________________________________
About Us
Route
/aboutus
Sections
•	About Project 
•	Mission 
•	Vision 
•	Technologies 
•	Developer 
________________________________________
Not Found
Modern 404 page.
________________________________________
Navbar
Desktop
Top Navigation
Links
•	Home 
•	Destination 
•	Trip Planner 
•	About Us 
Include
•	Logo 
•	Theme Switcher 
Mobile
Responsive DaisyUI menu.
________________________________________
Footer
Include
•	Logo 
•	Quick Links 
•	Social Links 
•	Copyright 
________________________________________
Data
Create
src/data/destinations.json
Generate at least 15 realistic travel destinations.
Each object:
{
  "id":1,
  "name":"",
  "country":"",
  "category":"",
  "budget":0,
  "rating":0,
  "image":"",
  "description":""
}
________________________________________
Context API
Create
TripContext.jsx
Store
•	selectedDestination 
•	transport 
•	accommodation 
•	show budget
Create
•	Provider 
•	Custom Hook 
________________________________________
Components
Reusable Components
Common
•	Navbar 
•	Footer 
•	Button 
•	EmptyState 
•	ThemeSwitcher 
Home
•	Hero 
•	Features 
•	PopularDestinations 
•	CTA 
Destination
•	DestinationCard 
•	DestinationGrid 
•	FilterBar 
Planner
•	TripForm 
•	BudgetCard 
•	TripSummary 
________________________________________
Routing
Use React Router DOM.
Create MainLayout.
Routes
/

/destination

/tripplanner

/aboutus

*
________________________________________
UI
Requirements
•	Mobile First 
•	Responsive 
•	DaisyUI Components 
•	Tailwind Utilities 
•	Professional Spacing 
•	Modern Cards 
•	Clean Typography 
•	Accessible Buttons 
•	Loading Skeletons 
________________________________________
Theme
Travel-inspired theme
Primary: Sky Blue
Secondary: Orange
Accent: Emerald
Neutral: White
________________________________________
Coding Standards
Follow
•	Clean Architecture 
•	SOLID Principles where applicable 
•	Reusable Components 
•	Proper Naming Convention 
•	Modular Folder Structure 
•	Clean JSX 
•	No duplicate code 
________________________________________
Output Rules
Very Important:
❌ Do NOT generate the entire project in one response.
Generate the project step by step.
Each response should contain ONLY one logical step.
For every step provide:
•	Folder 
•	File Name 
•	Complete Code 
•	Short Explanation 
Wait for my confirmation before moving to the next step.
Ensure every generated file works correctly with the previous files.

Never skip files. Never use placeholders like "same as previous". Always provide complete code for every file. Do not summarize code. Every file must be fully implemented and immediately runnable.