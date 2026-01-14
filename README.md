# Innov8 Barber Shop Management System

![banner](/Documentation/Screenshot%202025-04-09%20153009.png)

## Project Overview

The Innov8 Barber Shop Management System is a web-based platform designed to streamline daily operations for a local barbershop by centralizing appointment scheduling, customer management, and business workflows. The system reduces scheduling conflicts, improves operational visibility, and enhances customer experience through structured data management and role-based workflows.

This project emphasized real-world requirements gathering, iterative system design, and cross-functional collaboration, simulating enterprise software delivery practices.

Designed and delivered a centralized full-stack management platform for local service-based businesses, addressing inefficiencies caused by manual scheduling and customer tracking. The system digitizes appointment scheduling and client records, enforces structured workflows to reduce operational errors, and provides a scalable foundation for future feature expansion. 

Through iterative refinement based on stakeholder feedback, I coordinated requirements gathering, translated business needs into technical and architectural artifacts, and ensured alignment between design, implementation, and operational goals, delivering a reliable, user-focused solution that streamlined operations and enhanced business efficiency.

## Team Members

- Emad Abbasi - Project Manager
- Trinity Klein - Associate Project Manager
- Anthony Perla - Product Owner
- Isaiah Morales - Lead Developer
- Jeremiah Jarina - Front-end Developer
- Sarah Yao - Back-end Developer
- Moshood Elias - Solution Architect

## Tech Stack

Frontend
- Vue.js: component-based UI for the public website and private management dashboard

Backend
- Node.js
- Express.js: RESTful API for client, service, and event management

Database
- MySQL: relational data modeling for customers, appointments, and services
- AWS RDS: managed database hosting with automated backups and availability

Deployment & Infrastructure
- AWS: cloud hosting and managed services for application infrastructure

Development Practices
- Full-stack separation of concerns (frontend, API, data layer)
- Environment-based configuration for local and cloud deployments

## Documentation & Deliverables 

- Project management artifacts (scope, planning, and execution
documents)
- Technical documentation outlining system design and implementation
- Demo video showcasing platform functionality
- Final presentation deck summarizing outcomes and architecture

All materials are organized within the repository’s documentation folders.

## Architecture & Design Diagrams

### Scope Diagram

Defines functional boundaries for scheduling, client management,
and operations to prevent feature creep and clarify ownership.

![diagram](/Documentation/Project%20Management%20Documents/Scope/Innov8-Team3-SP2025-CIS4375-Scope%20Diagram%20PNG.png)

### Future Architecture Diagram

Illustrates the planned evolution toward a scalable, modular
system supporting additional services and integrations.

![diagram](/Documentation/Technical%20Documents/Innov8-Team3-SP2025-CIS4375-AWS%20Barbershop%20Deployment.png)

### Entity Relationship Diagram (ERD)

Models core business entities and relationships to ensure data
consistency, integrity, and efficient querying.

![diagram](/Documentation/Technical%20Documents/Innov8-Team3-SP2025-CIS4375-BarberShopERD%20Final.png)

### Initial Swim Lanes Diagram

Captures early workflow assumptions across roles to identify
bottlenecks and align team responsibilities.

![diagram](/Documentation/Technical%20Documents/Innov8-Team3-SP2025-CIS4375-InitialSwimLane.JPG)

### Final Swim Lanes

Refined workflows incorporating feedback and implementation
constraints, reflecting optimized operational processes.

![diagram](/Documentation/Technical%20Documents/Innov8-Team3-SP2025-CIS4375-FinalSwimLane.JPG)

## Lessons Learned
- Designing for real users changes priorities
- Building for a real business owner highlighted the importance of usability, clear workflows, and operational simplicity over purely technical elegance.
- Data modeling is foundational
Early schema decisions in MySQL directly impacted API design, query performance, and future extensibility, reinforcing the value of upfront database planning.
- Frontend–backend contracts matter
Clearly defined API interfaces reduced integration friction and improved parallel development across team roles.
- Cloud-managed services reduce operational overhead
Using AWS RDS eliminated the need to manage database infrastructure manually, allowing the team to focus on application logic and reliability.
- Iterative refinement beats perfect upfront design
Comparing initial and final swim lane diagrams revealed how feedback-driven iteration leads to more efficient and realistic system workflows.

## Repo Structure  

