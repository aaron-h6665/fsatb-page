This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Overview
This project is a simple task manager. You can add tasks with title and due date, and also mark them as complete/uncomplete. There is a lot of functionality that could be further extended, but was outside the scope of the project.

## Getting Started

First, clone the repository to your local device. Use `git clone https://github.com/aaron-h6665/fsatb-page.git` in the terminal to do this. Enter the folder by using `cd` commands.

Once you are in the folder of the project, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## My Contribution
I built the HTML and JS for the components of the task planner, including TaskCreateCard, Home, AddButto, ToDoCard, and the TaskDashboard. I had the main idea of the design of the page layout and I took inspiration from the FSAB Bootcamp website for the Header. 

## What I Learned
I had trouble understanding how to structure the functions in the page and essentially where to store state and what props I should pass into each function and component. Initially, I had my handlecreate and handlecancel buttons within my taskdashboard, which is not correct, because there was no way for me to pass them as props into my taskcreatecard component. Instead, I moved these functions into Home such that they could be passed into the taskcreatecard. I also had some trouble with the addbutton, and it's on and off relation with the taskcreatecard. I wanted to use a ternary operator such that when iscreating is true, the add button is gone and the taskcreatecard is there, and vice versa. This was not working. What I did to fix was add a simple onAdd() function that sets iscreating to be true when the add button is clicked, and setiscreating to false when either cancel or create is clicked. Overall, I learned how to organize my components such that props could be passed correctly and states could be updated correctly, so the overall website basic functionality works.

## References
I had some inspiration from the FSAB Bootcamp code (https://github.com/HuitianD/FSAB-Bootcamp-Day-2) where I studied how certain elements were structured. For example, the EventCard was somewhat similar to my ToDoCard and my TaskCreateCard because it required an interactable button. I did use AI to help me with the CSS styling and className naming, but I am making sure to understand this. I had some ideas on how to name classNames based on the Bootcamp code as well. I went to the office hours on Monday and I received some advice on design and structure from Erik and Gary. This helped me with placing the states and functions in the right places as well as the right props to pass into my components. For the task card and task dashboard, I had some inspiration looking through task managers that have already built online, specifically this website was a main inspiration https://app.todoist.com/app/inbox.