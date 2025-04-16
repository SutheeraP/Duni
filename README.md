# DUNI - Movie Scheduling Website

DUNI is a web application designed to optimize movie scheduling for users of the M-Pass program (Major Cineplex's subscription). As a frequent M-Pass user, I found it challenging to manually calculate the most effective movie schedule within the constraints of the program's rules (specifically, a 2-hour gap between movie rounds). DUNI automates this calculation, allowing users to maximize their movie-watching experience from cinema opening to closing.

## Motivation

The M-Pass program offers the advantage of watching unlimited movies at the cinema. However, a key rule is that there must be a 2-hour gap between movie rounds. This project addresses the need for a tool to efficiently schedule multiple movie showings throughout the day without overlaps and adhering to the time rule.

## Functionality

* **Multiple Movie Input:** Users can add multiple movies with their corresponding schedules.
* **Schedule Calculation:** DUNI calculates all possible movie scheduling combinations, ensuring no overlaps and respecting the 2-hour time gap rule.
* **Local Storage:** The application uses local storage to save the user's movie schedule data.

## Tech Stack

* **Next.js:** React framework for server-side rendering and static site generation.
* **TypeScript:** Static type checker for JavaScript.
* **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
* **Local Storage:** Browser storage for persisting user data.

## Usage

1.  **Add Movies:** Input the titles and showtimes of the movies you wish to watch.
2.  **Calculate Schedule:** DUNI will calculate and display the optimal movie schedule.
3.  **View Schedule:** Review the calculated schedule to plan your movie-watching day.

## Deployment

The application is deployed and accessible at: [duni.vercel.app](https://duni.vercel.app)


## Notes

* This project was developed to address a personal need for efficient movie scheduling with the M-Pass program.
* It demonstrates the ability to create a practical application that solves a specific user problem.
* The application leverages Next.js for a performant user experience and utilizes local storage for data persistence.