```text
├── Backend/                            # Server-side logic and API
│   └── routes/                         # API endpoint definitions
│       ├── appointments.js             # Routes for booking and managing appointments
│       ├── barbers.js                  # Routes for barber profiles and schedules
│       ├── customers.js                # Routes for customer profile management
│       ├── login.js                    # Authentication logic and token generation
│       ├── payments.js                 # Integration with payment processors
│       ├── services.js                 # Routes for haircut/styling service details
│       └── users.js                    # General user management (Admin/Staff)
│   ├── db.js                           # Database connection configuration (e.g., Sequelize/Mongoose)
│   ├── index.js                        # Entry point for the Express server
│   ├── package-lock.json               # Locked versions of backend dependencies
│   ├── package.json                    # Backend metadata and dependency list
│   └── README.md                       # Documentation for backend setup
│
├── Documentation/                      # Project governance and design files
│   └── Project Management Documents/       
│       └── Communications/   
│          ├── Innov8-Team3-SP2025-CIS4375-Communication Management Plan.pdf        # Strategy for team and stakeholder communication
│          ├── Innov8-Team3-SP2025-CIS4375-Communication Management Plan.xlsx       # Matrix for communication frequency/methods
│          ├── Innov8-Team3-SP2025-CIS4375-Scope Diagram.vsdx               # Visual representation of project boundaries
│          ├── Innov8-Team3-SP2025-CIS4375-Team Roles.pdf                   # Definition of member responsibilities
│          └── Innov8-Team3-SP2025-CIS4375-Team Roster.xlsx                 # Contact list of team members
│       └── Integration/
│              └── Status Reports/                                          # Weekly progress updates (Feb through April)
|                   ├── Innov8-Team3-SP2025-CIS4375-Status Report April7 to 11.docx
|                   ├── Innov8-Team3-SP2025-CIS4375-Status Report Feb17 to 21.docx
|                   ├── Innov8-Team3-SP2025-CIS4375-Status Report Feb24 to 28.docx
|                   ├── Innov8-Team3-SP2025-CIS4375-Status Report March3 to 7.docx
|                   ├── Innov8-Team3-SP2025-CIS4375-Status Report March17 to 21.docx
|                   ├── Innov8-Team3-SP2025-CIS4375-Status Report March24 to 28.docx
|                   └── Innov8-Team3-SP2025-CIS4375-Status Report March31 to April4.docx
│          ├── Innov8-Team3-SP2025-CIS4375-Log Files.xlsx                   # Tracking for issues, decisions, or changes
│          └── Innov8-Team3-SP2025-CIS4375-Project Charter.pdf              # Official document authorizing the project
│       └── Quality, Resource and Cost/   
│          ├── Innov8-Team3-SP2025-CIS4375-RACI Matrix.xlsx                 # Responsibility Assignment Matrix
│          └── Innov8-Team3-SP2025-CIS4375-Testing Matrix.xlsx              # Quality assurance test cases and results
│       └── Risk/   
│          ├── Innov8-Team3-SP2025-CIS4375-Risk Management Matrix.xlsx      # Identification and impact of potential risks    
│          └── Innov8-Team3-SP2025-CIS4375-RiskLog.xlsx                     # Ongoing tracking of active project risks
│       └── Scope/   
│          ├── Innov8-Team3-SP2025-CIS4375-Requirements Traceability Matrix.xlsx    # Maps requirements to their implementation/test
│          ├── Innov8-Team3-SP2025-CIS4375-Scope Diagram PNG.png                    # Image version of the scope diagram
│          ├── Innov8-Team3-SP2025-CIS4375-Scope Diagram.vsdx                       # Editable Visio file for scope
│          ├── Innov8-Team3-SP2025-CIS4375-WBS Dictionary.pdf                       # Detailed descriptions of WBS tasks
│          ├── Innov8-Team3-SP2025-CIS4375-WBS.pdf                                  # Visual Work Breakdown Structure hierarchy
│          └── Innov8-Team3-SP2025-CIS4375-Work Breakdown Structure (WBS).xlsx      # Spreadsheet version of the WBS
│   └── Technical Documents/                                                
│       ├── Innov8-Team3-SP2025-CIS4375-AWS Barbershop Deployment.png       # Cloud infrastructure architecture diagram
│       ├── Innov8-Team3-SP2025-CIS4375-BarberShopERD Final.png             # Database Entity Relationship Diagram
│       ├── Innov8-Team3-SP2025-CIS4375-Data_Dictionary.xlsx                # Detailed database schema and field definitions
│       ├── Innov8-Team3-SP2025-CIS4375-FinalSwimLane.jpeg                  # Process flow diagram (Final version)
│       ├── Innov8-Team3-SP2025-CIS4375-GitHub Branches.png                 # Visualization of the version control strategy
│       └── Innov8-Team3-SP2025-CIS4375-InitialSwimLane.png                 # Original process flow design
│   ├── Desktop 2025.03.24 - 16.27.52.01.mp4                        # Video demonstration of the working app
│   ├── Innov8-Team3-SP2025-CIS4375-Presentation.pdf                # Slide deck for the final project delivery
│   └── Screenshot 2025-04-09 153009.png                            # Short visual preview of the application UI
│
├── frontend/
│   └── public/                         
│       └── vite.svg                       # Client-side application (Vue.js/Vite)
│   └── src/                         
│       └── api/ 
│           └── api.js                     # Axios/Fetch configuration for backend calls
│       └── assets/                        # Static images, brand assets, and reviews
│           ├── barberlogo.png
│           ├── location.jpg
│           ├── mobile.jpg
│           ├── photo1.jpg
│           ├── photo2.jpg
│           ├── photo3.jpg
│           ├── photo4.jpg
│           ├── photo5.jpg
│           ├── photo6.jpg
│           ├── project.jpg
│           ├── review1.jpg
│           ├── review2.jpg
│           ├── review3.jpg
│           ├── top_picture.jpg
│           └── vue.svg
│       └── components/                    # Reusable UI widgets
│               └── charts/
│                   ├── BarChart.vue       # Data visualization for sales/appointments
│                   └── PieChart.vue       # Data visualization for service popularity
│           ├── backtotop.vue              # Scroll-to-top navigation utility
│           ├── footer.vue                 # Global page footer component
│           ├── loadingspinner.vue         # Visual feedback for data fetching
│           └── navbar.vue                 # Primary navigation menu
│       └── router/
│           └── index.js                   # Client-side route definitions (Vue Router)
│       └── views/                         # Main page-level components
│               └── portal/                # Authenticated/Admin dashboard views
│                   ├── accountsetting.vue # User profile and password management
│                   ├── barberemployee.vue # Admin view to manage staff
│                   ├── barberservice.vue  # Management of services offered
│                   ├── booking.vue        # Administrative appointment calendar
│                   ├── customers.vue      # Customer CRM list view
│                   ├── dashboard.vue      # Analytics overview for the business
│                   ├── home.vue           # Landing page after logging into portal
│                   ├── login.vue          # Internal staff login page
│                   └── users.vue          # System user/permission management
│               └── webpage/               # Public-facing marketing pages
│                   ├── appointment.vue    # Public booking interface for clients
│                   ├── czunigapage.vue    # Custom/Specialty landing page
│                   ├── gallery.vue        # Portfolio of barber work
│                   ├── location.vue       # Shop address and contact info page
│                   ├── review.vue         # Customer feedback and ratings page
│                   ├── services.vue       # Public price list and service menu
│                   └── welcome.vue        # Public landing/hero page
│       ├── App.vue                     # Root component of the Vue application
│       ├── main.js                     # Main JavaScript entry point for Vue
│       ├── README.md                   # Documentation for frontend development
│       └── style.css                   # Global CSS styles
│   ├── .gitignore                      # Files to exclude from Git (node_modules, etc)
│   ├── index.html                      # Main HTML template for the SPA
│   ├── netlify.toml                    # Deployment configuration for Netlify hosting
│   ├── package-lock.json               # Locked versions of frontend dependencies
│   ├── package.json                    # Frontend project metadata and scripts
│   ├── postcss.config.js               # Configuration for CSS processing
│   ├── README.md                       # Overview of the frontend repository
│   └── vite.config.js                  # Build tool configuration for Vite
│
│   ├── .gitignore                      # Root-level Git exclusion file
│   └── README.md                       # Top-level project overview and instructions
``` 

## Repo Usage

To clone the repository locally:

```bash
gh repo clone https://github.com/tlklein/CIS-4375-Team3-CapstoneProject
```

Refer to the frontend and backend directories for environment setup and execution instructions.
