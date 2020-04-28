# T-Mobile Coding Challenge 


### Code Review

A short code review of the base `master` branch:

1. What is done well?

- Use of ngrx for state management with the benefit of having single source of truth which makes debugging,testing and adding changes easier. It also makes application flow predictable.
- Use of entity adapter approach for handling collection data based on provided actions
- Simple structure of state to avoid complexity
- Monorepo architecture using NX to maintain quality and consistency in development of application.
- Barrel files path implementation for imports
- Use of interfaces and TS features like Pick<T>
- Introducing Hapi for caching data which improves overall performance and provides multiple plugin support

- Use of Nx data-persistence utilities to manage state with an intentional synchronization strategy , handle error state and for writing effects dealing with router and server communication.

2. What would you change?
- Remove redundant and irrelevant code like unused imports , methods and variables which are declared but never used 
- Constants can be used for static content instead of strings
- Make properties readonly to maintain immutability
- Add basic styling to form fields to improve user experience
- Fix unit testcases

   #### If this was a critical application,
  I would suggest few changes from user experience point of view:

   We can make chart more interactive by enhancing few features like:
  - Autosuggest and autocomplete for form fields 
  - Export as excel/pdf option to download rendered chart stock data
  - Few handy button options for (All data,1Y,1M,YTD) for single click access of chart data 

3. Are there any code smells or problematic implementations?

- Chart is not rendering on UI because wrong object is passed in `*ngIf="data"` for google-chart element.'data$' is of type observable , passing 'data$ | async' fixes the issue.Here async pipe subscribes to data$ observable to display the emitted values.

- Test cases are not working

- Methods and variables are declared but never used 

- Strings used for static content instead of constants

