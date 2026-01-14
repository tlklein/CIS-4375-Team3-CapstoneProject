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
├── Backend/
│   └── routes/                         
│       ├── appointments.js
│       ├── barbers.js
│       ├── customers.js
│       ├── login.js 
│       ├── payments.js
│       ├── services.js 
│       └── users.js
│   ├── db.js
│   ├── index.js
│   ├── package-lock.json
│   ├── package.json
│   └── README.md
├── Documentation/
│   └── Project Management Documents/ 
│       └── Communications/   
│          ├── Innov8-Team3-SP2025-CIS4375-Communication Management Plan.pdf
│          ├── Innov8-Team3-SP2025-CIS4375-Communication Management Plan.xlsx
│          ├── Innov8-Team3-SP2025-CIS4375-Scope Diagram.vsdx
│          ├── Innov8-Team3-SP2025-CIS4375-Team Roles.pdf            
│          └── Innov8-Team3-SP2025-CIS4375-Team Roster.xlsx
│       └── Integration/
│              └── Status Reports/
|                   ├── Innov8-Team3-SP2025-CIS4375-Status Report April7 to 11.docx
|                   ├── Innov8-Team3-SP2025-CIS4375-Status Report Feb17 to 21.docx
|                   ├── Innov8-Team3-SP2025-CIS4375-Status Report Feb24 to 28.docx
|                   ├── Innov8-Team3-SP2025-CIS4375-Status Report March3 to 7.docx
|                   ├── Innov8-Team3-SP2025-CIS4375-Status Report March17 to 21.docx
|                   ├── Innov8-Team3-SP2025-CIS4375-Status Report March24 to 28.docx
|                   └── Innov8-Team3-SP2025-CIS4375-Status Report March31 to April4.docx
│          ├── Innov8-Team3-SP2025-CIS4375-Log Files.xlsx      
│          └── Innov8-Team3-SP2025-CIS4375-Project Charter.pdf
│       └── Quality, Resource and Cost/   
│          ├── Innov8-Team3-SP2025-CIS4375-RACI Matrix.xlsx    
│          └── Innov8-Team3-SP2025-CIS4375-Testing Matrix.xlsx
│       └── Risk/   
│          ├── Innov8-Team3-SP2025-CIS4375-Risk Management Matrix.xlsx             
│          └── Innov8-Team3-SP2025-CIS4375-RiskLog.xlsx
│       └── Scope/   
│          ├── Innov8-Team3-SP2025-CIS4375-Requirements Traceability Matrix.xlsx
│          ├── Innov8-Team3-SP2025-CIS4375-Scope Diagram PNG.png
│          ├── Innov8-Team3-SP2025-CIS4375-Scope Diagram.vsdx
│          ├── Innov8-Team3-SP2025-CIS4375-WBS Dictionary.pdf
│          ├── Innov8-Team3-SP2025-CIS4375-WBS.pdf               
│          └── Innov8-Team3-SP2025-CIS4375-Work Breakdown Structure (WBS).xlsx
│   └── Technical Documents/                         
│       ├── Innov8-Team3-SP2025-CIS4375-AWS Barbershop Deployment.png
│       ├── Innov8-Team3-SP2025-CIS4375-BarberShopERD Final.png
│       ├── Innov8-Team3-SP2025-CIS4375-Data_Dictionary.xlsx
│       ├── Innov8-Team3-SP2025-CIS4375-FinalSwimLane.jpeg
│       ├── Innov8-Team3-SP2025-CIS4375-GitHub Branches.png
│       └── Innov8-Team3-SP2025-CIS4375-InitialSwimLane.png
│   ├── Desktop 2025.03.24 - 16.27.52.01.mp4            
│   ├── Innov8-Team3-SP2025-CIS4375-Presentation.pdf   
│   └── Screenshot 2025-04-09 153009.png   
├── frontend/
│   └── public/                         
│       └── vite.svg
│   └── src/                         
│       └── api/ 
│           └── api.js
│       └── assets/
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
│       └── components/
│               └── charts/
│                   └── BarChart.vue
│                   └── PieChart.vue
│           ├── backtotop.vue
│           ├── footer.vue
│           ├── loadingspinner.vue
│           └── navbar.vue
│       └── router/
│           └── index.js
│       └── views/
│               └── portal/
│                   ├── accountsetting.vue
│                   ├── barberemployee.vue
│                   ├── barberservice.vue
│                   ├── booking.vue
│                   ├── customers.vue
│                   ├── dashboard.vue
│                   ├── home.vue
│                   ├── login.vue
│                   └── users.vue
│               └── webpage/
│                   ├── appointment.vue
│                   ├── czunigapage.vue
│                   ├── gallery.vue
│                   ├── location.vue
│                   ├── review.vue
│                   ├── services.vue
│                   └── welcome.vue  
│       └── App.vue
│       └── main.js
│       └── README.md
│       └── style.css
│   ├── .gitignore
│   ├── index.html
│   ├── netlify.toml
│   ├── package-lock.json
│   ├── package.json 
│   ├── postcss.config.js
│   ├── README.md
│   └── vite.config.js
│   ├── .gitignore
│   └── README.md
```

## Repo Usage

To clone the repository locally:

```bash
gh repo clone https://github.com/tlklein/CIS-4375-Team3-CapstoneProject
```

Refer to the frontend and backend directories for environment setup and execution instructions.
