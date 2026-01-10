# Innov8 Barber Shop Management System

![banner](/Documentation/Screenshot%202025-04-09%20153009.png)

## Table of Contents

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [Technology Stack](#technology-stack)
- [Key Contributions](#key-contributions)
- [Architecture & Design Artifacts](#architecture--design-artifacts)
- [Lessons Learned](#lessons-learned)
- [Documentation & Deliverables](#documentation--deliverables)
- [Repository Usage](#repository-usage)
- [Why This Project Matters](#why-this-project-matters)

## Overview

The Innov8 Barber Shop Management System is a web-based platform
designed to streamline daily operations for a local barbershop by
centralizing appointment scheduling, customer management, and
business workflows. The system reduces scheduling conflicts,
improves operational visibility, and enhances customer experience
through structured data management and role-based workflows.

This project emphasized real-world requirements gathering,
iterative system design, and cross-functional collaboration,
simulating enterprise software delivery practices.

## Problem Statement

Local service-based businesses often rely on manual tools for
scheduling and customer tracking, leading to missed
appointments, data inconsistency, and operational inefficiencies.

## Solution

Designed and delivered a centralized management platform that:

- Digitizes appointment scheduling and customer records
- Enforces structured workflows to reduce operational errors
- Provides a scalable foundation for future feature expansion

The system architecture and workflows were iteratively refined based on stakeholder feedback and implementation constraints.

## Tech Stack

Frontend
- Vue.js - component-based UI for the public website and private management dashboard

Backend
- Node.js
- Express.js - RESTful API for client, service, and event management

Database
- MySQL - relational data modeling for customers, appointments, and services
- AWS RDS - managed database hosting with automated backups and availability

Deployment & Infrastructure
- AWS - cloud hosting and managed services for application infrastructure

Development Practices
- Full-stack separation of concerns (frontend, API, data layer)
- Environment-based configuration for local and cloud deployments

## Key Achievements

- Coordinated requirements gathering and scope definition with
stakeholders
- Translated business needs into technical and architectural
artifacts
- Supported delivery of a full-stack web application through
structured project management
- Ensured alignment between system design, implementation, and
operational goals

## Team Members

- Emad Abbasi - Project Manager
- Trinity Klein - Associate Project Manager
- Anthony Perla - Product Owner
- Isaiah Morales - Lead Developer
- Jeremiah Jarina - Front-end Developer
- Sarah Yao - Back-end Developer
- Moshood Elias - Solution Architect

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

## Documentation & Deliverables 

- Project management artifacts (scope, planning, and execution
documents)
- Technical documentation outlining system design and implementation
- Demo video showcasing platform functionality
- Final presentation deck summarizing outcomes and architecture

All materials are organized within the repository’s documentation folders.

## Repository Usage

To clone the repository locally:

```bash
gh repo clone https://github.com/tlklein/CIS-4375-Team3-CapstoneProject
```

Refer to the frontend and backend directories for environment setup and execution instructions.

## Why This Project Matters

- End-to-end systems thinking: The project spans user-facing UX (Vue), API design (Node/Express), and persistent storage (MySQL on AWS RDS). That full-stack scope shows you can design and operate cross-layer systems, not just individual components.

- Operational readiness: Implemented deployment and environment practices (containerization and CI/CD workflows), data modeling, and backup/availability considerations — all critical for moving from prototype to repeatable, supportable production services.

- Team & stakeholder experience: Acting as Associate Project Manager required requirements gathering, risk management, and cross-functional coordination — transferable skills for mission-driven, process-heavy environments.

- Platform-first thinking: The architecture and artifacts (ERD, swim lanes, future architecture) were created with extensibility and integration in mind, enabling future moves to cloud-native patterns, observability, and infrastructure automation.

- Technical Delivery: Combines technical delivery, measurable operational improvements, and program-management experience — a compact evidence package that speaks to both engineering capability and program execution.
